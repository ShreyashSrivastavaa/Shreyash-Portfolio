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

// Feature icons for the minimal 2-column key features grid
const FEATURE_ICONS = [Target, Database, Radio, Layers, ShieldCheck, Zap, Activity, Cpu]

export default function ProjectDetailClient({ project }) {
  const [currentImage, setCurrentImage] = useState(0)
  const [previewOpen, setPreviewOpen] = useState(false)

  if (!project) return null

  const galleryImages =
    project.image_urls || (project.image_url ? [project.image_url] : [])
  const keyFeatures = (project.key_features || []).slice(0, 4)
  const techStack = project.tech || []
  const topTech = techStack.slice(0, 4)

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
    <main className="min-h-screen bg-[#050508] text-[#e6e6e6] relative overflow-hidden selection:bg-[#ff4d4f]/30 selection:text-white font-sans">
      <CustomCursor />
      <ScrollProgress />
      <AnimatedBackground />

      <div className="relative z-10">
        <Navbar />

        {/* ── IMAGE LIGHTBOX MODAL ── */}
        <AnimatePresence>
          {previewOpen && galleryImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[9999] bg-[#050508]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
              onClick={() => setPreviewOpen(false)}
            >
              <button
                onClick={() => setPreviewOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center cursor-pointer text-white"
                aria-label="Close Preview"
              >
                <X size={18} />
              </button>

              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      prevImage()
                    }}
                    className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-10 sm:w-11 h-10 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center cursor-pointer text-white"
                    aria-label="Previous Image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage()
                    }}
                    className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-10 sm:w-11 h-10 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center cursor-pointer text-white"
                    aria-label="Next Image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              <motion.img
                key={currentImage}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                src={galleryImages[currentImage]}
                alt={`${project.title} screenshot preview`}
                className="max-w-[90vw] max-h-[85vh] rounded-xl object-contain border border-white/10 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── CASE STUDY CONTAINER (1100PX MAX-WIDTH) ── */}
        <div
          style={{ margin: '0 auto' }}
          className="w-full max-w-[1100px] px-6 sm:px-8 md:px-12 pt-10 sm:pt-14 pb-20"
        >

          {/* ═══════════════════════════════════════════════════════════
             HERO SECTION
             ═══════════════════════════════════════════════════════════ */}
          <section className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 md:mb-20">
            
            {/* Left: Category, Big Title, 1-Line Description, Tech Stack, CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-6 flex flex-col items-start"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-[#ff4d4f] font-semibold mb-2">
                {project.category}
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#e6e6e6] font-heading mb-3 leading-tight">
                {project.title}
              </h1>

              <p className="text-base text-[#a1a1aa] leading-relaxed mb-6 font-light">
                {project.tagline || project.description}
              </p>

              {/* Tech Stack Badges (max 3-4) */}
              {topTech.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-8">
                  {topTech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono text-[#a1a1aa] bg-white/[0.04] border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {/* Two CTAs: View Live & GitHub */}
              <div className="flex flex-wrap items-center gap-3">
                {hasLiveUrl && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#ff4d4f] hover:bg-[#e03a3c] text-white font-medium text-xs sm:text-sm transition-colors shadow-sm cursor-pointer"
                  >
                    <ExternalLink size={14} />
                    <span>View Live</span>
                  </a>
                )}

                {hasGithubUrl && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 font-medium text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    <GitBranch size={14} className="text-[#a1a1aa]" />
                    <span>GitHub Repository</span>
                  </a>
                )}
              </div>
            </motion.div>

            {/* Right: Project Preview Image with Subtle Radius */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="lg:col-span-6 w-full"
            >
              {galleryImages[0] && (
                <div
                  className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0f] shadow-2xl flex items-center justify-center p-3 sm:p-4 group cursor-pointer relative"
                  onClick={() => setPreviewOpen(true)}
                >
                  <img
                    src={galleryImages[0]}
                    alt={`${project.title} architecture and preview`}
                    className="w-full h-full object-contain rounded-xl group-hover:scale-[1.01] transition-transform duration-300"
                  />
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-mono text-white/80 border border-white/10">
                    Click to zoom
                  </div>
                </div>
              )}
            </motion.div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
             CONTENT SECTIONS
             ═══════════════════════════════════════════════════════════ */}

          {/* 1. OVERVIEW */}
          {project.description && (
            <section className="border-t border-white/[0.06] pt-10 md:pt-14 mb-10 md:mb-14">
              <h2 className="text-lg sm:text-xl font-bold text-[#e6e6e6] font-heading mb-4 tracking-tight">
                Overview
              </h2>
              <p className="text-sm sm:text-base text-[#a1a1aa] leading-relaxed font-light max-w-3xl">
                {project.description}
              </p>
            </section>
          )}

          {/* 2. PROBLEM */}
          {project.problem && (
            <section className="border-t border-white/[0.06] pt-10 md:pt-14 mb-10 md:mb-14">
              <h2 className="text-lg sm:text-xl font-bold text-[#e6e6e6] font-heading mb-4 tracking-tight">
                Problem Statement
              </h2>
              <p className="text-sm sm:text-base text-[#a1a1aa] leading-relaxed font-light max-w-3xl">
                {project.problem}
              </p>
            </section>
          )}

          {/* 3. SOLUTION */}
          {project.solution && (
            <section className="border-t border-white/[0.06] pt-10 md:pt-14 mb-10 md:mb-14">
              <h2 className="text-lg sm:text-xl font-bold text-[#e6e6e6] font-heading mb-4 tracking-tight">
                Architectural Solution
              </h2>
              <p className="text-sm sm:text-base text-[#a1a1aa] leading-relaxed font-light max-w-3xl">
                {project.solution}
              </p>
            </section>
          )}

          {/* 4. KEY FEATURES (2-COLUMN GRID) */}
          {keyFeatures.length > 0 && (
            <section className="border-t border-white/[0.06] pt-10 md:pt-14 mb-10 md:mb-14">
              <h2 className="text-lg sm:text-xl font-bold text-[#e6e6e6] font-heading mb-6 tracking-tight">
                Key Features & Engineering Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {keyFeatures.map((feat, idx) => {
                  const IconComponent = FEATURE_ICONS[idx % FEATURE_ICONS.length] || Target
                  return (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="text-[#ff4d4f] shrink-0 mt-0.5">
                        <IconComponent size={20} />
                      </div>
                      <p className="text-sm sm:text-base text-[#a1a1aa] leading-relaxed font-light">
                        {feat}
                      </p>
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {/* 5. TECH STACK */}
          {techStack.length > 0 && (
            <section className="border-t border-white/[0.06] pt-10 md:pt-14 mb-10 md:mb-14">
              <h2 className="text-lg sm:text-xl font-bold text-[#e6e6e6] font-heading mb-4 tracking-tight">
                Technologies & Tools Used
              </h2>
              <div className="flex flex-wrap items-center gap-2">
                {techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono text-[#a1a1aa] bg-white/[0.03] border border-white/[0.08]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* 6. PROJECT LINKS */}
          {(hasLiveUrl || hasGithubUrl) && (
            <section className="border-t border-white/[0.06] pt-10 md:pt-14 mb-10">
              <h2 className="text-lg sm:text-xl font-bold text-[#e6e6e6] font-heading mb-5 tracking-tight">
                Project Links & Source
              </h2>
              <div className="flex flex-wrap items-center gap-3">
                {hasLiveUrl && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#ff4d4f] hover:bg-[#e03a3c] text-white font-medium text-xs sm:text-sm transition-colors shadow-sm cursor-pointer"
                  >
                    <ExternalLink size={14} />
                    <span>View Live Project</span>
                  </a>
                )}

                {hasGithubUrl && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 font-medium text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    <GitBranch size={14} className="text-[#a1a1aa]" />
                    <span>GitHub Repository</span>
                  </a>
                )}
              </div>
            </section>
          )}

          {/* 7. BOTTOM NAVIGATION */}
          <ProjectNavigation currentId={project.id} />

        </div>

        <Footer />
      </div>
    </main>
  )
}
