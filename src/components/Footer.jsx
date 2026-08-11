'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Github, Linkedin, Mail, ArrowUpRight, Heart } from 'lucide-react'

const navLinks = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Portfolio', id: 'portfolio' },
  { label: 'Services', id: 'skills' },
  { label: 'Reviews', id: 'testimonials' },
  { label: 'Contact', id: 'contact' },
]

const socials = [
  { icon: <Github size={15} />, href: 'https://github.com/ShreyashSrivastavaa', label: 'GitHub' },
  { icon: <Linkedin size={15} />, href: 'https://www.linkedin.com/in/shreyashsrivastavaa', label: 'LinkedIn' },
  { icon: <Mail size={15} />, href: 'mailto:shreyashsr2004@gmail.com', label: 'Email' },
]

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false)
  const year = new Date().getFullYear()

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(5,5,8,0.85)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Top red glow */}
      <div style={{
        position: 'absolute', top: -1, left: '50%',
        transform: 'translateX(-50%)',
        width: '60%', height: 1,
        background: 'linear-gradient(to right, transparent, rgba(230,57,70,0.5), transparent)',
        pointerEvents: 'none',
      }} />

      {/* Main content */}
      <div style={{
        padding: isMobile ? '48px 24px 32px' : '64px 80px 40px',
        maxWidth: 1200, margin: '0 auto',
      }}>
        {/* Top row */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 48,
          marginBottom: 56,
        }}>
          {/* Brand */}
          <div style={{ maxWidth: 280 }}>
            <div
              onClick={scrollTop}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 22, fontWeight: 800,
                color: 'var(--text-sand)',
                letterSpacing: '-0.02em',
                marginBottom: 12,
                cursor: 'pointer',
              }}
            >
              Shreyash.
            </div>
            <p style={{
              fontSize: 13, color: 'var(--text-muted)',
              lineHeight: 1.75,
            }}>
              Backend engineer crafting high-performance APIs and modern web
              systems — one endpoint at a time.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: 36, height: 36,
                    borderRadius: 10,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'border-color 0.25s, background 0.25s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(230,57,70,0.4)'
                    e.currentTarget.style.background = 'rgba(230,57,70,0.1)'
                    e.currentTarget.style.color = 'var(--accent-red)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                    e.currentTarget.style.color = 'var(--text-secondary)'
                  }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav Links */}
          {!isMobile && (
            <div style={{ display: 'flex', gap: 80 }}>
              <div>
                <div style={{
                  fontSize: 10, fontFamily: 'var(--font-mono)',
                  color: 'var(--accent-red)', letterSpacing: '0.18em',
                  textTransform: 'uppercase', marginBottom: 20,
                }}>
                  Navigation
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => scrollTo(link.id)}
                      style={{
                        background: 'none', border: 'none',
                        color: 'var(--text-secondary)', fontSize: 13,
                        cursor: 'pointer', textAlign: 'left',
                        padding: 0, transition: 'color 0.2s',
                        fontFamily: 'var(--font-body)',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-sand)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div style={{
                  fontSize: 10, fontFamily: 'var(--font-mono)',
                  color: 'var(--accent-red)', letterSpacing: '0.18em',
                  textTransform: 'uppercase', marginBottom: 20,
                }}>
                  Projects
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {['IHateLovePDF', 'GitHub Profile', 'Open to Work'].map((item, i) => (
                    <a
                      key={item}
                      href={i === 0 ? 'https://www.ihatelovepdf.com/' : i === 1 ? 'https://github.com/ShreyashSrivastavaa' : '#contact'}
                      target={i < 2 ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex', alignItems: 'center', gap: 4,
                        color: 'var(--text-secondary)', fontSize: 13,
                        textDecoration: 'none', transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-sand)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                    >
                      {item}
                      {i < 2 && <ArrowUpRight size={11} />}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Availability card */}
          <div style={{
            background: 'rgba(230,57,70,0.06)',
            border: '1px solid rgba(230,57,70,0.2)',
            borderRadius: 18, padding: '20px 24px',
            minWidth: 200,
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10,
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: 'var(--accent-red)',
                boxShadow: '0 0 8px rgba(230,57,70,0.7)',
                animation: 'badgePulse 2s infinite',
                display: 'inline-block',
              }} />
              <span style={{
                fontSize: 11, fontFamily: 'var(--font-mono)',
                color: 'var(--accent-red)', letterSpacing: '0.1em',
              }}>
                AVAILABLE
              </span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-sand)', marginBottom: 4 }}>
              Open to new projects
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              Freelance & Full-time roles
            </div>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('contact') }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                marginTop: 14, padding: '8px 16px', borderRadius: 999,
                background: 'var(--accent-red)', color: 'white',
                fontSize: 12, fontWeight: 600, textDecoration: 'none',
                transition: 'var(--transition)',
                fontFamily: 'var(--font-heading)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--accent-crimson)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--accent-red)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Hire Me →
            </a>
          </div>
        </div>

        {/* Bottom divider */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: 24,
          display: 'flex',
          justifyContent: isMobile ? 'center' : 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap', gap: 12,
          flexDirection: isMobile ? 'column' : 'row',
          textAlign: isMobile ? 'center' : 'left',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 11,
            color: 'var(--text-muted)', letterSpacing: '0.04em',
          }}>
            © {year} Shreyash Srivastava — All rights reserved.
          </span>

          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 11,
            color: 'var(--text-muted)', letterSpacing: '0.04em',
            display: 'flex', alignItems: 'center', gap: 5,
          }}>
            Built with
            <Heart size={11} style={{ color: 'var(--accent-red)' }} />
            using Next.js, Three.js & Framer Motion
          </span>
        </div>
      </div>
    </motion.footer>
  )
}
