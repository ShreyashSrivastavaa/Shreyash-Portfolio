'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, ShieldCheck, BarChart3, ShieldAlert, Cpu } from 'lucide-react';
import Image from 'next/image';
import projectsData from '../../data/projects.json';

const IconMap = {
    ShieldCheck,
    ShieldAlert,
    Cpu,
    BarChart3
};

const projects = projectsData.map(project => ({
    ...project,
    icon: IconMap[project.icon] ? 
        React.createElement(IconMap[project.icon], { className: project.iconColor }) : 
        React.createElement(Cpu, { className: project.iconColor })
}));



export default function Projects() {
    return (
        <section id="projects" className="py-24 px-4 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Engineering <span className="gradient-text">Case Studies.</span></h2>
                    <p className="text-foreground/60 max-w-xl text-lg">Detailed breakdowns of projects built for impact, scalability, and security.</p>
                </div>
                <motion.a
                    whileHover={{ x: 10, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://github.com/ShreyashSrivastavaa"
                    className="flex items-center gap-2 text-primary font-semibold group"
                >
                    View More on GitHub <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.a>
            </div>

            <div className="flex flex-col gap-32">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
                    >
                        {/* Visuals / Media */}
                        <div className="flex-1 w-full relative">
                            <div className="aspect-video rounded-2xl bg-foreground/5 border border-white/10 overflow-hidden relative group">
                                {/* Image Renderer */}
                                {project.image && (
                                    <div className="absolute inset-0 z-0">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                        />
                                    </div>
                                )}

                                {/* Fallback Icon (Z-indexed above image but lower opacity) */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-10 transition-opacity duration-700 z-10 pointer-events-none">
                                    {project.id === 'safe' ? <ShieldAlert size={120} /> : <Cpu size={120} />}
                                </div>

                                <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent z-20" />

                                {/* Metrics Overlay */}
                                <div className="absolute bottom-6 left-6 right-6 flex justify-between gap-4 z-30">
                                    {project.metrics.map((m) => (
                                        <div key={m.label} className="p-3 rounded-xl glass dark:glass-dark backdrop-blur-xl flex-1 text-center border border-white/10">
                                            <div className="text-xl font-bold text-primary">{m.value}</div>
                                            <div className="text-[10px] uppercase font-bold text-foreground/40">{m.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-foreground/5 border border-white/10">
                                    {project.icon}
                                </div>
                                <span className="text-sm font-bold uppercase tracking-[0.2em] text-foreground/40">Case Study</span>
                            </div>

                            <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                            <p className="text-xl text-foreground/70 mb-8 italic">&quot;{project.tagline}&quot;</p>

                            <div className="space-y-6 mb-10">
                                <div>
                                    <h4 className="text-sm font-bold text-primary uppercase mb-2">The Problem</h4>
                                    <p className="text-foreground/80 leading-relaxed">{project.problem}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-accent uppercase mb-2">Our Solution</h4>
                                    <p className="text-foreground/80 leading-relaxed">{project.solution}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-10">
                                {project.tech.map((t) => (
                                    <span key={t} className="px-3 py-1 rounded-md text-xs font-mono bg-foreground/5 border border-foreground/10">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-6">
                                <motion.a
                                    whileHover={{ scale: 1.05, color: 'var(--primary)' }}
                                    whileTap={{ scale: 0.95 }}
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 px-6 py-3 rounded-xl bg-foreground/5 border border-white/10 font-bold transition-all hover:bg-foreground/10"
                                >
                                    <Github size={20} /> View Source Code
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
