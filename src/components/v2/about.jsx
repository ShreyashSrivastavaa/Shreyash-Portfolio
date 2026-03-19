'use client';

import { motion } from 'framer-motion';

export default function AboutV2() {
  const bio = "I'm a final-year CS student working professionally on production backend systems. I think in systems — async queues, schemas that don't break, APIs that don't surprise you. Currently building with NestJS, PostgreSQL, and RabbitMQ. Open to backend engineering roles where architecture matters.";
  
  const tech = ['NestJS', 'Node.js', 'PostgreSQL', 'Prisma', 'RabbitMQ', 'Docker', 'Redis', 'TypeScript'];

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    viewport: { once: true }
  };

  return (
    <section id="about" className="py-32 px-6 lg:px-24 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 sm:gap-24 relative">
        
        {/* Left Column - Rotated Label */}
        <div className="lg:w-24 flex items-start justify-center pt-8">
           <span className="lg:-rotate-90 lg:whitespace-nowrap font-mono text-sm uppercase tracking-[0.3em] text-[#888888] origin-center">
             / About
           </span>
        </div>

        {/* Right Column - Content */}
        <div className="flex-1 space-y-16">
          <motion.p 
            {...fadeUp}
            className="text-2xl md:text-4xl text-[#f5f5f5] leading-[1.4] font-medium tracking-tight max-w-4xl"
          >
            {bio}
          </motion.p>

          <motion.div 
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="flex flex-wrap gap-3"
          >
            {tech.map((tag) => (
              <span 
                key={tag}
                className="px-5 py-2 bg-[#1a1a1a] border border-[#444444] rounded-[6px] text-white text-sm font-medium hover:bg-[#222222] transition-colors"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
