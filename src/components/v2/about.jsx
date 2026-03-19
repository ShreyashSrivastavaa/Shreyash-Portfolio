'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutV2() {
  const bio = (
    <>
      I am Shreyash, a Computer Science student and SDE Intern focused on scalable systems.
      <br /><br />
      I like solving complex problems and building efficient solutions that have real impact.
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
    <section id="about" className="py-32 px-6 lg:px-24 bg-[#0f0f0f] border-y border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Proper Section Header */}
        <motion.h2 
          {...fadeUp}
          className="text-sm font-mono text-[#888888] uppercase tracking-[0.3em]"
        >
          / About
        </motion.h2>

        {/* Content */}
        <div className="flex flex-col xl:flex-row gap-16 items-start">
          
          <div className="flex-1 space-y-12">
            <motion.p 
              {...fadeUp}
              className="text-lg md:text-xl text-[#f5f5f5] leading-[1.6] font-medium tracking-tight max-w-3xl"
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
                  className="px-5 py-2 bg-[#1a1a1a] border border-[#222222] rounded-[6px] text-white text-sm font-medium hover:border-[#ffb300]/40 hover:bg-[#ffb300]/5 transition-all cursor-default"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
          
          <motion.div 
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.3 }}
            className="w-full xl:w-auto flex-shrink-0"
          >
            <div className="w-full max-w-[300px] aspect-square bg-[#1a1a1a] rounded-[6px] overflow-hidden border border-[#222222] group mx-auto xl:mx-0">
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
      </div>
    </section>
  );
}
