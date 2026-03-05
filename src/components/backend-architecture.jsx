'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Database, Key, Activity, Server, Layout, Terminal, Code2 } from 'lucide-react';

const principles = [
    { title: 'REST API Design', icon: <Code2 size={24} className="text-primary" /> },
    { title: 'MVC Architecture', icon: <Layout size={24} className="text-accent" /> },
    { title: 'JWT Authentication', icon: <Key size={24} className="text-primary" /> },
    { title: 'Secure API Design', icon: <ShieldCheck size={24} className="text-accent" /> },
    { title: 'Database Schema Design', icon: <Database size={24} className="text-primary" /> },
    { title: 'Error Handling & Logging', icon: <Terminal size={24} className="text-accent" /> },
    { title: 'API Rate Limiting', icon: <Activity size={24} className="text-primary" /> },
    { title: 'Clean Backend Architecture', icon: <Server size={24} className="text-accent" /> },
];

export default function BackendArchitecture() {
    return (
        <section id="backend-principles" className="py-24 px-4 bg-foreground/5 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Backend Engineering <span className="gradient-text">Principles.</span></h2>
                    <p className="text-foreground/60 max-w-xl mx-auto">
                        I focus on building maintainable backend systems using proven engineering patterns and scalable API design.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {principles.map((p, index) => (
                        <motion.div
                            key={p.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="p-6 rounded-2xl glass dark:glass-dark group hover:border-primary/50 transition-all duration-300 flex flex-col items-center text-center gap-4"
                        >
                            <div className="p-3 rounded-xl bg-white/5 group-hover:bg-primary/10 transition-colors">
                                {p.icon}
                            </div>
                            <h3 className="text-sm font-bold uppercase tracking-wider">{p.title}</h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
