'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const services = [
  {
    icon: '⚡',
    title: 'Backend API Engineering',
    description:
      'Designing and building blazing-fast REST & GraphQL APIs with Node.js, Express, and FastAPI. Clean architecture, layered error handling, and sub-millisecond performance.',
    tags: ['Node.js', 'Express', 'FastAPI', 'REST', 'GraphQL'],
  },
  {
    icon: '🗄️',
    title: 'Database Architecture',
    description:
      'Schema design, query optimization, and scalable data layer setup using MongoDB, PostgreSQL, Redis — with caching strategies that dramatically cut response times.',
    tags: ['MongoDB', 'PostgreSQL', 'Redis', 'Indexing', 'Caching'],
  },
  {
    icon: '⚛️',
    title: 'Frontend Development',
    description:
      'Building modern, responsive client-side applications with React and Next.js. Pixel-perfect UI, smooth animations, and excellent performance metrics.',
    tags: ['React', 'Next.js', 'TypeScript', 'Framer Motion', 'CSS'],
  },
  {
    icon: '🐳',
    title: 'DevOps & Deployment',
    description:
      'Containerizing services with Docker, setting up CI/CD pipelines, and deploying on cloud infrastructure — for systems that scale without babysitting.',
    tags: ['Docker', 'AWS', 'Vercel', 'CI/CD', 'GitHub Actions'],
  },
  {
    icon: '🔮',
    title: 'AI / LLM Integration',
    description:
      'Integrating LLM-powered features, building AI chatbots, and wiring intelligent automation into products using OpenAI, Gemini, and custom ML pipelines.',
    tags: ['OpenAI', 'Gemini', 'LangChain', 'RAG', 'Embeddings'],
  },
  {
    icon: '🎨',
    title: 'Creative Tools & WebAssembly',
    description:
      'Building performance-critical browser tools with WebAssembly, Three.js, and Canvas — like IHateLovePDF — where native speed meets web accessibility.',
    tags: ['WebAssembly', 'Three.js', 'Canvas', 'PDF.js', 'WASM'],
  },
]

const skillBars = [
  { label: 'Backend (Node / Express / FastAPI)', pct: 90 },
  { label: 'Frontend (React / Next.js)', pct: 85 },
  { label: 'Database Design & Optimization', pct: 88 },
  { label: 'AI / ML Integration', pct: 75 },
  { label: 'DevOps & Cloud (Docker / AWS)', pct: 72 },
  { label: 'Creative Coding (Three.js / WASM)', pct: 78 },
]

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
      { threshold: 0.15 }
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
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Watermark */}
      <span className="section-watermark-left" aria-hidden="true" style={{ top: 20 }}>
        WHAT I DO
      </span>

      {/* Ambient orb */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '-80px',
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(230,57,70,0.07) 0%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 56 }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--text-muted)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            MY TOOLKIT
          </span>

          <h2
            style={{
              fontSize: isMobile ? 32 : 'clamp(32px, 5vw, 48px)',
              fontWeight: 800,
              lineHeight: 1.05,
              marginTop: 12,
              fontFamily: 'var(--font-heading)',
            }}
          >
            <span style={{ color: 'var(--text-sand)' }}>What I Build</span>
            <br />
            <span
              style={{
                color: 'transparent',
                WebkitTextStroke: '1.5px rgba(255,255,255,0.6)',
              }}
            >
              & How I Do It
            </span>
          </h2>
        </motion.div>

        {/* Service Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: 20,
            marginBottom: 72,
          }}
        >
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="service-card"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
            >
              {/* Ghost number */}
              <span className="service-number">0{i + 1}</span>

              {/* Icon */}
              <div
                style={{
                  fontSize: 30,
                  marginBottom: 14,
                  display: 'block',
                }}
              >
                {service.icon}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  marginBottom: 10,
                  color: 'var(--text-sand)',
                  fontFamily: 'var(--font-heading)',
                  lineHeight: 1.3,
                  paddingRight: 40,
                }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: 13,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.75,
                  marginBottom: 16,
                }}
              >
                {service.description}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      padding: '3px 10px',
                      borderRadius: 999,
                      background: 'rgba(230,57,70,0.1)',
                      border: '1px solid rgba(230,57,70,0.2)',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skill Bars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: 12 }}
        >
          <h3
            style={{
              fontSize: isMobile ? 22 : 28,
              fontWeight: 700,
              marginBottom: 32,
              color: 'var(--text-sand)',
              fontFamily: 'var(--font-heading)',
            }}
          >
            Proficiency Levels
          </h3>
        </motion.div>

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
                  marginBottom: 8,
                  fontSize: 13,
                }}
              >
                <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{skill.label}</span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--accent-red)',
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {skill.pct}%
                </span>
              </div>
              <div
                style={{
                  height: 4,
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: 999,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: visible ? `${skill.pct}%` : '0%',
                    background: 'linear-gradient(90deg, var(--accent-crimson), var(--accent-red), rgba(255,120,80,0.8))',
                    borderRadius: 999,
                    transition: 'width 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: `${i * 0.1}s`,
                    boxShadow: '0 0 10px rgba(230,57,70,0.4)',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
