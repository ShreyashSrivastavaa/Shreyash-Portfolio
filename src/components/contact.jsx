'use client';

import { motion } from 'framer-motion';
import { Send, Mail, Linkedin, Github } from 'lucide-react';

export default function Contact() {
    return (
        <section id="contact" className="py-32 px-4 max-w-7xl mx-auto bg-bg-primary">
            <div className="grid lg:grid-cols-2 gap-20">
                {/* Text Content */}
                <div>
                    <div className="flex items-center gap-4 mb-4">
                        <span className="font-mono text-accent text-lg font-bold">06 /</span>
                        <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-text-muted">Contact</h2>
                    </div>
                    <h3 className="text-[clamp(1.75rem,4vw,2.5rem)] font-black leading-tight text-text-primary mb-6">
                        Ready to <br />
                        <span className="text-accent underline decoration-2 underline-offset-4">Scale?</span>
                    </h3>
                    <p className="text-text-muted text-lg font-medium leading-relaxed mb-12 max-w-md">
                        I am currently open to Backend Developer roles. Let’s talk about architecture, systems, or opportunities.
                    </p>

                    <div className="space-y-6">
                        <a
                            href="mailto:shreyashsr2004@gmail.com"
                            className="flex items-center gap-4 text-text-primary hover:text-accent transition-colors group"
                        >
                            <div className="p-3 border border-border bg-bg-surface group-hover:border-accent group-hover:glow-accent transition-all rounded-[1px]">
                                <Mail size={20} />
                            </div>
                            <span className="font-mono text-sm tracking-tight">shreyashsr2004@gmail.com</span>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/shreyashsrivastavaa"
                            target="_blank"
                            className="flex items-center gap-4 text-text-primary hover:text-accent transition-colors group"
                        >
                            <div className="p-3 border border-border bg-bg-surface group-hover:border-accent group-hover:glow-accent transition-all rounded-[1px]">
                                <Linkedin size={20} />
                            </div>
                            <span className="font-mono text-sm tracking-tight">linkedin.com/in/shreyashsrivastavaa</span>
                        </a>
                    </div>
                </div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-8 bg-bg-surface border border-border rounded-[2px] relative"
                >
                    <form className="space-y-6">
                        <div>
                            <label className="font-mono text-[10px] uppercase tracking-widest text-text-muted block mb-2">Full Name</label>
                            <input
                                type="text"
                                placeholder="JANE DOE"
                                className="w-full bg-bg-primary border border-border px-4 py-3 text-text-primary font-mono text-sm focus:outline-hidden focus:border-accent transition-all rounded-[1px] placeholder:text-text-muted/30"
                            />
                        </div>
                        <div>
                            <label className="font-mono text-[10px] uppercase tracking-widest text-text-muted block mb-2">Email Address</label>
                            <input
                                type="email"
                                placeholder="JANE@EXAMPLE.COM"
                                className="w-full bg-bg-primary border border-border px-4 py-3 text-text-primary font-mono text-sm focus:outline-hidden focus:border-accent transition-all rounded-[1px] placeholder:text-text-muted/30"
                            />
                        </div>
                        <div>
                            <label className="font-mono text-[10px] uppercase tracking-widest text-text-muted block mb-2">Message</label>
                            <textarea
                                rows={4}
                                placeholder="TELL ME ABOUT YOUR PROJECT..."
                                className="w-full bg-bg-primary border border-border px-4 py-3 text-text-primary font-mono text-sm focus:outline-hidden focus:border-accent transition-all rounded-[1px] resize-none placeholder:text-text-muted/30"
                            />
                        </div>
                        <button
                            type="button"
                            className="w-full py-4 bg-accent text-bg-primary font-mono text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#00e67a] transition-all rounded-[1px]"
                        >
                            Execute Message <Send size={14} />
                        </button>
                    </form>
                    <div className="absolute -bottom-px -right-px w-8 h-8 pointer-events-none">
                        <div className="absolute bottom-0 right-0 w-full h-px bg-accent" />
                        <div className="absolute bottom-0 right-0 w-px h-full bg-accent" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
