'use client'

import { motion } from 'framer-motion'
import { Terminal, Home, Code, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import AnimatedBackground from '@/components/AnimatedBackground'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#f1f0eb] text-[#242620] relative overflow-hidden flex flex-col justify-between">
      <CustomCursor />
      <AnimatedBackground />

      <div className="relative z-10 w-full">
        <Navbar />

        <section className="pt-28 pb-20 px-6 md:px-12 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="samay-card p-10 sm:p-16 bg-[#ffffff] max-w-2xl mx-auto border border-[#d3d3c8]"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0066ff]/10 border border-[#0066ff]/30 text-[#0066ff] font-mono text-xs font-bold uppercase tracking-widest mb-6">
              <Terminal size={14} />
              <span>404: ROUTE_NOT_FOUND</span>
            </div>

            <h1 className="text-6xl sm:text-8xl font-black font-sans text-[#242620] mb-4 tracking-tighter">
              404
            </h1>

            <h2 className="text-xl sm:text-2xl font-bold font-sans text-[#242620] mb-3">
              Page or Project Not Found
            </h2>

            <p className="text-xs sm:text-sm text-[#6f7168] max-w-md mx-auto mb-8 leading-relaxed">
              The requested page or project case study does not exist or has been relocated.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/"
                className="btn-pill-primary inline-flex items-center gap-2"
              >
                <Home size={14} />
                <span>Return to Home</span>
              </Link>

              <Link
                href="/projects"
                className="btn-pill-secondary inline-flex items-center gap-2"
              >
                <Code size={14} />
                <span>Explore Projects Archive</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
