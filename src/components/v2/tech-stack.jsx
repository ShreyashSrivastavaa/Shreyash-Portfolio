'use client';

import { motion } from 'framer-motion';
import { Cpu, Database, Server, Settings, Zap, Code2 } from 'lucide-react';

const STACK = [
  {
    category: 'Runtime',
    icon: <Cpu size={20} className="text-primary" />,
    items: ['Node.js', 'NestJS']
  },
  {
    category: 'Database',
    icon: <Database size={20} className="text-primary" />,
    items: ['PostgreSQL', 'Prisma', 'Supabase', 'Redis']
  },
  {
    category: 'Infra',
    icon: <Server size={20} className="text-primary" />,
    items: ['Docker', 'RabbitMQ', 'Git']
  },
  {
    category: 'Frontend',
    icon: <Code2 size={20} className="text-primary" />,
    items: ['Next.js', 'Tailwind CSS']
  },
  {
    category: 'Languages',
    icon: <Settings size={20} className="text-primary" />,
    items: ['JavaScript', 'TypeScript', 'C++', 'Go (learning)']
  }
];

export default function TechStackV2() {
  return (
    <section id="stack" className="py-32 px-6 lg:px-24 bg-[#0d0d0d] relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="flex flex-col md:flex-row justify-between items-baseline gap-4">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-primary font-mono text-[10px] tracking-[0.5em] uppercase"
          >
            /tech_matrix
          </motion.h2>
          <p className="text-white/20 font-mono text-[10px] uppercase tracking-widest italic">
            systems_capability_set
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {STACK.map((group, idx) => (
            <motion.div 
              key={group.category}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-8 border border-white/5 bg-white/[0.02] border-sharp group hover:bg-white/[0.04] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-12">
                   <div className="p-3 bg-white/5 border-sharp group-hover:border-primary transition-all border border-transparent">
                     {group.icon}
                   </div>
                </div>
                <h3 className="text-white font-mono text-xs uppercase tracking-widest mb-8 border-b border-white/10 pb-4 group-hover:border-primary transition-all">
                  {group.category}
                </h3>
                <div className="flex flex-col gap-3">
                   {group.items.map(skill => (
                     <div key={skill} className="flex items-center gap-4 text-white/40 group-hover:text-white transition-all">
                        <div className="w-1.5 h-1.5 bg-primary/20 group-hover:bg-primary transition-all" />
                        <span className="font-mono text-xs tracking-tight">{skill}</span>
                     </div>
                   ))}
                </div>
              </div>

              <div className="mt-12 h-[1px] w-full bg-white/5 group-hover:bg-primary/20 transition-all" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Grid Lines (Horizontal) */}
      <div className="absolute left-0 right-0 top-[30%] h-[1px] bg-white/5 pointer-events-none" />
      <div className="absolute left-0 right-0 top-[60%] h-[1px] bg-white/5 pointer-events-none" />
    </section>
  );
}
