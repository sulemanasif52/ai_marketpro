import React, { useState } from 'react'
import { Plus, Search, MoreHorizontal, PlayCircle, PauseCircle, CheckCircle, Instagram, X, Loader2, Image as ImageIcon } from 'lucide-react'
import { publishToInstagram } from '../lib/api'

const campaignsData = [
    { id: 1, name: 'Summer Sale 2026', status: 'Active', budget: '$5,000', spend: '$2,100', roi: '145%', platform: 'Facebook' },
    { id: 2, name: 'New Product Launch', status: 'Draft', budget: '$10,000', spend: '$0', roi: '-', platform: 'Instagram' },
    { id: 3, name: 'Brand Awareness Q1', status: 'Completed', budget: '$15,000', spend: '$14,890', roi: '112%', platform: 'LinkedIn' },
    { id: 4, name: 'Retargeting - Cart Abandoners', status: 'Paused', budget: '$3,000', spend: '$850', roi: '210%', platform: 'Google Ads' },
]

const StatusBadge = ({ status }) => {
    let color = 'var(--text-secondary)'
    let bg = 'var(--bg-tertiary)'
    let Icon = MoreHorizontal

    if (status === 'Active') {
        color = 'var(--accent-success)'
        bg = 'rgba(63, 185, 80, 0.15)'
        Icon = PlayCircle
    } else if (status === 'Completed') {
        color = 'var(--accent-primary)'
        bg = 'rgba(88, 166, 255, 0.15)'
        Icon = CheckCircle
    } else if (status === 'Paused') {
        color = 'var(--accent-warning)'
        bg = 'rgba(210, 153, 34, 0.15)'
        Icon = PauseCircle
    }

    return (
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.25rem 0.75rem',
            borderRadius: '0',
            fontSize: '0.75rem',
            fontWeight: '600',
            color: color,
            background: bg
        }}>
            <Icon size={12} />
            {status}
        </span>
    )
}

const PublishModal = ({ open, campaign, onClose }) => {
    const [imageUrl, setImageUrl] = useState('')
    const [caption, setCaption] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    if (!open) return null

    const handlePublish = async () => {
        if (!imageUrl) return setError("Please provide an image URL.")
        setLoading(true); setError(''); setSuccess(false)
        try {
            await publishToInstagram({ imageUrl, caption })
            setSuccess(true)
            setTimeout(() => { setSuccess(false); onClose() }, 2000)
        } catch (err) {
            setError(err.message)
        }
        setLoading(false)
    }

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }} onClick={onClose}>
            <div className="card glass-panel" style={{ width: '500px', padding: '2rem', position: 'relative' }} onClick={e => e.stopPropagation()}>
                <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                    <X size={20} />
                </button>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Instagram size={22} color="#E1306C" /> Publish to Instagram
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Campaign: <strong>{campaign?.name}</strong></p>

                {error && <div style={{ padding: '0.75rem', background: 'rgba(248,81,73,0.1)', border: '2px solid rgba(248,81,73,0.3)', borderRadius: '0', color: 'var(--accent-danger)', marginBottom: '1rem', fontSize: '0.85rem' }}>{error}</div>}
                {success && <div style={{ padding: '0.75rem', background: 'rgba(63,185,80,0.1)', border: '2px solid rgba(63,185,80,0.3)', borderRadius: '0', color: 'var(--accent-success)', marginBottom: '1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} /> Successfully published to Instagram!</div>}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: 500, fontSize: '0.9rem' }}>Image URL (Publicly accessible)</label>
                        <div style={{ position: 'relative' }}>
                            <ImageIcon size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://example.com/ad.png" style={{ width: '100%', padding: '0.65rem 0.65rem 0.65rem 2.25rem', borderRadius: '0', background: 'var(--bg-primary)', border: '2px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.85rem', boxSizing: 'border-box' }} />
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: 500, fontSize: '0.9rem' }}>Caption</label>
                        <textarea rows={4} value={caption} onChange={e => setCaption(e.target.value)} placeholder="Sale starts now! 🚀 #summer" style={{ width: '100%', padding: '0.65rem', borderRadius: '0', background: 'var(--bg-primary)', border: '2px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.85rem', boxSizing: 'border-box', resize: 'vertical' }} />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                    <button style={{ flex: 1, padding: '0.75rem', borderRadius: '0', background: 'var(--bg-primary)', border: '2px solid var(--border-color)', color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer' }} onClick={onClose}>Cancel</button>
                    <button className="btn-primary" onClick={handlePublish} disabled={loading} style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}>
                        {loading ? <Loader2 className="spin" size={18} /> : <Instagram size={18} />}
                        {loading ? 'Publishing...' : 'Publish Now'}
                    </button>
                </div>
            </div>
        </div>
    )
}

const Campaigns = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [publishModalData, setPublishModalData] = useState(null)

    return (
        <div className="page-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Campaigns</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Manage and track your marketing campaigns.</p>
                </div>
                <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Plus size={18} /> New Campaign
                </button>
            </div>

            <div className="card glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                {/* Toolbar */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
                        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                        <input
                            type="text"
                            placeholder="Search campaigns..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem 0.75rem 2.5rem',
                                background: 'var(--bg-primary)',
                                border: '2px solid var(--border-color)',
                                borderRadius: '0',
                                color: 'var(--text-primary)',
                                fontFamily: 'inherit',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>
                </div>

                {/* Table */}
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Campaign Name</th>
                                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Status</th>
                                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Platform</th>
                                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Budget</th>
                                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Spend</th>
                                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>ROI</th>
                                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {campaignsData.map((campaign) => (
                                <tr key={campaign.id} style={{ borderBottom: '2px solid var(--border-color)', transition: 'background 0.2s' }}>
                                    <td style={{ padding: '1rem', fontWeight: 500 }}>{campaign.name}</td>
                                    <td style={{ padding: '1rem' }}><StatusBadge status={campaign.status} /></td>
                                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{campaign.platform}</td>
                                    <td style={{ padding: '1rem' }}>{campaign.budget}</td>
                                    <td style={{ padding: '1rem' }}>{campaign.spend}</td>
                                    <td style={{ padding: '1rem', color: 'var(--accent-success)' }}>{campaign.roi}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                            <button 
                                                onClick={() => setPublishModalData(campaign)}
                                                style={{ background: 'rgba(225, 48, 108, 0.1)', border: '2px solid rgba(225, 48, 108, 0.3)', color: '#E1306C', padding: '0.35rem 0.75rem', borderRadius: '0', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer' }}>
                                                <Instagram size={14} /> Publish
                                            </button>
                                            <button style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', padding: '0.25rem', cursor: 'pointer' }}>
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <PublishModal open={!!publishModalData} campaign={publishModalData} onClose={() => setPublishModalData(null)} />
        </div>
    )
}

// Spin animation for modal
if (!document.getElementById('spin-style')) {
  const s = document.createElement('style'); s.id = 'spin-style'
  s.textContent = `@keyframes spin{100%{transform:rotate(360deg)}}.spin{animation:spin 1s linear infinite}`
  document.head.appendChild(s)
}

export default Campaigns
