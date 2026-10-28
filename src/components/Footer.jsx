'use client'

import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowUpRight, ArrowUp, Coffee, FileText } from 'lucide-react'

const navLinks = [
  { label: 'work', id: 'portfolio', href: '/projects' },
  { label: 'about me', id: 'about', href: '/about' },
  { label: 'stack', id: 'skills', href: '/skills' },
  { label: 'methodology', id: 'process', href: '/#process' },
  { label: 'contact', id: 'contact', href: '/contact' },
]

const socials = [
  { icon: <Github size={15} />, href: 'https://github.com/ShreyashSrivastavaa', label: 'GitHub' },
  { icon: <Linkedin size={15} />, href: 'https://www.linkedin.com/in/shreyashsrivastavaa', label: 'LinkedIn' },
  { icon: <Mail size={15} />, href: 'mailto:shreyashsr2004@gmail.com', label: 'Email' },
  { icon: <Coffee size={15} />, href: 'https://buymeacoffee.com/shreyashsrivastavaa', label: 'BuyMeACoffee' },
]

export default function Footer() {
  const pathname = usePathname()
  const router = useRouter()
  const year = new Date().getFullYear()

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const resumeUrl = 'https://drive.google.com/file/d/1DdV6JomHJOz0zidCsnwO5KFINzlq4QJO/view?usp=sharing'

  return (
    <footer className="w-full relative z-20 text-[#242620] bg-[#f1f0eb] select-none">
      
      {/* HIGH-THROUGHPUT TELEMETRY WAVEFORM GRAPH */}
      <div className="relative w-full h-[180px] sm:h-[240px] md:h-[280px] overflow-hidden">
        <svg
          viewBox="0 0 1440 320"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          <defs>
            <linearGradient id="footer-wave-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0066ff" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#0066ff" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="footer-wave-grad-base" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e2e0d5" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#f1f0eb" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Background baseline shaded envelope */}
          <path
            d="M0 260 C 240 250, 480 230, 720 180 C 960 130, 1180 90, 1440 60 L 1440 320 L 0 320 Z"
            fill="url(#footer-wave-grad-base)"
          />

          {/* High-throughput throughput fill */}
          <path
            d="M0 260 C 200 255, 380 230, 560 170 C 740 110, 960 70, 1140 50 C 1260 36, 1360 42, 1440 45 L 1440 320 L 0 320 Z"
            fill="url(#footer-wave-grad)"
          />

          {/* Telemetry Grid Guideline 1: Baseline */}
          <line
            x1="0"
            y1="260"
            x2="1440"
            y2="260"
            stroke="#d3d3c8"
            strokeWidth="1"
            strokeDasharray="6 8"
            opacity="0.6"
          />

          {/* Telemetry Grid Guideline 2: Median Load */}
          <line
            x1="0"
            y1="160"
            x2="1440"
            y2="160"
            stroke="#d3d3c8"
            strokeWidth="1"
            strokeDasharray="6 8"
            opacity="0.4"
          />

          {/* Telemetry Grid Guideline 3: Peak Threshold */}
          <line
            x1="0"
            y1="60"
            x2="1440"
            y2="60"
            stroke="#0066ff"
            strokeWidth="1"
            strokeDasharray="4 6"
            opacity="0.5"
          />

          {/* Primary Throughput Wave Line */}
          <motion.path
            d="M0 260 C 200 255, 380 230, 560 170 C 740 110, 960 70, 1140 50 C 1260 36, 1360 42, 1440 45"
            stroke="#242620"
            strokeWidth="2.2"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />

          {/* Pulse Latency Glow Stroke */}
          <motion.path
            d="M560 170 C 740 110, 960 70, 1140 50"
            stroke="#0066ff"
            strokeWidth="2.5"
            strokeDasharray="6 6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.85 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.6 }}
          />
        </svg>

        {/* TELEMETRY PEAK STATUS INDICATOR */}
        <div className="absolute top-[22%] left-[78%] -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.25)] animate-pulse" />
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#242620] font-semibold bg-[#ffffff]/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#d3d3c8] shadow-sm flex items-center gap-2">
            <span>DELHI · 28.6139° N, 77.2090° E</span>
            <span className="text-[#8e9087]">|</span>
            <span className="text-[#0066ff]">99.999% SLA</span>
          </span>
        </div>
      </div>

      {/* FOOTER BODY */}
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10 pb-16 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16 border-b border-[#d3d3c8]">
          
          {/* LEFT COLUMN: EDITORIAL STATEMENT */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-sans font-bold text-[#242620] tracking-tight leading-[1.05]">
              someday, <span className="font-serif italic font-normal text-[#0066ff]">a million rps.</span>
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#6f7168] max-w-lg leading-relaxed">
              Zero dropped packets, sub-millisecond p99 latency, and resilient architectures engineered backwards from failure cases. Building deterministic distributed systems that handle internet scale without flinching.
            </p>
            <div className="font-hand text-xl text-[#0066ff]">
              see you in production ✌️
            </div>
          </div>

          {/* RIGHT COLUMN: ACTIONS & CONTACT */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end space-y-6">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans font-medium text-sm text-[#ffffff] bg-[#242620] hover:bg-[#0066ff] px-6 py-2.5 rounded-full shadow-md transition-all hover:-translate-y-0.5"
            >
              <span>resume</span>
              <ArrowUpRight size={15} />
            </a>

            <a
              href="mailto:shreyashsr2004@gmail.com"
              className="font-serif text-2xl sm:text-3xl text-[#242620] underline decoration-[#0066ff] decoration-1 underline-offset-8 hover:text-[#0066ff] transition-colors"
            >
              shreyashsr2004@gmail.com
            </a>

            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full bg-[#ffffff] border border-[#d3d3c8] flex items-center justify-center text-[#242620] hover:bg-[#0066ff] hover:text-[#ffffff] hover:border-[#0066ff] transition-all shadow-sm"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM COLOPHON */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#6f7168]">
          <p>© {year} Shreyash Srivastava · Delhi, India</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-2 text-center sm:text-right">
            <p>
              VR headset model:{' '}
              <a
                href="https://sketchfab.com/3d-models/lowpoly-vr-glasses-c37e201c0f4a49deb2415b4949e011e7"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#242620] transition-colors"
              >
                &ldquo;Lowpoly VR glasses&rdquo;
              </a>{' '}
              by{' '}
              <a
                href="https://sketchfab.com/taigo"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#242620] transition-colors"
              >
                taigo
              </a>
              , licensed{' '}
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#242620] transition-colors"
              >
                CC BY 4.0
              </a>
              .
            </p>
            <button
              onClick={scrollTop}
              className="inline-flex items-center gap-1.5 hover:text-[#242620] transition-colors cursor-pointer ml-2"
              aria-label="Back to top"
            >
              <span>TOP</span>
              <ArrowUp size={12} className="text-[#0066ff]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
