import React, { useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { DollarSign, TrendingUp, AlertCircle } from 'lucide-react'

const Budget = () => {
    const [socialBudget, setSocialBudget] = useState(40)
    const [searchBudget, setSearchBudget] = useState(30)
    const [displayBudget, setDisplayBudget] = useState(30)

    const data = [
        { name: 'Social Media', value: socialBudget, color: 'var(--accent-primary)' },
        { name: 'Search Ads', value: searchBudget, color: 'var(--text-secondary)' },
        { name: 'Display Network', value: displayBudget, color: 'var(--accent-success)' },
    ]

    return (
        <div className="page-container">
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Budget Optimization</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Allocate your marketing budget for maximum ROI using AI predictions.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>

                {/* Allocation Controls */}
                <div className="card glass-panel" style={{ padding: '2rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <DollarSign size={20} color="var(--accent-warning)" />
                        Budget Allocation
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <label>Social Media (Facebook, Instagram)</label>
                                <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>{socialBudget}%</span>
                            </div>
                            <input
                                type="range"
                                min="0" max="100"
                                value={socialBudget}
                                onChange={(e) => setSocialBudget(parseInt(e.target.value))}
                                style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
                            />
                        </div>

                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <label>Search Ads (Google)</label>
                                <span style={{ color: 'var(--accent-secondary)', fontWeight: 'bold' }}>{searchBudget}%</span>
                            </div>
                            <input
                                type="range"
                                min="0" max="100"
                                value={searchBudget}
                                onChange={(e) => setSearchBudget(parseInt(e.target.value))}
                                style={{ width: '100%', accentColor: 'var(--accent-secondary)' }}
                            />
                        </div>

                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <label>Display Network</label>
                                <span style={{ color: 'var(--accent-success)', fontWeight: 'bold' }}>{displayBudget}%</span>
                            </div>
                            <input
                                type="range"
                                min="0" max="100"
                                value={displayBudget}
                                onChange={(e) => setDisplayBudget(parseInt(e.target.value))}
                                style={{ width: '100%', accentColor: 'var(--accent-success)' }}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(210, 153, 34, 0.1)', borderRadius: '0', border: '2px solid rgba(210, 153, 34, 0.2)', display: 'flex', gap: '0.75rem' }}>
                        <AlertCircle size={20} color="var(--accent-warning)" />
                        <div>
                            <h4 style={{ color: 'var(--accent-warning)', margin: 0 }}>AI Recommendation</h4>
                            <p style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>Shift 10% more budget to Social Media to capitalize on recent viral trends.</p>
                        </div>
                    </div>
                </div>

                {/* Visualization */}
                <div className="card glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h3 style={{ width: '100%', marginBottom: '1rem' }}>Projected Distribution</h3>
                    <div style={{ width: '100%', height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ background: 'var(--bg-secondary)', border: '2px solid var(--border-color)', borderRadius: '0' }}
                                    itemStyle={{ color: 'var(--text-primary)' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div style={{ width: '100%', marginTop: '1rem' }}>
                        <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <TrendingUp size={18} color="var(--accent-success)" /> Predicted ROI
                        </h4>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-success)' }}>
                            {(socialBudget * 3.2 + searchBudget * 2.5 + displayBudget * 1.8).toFixed(0)}%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Budget
