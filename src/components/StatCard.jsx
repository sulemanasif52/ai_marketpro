import React from 'react'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

const StatCard = ({ title, value, trend, trendValue, icon: Icon, color }) => {
    const isPositive = trend === 'up'

    return (
        <div className="card glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', overflow: 'hidden', padding: '1.5rem', background: 'var(--bg-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>{title}</p>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>{value}</h3>
                </div>
                <div style={{
                    padding: '0.75rem',
                    borderRadius: '0',
                    border: '2px solid var(--border-color)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    boxShadow: '4px 4px 0px 0px var(--border-color)'
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


        </div>
    )
}

export default StatCard
