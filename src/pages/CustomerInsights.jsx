import React, { useState } from 'react'
import { Send, User, Bot, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react'

const CustomerInsights = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'ai', text: "Hello! I've analyzed your recent campaign data. What would you like to know about your customer sentiment?" },
    ])
    const [input, setInput] = useState('')

    const handleSend = () => {
        if (!input.trim()) return

        // Add user message
        const newMessages = [...messages, { id: Date.now(), sender: 'user', text: input }]
        setMessages(newMessages)
        setInput('')

        // Simulate AI response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                sender: 'ai',
                text: "Based on recent feedback, customers love the new summer collection but find the shipping costs too high. Sentiment is 85% positive overall."
            }])
        }, 1500)
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
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
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
                                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                maxWidth: '70%',
                                display: 'flex',
                                gap: '0.75rem',
                                flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row'
                            }}
                        >
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                background: msg.sender === 'user' ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                {msg.sender === 'user' ? <User size={16} color="white" /> : <Bot size={16} color="var(--text-secondary)" />}
                            </div>

                            <div style={{
                                padding: '1rem',
                                borderRadius: '12px',
                                background: msg.sender === 'user' ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                                color: msg.sender === 'user' ? 'white' : 'var(--text-primary)',
                                lineHeight: 1.5
                            }}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask about customer trends..."
                            style={{
                                flex: 1,
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                background: 'var(--bg-primary)',
                                border: '1px solid var(--border-color)',
                                color: 'white',
                                fontFamily: 'inherit'
                            }}
                        />
                        <button
                            className="btn-primary"
                            onClick={handleSend}
                            style={{ width: '48px', height: '48px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerInsights
