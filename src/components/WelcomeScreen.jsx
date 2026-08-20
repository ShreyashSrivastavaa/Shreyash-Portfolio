'use client'

import { motion } from 'framer-motion'
import { Terminal } from 'lucide-react'

export default function WelcomeScreen() {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        background: '#050508',
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
          gap: '24px',
          width: '100%',
          maxWidth: '360px',
        }}
      >
        {/* BRAND LOGO - SHREYASH.DEV */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(28px, 5vw, 36px)',
            fontWeight: 800,
            color: 'var(--text-sand)',
            letterSpacing: '-0.02em',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              padding: '8px',
              borderRadius: '12px',
              background: 'rgba(230, 57, 70, 0.15)',
              color: 'var(--accent-red)',
              border: '1px solid rgba(230, 57, 70, 0.3)',
            }}
          >
            <Terminal size={24} />
          </span>
          Shreyash<span style={{ color: 'var(--accent-red)' }}>.dev</span>
        </motion.div>

        {/* PROGRESS BAR ANIMATION */}
        <div
          style={{
            width: '100%',
            height: '3px',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '999px',
            overflow: 'hidden',
          }}
        >
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.0, ease: 'easeInOut' }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, var(--accent-red), var(--accent-crimson), var(--accent-red))',
              boxShadow: '0 0 12px var(--accent-red-glow)',
            }}
          />
        </div>
      </motion.div>
    </div>
  )
}
