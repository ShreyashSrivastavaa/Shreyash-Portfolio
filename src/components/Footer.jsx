'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Github, Linkedin, Mail, ArrowUpRight, Heart, ArrowUp } from 'lucide-react'

const navLinks = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'portfolio' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
]

const socials = [
  { icon: <Github size={15} />, href: 'https://github.com/ShreyashSrivastava15', label: 'GitHub' },
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
    <footer
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: '#0B132B',
        paddingTop: '64px',
        paddingBottom: '32px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          paddingLeft: '24px',
          paddingRight: '24px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          {/* BRAND */}
          <div style={{ maxWidth: '320px' }}>
            <div
              onClick={scrollTop}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '22px',
                fontWeight: 800,
                color: '#F8FAFC',
                marginBottom: '12px',
                cursor: 'pointer',
              }}
            >
              Shreyash<span style={{ color: '#60A5FA' }}>.dev</span>
            </div>
            <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: 1.7, margin: 0 }}>
              Backend SDE Intern at JBH Tech Innovation & B.Tech CSE student at ITS Engineering College (AKTU).
            </p>

            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#CBD5E1',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div style={{ display: 'flex', gap: '60px', flexWrap: 'wrap' }}>
            <div>
              <div
                style={{
                  fontSize: '11px',
                  fontFamily: "'JetBrains Mono', monospace",
                  color: '#60A5FA',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}
              >
                Quick Links
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#94A3B8',
                      fontSize: '13px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      padding: 0,
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: '11px',
                  fontFamily: "'JetBrains Mono', monospace",
                  color: '#60A5FA',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}
              >
                Featured Work
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a
                  href="https://gitfc.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#94A3B8', fontSize: '13px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  GitFC <ArrowUpRight size={12} />
                </a>
                <a
                  href="https://www.ihatelovepdf.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#94A3B8', fontSize: '13px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  IHateLovePDF <ArrowUpRight size={12} />
                </a>
                <a
                  href="https://github.com/ShreyashSrivastava15"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#94A3B8', fontSize: '13px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  GitHub Repositories <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM DIVIDER & BACK TO TOP */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              color: '#64748B',
            }}
          >
            © {year} Shreyash Srivastava (Ramboo). Built with Next.js & Framer Motion.
          </span>

          <button
            onClick={scrollTop}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '999px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#F8FAFC',
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Back to Top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  )
}
