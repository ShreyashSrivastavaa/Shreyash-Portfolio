'use client';

import { motion } from 'framer-motion';
import { Database, Share2, Layers, ShieldCheck, Zap } from 'lucide-react';

const CASE_STUDY = {
  title: 'Orchestrating School ERP Infrastructure',
  description: 'Building a robust, scalable system to handle asynchronous real-time events and maintain high data integrity across various educational entities.',
  challenges: [
    {
      title: 'RabbitMQ Async Notification Queue',
      icon: <Share2 className="text-[#ffb300]" />,
      content: 'Implemented an asynchronous message queue to handle multi-tenant notification streams. By decoupling notification logic from core business operations, we reduced critical request latency by 40%.',
      impact: 'Zero-loss delivery architecture and idempotent message processing.'
    },
    {
      title: 'Prisma Schema Strategy',
      icon: <Database className="text-[#ffb300]" />,
      content: 'Designed a normalized PostgreSQL schema with Prisma to handle complex entity hierarchies. Optimized query performance with multi-stage indexing and deliberate relationship mapping.',
      impact: 'Maintained 100% data consistency during high-concurrency registration cycles.'
    }
  ]
};

export default function TechnicalDepthV2() {
  return (
    <section id="thinking" className="py-24 px-6 lg:px-24 bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:items-end mb-16">
          <div className="flex-1">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-[#ffb300] font-mono text-sm tracking-widest uppercase mb-4"
            >
              /thinking
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white leading-tight"
            >
              How I approach <br /> systems architecture.
            </motion.h3>
          </div>
          <div className="md:w-1/3">
             <p className="text-white/40 text-sm leading-relaxed font-mono">
               Backend engineering isn't just about code—it's about building resilient structures that fail gracefully and scale predictably.
             </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {/* Vertical Separator Line */}
          <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-white/5 hidden md:block" />

          {CASE_STUDY.challenges.map((challenge, idx) => (
            <motion.div 
              key={challenge.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="p-8 border border-white/5 bg-white/[0.02] border-sharp group hover:border-[#ffb300]/30 transition-all"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/5 border-sharp text-[#ffb300] group-hover:shadow-[0_0_15px_rgba(255,179,0,0.2)] transition-all">
                  {challenge.icon}
                </div>
                <h4 className="text-xl font-bold text-white font-mono tracking-tight">{challenge.title}</h4>
              </div>
              <p className="text-white/50 text-base leading-relaxed mb-6">
                {challenge.content}
              </p>
              <div className="flex items-start gap-3 p-4 bg-[#ffb300]/5 border-l-2 border-[#ffb300]">
                <Zap size={16} className="text-[#ffb300] mt-1 shrink-0" />
                <p className="text-[#ffb300]/80 font-mono text-xs font-semibold uppercase tracking-wider">
                  Impact: <span className="text-white/70 normal-case font-normal">{challenge.impact}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Placeholder for System Design Diagram */}
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="mt-8 p-12 border border-dashed border-white/10 flex items-center justify-center bg-white/[0.01]"
        >
          <div className="text-center group cursor-help">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-4 group-hover:border-primary transition-all">
              <Layers size={20} className="text-white/40 group-hover:text-[#ffb300]" />
            </div>
            <p className="text-white/30 font-mono text-xs uppercase tracking-widest">[TODO: Dynamic Architecture Diagram / SVG Component]</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
