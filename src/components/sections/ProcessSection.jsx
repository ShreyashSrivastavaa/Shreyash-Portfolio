'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    num: '01',
    label: 'DISCOVER',
    title: 'Constraint & Workflow Analysis',
    desc: 'Before writing a single line of code, I isolate the core constraint, user workflow, and failure conditions. Engineering begins with clarifying the specification, not prematurely assembling boilerplate.',
  },
  {
    num: '02',
    label: 'ARCHITECT',
    title: 'Data & Contract Design',
    desc: 'I model normalized relational schemas, define query access patterns in PostgreSQL/MongoDB, and enforce strict API contracts with Zod. When the data structures are sound, system behavior becomes deterministic.',
  },
  {
    num: '03',
    label: 'BUILD',
    title: 'Full-Stack Implementation',
    desc: 'I implement full-stack services using TypeScript, Next.js, and Node.js. Asynchronous queues, network failure modes, and edge cases are handled defensively rather than patched retroactively.',
  },
  {
    num: '04',
    label: 'SHIP',
    title: 'Deploy, Observe & Refine',
    desc: 'I containerize with Docker, deploy to production, and verify execution across real devices. Inspecting runtime logs and user interaction patterns guides continuous refinement of edge cases.',
  },
]

export default function ProcessSection() {
  return (
    <section
      id="process"
      className="relative w-full pt-16 pb-20 sm:pb-28 px-4 sm:px-6"
    >
      <div className="max-w-[1240px] mx-auto">
        {/* SECTION EYEBROW */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="section-numeral">03 / METHODOLOGY</span>
            <span className="font-hand text-xl text-[#0066ff] -rotate-1 hidden sm:inline">
              · how products get built
            </span>
          </div>

          <span className="font-mono text-xs text-[#6f7168]">
            4-STAGE CYCLE
          </span>
        </div>

        {/* SECTION TITLE */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-[#242620] tracking-tight">
            from practical problem solving to{' '}
            <span className="font-serif italic font-normal text-[#242620]">
              usable, dependable
            </span>{' '}
            products.
          </h2>
        </div>

        {/* 4 CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="samay-card p-6 flex flex-col justify-between min-h-[260px] bg-[#ffffff] hover:shadow-xl transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#f1f0eb] mb-4">
                  <span className="font-serif text-3xl font-normal text-[#0066ff]">
                    {step.num}
                  </span>
                  <span className="tag-pill text-[10px]">
                    {step.label}
                  </span>
                </div>

                <h3 className="font-sans font-bold text-lg text-[#242620] mb-2">
                  {step.title}
                </h3>

                <p className="font-sans text-xs text-[#6f7168] leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#f1f0eb] mt-6 flex items-center justify-between text-[11px] font-mono text-[#9ea199]">
                <span>STAGE {step.num}</span>
                <span className="text-[#22c55e]">● SHIPPED</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
