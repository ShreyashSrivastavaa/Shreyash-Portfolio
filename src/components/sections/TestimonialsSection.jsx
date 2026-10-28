'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    quote:
      "Shreyash designs backend systems backwards from failure cases. During our hackathon sprint, his API endpoints and data schemas were deployed and handling edge cases hours ahead of our demo deadline.",
    name: 'Hackathon Teammate',
    role: 'Frontend Collaborator',
    context: 'Hackathons & Sprints',
  },
  {
    quote:
      "Collaborating with Shreyash on production REST services was effortless. He strictly validates schemas, documents endpoints clearly, and handles database operations with predictability.",
    name: 'Internship Peer',
    role: 'SDE Intern at JBH Tech Innovation',
    context: 'Team Collaboration',
  },
  {
    quote:
      "Processing multi-megabyte PDFs entirely in the client without sending a byte across the network is rare. It runs fast, uses local resources cleanly, and keeps sensitive documents completely private.",
    name: 'User Note',
    role: 'Everyday Web User',
    context: 'I Hate Love PDF',
  },
]

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative w-full pt-16 pb-20 sm:pb-28 px-4 sm:px-6"
    >
      <div className="max-w-[1240px] mx-auto">
        {/* SECTION EYEBROW */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="section-numeral">05 / NOTES &amp; FEEDBACK</span>
            <span className="font-hand text-xl text-[#0066ff] -rotate-1 hidden sm:inline">
              · notes from teammates &amp; people using my tools
            </span>
          </div>

          <span className="font-mono text-xs text-[#6f7168]">
            PEER &amp; USER NOTES
          </span>
        </div>

        {/* SECTION HEADLINE */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-[#242620] tracking-tight">
            notes from teammates,{' '}
            <span className="font-serif italic font-normal text-[#242620]">
              users
            </span>{' '}
            &amp; peers.
          </h2>
        </div>

        {/* 3-COLUMN CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="samay-card p-6 sm:p-8 flex flex-col justify-between min-h-[280px] bg-[#ffffff] hover:shadow-xl transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#f1f0eb] mb-4 text-xs text-[#6f7168]">
                  <span className="font-mono text-[11px] text-[#0066ff]">0{i + 1}</span>
                  <span className="tag-pill text-[10px]">{t.context}</span>
                </div>

                <p className="font-serif text-lg sm:text-xl font-normal text-[#242620] leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#f1f0eb] mt-6">
                <div className="font-sans font-bold text-sm text-[#242620]">
                  {t.name}
                </div>
                <div className="font-sans text-xs text-[#6f7168] mt-0.5">
                  {t.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
