'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function HeroV2() {
  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <section className="min-h-screen pt-32 pb-20 px-6 lg:px-24 bg-[#0f0f0f] flex items-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-10 gap-16 items-center">
        
        {/* Left Column (40%) - Profile */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-4 flex justify-center lg:justify-start"
        >
          <div className="w-[280px] h-[280px] bg-[#1a1a1a] rounded-[6px] flex items-center justify-center border border-[#222222]">
            <span className="text-[64px] font-bold text-[#f5f5f5] tracking-tighter opacity-20">SS</span>
          </div>
        </motion.div>

        {/* Right Column (60%) - Content */}
        <div className="lg:col-span-6 space-y-12">
          <div className="space-y-4">
            <motion.span 
              {...fadeUp}
              className="block text-[#888888] uppercase tracking-[0.15em] text-[12px] font-medium"
            >
              Backend Engineer
            </motion.span>
            
            <motion.h1 
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-[#f5f5f5] tracking-tight"
            >
              Shreyash <br /> Srivastava
            </motion.h1>
            
            <motion.p 
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.2 }}
              className="text-lg md:text-xl text-[#888888] max-w-lg leading-relaxed"
            >
              I build the backend systems that products run on.
            </motion.p>
          </div>

          {/* Stats Row */}
          <motion.div 
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.3 }}
            className="flex flex-wrap border-y border-[#222222] py-8"
          >
            <div className="pr-12 border-r border-[#222222]">
               <p className="text-2xl font-bold text-white mb-1">2+</p>
               <p className="text-[#888888] text-xs uppercase tracking-widest">Years Building</p>
            </div>
            <div className="px-12 border-r border-[#222222]">
               <p className="text-2xl font-bold text-white mb-1">3+</p>
               <p className="text-[#888888] text-xs uppercase tracking-widest">Projects Shipped</p>
            </div>
            <div className="pl-12">
               <p className="text-2xl font-bold text-white mb-1">Open</p>
               <p className="text-[#888888] text-xs uppercase tracking-widest">To Roles</p>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div 
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 pt-4"
          >
            <a 
              href="#projects" 
              className="px-8 py-4 bg-white text-[#0f0f0f] font-bold rounded-[6px] hover:bg-opacity-90 transition-all text-center"
            >
              View Work
            </a>
            <a 
              href="mailto:shreyashsr2004@gmail.com" 
              className="px-8 py-4 bg-transparent text-white font-bold rounded-[6px] border border-[#f5f5f5] hover:bg-white/5 transition-all text-center"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
