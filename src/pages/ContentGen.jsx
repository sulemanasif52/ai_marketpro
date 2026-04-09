import React, { useState } from 'react'
import { PenTool, Image, Video, Copy, Sparkles, Loader2, Download, Check } from 'lucide-react'
import { generateAdCopy, generateImage } from '../lib/api'

const TABS = [
  { id: 'ad', label: 'Ad Copy', icon: PenTool, color: 'var(--accent-primary)' },
  { id: 'image', label: 'Ad Image', icon: Image, color: 'var(--accent-success)' },
  { id: 'video', label: 'Video', icon: Video, color: 'var(--accent-secondary)' },
]

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
  const [generatedUrl, setGeneratedUrl] = useState('')

  const handleAdCopy = async () => {
    if (!brand.trim()) return setError('Enter a brand name')
    setLoading(true); setError('')
    try {
      const r = await generateAdCopy({ brand, audience, points, tone })
      setAdResult(r)
      // Auto-build full ad image prompt from the generated copy
      const toneStyle = {
        professional: 'modern glass office building, city skyline, clean workspace with laptop and coffee, natural daylight',
        casual: 'bright coffee shop interior, cozy lifestyle setting, plants and warm sunlight through windows',
        urgent: 'busy city street at night, neon reflections, fast-paced urban energy, motion blur crowds',
        luxury: 'marble hotel lobby, crystal chandelier, dark wood and velvet, warm ambient golden lighting',
        friendly: 'sunlit living room with wooden furniture, fresh flowers on table, warm homey atmosphere',
      }
      const style = toneStyle[tone] || toneStyle.professional
      const headline = r.headline || brand
      const cta = r.cta || 'Learn More'
      const context = audience ? `for ${audience}` : ''
      setImgPrompt(
        `A stunning photorealistic advertisement ${context}. ` +
        `Background scene: ${style}. ` +
        `The text "${headline}" is elegantly integrated into the composition using beautiful modern typography. ` +
        `The phrase "${cta}" appears as refined small text at the bottom. ` +
        `Professional magazine-quality ad layout, sharp focus, depth of field, 4K, cinematic color grading`
      )
    } catch (e) { setError(e.message) }
    setLoading(false)
  }

  const handleImageGen = async () => {
    if (!imgPrompt.trim()) return setError('Generate ad copy first, or type an image prompt')
    setLoading(true); setError('')
    try {
      const url = await generateImage(imgPrompt)
      setGeneratedUrl(url)
    } catch (e) { setError(e.message) }
    setLoading(false)
  }

  const handleDownload = () => {
    if (!generatedUrl) return
    const a = document.createElement('a')
    a.download = `${brand || 'ad'}_creative.png`
    a.href = generatedUrl
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
              padding: '0.7rem 1.25rem', borderRadius: '0', border: 'none', fontWeight: 600, fontSize: '0.9rem',
              display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer',
              background: tab === t.id ? 'var(--bg-tertiary)' : 'transparent',
              color: tab === t.id ? t.color : 'var(--text-secondary)',
              transition: 'all 0.2s'
            }}>
            <t.icon size={18} /> {t.label}
            {t.id === 'video' && <span style={{ fontSize: '0.65rem', background: 'var(--accent-warning)', color: '#000', padding: '2px 6px', borderRadius: '0', fontWeight: 700 }}>SOON</span>}
          </button>
        ))}
      </div>

      {error && <div style={{ padding: '0.75rem 1rem', background: 'rgba(248,81,73,0.1)', border: '2px solid rgba(248,81,73,0.3)', borderRadius: '0', color: 'var(--accent-danger)', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}

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
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '0', background: 'var(--bg-primary)', border: '2px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.85rem' }}>
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
                <div style={{ padding: '1rem', background: 'var(--bg-primary)', borderRadius: '0', border: '2px solid var(--border-color)' }}>
                  <p style={{ color: 'var(--accent-primary)', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.35rem' }}>HEADLINE</p>
                  <p style={{ fontSize: '1.15rem', fontWeight: 700 }}>{adResult.headline}</p>
                </div>
                <div style={{ padding: '1rem', background: 'var(--bg-primary)', borderRadius: '0', border: '2px solid var(--border-color)' }}>
                  <p style={{ color: 'var(--accent-primary)', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.35rem' }}>BODY</p>
                  <p style={{ lineHeight: 1.6 }}>{adResult.body}</p>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(88,166,255,0.08)', borderRadius: '0', border: '2px solid rgba(88,166,255,0.2)' }}>
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
          <div className="card glass-panel" style={{ flex: '1 1 400px', padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1.25rem' }}>Ad Image Generator</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {!adResult && (
                <div style={{ padding: '0.75rem 1rem', background: 'rgba(88,166,255,0.08)', borderRadius: '0', border: '2px solid rgba(88,166,255,0.2)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Tip: Generate ad copy in the Ad Copy tab first. The headline and CTA will auto-fill into the prompt.
                </div>
              )}
              <Input label="Image Prompt" value={imgPrompt} onChange={setImgPrompt}
                placeholder="Generate ad copy first to auto-fill, or describe your ad image..." multi />
              <button className="btn-primary" onClick={handleImageGen} disabled={loading}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: loading ? 0.7 : 1 }}>
                {loading ? <Loader2 className="spin" size={18} /> : <Sparkles size={18} />}
                {loading ? 'Generating Ad Image...' : 'Generate Ad Image'}
              </button>
            </div>
          </div>

          <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <h3 style={{ alignSelf: 'flex-start' }}>Preview</h3>
            {generatedUrl ? (
              <>
                <img src={generatedUrl} alt="Generated Ad"
                  style={{ width: '100%', maxWidth: '540px', borderRadius: '0', border: '2px solid var(--border-color)' }} />
                <button className="btn-primary" onClick={handleDownload}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, var(--accent-success), #2ea043)' }}>
                  <Download size={18} /> Download Ad
                </button>
              </>
            ) : (
              <div style={{ width: '100%', maxWidth: '540px', aspectRatio: '1', borderRadius: '0', border: '2px solid var(--border-color)', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)' }}>
                <p>Your AI-generated ad will appear here</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===== VIDEO TAB ===== */}
      {tab === 'video' && (
        <div className="card glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
          <Video size={64} style={{ marginBottom: '1rem', color: 'var(--accent-secondary)' }} />
          <h2 style={{ marginBottom: '0.75rem' }}>Video Generation</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
            AI-powered video ad creation is coming soon. We are integrating cutting-edge video generation models.
          </p>
          <span style={{ display: 'inline-block', padding: '0.5rem 1.25rem', borderRadius: '0', background: 'rgba(210,153,34,0.15)', color: 'var(--accent-warning)', fontWeight: 700, fontSize: '0.9rem' }}>
            Coming Soon
          </span>
        </div>
      )}
    </div>
  )
}

const Input = ({ label, value, onChange, placeholder, multi }) => (
  <div>
    <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: 500, fontSize: '0.9rem' }}>{label}</label>
    {multi ? (
      <textarea rows={3} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ width: '100%', padding: '0.65rem', borderRadius: '0', background: 'var(--bg-primary)', border: '2px solid var(--border-color)', color: 'var(--text-primary)', fontFamily: 'inherit', fontSize: '0.85rem', resize: 'vertical', boxSizing: 'border-box' }} />
    ) : (
      <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ width: '100%', padding: '0.65rem', borderRadius: '0', background: 'var(--bg-primary)', border: '2px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.85rem', boxSizing: 'border-box' }} />
    )}
  </div>
)

export default ContentGen
