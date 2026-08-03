'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const skillBars = [
  { label: 'Frontend (React / Next.js)', pct: 95 },
  { label: 'Backend (Node / Express / FastAPI)', pct: 90 },
  { label: '3D & Creative Coding (Three.js)', pct: 80 },
  { label: 'AI / ML Integration', pct: 75 },
  { label: 'DevOps & Cloud (Docker / AWS)', pct: 72 },
  { label: 'UI/UX Design (Figma)', pct: 85 },
]

const techBadges = [
  { icon: '⚛️', name: 'React / Next.js' },
  { icon: '🟦', name: 'TypeScript' },
  { icon: '🟢', name: 'Node.js' },
  { icon: '🐍', name: 'Python' },
  { icon: '🎲', name: 'Three.js' },
  { icon: '🍃', name: 'MongoDB' },
  { icon: '🐳', name: 'Docker' },
  { icon: '☁️', name: 'AWS / Vercel' },
  { icon: '🔮', name: 'AI / LLMs' },
  { icon: '🎨', name: 'Figma' },
  { icon: '🗄️', name: 'PostgreSQL' },
  { icon: '⚡', name: 'WebAssembly' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 35, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function SkillsSection() {
  const [isMobile, setIsMobile] = useState(false)
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="skills"
      style={{
        padding: isMobile ? '80px 24px' : '120px 60px 120px 120px',
      }}
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      >
        <motion.span
          variants={fadeUp}
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 12,
            color: 'var(--text-muted)',
            letterSpacing: '0.2em',
          }}
        >
          MY TOOLKIT
        </motion.span>

        <motion.h2
          variants={fadeUp}
          style={{
            fontSize: isMobile ? 32 : 'clamp(32px, 5vw, 48px)',
            fontWeight: 800,
            lineHeight: 1.05,
            marginTop: 12,
            marginBottom: 48,
          }}
        >
          Skills &<br />
          <span style={{ color: 'var(--text-secondary)' }}>Technologies</span>
        </motion.h2>
      </motion.div>

      {/* Tech badges grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(6, 1fr)',
          gap: 14,
          marginBottom: 56,
        }}
      >
        {techBadges.map((badge, i) => (
          <motion.div
            key={badge.name}
            className="skill-badge-wrap"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
            whileHover={{ y: -6, scale: 1.05 }}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 16,
              padding: '18px 12px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'border-color 0.3s, box-shadow 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
              e.currentTarget.style.boxShadow = '0 0 28px rgba(255,255,255,0.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <span style={{ fontSize: 28, display: 'block', marginBottom: 8 }}>
              {badge.icon}
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.05em',
                color: 'var(--text-secondary)',
              }}
            >
              {badge.name}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Skill bars */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 20 : 40,
        }}
      >
        {skillBars.map((skill, i) => (
          <motion.div
            key={skill.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            style={{ marginBottom: 8 }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 6,
                fontSize: 13,
              }}
            >
              <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
                {skill.label}
              </span>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  color: 'var(--text-muted)',
                  fontSize: 12,
                }}
              >
                {skill.pct}%
              </span>
            </div>
            <div
              style={{
                height: 5,
                background: 'rgba(255,255,255,0.08)',
                borderRadius: 999,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: visible ? `${skill.pct}%` : '0%',
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.3), rgba(255,255,255,0.7))',
                  borderRadius: 999,
                  transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: `${i * 0.1}s`,
                  boxShadow: '0 0 10px rgba(255,255,255,0.2)',
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
