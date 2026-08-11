'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown, ChevronUp } from 'lucide-react'
import PortfolioCard from './PortfolioCard'
import projectsData from '@/data/projects.json'
import skillsData from '@/data/skills.json'

const smoothEase = [0.22, 1, 0.36, 1]

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

  const displayedProjects = showAllProjects
    ? projects
    : projects.slice(0, 3)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setPreviewOpen(false)
    }
    if (previewOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [previewOpen])

  return (
    <>
      {/* IMAGE PREVIEW LIGHTBOX */}
      <AnimatePresence>
        {previewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewOpen(false)}
            className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-md flex items-center justify-center px-6 cursor-pointer"
          >
            <button
              onClick={(e) => {
                e.stopPropagation()
                setPreviewOpen(false)
              }}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition cursor-pointer z-[1000]"
              title="Close (Esc)"
            >
              <X size={22} />
            </button>

            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              src={previewImage}
              alt="Preview"
              className="max-w-[88vw] max-h-[88vh] rounded-3xl object-contain shadow-2xl cursor-default"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <section
        id="portfolio"
        className="w-full max-w-[1450px] mx-auto px-6 md:px-12 lg:px-20 pt-20 pb-24 text-white"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        {/* Background Watermark */}
        <span className="section-watermark" aria-hidden="true">
          PROJECTS
        </span>

        {/* Ambient orb */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            right: '-60px',
            width: 350,
            height: 350,
            background: 'radial-gradient(circle, rgba(230,57,70,0.07) 0%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center mb-8"
          style={{ position: 'relative', zIndex: 1 }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--text-muted)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: 12,
            }}
          >
            MY WORK
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 800,
              lineHeight: 1.05,
              marginBottom: 12,
            }}
          >
            <span style={{ color: 'var(--text-sand)' }}>Portfolio</span>{' '}
            <span
              style={{
                color: 'transparent',
                WebkitTextStroke: '1.5px rgba(255,255,255,0.6)',
              }}
            >
              Showcase
            </span>
          </h2>

          <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 480, margin: '0 auto', fontSize: 14 }}>
            Explore my engineering work through featured projects
            and technical skill stacks.
          </p>
        </motion.div>

        {/* TAB BUTTONS */}
        <div className="flex justify-center mb-10" style={{ position: 'relative', zIndex: 1 }}>
          <div className="w-full max-w-3xl rounded-full border border-white/10 bg-white/5 p-2 flex gap-2 backdrop-blur-xl">
            {['projects', 'techstack'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab)
                  if (tab !== 'projects') {
                    setShowAllProjects(false)
                  }
                }}
                style={{
                  flex: 1,
                  borderRadius: 9999,
                  padding: '10px 0',
                  fontSize: 13,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: 'none',
                  background: activeTab === tab ? 'rgba(230,57,70,0.15)' : 'transparent',
                  color: activeTab === tab ? 'var(--text-sand)' : 'rgba(255,255,255,0.5)',
                  fontWeight: activeTab === tab ? 600 : 400,
                  fontFamily: 'var(--font-heading)',
                  boxShadow: activeTab === tab ? 'inset 0 0 20px rgba(230,57,70,0.1)' : 'none',
                  outline: activeTab === tab ? '1px solid rgba(230,57,70,0.2)' : 'none',
                }}
              >
                {tab === 'projects' ? 'Projects' : 'Tech Stack'}
              </button>
            ))}
          </div>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45 }}
          >
            {/* PROJECTS TAB */}
            {activeTab === 'projects' && (
              <div className="space-y-8">
                <motion.div
                  layout
                  transition={{
                    layout: { duration: 0.75, ease: smoothEase },
                  }}
                  className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 px-1"
                >
                  <AnimatePresence mode="popLayout">
                    {displayedProjects.map((item, i) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 40, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -30, scale: 0.95 }}
                        transition={{
                          duration: 0.55,
                          delay: i * 0.04,
                          ease: smoothEase,
                        }}
                      >
                        <PortfolioCard
                          index={i}
                          title={item.title}
                          description={item.description}
                          image={item.image_url}
                          live_url={item.live_url}
                          id={item.id}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {/* SEE MORE / SEE LESS TOGGLE */}
                {projects.length > 3 && (
                  <motion.div
                    layout
                    transition={{ duration: 0.6, ease: smoothEase }}
                    className="flex justify-center"
                  >
                    <motion.button
                      layout
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setShowAllProjects(!showAllProjects)}
                      className="px-6 py-3 rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-xl text-sm text-white/75 hover:text-white transition flex items-center gap-2 cursor-pointer"
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={showAllProjects ? 'less' : 'more'}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.25 }}
                          className="flex items-center gap-2"
                        >
                          {showAllProjects ? (
                            <>
                              <ChevronUp size={16} />
                              See Less
                            </>
                          ) : (
                            <>
                              <ChevronDown size={16} />
                              See More
                            </>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </motion.button>
                  </motion.div>
                )}
              </div>
            )}



            {/* TECH STACK TAB */}
            {activeTab === 'techstack' && (
              <div className="min-h-[360px] flex justify-center">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 max-w-5xl w-full">
                  {techStacks.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: index * 0.03 }}
                      whileHover={{ y: -5, scale: 1.04 }}
                      className="group rounded-[24px] border border-white/10 bg-white/[0.04] backdrop-blur-xl flex flex-col items-center justify-center gap-2 h-[125px] w-[125px] mx-auto p-3"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white font-mono text-sm font-bold group-hover:bg-white group-hover:text-black transition duration-300">
                        {item.name.slice(0, 2).toUpperCase()}
                      </div>

                      <p className="text-[11px] text-white/80 text-center leading-tight px-1 line-clamp-1 font-mono">
                        {item.name}
                      </p>
                      <span className="text-[9px] text-white/40 text-center line-clamp-1">
                        {item.category}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        </div>
      </section>
    </>
  )
}
