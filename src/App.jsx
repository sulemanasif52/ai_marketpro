import React, { useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Campaigns from './pages/Campaigns'
import ContentGen from './pages/ContentGen'
import CustomerInsights from './pages/CustomerInsights'
import Budget from './pages/Budget'
import Settings from './components/Settings'
import Landing from './pages/Landing'

function DashboardLayout({ children }) {
    const [settingsOpen, setSettingsOpen] = useState(false)

    return (
        <div className="app-container" style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <Sidebar onOpenSettings={() => setSettingsOpen(true)} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: 'var(--sidebar-width)' }}>
                <Header />
                <main style={{ padding: '2rem', marginTop: 'var(--header-height)' }}>
                    {children}
                </main>
            </div>
            <Settings open={settingsOpen} onClose={() => setSettingsOpen(false)} />
        </div>
    )
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            
            {/* Wrapped dashboard routes */}
            <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
            <Route path="/campaigns" element={<DashboardLayout><Campaigns /></DashboardLayout>} />
            <Route path="/content-gen" element={<DashboardLayout><ContentGen /></DashboardLayout>} />
            <Route path="/insights" element={<DashboardLayout><CustomerInsights /></DashboardLayout>} />
            <Route path="/budget" element={<DashboardLayout><Budget /></DashboardLayout>} />
            
            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

export default App
