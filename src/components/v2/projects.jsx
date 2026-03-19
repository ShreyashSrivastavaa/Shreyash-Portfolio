'use client';

import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';

const PROJECTS = [
  {
    title: '22 Yards',
    tagline: 'Cricket statistics and performance tracking — IPL 2022–2025',
    featured: true,
    decisions: [
      'Adapter pattern for provider decoupling.',
      'Migrated to local ball-by-ball CSV dataset for zero rate-limit risk.',
      'Prisma + Supabase for schema-as-code and versioned migrations.',
      'Next.js server components for data-heavy analytics.'
    ],
    stack: ['Next.js', 'Prisma', 'Supabase', 'Tailwind'],
    github: 'https://github.com/ShreyashSrivastavaa/22-yards-Cricket'
  },
  {
    title: 'DSA Tracker',
    tagline: 'Personal DSA progress tracker',
    featured: false,
    decisions: [
      'Topic-wise categorization for quick navigation.',
      'Progress visualization to maintain consistency.'
    ],
    stack: ['React', 'Tailwind'],
    github: 'https://github.com/ShreyashSrivastavaa/DSA-Tracker'
  },
  {
    title: 'Portfolio V2',
    tagline: 'Premium editorial backend showcase',
    featured: false,
    decisions: [
      'Version-switched architecture via Context API.',
      'Performance-first rendering with Framer Motion.'
    ],
    stack: ['Next.js', 'Framer Motion', 'Tailwind'],
    live: 'https://shreyashsrivastava.vercel.app'
  }
];

export default function ProjectsV2() {
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    viewport: { once: true }
  };

  return (
    <section id="projects" className="py-32 px-6 lg:px-24 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto space-y-16">
        <motion.h2 
          {...fadeUp}
          className="text-4xl md:text-6xl font-bold text-[#888888] tracking-tight mb-20"
        >
          / Work
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {PROJECTS.map((project, idx) => (
            <motion.div 
              key={project.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: idx * 0.1 }}
              className={`${project.featured ? 'md:col-span-2' : ''} bg-[#111111] border border-[#222222] rounded-[6px] p-8 lg:p-16 hover:border-[#333333] transition-all group relative flex flex-col justify-between`}
            >
              <div>
                <div className="flex justify-between items-start mb-12">
                  <div className="space-y-4">
                    <h3 className="text-3xl lg:text-5xl font-bold text-white leading-tight group-hover:text-white/80 transition-opacity">
                      {project.title}
                    </h3>
                    <p className="text-[#888888] text-sm lg:text-base font-medium tracking-wide italic">
                      {project.tagline}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    {project.github && (
                      <a href={project.github} className="text-[#888888] hover:text-white transition-colors">
                        <Github size={24} />
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} className="text-[#888888] hover:text-white transition-colors">
                        <ArrowUpRight size={28} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 py-12 border-t border-[#1a1a1a]">
                   <div className="space-y-4">
                      <span className="text-[#444444] text-[10px] uppercase font-bold tracking-[0.2em]">Architectural Signals</span>
                      <ul className="space-y-3">
                        {project.decisions.map((decision, i) => (
                          <li key={i} className="flex items-start gap-3 text-[#f5f5f5]/60 text-sm leading-relaxed">
                            <span className="text-white mt-1.5 w-1 h-1 rounded-full bg-white shrink-0" />
                            {decision}
                          </li>
                        ))}
                      </ul>
                   </div>
                   
                   <div className="flex flex-col justify-end items-start md:items-end">
                      <div className="flex flex-wrap gap-2 justify-start md:justify-end">
                        {project.stack.map(tech => (
                          <span key={tech} className="px-3 py-1 bg-[#1a1a1a] border border-[#222222] rounded-[6px] text-[#888888] text-[11px] font-medium uppercase tracking-wider group-hover:border-[#444444] transition-all">
                            {tech}
                          </span>
                        ))}
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
