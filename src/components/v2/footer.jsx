'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

export default function FooterV2() {
  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/ShreyashSrivastavaa', icon: <Github size={16} /> },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/shreyash-srivastava-310652273', icon: <Linkedin size={16} /> },
    { name: 'Email', href: 'mailto:shreyashsr2004@gmail.com', icon: <Mail size={16} /> }
  ];

  return (
    <footer id="contact" className="py-24 px-6 lg:px-24 bg-[#0d0d0d] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          <div className="flex items-center gap-4 text-primary font-mono text-[10px] tracking-[0.5em] uppercase mb-4">
            <span className="w-8 h-[1px] bg-primary"></span>
            <span>CONTACT_NODE</span>
          </div>
          <p className="text-white text-xl lg:text-2xl font-bold tracking-tight">
            Currently open to <span className="text-primary italic">backend engineering</span> roles.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center gap-12"
        >
          {socialLinks.map((social) => (
            <a 
               key={social.name} 
               href={social.href}
               target="_blank"
               rel="noopener noreferrer"
               className="group flex items-center gap-2 text-white/30 hover:text-white transition-all font-mono text-xs uppercase tracking-widest"
            >
              <div className="p-2 border border-transparent group-hover:border-primary/20 group-hover:bg-primary/5 transition-all">
                {social.icon}
              </div>
              {social.name}
              <ArrowUpRight size={12} className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </a>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em]">
          © 2024 SHREYASH SRIVASTAVA <span className="mx-2 text-primary">•</span> ARCHITECTED_V2
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em]">
          LOCAL_TIME: {new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false, hour: '2-digit', minute: '2-digit' })} IST
        </p>
      </div>
    </footer>
  );
}
