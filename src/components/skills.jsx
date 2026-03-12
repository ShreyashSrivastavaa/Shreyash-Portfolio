'use client';

import { motion } from 'framer-motion';
import { Code2, Database, Layout, Terminal, Brain, Cpu } from 'lucide-react';

const skillCategories = [
    {
        title: 'Languages',
        icon: <Code2 className="text-primary" />,
        skills: ['C++', 'JavaScript', 'Python', 'SQL'],
    },
    {
        title: 'Backend',
        icon: <Terminal className="text-primary" />,
        skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication'],
    },
    {
        title: 'Databases',
        icon: <Database className="text-accent" />,
        skills: ['PostgreSQL', 'MongoDB'],
    },
    {
        title: 'Frontend',
        icon: <Layout className="text-primary" />,
        skills: ['React', 'Next.js', 'TailwindCSS', 'HTML/CSS'],
    },
    {
        title: 'Core CS',
        icon: <Cpu className="text-accent" />,
        skills: ['Data Structures & Algorithms', 'Operating Systems', 'DBMS', 'Computer Networks'],
    },
    {
        title: 'Tools',
        icon: <Brain className="text-primary" />,
        skills: ['Git', 'GitHub', 'Postman'],
    },
];

const coreSkills = [
    { name: 'JAVASCRIPT', level: 'EXPERT', percentage: 95 },
    { name: 'NODE.JS', level: 'EXPERT', percentage: 90 },
    { name: 'EXPRESS.JS', level: 'PROFICIENT', percentage: 85 },
    { name: 'MONGODB', level: 'PROFICIENT', percentage: 80 },
    { name: 'REST API DESIGN', level: 'PROFICIENT', percentage: 85 },
];

export default function Skills() {
    return (
        <section id="skills" className="py-24 px-4 bg-background overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Core Stack Section (Visual Impact) */}
                <div className="mb-32">
                    <div className="text-primary font-bold text-xs tracking-widest uppercase mb-12">CORE STACK.</div>

                    <div className="space-y-16">
                        {coreSkills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className="group"
                            >
                                <div className="flex items-baseline gap-4 mb-4">
                                    <h3 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white group-hover:text-primary transition-colors duration-500">
                                        {skill.name}
                                    </h3>
                                    <span className="text-[10px] md:text-xs font-bold text-foreground/40 uppercase tracking-widest">
                                        {skill.level}
                                    </span>
                                </div>

                                <div className="h-[6px] w-full bg-foreground/5 relative overflow-hidden rounded-full">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.percentage}%` }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
                                        className="absolute inset-y-0 left-0 bg-primary shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                                    />
                                </div>
                            </motion.div>
                        ))}
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
