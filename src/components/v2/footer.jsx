'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, ArrowUpRight, Trophy } from 'lucide-react';

export default function FooterV2() {
  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/ShreyashSrivastavaa' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/shreyash-srivastava-310652273' },
    { name: 'LeetCode', href: 'https://leetcode.com/u/NotRambo' }
  ];

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    viewport: { once: true }
  };

  return (
    <footer id="contact" className="py-32 px-6 lg:px-24 bg-[#0f0f0f] border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-12">

        <div className="space-y-4">
          <motion.h2
            {...fadeUp}
            className="text-4xl md:text-7xl font-bold text-white tracking-tight"
          >
            Let's build together.
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-[#888888] text-lg font-medium"
          >
            Open to backend engineering roles and internships.
          </motion.p>
        </div>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-6 pt-8 w-full sm:w-auto"
        >
          <a
            href="mailto:shreyashsr2004@gmail.com"
            className="px-12 py-5 bg-white text-[#0f0f0f] font-bold rounded-[6px] hover:bg-[#f5f5f5] transition-all flex items-center justify-center gap-2 group"
          >
            Get in Touch
            <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            className="px-12 py-5 bg-transparent text-white font-bold rounded-[6px] border border-[#222222] hover:bg-white/5 transition-all flex items-center justify-center gap-2"
          >
            Download Resume
          </a>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 pt-16 border-t border-[#1a1a1a] w-full"
        >
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="group flex items-center gap-3 text-[#f5f5f5]"
            >
              <div className="p-2 rounded-full border border-[#1a1a1a] group-hover:border-[#333333] transition-colors">
                {link.name === 'GitHub' && <Github size={20} />}
                {link.name === 'LinkedIn' && <Linkedin size={20} />}
                {link.name === 'LeetCode' && <Trophy size={18} />}
              </div>
              <span className="text-sm font-semibold tracking-wide uppercase text-[10px] text-[#888888] group-hover:text-white transition-colors">{link.name}</span>
            </a>
          ))}
        </motion.div>
        <div className="flex gap-6 h-[1px] bg-[#222222] flex-1 mx-12 hidden md:block" />
        <p className="font-mono text-[9px] uppercase tracking-[0.4em]">
          BUILT_WITH_NEXTJS_14
        </p>
      </div>
    </footer>
  );
}
