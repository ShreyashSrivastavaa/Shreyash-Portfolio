'use client'

import { motion } from 'framer-motion'
import {
  Terminal,
  Database,
  ShieldCheck,
  Brain,
  Code2,
  Cpu,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'
import ScrollToTop from '@/components/ScrollToTop'
import AnimatedBackground from '@/components/AnimatedBackground'
import skillsData from '@/data/skills.json'

const iconMap = {
  Terminal: <Terminal size={16} />,
  Database: <Database size={16} />,
  ShieldCheck: <ShieldCheck size={16} />,
  Brain: <Brain size={16} />,
  Code2: <Code2 size={16} />,
  Cpu: <Cpu size={16} />,
}

export default function SkillsPage() {
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
            <span className="section-numeral">04 / TECHNICAL MATRIX</span>
            <span className="font-mono text-xs text-[#6f7168]">
              DAILY DRIVER &amp; STACK
            </span>
          </div>

          <div className="max-w-4xl mb-12">
            <h1 className="text-4xl sm:text-6xl font-sans font-bold text-[#242620] tracking-tight">
              skills &amp; engineering{' '}
              <span className="font-serif italic font-normal text-[#242620]">
                toolkit
              </span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-[#6f7168] mt-3 leading-relaxed max-w-2xl">
              Languages, frameworks, databases, and tools I use to build real-world web applications and products.
            </p>
          </div>

          {/* SKILL CATEGORIES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {skillsData.skillCategories.map((cat, idx) => (
              <div
                key={idx}
                className="samay-card p-6 flex flex-col justify-between bg-[#ffffff]"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#f1f0eb] mb-4">
                    <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#242620]">
                      {cat.title}
                    </span>
                    <span className="text-[#0066ff]">
                      {iconMap[cat.icon] || <Cpu size={16} />}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full text-xs font-sans bg-[#f1f0eb] text-[#242620] border border-[#d3d3c8]/60 hover:border-[#242620] transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#f1f0eb] mt-6 flex justify-between text-[11px] font-mono text-[#9ea199]">
                  <span>SPEC 0{idx + 1}</span>
                  <span className="text-[#22c55e]">HANDS-ON EXPERIENCE</span>
                </div>
              </div>
            ))}
          </div>

          {/* CORE PROFICIENCIES METRIC MATRIX */}
          <div className="samay-card bg-[#ffffff] p-6 sm:p-8 mb-16">
            <div className="pb-4 border-b border-[#f1f0eb] mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-sans font-bold text-sm uppercase tracking-wider text-[#242620]">
                Core Tools &amp; Familiarity
              </span>
              <span className="font-mono text-xs text-[#6f7168]">
                CONFIDENCE LEVELS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillsData.coreSkills.map((skill, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#f1f0eb] border border-[#d3d3c8] flex flex-col justify-between min-h-[110px]">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-sans font-semibold text-[#242620] uppercase tracking-wider">
                        {skill.name}
                      </span>
                      <span className="font-mono font-bold text-[#0066ff]">
                        {skill.percentage}%
                      </span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-[#ffffff] border border-[#d3d3c8] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#242620] to-[#0066ff]"
                        style={{ width: `${skill.percentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-[#6f7168] uppercase pt-2 border-t border-[#d3d3c8]/60 mt-2">
                    DAILY USAGE
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* EXPLORE WORK CTA */}
          <div className="samay-card bg-[#ffffff] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-sans font-bold text-2xl text-[#242620]">
                See These Tools in Action
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#6f7168] mt-1">
                Explore how these tools come together across my live projects and web apps.
              </p>
            </div>

            <Link
              href="/projects"
              className="btn-pill-primary shrink-0 shadow-sm"
            >
              <span>explore projects</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        <Footer />
        <ScrollToTop />
      </div>
    </main>
  )
}
