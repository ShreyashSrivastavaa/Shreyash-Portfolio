'use client';

import { motion } from 'framer-motion';
import { Github, Zap } from 'lucide-react';

const PROJECTS = [
  {
    title: 'QuickBite (Food Ordering Backend API)',
    tagline: 'Scalable food ordering and real-time order tracking API',
    featured: true,
    stats: 'Socket.io · Zod · Helmet',
    problem: 'Traditional food delivery APIs experience latency spikes during high-traffic checkout windows and lack robust role-based access control.',
    solution: 'Engineered a scalable Node.js/Express.js backend utilizing Socket.io for live order status updates, MVC patterns for codebase modularity, and Zod/Helmet.js for API reinforcement.',
    decisions: [
      'MVC pattern for clean codebase separation.',
      'Socket.io integration for real-time order tracking.',
      'Helmet.js & rate limiting to secure API routes.',
      'Separate JWT roles (User, Admin, Product, Order).'
    ],
    stack: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'Socket.io', 'Bcrypt'],
    github: 'https://github.com/ShreyashSrivastavaa/QuickBite'
  },
  {
    title: 'SwipeRide (Ride-Sharing Backend)',
    tagline: 'Real-time geospatial ride-sharing and matching engine',
    featured: false,
    stats: 'Redis Cache · Geospatial Query',
    problem: 'Matching riders with nearby drivers in real-time requires high-frequency database reads and calculations that degrade standard SQL performance.',
    solution: 'Built a high-performance matching engine using MongoDB\'s geospatial queries with dynamic radius expansion, cached active driver locations in Redis for ultra-low latency updates, and synced status over Socket.io.',
    decisions: [
      'Geospatial queries for dynamic radius driver matching.',
      'Redis cache for active driver status & location tracking.',
      'Paystack gateway integration for secure transaction flows.',
      'Complete ride lifecycle synchronization via Socket.io.'
    ],
    stack: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'Socket.io', 'Redis', 'Google Maps API', 'Paystack'],
    github: 'https://github.com/ShreyashSrivastavaa/SwipeRide'
  },
  {
    title: 'Random Password Generator',
    tagline: 'Secure client-side password builder with real-time strength validation',
    featured: false,
    stats: '0 Server Calls · Web Crypto API',
    problem: 'Server-side password generation exposes sensitive credentials to potential logging vulnerability and MITM attacks.',
    solution: 'Created a purely browser-native utility using vanilla JavaScript to generate high-entropy passwords with adjustable length, character set selectors, and a dynamic strength meter.',
    decisions: [
      'Browser-native execution with zero server dependencies.',
      'Real-time entropy calculations for strength indication.',
      'Clipboard API for secure one-click credentials copying.'
    ],
    stack: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/ShreyashSrivastavaa/Random-Password-Generator'
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
