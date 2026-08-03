'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: 2,
        zIndex: 9990,
        background: 'transparent',
      }}
    >
      <motion.div
        style={{
          height: '100%',
          background: 'linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.7), rgba(255,255,255,0.1))',
          width: `${progress}%`,
          boxShadow: '0 0 12px rgba(255,255,255,0.4)',
          transition: 'width 0.05s linear',
        }}
      />
    </div>
  )
}
