'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectNavigation from '@/components/portfolio/ProjectNavigation'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'
import AnimatedBackground from '@/components/AnimatedBackground'

import {
  ArrowLeft,
  ArrowUpRight,
  GitBranch,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Target,
  Database,
  Radio,
  Layers,
  ShieldCheck,
  Zap,
  Activity,
  Cpu
} from 'lucide-react'

export default function ProjectDetailClient({ project }) {
  const [currentImage, setCurrentImage] = useState(0)
  const [previewOpen, setPreviewOpen] = useState(false)

  if (!project) return null

  const galleryImages =
    project.image_urls || (project.image_url ? [project.image_url] : [])
  const keyFeatures = (project.key_features || []).slice(0, 4)
  const techStack = project.tech || []
  const metrics = project.metrics || []

  const hasLiveUrl = Boolean(project.live_url && project.live_url.trim() !== '')
  const hasGithubUrl = Boolean(
    project.github_url && project.github_url.trim() !== ''
  )

  const nextImage = () => {
    if (galleryImages.length <= 1) return
    setCurrentImage((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    if (galleryImages.length <= 1) return
    setCurrentImage(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    )
  }

  return (
    <main className="min-h-screen bg-[#09090b] text-[#f1f0eb] relative overflow-hidden font-sans selection:bg-[#0066ff] selection:text-white">
      <CustomCursor />
      <ScrollProgress />
      <AnimatedBackground />

      <div className="relative z-10">
        <Navbar />

        {/* IMAGE LIGHTBOX MODAL */}
        <AnimatePresence>
          {previewOpen && galleryImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
              onClick={() => setPreviewOpen(false)}
            >
              <button
                onClick={() => setPreviewOpen(false)}
                className="absolute top-6 right-6 px-4 py-2 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                aria-label="Close Preview"
              >
                CLOSE [ × ]
              </button>

              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      prevImage()
                    }}
                    className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full border border-white/20 bg-black/70 hover:bg-[#0066ff] text-white transition-colors cursor-pointer"
                    aria-label="Previous Image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage()
                    }}
                    className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full border border-white/20 bg-black/70 hover:bg-[#0066ff] text-white transition-colors cursor-pointer"
                    aria-label="Next Image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              <img
                key={currentImage}
                src={galleryImages[currentImage]}
                alt={`${project.title} preview`}
                className="max-w-[92vw] max-h-[85vh] object-contain rounded-2xl border border-white/15 shadow-[0_0_50px_rgba(0,102,255,0.3)]"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* CASE STUDY CONTAINER */}
        <div className="w-full max-w-[1300px] mx-auto px-5 sm:px-8 md:px-12 pt-12 sm:pt-16 pb-24">
          
          {/* BREADCRUMB / HUD SECTION BAR */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 mb-10 text-xs font-mono">
            <div className="flex items-center gap-3">
              <Link
                href="/#portfolio"
                className="inline-flex items-center gap-2 text-[#f1f0eb] hover:text-[#0066ff] transition-colors group px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#0066ff]/40 shadow-sm"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform text-[#0066ff]" />
                <span className="font-semibold tracking-wide">BACK TO WORK</span>
              </Link>
              <span className="text-white/20">/</span>
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-[#a0a0a0] hover:text-[#f1f0eb] transition-colors px-2 py-1"
              >
                <span>ALL ARCHIVE</span>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="uppercase text-[#0066ff] bg-[#0066ff]/10 border border-[#0066ff]/30 px-3 py-0.5 rounded-full text-[11px] font-semibold">
                {project.category}
              </span>
            </div>
          </div>

          {/* HERO SECTION */}
          <section className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-16 pb-14 border-b border-white/10">
            {/* Left: Metadata, Logo, Overview */}
            <div className="lg:col-span-6 flex flex-col items-start space-y-5">
              
              {/* Role & Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#a0a0a0]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066ff] shadow-[0_0_8px_#0066ff]" />
                <span>{project.role}</span>
                <span className="text-white/20">•</span>
                <span className="text-[#c4c4c4]">{project.category}</span>
              </div>

              {/* Title & Brand Logo */}
              <div className="flex items-center gap-4 sm:gap-5 pt-1">
                {project.logo_url && (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-white/20 bg-white/[0.04] p-2 backdrop-blur-md shadow-[0_0_30px_rgba(0,102,255,0.25)] shrink-0 flex items-center justify-center">
                    <img
                      src={project.logo_url}
                      alt={`${project.title} logo`}
                      className="w-full h-full object-contain rounded-xl"
                    />
                  </div>
                )}
                <div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-[#f1f0eb] tracking-tight leading-[1.12]">
                    {project.title.split(/[:—]/)[0].trim()}
                  </h1>
                  {project.title.includes(':') && (
                    <span className="font-mono text-xs sm:text-sm text-[#0066ff] tracking-wide block mt-1">
                      {project.title.split(':')[1].trim()}
                    </span>
                  )}
                </div>
              </div>

              {/* Tagline / Elevator Pitch */}
              <p className="font-sans text-sm sm:text-base text-[#a0a0a0] leading-relaxed max-w-xl">
                {project.tagline || project.description}
              </p>

              {/* Stark Telemetry Metrics HUD */}
              {metrics.length > 0 && (
                <div className="w-full grid grid-cols-3 gap-3 pt-2">
                  {metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3 sm:p-3.5 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md"
                    >
                      <span className="text-base sm:text-xl font-bold font-mono text-[#0066ff] block leading-tight">
                        {m.value}
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-mono text-[#707070] uppercase tracking-wider block mt-1">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech Stack Badges */}
              {techStack.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {techStack.slice(0, 5).map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs font-mono rounded-lg border border-white/10 bg-white/[0.04] text-[#c4c4c4] backdrop-blur-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                {project.id === 'ihatelovepdf' ? (
                  <a
                    href="https://www.ihatelovepdf.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0066ff] hover:bg-[#0052d4] text-white font-sans text-xs font-semibold tracking-wide shadow-[0_0_25px_rgba(0,102,255,0.4)] transition-all hover:scale-102"
                  >
                    <span>VISIT IHATELOVEPDF.COM</span>
                    <ExternalLink size={13} />
                  </a>
                ) : hasLiveUrl ? (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0066ff] hover:bg-[#0052d4] text-white font-sans text-xs font-semibold tracking-wide shadow-[0_0_25px_rgba(0,102,255,0.4)] transition-all hover:scale-102"
                  >
                    <span>VIEW LIVE PROJECT</span>
                    <ExternalLink size={13} />
                  </a>
                ) : null}

                {hasGithubUrl && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/15 text-[#f1f0eb] font-mono text-xs transition-all hover:border-white/30"
                  >
                    <GitBranch size={13} />
                    <span>REPOSITORY</span>
                  </a>
                )}
              </div>
            </div>

            {/* Right: macOS Browser Viewport Mockup */}
            <div className="lg:col-span-6 w-full">
              {galleryImages[0] && (
                <div
                  className="w-full rounded-2xl border border-white/15 bg-[#141212] overflow-hidden shadow-2xl group cursor-pointer relative transition-all duration-300 hover:border-white/30 hover:shadow-[0_0_40px_rgba(0,102,255,0.2)]"
                  onClick={() => setPreviewOpen(true)}
                >
                  {/* Window Bar */}
                  <div className="w-full bg-[#1b1919] border-b border-white/10 px-4 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80" />
                    </div>
                    <span className="font-mono text-[10px] text-white/40 truncate max-w-[200px]">
                      {project.live_url?.replace(/^https?:\/\//, '').replace(/\/$/, '') || `${project.id}.shreyash.dev`}
                    </span>
                    <span className="font-mono text-[10px] text-[#0066ff] tracking-wider uppercase">
                      [ EXPAND + ]
                    </span>
                  </div>

                  {/* Visual Preview */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-black/60">
                    <img
                      src={galleryImages[0]}
                      alt={`${project.title} architecture and preview`}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>

                  {/* Figure Caption */}
                  <div className="px-4 py-2.5 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-[#a0a0a0]">
                    <span>FIG. 01 : {project.title.split(/[:—]/)[0].toUpperCase()}</span>
                    <span className="text-[#0066ff] font-semibold">CLICK TO INSPECT</span>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* CONTENT SECTIONS IN ARCHITECTURAL MATRIX */}
          <div className="space-y-10 mb-16">
            
            {/* 1. OVERVIEW */}
            {project.description && (
              <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-md">
                <div className="font-mono text-xs uppercase tracking-widest text-[#0066ff] pb-3 border-b border-white/10 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0066ff]" />
                  <span>01 / OVERVIEW & CONTEXT</span>
                </div>
                <p className="font-sans text-sm sm:text-base text-[#c4c4c4] leading-relaxed max-w-4xl">
                  {project.description}
                </p>
              </section>
            )}

            {/* 2. PROBLEM & SOLUTION DUAL CELLS */}
            {(project.problem || project.solution) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {project.problem && (
                  <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-md">
                    <div className="font-mono text-xs uppercase tracking-widest text-[#8e9087] pb-3 border-b border-white/10 mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8e9087]" />
                      <span>02 / PROBLEM STATEMENT</span>
                    </div>
                    <p className="font-sans text-sm text-[#a0a0a0] leading-relaxed">
                      {project.problem}
                    </p>
                  </section>
                )}

                {project.solution && (
                  <section className="rounded-2xl border border-[#0066ff]/25 bg-gradient-to-br from-[#0066ff]/[0.04] to-transparent p-6 sm:p-8 backdrop-blur-md">
                    <div className="font-mono text-xs uppercase tracking-widest text-[#0066ff] pb-3 border-b border-white/10 mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0066ff] shadow-[0_0_8px_#0066ff]" />
                      <span>03 / ARCHITECTURAL SOLUTION</span>
                    </div>
                    <p className="font-sans text-sm text-[#f1f0eb] leading-relaxed">
                      {project.solution}
                    </p>
                  </section>
                )}
              </div>
            )}

            {/* 3. KEY FEATURES (4-COLUMN ARCHITECTURAL GRID) */}
            {keyFeatures.length > 0 && (
              <section className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden backdrop-blur-md">
                <div className="px-6 py-4 border-b border-white/10 font-mono text-xs uppercase tracking-widest text-[#0066ff] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0066ff]" />
                  <span>04 / KEY FEATURES & SYSTEM CAPABILITIES</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
                  {keyFeatures.map((feat, idx) => (
                    <div key={idx} className="p-6 flex items-start gap-4">
                      <span className="font-mono text-sm font-bold text-[#0066ff] mt-0.5">
                        0{idx + 1}.
                      </span>
                      <p className="font-sans text-xs sm:text-sm text-[#c4c4c4] leading-relaxed">
                        {feat}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 4. TECH STACK SPECIFICATION */}
            {techStack.length > 0 && (
              <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-md">
                <div className="font-mono text-xs uppercase tracking-widest text-[#0066ff] pb-3 border-b border-white/10 mb-5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0066ff]" />
                  <span>05 / FULL TECHNOLOGY MATRIX</span>
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                  {techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 text-xs font-mono rounded-lg border border-white/10 bg-white/[0.04] text-[#f1f0eb] hover:border-[#0066ff]/40 hover:text-[#0066ff] transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* BOTTOM NAVIGATION */}
          <ProjectNavigation currentId={project.id} />
        </div>

        <Footer />
      </div>
    </main>
  )
}
