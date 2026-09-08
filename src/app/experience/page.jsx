'use client'

import { motion } from 'framer-motion'
import {
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  CheckCircle2,
  FileText,
  ArrowRight,
  Sparkles,
  Download,
  Building2
} from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'
import ScrollToTop from '@/components/ScrollToTop'
import AnimatedBackground from '@/components/AnimatedBackground'
import experienceData from '@/data/experience.json'

export default function ExperiencePage() {
  const resumeUrl = 'https://drive.google.com/file/d/1DdV6JomHJOz0zidCsnwO5KFINzlq4QJO/view?usp=sharing'

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
              CAREER & MILESTONES
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-[#f0ece8] mt-3 mb-6 tracking-tight">
              Work Experience & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e63946] to-[#ff4d5a]">Leadership</span>
            </h1>
            <p className="text-base sm:text-lg text-[#f0ece8]/75 leading-relaxed font-light">
              A summary of my roles, internship experience, and technical leadership work.
            </p>
          </motion.div>

          {/* WORK EXPERIENCE TIMELINE */}
          <div className="max-w-4xl mx-auto mb-24">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-xl bg-[#e63946]/10 text-[#e63946] flex items-center justify-center">
                <Briefcase size={20} />
              </div>
              <div>
                <h2 className="text-2xl font-bold font-heading text-white">Work History</h2>
                <p className="text-xs font-mono text-[#f0ece8]/50">Professional Positions & Internships</p>
              </div>
            </div>

            <div className="space-y-8">
              {experienceData.experience.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-bold font-heading text-white">{exp.role}</h3>
                      <div className="text-sm font-semibold text-[#e63946] flex items-center gap-1.5 mt-0.5">
                        <Building2 size={15} />
                        <span>{exp.company}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end gap-1">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[#f0ece8] bg-white/[0.05] border border-white/10">
                        <Calendar size={13} className="text-[#e63946]" />
                        {exp.period}
                      </span>
                      <span className="text-[11px] font-mono text-[#f0ece8]/50 flex items-center gap-1">
                        <MapPin size={11} />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#f0ece8]/80 leading-relaxed mb-6 font-light">
                    {exp.description}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-white/5">
                    <div className="text-[11px] font-mono text-[#f0ece8]/50 uppercase tracking-widest font-semibold">
                      Key Quantified Deliverables:
                    </div>
                    {exp.achievements.map((ach, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-[#e63946] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-[#f0ece8]/85 leading-relaxed">
                          {ach}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* EDUCATION SECTION */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <GraduationCap size={20} />
              </div>
              <div>
                <h2 className="text-2xl font-bold font-heading text-white">Education & Academia</h2>
                <p className="text-xs font-mono text-[#f0ece8]/50">Degree & Core Curriculum</p>
              </div>
            </div>

            <div className="space-y-6">
              {experienceData.education.map((edu, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass-card p-8 rounded-3xl border border-white/10"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold font-heading text-white">{edu.degree}</h3>
                      <div className="text-xs sm:text-sm font-mono text-[#e63946] font-semibold mt-0.5">
                        {edu.institution}
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono text-[#f0ece8] bg-white/[0.05] border border-white/10 self-start sm:self-auto">
                      {edu.period} • {edu.status}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#f0ece8]/75 leading-relaxed pt-2 border-t border-white/5">
                    {edu.details}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RESUME CTA */}
          <div className="max-w-4xl mx-auto p-8 sm:p-10 rounded-3xl glass-card border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold font-heading text-white mb-1">
                Need a print-friendly version?
              </h3>
              <p className="text-xs text-[#f0ece8]/70">
                Download my comprehensive single-page engineering resume PDF.
              </p>
            </div>

            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#e63946] to-[#c1121f] text-white font-semibold text-xs shadow-lg shadow-red-500/20 hover:scale-105 transition-transform shrink-0 flex items-center gap-2"
            >
              <Download size={15} />
              <span>Download Resume PDF</span>
            </a>
          </div>
        </section>

        <Footer />
        <ScrollToTop />
      </div>
    </main>
  )
}
