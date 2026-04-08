import React, { useState, useRef, useCallback } from 'react'
import { PenTool, Image, Video, Copy, Sparkles, Loader2, Download, Send, Check } from 'lucide-react'
import { generateAdCopy, generateImage } from '../lib/api'

const TABS = [
  { id: 'ad', label: 'Ad Copy', icon: PenTool, color: 'var(--accent-primary)' },
  { id: 'image', label: 'Ad Image', icon: Image, color: 'var(--accent-success)' },
  { id: 'video', label: 'Video', icon: Video, color: 'var(--accent-secondary)' },
]

// ---- Ad Canvas Composer ----
function AdCanvas({ bgUrl, headline, body, cta, canvasRef }) {
  const draw = useCallback(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    c.width = 1080; c.height = 1080

    if (bgUrl) {
      const img = new window.Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => { ctx.drawImage(img, 0, 0, 1080, 1080); overlay(ctx, headline, body, cta) }
      img.src = bgUrl
    } else {
      // gradient fallback
      const g = ctx.createLinearGradient(0, 0, 1080, 1080)
      g.addColorStop(0, '#1a1a2e'); g.addColorStop(1, '#16213e')
      ctx.fillStyle = g; ctx.fillRect(0, 0, 1080, 1080)
      overlay(ctx, headline, body, cta)
    }
  }, [bgUrl, headline, body, cta, canvasRef])

  React.useEffect(() => { draw() }, [draw])

  return (
    <canvas ref={canvasRef} style={{ width: '100%', maxWidth: '540px', borderRadius: '12px', border: '1px solid var(--border-color)' }} />
  )
}

function overlay(ctx, headline, body, cta) {
  // Dark overlay for text readability
  ctx.fillStyle = 'rgba(0,0,0,0.45)'
  ctx.fillRect(0, 0, 1080, 1080)

  // Headline
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 64px Inter, Arial, sans-serif'
  ctx.textAlign = 'center'
  wrapText(ctx, headline || 'Your Headline', 540, 380, 900, 72)

  // Body
  ctx.font = '36px Inter, Arial, sans-serif'
  ctx.fillStyle = 'rgba(255,255,255,0.85)'
  wrapText(ctx, body || 'Your ad body text goes here', 540, 560, 860, 46)

  // CTA button
  if (cta) {
    const btnW = Math.min(ctx.measureText(cta).width + 100, 500)
    const btnX = 540 - btnW / 2
    ctx.fillStyle = '#58a6ff'
    roundRect(ctx, btnX, 780, btnW, 70, 16)
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 32px Inter, Arial, sans-serif'
    ctx.fillText(cta, 540, 826)
  }
}

function wrapText(ctx, text, x, y, maxW, lineH) {
  const words = text.split(' ')
  let line = '', cy = y
  for (const w of words) {
    const test = line + w + ' '
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line.trim(), x, cy); cy += lineH; line = w + ' '
    } else line = test
  }
  ctx.fillText(line.trim(), x, cy)
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r); ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h); ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r); ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath(); ctx.fill()
}

// ---- Main Component ----
const ContentGen = () => {
  const [tab, setTab] = useState('ad')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  // Ad Copy state
  const [brand, setBrand] = useState('')
  const [audience, setAudience] = useState('')
  const [points, setPoints] = useState('')
  const [tone, setTone] = useState('professional')
  const [adResult, setAdResult] = useState(null)

  // Image state
  const [imgPrompt, setImgPrompt] = useState('')
  const [bgUrl, setBgUrl] = useState('')
  const [headline, setHeadline] = useState('')
  const [bodyText, setBodyText] = useState('')
  const [ctaText, setCtaText] = useState('')
  const canvasRef = useRef(null)

  const handleAdCopy = async () => {
    if (!brand.trim()) return setError('Enter a brand name')
    setLoading(true); setError('')
    try {
      const r = await generateAdCopy({ brand, audience, points, tone })
      setAdResult(r)
      // Pre-fill image tab with generated copy
      setHeadline(r.headline || ''); setBodyText(r.body || ''); setCtaText(r.cta || '')
      // Build visual image prompt from tone + ad copy mood — NO brand name to avoid AI text hallucination
      const toneVisuals = {
        professional: 'clean modern office, sleek minimalist workspace, cool blue lighting, sharp focus',
        casual: 'bright lifestyle photography, sunny outdoor setting, warm natural light, candid feel',
        urgent: 'dynamic action shot, dramatic lighting, bold contrast, fast-paced energy',
        luxury: 'premium dark studio, cinematic lighting, velvet textures, gold accents, high-end editorial',
        friendly: 'warm cozy environment, soft bokeh, pastel tones, approachable everyday setting',
      }
      const visual = toneVisuals[tone] || toneVisuals.professional
      setImgPrompt(`${visual}, ${audience ? `targeting ${audience},` : ''} photorealistic, 4K, advertisement background`)
    } catch (e) { setError(e.message) }
    setLoading(false)
  }

  const handleImageGen = async () => {
    // If no custom prompt, build one from the ad copy context
    const prompt = imgPrompt.trim() || `${brand || 'product'} advertisement, professional, marketing background`
    if (!prompt) return setError('Enter a background prompt or generate ad copy first')
    setLoading(true); setError('')
    try {
      const url = await generateImage(prompt + ', no text, no words, no letters, no watermark, no typography, clean background only')
      setBgUrl(url)
    } catch (e) { setError(e.message) }
    setLoading(false)
  }

  const handleDownload = () => {
    const c = canvasRef.current
    if (!c) return
    const a = document.createElement('a')
    a.download = `${brand || 'ad'}_creative.png`
    a.href = c.toDataURL('image/png')
    a.click()
  }

  const handleCopy = () => {
    if (!adResult) return
    navigator.clipboard.writeText(`${adResult.headline}\n\n${adResult.body}\n\n${adResult.cta}`)
    setCopied(true); setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="page-container">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Content <span className="text-gradient">Studio</span></h1>
        <p style={{ color: 'var(--text-secondary)' }}>Create high-converting ads with AI in seconds.</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => { setTab(t.id); setError('') }}
            style={{
              padding: '0.7rem 1.25rem', borderRadius: '10px', border: 'none', fontWeight: 600, fontSize: '0.9rem',
              display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer',
              background: tab === t.id ? 'var(--bg-tertiary)' : 'transparent',
              color: tab === t.id ? t.color : 'var(--text-secondary)',
              transition: 'all 0.2s'
            }}>
            <t.icon size={18} /> {t.label}
            {t.id === 'video' && <span style={{ fontSize: '0.65rem', background: 'var(--accent-warning)', color: '#000', padding: '2px 6px', borderRadius: '6px', fontWeight: 700 }}>SOON</span>}
          </button>
        ))}
      </div>

      {error && <div style={{ padding: '0.75rem 1rem', background: 'rgba(248,81,73,0.1)', border: '1px solid rgba(248,81,73,0.3)', borderRadius: '8px', color: 'var(--accent-danger)', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}

      {/* ===== AD COPY TAB ===== */}
      {tab === 'ad' && (
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div className="card glass-panel" style={{ flex: '1 1 340px', padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1.25rem' }}>Ad Details</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Input label="Brand / Product" value={brand} onChange={setBrand} placeholder="e.g. AIMarket Pro" />
              <Input label="Target Audience" value={audience} onChange={setAudience} placeholder="e.g. Small business owners" />
              <div>
                <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: 500, fontSize: '0.9rem' }}>Tone</label>
                <select value={tone} onChange={e => setTone(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'white', fontSize: '0.85rem' }}>
                  <option value="professional">Professional</option>
                  <option value="casual">Casual & Fun</option>
                  <option value="urgent">Urgent / FOMO</option>
                  <option value="luxury">Luxury / Premium</option>
                  <option value="friendly">Friendly & Warm</option>
                </select>
              </div>
              <Input label="Key Selling Points" value={points} onChange={setPoints} placeholder="- AI powered&#10;- Saves 10hrs/week" multi />
              <button className="btn-primary" onClick={handleAdCopy} disabled={loading}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: loading ? 0.7 : 1 }}>
                {loading ? <Loader2 className="spin" size={18} /> : <Sparkles size={18} />}
                {loading ? 'Generating...' : 'Generate Ad Copy'}
              </button>
            </div>
          </div>

          <div className="card glass-panel" style={{ flex: '1 1 340px', padding: '1.5rem', minHeight: '400px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3>Result</h3>
              <button onClick={handleCopy} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                {copied ? <Check size={15} color="var(--accent-success)" /> : <Copy size={15} />} {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            {adResult ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ padding: '1rem', background: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <p style={{ color: 'var(--accent-primary)', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.35rem' }}>HEADLINE</p>
                  <p style={{ fontSize: '1.15rem', fontWeight: 700 }}>{adResult.headline}</p>
                </div>
                <div style={{ padding: '1rem', background: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <p style={{ color: 'var(--accent-primary)', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.35rem' }}>BODY</p>
                  <p style={{ lineHeight: 1.6 }}>{adResult.body}</p>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(88,166,255,0.08)', borderRadius: '8px', border: '1px solid rgba(88,166,255,0.2)' }}>
                  <p style={{ color: 'var(--accent-primary)', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.35rem' }}>CALL TO ACTION</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>{adResult.cta}</p>
                </div>
              </div>
            ) : (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)', padding: '3rem', textAlign: 'center' }}>
                <p>Your AI-generated ad copy will appear here...</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===== IMAGE TAB ===== */}
      {tab === 'image' && (
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div className="card glass-panel" style={{ flex: '1 1 340px', padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1.25rem' }}>Ad Creator</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Input label="Background Prompt" value={imgPrompt} onChange={setImgPrompt} placeholder="e.g. Modern office, neon lights, tech vibes" multi />
              <button className="btn-primary" onClick={handleImageGen} disabled={loading}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: loading ? 0.7 : 1 }}>
                {loading ? <Loader2 className="spin" size={18} /> : <Image size={18} />}
                {loading ? 'Generating Background...' : 'Generate Background'}
              </button>
              <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)' }} />
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Overlay text (renders on canvas):</p>
              <Input label="Headline" value={headline} onChange={setHeadline} placeholder="Big bold headline" />
              <Input label="Body Text" value={bodyText} onChange={setBodyText} placeholder="Short description" />
              <Input label="CTA Button" value={ctaText} onChange={setCtaText} placeholder="Shop Now!" />
              <button className="btn-primary" onClick={handleDownload}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, var(--accent-success), #2ea043)' }}>
                <Download size={18} /> Download Ad (1080×1080)
              </button>
            </div>
          </div>

          <div style={{ flex: '1 1 340px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <h3 style={{ alignSelf: 'flex-start' }}>Preview</h3>
            <AdCanvas bgUrl={bgUrl} headline={headline} body={bodyText} cta={ctaText} canvasRef={canvasRef} />
            <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>1080 × 1080px — Instagram / Facebook ready</p>
          </div>
        </div>
      )}

      {/* ===== VIDEO TAB ===== */}
      {tab === 'video' && (
        <div className="card glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
          <Video size={64} style={{ marginBottom: '1rem', color: 'var(--accent-secondary)' }} />
          <h2 style={{ marginBottom: '0.75rem' }}>Video Generation</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
            AI-powered video ad creation is coming soon. We're integrating cutting-edge video generation models.
          </p>
          <span style={{ display: 'inline-block', padding: '0.5rem 1.25rem', borderRadius: '9999px', background: 'rgba(210,153,34,0.15)', color: 'var(--accent-warning)', fontWeight: 700, fontSize: '0.9rem' }}>
            Coming Soon
          </span>
        </div>
      )}
    </div>
  )
}

// Reusable input
const Input = ({ label, value, onChange, placeholder, multi }) => (
  <div>
    <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: 500, fontSize: '0.9rem' }}>{label}</label>
    {multi ? (
      <textarea rows={3} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'white', fontFamily: 'inherit', fontSize: '0.85rem', resize: 'vertical', boxSizing: 'border-box' }} />
    ) : (
      <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'white', fontSize: '0.85rem', boxSizing: 'border-box' }} />
    )}
  </div>
)

// Spin animation
if (!document.getElementById('spin-style')) {
  const s = document.createElement('style'); s.id = 'spin-style'
  s.textContent = `@keyframes spin{100%{transform:rotate(360deg)}}.spin{animation:spin 1s linear infinite}`
  document.head.appendChild(s)
}

export default ContentGen
