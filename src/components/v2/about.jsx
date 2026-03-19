'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutV2() {
  const bio = (
    <>
      Final-year CS student shipping production backend systems professionally. I think in systems — async queues, schemas that don't break, APIs that don't surprise you.
      <br /><br />
      Open to backend engineering roles where architecture matters.
    </>
  );
  
  const tech = ['NestJS', 'Node.js', 'PostgreSQL', 'Prisma', 'RabbitMQ', 'Docker', 'Redis', 'TypeScript'];

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
    viewport: { once: true }
  };

  return (
    <section id="about" className="py-32 px-6 lg:px-24 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 sm:gap-24 relative">
        
        {/* Left Column - Rotated Label */}
        <div className="lg:w-24 flex items-start justify-center pt-8 shrink-0">
           <span className="lg:-rotate-90 lg:whitespace-nowrap font-mono text-sm uppercase tracking-[0.3em] text-[#888888] origin-center">
             / About
           </span>
        </div>

        {/* Right Column - Content */}
        <div className="flex-1 space-y-16">
          <div className="grid grid-cols-1 xl:grid-cols-10 gap-12 items-start">
            <motion.p 
              {...fadeUp}
              className="xl:col-span-7 text-2xl md:text-4xl text-[#f5f5f5] leading-[1.4] font-medium tracking-tight"
            >
              {bio}
            </motion.p>
            
            <motion.div 
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.2 }}
              className="xl:col-span-3 order-first xl:order-last"
            >
              <div className="w-full xl:aspect-square aspect-[4/3] bg-[#1a1a1a] rounded-[6px] overflow-hidden border border-[#222222] group">
                <Image 
                  src="/profile-2.jpg" 
                  alt="Professional Portrait"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </motion.div>
          </div>

          <motion.div 
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            {tech.map((tag) => (
              <span 
                key={tag}
                className="px-5 py-2 bg-[#1a1a1a] border border-[#222222] rounded-[6px] text-white text-sm font-medium hover:border-[#ffb300]/40 hover:bg-[#ffb300]/5 transition-all cursor-default"
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
