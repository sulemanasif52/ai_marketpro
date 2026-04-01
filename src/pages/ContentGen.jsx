import React, { useState } from 'react'
import { PenTool, Video, Copy, Sparkles, Loader2 } from 'lucide-react'

const ContentGen = () => {
    const [activeTab, setActiveTab] = useState('ad')
    const [isGenerating, setIsGenerating] = useState(false)
    const [generatedContent, setGeneratedContent] = useState('')

    const handleGenerate = () => {
        setIsGenerating(true)
        // Simulate AI delay
        setTimeout(() => {
            setGeneratedContent(
                activeTab === 'ad'
                    ? "**Headline:** Unlock Your Potential with TechPro 2026\n\n**Body:** Are you ready to take your productivity to the next level? Introducing TechPro, the ultimate solution for modern professionals. \n\n**Call to Action:** Shop Now and Save 20%!"
                    : "**Scene 1:** Camera pans across a busy office.\n**Narrator:** In a world where time is money...\n**Scene 2:** Close up of the product.\n**Narrator:** You need a tool that keeps up with you."
            )
            setIsGenerating(false)
        }, 2000)
    }

    return (
        <div className="page-container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>

            {/* Input Section */}
            <div style={{ flex: 1, minWidth: '300px' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Content Generation</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Create high-converting ads and scripts in seconds.</p>
                </div>

                <div className="card glass-panel" style={{ padding: '1.5rem' }}>
                    {/* Tabs */}
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)' }}>
                        <button
                            onClick={() => setActiveTab('ad')}
                            style={{
                                flex: 1,
                                padding: '1rem',
                                background: 'none',
                                border: 'none',
                                color: activeTab === 'ad' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                borderBottom: activeTab === 'ad' ? '2px solid var(--accent-primary)' : '2px solid transparent',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <PenTool size={18} /> Ad Copy
                        </button>
                        <button
                            onClick={() => setActiveTab('video')}
                            style={{
                                flex: 1,
                                padding: '1rem',
                                background: 'none',
                                border: 'none',
                                color: activeTab === 'video' ? 'var(--accent-secondary)' : 'var(--text-secondary)',
                                borderBottom: activeTab === 'video' ? '2px solid var(--accent-secondary)' : '2px solid transparent',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <Video size={18} /> Video Script
                        </button>
                    </div>

                    {/* Form */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Product/Brand Name</label>
                            <input type="text" className="input-field" placeholder="e.g. AIMarket Pro" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'white' }} />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Target Audience</label>
                            <input type="text" className="input-field" placeholder="e.g. Marketing Managers, SMB Owners" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'white' }} />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Key Selling Points</label>
                            <textarea rows="4" className="input-field" placeholder="- AI powered&#10;- Saves time&#10;- Increases ROI" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'white', fontFamily: 'inherit' }} />
                        </div>

                        <button
                            className="btn-primary"
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem', opacity: isGenerating ? 0.7 : 1 }}
                        >
                            {isGenerating ? <Loader2 className="spin" size={20} /> : <Sparkles size={20} />}
                            {isGenerating ? 'Generating...' : 'Generate Content'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Output Section */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ height: '88px' }}></div> {/* Spacer to align with form top */}
                <div className="card glass-panel" style={{ padding: '2rem', minHeight: '500px', display: 'flex', flexDirection: 'column', background: 'var(--bg-secondary)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <h3 style={{ fontSize: '1.25rem' }}>Generated Result</h3>
                        <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Copy size={16} /> Copy
                        </button>
                    </div>

                    <div style={{
                        flex: 1,
                        background: 'var(--bg-primary)',
                        borderRadius: '8px',
                        padding: '1.5rem',
                        border: '1px solid var(--border-color)',
                        whiteSpace: 'pre-wrap',
                        color: generatedContent ? 'var(--text-primary)' : 'var(--text-tertiary)',
                        fontFamily: 'monospace',
                        lineHeight: 1.6
                    }}>
                        {generatedContent || "Your AI-generated content will appear here..."}
                    </div>
                </div>
            </div>
        </div>
    )
}

// Add simple spin animation style
const style = document.createElement('style')
style.textContent = `
  @keyframes spin { 100% { transform: rotate(360deg); } }
  .spin { animation: spin 1s linear infinite; }
`
document.head.appendChild(style)

export default ContentGen
