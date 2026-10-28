'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ExternalLink,
  GitBranch,
  ArrowUpRight,
  Search,
  Layers,
  ArrowLeft,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'
import ScrollToTop from '@/components/ScrollToTop'
import AnimatedBackground from '@/components/AnimatedBackground'
import projectsData from '@/data/projects.json'

const categories = ['All', 'Full-Stack', 'Backend & APIs', 'Utilities & Data']

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory =
      selectedCategory === 'All' || project.category === selectedCategory

    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.tech &&
        project.tech.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        ))

    return matchesCategory && matchesSearch
  })

  return (
    <main className="min-h-screen bg-[#09090b] text-[#f1f0eb] relative overflow-hidden font-sans selection:bg-[#0066ff] selection:text-white">
      <CustomCursor />
      <ScrollProgress />
      <AnimatedBackground />

      <div className="relative z-10">
        <Navbar />

        {/* HERO HEADER */}
        <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 pt-12 pb-16">
          {/* TOP SECTION BAR */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10 font-mono text-xs">
            <Link
              href="/#portfolio"
              className="inline-flex items-center gap-2 text-[#a0a0a0] hover:text-[#0066ff] transition-colors group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform text-[#0066ff]" />
              <span className="font-semibold text-[#f1f0eb] group-hover:text-[#0066ff]">BACK TO WORK SECTION</span>
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-[#0066ff] uppercase tracking-widest font-semibold hidden sm:flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066ff] shadow-[0_0_8px_#0066ff]" />
                01 / ARCHIVE
              </span>
              <span className="text-[#707070]">
                {projectsData.length} SYSTEMS SHIPPED
              </span>
            </div>
          </div>

          <div className="max-w-4xl mb-12">
            <h1 className="text-4xl sm:text-6xl font-sans font-bold text-[#f1f0eb] tracking-tight leading-[1.08]">
              featured engineering &amp;{' '}
              <span className="font-serif italic font-normal text-[#0066ff]">
                case studies.
              </span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-[#a0a0a0] mt-3 leading-relaxed max-w-2xl">
              Production-ready distributed APIs, real-time engines, client-side WebAssembly suites, and full-stack software built from first principles.
            </p>
          </div>

          {/* FILTER & SEARCH TOOLBAR */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-12 p-2 sm:p-2.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-xl">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => {
                const active = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                      active
                        ? 'bg-[#0066ff] text-white font-semibold shadow-[0_0_20px_rgba(0,102,255,0.4)]'
                        : 'text-[#a0a0a0] hover:text-[#f1f0eb] hover:bg-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#707070]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search systems, tech, metrics..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-[#f1f0eb] placeholder-[#707070] focus:outline-none focus:border-[#0066ff] transition-colors"
              />
            </div>
          </div>

          {/* PROJECT CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => {
                const galleryImg =
                  project.image_urls?.[0] || project.image_url || null

                return (
                  <article
                    key={project.id}
                    className="group flex flex-col justify-between rounded-2xl bg-[#141212] border border-white/10 overflow-hidden shadow-lg transition-all duration-300 hover:border-white/25 hover:shadow-[0_0_30px_rgba(0,102,255,0.18)] hover:-translate-y-1"
                  >
                    <div>
                      {/* BROWSER WINDOW HEADER */}
                      <div className="w-full bg-[#1b1919] border-b border-white/10 px-3.5 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#ff5f56]/80" />
                          <span className="w-2 h-2 rounded-full bg-[#ffbd2e]/80" />
                          <span className="w-2 h-2 rounded-full bg-[#27c93f]/80" />
                        </div>
                        <span className="font-mono text-[9px] text-[#707070] truncate max-w-[150px]">
                          {project.live_url?.replace(/^https?:\/\//, '').replace(/\/$/, '') || `${project.id}.dev`}
                        </span>
                        <span className="font-mono text-[9px] text-[#0066ff] uppercase">
                          {project.category}
                        </span>
                      </div>

                      {/* IMAGE CONTAINER */}
                      <Link
                        href={`/projects/${project.id}`}
                        className="block relative w-full aspect-[16/10] overflow-hidden bg-black/50 border-b border-white/10 cursor-pointer"
                      >
                        {galleryImg ? (
                          <img
                            src={galleryImg}
                            alt={project.title}
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-104"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#0f0e0e]">
                            <Layers className="w-8 h-8 text-[#707070] mb-2" />
                            <span className="font-sans text-base text-[#f1f0eb]">
                              {project.title}
                            </span>
                          </div>
                        )}

                        {project.live_url && (
                          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono font-semibold text-white shadow-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>LIVE</span>
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                          <span className="text-xs font-mono text-[#0066ff] flex items-center gap-1 font-semibold">
                            <span>Open Architecture Case Study</span>
                            <ArrowRight size={12} />
                          </span>
                        </div>
                      </Link>

                      {/* CARD BODY */}
                      <div className="p-5 sm:p-6 space-y-4">
                        <div className="flex items-center justify-between text-xs font-mono text-[#707070]">
                          <span className="text-[#0066ff] font-semibold">
                            {project.role}
                          </span>
                          <span className="text-[11px]">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                        </div>

                        {/* Title with Brand Logo */}
                        <Link href={`/projects/${project.id}`} className="flex items-center gap-3 group/link">
                          {project.logo_url && (
                            <img
                              src={project.logo_url}
                              alt=""
                              className="w-7 h-7 rounded-lg border border-white/20 object-cover shrink-0 p-0.5 bg-white/5"
                            />
                          )}
                          <h3 className="font-sans font-bold text-lg text-[#f1f0eb] group-hover/link:text-[#0066ff] transition-colors line-clamp-1">
                            {project.title.split(/[:—]/)[0].trim()}
                          </h3>
                        </Link>

                        <p className="font-sans text-xs text-[#a0a0a0] leading-relaxed line-clamp-2">
                          {project.tagline || project.description}
                        </p>

                        {/* METRICS STRIP */}
                        {project.metrics && project.metrics.length > 0 && (
                          <div className="grid grid-cols-3 gap-1.5 p-2 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                            {project.metrics.slice(0, 3).map((m, mIdx) => (
                              <div key={mIdx} className="min-w-0">
                                <div className="font-mono text-xs font-bold text-[#0066ff] truncate">
                                  {m.value}
                                </div>
                                <div className="font-mono text-[8px] text-[#707070] uppercase tracking-wider truncate mt-0.5">
                                  {m.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* TECH STACK TAGS */}
                        {project.tech && project.tech.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {project.tech.slice(0, 4).map((t) => (
                              <span
                                key={t}
                                className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-white/[0.04] text-[#c4c4c4] border border-white/10"
                              >
                                {t}
                              </span>
                            ))}
                            {project.tech.length > 4 && (
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono text-[#707070]">
                                +{project.tech.length - 4}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* CARD ACTIONS */}
                    <div className="px-5 sm:px-6 py-3.5 border-t border-white/10 flex items-center justify-between bg-[#111010]">
                      <div className="flex items-center gap-3">
                        {project.github_url && (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs font-mono text-[#a0a0a0] hover:text-[#f1f0eb] transition-colors"
                            title="GitHub Source"
                          >
                            <GitBranch size={13} />
                            <span>code</span>
                          </a>
                        )}

                        {project.id === 'ihatelovepdf' ? (
                          <a
                            href="https://www.ihatelovepdf.com"
                            rel="noopener"
                            target="_blank"
                            className="flex items-center gap-1 text-xs font-mono font-semibold text-[#0066ff] hover:underline"
                          >
                            <span>live</span>
                            <ArrowUpRight size={12} />
                          </a>
                        ) : project.live_url ? (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs font-mono font-semibold text-[#0066ff] hover:underline"
                          >
                            <span>live</span>
                            <ArrowUpRight size={12} />
                          </a>
                        ) : null}
                      </div>

                      <Link
                        href={`/projects/${project.id}`}
                        className="flex items-center gap-1 text-xs font-mono font-semibold text-[#f1f0eb] hover:text-[#0066ff] transition-colors"
                      >
                        <span>case study</span>
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </article>
                )
              })}
            </AnimatePresence>
          </div>
        </section>

        <Footer />
        <ScrollToTop />
      </div>
    </main>
  )
}
