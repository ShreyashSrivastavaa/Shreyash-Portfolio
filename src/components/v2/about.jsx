'use client';

import { motion } from 'framer-motion';

export default function AboutV2() {
  const text = "I'm a final-year CS student working professionally on production backend systems. I think in systems — async queues, schemas that don't break, APIs that don't surprise you. Currently building with NestJS, PostgreSQL, and RabbitMQ. Open to backend engineering roles where architecture matters.";

  return (
    <section id="about" className="relative py-32 px-6 lg:px-24 bg-[#0d0d0d] overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 lg:items-start">
        {/* Editorial Label */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="lg:w-1/4 pt-2"
        >
          <div className="flex items-center gap-4 text-primary font-mono text-[10px] tracking-[0.5em] uppercase">
            <span className="w-8 h-[1px] bg-primary"></span>
            <span>IDENT_PROFILE</span>
          </div>
        </motion.div>
        
        {/* Content Area */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', bounce: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
          className="lg:w-3/4"
        >
          <p className="text-2xl md:text-4xl lg:text-5xl font-bold leading-[1.3] text-white tracking-tight">
            {text.split(' ').map((word, i) => (
              <span key={i} className="inline-block mr-[0.3em]">
                {word}
              </span>
            ))}
          </p>

          <div className="mt-16 flex flex-wrap gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-white/20 font-mono text-[10px] uppercase tracking-widest">Focus Areas</span>
              <div className="flex gap-4 text-primary/60 font-medium font-mono text-sm">
                <span>// SCALABLE_SYSTEMS</span>
                <span>// ASYNC_ORCHESTRATION</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="text-white/20 font-mono text-[10px] uppercase tracking-widest">Principles</span>
              <div className="flex gap-4 text-primary/60 font-medium font-mono text-sm">
                <span>// DATA_INTEGRITY</span>
                <span>// CLEAN_APIS</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Blueprint Line */}
      <div className="absolute top-0 right-0 w-[1px] h-full bg-linear-to-b from-primary/20 via-primary/5 to-transparent mr-24 hidden lg:block" />
    </section>
  );
}
