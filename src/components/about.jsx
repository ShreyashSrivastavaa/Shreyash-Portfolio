'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
    return (
        <section id="about" className="py-32 px-4 max-w-7xl mx-auto bg-bg-primary overflow-hidden">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                {/* Left Column: Content */}
                <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-accent text-lg font-bold">01 /</span>
                        <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-text-muted">About</h2>
                    </div>

                    <h3 className="text-[clamp(1.75rem,4vw,2.5rem)] font-black leading-tight mb-8 text-text-primary">
                        Engineering for the <br />
                        <span className="text-accent underline decoration-2 underline-offset-4">Real World.</span>
                    </h3>

                    <div className="space-y-6 text-text-muted leading-relaxed font-medium">
                        <p className="text-lg">
                            I don’t just write code; <span className="text-text-primary">I engineer solutions.</span> As a final-year CS student and a Backend Engineer at JBH Tech Innovation, I spend my days (and nights) optimizing database queries, hardening API security, and ensuring systems don&apos;t just work—they scale.
                        </p>
                        <p>
                            My approach is simple: <span className="font-mono text-accent text-sm">Schema as a contract</span>, <span className="font-mono text-accent text-sm">Design for failure</span>, and <span className="font-mono text-accent text-sm">Security is never an afterthought</span>. Whether it&apos;s architecting a reservation system for high-concurrency or building cryptographic utilities, I focus on the engineering rigor that modern platforms demand.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 mt-12 border-l-2 border-border pl-8">
                        <div className="flex flex-col">
                            <span className="text-xs font-mono uppercase tracking-widest text-text-muted mb-2">Focus</span>
                            <span className="text-text-primary font-bold">Backend Architecture</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-mono uppercase tracking-widest text-text-muted mb-2">Status</span>
                            <span className="text-accent font-bold">Active SDE Intern</span>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Image */}
                <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                >
                    <div className="aspect-[4/5] max-w-[420px] mx-auto rounded-[2px] border border-border relative group shadow-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                        <Image
                            src="/profile.png"
                            alt="Shreyash Srivastava"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
