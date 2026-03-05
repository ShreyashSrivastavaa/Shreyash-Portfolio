'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Server, Database, Shield, Cpu, Activity } from 'lucide-react';
import mermaid from 'mermaid';

const diagram = `
graph TD
    User([User]) --> |HTTPS| Frontend[Next.js App Router]
    
    subgraph "Infrastructure"
        Frontend --> |Public API| Backend[Node.js / Express]
        
        subgraph "Application Logic"
            Backend --> RoBERTa[S.A.F.E. - AI Engine]
            Backend --> Booking[Hotel API - Concurrency Engine]
        end
        
        subgraph "Storage & Resilience"
            Backend --> DB[(PostgreSQL / Prisma)]
            Backend --> Redis[(Redis Cache)]
        end
        
        Admin([Admin Dashboard]) -.-> |Auth| Backend
    end

    classDef primary fill:#3b82f6,stroke:#fff,stroke-width:2px,color:#fff;
    classDef secondary fill:#8b5cf6,stroke:#fff,stroke-width:2px,color:#fff;
    classDef dark fill:#1e293b,stroke:#3b82f6,stroke-width:1px,color:#fff;
    
    class Frontend,Backend primary;
    class DB,RoBERTa,Booking secondary;
    class Admin,Redis dark;
`;

const TechStack = [
    { name: 'Frontend', items: ['Next.js 16', 'Tailwind 4', 'Framer Motion', 'Lucide'] },
    { name: 'Backend', items: ['Node.js', 'Express', 'Prisma', 'PostgreSQL'] },
    { name: 'Security & AI', items: ['RoBERTa', 'Transformers', 'JWT', 'Helmet'] },
    { name: 'Infrastructure', items: ['Docker', 'Redis', 'Vercel', 'Postman'] },
];

export default function ArchitectureModal({ isOpen, onClose }) {
    const mermaidRef = useRef(null);

    useEffect(() => {
        if (isOpen && mermaidRef.current) {
            mermaid.initialize({
                startOnLoad: true,
                theme: 'dark',
                securityLevel: 'loose',
                fontFamily: 'Inter',
            });
            mermaid.contentLoaded();
        }
    }, [isOpen]);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-xl"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="w-full max-w-6xl h-full max-h-[90vh] glass dark:glass-dark rounded-[2.5rem] overflow-hidden flex flex-col relative border border-white/10"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-8 right-8 p-3 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors z-10"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
                            <div className="max-w-4xl mx-auto">
                                <header className="mb-16">
                                    <div className="flex items-center gap-3 text-accent font-bold mb-4">
                                        <Cpu size={24} />
                                        <span className="uppercase tracking-[0.3em] text-sm">System Architecture</span>
                                    </div>
                                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Under the <span className="gradient-text">Hood.</span></h1>
                                    <p className="text-xl text-foreground/60 leading-relaxed">
                                        A deep dive into the engineering patterns, security protocols, and architectural decisions behind my high-impact systems.
                                    </p>
                                </header>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                                    {TechStack.map((category) => (
                                        <div key={category.name} className="p-8 rounded-4xl bg-foreground/5 border border-white/5 group hover:border-accent/30 transition-colors">
                                            <h3 className="font-bold text-lg mb-4 text-foreground/80 group-hover:text-accent transition-colors">{category.name}</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {category.items.map((item) => (
                                                    <span key={item} className="px-3 py-1 rounded-lg bg-foreground/5 text-xs font-mono text-foreground/40">{item}</span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mb-16">
                                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                                        <Server size={20} className="text-primary" />
                                        Interactive Blueprint
                                    </h2>
                                    <div className="p-8 md:p-12 rounded-[2.5rem] bg-black/20 border border-white/5 flex justify-center items-center overflow-x-auto">
                                        <div ref={mermaidRef} className="mermaid min-w-[600px]">
                                            {diagram}
                                        </div>
                                    </div>
                                </div>

                                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                                    <div className="p-8 rounded-4xl bg-linear-to-br from-primary/10 to-transparent border border-primary/20">
                                        <div className="flex items-center gap-3 mb-4 text-primary">
                                            <Shield size={20} />
                                            <h3 className="font-bold">Security & Reliability</h3>
                                        </div>
                                        <ul className="text-sm text-foreground/60 space-y-3 leading-relaxed list-disc list-inside">
                                            <li><span className="text-foreground">KMS Integration</span>: AWS KMS/Azure Key Vault for tenant-specific encryption.</li>
                                            <li><span className="text-foreground">Tenant-Level Rate Limiting</span>: Redis counters to prevent resource hogging.</li>
                                            <li><span className="text-foreground">Micro-service Resilience</span>: Circuit breakers and error fallback engines.</li>
                                        </ul>
                                    </div>
                                    <div className="p-8 rounded-4xl bg-linear-to-br from-accent/10 to-transparent border border-accent/20">
                                        <div className="flex items-center gap-3 mb-4 text-accent">
                                            <Database size={20} />
                                            <h3 className="font-bold">Infrastructure & Data</h3>
                                        </div>
                                        <ul className="text-sm text-foreground/60 space-y-3 leading-relaxed list-disc list-inside">
                                            <li><span className="text-foreground">Isolation via Middleware</span>: Automatic Prisma filtering by tenant context.</li>
                                            <li><span className="text-foreground">Atomic Consistent Transactions</span>: Validating cross-entity tenant integrity.</li>
                                            <li><span className="text-foreground">Auditing (AuditLog)</span>: High-precision tenant-scoped logs for compliance.</li>
                                        </ul>
                                    </div>
                                </section>

                                <section className="p-10 rounded-[3rem] glass dark:glass-dark border border-white/10 relative overflow-hidden group">
                                    <div className="flex items-center gap-3 mb-8 text-primary font-bold uppercase tracking-[0.2em] text-sm">
                                        <Activity size={20} />
                                        <span>Production Readiness Checklist</span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                                        {[
                                            'Composite Indexes (Tenant + ID)',
                                            '90-Day KMS Key Rotation',
                                            'Logical Per-Tenant Backups',
                                            'Automated Tenant Onboarding',
                                            'Sensitive Data Encryption (PII)',
                                            'High-Latency Alerting (SLAs)'
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-start gap-3 group/item">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 group-hover/item:scale-150 transition-transform" />
                                                <span className="text-sm text-foreground/70 font-medium">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <Server size={80} />
                                    </div>
                                </section>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
