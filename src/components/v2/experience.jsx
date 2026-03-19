'use client';

import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Radio, Zap } from 'lucide-react';

const EXPERIENCE = [
  {
    role: 'SDE Intern',
    company: 'S.A.F.E (Scam Avoidance & Fast Enforcement)',
    period: 'Nov 2024 — Present',
    location: 'Remote',
    impact: [
       'Built backend infrastructure for the phishing detection engine.',
       'Reduced false-positives by [TODO]% through [TODO] optimization.',
       'Architected a high-throughput API handling [TODO] requests/sec.'
    ]
  },
  {
    role: 'Backend Developer Intern',
    company: '[TODO: Company Name]',
    period: 'Jun 2024 — Aug 2024',
    location: 'Hybrid',
    impact: [
       'Designed and maintained RESTful APIs for [TODO: product name].',
       'Migrated legacy [TODO] data to PostgreSQL with custom sync scripts.',
       'Improved database query efficiency by [TODO]%.'
    ]
  }
];

export default function ExperienceV2() {
  return (
    <section id="experience" className="py-24 px-6 lg:px-24 bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row justify-between items-baseline gap-4">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-primary font-mono text-sm tracking-widest uppercase"
          >
            /experience
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            className="text-white text-xs font-mono uppercase tracking-widest italic"
          >
            High impact history
          </motion.p>
        </div>

        <div className="space-y-12">
          {EXPERIENCE.map((exp, idx) => (
            <motion.div 
              key={exp.role + exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-4 gap-8 group"
            >
              <div className="md:col-span-1 space-y-2">
                 <p className="text-white/40 font-mono text-xs uppercase tracking-widest">{exp.period}</p>
                 <p className="text-white font-mono text-xs uppercase tracking-widest flex items-center gap-2 group-hover:text-primary transition-colors">
                    <MapPin size={12} /> {exp.location}
                 </p>
              </div>

              <div className="md:col-span-3 space-y-6">
                 <div>
                   <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors mb-1">{exp.role}</h3>
                   <div className="flex items-center gap-3">
                     <p className="text-white/60 font-mono text-sm uppercase tracking-widest">{exp.company}</p>
                     <div className="p-1 px-2 border border-white/10 bg-white/5 border-sharp text-[10px] text-white/30 uppercase tracking-[0.2em] font-mono">
                        Impact-driven
                     </div>
                   </div>
                 </div>

                 <ul className="space-y-4">
                    {exp.impact.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-4 text-white/50 text-base leading-relaxed group-hover:text-white/80 transition-colors">
                        <span className="text-primary mt-2 shrink-0"><Radio size={12} /></span>
                        {bullet}
                      </li>
                    ))}
                 </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
