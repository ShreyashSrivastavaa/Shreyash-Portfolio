'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Code2 } from 'lucide-react';

export default function FooterV2() {
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    viewport: { once: true }
  };

  return (
    <footer id="contact" className="py-32 px-6 lg:px-24 bg-[#0f0f0f] border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-12">
        
        <div className="space-y-6">
          <motion.h2 
            {...fadeUp}
            className="text-4xl md:text-6xl font-bold text-white tracking-tight"
          >
            Let&apos;s work together.
          </motion.h2>
          <motion.p 
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-[#888888] text-lg font-medium"
          >
            Currently open to backend engineering roles.
          </motion.p>
        </div>

        <motion.div 
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
        >
          <a 
            href="mailto:shreyashsr2004@gmail.com"
            className="px-10 py-5 bg-white text-[#0f0f0f] font-bold rounded-[6px] hover:bg-opacity-90 transition-all inline-flex items-center gap-3"
          >
            <Mail size={20} />
            shreyashsr2004@gmail.com
          </a>
        </motion.div>

        <motion.div 
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.3 }}
          className="pt-12 flex flex-wrap justify-center gap-12 border-t border-[#1a1a1a] w-full"
        >
          {[
            { name: 'GitHub', href: 'https://github.com/ShreyashSrivastavaa', icon: <Github size={18} /> },
            { name: 'LinkedIn', href: 'https://www.linkedin.com/in/shreyash-srivastava-310652273', icon: <Linkedin size={18} /> },
            { name: 'LeetCode', href: 'https://leetcode.com/u/NotRambo', icon: <Code2 size={18} /> }
          ].map((social) => (
            <a 
               key={social.name} 
               href={social.href}
               target="_blank"
               rel="noopener noreferrer"
               className="group flex items-center gap-2 text-[#888888] hover:text-white transition-all font-mono text-xs uppercase tracking-[0.2em]"
            >
              {social.icon}
              {social.name}
            </a>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto mt-32 flex flex-col md:flex-row justify-between items-center gap-6 opacity-30 px-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.4em]">
            © 2024 SHREYASH SRIVASTAVA <span className="mx-2">•</span> ARCHITECT_EDITORIAL
          </p>
          <div className="flex gap-6 h-[1px] bg-[#222222] flex-1 mx-12 hidden md:block" />
          <p className="font-mono text-[9px] uppercase tracking-[0.4em]">
            BUILT_WITH_NEXTJS_14
          </p>
      </div>
    </footer>
  );
}
