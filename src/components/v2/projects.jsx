'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Database, Share2, Layers, ShieldCheck, Zap, Terminal, ArrowUpRight } from 'lucide-react';

const PROJECTS = [
  {
    title: '22 Yards',
    tagline: 'Cricket statistics and performance tracking — IPL 2022–2025',
    featured: true,
    problem: 'Cricket data APIs are unreliable — rate limits and key expirations break apps overnight.',
    decisions: [
      'Adapter pattern — data source is an implementation detail, not a dependency. Swapping providers = changing one file.',
      'Migrated from RapidAPI to local ball-by-ball CSV dataset. Zero rate-limit risk, works fully offline.',
      'Prisma + Supabase for schema-as-code with versioned migrations.',
      'Next.js App Router — server components for data-heavy pages.'
    ],
    stack: ['Next.js', 'Prisma', 'Supabase', 'Tailwind CSS'],
    links: { github: 'https://github.com/ShreyashSrivastavaa/22-yards-Cricket' },
    icon: <Database className="text-primary" size={20} />
  },
  {
    title: 'DSA Tracker',
    tagline: 'Personal DSA progress tracker',
    featured: false,
    problem: 'Needed a way to track problem-solving consistency across topics.',
    decisions: [
      'Topic-wise categorization for quick navigation.',
      'Progress visualization to maintain streak consistency.'
    ],
    stack: ['React', 'Tailwind CSS'],
    links: { github: 'https://github.com/ShreyashSrivastavaa/DSA-Tracker' },
    icon: <Zap className="text-primary" size={20} />
  },
  {
    title: 'This Portfolio',
    tagline: 'V2 — designed to signal backend engineering depth',
    featured: false,
    problem: 'V1 lacked the architectural signal needed for senior/backend roles.',
    decisions: [
      'Version-switched architecture — V1 locked, V2 built as clean slate via VersionProvider context.',
      'Performance-first rendering with Framer Motion reveals.'
    ],
    stack: ['Next.js', 'Framer Motion', 'Tailwind CSS'],
    links: { live: 'https://shreyashsrivastava.vercel.app' },
    icon: <Layers className="text-primary" size={20} />
  }
];

export default function ProjectsV2() {
  return (
    <section id="projects" className="py-32 px-6 lg:px-24 bg-[#0d0d0d] relative">
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="flex flex-col md:flex-row justify-between items-baseline gap-4">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-primary font-mono text-[10px] tracking-[0.5em] uppercase"
          >
            /work_registry
          </motion.h2>
          <p className="text-white/20 font-mono text-[10px] uppercase tracking-widest italic">
            architectural_case_studies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {PROJECTS.map((project, idx) => (
            <motion.div 
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`${project.featured ? 'md:col-span-2' : ''} group bg-white/[0.02] border border-white/5 border-sharp p-8 lg:p-12 hover:border-primary/20 transition-all flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/5 border-sharp border border-white/10 group-hover:border-primary transition-all">
                      {project.icon}
                    </div>
                    {project.featured && (
                      <span className="text-primary font-mono text-[10px] tracking-widest border border-primary/20 px-3 py-1 bg-primary/5 uppercase border-sharp">
                        Feature_Build
                      </span>
                    )}
                  </div>
                  <div className="flex gap-4">
                    {project.links.github && (
                      <a href={project.links.github} className="text-white/30 hover:text-primary transition-colors">
                        <Github size={20} />
                      </a>
                    )}
                    {project.links.live && (
                      <a href={project.links.live} className="text-white/30 hover:text-primary transition-colors">
                        <ArrowUpRight size={20} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-3xl lg:text-5xl font-bold text-white mb-2 group-hover:text-primary transition-colors leading-tight">
                  {project.title}
                </h3>
                <p className="text-white/40 font-mono text-xs uppercase tracking-widest mb-8">
                  {project.tagline}
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 pt-12 border-t border-white/5">
                  <div className="space-y-4">
                    <span className="text-white/20 font-mono text-[10px] uppercase tracking-widest block">Problem Statement</span>
                    <p className="text-white/60 text-base leading-relaxed italic">
                      {project.problem}
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <span className="text-white/20 font-mono text-[10px] uppercase tracking-widest block">Architectural Decisions</span>
                    <ul className="space-y-3">
                      {project.decisions.map((decision, i) => (
                        <li key={i} className="flex items-start gap-4 text-white/50 text-sm leading-relaxed group-hover:text-white/80 transition-colors">
                          <Terminal size={12} className="text-primary mt-1.5 shrink-0" />
                          {decision}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex flex-wrap gap-2">
                {project.stack.map(tech => (
                  <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 border-sharp text-white/30 font-mono text-[10px] uppercase tracking-wider group-hover:border-primary/20 transition-all">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Accent Lines */}
      <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-white/5 hidden lg:block" />
    </section>
  );
}
