'use client';

import { motion } from 'framer-motion';
import { Calendar, Award, MapPin, Users } from 'lucide-react';

const experience = [
    {
        role: 'Student Representative / Chair',
        company: 'IEEE Student Branch',
        period: '2023 - Present',
        location: 'Campus',
        description: 'Leading a community of 100+ students, organizing technical workshops, and fostering a culture of innovation and peer-to-peer learning.',
        achievements: [
            'Orchestrated 3+ large-scale hackathons and technical symposiums.',
            'Bridged the gap between academia and industry by inviting guest speakers from top tech firms.',
        ],
    },
];

const achievements = [
    {
        title: 'C++ Programming Certification',
        issuer: 'Industry Recognized',
        icon: <Award className="text-primary" />,
    },
    {
        title: 'DBMS Specialist (Part 1 & 2)',
        issuer: 'Academic Excellence',
        icon: <Award className="text-accent" />,
    },
    {
        title: 'Finalist - Smart India Hackathon (SIH)',
        issuer: 'Government of India',
        icon: <Users className="text-primary" />,
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
                                    className="p-4 rounded-xl glass dark:glass-dark border border-white/5 flex items-center gap-4 group hover:border-accent/40 transition-colors"
                                >
                                    <div className="p-2 rounded-lg bg-foreground/5 group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm">{item.title}</h4>
                                        <p className="text-[10px] uppercase font-bold text-foreground/40">{item.issuer}</p>
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
