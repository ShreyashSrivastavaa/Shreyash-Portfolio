'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function HeroV2() {
  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <section className="min-h-screen pt-32 pb-20 px-6 lg:px-24 bg-[#0f0f0f] flex items-center shrink-0">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-10 gap-16 items-center">
        
        {/* Left Column (40%) - Profile */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-4 flex justify-center lg:justify-start"
        >
          <div className="w-[280px] h-[280px] bg-[#1a1a1a] rounded-[6px] overflow-hidden flex items-center justify-center border border-[#222222] group">
            <Image 
              src="/profile.png" 
              alt="Shreyash Srivastava"
              width={280}
              height={280}
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700 aspect-square group-hover:scale-105"
            />
          </div>
        </motion.div>

        {/* Right Column (60%) - Content */}
        <div className="lg:col-span-6 space-y-12">
          <div className="space-y-4">
            <motion.div 
              {...fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#ffb300]/30 bg-[#ffb300]/5 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffb300] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffb300]"></span>
              </span>
              <span className="text-[#ffb300] text-[10px] font-bold uppercase tracking-wider">Available for Internships & Full-Time Roles</span>
            </motion.div>

            <motion.h1 
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-[#f5f5f5] tracking-tight"
            >
              <span className="text-[#ffb300]">Shreyash</span> <br /> Srivastava
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
            <div className="pr-12 md:pr-16 border-r border-[#222222] mb-4 md:mb-0">
               <p className="text-2xl font-bold text-white mb-1">3+</p>
               <p className="text-[#888888] text-[10px] uppercase tracking-widest leading-tight">Production<br/>Projects</p>
            </div>
            <div className="px-12 md:px-16 border-r border-[#222222] mb-4 md:mb-0">
               <p className="text-2xl font-bold text-white mb-1">1</p>
               <p className="text-[#888888] text-[10px] uppercase tracking-widest leading-tight">Active<br/>Internship</p>
            </div>
            <div className="px-12 md:px-16 border-r border-[#222222] mb-4 md:mb-0">
               <p className="text-2xl font-bold text-white mb-1">2+</p>
               <p className="text-[#888888] text-[10px] uppercase tracking-widest leading-tight">Years<br/>Backend</p>
            </div>
            <div className="pl-12 md:pl-16">
               <p className="text-2xl font-bold text-[#ffb300] mb-1">Open</p>
               <p className="text-[#888888] text-[10px] uppercase tracking-widest leading-tight">To<br/>Roles</p>
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
              className="px-8 py-4 bg-[#ffb300] text-black font-bold rounded-[6px] hover:bg-[#ffc107] transition-all text-center flex items-center justify-center gap-2 group"
            >
              View Work
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="https://drive.google.com/file/d/1o0GvcX8L-p8jhxLpJHPeKVsqFXkUp5g5/view?usp=drive_link" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-transparent text-white font-bold rounded-[6px] border border-[#222222] hover:bg-white/5 transition-all text-center inline-flex items-center justify-center gap-2"
            >
              Download Resume
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
