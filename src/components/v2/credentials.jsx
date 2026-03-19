'use client';

import { motion } from 'framer-motion';
import { Award, Trophy, Code, Download, FileText, ExternalLink } from 'lucide-react';

const ACHIEVEMENTS = [
  {
    title: 'Winner - Code-O-Fiesta 2.0',
    org: 'ITS Engineering College',
    description: 'Built SentinelAuth (MFA library) in 24 hours, placing 1st among 40+ teams.',
    icon: <Trophy size={24} />
  },
  {
    title: 'Problem Solving (Intermediate)',
    org: 'HackerRank',
    description: 'Verified proficiency in Data Structures, Algorithms, and logical reasoning.',
    icon: <Code size={24} />
  },
  {
    title: 'Finalist - Innocodeathon',
    org: 'ITS Engineering College',
    description: 'Developed a backend solution for distributed log processing optimization.',
    icon: <Award size={24} />
  }
];

const CERTIFICATES = [
  { name: 'HackerRank Problem Solving (Intermediate)', issuer: 'HackerRank' },
  { name: 'Code-O-Fiesta 2.0 Winner', issuer: 'ITS Engineering' },
  { name: 'Innocodeathon Finalist', issuer: 'ITS Engineering' }
];

export default function CredentialsV2() {
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
    viewport: { once: true }
  };

  return (
    <section id="credentials" className="py-32 px-6 lg:px-24 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto space-y-32">
        
        {/* Achievements Grid */}
        <div className="space-y-16">
          <motion.h2 
            {...fadeUp}
            className="text-2xl font-bold text-[#888888] tracking-[0.15em] uppercase"
          >
            / Achievements & Proficiency
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ACHIEVEMENTS.map((item, idx) => (
              <motion.div
                key={item.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: idx * 0.1 }}
                className="p-8 bg-[#111111] border border-[#222222] rounded-[6px] group hover:border-[#ffb300]/40 transition-all"
              >
                <div className="mb-6 text-[#ffb300]">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#ffb300] transition-colors">{item.title}</h3>
                <p className="text-[#888888] text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certificates List */}
        <div className="space-y-16">
          <motion.h2 
            {...fadeUp}
            className="text-2xl font-bold text-[#888888] tracking-[0.15em] uppercase"
          >
            / Official Credentials
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CERTIFICATES.map((cert, idx) => (
              <motion.div
                key={cert.name}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: idx * 0.05 }}
                className="flex items-center justify-between p-6 bg-[#111111] border border-[#222222] rounded-[6px] group hover:border-[#ffb300]/30 transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-[#1a1a1a] rounded-[6px] flex items-center justify-center border border-[#222222] text-[#ffb300] group-hover:border-[#ffb300]/40 transition-all">
                    <Award size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold group-hover:text-[#ffb300] transition-colors">{cert.name}</h4>
                    <p className="text-[#888888] text-xs uppercase tracking-widest">{cert.issuer}</p>
                  </div>
                </div>
                <a 
                  href={cert.link || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 text-[#444444] hover:text-[#ffb300] transition-colors"
                >
                  <ExternalLink size={18} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Resume CTA */}
        <motion.div 
          {...fadeUp}
          className="p-12 md:p-20 bg-[#111111] border border-[#222222] rounded-[6px] text-center space-y-8 relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-[#ffb300] opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Need the full picture?</h3>
            <p className="text-[#888888] text-lg">My resume details my technical journey, full project list, and academic background.</p>
          </div>
          <a 
            href="/resume.pdf" 
            target="_blank"
            className="inline-flex items-center gap-3 px-12 py-5 bg-[#ffb300] text-black font-bold rounded-[6px] hover:bg-[#ffc107] transition-all"
          >
            <Download size={20} />
            Download Full Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}
