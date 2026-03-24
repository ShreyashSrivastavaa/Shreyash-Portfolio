'use client';

import { motion } from 'framer-motion';
import { Github, Zap } from 'lucide-react';

const PROJECTS = [
  {
    title: 'Hotel Booking Backend API',
    tagline: 'Scalable REST API for hotel management and reservations',
    featured: true,
    stats: '180ms Latency · Atomic Safety',
    problem: 'Simultaneous booking requests cause double-bookings in document stores.',
    solution: 'Optimistic concurrency control and atomic MongoDB operations for zero-collision booking logic.',
    decisions: [
      'Optimistic concurrency control.',
      'Atomic MongoDB operations for booking logic.',
      'JWT for secure session management.'
    ],
    stack: ['Node.js', 'Express.js', 'MongoDB', 'JWT'],
    github: 'https://github.com/ShreyashSrivastavaa/Hotel-Booking-System_Backend'
  },
  {
    title: 'S.A.F.E. (Scam Analysis & Fraud Elimination)',
    tagline: 'ML-powered scam detection for real-time threat analysis',
    featured: false,
    stats: '94%+ Accuracy · <250ms Latency',
    problem: 'Rising digital fraud targets millions through subtle psychological triggers.',
    solution: 'Specialized analysis pipeline using RoBERTa and intelligence-based scoring across 5 analysis vectors.',
    decisions: [
      'RoBERTa for deep text analysis.',
      'FastAPI for high-performance ML inference.',
      'Supabase for intelligence-based scoring storage.'
    ],
    stack: ['Python', 'FastAPI', 'Next.js', 'Supabase'],
    github: 'https://github.com/ShreyashSrivastavaa/S.A.F.E.git'
  },
  {
    title: 'CryptGen (Password Utility)',
    tagline: 'Secure client-side entropy generation, zero server dependency',
    featured: false,
    stats: '0 Server Calls · <10ms Gen',
    problem: 'Server-side password generation exposes data to network logs.',
    solution: 'Purely client-side Web Crypto API, passwords never leave the user\'s environment.',
    decisions: [
      'Web Crypto API for secure entropy.',
      'Zero server dependency architecture.',
      'Dynamic entropy scoring.'
    ],
    stack: ['JavaScript', 'Web Crypto API', 'HTML', 'CSS'],
    github: 'https://github.com/ShreyashSrivastavaa/Random-Password-Generator.git'
  }
];

export default function ProjectsV2() {
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
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
              className={`${project.featured ? 'md:col-span-2 border-t-2 border-t-[#ffb300]' : ''} bg-[#111111] border border-[#222222] rounded-[6px] p-8 lg:p-16 hover:border-[#333333] transition-all group relative flex flex-col justify-between`}
            >
              <div>
                <div className="flex justify-between items-start mb-12">
                  <div className="space-y-4">
                    <h3 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-[#888888] text-sm lg:text-base font-medium tracking-wide italic">
                      {project.tagline}
                    </p>
                    {project.stats && (
                       <div className="flex items-center gap-2 text-[#ffb300] text-xs font-mono uppercase tracking-widest mt-2">
                        <Zap size={14} className="fill-[#ffb300]" />
                        {project.stats}
                       </div>
                    )}
                  </div>
                  <div className="flex gap-4">
                    {project.github && (
                      <a href={project.github} className="text-[#888888] hover:text-[#ffb300] transition-colors">
                        <Github size={24} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="space-y-8 mb-12">
                    <div className="space-y-2">
                        <span className="text-[#444444] text-[10px] uppercase font-bold tracking-[0.2em]">Problem</span>
                        <p className="text-[#f5f5f5]/80 text-sm leading-relaxed max-w-2xl">{project.problem}</p>
                    </div>
                    {project.solution && (
                        <div className="space-y-2">
                            <span className="text-[#ffb300]/80 text-[10px] uppercase font-bold tracking-[0.2em]">Solution</span>
                            <p className="text-[#f5f5f5]/80 text-sm leading-relaxed max-w-2xl">{project.solution}</p>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 py-12 border-t border-[#1a1a1a]">
                   <div className="space-y-4">
                      <span className="text-[#444444] text-[10px] uppercase font-bold tracking-[0.2em]">Architecture Signals</span>
                      <ul className="space-y-3">
                        {project.decisions.map((decision, i) => (
                          <li key={i} className="flex items-start gap-3 text-[#f5f5f5]/60 text-sm leading-relaxed">
                            <span className="text-[#ffb300] mt-1.5 w-1 h-1 rounded-full bg-[#ffb300] shrink-0" />
                            {decision}
                          </li>
                        ))}
                      </ul>
                   </div>
                   
                   <div className="flex flex-col justify-end items-start md:items-end">
                      <div className="flex flex-wrap gap-2 justify-start md:justify-end">
                        {project.stack.map(tech => (
                          <span key={tech} className="px-3 py-1 bg-[#1a1a1a] border border-[#222222] rounded-[6px] text-[#888888] text-[11px] font-medium uppercase tracking-wider group-hover:border-[#ffb300]/40 transition-all">
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
