import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Campaigns from './pages/Campaigns'
import ContentGen from './pages/ContentGen'
import CustomerInsights from './pages/CustomerInsights'
import Budget from './pages/Budget'

function App() {
    return (
        <div className="app-container" style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <Sidebar />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: 'var(--sidebar-width)' }}>
                <Header />
                <main style={{ padding: '2rem', marginTop: 'var(--header-height)' }}>
                    <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/campaigns" element={<Campaigns />} />
                        <Route path="/content-gen" element={<ContentGen />} />
                        <Route path="/insights" element={<CustomerInsights />} />
                        <Route path="/budget" element={<Budget />} />
                    </Routes>
                </main>
            </div>
        </div>
    )
}

export default App
