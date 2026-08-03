'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      style={{
        borderTop: '1px solid var(--border)',
        padding: isMobile ? '32px 24px' : '40px 120px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16,
        flexDirection: isMobile ? 'column' : 'row',
        textAlign: isMobile ? 'center' : 'left',
      }}
    >
      <span
        style={{
          fontWeight: 700,
          fontSize: 16,
          letterSpacing: '-0.02em',
        }}
      >
        Shreyash Srivastava
      </span>

      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          color: 'var(--text-muted)',
          letterSpacing: '0.05em',
        }}
      >
        Crafted with ❤️ · Three.js & Framer Motion · {new Date().getFullYear()}
      </span>

      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          color: 'var(--text-muted)',
          letterSpacing: '0.05em',
        }}
      >
        All rights reserved
      </span>
    </motion.footer>
  )
}
