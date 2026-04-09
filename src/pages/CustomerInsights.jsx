import React, { useState } from 'react'
import { Send, User, Bot, ThumbsUp, ThumbsDown, MessageSquare, Loader2 } from 'lucide-react'
import { chatWithAI } from '../lib/api'

const CustomerInsights = () => {
    const [messages, setMessages] = useState([
        { id: 1, role: 'assistant', text: "Hello! I've analyzed your recent campaign data. What would you like to know about your customer sentiment?" },
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSend = async () => {
        if (!input.trim()) return

        const userMsg = { id: Date.now(), role: 'user', text: input }
        const newMessages = [...messages, userMsg]
        setMessages(newMessages)
        setInput('')
        setLoading(true)

        try {
            // Convert to format Groq expects: [{role: 'user', content: '...'}, ...]
            const apiMessages = newMessages.map(m => ({ role: m.role, content: m.text }))
            const responseText = await chatWithAI(apiMessages)
            
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                role: 'assistant',
                text: responseText
            }])
        } catch (error) {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                role: 'assistant',
                text: `Error: ${error.message}`
            }])
        }
        setLoading(false)
    }

    return (
        <div className="page-container" style={{ display: 'flex', gap: '2rem', height: 'calc(100vh - 140px)' }}>
            {/* Sidebar / Stats */}
            <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Insights</h1>

                <div className="card glass-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ThumbsUp size={18} color="var(--accent-success)" /> Positive Sentiment
                    </h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>84%</p>
                    <p style={{ color: 'var(--accent-success)', fontSize: '0.875rem' }}>+5% this week</p>
                </div>

                <div className="card glass-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <MessageSquare size={18} color="var(--accent-primary)" /> Total Feedback
                    </h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>1,240</p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Reviews & comments</p>
                </div>
            </div>

            {/* Chat Area */}
            <div className="card glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem', borderBottom: '2px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Bot size={24} color="var(--accent-primary)" />
                        AI Insight Analyst
                    </h3>
                </div>

                <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            style={{
                                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                maxWidth: '70%',
                                display: 'flex',
                                gap: '0.75rem',
                                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
                            }}
                        >
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '0',
                                background: msg.role === 'user' ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                {msg.role === 'user' ? <User size={16} color="white" /> : <Bot size={16} color="var(--text-secondary)" />}
                            </div>

                            <div style={{
                                padding: '1rem',
                                borderRadius: '0',
                                background: msg.role === 'user' ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                                color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
                                lineHeight: 1.5
                            }}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ padding: '1.5rem', borderTop: '2px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && !loading && handleSend()}
                            disabled={loading}
                            placeholder={loading ? "AI is thinking..." : "Ask about customer trends..."}
                            style={{
                                flex: 1,
                                padding: '0.75rem 1rem',
                                borderRadius: '0',
                                background: 'var(--bg-primary)',
                                border: '2px solid var(--border-color)',
                                color: 'var(--text-primary)',
                                fontFamily: 'inherit'
                            }}
                        />
                        <button
                            className="btn-primary"
                            onClick={handleSend}
                            disabled={loading}
                            style={{ width: '48px', height: '48px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: loading ? 0.7 : 1 }}
                        >
                            {loading ? <Loader2 className="spin" size={20} /> : <Send size={20} />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerInsights
