'use client';

import { motion } from 'framer-motion';
import { Award, Trophy, Code, Download, FileText } from 'lucide-react';

const ACHIEVEMENTS = [
  {
    title: 'Winner - Code-O-Fiesta 2.0',
    org: 'ITS Engineering College',
    description: 'Built SentinelAuth (MFA library) in 24 hours, placing 1st among 40+ teams.',
    icon: <Trophy className="text-white" size={24} />
  },
  {
    title: 'Problem Solving (Intermediate)',
    org: 'HackerRank',
    description: 'Verified proficiency in Data Structures, Algorithms, and logical reasoning.',
    icon: <Code className="text-white" size={24} />
  },
  {
    title: 'Finalist - Innocodeathon',
    org: 'ITS Engineering College',
    description: 'Developed a backend solution for distributed log processing optimization.',
    icon: <Award className="text-white" size={24} />
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
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    viewport: { once: true }
  };

  return (
    <section id="credentials" className="py-32 px-6 lg:px-24 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto space-y-32">
        
        {/* Achievements Section */}
        <div className="space-y-16">
          <motion.h2 
            {...fadeUp}
            className="text-2xl font-bold text-[#888888] tracking-[0.15em] uppercase"
          >
            / Achievements
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ACHIEVEMENTS.map((ach, idx) => (
              <motion.div 
                key={ach.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: idx * 0.1 }}
                className="p-8 bg-[#111111] border border-[#222222] rounded-[6px] space-y-6 hover:border-[#333333] transition-all group"
              >
                <div className="p-3 bg-[#1a1a1a] border border-[#333333] rounded-[6px] w-fit group-hover:bg-[#222222] transition-colors">
                  {ach.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white leading-tight">{ach.title}</h3>
                  <p className="text-sm text-[#888888] font-medium uppercase tracking-widest text-[10px]">{ach.org}</p>
                </div>
                <p className="text-[#f5f5f5]/60 text-sm leading-relaxed">{ach.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Credentials Grid Section */}
        <div className="space-y-16">
          <motion.h2 
            {...fadeUp}
            className="text-2xl font-bold text-[#888888] tracking-[0.15em] uppercase"
          >
            / Credentials
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
             <div className="grid grid-cols-1 gap-4">
                {CERTIFICATES.map((cert, idx) => (
                  <motion.div 
                    key={cert.name}
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: idx * 0.05 }}
                    className="flex items-center justify-between p-6 bg-[#111111]/50 border border-[#1a1a1a] rounded-[6px] hover:border-[#222222] transition-all"
                  >
                    <div className="flex gap-4 items-center">
                      <FileText size={20} className="text-[#888888]" />
                      <div className="space-y-1">
                        <p className="text-white text-sm font-semibold">{cert.name}</p>
                        <p className="text-[#888888] text-[10px] uppercase tracking-widest">{cert.issuer}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
             </div>

             <motion.div 
              {...fadeUp}
              className="p-12 bg-white flex flex-col items-center justify-center text-[#0f0f0f] rounded-[6px] space-y-6"
             >
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold">Latest Resume</h3>
                  <p className="text-[#0f0f0f]/60 text-sm font-medium">Updated March 2026. Includes full tech stack details and internship metrics.</p>
                </div>
                <a 
                  href="/resume.pdf" 
                  target="_blank"
                  className="flex items-center gap-3 px-8 py-4 bg-[#0f0f0f] text-white rounded-[6px] font-bold hover:bg-black transition-all"
                >
                  <Download size={20} />
                  Download PDF
                </a>
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
