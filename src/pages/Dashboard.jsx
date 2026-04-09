import React from 'react'
import { BarChart, Activity, DollarSign, Users } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import StatCard from '../components/StatCard'

const data = [
    { name: 'Mon', revenue: 4000, spend: 2400 },
    { name: 'Tue', revenue: 3000, spend: 1398 },
    { name: 'Wed', revenue: 2000, spend: 9800 },
    { name: 'Thu', revenue: 2780, spend: 3908 },
    { name: 'Fri', revenue: 1890, spend: 4800 },
    { name: 'Sat', revenue: 2390, spend: 3800 },
    { name: 'Sun', revenue: 3490, spend: 4300 },
]

const Dashboard = () => {
    return (
        <div className="page-container">
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome back, <span className="text-gradient">Ashar</span></h1>
                <p style={{ color: 'var(--text-secondary)' }}>Here's what's happening with your campaigns today.</p>
            </div>

            {/* Stats Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
            }}>
                <StatCard
                    title="Total Revenue"
                    value="$54,239"
                    trend="up"
                    trendValue="+12.5%"
                    icon={DollarSign}
                    color="88, 166, 255" // Blue
                />
                <StatCard
                    title="Active Campaigns"
                    value="12"
                    trend="up"
                    trendValue="+4"
                    icon={MegaphoneIcon}
                    color="188, 140, 255" // Purple
                />
                <StatCard
                    title="Avg. ROI"
                    value="324%"
                    trend="down"
                    trendValue="-2.1%"
                    icon={BarChart}
                    color="63, 185, 80" // Green
                />
                <StatCard
                    title="Total Reach"
                    value="1.2M"
                    trend="up"
                    trendValue="+18.2%"
                    icon={Users}
                    color="210, 153, 34" // Orange
                />
            </div>

            {/* Main Chart Section */}
            <div className="card glass-panel" style={{ height: '400px', padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>Revenue Overview</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#000000" stopOpacity={1} />
                                <stop offset="100%" stopColor="#0a0a0a" stopOpacity={1} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                        <XAxis dataKey="name" stroke="var(--text-tertiary)" tickLine={false} axisLine={false} />
                        <YAxis stroke="var(--text-tertiary)" tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                        <Tooltip
                            contentStyle={{ background: 'var(--bg-secondary)', border: '2px solid var(--border-color)', borderRadius: '0' }}
                            itemStyle={{ color: 'var(--text-primary)' }}
                        />
                        <Area type="step" dataKey="revenue" stroke="#000" strokeWidth={4} fillOpacity={1} fill="#0a0a0a" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

// Helper for icon (Megaphone is not imported in original snippet properly, fixing here)
const MegaphoneIcon = (props) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="m3 11 18-5v12L3 14v-3z" />
        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
)

export default Dashboard
