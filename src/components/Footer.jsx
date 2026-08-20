'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Github, Linkedin, Mail, ArrowUpRight, ArrowUp } from 'lucide-react'
import Image from 'next/image'

const navLinks = [
  { label: 'Home', id: 'home', href: '/' },
  { label: 'About', id: 'about', href: '/about' },
  { label: 'Projects', id: 'portfolio', href: '/projects' },
  { label: 'Skills', id: 'skills', href: '/skills' },
  { label: 'Experience', id: 'experience', href: '/experience' },
  { label: 'Contact', id: 'contact', href: '/contact' },
]

const socials = [
  { icon: <Github size={15} />, href: 'https://github.com/ShreyashSrivastavaa', label: 'GitHub' },
  { icon: <Linkedin size={15} />, href: 'https://www.linkedin.com/in/shreyashsrivastavaa', label: 'LinkedIn' },
  { icon: <Mail size={15} />, href: 'mailto:shreyashsr2004@gmail.com', label: 'Email' },
]

export default function Footer() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const year = new Date().getFullYear()

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const handleLinkClick = (link) => {
    if (pathname === '/') {
      if (link.id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      const el = document.getElementById(link.id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    router.push(link.href)
  }

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg-primary)',
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
                fontFamily: 'var(--font-heading)',
                fontSize: '22px',
                fontWeight: 800,
                color: 'var(--text-sand)',
                marginBottom: '12px',
                cursor: 'pointer',
              }}
            >
              Shreyash<span style={{ color: 'var(--accent-red)' }}>.dev</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
              Former Backend SDE Intern at JBH Tech Innovation (6 Months) & B.Tech CSE student at ITS Engineering College (AKTU).
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
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'var(--transition)',
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
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--accent-red)',
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
                    onClick={() => handleLinkClick(link)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-secondary)',
                      fontSize: '13px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      padding: 0,
                      fontFamily: 'var(--font-body)',
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
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--accent-red)',
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
                  style={{ color: 'var(--text-secondary)', fontSize: '13px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  GitFC <ArrowUpRight size={12} />
                </a>
                <a
                  href="https://www.ihatelovepdf.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--text-secondary)', fontSize: '13px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  IHateLovePDF <ArrowUpRight size={12} />
                </a>
                <a
                  href="https://github.com/ShreyashSrivastavaa"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--text-secondary)', fontSize: '13px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  GitHub Repositories <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ UPSCALE TECH SOLUTIONS BRANDING ═══ */}
        <div
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '32px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: isMobile ? '20px' : '28px',
              padding: '28px 32px',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {/* Profile Photo - Rounded Squircle Card */}
            <div
              style={{
                position: 'relative',
                width: '68px',
                height: '68px',
                borderRadius: '22px',
                overflow: 'hidden',
                border: '2px solid #e63946',
                boxShadow: '0 0 25px rgba(230, 57, 70, 0.4), inset 0 0 15px rgba(230, 57, 70, 0.2)',
                background: 'radial-gradient(circle at center, #141824 0%, #050508 100%)',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                src="/profile-transparent.png"
                alt="Shreyash Srivastava"
                width={68}
                height={68}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  transform: 'scale(1.15) translateY(4px)',
                }}
              />
              {/* Lens Flare Ring Accent */}
              <div
                style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '-10px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Branding Text */}
            <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '18px',
                  fontWeight: 800,
                  color: 'var(--text-sand)',
                  letterSpacing: '0.02em',
                  marginBottom: '4px',
                }}
              >
                Upscale<span style={{ color: 'var(--accent-red)' }}>TechSolutions</span>
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.05em',
                }}
              >
                Created By Shreyash Srivastava
              </div>
            </div>

            {/* Divider (desktop only) */}
            {!isMobile && (
              <div
                style={{
                  width: '1px',
                  height: '40px',
                  background: 'var(--border)',
                  flexShrink: 0,
                }}
              />
            )}

            {/* Contact Email */}
            <a
              href="mailto:upscaletechsolution@gmail.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                borderRadius: '999px',
                background: 'rgba(230, 57, 70, 0.08)',
                border: '1px solid rgba(230, 57, 70, 0.2)',
                color: 'var(--accent-red)',
                fontSize: '12px',
                fontFamily: 'var(--font-mono)',
                textDecoration: 'none',
                letterSpacing: '0.03em',
                transition: 'var(--transition)',
              }}
            >
              <Mail size={13} />
              upscaletechsolution@gmail.com
            </a>
          </div>
        </div>

        {/* ═══ BOTTOM ROW ═══ */}
        <div
          style={{
            borderTop: '1px solid var(--border)',
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
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
            }}
          >
            © {year} <span style={{ color: 'var(--text-sand)' }}>UpscaleTechSolutions</span>. All rights reserved.
          </span>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollTop}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '999px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border)',
              color: 'var(--text-sand)',
              fontSize: '12px',
              fontFamily: 'var(--font-heading)',
              cursor: 'pointer',
              transition: 'var(--transition)',
            }}
          >
            Back to Top <ArrowUp size={14} />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
