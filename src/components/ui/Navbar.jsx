'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight, Menu, X } from 'lucide-react'
import { SoundFX, unlockAudio } from '@/lib/SoundEngine'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isHomePage = pathname === '/'
  const isDarkPage = pathname.startsWith('/projects')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const resumeUrl = 'https://drive.google.com/file/d/1DdV6JomHJOz0zidCsnwO5KFINzlq4QJO/view?usp=sharing'

  const handleNavClick = (e, targetId, href) => {
    unlockAudio()
    SoundFX.click()
    setOpen(false)
    if (isHomePage) {
      e.preventDefault()
      const target = document.getElementById(targetId)
      if (target) {
        const offset = 80
        const pos = target.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top: pos, behavior: 'smooth' })
        return
      }
    }
    router.push(href)
  }

  const textColor = isDarkPage ? 'text-[#f1f0eb]' : 'text-[#242620]'
  const subtextColor = isDarkPage ? 'text-[#a0a0a0]' : 'text-[#6f7168]'

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 pointer-events-auto ${
        scrolled
          ? isDarkPage
            ? 'py-3.5 px-6 sm:px-12 bg-[#09090b]/85 backdrop-blur-md border-b border-white/10 shadow-lg'
            : 'py-3.5 px-6 sm:px-12 bg-[#f1f0eb]/90 backdrop-blur-md border-b border-black/5 shadow-sm'
          : 'pt-4 pb-2 px-6 sm:px-12 bg-transparent'
      }`}
    >
      <div className="max-w-[1340px] mx-auto flex items-center justify-between">
        {/* BRAND LOGO */}
        <div className="flex items-center">
          <Link
            href="/"
            onClick={(e) => {
              if (isHomePage) {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full overflow-hidden border border-[#d3d3c8] bg-black shadow-sm group-hover:border-[#0066ff] group-hover:scale-105 transition-all shrink-0">
              <img src="/app-logo.png" alt="Shreyash Srivastava Logo" className="w-full h-full object-cover" />
            </div>
            <span className={`text-xs font-sans font-bold tracking-tight ${textColor} group-hover:text-[#0066ff] transition-colors`}>
              shreyash.
            </span>
          </Link>
        </div>

        {/* CENTER NAVIGATION (EXACT SAMAY MAURYA SCREENSHOT 2) */}
        <nav className={`hidden md:flex items-center gap-8 text-[13px] font-sans font-medium ${textColor}`}>
          <button
            onClick={(e) => handleNavClick(e, 'portfolio', '/#portfolio')}
            className="hover:text-[#0066ff] transition-colors cursor-pointer"
          >
            work
          </button>

          <button
            onClick={(e) => handleNavClick(e, 'about', '/about')}
            className="hover:text-[#0066ff] transition-colors cursor-pointer"
          >
            about me
          </button>

          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-[#0066ff] transition-colors"
          >
            <span>resume</span>
            <span className="text-xs">⤓</span>
          </a>
        </nav>

        {/* RIGHT: COFFEE + SAY HEY + MOBILE TOGGLE */}
        <div className="flex items-center gap-3">
          <Link
            href="/buymeacoffee"
            className={`hidden sm:flex items-center gap-1 text-[13px] font-sans font-medium ${subtextColor} hover:text-[#0066ff] transition-colors`}
          >
            <span>☕ coffee</span>
          </Link>

          <a
            href={isHomePage ? '#contact' : '/contact'}
            onClick={(e) => {
              if (isHomePage) {
                e.preventDefault()
                const contactEl = document.getElementById('contact')
                if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className={`hidden sm:flex items-center gap-1 text-[13px] font-sans font-medium ${textColor} hover:text-[#0066ff] transition-colors`}
          >
            <span>say hey</span>
            <span className="text-xs">↗</span>
          </a>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className={`md:hidden w-8 h-8 flex items-center justify-center ${textColor} cursor-pointer`}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {open && (
        <div className="md:hidden mt-3 p-4 rounded-xl bg-white border border-[#d3d3c8] shadow-lg max-w-sm mx-auto flex flex-col space-y-3 text-sm">
          <button
            onClick={(e) => handleNavClick(e, 'portfolio', '/#portfolio')}
            className="text-left font-medium text-[#242620] hover:text-[#0066ff]"
          >
            work
          </button>
          <button
            onClick={(e) => handleNavClick(e, 'about', '/about')}
            className="text-left font-medium text-[#242620] hover:text-[#0066ff]"
          >
            about me
          </button>
          <Link
            href="/buymeacoffee"
            onClick={() => setOpen(false)}
            className="flex items-center justify-between font-medium text-[#6f7168] hover:text-[#0066ff]"
          >
            <span>☕ buy me a coffee</span>
            <span>↗</span>
          </Link>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between font-medium text-[#242620] hover:text-[#0066ff]"
          >
            <span>resume</span>
            <span>⤓</span>
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
            className="flex items-center justify-between font-medium text-[#0066ff]"
          >
            <span>say hey</span>
            <span>↗</span>
          </a>
        </div>
      )}
    </header>
  )
}
