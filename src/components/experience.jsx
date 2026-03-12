'use client';

import { motion } from 'framer-motion';
import { Calendar, Award, MapPin, ExternalLink } from 'lucide-react';

const experience = [
    {
        role: 'Software Development Engineer Intern',
        company: 'JBH Tech Innovation',
        period: 'Jan 2026 - Present',
        location: 'Remote/Office',
        description: 'Architecting scalable backend ecosystems and RESTful APIs, with a heavy focus on performance tuning and security hardening.',
        achievements: [
            'Developing high-performance backend APIs using Node.js and Express.js.',
            'Designing and optimizing relational database schemas for complex data relationships.',
            'Implementing robust authentication and authorization layers (JWT, Argon2).',
            'Applying backend architecture best practices including MVC and Clean Architecture.',
        ],
    },
    {
        role: 'Student Representative / Chair',
        company: 'IEEE Student Branch',
        period: '2023 - 2024',
        location: 'Campus',
        description: 'Led a technical community of 100+ students, focusing on engineering excellence and hands-on project building.',
        achievements: [
            'Organized 5+ technical workshops and hackathons, bridging the gap between theory and implementation for 200+ students.',
            'Fostered industry-academia partnerships, securing technical speakers for guest lectures.',
            'Managed a cross-functional team of 10 student leads to execute monthly symposiums.',
        ],
    },
];

const achievements = [
    {
        title: 'Certified Problem Solver',
        issuer: 'HackerRank',
        description: 'Verified proficiency in data structures, algorithms, and logic through rigorous competitive assessments.',
        url: 'https://drive.google.com/file/d/1LrYR4sF6PJiIafcoeskMY79ftZOK5YX7/view?usp=drive_link',
    },
    {
        title: 'Winner — Code-O-Fiesta 2.0',
        issuer: 'ITS Engineering College',
        description: 'Built "SentinelAuth" (an MFA library) in 24 hours, placing 1st among 40+ teams. Focus: Security & Cryptography.',
        url: 'https://drive.google.com/file/d/1fQGQoUoXCSiZ_BMO8JoOt7dbHlEPKOme/view?usp=drive_link',
    },
    {
        title: 'Finalist — Innocodeathon',
        issuer: 'ITS Engineering College',
        description: 'Selected as a finalist for "Optimizing Distributed Log Processing for High-Traffic Healthcare Systems".',
        url: 'https://drive.google.com/file/d/1bnhiKb07VsA2wUGlWbNpGoyHbqYtzkGA/view?usp=sharing',
    },
];

export default function Experience() {
    return (
        <section id="experience" className="py-32 px-4 bg-bg-surface border-y border-border">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <span className="font-mono text-accent text-lg font-bold">05 /</span>
                            <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-text-muted">Experience</h2>
                        </div>
                        <h3 className="text-[clamp(1.75rem,4vw,2.5rem)] font-black leading-tight text-text-primary">
                            Engineering <br />
                            <span className="text-accent underline decoration-2 underline-offset-4">Career Path.</span>
                        </h3>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-16">
                    {/* Work Experience */}
                    <div className="lg:col-span-7 space-y-12">
                        {experience.map((item, index) => (
                            <motion.div
                                key={item.role}
                                initial={{ opacity: 0, x: -24 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="relative pl-12 border-l border-border"
                            >
                                <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] bg-accent rounded-[1px]" />

                                <div className="mb-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h4 className="text-xl font-bold text-text-primary uppercase tracking-tight">{item.role}</h4>
                                    </div>
                                    <div className="flex flex-wrap gap-4 text-xs font-mono text-text-muted">
                                        <span className="flex items-center gap-1.5"><MapPin size={12} className="text-accent" /> {item.company}</span>
                                        <span className="flex items-center gap-1.5"><Calendar size={12} className="text-accent" /> {item.period}</span>
                                    </div>
                                </div>

                                <p className="text-text-muted font-medium mb-6 leading-relaxed">{item.description}</p>

                                <ul className="space-y-3">
                                    {item.achievements.map((ach) => (
                                        <li key={ach} className="flex items-start gap-3 text-sm text-text-muted">
                                            <span className="mt-1.5 w-1.5 h-1.5 bg-accent rounded-[1px] shrink-0" />
                                            <span className="font-medium">{ach}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>

                    {/* Achievements */}
                    <div className="lg:col-span-5">
                        <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-8">Major Achievements</h4>
                        <div className="space-y-4">
                            {achievements.map((item, index) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => item.url && window.open(item.url, '_blank')}
                                    className="p-6 bg-bg-primary border border-border rounded-[2px] group cursor-pointer hover:border-accent transition-all relative overflow-hidden"
                                >
                                    <div className="relative z-10 flex justify-between items-start mb-4">
                                        <div>
                                            <h5 className="font-bold text-text-primary leading-tight mb-1">{item.title}</h5>
                                            <p className="font-mono text-[9px] uppercase tracking-widest text-accent">{item.issuer}</p>
                                        </div>
                                        <ExternalLink size={14} className="text-text-muted group-hover:text-accent transition-colors" />
                                    </div>
                                    <p className="relative z-10 text-xs text-text-muted leading-relaxed font-medium">
                                        {item.description}
                                    </p>
                                    <div className="absolute bottom-0 right-0 w-16 h-16 bg-accent opacity-[0.02] transform rotate-45 translate-x-8 translate-y-8" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

