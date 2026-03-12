'use client';

import { motion } from 'framer-motion';
import { Calendar, Award, MapPin, Users } from 'lucide-react';

const experience = [
    {
        role: 'Software Development Engineer Intern',
        company: 'JBH Tech Innovation',
        period: '2026 January - Present',
        location: 'Remote/Office',
        description: 'Developing scalable backend systems and RESTful APIs to support high-traffic applications.',
        achievements: [
            'Developed backend APIs using Node.js and Express.js',
            'Designed relational database schemas in PostgreSQL',
            'Implemented authentication and authorization mechanisms',
            'Collaborated in an agile team environment with Git-based workflows',
            'Followed backend architecture best practices and REST API design',
        ],
    },
    {
        role: 'Student Representative / Chair',
        company: 'IEEE Student Branch',
        period: '2023 - 2024',
        location: 'Campus',
        description: 'Led a community of 100+ students, organized technical workshops, and fostered a culture of innovation and peer-to-peer learning.',
        achievements: [
            'Organized technical events including hackathons and symposiums for a community of 100+ students',
            'Facilitated connections between academia and industry through guest lectures and strategic partnerships',
            'Led the IEEE Student Branch as elected Chair, fostering a culture of peer-to-peer learning and innovation',
            'Cultivated an environment of collaborative technical growth across the student body',
        ],
    },
];

const achievements = [
    {
        title: 'Problem Solving (Intermediate)',
        detail: 'Verified proficiency in data structures, algorithms, and logic through standardized assessments.',
        issuer: 'Hackerrank',
        icon: <Award className="text-primary" />,
        url: 'https://drive.google.com/file/d/1LrYR4sF6PJiIafcoeskMY79ftZOK5YX7/view?usp=drive_link',
    },
    {
        title: 'Winner - Code-O-Fiesta 2.0',
        detail: 'Built SentinelAuth (a multi-factor authentication library) in 24 hours, placing 1st among 40+ competing teams.',
        issuer: 'ITS Engineering College',
        icon: <Award className="text-accent" />,
        url: 'https://drive.google.com/file/d/1fQGQoUoXCSiZ_BMO8JoOt7dbHlEPKOme/view?usp=drive_link',
    },
    {
        title: 'Finalist - Innocodeathon (Hackathon)',
        detail: 'Selected as a finalist for a backend-focused solution to optimizing distributed log processing for high-traffic systems.',
        issuer: 'ITS Engineering College',
        icon: <Users className="text-primary" />,
        url: 'https://drive.google.com/file/d/1bnhiKb07VsA2wUGlWbNpGoyHbqYtzkGA/view?usp=sharing',
    },
];

export default function Experience() {
    return (
        <section id="experience" className="py-24 px-4 bg-foreground/5">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold mb-12">Experience & <span className="gradient-text">Leadership.</span></h2>

                        <div className="space-y-12">
                            {experience.map((item, index) => (
                                <motion.div
                                    key={item.role}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="relative pl-8 border-l-2 border-primary/20"
                                >
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background" />

                                    <div className="mb-4">
                                        <h3 className="text-2xl font-bold">{item.role}</h3>
                                        <div className="flex flex-wrap gap-4 mt-2 text-foreground/60 font-medium">
                                            <span className="flex items-center gap-1"><MapPin size={16} /> {item.company}</span>
                                            <span className="flex items-center gap-1"><Calendar size={16} /> {item.period}</span>
                                        </div>
                                    </div>

                                    <p className="text-foreground/70 mb-6 max-w-2xl">{item.description}</p>

                                    <ul className="space-y-3">
                                        {item.achievements.map((ach) => (
                                            <li key={ach} className="flex items-start gap-2 text-sm text-foreground/80">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                                {ach}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold mb-12">Achievements.</h2>
                        <div className="space-y-4">
                            {achievements.map((item, index) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => item.url && window.open(item.url, '_blank')}
                                    className={`p-4 rounded-xl glass dark:glass-dark border border-white/5 flex items-center gap-4 group transition-colors ${item.url ? 'cursor-pointer hover:border-accent/40' : ''}`}
                                >
                                    <div className="p-2 rounded-lg bg-foreground/5 group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm flex items-center gap-2">
                                            {item.title}
                                        </h4>
                                        <p className="text-[10px] uppercase font-bold text-foreground/40">{item.issuer}</p>
                                        <p className="text-[10px] text-foreground/60 mt-1 leading-tight">{item.detail}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

