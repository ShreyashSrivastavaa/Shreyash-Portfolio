'use client'

import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import projectsData from '@/data/projects.json'
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  GitBranch,
  Sparkles,
  Code2,
  Layers,
  X,
  Box,
  CheckCircle2
} from 'lucide-react'

export default function PortfolioDetailPage({ params: paramsPromise }) {
  const params = use(paramsPromise)
  const router = useRouter()
  const id = params?.id

  const [project, setProject] = useState(null)
  const [currentImage, setCurrentImage] = useState(0)
  const [previewOpen, setPreviewOpen] = useState(false)

  useEffect(() => {
    if (!id) return
    const found = projectsData.find((p) => p.id === id)
    if (found) {
      setProject(found)
    } else {
      setProject(projectsData[0])
    }
  }, [id])

  if (!project) return null

  const tech = project.tech || []
  const features = project.key_features || []
  const metrics = project.metrics || []
  const galleryImages = project.image_urls || [project.image_url]

  const nextImage = () => {
    if (currentImage < galleryImages.length - 1) {
      setCurrentImage((prev) => prev + 1)
    }
  }

  const prevImage = () => {
    if (currentImage > 0) {
      setCurrentImage((prev) => prev - 1)
    }
  }

  const handleBack = () => {
    sessionStorage.setItem('skipIntroOnce', 'true')
    router.push('/#portfolio')
  }

  return (
    <>
      <AnimatePresence>
        {previewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center cursor-pointer"
            >
              <X size={18} />
            </button>

            {currentImage > 0 && (
              <button
                onClick={prevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>
            )}

            <motion.img
              key={currentImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              src={galleryImages[currentImage]}
              alt={project.title}
              className="max-w-[85vw] max-h-[80vh] rounded-3xl object-contain"
            />

            {currentImage < galleryImages.length - 1 && (
              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen text-white px-6 md:px-12 lg:px-20 py-10 relative overflow-hidden"
      >
        {/* Background blobs */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#1c1c1c_0%,#0a0a0a_40%,#000000_100%)]" />
        <div className="absolute top-[-200px] left-[-120px] w-[500px] h-[500px] rounded-full bg-red-500/[0.04] blur-[140px] -z-10" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
          {/* LEFT COLUMN */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* BACK BUTTON */}
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 text-xs font-mono text-white/50 hover:text-white transition mb-6 cursor-pointer"
            >
              <ArrowLeft size={14} />
              Back to Portfolio
            </button>

            {/* TITLE & TAGLINE */}
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">
              {project.title}
            </h1>
            <p className="text-sm font-mono text-red-400 mb-6">
              {project.tagline}
            </p>

            <div className="h-[2px] w-20 rounded-full bg-gradient-to-r from-red-500/60 to-white/10 mb-6" />

            {/* DESCRIPTION */}
            <p className="text-sm text-white/70 leading-relaxed text-justify mb-8">
              {project.description}
            </p>

            {/* METRICS GRID */}
            {metrics.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mb-8">
                {metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col justify-center text-center"
                  >
                    <span className="text-sm md:text-base font-bold text-white">
                      {m.value}
                    </span>
                    <span className="text-[10px] font-mono text-white/40 uppercase mt-1">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap gap-4 mb-8">
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition shadow-lg shadow-red-950/40"
                >
                  <ExternalLink size={15} />
                  Visit Live Site
                </a>
              )}

              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-semibold text-sm transition"
                >
                  <GitBranch size={15} />
                  GitHub Repository
                </a>
              )}
            </div>

            {/* TECH STACK LIST */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Code2 size={15} className="text-white/70" />
                <h4 className="text-xs font-mono tracking-wider text-white/70 uppercase">
                  Technologies Used
                </h4>
              </div>

              <div className="flex flex-wrap gap-2">
                {tech.map((t, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-mono text-white/80"
                  >
                    <Box size={11} className="text-white/40" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN - MEDIA & FEATURES */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 pt-4"
          >
            {/* GALLERY */}
            {galleryImages.length > 0 && (
              <div className="relative rounded-[26px] overflow-hidden border border-white/10 bg-white/5">
                <img
                  src={galleryImages[currentImage]}
                  alt={project.title}
                  onClick={() => setPreviewOpen(true)}
                  className="w-full h-[260px] md:h-[320px] object-cover cursor-pointer hover:scale-102 transition duration-300"
                />

                {galleryImages.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md">
                    {galleryImages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImage(i)}
                        className={`rounded-full transition-all ${
                          currentImage === i
                            ? 'w-5 h-1.5 bg-white'
                            : 'w-1.5 h-1.5 bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PROBLEM & SOLUTION */}
            {project.problem && (
              <div className="p-6 rounded-[26px] border border-white/10 bg-white/5 backdrop-blur-xl">
                <h4 className="text-xs font-mono text-red-400 uppercase tracking-wider mb-2">
                  The Problem
                </h4>
                <p className="text-xs text-white/70 leading-relaxed mb-4">
                  {project.problem}
                </p>

                <h4 className="text-xs font-mono text-green-400 uppercase tracking-wider mb-2">
                  The Solution
                </h4>
                <p className="text-xs text-white/70 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            )}

            {/* KEY FEATURES */}
            {features.length > 0 && (
              <div className="p-6 rounded-[26px] border border-white/10 bg-white/5 backdrop-blur-xl">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={15} className="text-white/80" />
                  <h4 className="text-sm font-semibold text-white">
                    Key Features & Capabilities
                  </h4>
                </div>

                <ul className="space-y-3">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs text-white/70 leading-relaxed">
                      <CheckCircle2 size={14} className="text-red-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}
