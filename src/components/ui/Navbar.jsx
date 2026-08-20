'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Terminal } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mounted, setMounted] = useState(false)
  const [showNavbar, setShowNavbar] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = ['home', 'about', 'portfolio', 'skills', 'testimonials', 'contact']

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId)
        if (!section) continue

        const rect = section.getBoundingClientRect()

        if (rect.top <= 160 && rect.bottom >= 160) {
          setActiveSection(sectionId)
          break
        }
      }
    }

    handleResize()
    handleScroll()

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const navbarPlayed = sessionStorage.getItem('navbarPlayed')

    if (navbarPlayed) {
      setShowNavbar(true)
      return
    }

    const timer = setTimeout(() => {
      setShowNavbar(true)
      sessionStorage.setItem('navbarPlayed', 'true')
    }, 2800)

    return () => clearTimeout(timer)
  }, [])

  if (!mounted) return null

  const smoothScrollTo = (e, targetId) => {
    e.preventDefault()

    const target = document.querySelector(targetId)
    if (!target) return

    const navbarOffset = 30
    const targetPosition =
      target.getBoundingClientRect().top + window.scrollY - navbarOffset

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    })

    setOpen(false)
  }

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'portfolio' },
    { label: 'Skills', id: 'skills' },
    { label: 'Reviews', id: 'testimonials' },
    { label: 'Contact', id: 'contact' },
  ]

  return (
    <motion.nav
      initial={{ opacity: 0, y: -40 }}
      animate={{
        opacity: showNavbar ? 1 : 0,
        y: showNavbar ? 0 : -40,
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        position: 'fixed',
        top: 20,
        left: isMobile ? 16 : 60,
        right: isMobile ? 16 : 60,
        zIndex: 990,
      }}
      aria-label="Main Navigation"
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 24px',
          width: '100%',
          borderRadius: 999,
          backgroundColor: scrolled
            ? 'rgba(5, 5, 8, 0.92)'
            : 'rgba(5, 5, 8, 0.65)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          border: '1px solid var(--border)',
          boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.5)' : 'none',
          transition: 'var(--transition)',
        }}
      >
        {/* BRAND / LOGO */}
        <a
          href="#home"
          onClick={(e) => smoothScrollTo(e, '#home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: 'var(--font-mono)',
            fontSize: 14,
            fontWeight: 700,
            color: 'var(--text-sand)',
            letterSpacing: '0.08em',
            textDecoration: 'none',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              padding: 4,
              borderRadius: 6,
              background: 'rgba(230, 57, 70, 0.15)',
              color: 'var(--accent-red)',
            }}
          >
            <Terminal size={15} />
          </span>
          Shreyash<span style={{ color: 'var(--accent-red)' }}>.dev</span>
        </a>

        {/* DESKTOP NAV */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <div style={{ display: 'flex', gap: 28 }}>
              {navItems.map((item) => {
                const isActive = activeSection === item.id

                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => smoothScrollTo(e, `#${item.id}`)}
                    style={{
                      position: 'relative',
                      fontFamily: 'var(--font-heading)',
                      fontSize: 13,
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? 'var(--text-sand)' : 'var(--text-secondary)',
                      textDecoration: 'none',
                      letterSpacing: '0.02em',
                      cursor: 'pointer',
                      padding: '4px 0',
                      transition: 'color 0.25s ease',
                    }}
                  >
                    {item.label}

                    <span
                      style={{
                        position: 'absolute',
                        bottom: -2,
                        left: 0,
                        width: '100%',
                        height: 2,
                        borderRadius: 2,
                        background: 'linear-gradient(90deg, var(--accent-red), var(--accent-crimson))',
                        transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                        transformOrigin: 'left',
                        transition: 'transform 0.25s ease',
                      }}
                    />
                  </a>
                )
              })}
            </div>

            {/* HIRE ME BUTTON */}
            <a
              href="#contact"
              onClick={(e) => smoothScrollTo(e, '#contact')}
              className="btn-hire-me"
            >
              Hire Me
            </a>
          </div>
        )}

        {/* MOBILE MENU TRIGGER BUTTON */}
        {isMobile && (
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              padding: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {open ? <X size={24} color="var(--accent-red)" /> : <Menu size={24} color="var(--text-primary)" />}
          </button>
        )}
      </div>

      {/* MOBILE MENU DROPDOWN OVERLAY */}
      <AnimatePresence>
        {isMobile && open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            style={{
              marginTop: 10,
              borderRadius: 20,
              background: 'rgba(5, 5, 8, 0.96)',
              border: '1px solid var(--border)',
              backdropFilter: 'blur(20px)',
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            }}
          >
            {navItems.map((item, index) => {
              const isActive = activeSection === item.id

              return (
                <motion.a
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  href={`#${item.id}`}
                  onClick={(e) => smoothScrollTo(e, `#${item.id}`)}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 15,
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'var(--text-sand)' : 'var(--text-secondary)',
                    textDecoration: 'none',
                    padding: '8px 12px',
                    borderRadius: 10,
                    background: isActive ? 'rgba(230, 57, 70, 0.12)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  {item.label}
                  {isActive && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-red)' }} />}
                </motion.a>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
