import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Megaphone, PenTool, MessageSquare, PieChart, Settings as SettingsIcon } from 'lucide-react'

const Sidebar = ({ onOpenSettings }) => {
    const location = useLocation()

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/campaigns', label: 'Campaigns', icon: Megaphone },
        { path: '/content-gen', label: 'Content Studio', icon: PenTool },
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
            borderRight: '2px solid var(--border-color)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ marginBottom: '3rem' }}>
                <h1 className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>AIMarket Pro</h1>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
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
                                borderRadius: '0',
                                color: isActive ? 'var(--bg-primary)' : 'var(--text-primary)',
                                background: isActive ? 'var(--text-primary)' : 'transparent',
                                border: isActive ? '2px solid var(--border-color)' : '2px solid transparent',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <Icon size={20} color={isActive ? 'var(--bg-primary)' : 'currentColor'} />
                            <span style={{ fontWeight: isActive ? 800 : 600, fontFamily: 'var(--font-mono)' }}>{item.label}</span>
                        </Link>
                    )
                })}
            </nav>
            
            <div style={{ borderTop: '2px solid var(--border-color)', paddingTop: '1.5rem', marginTop: 'auto' }}>
                <button 
                    onClick={onOpenSettings}
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem 1rem',
                        borderRadius: '0',
                        color: 'var(--text-primary)',
                        background: 'transparent',
                        border: '2px solid transparent',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--text-primary)'; e.currentTarget.style.color = 'var(--bg-primary)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                >
                    <SettingsIcon size={20} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>API Settings</span>
                </button>
            </div>
        </aside>
    )
}

export default Sidebar
