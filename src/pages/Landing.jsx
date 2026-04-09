import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Zap, PenTool, BarChart, Share2, Terminal, Cpu, Database, TrendingUp, Layers, CheckCircle2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

// Transperent Textures for brutalist edgy look
const textures = {
  noise: "url('https://www.transparenttextures.com/patterns/stardust.png')",
  grid: "url('https://www.transparenttextures.com/patterns/cubes.png')",
  lines: "url('https://www.transparenttextures.com/patterns/noise-lines.png')",
  diamond: "url('https://www.transparenttextures.com/patterns/diagmonds-light.png')"
}

// Intense, sharp easing curves
const rawEase = [0.85, 0, 0.15, 1]; // Massive fast acceleration and sharp stop
const snapEase = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 }
  }
}

// Brutal entrance/exit animations
const snapUpVariants = {
  hidden: { opacity: 0, y: 100, skewY: 4 },
  visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.4, ease: rawEase } }
}

const slamVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: snapEase } }
}

const strikeVariants = {
  hidden: { opacity: 0, x: -150, skewX: -10 },
  visible: { opacity: 1, x: 0, skewX: 0, transition: { duration: 0.4, ease: rawEase } }
}

// A global viewport config mapping to allow repeatable in/out triggers
const viewConf = { once: false, amount: 0.15, margin: "-50px" }

const Section = ({ inverted, texture, children, style = {}, noBorder = false }) => {
  const bg = inverted ? 'var(--text-primary)' : 'var(--bg-primary)'
  const color = inverted ? 'var(--bg-primary)' : 'var(--text-primary)'
  const borderRule = noBorder ? 'none' : `2px solid ${inverted ? 'var(--bg-primary)' : 'var(--border-color)'}`
  
  return (
    <section style={{ 
      backgroundColor: bg, 
      color: color, 
      backgroundImage: texture,
      borderBottom: borderRule,
      padding: '6rem 2rem',
      position: 'relative',
      overflow: 'hidden',
      ...style 
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {children}
      </div>
    </section>
  )
}

const Landing = () => {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', overflowX: 'hidden' }}>
      
      {/* Navbar */}
      <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--border-color)', backgroundColor: 'var(--bg-primary)', backgroundImage: textures.noise }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>AIMarket <span className="text-gradient">Pro</span></h1>
        <button onClick={() => navigate('/dashboard')} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase' }}>
          Execute <ArrowRight size={18} />
        </button>
      </nav>

      {/* 1. Hero Section (White) */}
      <Section texture={textures.noise} style={{ padding: '10rem 2rem', textAlign: 'center' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={viewConf} variants={containerVariants} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.div variants={strikeVariants} style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)', padding: '0.5rem 1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontFamily: 'var(--font-mono)', marginBottom: '2rem', border: '2px solid var(--text-primary)' }}>
            <Zap size={16} fill="currentColor" /> SYSTEM ONLINE // V2.0
          </motion.div>
          
          <motion.h1 variants={snapUpVariants} style={{ fontSize: 'clamp(3rem, 10vw, 7.5rem)', lineHeight: 0.85, marginBottom: '1.5rem', maxWidth: '1200px', textTransform: 'uppercase' }}>
            DOMINATE MARKETING WITH <span className="text-gradient">BRUTE FORCE AI</span>
          </motion.h1>
          
          <motion.p variants={snapUpVariants} style={{ fontSize: '1.25rem', maxWidth: '600px', marginBottom: '3rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontWeight: 600 }}>
            No soft edges. No fluff. Generate copy, synthesize visuals, and deploy to socials with mechanical precision.
          </motion.p>
          
          <motion.button 
            variants={slamVariants}
            whileHover={{ scale: 1.02, boxShadow: '12px 12px 0px 0px var(--accent-danger)', transition: { duration: 0.1 } }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dashboard')}
            style={{ fontSize: '1.25rem', padding: '1.25rem 2.5rem', background: 'var(--text-primary)', color: 'var(--bg-primary)', border: '2px solid var(--text-primary)', boxShadow: '8px 8px 0px 0px var(--accent-success)', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'box-shadow 0.15s ease-out' }}
          >
            INITIALIZE DASHBOARD <ArrowRight size={24} />
          </motion.button>
        </motion.div>
      </Section>

      {/* Marquee transition */}
      <div style={{ background: 'var(--accent-warning)', color: 'var(--text-primary)', padding: '1rem', overflow: 'hidden', whiteSpace: 'nowrap', borderBottom: '2px solid var(--border-color)' }}>
        <motion.div animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }} style={{ display: 'flex', gap: '2rem', fontSize: '1.5rem', fontFamily: 'var(--font-mono)', fontWeight: 800, textTransform: 'uppercase' }}>
          {[...Array(10)].map((_, i) => <span key={i}>// NO EXCUSES // EXECUTE // DESTROY METRICS //</span>)}
        </motion.div>
      </div>

      {/* 2. Core Features Grid (Black) */}
      <Section inverted texture={textures.grid} style={{ padding: '0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
          <FeatureBox 
            inverted
            icon={<PenTool size={48} />}
            title="SICK AUTOMATION"
            desc="Inject raw prompts. Extract high-converting copy and stunning 4K visuals via Groq & HuggingFace."
            color="var(--accent-warning)"
          />
          <FeatureBox 
            inverted
            icon={<BarChart size={48} />}
            title="ALGORITHMIC SPEND"
            desc="Algorithmic allocation of your capital across networks. Stop bleeding money, start multiplying."
            color="var(--accent-success)"
          />
          <FeatureBox 
            inverted
            icon={<Share2 size={48} />}
            title="INSTANT DEPLOY"
            desc="Push generated assets directly to Instagram. Zero friction between creation and execution."
            color="var(--accent-primary)"
          />
        </div>
      </Section>

      {/* 3. The Pipeline / How It Works (White) */}
      <Section texture={textures.lines}>
        <motion.div initial="hidden" whileInView="visible" viewport={viewConf} variants={containerVariants}>
          <motion.h2 variants={strikeVariants} style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', marginBottom: '4rem', maxWidth: '800px' }}>
            THE PIPELINE IS <span style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)', padding: '0 0.5rem' }}>UNBREAKABLE</span>.
          </motion.h2>
          
          <div style={{ display: 'grid', gap: '2rem' }}>
            <PipelineStep num="01" title="INGEST TARGET" desc="Feed the system your raw brand data and audience parameters." icon={<Cpu size={32} />} />
            <PipelineStep num="02" title="SYNTHESIZE ASSETS" desc="AI models forge the copy and render the visuals." icon={<Layers size={32} />} />
            <PipelineStep num="03" title="EXECUTE LAUNCH" desc="Auto-deploy straight to your Instagram pipeline." icon={<Terminal size={32} />} />
          </div>
        </motion.div>
      </Section>

      {/* 4. Social Proof / Big Metrics (Black) */}
      <Section inverted texture={textures.diamond} style={{ textAlign: 'center' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={viewConf} variants={containerVariants}>
          <motion.h2 variants={snapUpVariants} style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: '4rem' }}>
            METRICS THAT BLEED GREEN.
          </motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <MetricBox value="324%" label="Avg ROI Amplification" color="var(--accent-success)" inverted />
            <MetricBox value="10x" label="Faster Production" color="var(--accent-warning)" inverted />
            <MetricBox value="ZERO" label="Wasted Ad Spend" color="var(--accent-danger)" inverted />
          </div>
        </motion.div>
      </Section>

      {/* 5. Tech Stack & APIs (White) */}
      <Section texture={textures.noise}>
        <motion.div initial="hidden" whileInView="visible" viewport={viewConf} variants={containerVariants} style={{ display: 'flex', flexDirection: 'column', md: { flexDirection: 'row' }, gap: '4rem', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <motion.h2 variants={strikeVariants} style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', marginBottom: '2rem' }}>
              POWERED BY <br/>RAW <span className="text-gradient">COMPUTE</span>.
            </motion.h2>
            <motion.p variants={strikeVariants} style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '500px', fontWeight: 600 }}>
              We hook directly into bare-metal APIs to give you the most aggressive performance allowed by rate limits.
            </motion.p>
          </div>
          <div style={{ flex: 1, display: 'grid', gap: '1rem', width: '100%' }}>
            <TechBox name="GROQ API" type="NPU TEXT GEN" />
            <TechBox name="HUGGINGFACE" type="IMAGE DIFFUSION" />
            <TechBox name="META GRAPH" type="IG DEPLOYMENT" />
          </div>
        </motion.div>
      </Section>

      {/* 6. FAQ / Doctrine (Black) */}
      <Section inverted texture={textures.lines}>
        <motion.div initial="hidden" whileInView="visible" viewport={viewConf} variants={containerVariants}>
          <motion.h2 variants={snapUpVariants} style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: '4rem' }}>
            THE DOCTRINE (FAQ)
          </motion.h2>
          <div style={{ display: 'grid', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <FaqBox q="HOW FAST IS THE TEXT GEN?" a="Groq pushes LPU inference speeds. It's essentially instantaneous. Blink and you miss it." inverted />
            <FaqBox q="CAN I BRING MY OWN KEYS?" a="Yes. The system is designed to eat your API keys and pump out assets without a middleman." inverted />
            <FaqBox q="IS IT RESPONSIVE?" a="It's built on a brutalist flexbox architecture. It breaks exactly when we want it to break." inverted />
          </div>
        </motion.div>
      </Section>

      {/* 7. Final CTA (White) */}
      <Section texture={textures.grid} style={{ textAlign: 'center', padding: '10rem 2rem' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={viewConf} variants={containerVariants}>
          <motion.h2 variants={slamVariants} style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', marginBottom: '2rem', lineHeight: 0.9 }}>
            STOP READING.<br/>START <span style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)', padding: '0 0.5rem' }}>EXECUTING.</span>
          </motion.h2>
          <motion.button 
            variants={snapUpVariants}
            whileHover={{ scale: 1.05, boxShadow: '8px 8px 0px 0px var(--text-primary)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dashboard')}
            className="btn-primary" 
            style={{ fontSize: '1.8rem', padding: '1.5rem 4rem', display: 'inline-flex', alignItems: 'center', gap: '1rem', border: '4px solid var(--text-primary)', boxShadow: '4px 4px 0px 0px var(--text-primary)', transition: 'transform 0.1s, box-shadow 0.1s' }}
          >
            ENTER SYSTEM <Zap fill="currentColor" size={32} />
          </motion.button>
        </motion.div>
      </Section>

      {/* 8. Footer (Black) */}
      <Section inverted style={{ padding: '4rem 2rem', borderTop: '4px solid var(--bg-primary)' }} noBorder>
        <motion.div initial="hidden" whileInView="visible" viewport={viewConf} variants={containerVariants}>
          <motion.div variants={snapUpVariants} style={{ display: 'flex', flexDirection: 'column', md: { flexDirection: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
            <h1 style={{ margin: 0, fontSize: '2.5rem', border: '4px solid var(--bg-primary)', padding: '0.5rem 1.5rem' }}>
              AIMarket Pro
            </h1>
            <div style={{ display: 'flex', gap: '2rem', fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 600 }}>
              <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>SYSTEM GITHUB</span>
              <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>DOCUMENTATION</span>
              <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>TRANSMISSION</span>
            </div>
          </motion.div>
          <motion.div variants={snapUpVariants} style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '2px solid rgba(255,255,255,0.2)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textAlign: 'center', opacity: 0.5 }}>
            © {new Date().getFullYear()} AIMARKET PRO. ALL SYSTEMS OPERATIONAL.
          </motion.div>
        </motion.div>
      </Section>

    </div>
  )
}

// Subcomponents

const FeatureBox = ({ icon, title, desc, inverted, color }) => {
  const borderRule = `2px solid ${inverted ? 'var(--bg-primary)' : 'var(--border-color)'}`
  return (
    <motion.div 
      initial="hidden" whileInView="visible" viewport={viewConf} variants={slamVariants}
      style={{ padding: '4rem 2rem', borderRight: borderRule, borderBottom: borderRule, display: 'flex', flexDirection: 'column', gap: '1.5rem', background: inverted ? 'var(--text-primary)' : 'var(--bg-primary)' }}
      whileHover={{ backgroundColor: inverted ? '#1a1a1a' : 'var(--bg-secondary)', transition: { duration: 0.1 } }}
    >
      <div style={{ color: color }}>{icon}</div>
      <h2 style={{ fontSize: '2rem' }}>{title}</h2>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', lineHeight: 1.6 }}>{desc}</p>
    </motion.div>
  )
}

const PipelineStep = ({ num, title, desc, icon }) => (
  <motion.div 
    variants={strikeVariants} 
    style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem', padding: '2rem', border: '2px solid var(--border-color)', background: 'var(--bg-primary)', boxShadow: '6px 6px 0px 0px var(--border-color)' }}
    whileHover={{ transform: 'translate(-8px, -8px)', boxShadow: '14px 14px 0px 0px var(--border-color)', transition: { duration: 0.1 } }}
  >
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '3rem', fontWeight: 800, color: 'var(--text-primary)', WebkitTextStroke: '1px var(--text-tertiary)', color: 'transparent' }}>{num}</div>
    <div style={{ flex: 1 }}>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {icon} {title}
      </h3>
      <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{desc}</p>
    </div>
  </motion.div>
)

const MetricBox = ({ value, label, color, inverted }) => (
  <motion.div variants={slamVariants} style={{ border: `2px solid ${inverted ? 'var(--bg-primary)' : 'var(--border-color)'}`, padding: '3rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: inverted ? 'var(--text-primary)' : 'var(--bg-primary)' }}>
    <h3 style={{ fontSize: '5rem', color: color, margin: 0, lineHeight: 1 }}>{value}</h3>
    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>{label}</p>
  </motion.div>
)

const TechBox = ({ name, type }) => (
  <motion.div 
    variants={strikeVariants} 
    style={{ border: '2px solid var(--border-color)', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-primary)', boxShadow: '4px 4px 0px 0px var(--border-color)' }}
    whileHover={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)', transform: 'skewX(-2deg)', transition: { duration: 0.1 } }}
  >
    <h3 style={{ fontSize: '1.8rem', margin: 0 }}>{name}</h3>
    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, padding: '0.25rem 0.75rem', background: 'var(--accent-warning)', color: 'var(--text-primary)' }}>{type}</span>
  </motion.div>
)

const FaqBox = ({ q, a, inverted }) => (
  <motion.div variants={snapUpVariants} style={{ border: `2px solid ${inverted ? 'var(--bg-primary)' : 'var(--border-color)'}`, padding: '2rem', background: inverted ? 'var(--text-primary)' : 'var(--bg-primary)' }}>
    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', gap: '1rem' }}><CheckCircle2 /> {q}</h3>
    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', margin: 0, opacity: 0.9 }}>{a}</p>
  </motion.div>
)

export default Landing
