'use client'

import { motion } from 'framer-motion'
import { Code2, Terminal, Cpu } from 'lucide-react'

export default function WelcomeScreen() {
  const icons = [Code2, Terminal, Cpu]

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        background: '#0F172A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        overflow: 'hidden',
        padding: '20px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          textAlign: 'center',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        {/* LOGO BADGE INITIALS "SS" / "RAMBOO" */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontWeight: 900,
            fontSize: '24px',
            letterSpacing: '1px',
            boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)',
            marginBottom: '4px',
          }}
        >
          SS
        </motion.div>

        {/* ICONS STAGGER */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
          style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icons.map((Icon, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, scale: 0.5, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Icon size={16} color="#60A5FA" />
            </motion.div>
          ))}
        </motion.div>

        {/* TITLE */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{
              fontSize: '13px',
              fontFamily: "'JetBrains Mono', monospace",
              color: '#94A3B8',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Shreyash Srivastava (Ramboo)
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{
              fontSize: 'clamp(22px, 4vw, 32px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#F8FAFC',
              margin: 0,
            }}
          >
            Backend SDE Portfolio
          </motion.h1>
        </div>

        {/* PROGRESS BAR ANIMATION */}
        <div
          style={{
            width: '100%',
            height: '4px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '999px',
            overflow: 'hidden',
            marginTop: '8px',
          }}
        >
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, #60A5FA)',
              boxShadow: '0 0 12px #3B82F6',
            }}
          />
        </div>

        {/* DOMAIN CAPSULE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          style={{
            padding: '4px 14px',
            borderRadius: '999px',
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.03)',
            fontSize: '11px',
            letterSpacing: '0.1em',
            color: '#64748B',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          shreyashsrivastava.vercel.app
        </motion.div>
      </motion.div>
    </div>
  )
}
