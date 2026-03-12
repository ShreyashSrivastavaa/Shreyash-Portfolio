'use client';

import { motion, useInView } from 'framer-motion';
import { ChevronRight, Download, Github, Linkedin } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';

const CountUp = ({ end, duration = 1200, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const endNum = parseInt(end);
            const increment = endNum / (duration / 16);
            const timer = setInterval(() => {
                start += increment;
                if (start >= endNum) {
                    setCount(endNum);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);
            return () => clearInterval(timer);
        }
    }, [isInView, end, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
};

export default function Hero() {
    return (
        <section id="hero" className="min-h-[90vh] flex flex-col items-center justify-center px-4 pt-32 lg:pt-0 relative overflow-hidden bg-bg-primary">
            <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center text-left relative z-10">
                {/* Left Column: Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-2 px-3 py-1 rounded-[2px] bg-bg-surface border border-accent mb-8 inline-block shadow-[0_0_10px_rgba(0,255,136,0.1)]">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
                            Available for Internships & Full-Time Roles
                        </span>
                    </div>

                    <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[1.05] tracking-tight mb-6 text-text-primary">
                        I build backend systems <br />
                        <span className="text-accent underline decoration-4 underline-offset-8">that scale.</span>
                    </h1>

                    <h2 className="text-[clamp(1rem,2.5vw,1.4rem)] font-medium text-text-muted mt-4 mb-2">
                        APIs. Databases. Architecture. Built for the real world.
                    </h2>

                    <p className="text-base text-text-muted mb-10 leading-relaxed max-w-xl">
                        Final-year Computer Science student and active SDE Intern at JBH Tech Innovation — shipping production-grade backend systems daily.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                        <motion.button
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 py-3 rounded-[2px] bg-accent text-bg-primary font-mono font-bold flex items-center gap-2 hover:bg-accent-dim transition-all w-full sm:w-auto justify-center"
                        >
                            VIEW PROJECTS <ChevronRight size={18} />
                        </motion.button>

                        <motion.button
                            whileHover={{ borderColor: '#A855F7', color: '#A855F7' }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => window.open('https://drive.google.com/file/d/1EFa-DY0b2K02OV_pubGzgiYAMHN7Ijts/view?usp=drive_link', '_blank')}
                            className="px-8 py-3 rounded-[2px] border border-border text-text-primary font-mono font-bold flex items-center gap-2 transition-all w-full sm:w-auto justify-center"
                        >
                            RESUME <Download size={18} />
                        </motion.button>
                    </div>

                    {/* Social Links Row */}
                    <div className="flex items-center gap-4 mb-12 font-mono text-sm">
                        <a href="https://github.com/ShreyashSrivastavaa" target="_blank" className="flex items-center gap-2 text-text-muted hover:text-accent transition-colors group">
                            <Github size={16} /> <span>GITHUB</span>
                        </a>
                        <span className="text-border">/</span>
                        <a href="https://linkedin.com/in/shreyashsrivastavaa" target="_blank" className="flex items-center gap-2 text-text-muted hover:text-accent transition-colors group">
                            <Linkedin size={16} /> <span>LINKEDIN</span>
                        </a>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 border-t border-border pt-10 mt-10">
                        <div className="flex flex-col">
                            <span className="text-4xl font-black text-accent font-mono">
                                <CountUp end="3" />
                            </span>
                            <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-text-muted mt-1">
                                Production-Ready <br /> Projects
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-4xl font-black text-accent font-mono">
                                <CountUp end="1" />
                            </span>
                            <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-text-muted mt-1">
                                Active <br /> Internship
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-4xl font-black text-accent font-mono">
                                <CountUp end="2" suffix="+" />
                            </span>
                            <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-text-muted mt-1">
                                Years of <br /> Backend Engineering
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative hidden md:block"
                >
                    <div className="aspect-[4/5] max-w-[420px] mx-auto rounded-[2px] border border-border relative group shadow-2xl overflow-hidden hover:border-accent hover:glow-accent transition-all duration-500">
                        <Image
                            src="/profile.png"
                            alt="Shreyash Srivastava"
                            fill
                            priority
                            className="object-cover contrast-[1.05] filter brightness-90 group-hover:brightness-100 transition-all duration-700"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
