'use client'

import { motion } from 'framer-motion'
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  Check,
  FileText,
  Download,
  Building2,
  ArrowRight,
  ArrowUpRight
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
    <main className="min-h-screen bg-[#f1f0eb] text-[#242620] relative overflow-hidden">
      <CustomCursor />
      <ScrollProgress />
      <AnimatedBackground />

      <div className="relative z-10">
        <Navbar />

        {/* HERO BANNER */}
        <section className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 pt-12 pb-16">
          {/* TOP SECTION BAR */}
          <div className="flex items-center justify-between mb-4">
            <span className="section-numeral">05 / CAREER & ROLES</span>
            <span className="font-mono text-xs text-[#6f7168]">
              EXPERIENCE: 2024 - PRESENT
            </span>
          </div>

          <div className="max-w-4xl mb-12">
            <h1 className="text-4xl sm:text-6xl font-sans font-bold text-[#242620] tracking-tight">
              work history &amp;{' '}
              <span className="font-serif italic font-normal text-[#242620]">
                experience
              </span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-[#6f7168] mt-3 leading-relaxed max-w-2xl">
              Where I've been building: founding Zenith District to ship product ideas, ~6 months internship experience at JBH Tech Innovation, and self-directed web apps.
            </p>
          </div>

          {/* WORK EXPERIENCE CARDS */}
          <div className="max-w-4xl mx-auto mb-16 space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-[#d3d3c8]">
              <h2 className="text-2xl font-sans font-bold text-[#242620]">
                Work &amp; Experience
              </h2>
              <span className="font-mono text-xs text-[#6f7168]">
                {experienceData.experience.length} ROLES
              </span>
            </div>

            <div className="space-y-6">
              {experienceData.experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="samay-card p-6 sm:p-8 bg-[#ffffff]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-[#f1f0eb] mb-4">
                    <div>
                      <h3 className="font-sans font-bold text-2xl text-[#242620]">
                        {exp.role}
                      </h3>
                      <div className="font-sans text-xs font-semibold uppercase tracking-wider text-[#0066ff] mt-1">
                        {exp.company}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#6f7168]">
                      <span className="px-3 py-1 rounded-full bg-[#f1f0eb] text-[#242620] border border-[#d3d3c8]">
                        {exp.period}
                      </span>
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  <p className="font-sans text-sm text-[#555852] leading-relaxed mb-6">
                    {exp.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-[#f1f0eb]">
                    <div className="text-xs font-sans uppercase tracking-wider text-[#6f7168] font-bold">
                      WHAT I WORKED ON:
                    </div>
                    {exp.achievements.map((ach, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-2.5">
                        <span className="font-mono text-xs text-[#0066ff] font-bold mt-0.5">•</span>
                        <span className="font-sans text-xs sm:text-sm text-[#242620] leading-relaxed">
                          {ach}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* EDUCATION SECTION */}
          <div className="max-w-4xl mx-auto mb-16 space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-[#d3d3c8]">
              <h2 className="text-2xl font-sans font-bold text-[#242620]">
                Education &amp; Degree
              </h2>
              <span className="font-mono text-xs text-[#6f7168]">
                DEGREE PROGRAM
              </span>
            </div>

            <div className="space-y-4">
              {experienceData.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="samay-card p-6 sm:p-8 bg-[#ffffff]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-[#f1f0eb] mb-3">
                    <div>
                      <h3 className="font-sans font-bold text-xl text-[#242620]">{edu.degree}</h3>
                      <div className="font-sans text-xs font-semibold uppercase tracking-wider text-[#0066ff] mt-0.5">
                        {edu.institution}
                      </div>
                    </div>
                    <span className="font-mono text-xs text-[#6f7168]">
                      {edu.period} • {edu.status}
                    </span>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-[#555852] leading-relaxed pt-2">
                    {edu.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RESUME CTA BANNER */}
          <div className="max-w-4xl mx-auto samay-card bg-[#ffffff] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-sans font-bold text-2xl text-[#242620]">
                One-Page Resume
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#6f7168] mt-1">
                Download a clean PDF copy covering my experience, projects, and stack.
              </p>
            </div>

            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-primary shrink-0 shadow-sm"
            >
              <Download size={14} />
              <span>download resume (pdf)</span>
            </a>
          </div>
        </section>

        <Footer />
        <ScrollToTop />
      </div>
    </main>
  )
}
