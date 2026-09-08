'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Code2,
  ExternalLink,
  GitBranch,
  ArrowUpRight,
  Search,
  SlidersHorizontal,
  Box,
  Layers,
  Sparkles,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
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
    <main className="min-h-screen bg-[#050508] text-[#f0ece8] relative overflow-hidden">
      <CustomCursor />
      <ScrollProgress />
      <AnimatedBackground />

      <div className="relative z-10">
        <Navbar />

        {/* HERO HEADER */}
        <section className="w-full max-w-[1200px] mx-auto px-6 md:px-12 pt-36 md:pt-44 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="text-xs font-mono text-[#e63946] tracking-[0.25em] uppercase font-semibold">
              PORTFOLIO ARCHIVE
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-[#f0ece8] mt-3 mb-6 tracking-tight">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e63946] to-[#ff4d5a]">Projects & Systems</span>
            </h1>
            <p className="text-base sm:text-lg text-[#f0ece8]/75 leading-relaxed font-light">
              A directory of projects I've built, covering web applications, backend APIs, and browser tools.
            </p>
          </motion.div>

          {/* FILTER & SEARCH TOOLBAR */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 p-4 rounded-2xl glass-card border border-white/10">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {categories.map((cat) => {
                const active = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                      active
                        ? 'bg-[#e63946] text-white shadow-lg shadow-red-500/20'
                        : 'bg-white/[0.03] text-[#f0ece8]/70 hover:text-white hover:bg-white/[0.08] border border-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#f0ece8]/40"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tech or project..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-white placeholder-[#f0ece8]/40 focus:outline-none focus:border-[#e63946] transition-colors"
              />
            </div>
          </div>

          {/* PROJECTS GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => {
                const galleryImg =
                  project.image_urls?.[0] || project.image_url || null

                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="glass-card rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-white/25 hover:shadow-2xl transition-all group"
                  >
                    <div>
                      {/* Image Preview */}
                      <Link
                        href={`/projects/${project.id}`}
                        className="block h-52 overflow-hidden relative bg-[#08080c] cursor-pointer"
                      >
                        {galleryImg ? (
                          <img
                            src={galleryImg}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-white/[0.02]">
                            <span className="font-heading text-4xl font-bold text-[#f0ece8]/30">
                              {project.title.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-90" />

                        {/* Category Badge */}
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-mono font-semibold bg-[#050508]/80 backdrop-blur-md border border-white/10 text-[#f0ece8]">
                          {project.category}
                        </span>

                        {/* Live badge if available */}
                        {project.live_url && (
                          <span className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 backdrop-blur-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            LIVE
                          </span>
                        )}
                      </Link>

                      {/* Content Info */}
                      <div className="p-6">
                        <div className="text-[10px] font-mono text-[#e63946] uppercase tracking-widest font-bold mb-1">
                          {project.role}
                        </div>
                        <Link href={`/projects/${project.id}`}>
                          <h3 className="text-xl font-bold font-heading text-white group-hover:text-[#e63946] transition-colors leading-snug mb-2">
                            {project.title}
                          </h3>
                        </Link>
                        <p className="text-xs text-[#f0ece8]/70 leading-relaxed line-clamp-3 mb-5">
                          {project.description}
                        </p>

                        {/* Metrics snippet if available */}
                        {project.metrics && project.metrics.length > 0 && (
                          <div className="grid grid-cols-3 gap-2 mb-5 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                            {project.metrics.slice(0, 3).map((m, mIdx) => (
                              <div key={mIdx}>
                                <div className="text-xs font-bold text-white font-mono truncate">
                                  {m.value}
                                </div>
                                <div className="text-[9px] font-mono text-[#f0ece8]/40 uppercase truncate">
                                  {m.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Tech Pills */}
                        {project.tech && (
                          <div className="flex flex-wrap gap-1.5">
                            {project.tech.slice(0, 4).map((t, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-2.5 py-1 rounded-lg text-[10px] font-mono text-[#f0ece8]/80 bg-white/[0.04] border border-white/5"
                              >
                                {t}
                              </span>
                            ))}
                            {project.tech.length > 4 && (
                              <span className="px-2 py-1 rounded-lg text-[10px] font-mono text-[#f0ece8]/50 bg-white/[0.02]">
                                +{project.tech.length - 4}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between bg-black/20">
                      <div className="flex items-center gap-3">
                        {project.github_url && (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#f0ece8]/60 hover:text-white transition-colors"
                            title="GitHub Repository"
                          >
                            <GitBranch size={16} />
                          </a>
                        )}
                        {project.live_url && (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#f0ece8]/60 hover:text-white transition-colors"
                            title="Live Demo"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>

                      <Link
                        href={`/projects/${project.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-white group-hover:text-[#e63946] transition-colors font-heading"
                      >
                        <span>Case Study</span>
                        <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20 glass-card rounded-3xl border border-white/10">
              <Code2 size={40} className="mx-auto text-[#f0ece8]/30 mb-4" />
              <h3 className="text-lg font-bold font-heading text-white">No projects found</h3>
              <p className="text-xs text-[#f0ece8]/60 mt-1">Try adjusting your search query or selected category.</p>
            </div>
          )}
        </section>

        <Footer />
        <ScrollToTop />
      </div>
    </main>
  )
}
