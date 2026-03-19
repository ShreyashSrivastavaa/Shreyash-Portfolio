'use client';

import { motion } from 'framer-motion';

const TECH_GROUPS = [
  { label: 'Runtime', tags: ['Node.js', 'NestJS', 'Express.js'] },
  { label: 'Database', tags: ['PostgreSQL', 'Prisma', 'Supabase', 'Redis'] },
  { label: 'Infra', tags: ['Docker', 'RabbitMQ', 'Git', 'Nginx', 'JWT / Auth', 'REST APIs'] },
  { label: 'Languages', tags: ['JavaScript', 'TypeScript', 'C++', 'Go (learning)'] },
  { label: 'Concepts', tags: ['System Design', 'Async Architecture', 'Clean API Design'] }
];

export default function TechStackV2() {
  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    viewport: { once: true }
  };

  return (
    <section id="stack" className="py-32 px-6 lg:px-24 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto space-y-24">
        <motion.h2 
          {...fadeUp}
          className="text-2xl font-bold text-[#888888] tracking-[0.15em] uppercase"
        >
          / Tech Matrix
        </motion.h2>

        <div className="space-y-0">
          {TECH_GROUPS.map((group, idx) => (
            <motion.div 
              key={group.label}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: idx * 0.1 }}
              className="flex flex-col md:flex-row md:items-center gap-6 md:gap-24 group py-2 border-b border-[#1a1a1a] last:border-0"
            >
              <div className="md:w-48">
                 <span className="text-white text-lg font-semibold tracking-tight group-hover:text-white/70 transition-colors">
                   {group.label}
                 </span>
              </div>
              <div className="flex flex-wrap gap-3">
                 {group.tags.map(tag => (
                   <span 
                    key={tag}
                    className="px-4 py-2 bg-[#1a1a1a] border border-[#333333] rounded-[6px] text-white text-[13px] font-medium tracking-tight hover:border-[#444444] transition-all"
                   >
                     {tag}
                   </span>
                 ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
