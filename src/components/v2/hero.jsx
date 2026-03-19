'use client';

import { motion } from 'framer-motion';
import { Terminal, ArrowRight, Github, Linkedin, Mail, MousePointer2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const STACK = [
  'Backend Engineer', 'NestJS', 'PostgreSQL', 'RabbitMQ', 'Docker'
];

export default function HeroV2() {
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.4,
        stiffness: 100,
        damping: 20
      }
    }
  };

  const scrollToProjects = (e) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[100vh] flex flex-col justify-center px-6 lg:px-24 overflow-hidden bg-[#0d0d0d] font-sans">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none blueprint-grid opacity-[0.4]" />
      <div className="absolute inset-0 z-0 pointer-events-none blueprint-grid-sub opacity-[0.2]" />
      
      {/* Radial fade to focus center */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-radial-[circle_at_50%_50%] from-transparent via-[#0d0d0d]/40 to-[#0d0d0d]" />

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-5xl"
      >
        <motion.div variants={item} className="flex items-center gap-2 mb-8 text-primary font-mono text-xs tracking-[0.3em] uppercase">
          <Terminal size={14} className="text-primary" />
          <span>Protocol: ARCHITECT_V2_INIT</span>
        </motion.div>

        <motion.h1 
          variants={item}
          className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter text-white mb-10 leading-[0.95] font-mono"
        >
          I engineer the <br />
          <span className="text-primary italic">infrastructure</span> <br />
          that products run on<span className={`inline-block w-[0.5ch] h-[0.8em] bg-primary ml-2 translate-y-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
        </motion.h1>

        <motion.div variants={item} className="flex flex-wrap gap-4 mb-16">
          {STACK.map((tech, idx) => (
            <div key={tech} className="flex items-center gap-3">
              <span className="text-white/80 font-mono text-sm tracking-tight">
                {tech}
              </span>
              {idx < STACK.length - 1 && <span className="text-white/10 font-mono text-sm leading-none">•</span>}
            </div>
          ))}
        </motion.div>

        <motion.div variants={item} className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
          <a 
            href="#projects" 
            onClick={scrollToProjects}
            className="group flex items-center gap-4 px-10 py-5 bg-primary text-[#0d0d0d] font-bold border-sharp hover:translate-x-1 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_#0088cc] hover:shadow-[8px_8px_0px_#0088cc]"
          >
            VIEW WORK
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
          
          <div className="flex flex-col gap-2">
            <a href="mailto:shreyashsr2004@gmail.com" className="group flex items-center gap-2 text-white/40 hover:text-primary transition-all font-mono text-sm tracking-widest uppercase">
              <Mail size={16} />
              Open to roles
              <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
            <div className="w-full h-[1px] bg-white/5 group-hover:bg-primary/30 transition-colors" />
          </div>
        </motion.div>
      </motion.div>

      {/* Hero Accent: Coordinates */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 right-12 hidden lg:block font-mono text-[10px] text-white tracking-[0.5em] uppercase [writing-mode:vertical-rl]"
      >
        28.4744° N, 77.5040° E // GREATER NOIDA
      </motion.div>
    </section>
  );
}
