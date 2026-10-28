'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import AnimatedBackground from '@/components/AnimatedBackground'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'
import ScrollToTop from '@/components/ScrollToTop'
import SoundDock from '@/components/SoundDock'

import Footer from '@/components/Footer'
import Navbar from '@/components/ui/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ProcessSection from '@/components/sections/ProcessSection'
import SkillsSection from '@/components/sections/SkillsSection'
import WorkIntroStage from '@/components/sections/WorkIntroStage'
import TheWorkBetween from '@/components/sections/TheWorkBetween'
import ExperimentsSection from '@/components/sections/ExperimentsSection'
import WorkOutroStage from '@/components/sections/WorkOutroStage'
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
      setTimeout(() => {
        const el = document.getElementById('portfolio')
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 150)
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

    const forceIntro = window.location.search.includes('intro')
    if (forceIntro) {
      sessionStorage.removeItem('introPlayed')
    }

    if (!hasPlayedIntro() || forceIntro) {
      setShowWelcome(true)
      setShowApp(false)

      const timer = setTimeout(() => {
        setShowWelcome(false)
        setShowApp(true)
        setIntroPlayed()
      }, 3000)

      return () => clearTimeout(timer)
    } else {
      setShowWelcome(false)
      setShowApp(true)
    }
  }, [])

  return (
    <main suppressHydrationWarning className="bg-[#f1f0eb] min-h-screen text-[#242620]" style={{ position: 'relative', overflowX: 'clip' }}>
      {/* Global enhancements */}
      <CustomCursor />
      <ScrollProgress />
      <AnimatedBackground />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <Navbar />
        <Hero showApp={showApp} />
        <WorkIntroStage />
        <ProjectsSection />
        <TheWorkBetween />
        <ExperimentsSection />
        <About />
        <TestimonialsSection />
        <ContactSection />
        <WorkOutroStage />
        <Footer />
      </div>

      {/* Floating widgets */}
      <SoundDock />
      <ScrollToTop />

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
