'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown, ChevronUp, Layers, Code2 } from 'lucide-react'
import PortfolioCard from './PortfolioCard'
import projectsData from '@/data/projects.json'
import skillsData from '@/data/skills.json'

const smoothEase = [0.22, 1, 0.36, 1]

const TABS = [
  { id: 'projects', label: 'Projects', icon: <Layers size={14} /> },
  { id: 'techstack', label: 'Tech Stack', icon: <Code2 size={14} /> },
]

export default function PortfolioShowcase() {
  const [activeTab, setActiveTab] = useState('projects')
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [showAllProjects, setShowAllProjects] = useState(false)

  const projects = projectsData

  const techStacks = skillsData.skillCategories.flatMap((cat, idx) =>
    cat.skills.map((skill, sIdx) => ({
      id: `${idx}-${sIdx}`,
      name: skill,
      category: cat.title,
    }))
  )

  const displayedProjects = showAllProjects ? projects : projects.slice(0, 6)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setPreviewOpen(false)
    }
    if (previewOpen) window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [previewOpen])

  return (
    <>
      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {previewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewOpen(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 999,
              background: 'rgba(0,0,0,0.92)',
              backdropFilter: 'blur(16px)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', padding: '24px',
              cursor: 'pointer',
            }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setPreviewOpen(false) }}
              style={{
                position: 'absolute', top: 24, right: 24,
                width: 44, height: 44, borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'white', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 1000,
              }}
            >
              <X size={20} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              src={previewImage}
              alt="Preview"
              style={{
                maxWidth: '88vw', maxHeight: '88vh',
                borderRadius: 24, objectFit: 'contain',
                boxShadow: '0 32px 80px rgba(0,0,0,0.8)',
                cursor: 'default',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SECTION ── */}
      <section
        id="portfolio"
        style={{
          position: 'relative', overflow: 'hidden',
          padding: '120px 0 100px',
          width: '100%',
        }}
      >
        {/* Watermark */}
        <span className="section-watermark" aria-hidden="true">WORK</span>

        {/* Ambient orbs */}
        <div style={{
          position: 'absolute', top: '15%', right: '-80px',
          width: 480, height: 480,
          background: 'radial-gradient(circle, rgba(230,57,70,0.07) 0%, transparent 70%)',
          filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0,
        }} />
        <div style={{
          position: 'absolute', bottom: '20%', left: '-60px',
          width: 380, height: 380,
          background: 'radial-gradient(circle, rgba(193,18,31,0.06) 0%, transparent 70%)',
          filter: 'blur(70px)', pointerEvents: 'none', zIndex: 0,
        }} />

        <div style={{
          position: 'relative', zIndex: 1,
          width: '100%', maxWidth: 1200,
          margin: '0 auto',
          padding: '0 clamp(24px, 6vw, 80px)',
        }}>

          {/* ── HEADER ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: smoothEase }}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 11,
              color: 'var(--accent-red)', letterSpacing: '0.25em',
              textTransform: 'uppercase', display: 'block', marginBottom: 14,
            }}>
              MY WORK
            </span>

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(34px, 5.5vw, 58px)',
              fontWeight: 800, lineHeight: 1.0,
              letterSpacing: '-0.02em', marginBottom: 16,
            }}>
              <span style={{ color: 'var(--text-sand)' }}>Portfolio</span>{' '}
              <span style={{
                color: 'transparent',
                WebkitTextStroke: '2px rgba(255,255,255,0.55)',
              }}>
                Showcase
              </span>
            </h2>

            <p style={{
              color: 'var(--text-secondary)', fontSize: 14,
              lineHeight: 1.75, maxWidth: 420, margin: '0 auto',
            }}>
              Explore featured projects and the full technology stack powering them.
            </p>
          </motion.div>

          {/* ── TAB BAR ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              display: 'flex', justifyContent: 'center',
              marginBottom: 48,
            }}
          >
            <div style={{
              display: 'inline-flex',
              padding: 5,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16,
              gap: 4,
            }}>
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id)
                      setShowAllProjects(false)
                    }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 7,
                      padding: '10px 28px',
                      borderRadius: 11,
                      border: isActive ? '1px solid rgba(230,57,70,0.3)' : '1px solid transparent',
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(230,57,70,0.18) 0%, rgba(193,18,31,0.1) 100%)'
                        : 'transparent',
                      color: isActive ? 'var(--text-sand)' : 'var(--text-muted)',
                      fontWeight: isActive ? 600 : 400,
                      fontFamily: 'var(--font-heading)',
                      fontSize: 13,
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      boxShadow: isActive ? '0 0 20px rgba(230,57,70,0.1)' : 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <span style={{ opacity: isActive ? 1 : 0.5 }}>{tab.icon}</span>
                    {tab.label}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>

          {/* ── CONTENT ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: smoothEase }}
            >

              {/* PROJECTS */}
              {activeTab === 'projects' && (
                <div>
                  <motion.div
                    layout
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                      gap: 20,
                    }}
                  >
                    <AnimatePresence mode="popLayout">
                      {displayedProjects.map((item, i) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 30, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.5, delay: i * 0.05, ease: smoothEase }}
                          style={{ height: '100%' }}
                        >
                          <PortfolioCard
                            index={i}
                            title={item.title}
                            description={item.description}
                            image={item.image_url}
                            live_url={item.live_url}
                            id={item.id}
                            tags={item.tags || item.tech}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>

                  {/* See more/less */}
                  {projects.length > 6 && (
                    <motion.div
                      layout
                      style={{ display: 'flex', justifyContent: 'center', marginTop: 36 }}
                    >
                      <motion.button
                        whileHover={{ y: -2, scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setShowAllProjects(!showAllProjects)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 8,
                          padding: '12px 28px',
                          borderRadius: 12,
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: 'var(--text-secondary)',
                          fontSize: 13, fontWeight: 500,
                          fontFamily: 'var(--font-heading)',
                          cursor: 'pointer',
                          transition: 'all 0.25s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(230,57,70,0.35)'
                          e.currentTarget.style.color = 'var(--text-sand)'
                          e.currentTarget.style.background = 'rgba(230,57,70,0.07)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                          e.currentTarget.style.color = 'var(--text-secondary)'
                          e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                        }}
                      >
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={showAllProjects ? 'less' : 'more'}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                            style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                          >
                            {showAllProjects
                              ? <><ChevronUp size={15} /> Show Less</>
                              : <><ChevronDown size={15} /> Load More Projects</>
                            }
                          </motion.span>
                        </AnimatePresence>
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              )}

              {/* TECH STACK */}
              {activeTab === 'techstack' && (
                <div>
                  {skillsData.skillCategories.map((cat, catIdx) => (
                    <motion.div
                      key={catIdx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: catIdx * 0.08 }}
                      style={{ marginBottom: 40 }}
                    >
                      {/* Category heading */}
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        marginBottom: 16,
                      }}>
                        <span style={{
                          fontFamily: 'var(--font-mono)', fontSize: 10,
                          color: 'var(--accent-red)', letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                        }}>
                          {cat.title}
                        </span>
                        <div style={{
                          flex: 1, height: 1,
                          background: 'linear-gradient(to right, rgba(230,57,70,0.2), transparent)',
                        }} />
                      </div>

                      {/* Skills pills */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                        {cat.skills.map((skill, sIdx) => (
                          <motion.div
                            key={sIdx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.35, delay: catIdx * 0.04 + sIdx * 0.02 }}
                            whileHover={{ y: -3, scale: 1.04 }}
                            style={{
                              padding: '8px 16px',
                              borderRadius: 10,
                              background: 'rgba(255,255,255,0.04)',
                              border: '1px solid rgba(255,255,255,0.08)',
                              fontSize: 13,
                              color: 'var(--text-secondary)',
                              fontFamily: 'var(--font-mono)',
                              cursor: 'default',
                              transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = 'rgba(230,57,70,0.35)'
                              e.currentTarget.style.color = 'var(--text-sand)'
                              e.currentTarget.style.background = 'rgba(230,57,70,0.07)'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                              e.currentTarget.style.color = 'var(--text-secondary)'
                              e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                            }}
                          >
                            {skill}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
