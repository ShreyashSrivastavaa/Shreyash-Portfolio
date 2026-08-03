'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import AnimatedBackground from '@/components/AnimatedBackground'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'
import ScrollToTop from '@/components/ScrollToTop'
import AIChatbot from '@/components/AIChatbot'
import Footer from '@/components/Footer'
import Navbar from '@/components/ui/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import PortfolioShowcase from '@/components/sections/PortfolioShowcase'
import ProcessSection from '@/components/sections/ProcessSection'
import SkillsSection from '@/components/sections/SkillsSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import ContactSection from '@/components/sections/contact/ContactSection'
import WelcomeScreen from '@/components/WelcomeScreen'

import { hasPlayedIntro, setIntroPlayed } from '@/lib/introState'

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(false)
  const [showApp, setShowApp] = useState(true)

  useEffect(() => {
    const currentHash = window.location.hash
    const pathname = window.location.pathname

    if (currentHash === '#portfolio') {
      setShowWelcome(false)
      setShowApp(true)
      return
    }

    const navEntries = performance.getEntriesByType('navigation')
    const navigationType =
      navEntries.length > 0
        ? navEntries[0].type
        : null

    const isReload = navigationType === 'reload'

    if (isReload && pathname === '/') {
      sessionStorage.removeItem('introPlayed')
      sessionStorage.removeItem('heroPlayed')

      if (window.location.hash) {
        history.replaceState(null, '', '/')
      }

      window.scrollTo({
        top: 0,
        behavior: 'instant',
      })
    }

    if (!hasPlayedIntro()) {
      setShowWelcome(true)
      setShowApp(false)

      const timer = setTimeout(() => {
        setShowWelcome(false)
        setShowApp(true)
        setIntroPlayed()
      }, 2800)

      return () => clearTimeout(timer)
    } else {
      setShowWelcome(false)
      setShowApp(true)
    }
  }, [])

  return (
    <main style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Global enhancements */}
      <CustomCursor />
      <ScrollProgress />
      <AnimatedBackground />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <Navbar />
        <Hero showApp={showApp} />
        <About />
        <PortfolioShowcase />
        <ProcessSection />
        <SkillsSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </div>

      {/* Floating widgets */}
      <ScrollToTop />
      <AIChatbot />

      {/* Welcome screen overlay */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            onAnimationStart={(definition) => {
              if (definition === 'exit') {
                setShowApp(true)
              }
            }}
            transition={{
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1],
            }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
            }}
          >
            <WelcomeScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
