'use client';

import { motion } from 'framer-motion';
import { Code2, Database, Layout, Terminal, Brain, Cpu } from 'lucide-react';

const skillCategories = [
    {
        title: 'Languages',
        icon: <Code2 className="text-primary" />,
        skills: ['C++', 'JavaScript', 'TypeScript', 'Python', 'SQL'],
    },
    {
        title: 'Backend Engineering',
        icon: <Terminal className="text-primary" />,
        skills: ['Node.js', 'Express.js', 'REST APIs', 'WebSockets', 'JWT/Auth'],
    },
    {
        title: 'Databases & Caching',
        icon: <Database className="text-accent" />,
        skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma ORM'],
    },
    {
        title: 'DevOps & Cloud',
        icon: <Brain className="text-primary" />,
        skills: ['Docker', 'AWS Basics', 'Vercel', 'CI/CD Pipelines'],
    },
    {
        title: 'Architecture & Quality',
        icon: <Cpu className="text-accent" />,
        skills: ['Microservices', 'System Design', 'Unit Testing', 'Scalability'],
    },
    {
        title: 'Tools & Ecosystem',
        icon: <Layout className="text-primary" />,
        skills: ['Git/GitHub', 'Postman', 'Linux/Bash', 'Agile/Scrum'],
    },
];

const coreSkills = [
    { name: 'JAVASCRIPT', level: 'EXPERT', percentage: 80 },
    { name: 'NODE.JS', level: 'EXPERT', percentage: 85 },
    { name: 'EXPRESS.JS', level: 'PROFICIENT', percentage: 85 },
    { name: 'MONGODB', level: 'PROFICIENT', percentage: 80 },
    { name: 'POSTGRESQL', level: 'PROFICIENT', percentage: 80 },
    { name: 'REST API DESIGN', level: 'PROFICIENT', percentage: 85 },
];

export default function Skills() {
    return (
        <section id="skills" className="py-24 px-4 bg-background overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Core Stack Section (Visually Impactful & Professional) */}
                <div className="mb-32">
                    <div className="text-primary font-bold text-xs tracking-widest uppercase mb-12">CORE STACK.</div>

                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Left Column: Skill Bars */}
                        <div className="space-y-12">
                            {coreSkills.map((skill, index) => (
                                <motion.div
                                    key={skill.name}
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.6 }}
                                    className="group"
                                >
                                    <div className="flex items-baseline justify-between mb-4">
                                        <h3 className="text-2xl md:text-3xl font-black italic tracking-tighter text-white group-hover:text-primary transition-colors duration-500">
                                            {skill.name}
                                        </h3>
                                        <span className="text-[10px] md:text-xs font-bold text-foreground/40 uppercase tracking-widest">
                                            {skill.level}
                                        </span>
                                    </div>

                                    <div className="h-[4px] w-full bg-foreground/5 relative overflow-hidden rounded-full">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.percentage}%` }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
                                            className="absolute inset-y-0 left-0 bg-primary shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Right Column: Professional Details (Recruiter focused) */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="p-8 md:p-12 rounded-[2rem] glass dark:glass-dark border border-white/10 relative overflow-hidden group shadow-2xl"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Cpu size={120} />
                            </div>

                            <div className="space-y-8 relative z-10">
                                <div className="grid grid-cols-[100px_1fr] gap-4 items-baseline">
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-primary">Profile:</span>
                                    <span className="text-sm md:text-base font-medium text-foreground/80">Backend Engineer & SDE Intern</span>
                                </div>
                                <div className="grid grid-cols-[100px_1fr] gap-4 items-baseline">
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-primary">Domain:</span>
                                    <span className="text-sm md:text-base font-medium text-foreground/80">Scalable Systems, REST APIs, Distributed Logic</span>
                                </div>
                                <div className="grid grid-cols-[100px_1fr] gap-4 items-baseline">
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-primary">Education:</span>
                                    <span className="text-sm md:text-base font-medium text-foreground/80">Final Year — Bachelor of Computer Science</span>
                                </div>
                                <div className="grid grid-cols-[100px_1fr] gap-4 items-baseline">
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-primary">Location:</span>
                                    <span className="text-sm md:text-base font-medium text-foreground/80">Active SDE Intern @ JBH Tech Innovation</span>
                                </div>
                                <div className="grid grid-cols-[100px_1fr] gap-4 items-baseline border-t border-white/5 pt-8">
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-accent">Tech Focus:</span>
                                    <span className="text-sm md:text-base font-medium text-foreground/80 italic">&quot;Building systems that hold up under pressure and stay fast at scale.&quot;</span>
                                </div>
                            </div>

                            <div className="mt-12 flex items-center gap-4">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-foreground/10 flex items-center justify-center">
                                            <div className="w-full h-full rounded-full bg-primary/20" />
                                        </div>
                                    ))}
                                </div>
                                <span className="text-xs font-bold text-foreground/40 uppercase tracking-widest">3+ Live Production Projects</span>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical <span className="gradient-text">Excellence.</span></h2>
                    <p className="text-foreground/60 max-w-xl mx-auto">A modern stack designed for performance, security, and scalability.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 rounded-2xl glass dark:glass-dark group hover:border-primary/50 transition-all duration-300"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 rounded-xl bg-white/5 group-hover:bg-primary/10 transition-colors">
                                    {category.icon}
                                </div>
                                <h3 className="text-xl font-bold">{category.title}</h3>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1 rounded-full text-xs font-semibold bg-foreground/5 group-hover:bg-primary/5 border border-foreground/10 group-hover:border-primary/20 transition-colors"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
