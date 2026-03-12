'use client';

import { motion } from 'framer-motion';

const coreStack = [
    { name: 'Node.js', tier: 'EXPERT' },
    { name: 'Express.js', tier: 'EXPERT' },
    { name: 'MongoDB', tier: 'EXPERT' },
    { name: 'SQL / PostgreSQL', tier: 'PROFICIENT' },
    { name: 'React / Next.js', tier: 'PROFICIENT' },
    { name: 'C++ / DSA', tier: 'EXPERT' },
];

const workingKnowledge = [
    'Python', 'JavaScript (ES6+)', 'JWT / OAuth', 'REST APIs', 'Git / GitHub', 'Postman', 'TailwindCSS', 'System Design'
];

export default function Skills() {
    return (
        <section id="skills" className="py-32 px-4 bg-bg-surface overflow-hidden border-y border-border">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <span className="font-mono text-accent text-lg font-bold">02 /</span>
                            <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-text-muted">Skills</h2>
                        </div>
                        <h3 className="text-[clamp(1.75rem,4vw,2.5rem)] font-black leading-tight text-text-primary">
                            Technical <span className="text-accent underline decoration-2 underline-offset-4">Arsenal.</span>
                        </h3>
                    </div>
                    <p className="text-text-muted max-w-md font-medium">
                        Optimized for performance, security, and scalability. Built on a foundation of clean code and engineering rigor.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Core Stack */}
                    <div>
                        <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-8">Core Stack</h4>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {coreStack.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="p-4 bg-bg-primary border border-border rounded-[2px] flex items-center justify-between group hover:border-accent transition-all"
                                >
                                    <span className="font-bold text-text-primary">{item.name}</span>
                                    <span className={`font-mono text-[10px] px-2 py-1 border ${item.tier === 'EXPERT'
                                            ? 'border-accent text-accent'
                                            : 'border-border text-text-muted'
                                        }`}>
                                        {item.tier}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                        <p className="mt-6 font-mono text-[10px] text-text-muted italic">
                            * Proficiency levels are self-assessed based on real-world implementation depth.
                        </p>
                    </div>

                    {/* Working Knowledge */}
                    <div>
                        <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-8">Working Knowledge</h4>
                        <div className="flex flex-wrap gap-3">
                            {workingKnowledge.map((skill, index) => (
                                <motion.span
                                    key={skill}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.03 }}
                                    className="px-4 py-2 font-mono text-xs border border-border text-text-muted rounded-[2px] hover:border-text-muted hover:text-text-primary transition-all cursor-default"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
