// Centralized API service for Groq LLM + HuggingFace Image Generation

const getKey = (k) => localStorage.getItem(k) || ''

// --- GROQ (Llama 3.3 70B) ---
export async function generateAdCopy({ brand, audience, points, tone = 'professional' }) {
  const key = getKey('groq_key')
  if (!key) throw new Error('Please add your Groq API key in Settings.')

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: `You are an expert ad copywriter. Write compelling ${tone} ad copy. Return ONLY a JSON object with keys: headline, body, cta (call to action). No markdown, no code fences, no extra text.` },
        { role: 'user', content: `Brand: ${brand}\nTarget Audience: ${audience}\nKey Selling Points: ${points}\n\nWrite a high-converting ad copy.` }
      ],
      temperature: 0.8,
      max_tokens: 500
    })
  })

  if (!res.ok) {
    const errBody = await res.text().catch(() => '')
    if (res.status === 401) throw new Error('Invalid Groq API key. Check Settings.')
    if (res.status === 429) throw new Error('Rate limit reached. Please wait a moment and try again.')
    throw new Error(`Groq error (${res.status}): ${errBody || res.statusText}`)
  }

  const data = await res.json()
  const text = data.choices?.[0]?.message?.content?.trim() || ''

  // Try to parse JSON, handle markdown-wrapped responses
  let clean = text
  if (clean.startsWith('```')) clean = clean.replace(/```json?\n?/g, '').replace(/```/g, '').trim()
  try { return JSON.parse(clean) } catch {
    // Fallback: treat whole text as headline
    return { headline: text.slice(0, 120), body: text, cta: 'Learn More' }
  }
}

export async function chatWithAI(messages) {
  const key = getKey('groq_key')
  if (!key) throw new Error('Please add your Groq API key in Settings.')

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: 'You are an AI marketing analyst. Help users understand customer sentiment, campaign performance, and market trends. Be concise and data-driven.' },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 600
    })
  })

  if (!res.ok) {
    if (res.status === 401) throw new Error('Invalid Groq API key. Check Settings.')
    if (res.status === 429) throw new Error('Rate limit reached. Please wait a moment.')
    throw new Error(`Groq error (${res.status})`)
  }

  const data = await res.json()
  return data.choices?.[0]?.message?.content || 'No response received.'
}

// --- HUGGING FACE (FLUX.1-schnell for background images) ---
export async function generateImage(prompt) {
  const key = getKey('hf_key')
  if (!key) throw new Error('Please add your HuggingFace API key in Settings.')

  let res
  try {
    res = await fetch('https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ inputs: prompt })
    })
  } catch (networkErr) {
    console.error('[HuggingFace] Network error:', networkErr)
    throw new Error('Network error — could not reach HuggingFace. Check your internet connection or try again.')
  }

  if (!res.ok) {
    const errText = await res.text().catch(() => '')
    console.error(`[HuggingFace] HTTP ${res.status}:`, errText)
    if (res.status === 503) {
      let wait = 20
      try { wait = JSON.parse(errText)?.estimated_time || 20 } catch {}
      throw new Error(`Model is loading, please retry in ~${Math.ceil(wait)}s.`)
    }
    if (res.status === 401) throw new Error('Invalid HuggingFace token. Check Settings.')
    if (res.status === 404) throw new Error('Model not found. It may have moved — check HuggingFace.')
    throw new Error(`HuggingFace error (${res.status}): ${errText.slice(0, 150)}`)
  }

  const blob = await res.blob()
  console.log('[HuggingFace] Response blob type:', blob.type, 'size:', blob.size)
  if (blob.type && !blob.type.startsWith('image')) {
    const text = await blob.text().catch(() => '')
    console.error('[HuggingFace] Unexpected blob content:', text.slice(0, 200))
    throw new Error('Unexpected response from HuggingFace. Check console for details.')
  }
  return URL.createObjectURL(blob)
}

// --- INSTAGRAM GRAPH API ---
export async function publishToInstagram({ imageUrl, caption }) {
  const token = getKey('ig_token')
  const igId = getKey('ig_user_id')
  if (!token || !igId) throw new Error('Please add your Instagram credentials in Settings.')

  // Step 1: Create media container
  const createRes = await fetch(
    `https://graph.facebook.com/v21.0/${igId}/media`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image_url: imageUrl, caption, access_token: token })
    }
  )
  const createData = await createRes.json()
  if (createData.error) throw new Error(`Instagram: ${createData.error.message}`)

  // Step 2: Publish
  const pubRes = await fetch(
    `https://graph.facebook.com/v21.0/${igId}/media_publish`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ creation_id: createData.id, access_token: token })
    }
  )
  const pubData = await pubRes.json()
  if (pubData.error) throw new Error(`Instagram: ${pubData.error.message}`)
  return pubData
}

