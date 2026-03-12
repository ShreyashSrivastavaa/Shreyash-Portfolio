'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, ShieldCheck, ShieldAlert, Cpu, Lock } from 'lucide-react';
import Image from 'next/image';

const projects = [
    {
        id: 'safe',
        title: 'S.A.F.E. – Scam Analysis & Fraud Elimination',
        tagline: 'ML-powered scam detection platform for real-time threat analysis.',
        icon: <ShieldCheck className="text-accent" />,
        description: 'A specialized analysis pipeline for real-time fraud detection. Engineered to bridge the gap between complex ML inference and rapid API responses.',
        problem: 'Rising digital fraud requires analysis across multiple vectors (URL, Metadata, Heuristics) with sub-second latency.',
        solution: 'Built a specialized analysis engine using RoBERTa and intelligence-based scoring to classify threats across 5 distinct engines.',
        metrics: [
            { label: 'Detection Accuracy', value: '94%+' },
            { label: 'Latency', value: '<250ms' },
            { label: 'Analysis Vectors', value: '5-Engine' },
        ],
        tech: ['Python', 'FastAPI', 'Next.js', 'Supabase'],
        github: 'https://github.com/ShreyashSrivastavaa/S.A.F.E.git',
        demo: null,
        image: '/projects/safe.webp',
    },
    {
        id: 'hotel-api',
        title: 'Hotel Booking Backend API',
        tagline: 'High-concurrency reservation engine built for scale.',
        icon: <Lock className="text-accent" />,
        description: 'A production-grade REST API designed to handle complex room availability and reservation workflows without collisions.',
        problem: 'Handling simultaneous booking requests for the same room without causing double-bookings or database deadlocks.',
        solution: 'Implemented optimistic concurrency control and atomic MongoDB operations to ensure zero-collision booking logic.',
        metrics: [
            { label: 'Booking Latency', value: '800ms' },
            { label: 'Test Coverage', value: '99.9%' },
            { label: 'Logic Safety', value: 'Atomic' },
        ],
        tech: ['Node.js', 'Express.js', 'MongoDB', 'JWT'],
        github: 'https://github.com/ShreyashSrivastavaa/Hotel-Booking-System_Backend',
        demo: null,
        image: '/projects/hotel-booking.png',
    },
    {
        id: 'cryptgen',
        title: 'CryptGen — Cryptographic Password Utility',
        tagline: 'Secure, client-side entropy generation.',
        icon: <ShieldAlert className="text-accent" />,
        description: 'A purely client-side cryptographic utility prioritizing user privacy and maximum entropy generation.',
        badge: 'Zero Server Calls',
        problem: 'Server-side password generation exposes sensitive data to network logs and potentially compromised servers.',
        solution: 'Purely client-side generation using Web Crypto API to ensure passwords never leave the user\'s local environment.',
        metrics: [
            { label: 'Generation Time', value: '<10ms' },
            { label: 'Network Calls', value: '0' },
            { label: 'Policy Check', value: 'Real-time' },
        ],
        tech: ['JavaScript (ES6+)', 'Web Crypto API', 'TailwindCSS'],
        github: 'https://github.com/ShreyashSrivastavaa/Random-Password-Generator.git',
        demo: 'https://shreyashsrivastavaa.github.io/Random-Password-Generator/',
        image: '/projects/password.webp',
    },
];

export default function Projects() {
    return (
        <section id="projects" className="py-32 px-4 max-w-7xl mx-auto bg-bg-primary">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
                <div>
                    <div className="flex items-center gap-4 mb-4">
                        <span className="font-mono text-accent text-lg font-bold">04 /</span>
                        <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-text-muted">Projects</h2>
                    </div>
                    <h3 className="text-[clamp(1.75rem,4vw,2.5rem)] font-black leading-tight text-text-primary">
                        Selected <br />
                        <span className="text-accent underline decoration-2 underline-offset-4">Engineering Works.</span>
                    </h3>
                </div>
                <motion.a
                    whileHover={{ x: 8 }}
                    href="https://github.com/ShreyashSrivastavaa"
                    target="_blank"
                    className="font-mono text-xs uppercase tracking-widest text-accent flex items-center gap-2 hover:glow-green transition-all"
                >
                    View Stack on GitHub <ArrowRight size={14} />
                </motion.a>
            </div>

            <div className="space-y-40">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className={`grid lg:grid-cols-12 gap-12 items-start`}
                    >
                        {/* Visuals - Left or Right based on index */}
                        <div className={`lg:col-span-7 ${index % 2 !== 0 ? 'lg:order-last' : ''}`}>
                            <div className="relative group grayscale hover:grayscale-0 transition-all duration-700">
                                <div className="aspect-video bg-bg-surface border border-border rounded-[2px] overflow-hidden relative shadow-2xl">
                                    {project.badge && (
                                        <div className="absolute top-4 right-4 z-20 font-mono text-[10px] uppercase tracking-widest bg-accent text-bg-primary px-3 py-1 font-bold rounded-[2px]">
                                            {project.badge}
                                        </div>
                                    )}
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover opacity-40 group-hover:opacity-100 transition-all duration-700 scale-[1.02] group-hover:scale-100"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-bg-primary via-transparent to-transparent opacity-60" />
                                </div>

                                {/* Metrics Row */}
                                <div className="grid grid-cols-3 gap-px bg-border border border-border mt-4">
                                    {project.metrics.map((m) => (
                                        <div key={m.label} className="bg-bg-surface p-4 text-center">
                                            <div className="text-xl font-bold text-accent font-mono">{m.value}</div>
                                            <div className="text-[8px] uppercase tracking-[0.2em] text-text-muted mt-1 font-mono font-bold">{m.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="lg:col-span-5 flex flex-col justify-center">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 border border-border bg-bg-surface rounded-[2px] text-accent">
                                    {project.icon}
                                </div>
                                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">0{index + 1} / Project Details</span>
                            </div>

                            <h4 className="text-2xl font-black text-text-primary mb-2 uppercase tracking-tight">
                                {project.title}
                            </h4>
                            <p className="font-mono text-xs text-text-muted mb-8 tracking-wide">
                                {project.tagline}
                            </p>

                            <div className="space-y-6 mb-10 border-l border-border pl-6">
                                <div>
                                    <span className="font-mono text-[9px] uppercase tracking-widest text-accent block mb-2">Problem</span>
                                    <p className="text-sm text-text-muted leading-relaxed font-medium">{project.problem}</p>
                                </div>
                                <div>
                                    <span className="font-mono text-[9px] uppercase tracking-widest text-accent block mb-2">Solution</span>
                                    <p className="text-sm text-text-muted leading-relaxed font-medium">{project.solution}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-10">
                                {project.tech.map((t) => (
                                    <span key={t} className="px-3 py-1 bg-bg-surface border border-border font-mono text-[10px] text-text-primary rounded-[2px]">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                {project.demo ? (
                                    <motion.a
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        href={project.demo}
                                        target="_blank"
                                        className="w-full sm:flex-1 py-3 border border-accent text-accent font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-center hover:bg-accent/5 transition-all flex items-center justify-center gap-2 rounded-[2px]"
                                    >
                                        Live Demo <ExternalLink size={12} />
                                    </motion.a>
                                ) : (
                                    <div
                                        className="w-full sm:flex-1 py-3 border border-border text-text-muted font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-center opacity-50 cursor-not-allowed group relative rounded-[2px]"
                                        title="Private Deployment"
                                    >
                                        Private Demo
                                    </div>
                                )}

                                <motion.a
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    href={project.github}
                                    target="_blank"
                                    className="w-full sm:flex-1 py-3 bg-bg-surface border border-border text-text-primary font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-center hover:border-text-muted transition-all flex items-center justify-center gap-2 rounded-[2px]"
                                >
                                    Source Code <Github size={12} />
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
