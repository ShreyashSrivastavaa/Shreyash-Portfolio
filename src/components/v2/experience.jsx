'use client';

import { motion } from 'framer-motion';

const EXPERIENCES = [
  {
    company: 'JBH Tech Innovation',
    role: 'SDE Intern',
    period: 'January 2026 – Present',
    description: [
      'Developing scalable backend systems and RESTful APIs using Node.js and NestJS.',
      'Designed and optimized relational database schemas in PostgreSQL for multi-tenant applications.',
      'Implemented JWT-based authentication and granular authorization (RBAC) across microservices.',
      'Collaborated in an agile team using Git-based workflows and participated in code reviews.',
      'Leveraged RabbitMQ for asynchronous processing of intensive background tasks.'
    ],
    stack: ['Node.js', 'NestJS', 'PostgreSQL', 'RabbitMQ', 'Docker']
  },
  {
    company: 'IEEE Student Branch',
    role: 'Student Representative / Chair',
    period: '2023 – 2024',
    description: [
      'Led a community of 100+ technical students, overseeing branch operations and strategy.',
      'Organized large-scale hackathons, technical symposiums, and hands-on workshops for peer learning.',
      'Facilitated industry-academia connections via guest lectures and corporate site visits.'
    ],
    stack: ['Leadership', 'Community Build', 'Event Strategy']
  }
];

export default function ExperienceV2() {
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
    viewport: { once: true }
  };

  return (
    <section id="experience" className="py-32 px-6 lg:px-24 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto space-y-24">
        <motion.h2 
          {...fadeUp}
          className="text-2xl font-bold text-[#888888] tracking-[0.15em] uppercase"
        >
          / Experience
        </motion.h2>

        <div className="space-y-20">
          {EXPERIENCES.map((exp, idx) => (
            <motion.div 
              key={exp.company}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: idx * 0.1 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start group"
            >
              {/* Period Column */}
              <div className="lg:col-span-3">
                <p className="text-[#888888] text-sm font-mono tracking-widest pt-2">
                  {exp.period}
                </p>
              </div>

              {/* Content Column */}
              <div className="lg:col-span-9 space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-white group-hover:text-[#ffb300] transition-colors">
                    {exp.company}
                  </h3>
                  <p className="text-xl text-[#ffb300] font-medium tracking-tight uppercase text-xs">
                    {exp.role}
                  </p>
                </div>

                <div className="space-y-4 max-w-3xl">
                  {exp.description.map((bullet, i) => (
                    <div key={i} className="flex gap-4 text-[#f5f5f5]/70 text-base leading-relaxed">
                      <span className="text-[#ffb300] mt-2.5 w-1 h-1 rounded-full bg-[#ffb300] shrink-0" />
                      <p>{bullet}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-4">
                  {exp.stack.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-[#1a1a1a] border border-[#222222] rounded-[6px] text-[#888888] text-[10px] uppercase font-bold tracking-widest group-hover:border-[#ffb300]/40 transition-all text-[#f5f5f5]/80">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
