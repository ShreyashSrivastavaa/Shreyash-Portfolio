'use client';

import { motion } from 'framer-motion';
import { Cpu, Database, Server, Settings, Zap } from 'lucide-react';

const SKILLS = [
  {
    category: 'Runtime / API',
    icon: <Cpu size={20} />,
    items: ['Node.js', 'NestJS', 'Express.js', 'Hono.js', 'REST API', 'GraphQL', 'tRPC']
  },
  {
    category: 'Database / Cache',
    icon: <Database size={20} />,
    items: ['PostgreSQL', 'Prisma ORM', 'MongoDB', 'Redis', 'Drizzle ORM', 'Zustand']
  },
  {
    category: 'Infra / Reliability',
    icon: <Server size={20} />,
    items: ['Docker', 'RabbitMQ', 'JWT Auth', 'Nginx', 'Vercel', 'CI/CD']
  },
  {
    category: 'Tools / OS',
    icon: <Settings size={20} />,
    items: ['Git', 'GitHub Actions', 'VS Code', 'Linux/Ubuntu', 'Zsh', 'Vim']
  }
];

export default function SkillsV2() {
  return (
    <section id="skills" className="py-24 px-6 lg:px-24 bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row justify-between items-baseline gap-4">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-primary font-mono text-sm tracking-widest uppercase"
          >
            /skills
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            className="text-white text-xs font-mono uppercase tracking-widest italic"
          >
            Senior engineering stack — [TODO] mention proficiency
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SKILLS.map((skillGroup, idx) => (
             <motion.div 
               key={skillGroup.category}
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.1 }}
               viewport={{ once: true }}
               className="p-8 border border-white/5 bg-white/[0.02] border-sharp group hover:bg-white/[0.04] transition-all flex flex-col justify-between"
             >
               <div>
                 <div className="flex items-center gap-3 mb-8 text-primary group-hover:shadow-[0_0_10px_rgba(34,211,238,0.2)] transition-all">
                   <div className="p-3 bg-white/5 border-sharp group-hover:border-primary transition-all border border-transparent">
                     {skillGroup.icon}
                   </div>
                 </div>
                 <h3 className="text-xl font-bold text-white mb-6 font-mono tracking-tight">{skillGroup.category}</h3>
                 <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map(skill => (
                      <span 
                        key={skill} 
                        className="px-3 py-1 bg-white/5 border border-white/10 text-white/50 font-mono text-xs border-sharp group-hover:text-primary transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                 </div>
               </div>
               
               <div className="mt-12 flex items-center justify-between pointer-events-none opacity-20 group-hover:opacity-100 transition-opacity">
                 <div className="flex gap-1 h-3 items-end">
                   <div className="w-[1px] h-full bg-primary" />
                   <div className="w-[1px] h-[60%] bg-primary" />
                   <div className="w-[1px] h-[80%] bg-primary" />
                 </div>
                 <Zap size={14} className="text-primary" />
               </div>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
