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
        title: 'Frontend',
        icon: <Layout className="text-accent" />,
        skills: ['React', 'Next.js', 'Tailwind', 'HTML/CSS'],
    },
    {
        title: 'Backend',
        icon: <Terminal className="text-primary" />,
        skills: ['Node.js', 'Express', 'JWT', 'REST APIs'],
    },
    {
        title: 'Databases',
        icon: <Database className="text-accent" />,
        skills: ['MongoDB', 'MySQL', 'Prisma', 'Supabase'],
    },
    {
        title: 'Core CS',
        icon: <Cpu className="text-primary" />,
        skills: ['DSA', 'OOP', 'DBMS', 'OS', 'CN'],
    },
    {
        title: 'AI/ML & Tools',
        icon: <Brain className="text-accent" />,
        skills: ['NLP Concepts', 'Scam Detection', 'Git/GitHub', 'Postman'],
    },
];

export default function Skills() {
    return (
        <section id="skills" className="py-24 px-4 bg-foreground/5 overflow-hidden">
            <div className="max-w-7xl mx-auto">
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
