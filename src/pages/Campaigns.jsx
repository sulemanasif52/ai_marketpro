import React, { useState } from 'react'
import { Plus, Search, MoreHorizontal, PlayCircle, PauseCircle, CheckCircle } from 'lucide-react'

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
            borderRadius: '9999px',
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

const Campaigns = () => {
    const [searchTerm, setSearchTerm] = useState('')

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
                                border: '1px solid var(--border-color)',
                                borderRadius: '8px',
                                color: 'var(--text-primary)',
                                fontFamily: 'inherit'
                            }}
                        />
                    </div>
                </div>

                {/* Table */}
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
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
                                <tr key={campaign.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }}>
                                    <td style={{ padding: '1rem', fontWeight: 500 }}>{campaign.name}</td>
                                    <td style={{ padding: '1rem' }}><StatusBadge status={campaign.status} /></td>
                                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{campaign.platform}</td>
                                    <td style={{ padding: '1rem' }}>{campaign.budget}</td>
                                    <td style={{ padding: '1rem' }}>{campaign.spend}</td>
                                    <td style={{ padding: '1rem', color: 'var(--accent-success)' }}>{campaign.roi}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <button style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', padding: '0.25rem' }}>
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Campaigns
