'use client'

import { motion } from 'framer-motion'
import { Terminal, Home, ArrowLeft, Code } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import AnimatedBackground from '@/components/AnimatedBackground'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#050508] text-[#f0ece8] relative overflow-hidden flex flex-col justify-between">
      <CustomCursor />
      <AnimatedBackground />

      <div className="relative z-10 w-full">
        <Navbar />

        <section className="pt-44 pb-24 px-6 md:px-12 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="glass-card p-10 sm:p-16 rounded-3xl border border-white/10 max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e63946]/10 border border-[#e63946]/30 text-[#e63946] font-mono text-xs font-bold uppercase tracking-widest mb-6">
              <Terminal size={14} />
              <span>ERROR 404: ROUTE_NOT_FOUND</span>
            </div>

            <h1 className="text-6xl sm:text-8xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 mb-4 tracking-tighter">
              404
            </h1>

            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white mb-3">
              System Endpoint Not Found
            </h2>

            <p className="text-xs sm:text-sm text-[#f0ece8]/70 max-w-md mx-auto mb-8 leading-relaxed font-light">
              The requested route or module does not exist in the routing table. It may have been moved, renamed, or temporarily deprecated.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#e63946] to-[#c1121f] text-white font-semibold text-xs shadow-lg shadow-red-500/20 hover:scale-105 transition-transform"
              >
                <Home size={14} />
                <span>Return to Headquarters</span>
              </Link>

              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white font-semibold text-xs hover:border-white/20 transition-colors"
              >
                <Code size={14} />
                <span>Explore Projects Archive</span>
              </Link>
            </div>
          </motion.div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
