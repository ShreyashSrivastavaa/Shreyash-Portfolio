'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, FileText, ArrowUpRight } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mounted, setMounted] = useState(false)

  const isHomePage = pathname === '/'

  useEffect(() => {
    setMounted(true)

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 10)

      if (pathname === '/') {
        const sections = ['home', 'about', 'portfolio', 'skills', 'experience', 'testimonials', 'contact']

        for (const sectionId of sections) {
          const section = document.getElementById(sectionId)
          if (!section) continue

          const rect = section.getBoundingClientRect()

          if (rect.top <= 180 && rect.bottom >= 180) {
            setActiveSection(sectionId)
            break
          }
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
  }, [pathname])

  if (!mounted) return null

  const handleNavClick = (e, item) => {
    setOpen(false)

    if (isHomePage) {
      if (item.id === 'home') {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setActiveSection('home')
        return
      }

      const target = document.getElementById(item.id)
      if (target) {
        e.preventDefault()
        const navbarOffset = 70
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarOffset
        window.scrollTo({ top: targetPosition, behavior: 'smooth' })
        setActiveSection(item.id)
        return
      }
    }

    router.push(item.href)
  }

  const navItems = [
    { label: 'Home', id: 'home', href: '/' },
    { label: 'About', id: 'about', href: '/about' },
    { label: 'Projects', id: 'portfolio', href: '/projects' },
    { label: 'Skills', id: 'skills', href: '/skills' },
    { label: 'Experience', id: 'experience', href: '/experience' },
    { label: 'Contact', id: 'contact', href: '/contact' },
  ]

  const isItemActive = (item) => {
    if (isHomePage) {
      return activeSection === item.id
    }
    if (item.href === '/') return pathname === '/'
    return pathname.startsWith(item.href)
  }

  const resumeUrl = 'https://drive.google.com/file/d/1Uwuk1fc6j7idN7o6-coz9A8sOyV0TDfA/view?usp=drive_link'

  return (
    <header className="sticky top-0 z-50 w-full bg-[#050508]/85 backdrop-blur-md border-b border-white/[0.06] transition-all">
      <div
        style={{ margin: '0 auto' }}
        className="w-full max-w-[1200px] px-6 sm:px-8 h-16 md:h-18 flex items-center justify-between"
      >
        
        {/* LEFT: LOGO / NAME */}
        <Link
          href="/"
          onClick={(e) => {
            if (isHomePage) {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
          className="font-heading font-bold text-lg sm:text-xl text-[#f5f5f7] hover:text-white tracking-tight"
        >
          Shreyash
        </Link>

        {/* CENTER: DESKTOP NAV LINKS */}
        {!isMobile && (
          <nav className="flex items-center gap-7 sm:gap-8">
            {navItems.map((item) => {
              const active = isItemActive(item)

              return (
                <a
                  key={item.id}
                  href={isHomePage ? `#${item.id}` : item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                    active
                      ? 'text-[#ff4d4f]'
                      : 'text-[#a1a1aa] hover:text-[#f5f5f7]'
                  }`}
                >
                  {item.label}
                </a>
              )
            })}
          </nav>
        )}

        {/* RIGHT: RESUME & HIRE ME BUTTON */}
        {!isMobile && (
          <div className="flex items-center gap-5">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#a1a1aa] hover:text-white transition-colors"
            >
              <FileText size={14} className="text-[#a1a1aa]" />
              <span>Resume</span>
            </a>

            <a
              href={isHomePage ? '#contact' : '/contact'}
              onClick={(e) => {
                if (isHomePage) {
                  e.preventDefault()
                  const contactEl = document.getElementById('contact')
                  if (contactEl) {
                    contactEl.scrollIntoView({ behavior: 'smooth' })
                  }
                }
              }}
              className="px-4 py-2 rounded-lg bg-[#ff4d4f] hover:bg-[#e03a3c] text-white font-medium text-xs transition-colors shadow-sm cursor-pointer"
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
            className="p-2 text-[#a1a1aa] hover:text-white transition cursor-pointer"
          >
            {open ? <X size={22} className="text-[#ff4d4f]" /> : <Menu size={22} />}
          </button>
        )}
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {isMobile && open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-b border-white/[0.08] bg-[#050508] px-6 py-5 flex flex-col gap-3"
          >
            {navItems.map((item) => {
              const active = isItemActive(item)

              return (
                <a
                  key={item.id}
                  href={isHomePage ? `#${item.id}` : item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`text-sm py-2 transition-colors flex items-center justify-between ${
                    active ? 'text-[#ff4d4f] font-semibold' : 'text-[#a1a1aa]'
                  }`}
                >
                  <span>{item.label}</span>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d4f]" />}
                </a>
              )
            })}

            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-4 mt-2">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#a1a1aa] hover:text-white"
              >
                <FileText size={14} />
                <span>Resume</span>
                <ArrowUpRight size={12} />
              </a>

              <a
                href={isHomePage ? '#contact' : '/contact'}
                onClick={(e) => {
                  setOpen(false)
                  if (isHomePage) {
                    e.preventDefault()
                    const contactEl = document.getElementById('contact')
                    if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="px-4 py-1.5 rounded-lg bg-[#ff4d4f] text-white text-xs font-medium"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
