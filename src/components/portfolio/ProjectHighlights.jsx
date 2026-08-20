'use client';

import { motion } from 'framer-motion';

export default function ProjectHighlights({ project }) {
  if (!project) return null;

  const metrics = project.metrics || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-10 py-8 border-y border-white/10"
    >
      {metrics.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((m, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#f0ece8] tracking-tight font-heading leading-none">
                {m.value}
              </div>
              <div className="text-[11px] font-mono text-[#f0ece8]/50 uppercase tracking-widest leading-none pt-1">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-1.5">
            <div className="text-[11px] font-mono text-[#f0ece8]/50 uppercase tracking-widest">
              Category
            </div>
            <div className="text-sm font-semibold text-[#f0ece8]">
              {project.category || 'Engineering'}
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="text-[11px] font-mono text-[#f0ece8]/50 uppercase tracking-widest">
              Role
            </div>
            <div className="text-sm font-semibold text-[#f0ece8]">
              Lead Architect & Developer
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="text-[11px] font-mono text-[#f0ece8]/50 uppercase tracking-widest">
              Currency
            </div>
            <div className="text-sm font-semibold text-[#f0ece8]">
              INR (₹)
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="text-[11px] font-mono text-[#f0ece8]/50 uppercase tracking-widest">
              Primary Stack
            </div>
            <div className="text-sm font-semibold text-[#f0ece8]">
              {project.tech ? project.tech.slice(0, 2).join(' & ') : 'Full-Stack'}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
