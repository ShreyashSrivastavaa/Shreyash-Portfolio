'use client'

import { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import projectsData from '@/data/projects.json'

// Dynamically import WebGL gallery with SSR disabled
const CurvedWorkGalleryWebGL = dynamic(
  () => import('./CurvedWorkGalleryWebGL'),
  { ssr: false }
)

// Curated 6 core featured projects
const ORDERED_FEATURED_IDS = [
  'ihatelovepdf',
  'weddinginvite',
  'gitfc',
  'zymeal',
  'swiperide',
  'savethesystem',
]

const FEATURED_PROJECTS = ORDERED_FEATURED_IDS.map((id) =>
  projectsData.find((p) => p.id === id)
).filter(Boolean)

const MORE_PROJECTS = projectsData.filter(
  (p) => !ORDERED_FEATURED_IDS.includes(p.id)
)

const EDITORIAL_PROJECT_DATA = {
  ihatelovepdf: {
    heroHeadline:
      'Zero server file uploads, client-side WebAssembly OCR, and 45 tools built for 100% private document processing.',
    heroSubtext:
      'A privacy-first web toolkit replacing slow, paywalled online converters with instant in-browser WebAssembly execution.',
    brandMark: 'Client-Side · Utility',
    brandBadge: '45-TOOL SUITE',
  },
  weddinginvite: {
    heroHeadline:
      'WhatsApp-first wedding guest list and RSVP platform built for Indian weddings.',
    heroSubtext:
      'A simple way for couples and families to share invites on WhatsApp, collect RSVPs, and track headcounts without per-message costs.',
    brandMark: 'Web App · Events',
    brandBadge: 'RSVP PLATFORM',
  },
  savethesystem: {
    heroHeadline:
      'Interactive browser simulator for debugging high-traffic server outages.',
    heroSubtext:
      'A hands-on training sandbox where engineers practice incident triage, inspecting logs, and configuring rate limiters under simulated stress.',
    brandMark: 'Systems Design · Simulator',
    brandBadge: 'INCIDENT LAB',
  },
  gitfc: {
    heroHeadline:
      'Turn your GitHub commits, PRs, and top languages into a custom EA FC-style trading card.',
    heroSubtext:
      'A fun web app that connects to the GitHub API, calculates your dev stats, and renders high-res cards directly in your browser.',
    brandMark: 'Developer Tools · Web App',
    brandBadge: 'STAT CARD GENERATOR',
  },
  zymeal: {
    heroHeadline:
      'Real-time cafeteria food ordering with live order tracking over WebSockets.',
    heroSubtext:
      'A full-stack app for diners and kitchen staff to browse menus, place orders, and follow food preparation live without refreshing.',
    brandMark: 'Full-Stack · WebSockets',
    brandBadge: 'LIVE FOOD ORDERING',
  },
  swiperide: {
    heroHeadline:
      'Real-time ride-hailing backend API with fast geospatial driver matching.',
    heroSubtext:
      'Matches riders with nearby drivers in milliseconds using Redis coordinate caching, MongoDB 2DSphere indexes, and WebSocket trip updates.',
    brandMark: 'Backend Architecture · APIs',
    brandBadge: 'RIDE-HAILING API',
  },
}

// Fallback mobile card
function MobileWorkCard({ project, index }) {
  const img = project.image_urls?.[0] || project.image_url || null
  const editorial = EDITORIAL_PROJECT_DATA[project.id] || {
    heroHeadline: project.tagline || project.description,
    heroSubtext: project.description,
    brandMark: 'Engineering Project',
    brandBadge: 'PRODUCTION',
  }
  const paddedIndex = String(index + 1).padStart(2, '0')

  return (
    <article className="w-full flex flex-col justify-between bg-[#ffffff] text-[#242620] rounded-2xl overflow-hidden shadow-2xl border border-[#d3d3c8]">
      <div className="p-6 flex flex-col justify-between space-y-4">
        <div className="flex items-center justify-between border-b border-[#e6e5df] pb-3">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#6f7168]">
            {paddedIndex} / FEATURED WORK
          </span>
          <span className="font-mono text-[10px] text-[#0066ff] bg-[#0066ff]/10 border border-[#0066ff]/20 px-2 py-0.5 rounded-sm">
            {editorial.brandBadge}
          </span>
        </div>

        <div>
          <h3 className="font-sans font-bold text-xl text-[#242620] leading-snug">
            {editorial.heroHeadline}
          </h3>
          <p className="font-sans text-xs text-[#6f7168] mt-2 leading-relaxed">
            {editorial.heroSubtext}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2">
          <Link
            href={`/projects/${project.id}`}
            className="inline-flex items-center gap-1.5 font-sans font-semibold text-xs text-[#ffffff] bg-[#242620] px-4 py-2 rounded-full"
          >
            <span>view case study</span>
            <ArrowRight size={13} />
          </Link>
          {project.tech?.slice(0, 3).map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] text-[#6f7168] bg-[#f1f0eb] border border-[#d3d3c8] px-2 py-0.5 rounded-md"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {img && (
        <div className="w-full aspect-[16/10] bg-[#141212] border-t border-[#d3d3c8] overflow-hidden flex items-center justify-center p-3">
          <img src={img} alt={project.title} className="w-full h-full object-contain" />
        </div>
      )}
    </article>
  )
}

export default function ProjectsSection() {
  const [isDesktop, setIsDesktop] = useState(true)
  const shouldReduceMotion = useReducedMotion()

  const markerRef = useRef(null)
  const percentTextRef = useRef(null)
  const containerRef = useRef(null)

  useLayoutEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 768 && !shouldReduceMotion)
    }
    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [shouldReduceMotion])

  const handleProgressChange = useCallback((progress) => {
    if (markerRef.current) {
      markerRef.current.style.transform = `translate3d(-50%, ${(progress * 145).toFixed(1)}px, 0px)`
    }
    if (percentTextRef.current) {
      percentTextRef.current.textContent = `${Math.round(progress * 100)}%`
    }
  }, [])

  return (
    <section
      id="portfolio"
      suppressHydrationWarning
      className="relative w-full bg-[#141212] text-[#f1f0eb]"
      aria-label="Featured Projects Showcase"
    >
      {/* 1. TOP CURVED SECTION EDGE TRANSITION INTO PRECEDING STAGE */}
      <div className="absolute -top-12 sm:-top-16 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
        <svg
          viewBox="0 0 1440 90"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-12 sm:h-16 block text-[#141212]"
        >
          <path d="M0,90 Q720,15 1440,90 L1440,90 L0,90 Z" fill="currentColor" />
        </svg>
      </div>

      {/* 2. BOTTOM CURVED SECTION EDGE TRANSITION INTO SUBSEQUENT SECTION */}
      <div className="absolute -bottom-12 sm:-bottom-16 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
        <svg
          viewBox="0 0 1440 90"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-12 sm:h-16 block text-[#141212]"
        >
          <path d="M0,0 Q720,75 1440,0 L1440,0 L0,0 Z" fill="currentColor" />
        </svg>
      </div>

      {isDesktop ? (
        <div ref={containerRef} suppressHydrationWarning className="relative w-full h-[550vh]">
          {/* STICKY VIEWPORT CONTAINER - Confined strictly to #portfolio */}
          <div suppressHydrationWarning className="sticky top-0 h-screen w-full overflow-hidden bg-[#141212]">
            {/* TOP HUD HEADER (absolute within sticky stage, NOT fixed) */}
            <div className="absolute top-6 sm:top-8 left-0 right-0 z-20 pointer-events-none px-6 sm:px-12 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#a0a0a0]">
                  01 / FEATURED WORK
                </span>
                <span className="font-hand text-lg text-[#0066ff] hidden sm:inline">
                  · scroll horizontally
                </span>
              </div>
              <div className="pointer-events-auto flex items-center gap-3">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-[#f1f0eb] bg-[#1f1e1e] hover:bg-[#0066ff] border border-[#333] px-3.5 py-1.5 rounded-full transition-all shadow-md group"
                >
                  <span>ALL {projectsData.length} PROJECTS</span>
                  <ArrowUpRight size={13} className="text-[#0066ff] group-hover:text-white transition-colors" />
                </Link>
                <span className="font-mono text-xs text-[#6f7168] hidden lg:inline">
                  USE MOUSE SCROLL WHEEL TO EXPLORE →
                </span>
              </div>
            </div>

            {/* RIGHT HUD VERTICAL PROGRESS TRACK WITH PEN MARKER (absolute within sticky stage) */}
            <div className="absolute right-4 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-20">
              <div className="relative w-8 h-[160px] flex items-center justify-center">
                {/* Hairline Rail */}
                <div className="w-[1.5px] h-full bg-[#2a2a2a] rounded-full" />

                {/* Moving Marker Container (Direct Ref Update - 0 React Rerenders!) */}
                <div
                  ref={markerRef}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translate3d(-50%, 0px, 0px)',
                    willChange: 'transform',
                    transition: 'none',
                  }}
                  className="flex items-center gap-1.5"
                >
                  {/* Pen Marker Icon */}
                  <div className="w-5 h-5 rounded-full bg-[#1f1f1f] border border-[#0066ff]/40 flex items-center justify-center shadow-lg">
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0066ff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="-rotate-45"
                    >
                      <path d="M12 19l7-7 3 3-7 7-3-3z" />
                      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                      <path d="M2 2l7.586 7.586" />
                      <circle cx="11" cy="11" r="2" />
                    </svg>
                  </div>

                  {/* Percentage Text */}
                  <span
                    ref={percentTextRef}
                    className="font-mono text-[10px] sm:text-[11px] font-semibold text-[#0066ff] bg-[#141212]/90 border border-[#2a2a2a] px-1.5 py-0.5 rounded-sm"
                  >
                    0%
                  </span>
                </div>
              </div>
            </div>

            {/* BOTTOM SKIP BAR (absolute within sticky stage) */}
            <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-20 px-6 sm:px-12 flex items-center justify-between text-xs font-mono text-[#6f7168] pointer-events-none">
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center w-6 h-6 rounded-full border border-[#333] bg-[#1a1919] text-[#0066ff]"
                  title="Sound"
                  aria-label="Sound ambiance"
                >
                  <div className="flex items-end gap-0.5 h-2">
                    <span className="w-[1.5px] h-1.5 bg-[#0066ff] rounded-full animate-pulse" />
                    <span className="w-[1.5px] h-2 bg-[#0066ff] rounded-full animate-pulse delay-75" />
                    <span className="w-[1.5px] h-1 bg-[#0066ff] rounded-full animate-pulse delay-150" />
                  </div>
                </div>
                <span className="hidden sm:inline">
                  {FEATURED_PROJECTS.length} FEATURED PRODUCTS · ARCHIVE AT END
                </span>
                <Link
                  href="/projects"
                  className="pointer-events-auto text-[#0066ff] hover:underline underline-offset-4 font-semibold ml-2"
                >
                  [EXPLORE ALL {projectsData.length} PROJECTS →]
                </Link>
              </div>
              <a
                href="#about"
                className="pointer-events-auto hover:text-[#f1f0eb] text-[#a0a0a0] underline underline-offset-4 tracking-wider transition-colors"
              >
                SKIP AHEAD →
              </a>
            </div>

            {/* THE WEBGL CURVED SURFACE GALLERY */}
            <CurvedWorkGalleryWebGL
              containerRef={containerRef}
              onProgressChange={handleProgressChange}
            />
          </div>
        </div>
      ) : (
        /* MOBILE & REDUCED MOTION CLEAN VERTICAL STACK */
        <div className="py-20 px-4 sm:px-6 max-w-4xl mx-auto space-y-12">
          <div className="flex items-center justify-between border-b border-[#2a2a2a] pb-4">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#a0a0a0]">
              01 / FEATURED WORK
            </span>
            <span className="font-mono text-xs text-[#0066ff]">ALL PROJECTS</span>
          </div>

          <div className="space-y-10">
            {FEATURED_PROJECTS.map((project, index) => (
              <MobileWorkCard key={project.id} project={project} index={index} />
            ))}
          </div>

          <div className="bg-[#1a1919] border border-[#2a2a2a] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-sans font-bold text-2xl text-[#f1f0eb]">More work</h3>
                <p className="font-sans text-xs text-[#a0a0a0] mt-1">
                  Explore all {projectsData.length} projects, utilities, and applications.
                </p>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 font-sans font-semibold text-xs text-[#ffffff] bg-[#0066ff] px-4 py-2 rounded-full hover:bg-[#0052d4] transition-colors w-fit"
              >
                <span>all {projectsData.length} projects</span>
                <ArrowRight size={13} />
              </Link>
            </div>
            <div className="space-y-3">
              {MORE_PROJECTS.map((proj) => (
                <Link
                  key={proj.id}
                  href={`/projects/${proj.id}`}
                  className="flex items-center justify-between p-3 rounded-xl border border-[#2a2a2a] bg-[#1f1f1f] hover:bg-[#252525] transition-colors"
                >
                  <span className="font-sans text-sm font-semibold text-[#f1f0eb]">
                    {proj.title}
                  </span>
                  <ArrowRight size={14} className="text-[#0066ff]" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
