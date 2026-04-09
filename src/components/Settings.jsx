import React, { useState, useEffect } from 'react'
import { X, Key, Save, ExternalLink } from 'lucide-react'

const fields = [
  { key: 'groq_key', label: 'Groq API Key', link: 'https://console.groq.com/keys', hint: 'Free — powers ad copy & chat' },
  { key: 'hf_key', label: 'HuggingFace Token', link: 'https://huggingface.co/settings/tokens', hint: 'Free — powers image generation' },
  { key: 'ig_token', label: 'Instagram Access Token', link: 'https://developers.facebook.com', hint: 'For publishing ads to Instagram' },
  { key: 'ig_user_id', label: 'Instagram Business Account ID', link: '', hint: 'Your IG business account ID' },
]

const Settings = ({ open, onClose }) => {
  const [vals, setVals] = useState({})
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const v = {}
    fields.forEach(f => v[f.key] = localStorage.getItem(f.key) || '')
    setVals(v)
  }, [open])

  const handleSave = () => {
    Object.entries(vals).forEach(([k, v]) => localStorage.setItem(k, v.trim()))
    setSaved(true)
    setTimeout(() => { setSaved(false); onClose() }, 800)
  }

  if (!open) return null

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}>
      <div className="card glass-panel" style={{ width: '500px', padding: '2rem', position: 'relative' }}
        onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--text-secondary)' }}>
          <X size={20} />
        </button>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <Key size={22} color="var(--accent-primary)" /> API Settings
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {fields.map(f => (
            <div key={f.key}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <label style={{ fontWeight: 500, fontSize: '0.9rem' }}>{f.label}</label>
                {f.link && (
                  <a href={f.link} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-primary)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'none' }}>
                    Get key <ExternalLink size={12} />
                  </a>
                )}
              </div>
              <input
                type="password"
                value={vals[f.key] || ''}
                onChange={e => setVals(p => ({ ...p, [f.key]: e.target.value }))}
                placeholder={f.hint}
                style={{ width: '100%', padding: '0.65rem', borderRadius: '0', background: 'var(--bg-primary)', border: '2px solid var(--border-color)', color: 'white', fontSize: '0.85rem', boxSizing: 'border-box' }}
              />
            </div>
          ))}
        </div>
        <button className="btn-primary" onClick={handleSave}
          style={{ width: '100%', marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <Save size={18} /> {saved ? '✓ Saved!' : 'Save Settings'}
        </button>
      </div>
    </div>
  )
}

export default Settings
