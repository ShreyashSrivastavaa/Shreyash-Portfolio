'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown, ChevronUp } from 'lucide-react'
import PortfolioCard from './PortfolioCard'
import projectsData from '@/data/projects.json'
import certificatesData from '@/data/certificates.json'
import skillsData from '@/data/skills.json'

const smoothEase = [0.22, 1, 0.36, 1]

export default function PortfolioShowcase() {
  const [activeTab, setActiveTab] = useState('projects')
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [showAllProjects, setShowAllProjects] = useState(false)

  const projects = projectsData
  const certificates = certificatesData
  
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
      >
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            Portfolio Showcase
          </h1>

          <p className="text-white/55 max-w-xl mx-auto text-sm md:text-base">
            Explore my engineering work through featured projects,
            certifications, and technical skill stacks.
          </p>
        </motion.div>

        {/* TAB BUTTONS */}
        <div className="flex justify-center mb-10">
          <div className="w-full max-w-3xl rounded-full border border-white/10 bg-white/5 p-2 flex gap-2 backdrop-blur-xl">
            {['projects', 'certificates', 'techstack'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab)
                  if (tab !== 'projects') {
                    setShowAllProjects(false)
                  }
                }}
                className={`flex-1 rounded-full py-3 text-sm transition-all duration-300 cursor-pointer ${
                  activeTab === tab
                    ? 'bg-white/10 text-white font-medium shadow-sm'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {tab === 'projects'
                  ? 'Projects'
                  : tab === 'certificates'
                  ? 'Certificates'
                  : 'Tech Stack'}
              </button>
            ))}
          </div>
        </div>

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

            {/* CERTIFICATES TAB */}
            {activeTab === 'certificates' && (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 px-1">
                {certificates.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 25, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.04 }}
                    whileHover={{ y: -4 }}
                    onClick={() => {
                      setPreviewImage(item.image_url)
                      setPreviewOpen(true)
                    }}
                    className="group cursor-pointer rounded-[26px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
                  >
                    <div className="rounded-2xl overflow-hidden border border-white/10 h-56">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>

                    <h3 className="mt-4 text-[15px] font-semibold text-center text-white/90">
                      {item.title}
                    </h3>
                    <p className="text-[12px] text-center text-white/40 mt-1">
                      {item.issuer}
                    </p>
                  </motion.div>
                ))}
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
      </section>
    </>
  )
}
