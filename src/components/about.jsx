'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
    return (
        <section id="about" className="py-24 px-4 max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Connecting Code to <span className="gradient-text">Real-World Impact.</span>
                    </h2>

                    <div className="space-y-4 text-foreground/80 leading-relaxed">
                        <p>
                            I am a backend-focused software developer currently working as a Software Development Engineer Intern at JBH Tech Innovation.
                        </p>
                        <p>
                            My primary stack includes Node.js, Express.js, and PostgreSQL where I design REST APIs, implement authentication systems, and build scalable backend architectures.
                        </p>
                        <p>
                            I enjoy solving real-world engineering problems, optimizing backend performance, and writing clean, maintainable code.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mt-10">
                        <div>
                            <h4 className="text-2xl font-bold text-primary">4+</h4>
                            <p className="text-sm text-foreground/60 font-medium uppercase tracking-wider">Languages</p>
                        </div>
                        <div>
                            <h4 className="text-2xl font-bold text-accent">5+</h4>
                            <p className="text-sm text-foreground/60 font-medium uppercase tracking-wider">Core CSE Domains</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative block"
                >
                    <div className="aspect-4/5 max-w-[450px] mx-auto rounded-[3rem] border border-white/10 glass dark:glass-dark overflow-hidden relative group shadow-2xl">
                        <Image
                            src="/profile-scrolled.png"
                            alt="Shreyash Srivastava - Casual"
                            width={450}
                            height={562}
                            className="w-full h-full object-cover grayscale brightness-110 contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
