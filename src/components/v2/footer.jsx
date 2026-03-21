'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, ArrowUpRight, Trophy, Terminal } from 'lucide-react';

export default function FooterV2() {
  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/ShreyashSrivastavaa', icon: <Github size={20} /> },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/shreyash-srivastava-310652273', icon: <Linkedin size={20} /> },
    { name: 'LeetCode', href: 'https://leetcode.com/u/NotRambo', icon: <Terminal size={20} /> }
  ];

  return (
    <footer id="contact" className="py-32 px-6 lg:px-24 bg-[#0f0f0f] border-t border-[#222222]">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-12">

        <div className="space-y-4">
          <motion.h2
            {...fadeUp}
            className="text-4xl md:text-7xl font-bold text-white tracking-tight"
          >
            Let's <span className="text-[#ffb300]">build</span> together.
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-[#888888] text-lg font-medium"
          >
            Open to backend engineering roles.
          </motion.p>
        </div>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-6 pt-8 w-full sm:w-auto"
        >
          <a
            href="mailto:shreyashsr2004@gmail.com"
            className="px-12 py-5 bg-[#ffb300] text-black font-bold rounded-[6px] hover:bg-[#ffc107] transition-all flex items-center justify-center gap-2 group"
          >
            Get in Touch
            <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
          <a
            href="https://drive.google.com/file/d/1o0GvcX8L-p8jhxLpJHPeKVsqFXkUp5g5/view?usp=drive_link"
            target="_blank"
            className="px-12 py-5 bg-transparent text-white font-bold rounded-[6px] border border-[#222222] hover:bg-white/5 transition-all flex items-center justify-center gap-2"
          >
            Download Resume
          </a>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 pt-16 border-t border-[#222222] w-full"
        >
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="group flex items-center gap-3 text-[#f5f5f5] hover:text-[#ffb300] transition-colors"
            >
              <span className="text-[#888888] group-hover:text-[#ffb300] transition-colors">{link.icon}</span>
              <span className="text-sm font-bold uppercase tracking-widest">{link.name}</span>
            </a>
          ))}
        </motion.div>
      </div>
    </footer>
  );
}
