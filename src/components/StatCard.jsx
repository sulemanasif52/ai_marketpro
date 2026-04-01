import React from 'react'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

const StatCard = ({ title, value, trend, trendValue, icon: Icon, color }) => {
    const isPositive = trend === 'up'

    return (
        <div className="card glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>{title}</p>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>{value}</h3>
                </div>
                <div style={{
                    padding: '0.75rem',
                    borderRadius: '12px',
                    background: `rgba(${color}, 0.1)`,
                    color: `rgb(${color})`
                }}>
                    <Icon size={24} />
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '0.875rem',
                    color: isPositive ? 'var(--accent-success)' : 'var(--accent-danger)',
                    fontWeight: '500'
                }}>
                    {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    {trendValue}
                </span>
                <span style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem' }}>vs last month</span>
            </div>

            {/* Decorative gradient blob */}
            <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-50%',
                width: '100%',
                height: '100%',
                background: `radial-gradient(circle, rgba(${color}, 0.15) 0%, transparent 70%)`,
                zIndex: 0,
                pointerEvents: 'none'
            }} />
        </div>
    )
}

export default StatCard
