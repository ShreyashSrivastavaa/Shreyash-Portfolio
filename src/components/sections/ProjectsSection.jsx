'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Github,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  Clock,
  Layers,
  CheckCircle2,
  Box,
  GitBranch,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import projectsData from '@/data/projects.json';

const CATEGORIES = ['All', 'Full-Stack', 'Backend & APIs', 'Utilities & Data'];
const smoothEasing = [0.22, 1, 0.36, 1];

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const filteredProjects =
    selectedCategory === 'All'
      ? projectsData
      : projectsData.filter((p) =>
          p.category.toLowerCase().includes(selectedCategory.toLowerCase())
        );

  return (
    <section
      id="portfolio"
      aria-label="Featured Projects & Case Studies"
      style={{
        paddingTop: isMobile ? '80px' : '120px',
        paddingBottom: isMobile ? '80px' : '120px',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="scroll-mt-28 bg-[#050508] text-[#f0ece8] selection:bg-[#e63946]/30 selection:text-white"
    >
      {/* ── SECTION WATERMARK ── */}
      <span className="section-watermark" aria-hidden="true">PROJECTS</span>

      {/* ── AMBIENT BACKGROUND GLOWS ── */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-[radial-gradient(circle,rgba(230,57,70,0.08)_0%,transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -left-32 w-96 h-96 bg-[radial-gradient(circle,rgba(193,18,31,0.06)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          paddingLeft: isMobile ? '24px' : '60px',
          paddingRight: isMobile ? '24px' : '60px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* ── SECTION HEADER ── */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEasing }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-[#e63946] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#f0ece8]/70">
              // SELECTED WORK
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: smoothEasing }}
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#f0ece8] leading-[1.15]"
          >
            Engineered for <span className="text-[#e63946]">Impact</span> & Scale
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: smoothEasing }}
            className="mt-4 text-sm sm:text-base text-[#f0ece8]/70 font-light leading-relaxed max-w-2xl mx-auto"
          >
            A collection of projects I've built and deployed, focusing on clean system design, reliable APIs, and responsive frontends.
          </motion.p>

          {/* ── CATEGORY FILTER TABS ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: smoothEasing }}
            className="flex flex-wrap items-center justify-center gap-2 mt-8"
          >
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`min-h-[40px] px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#e63946] text-white shadow-lg shadow-[#e63946]/25 font-semibold'
                      : 'bg-white/[0.03] text-[#f0ece8]/60 hover:text-white hover:bg-white/[0.07] border border-white/5'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* ── COMPACT SMALL BLOCKS GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const isHovered = hoveredProject === project.id;
              const galleryImg =
                project.image_urls?.[0] || project.image_url || null;

              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.06, ease: smoothEasing }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className={`group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl border transition-all duration-300 bg-[#09090e]/80 backdrop-blur-xl overflow-hidden ${
                    isHovered
                      ? 'border-[#e63946]/50 shadow-[0_16px_40px_-10px_rgba(230,57,70,0.2)] -translate-y-1'
                      : 'border-white/10 shadow-xl shadow-black/40'
                  }`}
                >
                  <div>
                    {/* ── CARD TOP IMAGE BLOCK ── */}
                    <Link
                      href={`/projects/${project.id}`}
                      className="block relative w-full aspect-[16/10] overflow-hidden bg-[#050508] border-b border-white/10 group/img cursor-pointer"
                    >
                      {/* Live Badge Overlay */}
                      {project.live_url && (
                        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#050508]/85 border border-white/15 backdrop-blur-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          <span className="font-mono text-[10px] font-semibold text-emerald-300 tracking-wider">
                            LIVE
                          </span>
                        </div>
                      )}

                      {/* Category Pill */}
                      <span className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-[#050508]/80 backdrop-blur-md border border-white/10 text-[#f0ece8]/80">
                        {project.category}
                      </span>

                      {/* Image */}
                      {galleryImg ? (
                        <img
                          src={galleryImg}
                          alt={project.title}
                          className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#0c0c14] to-[#050508]">
                          <Layers className="w-10 h-10 text-[#e63946]/40 mb-2" />
                          <span className="font-heading text-sm font-bold text-[#f0ece8]/60">
                            {project.title}
                          </span>
                        </div>
                      )}

                      {/* Subtle Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#09090e] via-transparent to-transparent opacity-70 group-hover/img:opacity-40 transition-opacity duration-300" />
                    </Link>

                    {/* ── CARD BODY ── */}
                    <div className="p-5 sm:p-6 space-y-4">
                      {/* Role & Number */}
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-[#e63946] font-semibold tracking-wider uppercase">
                          {project.role}
                        </span>
                        <span className="text-[#f0ece8]/40">
                          // 0{index + 1}
                        </span>
                      </div>

                      {/* Title */}
                      <Link href={`/projects/${project.id}`}>
                        <h3 className="font-heading text-lg sm:text-xl font-bold text-[#f0ece8] group-hover:text-[#e63946] transition-colors leading-snug line-clamp-1">
                          {project.title}
                        </h3>
                      </Link>

                      {/* Tagline / Description */}
                      <p className="text-xs text-[#f0ece8]/70 leading-relaxed line-clamp-2 font-light">
                        {project.description || project.tagline}
                      </p>

                      {/* 3-Column Metrics Strip */}
                      {project.metrics && project.metrics.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 py-2 px-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                          {project.metrics.slice(0, 3).map((m, mIdx) => (
                            <div key={mIdx} className="min-w-0">
                              <div className="font-mono text-xs font-bold text-white truncate">
                                {m.value}
                              </div>
                              <div className="font-mono text-[9px] text-[#f0ece8]/45 uppercase tracking-tight truncate">
                                {m.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tech Stack Pills */}
                      {project.tech && project.tech.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {project.tech.slice(0, 4).map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[#111118] text-[#f0ece8]/80 border border-white/10"
                            >
                              {t}
                            </span>
                          ))}
                          {project.tech.length > 4 && (
                            <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono text-[#f0ece8]/45 bg-white/[0.02]">
                              +{project.tech.length - 4}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ── CARD FOOTER ACTIONS ── */}
                  <div className="px-5 py-3.5 sm:px-6 border-t border-white/10 flex items-center justify-between bg-black/25">
                    <div className="flex items-center gap-3">
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#f0ece8]/60 hover:text-[#e63946] transition-colors"
                          title="GitHub Repository"
                        >
                          <GitBranch size={15} />
                        </a>
                      )}
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#f0ece8]/60 hover:text-emerald-400 transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink size={15} />
                        </a>
                      )}
                    </div>

                    <Link
                      href={`/projects/${project.id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-white group-hover:text-[#e63946] transition-colors font-heading"
                    >
                      <span>Case Study</span>
                      <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ── VIEW FULL ARCHIVE BUTTON ── */}
        <div className="text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/25 text-white font-mono text-xs transition-all shadow-md group"
          >
            <span>Explore All Projects in Full Archive</span>
            <ArrowRight size={14} className="text-[#e63946] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

