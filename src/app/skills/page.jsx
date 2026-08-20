'use client'

import { motion } from 'framer-motion'
import {
  Terminal,
  Database,
  ShieldCheck,
  Brain,
  Code2,
  Cpu,
  CheckCircle2,
  Award,
  ExternalLink,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'
import ScrollToTop from '@/components/ScrollToTop'
import AnimatedBackground from '@/components/AnimatedBackground'
import skillsData from '@/data/skills.json'
import experienceData from '@/data/experience.json'

const iconMap = {
  Terminal: <Terminal size={20} className="text-[#e63946]" />,
  Database: <Database size={20} className="text-[#e63946]" />,
  ShieldCheck: <ShieldCheck size={20} className="text-[#e63946]" />,
  Brain: <Brain size={20} className="text-[#e63946]" />,
  Code2: <Code2 size={20} className="text-[#e63946]" />,
  Cpu: <Cpu size={20} className="text-[#e63946]" />,
}

export default function SkillsPage() {
  return (
    <main className="min-h-screen bg-[#050508] text-[#f0ece8] relative overflow-hidden">
      <CustomCursor />
      <ScrollProgress />
      <AnimatedBackground />

      <div className="relative z-10">
        <Navbar />

        {/* HERO BANNER */}
        <section className="w-full max-w-[1200px] mx-auto px-6 md:px-12 pt-36 md:pt-44 pb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-xs font-mono text-[#e63946] tracking-[0.25em] uppercase font-semibold">
              TECHNICAL COMPETENCIES
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-[#f0ece8] mt-3 mb-6 tracking-tight">
              Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e63946] to-[#ff4d5a]">Domain Expertise</span>
            </h1>
            <p className="text-base sm:text-lg text-[#f0ece8]/75 leading-relaxed font-light">
              Comprehensive breakdown of my backend engineering toolkit, distributed systems design, database management, and cloud devops proficiencies.
            </p>
          </motion.div>

          {/* CORE PROFICIENCY METERS */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono text-[#e63946] uppercase tracking-widest font-bold">
                  CORE MASTERY
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white mt-1">
                  Proficiency Indicators
                </h2>
              </div>
              <span className="text-xs font-mono text-[#f0ece8]/50 hidden sm:inline-block">
                Evaluated on production systems
              </span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillsData.coreSkills.map((skill, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold font-mono text-white tracking-wider">
                      {skill.name}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#e63946]">
                      {skill.percentage}%
                    </span>
                  </div>

                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-3">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut', delay: idx * 0.08 }}
                      className="h-full bg-gradient-to-r from-[#e63946] to-[#ff4d5a] rounded-full"
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-[#f0ece8]/50 uppercase tracking-widest">
                    <span>Level</span>
                    <span className="text-emerald-400 font-semibold">{skill.level}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CATEGORIZED SKILLS GRID */}
          <div className="mb-20">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-xs font-mono text-[#e63946] tracking-[0.25em] uppercase font-semibold">
                FULL TOOLKIT
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white mt-2">
                Categorized Technologies
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillsData.skillCategories.map((cat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="glass-card p-6 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-[#e63946]/40 transition-all"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-[#e63946]/10 flex items-center justify-center">
                        {iconMap[cat.icon] || <Terminal size={20} className="text-[#e63946]" />}
                      </div>
                      <h3 className="text-lg font-bold font-heading text-white">
                        {cat.title}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {cat.skills.map((s, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-3 py-1.5 rounded-xl text-xs font-mono text-[#f0ece8] bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* HACKATHON HONORS & CERTIFICATIONS */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono text-[#e63946] uppercase tracking-widest font-bold">
                  VERIFIED EVIDENCE
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white mt-1">
                  Certifications & Hackathon Honors
                </h2>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {experienceData.achievementsList.map((ach, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-card p-6 rounded-3xl border border-white/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                        <Award size={18} />
                      </div>
                      <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-semibold px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20">
                        {ach.issuer}
                      </span>
                    </div>

                    <h3 className="text-base font-bold font-heading text-white mb-2">
                      {ach.title}
                    </h3>
                    <p className="text-xs text-[#f0ece8]/70 leading-relaxed mb-6">
                      {ach.detail}
                    </p>
                  </div>

                  {ach.url && (
                    <a
                      href={ach.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between pt-4 border-t border-white/5 text-xs font-mono text-[#e63946] hover:text-white transition-colors"
                    >
                      <span>View Credential</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* BOTTOM CTA BANNER */}
          <div className="p-8 sm:p-12 rounded-3xl glass-card border border-white/10 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white mb-4">
                Want to see these skills in action?
              </h3>
              <p className="text-xs sm:text-sm text-[#f0ece8]/75 mb-8">
                Explore the project case studies with system architecture diagrams, live demos, and GitHub codebases.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/projects"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#e63946] to-[#c1121f] text-white font-semibold text-xs shadow-lg shadow-red-500/20 hover:scale-105 transition-transform"
                >
                  Explore Projects Archive
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white font-semibold text-xs hover:border-white/20 transition-colors"
                >
                  Get In Touch
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
        <ScrollToTop />
      </div>
    </main>
  )
}
