'use client';

import { motion } from 'framer-motion';
import { GitBranch, ArrowUpRight } from 'lucide-react';

export default function ProjectHero({ project, onExpandGallery }) {
  if (!project) return null;

  const galleryImages = project.image_urls || [project.image_url];
  const heroImage = galleryImages[0];

  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      {/* ── LEFT: TITLE, DESCRIPTION, CTAS & STACK ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-6 space-y-5"
      >
        {/* SMALL METADATA */}
        <div className="text-xs font-mono text-[#f0ece8]/50 uppercase tracking-widest">
          CASE STUDY / {project.category || 'ENGINEERING'}
        </div>

        {/* PROJECT TITLE */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#f0ece8] leading-tight font-heading">
          {project.title}
        </h1>

        {/* 1-2 SENTENCE DESCRIPTION (20-30 WORDS) */}
        <p className="text-sm md:text-base text-[#f0ece8]/75 leading-relaxed font-light max-w-xl">
          {project.description}
        </p>

        {/* ACTION LINKS */}
        <div className="flex flex-wrap items-center gap-5 pt-1">
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold text-[#f0ece8] hover:text-amber-300 transition-colors group"
            >
              <span>View Live Demo</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          )}

          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold text-[#f0ece8]/70 hover:text-[#f0ece8] transition-colors group"
            >
              <GitBranch size={13} />
              <span>Source Code</span>
              <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          )}
        </div>

        {/* SINGLE LINE TECH STACK */}
        {project.tech && project.tech.length > 0 && (
          <div className="pt-2 text-xs font-mono text-[#f0ece8]/40">
            {project.tech.join(' · ')}
          </div>
        )}
      </motion.div>

      {/* ── RIGHT: NATURAL ASPECT RATIO SCREENSHOT ── */}
      {heroImage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-6 relative group cursor-pointer"
          onClick={onExpandGallery}
        >
          <div className="rounded-xl overflow-hidden border border-white/10 bg-[#050508] shadow-xl transition-all duration-300 group-hover:border-white/20">
            <img
              src={heroImage}
              alt={project.title}
              className="w-full h-auto max-h-[380px] object-contain object-center block group-hover:scale-[1.01] transition-transform duration-300"
            />
          </div>

          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-[#050508]/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#f0ece8]/70 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Expand</span>
            <ArrowUpRight size={11} />
          </div>
        </motion.div>
      )}
    </div>
  );
}
