'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, MessageSquare, ArrowUpRight } from 'lucide-react';

const socials = [
    { name: 'LinkedIn', icon: <Linkedin size={24} />, href: 'https://www.linkedin.com/in/shreyashsrivastavaa', color: 'hover:text-[#0077b5]' },
    { name: 'GitHub', icon: <Github size={24} />, href: 'https://github.com/ShreyashSrivastavaa', color: 'hover:text-primary' },
    { name: 'Email', icon: <Mail size={24} />, href: 'mailto:shreayshsr2004@gmail.com', color: 'hover:text-red-500' },
];

export default function Contact() {
    return (
        <section id="contact" className="py-24 px-4 overflow-hidden relative border-t border-white/5">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" />

            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="p-12 md:p-20 rounded-[3rem] glass dark:glass-dark border border-white/10"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-8">
                        <MessageSquare size={16} /> Let&apos;s Build Together
                    </div>

                    <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        Ready to <span className="gradient-text">Collaborate?</span>
                    </h2>

                    <p className="text-lg md:text-xl text-foreground/60 mb-12 max-w-xl mx-auto leading-relaxed">
                        I am currently open to Backend Developer and Software Engineer opportunities.
                        Feel free to reach out if you are looking for someone who enjoys building scalable backend systems.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="mailto:shreayshsr2004@gmail.com"
                            className="px-10 py-4 rounded-full bg-primary text-white font-bold flex items-center gap-2 text-lg shadow-xl shadow-primary/20"
                        >
                            Get in Touch <ArrowUpRight size={20} />
                        </motion.a>

                        <div className="flex gap-4">
                            {socials.map((social) => (
                                <motion.a
                                    key={social.name}
                                    whileHover={{ y: -5 }}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-4 rounded-2xl bg-foreground/5 border border-white/10 transition-colors ${social.color}`}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
