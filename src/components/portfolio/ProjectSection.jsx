'use client';

import { motion } from 'framer-motion';

export default function ProjectSection({
  number,
  kicker,
  title,
  children,
  borderBottom = false,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`space-y-6 py-4 ${borderBottom ? 'border-b border-white/10 pb-12' : ''}`}
    >
      {/* SECTION KICKER & NUMBER */}
      {kicker && (
        <div className="flex items-center gap-2 text-xs font-mono text-[#f0ece8]/50 uppercase tracking-widest">
          {number && <span className="text-[#f0ece8]/80 font-bold">{number} /</span>}
          <span>{kicker}</span>
        </div>
      )}

      {/* SECTION TITLE */}
      {title && (
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#f0ece8] font-heading max-w-3xl leading-snug">
          {title}
        </h2>
      )}

      {/* SECTION BODY CONTENT */}
      <div className="text-base text-[#f0ece8]/75 leading-relaxed font-light space-y-4 max-w-3xl">
        {children}
      </div>
    </motion.div>
  );
}
