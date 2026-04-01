import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Megaphone, PenTool, MessageSquare, PieChart } from 'lucide-react'

const Sidebar = () => {
    const location = useLocation()

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/campaigns', label: 'Campaigns', icon: Megaphone },
        { path: '/content-gen', label: 'Content Gen', icon: PenTool },
        { path: '/insights', label: 'Insights', icon: MessageSquare },
        { path: '/budget', label: 'Budget', icon: PieChart },
    ]

    return (
        <aside style={{
            width: 'var(--sidebar-width)',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            background: 'var(--bg-secondary)',
            borderRight: '1px solid var(--border-color)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ marginBottom: '3rem' }}>
                <h1 className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>AIMarket Pro</h1>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = location.pathname === item.path

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                color: isActive ? 'white' : 'var(--text-secondary)',
                                background: isActive ? 'linear-gradient(90deg, rgba(88, 166, 255, 0.1), transparent)' : 'transparent',
                                borderLeft: isActive ? '3px solid var(--accent-primary)' : '3px solid transparent',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <Icon size={20} color={isActive ? 'var(--accent-primary)' : 'currentColor'} />
                            <span style={{ fontWeight: isActive ? 500 : 400 }}>{item.label}</span>
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
}

export default Sidebar
