'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    text: "Shreyash turned our backend requirements into clean, well-tested APIs faster than expected. His attention to detail and proactive communication made our launch smooth.",
    name: 'Arjun Kapoor',
    role: 'Founder, DesignFlow',
    initials: 'AK',
    stars: 5,
  },
  {
    text: "Working with Shreyash felt like having an extra core engineer on our team. He understood the problem domain quickly, wrote reliable code, and was easy to collaborate with throughout.",
    name: 'Priya Sharma',
    role: 'CTO, TechLaunch India',
    initials: 'PS',
    stars: 5,
  },
  {
    text: "IHateLovePDF has saved our team hours every week. Running all processing right inside the browser gives us total confidence with confidential documents. Fast and dependable.",
    name: 'Mohamed Raza',
    role: 'Operations Lead, StartupHub',
    initials: 'MR',
    stars: 5,
  },
]

export default function TestimonialsSection() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section
      id="testimonials"
      style={{
        paddingTop: isMobile ? '80px' : '120px',
        paddingBottom: isMobile ? '80px' : '120px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Watermark */}
      <span className="section-watermark-left" aria-hidden="true" style={{ top: 20 }}>
        REVIEWS
      </span>

      {/* Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          right: '-60px',
          width: 350,
          height: 350,
          background: 'radial-gradient(circle, rgba(230,57,70,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
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
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 12,
            color: 'var(--text-muted)',
            letterSpacing: '0.2em',
          }}
        >
          SOCIAL PROOF
        </span>

        <h2
          style={{
            fontSize: isMobile ? 32 : 'clamp(32px, 5vw, 48px)',
            fontWeight: 800,
            lineHeight: 1.05,
            marginTop: 12,
            marginBottom: 48,
            fontFamily: 'var(--font-heading)',
          }}
        >
          <span style={{ color: 'var(--text-sand)' }}>What clients</span>
          <br />
          <span
            style={{
              color: 'transparent',
              WebkitTextStroke: '1.5px rgba(255,255,255,0.6)',
            }}
          >
            are saying
          </span>
        </h2>
      </motion.div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: 20,
        }}
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            className="testimonial-card-wrap"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -8 }}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderLeft: '3px solid var(--accent-red)',
              borderRadius: 22,
              padding: 28,
              position: 'relative',
              cursor: 'pointer',
              transition: 'border-color 0.3s, box-shadow 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(230,57,70,0.35)'
              e.currentTarget.style.boxShadow = '0 0 40px rgba(230,57,70,0.1), 0 8px 32px rgba(0,0,0,0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.borderLeftColor = 'var(--accent-red)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {/* Stars */}
            <div
              style={{
                position: 'absolute',
                top: 24,
                right: 24,
                color: 'var(--accent-red)',
                fontSize: 12,
                letterSpacing: 2,
              }}
            >
              {'★'.repeat(t.stars)}
            </div>

            {/* Quote mark */}
            <div
              style={{
                fontSize: 40,
                lineHeight: 1,
                color: 'rgba(255,255,255,0.12)',
                fontWeight: 900,
                marginBottom: 12,
              }}
            >
              "
            </div>

            <p
              style={{
                fontSize: 14,
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                marginBottom: 24,
              }}
            >
              {t.text}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(230,57,70,0.2), rgba(193,18,31,0.1))',
                  border: '1.5px solid rgba(230,57,70,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 13,
                  flexShrink: 0,
                  color: 'var(--text-sand)',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                {t.initials}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-sand)', fontFamily: 'var(--font-heading)' }}>{t.name}</div>
                <div
                  style={{
                    fontSize: 11,
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                    marginTop: 2,
                  }}
                >
                  {t.role}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  )
}
