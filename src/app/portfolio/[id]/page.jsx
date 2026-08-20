'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import projectsData from '@/data/projects.json';
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
  CheckCircle2,
  AlertTriangle,
  Zap,
  Lightbulb,
  Cpu,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

export default function PortfolioDetailPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const router = useRouter();
  const id = params?.id;

  const [project, setProject] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    const found = projectsData.find((p) => p.id === id);
    if (found) {
      setProject(found);
    } else {
      setProject(projectsData[0]);
    }
  }, [id]);

  if (!project) return null;

  const tech = project.tech || [];
  const features = project.detailed_features || project.key_features || [];
  const metrics = project.metrics || [];
  const challenges = project.challenges_solutions || [];
  const lessons = project.lessons_learned || [];
  const architecture = project.architecture_details || [];
  const galleryImages = project.image_urls || [project.image_url];

  // Related projects filtering (excluding current)
  const relatedProjects = projectsData.filter((p) => p.id !== project.id).slice(0, 3);

  const nextImage = () => {
    if (currentImage < galleryImages.length - 1) {
      setCurrentImage((prev) => prev + 1);
    }
  };

  const prevImage = () => {
    if (currentImage > 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  const handleBack = () => {
    sessionStorage.setItem('skipIntroOnce', 'true');
    router.push('/#portfolio');
  };

  return (
    <>
      {/* FULLSCREEN LIGHTBOX MODAL */}
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
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center cursor-pointer text-white"
              aria-label="Close Preview"
            >
              <X size={20} />
            </button>

            {currentImage > 0 && (
              <button
                onClick={prevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center cursor-pointer text-white"
                aria-label="Previous Image"
              >
                <ChevronLeft size={22} />
              </button>
            )}

            <motion.img
              key={currentImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              src={galleryImages[currentImage]}
              alt={project.title}
              className="max-w-[90vw] max-h-[85vh] rounded-3xl object-contain shadow-2xl border border-white/20"
            />

            {currentImage < galleryImages.length - 1 && (
              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center cursor-pointer text-white"
                aria-label="Next Image"
              >
                <ChevronRight size={22} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen text-white px-6 md:px-12 lg:px-20 py-12 relative overflow-hidden"
        style={{ backgroundColor: '#050508' }}
      >
        {/* Ambient Glows */}
        <div className="absolute top-[-150px] left-[-150px] w-[600px] h-[600px] rounded-full bg-cyan-500/[0.06] blur-[150px] -z-10 pointer-events-none" />
        <div className="absolute top-[20%] right-[-150px] w-[500px] h-[500px] rounded-full bg-purple-500/[0.05] blur-[150px] -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-16">
          {/* BACK BUTTON */}
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400/80 hover:text-cyan-300 transition cursor-pointer px-4 py-2 rounded-full bg-white/[0.03] border border-cyan-500/20 backdrop-blur-md"
          >
            <ArrowLeft size={14} />
            Back to Portfolio Showcase
          </button>

          {/* SECTION 1: HERO SECTION (50/50 SPLIT) */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* LEFT: TITLE, TAGLINE, DESCRIPTION, STATS & CTAS */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <div>
                <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 mb-4">
                  {project.category || 'Engineering Case Study'}
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300 leading-tight">
                  {project.title}
                </h1>
                <p className="text-sm md:text-base font-mono text-amber-300/90 mt-2">
                  {project.tagline}
                </p>
              </div>

              <p className="text-sm md:text-base text-slate-300/80 leading-relaxed">
                {project.description}
              </p>

              {/* QUICK STATS ROW */}
              {metrics.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-2">
                  {metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-white/[0.03] border border-cyan-500/15 backdrop-blur-md flex flex-col justify-center text-center"
                    >
                      <span className="text-base md:text-lg font-bold text-cyan-300">
                        {m.value}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 uppercase mt-0.5 tracking-wider">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA BUTTONS */}
              <div className="flex flex-wrap gap-4 pt-2">
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold text-sm transition shadow-lg shadow-cyan-500/25 hover:scale-[1.03]"
                  >
                    <ExternalLink size={16} />
                    View Live Demo
                  </a>
                )}

                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/10 border border-purple-500/30 text-purple-300 hover:text-white font-semibold text-sm transition hover:scale-[1.03]"
                  >
                    <GitBranch size={16} />
                    GitHub Repository
                  </a>
                )}
              </div>
            </motion.div>

            {/* RIGHT: MOCKUP IMAGE DISPLAY */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative group cursor-pointer"
              onClick={() => setPreviewOpen(true)}
            >
              <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-r from-cyan-500/40 via-purple-500/20 to-amber-500/30 blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />
              <div className="relative rounded-[24px] overflow-hidden border-2 border-cyan-500/40 bg-black/60 shadow-2xl">
                <img
                  src={galleryImages[currentImage]}
                  alt={project.title}
                  className="w-full h-[320px] md:h-[400px] object-cover group-hover:scale-[1.03] transition duration-500"
                />
                <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-mono text-cyan-300 border border-white/10">
                  Click to Expand Preview
                </div>
              </div>
            </motion.div>
          </div>

          {/* SECTION 2 & 3: PROBLEM STATEMENT & SOLUTION */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* PROBLEM CARD */}
            {project.problem && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-[24px] bg-white/[0.025] border-l-4 border-l-red-500 border border-white/10 backdrop-blur-xl relative overflow-hidden space-y-3"
              >
                <div className="flex items-center gap-2 text-red-400">
                  <AlertTriangle size={18} />
                  <span className="text-xs font-mono tracking-widest uppercase font-bold">
                    The Problem • Why I Built This
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">Challenges & Pain Points</h3>
                <p className="text-sm text-slate-300/80 leading-relaxed">
                  {project.problem}
                </p>
              </motion.div>
            )}

            {/* SOLUTION CARD */}
            {project.solution && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-[24px] bg-white/[0.025] border-l-4 border-l-purple-500 border border-white/10 backdrop-blur-xl relative overflow-hidden space-y-3"
              >
                <div className="flex items-center gap-2 text-purple-400">
                  <Zap size={18} />
                  <span className="text-xs font-mono tracking-widest uppercase font-bold">
                    The Solution • How I Approached It
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">Architectural Approach</h3>
                <p className="text-sm text-slate-300/80 leading-relaxed">
                  {project.solution}
                </p>
              </motion.div>
            )}
          </div>

          {/* SECTION 4: TECHNICAL ARCHITECTURE & TECH STACK */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-[24px] bg-white/[0.02] border border-white/10 backdrop-blur-xl space-y-6"
          >
            <div className="flex items-center gap-3">
              <Cpu size={22} className="text-cyan-400" />
              <div>
                <h2 className="text-xl font-bold text-white">Technical Stack & Architecture</h2>
                <p className="text-xs font-mono text-slate-400">Under the hood implementation details</p>
              </div>
            </div>

            {/* TECH BADGES GRID */}
            <div className="flex flex-wrap gap-2.5">
              {tech.map((t, i) => (
                <span
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300 hover:border-cyan-400 transition"
                >
                  <Box size={13} className="text-cyan-400/60" />
                  {t}
                </span>
              ))}
            </div>

            {/* ARCHITECTURE HIGHLIGHTS */}
            {architecture.length > 0 && (
              <div className="pt-4 border-t border-white/10 space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  Key Technical Decisions:
                </h4>
                <ul className="grid md:grid-cols-2 gap-3">
                  {architecture.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300/80 leading-relaxed">
                      <ShieldCheck size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          {/* SECTION 5: KEY FEATURES & CAPABILITIES GRID */}
          {features.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <Sparkles size={22} className="text-amber-400" />
                <div>
                  <h2 className="text-2xl font-bold text-white">Features & Capabilities</h2>
                  <p className="text-xs font-mono text-slate-400">Core functional modules and system features</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((f, i) => {
                  const title = typeof f === 'object' ? f.title : `Feature ${i + 1}`;
                  const desc = typeof f === 'object' ? f.description : f;
                  const techDetail = typeof f === 'object' ? f.technical : null;

                  return (
                    <motion.div
                      key={i}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="p-6 rounded-[22px] bg-white/[0.025] border border-cyan-500/20 hover:border-cyan-400/50 backdrop-blur-xl transition duration-300 space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-2">
                          <CheckCircle2 size={20} />
                        </div>
                        <h3 className="text-base font-semibold text-white">{title}</h3>
                        <p className="text-xs text-slate-300/70 leading-relaxed">{desc}</p>
                      </div>

                      {techDetail && (
                        <div className="pt-3 border-t border-white/10 text-[11px] font-mono text-cyan-400/90">
                          ⚙️ {techDetail}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* SECTION 6: TECHNICAL CHALLENGES & SOLUTIONS */}
          {challenges.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <Layers size={22} className="text-purple-400" />
                <div>
                  <h2 className="text-2xl font-bold text-white">Challenges & Engineering Solutions</h2>
                  <p className="text-xs font-mono text-slate-400">Technical hurdles encountered and how I overcame them</p>
                </div>
              </div>

              <div className="space-y-4">
                {challenges.map((c, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-[22px] bg-white/[0.02] border border-white/10 backdrop-blur-xl grid md:grid-cols-2 gap-6 items-start"
                  >
                    {/* CHALLENGE */}
                    <div className="space-y-2 border-l-2 border-l-red-400 pl-4">
                      <span className="text-[11px] font-mono uppercase text-red-400 font-bold">
                        Challenge: {c.title}
                      </span>
                      <p className="text-xs text-slate-300/80 leading-relaxed">
                        {c.challenge}
                      </p>
                    </div>

                    {/* SOLUTION */}
                    <div className="space-y-2 border-l-2 border-l-cyan-400 pl-4">
                      <span className="text-[11px] font-mono uppercase text-cyan-400 font-bold">
                        Solution Implemented
                      </span>
                      <p className="text-xs text-slate-300/80 leading-relaxed">
                        {c.solution}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* SECTION 8: LESSONS LEARNED */}
          {lessons.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-[24px] bg-white/[0.02] border border-amber-500/20 backdrop-blur-xl space-y-4"
            >
              <div className="flex items-center gap-3">
                <Lightbulb size={22} className="text-amber-400" />
                <div>
                  <h2 className="text-xl font-bold text-white">Lessons Learned & Key Takeaways</h2>
                  <p className="text-xs font-mono text-slate-400">Engineering insights gained from building this project</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                {lessons.map((lesson, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border-l-4 border-l-amber-400 text-xs text-slate-300/85 leading-relaxed"
                  >
                    <span className="font-mono text-amber-400 font-bold">0{idx + 1}.</span>
                    <span>{lesson}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* SECTION 9: LIVE DEMO & REPOSITORY PROMINENT CTAS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-10 rounded-[30px] bg-gradient-to-r from-cyan-950/40 via-purple-950/20 to-black border border-cyan-500/30 text-center space-y-6 relative overflow-hidden"
          >
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">Explore Codebase & Live Demo</h2>
              <p className="text-xs md:text-sm font-mono text-cyan-300/80 max-w-xl mx-auto">
                Check out the full repository, inspect the architecture, or launch the interactive live demo.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-extrabold text-sm transition shadow-xl shadow-cyan-500/30 hover:scale-105"
                >
                  <ExternalLink size={18} />
                  Launch Live Demo
                </a>
              )}

              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold text-sm transition hover:scale-105"
                >
                  <GitBranch size={18} />
                  Inspect Source Code
                </a>
              )}
            </div>
          </motion.div>

          {/* SECTION 10: RELATED PROJECTS */}
          {relatedProjects.length > 0 && (
            <div className="space-y-6 pt-6">
              <div>
                <h2 className="text-xl font-bold text-white">Related Engineering Projects</h2>
                <p className="text-xs font-mono text-slate-400">Explore other systems built with similar stack</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {relatedProjects.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/portfolio/${rel.id}`}
                    className="group block p-5 rounded-[22px] bg-white/[0.02] border border-white/10 hover:border-cyan-500/40 transition duration-300 space-y-3"
                  >
                    <div className="h-32 rounded-xl overflow-hidden bg-black/40">
                      <img
                        src={rel.image_url}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition">
                        {rel.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                        {rel.tagline}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}
