'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Maximize2, X, ChevronDown, ChevronUp, ArrowUpRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import experimentsData from '@/data/experiments.json'
import { SoundFX, unlockAudio } from '@/lib/SoundEngine'

export default function ExperimentsSection() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  // Categories with live counts
  const categories = useMemo(() => {
    const counts = { All: experimentsData.length }
    experimentsData.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1
    })
    return [
      { id: 'All', label: 'All', count: counts.All },
      { id: 'Web', label: 'Web', count: counts.Web || 0 },
      { id: 'Mobile', label: 'Mobile', count: counts.Mobile || 0 },
    ]
  }, [])

  // Filtered experiments
  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return experimentsData
    return experimentsData.filter((item) => item.category === activeCategory)
  }, [activeCategory])

  // Displayed items: 10 by default (2 rows on desktop), all when expanded
  const visibleItems = isExpanded ? filteredItems : filteredItems.slice(0, 10)

  const handleCategoryChange = (catId) => {
    unlockAudio()
    SoundFX.click()
    setActiveCategory(catId)
    setIsExpanded(false)
  }

  const toggleExpanded = () => {
    unlockAudio()
    SoundFX.click()
    setIsExpanded((prev) => !prev)
  }

  const openLightbox = (item) => {
    unlockAudio()
    SoundFX.pop()
    setSelectedItem(item)
  }

  const closeLightbox = () => {
    setSelectedItem(null)
  }

  return (
    <section
      id="experiments"
      suppressHydrationWarning
      className="relative w-full bg-[#f1f0eb] text-[#242620] py-20 sm:py-28 px-4 sm:px-8 overflow-hidden"
      aria-label="Web applications and deployed websites"
    >
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12">
        {/* ── SECTION HEADER ── */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-sans font-bold text-[#242620] tracking-tight leading-[1.08]">
              little pieces of UI, <br />
              <span className="font-serif italic font-normal text-[#0066ff]">
                across web, mobile & platforms.
              </span>
            </h2>
          </motion.div>

          {/* Subheading Eyebrow with hairline */}
          <div className="flex items-center gap-4 pt-2">
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#8e9087] shrink-0 font-medium">
              DIFFERENT SCREENS. SAME CRAFT.
            </span>
            <div className="h-[1px] bg-[#d3d3c8] w-full max-w-xs" />
          </div>

          {/* ── FILTER CATEGORY PILLS (MATCHING SAMAYMAURYA.COM) ── */}
          <div className="flex items-center gap-2 pt-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  type="button"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#242620] text-[#ffffff] font-semibold shadow-md'
                      : 'bg-[#e5e4de] text-[#6f7168] hover:text-[#242620] hover:bg-[#dbdad4]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-black/5 text-[#8e9087]'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── INTERACTIVE APP CARD GRID (HORIZONTAL BROWSER VIEWPORTS) ── */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {visibleItems.map((item, index) => {
              const isMobileView = activeCategory === 'Mobile' && item.category === 'Mobile'

              return (
                <motion.article
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.35, delay: index * 0.03 }}
                  onClick={() => openLightbox(item)}
                  className="group relative cursor-pointer flex flex-col justify-between"
                >
                  {isMobileView ? (
                    /* Realistic iPhone Pro Mockup Frame (Active when Mobile tab selected) */
                    <div className="relative aspect-[9/18.5] w-full rounded-[30px] sm:rounded-[36px] bg-[#000000] border-[5px] sm:border-[6px] border-[#1f2024] shadow-[0_12px_30px_rgba(0,0,0,0.12)] overflow-hidden transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.22)]">
                      {/* Dynamic Island Pill */}
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-black rounded-full z-20 flex items-center justify-end pr-2 pointer-events-none">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111116] border border-white/10" />
                      </div>

                      {/* Screen Content */}
                      <div
                        className="w-full h-full overflow-hidden flex items-center justify-center p-2 pb-9"
                        style={{ backgroundColor: item.projectId === 'stayalive' ? '#f7f8fa' : '#0d0e12' }}
                      >
                        <img
                          src={item.mobileImage || item.image}
                          alt={item.title}
                          className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>

                      {/* Floating App Name Pill */}
                      <div className="absolute bottom-2.5 left-2.5 z-20 pointer-events-none">
                        <div className="px-2.5 py-1 rounded-lg bg-black/85 backdrop-blur-md border border-white/20 text-white flex items-center gap-1.5 shadow-lg">
                          {item.logo ? (
                            <img
                              src={item.logo}
                              alt=""
                              className="w-3.5 h-3.5 rounded-full object-cover shrink-0 border border-white/25"
                            />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          )}
                          <span className="font-sans font-semibold text-[10px] truncate max-w-[110px]">
                            {item.project}
                          </span>
                        </div>
                      </div>

                      {/* Direct External Link */}
                      {item.live_url && (
                        <a
                          href={item.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="absolute top-2.5 right-2.5 z-30 w-6 h-6 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-[#0066ff]"
                          title="Open Live Website"
                        >
                          <ExternalLink size={11} />
                        </a>
                      )}
                    </div>
                  ) : (
                    /* Horizontal Desktop Browser Card (Matching samaymaurya.com reference) */
                    <div className="relative aspect-[16/10.5] w-full rounded-2xl bg-[#141212] border border-[#2a2a2a] shadow-md overflow-hidden transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl group-hover:border-[#3d3d3d]">
                      {/* Browser Window Header */}
                      <div className="w-full bg-[#1b1919] border-b border-[#2a2a2a] px-3 py-1.5 flex items-center justify-between pointer-events-none">
                        <div className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ff5f56]/80 inline-block" />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ffbd2e]/80 inline-block" />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#27c93f]/80 inline-block" />
                        </div>
                        <span className="font-mono text-[9px] text-[#6f7168] truncate max-w-[130px]">
                          {item.live_url?.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                        </span>
                      </div>

                      {/* Screen Preview */}
                      <div className="relative w-full h-[calc(100%-25px)] bg-[#0d0e12] overflow-hidden flex items-center justify-center p-2.5 pb-8 sm:pb-9">
                        <img
                          src={item.logo || item.desktopImage || item.image}
                          alt={item.title}
                          className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />

                        {/* Subtle Glare */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10" />

                        {/* Compact Floating Status Pill */}
                        <div className="absolute bottom-2 left-2 z-20 pointer-events-none">
                          <div className="px-2 py-0.5 rounded-md bg-black/85 backdrop-blur-md border border-white/15 text-white flex items-center gap-1.5 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="font-sans font-semibold text-[9px] sm:text-[10px] text-white/90 truncate max-w-[100px]">
                              {item.project}
                            </span>
                            <ArrowUpRight size={10} className="text-[#a0a0a0] group-hover:text-white transition-colors" />
                          </div>
                        </div>

                        {/* Direct External Link */}
                        {item.live_url && (
                          <a
                            href={item.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="absolute top-2 right-2 z-30 w-6 h-6 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-[#0066ff] hover:border-[#0066ff]"
                            title="Open Live Website"
                          >
                            <ExternalLink size={11} />
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Card Label / Meta Below */}
                  <div className="mt-2.5 px-0.5 text-left">
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1.5 min-w-0">
                        {item.logo && (
                          <img
                            src={item.logo}
                            alt=""
                            className="w-3.5 h-3.5 rounded object-cover shrink-0 border border-black/10"
                          />
                        )}
                        <h4 className="font-sans font-semibold text-xs sm:text-sm text-[#242620] truncate">
                          {item.project}
                        </h4>
                      </div>
                      <span className="font-mono text-[9px] text-[#0066ff] shrink-0">
                        {item.badge}
                      </span>
                    </div>
                    <p className="font-sans text-[11px] text-[#8e9087] truncate mt-0.5">
                      {item.title}
                    </p>
                  </div>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* ── EXPAND / COLLAPSE BUTTON ── */}
        {filteredItems.length > 10 && (
          <div className="flex justify-center pt-4">
            <button
              type="button"
              onClick={toggleExpanded}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#242620] hover:bg-[#35363a] text-white font-mono text-xs font-semibold tracking-wider transition-all shadow-xl hover:shadow-2xl cursor-pointer"
            >
              <span>
                {isExpanded ? 'Show less' : `View all ${filteredItems.length} websites`}
              </span>
              {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>
          </div>
        )}
      </div>

      {/* ── FULLSCREEN LIGHTBOX MODAL ── */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#181616] border border-[#2d2b2b] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#2a2828] text-white flex items-center justify-center hover:bg-[#383636] transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              {/* Image Preview Box */}
              <div className="w-full md:w-3/5 bg-black/60 p-6 flex items-center justify-center overflow-hidden">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="max-h-[65vh] w-full object-contain rounded-xl shadow-lg border border-white/10"
                />
              </div>

              {/* Information Panel */}
              <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    {selectedItem.logo && (
                      <img
                        src={selectedItem.logo}
                        alt=""
                        className="w-6 h-6 rounded-md object-cover border border-white/20 shrink-0"
                      />
                    )}
                    <span className="font-mono text-xs font-semibold text-[#f1f0eb]">
                      {selectedItem.project}
                    </span>
                    <span className="font-mono text-[10px] text-[#0066ff] bg-[#0066ff]/10 border border-[#0066ff]/30 px-2 py-0.5 rounded ml-auto">
                      {selectedItem.category}
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-2xl text-[#f1f0eb] leading-snug">
                    {selectedItem.title}
                  </h3>

                  <p className="font-sans text-sm text-[#a0a0a0] leading-relaxed">
                    {selectedItem.subtitle}
                  </p>

                  <div className="pt-2">
                    <span className="font-mono text-xs text-[#6f7168] block mb-1.5 uppercase tracking-wider">
                      Tech & Environment
                    </span>
                    <span className="font-mono text-xs text-[#f1f0eb] bg-[#242222] border border-[#333131] px-3 py-1 rounded-md inline-block">
                      {selectedItem.tech}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#2a2828] flex flex-col gap-3">
                  {selectedItem.live_url && (
                    <a
                      href={selectedItem.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#0066ff] hover:bg-[#0052d4] text-white font-sans text-xs font-semibold tracking-wide transition-colors shadow-lg"
                    >
                      <span>Open Live Website</span>
                      <ExternalLink size={13} />
                    </a>
                  )}

                  <div className="flex items-center justify-between pt-1">
                    {selectedItem.projectId && (
                      <Link
                        href={`/projects/${selectedItem.projectId}`}
                        onClick={closeLightbox}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#a0a0a0] hover:text-[#f1f0eb] transition-colors"
                      >
                        <span>View Case Study</span>
                        <ArrowUpRight size={13} />
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={closeLightbox}
                      className="px-4 py-1.5 rounded-full bg-[#2a2828] hover:bg-[#383636] text-xs font-mono text-white transition-colors ml-auto cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
