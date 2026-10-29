'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import AnimatedBackground from '@/components/AnimatedBackground'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'
import ScrollToTop from '@/components/ScrollToTop'
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

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    // Lock scrolling while preloader is active
    document.body.style.overflow = 'hidden'
    window.scrollTo({ top: 0, behavior: 'instant' })

    const timer = setTimeout(() => {
      setShowWelcome(false)
      document.body.style.overflow = ''

      // If URL has a hash, smooth-scroll after preloader finishes
      if (window.location.hash) {
        const targetId = window.location.hash.replace('#', '')
        const el = document.getElementById(targetId)
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth' })
          }, 350)
        }
      }
    }, 2800)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ''
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
        <Hero />
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
      <ScrollToTop />

      {/* Welcome screen overlay */}
      <AnimatePresence
        onExitComplete={() => {
          document.body.style.overflow = ''
        }}
      >
        {showWelcome && (
          <motion.div
            key="preloader-overlay"
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{
              duration: 1.0,
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
