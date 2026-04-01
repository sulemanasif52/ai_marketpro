import React from 'react'
import { Bell, User } from 'lucide-react'

const Header = () => {
    return (
        <header style={{
            height: 'var(--header-height)',
            position: 'fixed',
            top: 0,
            right: 0,
            left: 'var(--sidebar-width)',
            background: 'rgba(10, 12, 16, 0.8)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 2rem',
            zIndex: 10
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)' }}>
                    <Bell size={20} />
                </button>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={18} />
                </div>
            </div>
        </header>
    )
}

export default Header
