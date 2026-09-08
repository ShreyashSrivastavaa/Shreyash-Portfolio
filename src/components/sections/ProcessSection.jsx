'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const steps = [
  {
    num: '01',
    label: 'DISCOVER',
    title: 'Understanding the Problem',
    desc: 'Before writing any code, I make sure we are aligned on requirements, user constraints, and data flows. Clear specs upfront prevent surprises down the road.',
  },
  {
    num: '02',
    label: 'DESIGN',
    title: 'Schema & System Design',
    desc: 'I map out database relations, choose appropriate indexes, and define API contracts. Getting the data model right first keeps everything else straightforward.',
  },
  {
    num: '03',
    label: 'BUILD',
    title: 'Writing the Code',
    desc: 'I build out endpoints, handle edge cases, and test failure states locally. Code is written to be clean, readable, and easy for any teammate to maintain.',
  },
  {
    num: '04',
    label: 'LAUNCH',
    title: 'Deploying & Monitoring',
    desc: 'Once the service is in production, I watch query speeds and error logs. When bottlenecks or unexpected issues appear, I address them directly.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export default function ProcessSection() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section
      id="process"
      style={{
        paddingTop: isMobile ? '80px' : '120px',
        paddingBottom: isMobile ? '80px' : '120px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          paddingLeft: isMobile ? '24px' : '60px',
          paddingRight: isMobile ? '24px' : '60px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } },
          }}
        >
        <motion.span
          variants={fadeUp}
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 12,
            color: 'var(--text-muted)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          HOW I WORK
        </motion.span>

        <motion.h2
          variants={fadeUp}
          style={{
            fontSize: isMobile ? 32 : 'clamp(32px, 5vw, 48px)',
            fontWeight: 800,
            lineHeight: 1.05,
            marginTop: 12,
            marginBottom: 48,
            color: 'var(--text-primary)',
          }}
        >
          From vision to
          <br />
          <span style={{ color: 'var(--text-secondary)' }}>living product</span>
        </motion.h2>

        {/* Timeline */}
        <div
          style={{
            position: 'relative',
            paddingLeft: isMobile ? 32 : 60,
          }}
        >
          {/* Vertical line */}
          <div
            style={{
              position: 'absolute',
              left: isMobile ? 10 : 20,
              top: 0,
              bottom: 0,
              width: 1,
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.15), rgba(255,255,255,0.04), transparent)',
            }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                position: 'relative',
                paddingBottom: i === steps.length - 1 ? 0 : 56,
                paddingLeft: isMobile ? 24 : 40,
              }}
            >
              {/* Dot */}
              <div
                style={{
                  position: 'absolute',
                  left: isMobile ? -28 : -48,
                  top: 4,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.25)',
                  background: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.5)',
                  }}
                />
              </div>

              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  letterSpacing: '0.2em',
                  color: 'var(--text-muted)',
                  marginBottom: 6,
                  display: 'block',
                }}
              >
                {step.num} · {step.label}
              </span>

              <h3
                style={{
                  fontSize: isMobile ? 20 : 24,
                  fontWeight: 700,
                  marginBottom: 8,
                  color: 'var(--text-primary)',
                }}
              >
                {step.title}
              </h3>

              <p
                style={{
                  fontSize: 14,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.75,
                  maxWidth: 560,
                }}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      </div>
    </section>
  )
}
