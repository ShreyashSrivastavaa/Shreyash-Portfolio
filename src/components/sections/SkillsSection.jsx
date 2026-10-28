'use client'

import { motion } from 'framer-motion'
import { Terminal, Database, ShieldCheck, Cpu, Code2, Layers } from 'lucide-react'
import skillsData from '@/data/skills.json'

export default function SkillsSection() {
  const iconMap = {
    Terminal: <Terminal size={16} />,
    Database: <Database size={16} />,
    ShieldCheck: <ShieldCheck size={16} />,
    Brain: <Layers size={16} />,
    Code2: <Code2 size={16} />,
    Cpu: <Cpu size={16} />,
  }

  const categories = skillsData.skillCategories || []
  const coreSkills = skillsData.coreSkills || []

  return (
    <section
      id="skills"
      className="relative w-full pt-16 pb-20 sm:pb-28 px-4 sm:px-6"
    >
      <div className="max-w-[1240px] mx-auto">
        {/* SECTION EYEBROW */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="section-numeral">04 / TECHNICAL STACK</span>
            <span className="font-hand text-xl text-[#0066ff] -rotate-1 hidden sm:inline">
              · tools I use to build
            </span>
          </div>

          <span className="font-mono text-xs text-[#6f7168]">
            ACTIVE STACK: 2024 - PRESENT
          </span>
        </div>

        {/* SECTION HEADLINE */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-[#242620] tracking-tight">
            the stack I reach for:{' '}
            <span className="font-serif italic font-normal text-[#242620]">
              frontend, backend
            </span>{' '}
            &amp; databases.
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#6f7168] mt-2">
            Technologies I use across my projects, web utilities, and day-to-day development.
          </p>
        </div>

        {/* SKILL CATEGORIES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="samay-card p-6 flex flex-col justify-between bg-[#ffffff] hover:shadow-xl transition-shadow"
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
                <span>CATEGORY 0{i + 1}</span>
                <span className="text-[#22c55e]">HANDS-ON</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CORE PROFICIENCIES TABLE */}
        <div className="samay-card bg-[#ffffff] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#f1f0eb] mb-6">
            <span className="font-sans font-bold text-sm uppercase tracking-wider text-[#242620]">
              Core Tools &amp; Familiarity
            </span>
            <span className="font-mono text-xs text-[#6f7168]">
              CONFIDENCE LEVELS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {coreSkills.map((skill) => (
              <div key={skill.name} className="flex items-center justify-between py-2 border-b border-[#f1f0eb]">
                <span className="font-sans text-xs font-semibold text-[#242620]">
                  {skill.name}
                </span>

                <div className="flex items-center gap-3">
                  <div className="w-28 sm:w-36 h-2 rounded-full bg-[#f1f0eb] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#242620] to-[#0066ff]"
                      style={{ width: `${skill.percentage}%` }}
                    />
                  </div>
                  <span className="font-mono text-xs text-[#242620] font-bold w-9 text-right">
                    {skill.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
