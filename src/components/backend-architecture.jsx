'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Database, Lock, ChevronDown } from 'lucide-react';

const philosophies = [
    {
        id: 'failure',
        title: 'Design for Failure',
        icon: <ShieldAlert size={28} className="text-accent" />,
        description: "Assume every external call, database connection, or microservice will fail. I build with retries, circuit breakers, and graceful degradation to maintain system availability.",
    },
    {
        id: 'schema',
        title: 'Schema as Contract',
        icon: <Database size={28} className="text-accent" />,
        description: "Data integrity is non-negotiable. I enforce strict schemas at the database level and validation at the API edge to ensure 'Garbage In, Garbage Out' never happens.",
    },
    {
        id: 'security',
        title: 'Security is Not Optional',
        icon: <Lock size={28} className="text-accent" />,
        description: "From JWT hardening and argon2 hashing to rate-limiting and SQL injection prevention—security is baked into the foundation, not bolted on at the end.",
    },
];

export default function BackendArchitecture() {
    const [expanded, setExpanded] = useState(null);

    return (
        <section id="architecture" className="py-32 px-4 max-w-7xl mx-auto bg-bg-primary">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                <div>
                    <div className="flex items-center gap-4 mb-4">
                        <span className="font-mono text-accent text-lg font-bold">03 /</span>
                        <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-text-muted">Architecture</h2>
                    </div>
                    <h3 className="text-[clamp(1.75rem,4vw,2.5rem)] font-black leading-tight text-text-primary">
                        Philosophy of <br />
                        <span className="text-accent underline decoration-2 underline-offset-4">Backend Engineering.</span>
                    </h3>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {philosophies.map((p) => {
                    const isExpanded = expanded === p.id;
                    return (
                        <motion.div
                            key={p.id}
                            layout
                            className={`p-8 bg-bg-surface border transition-all cursor-pointer rounded-[2px] ${isExpanded ? 'border-accent shadow-[0_0_20px_rgba(0,255,136,0.1)]' : 'border-border hover:border-text-muted'
                                }`}
                            onClick={() => setExpanded(isExpanded ? null : p.id)}
                        >
                            <motion.div layout className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-bg-primary border border-border rounded-[2px]">
                                    {p.icon}
                                </div>
                                <motion.div
                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                    className="text-text-muted"
                                >
                                    <ChevronDown size={20} />
                                </motion.div>
                            </motion.div>

                            <motion.h4 layout className="text-xl font-bold text-text-primary mb-2 font-mono uppercase tracking-tight">
                                {p.title}
                            </motion.h4>

                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.p
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="text-text-muted leading-relaxed font-medium mt-4 pt-4 border-t border-border"
                                    >
                                        {p.description}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
