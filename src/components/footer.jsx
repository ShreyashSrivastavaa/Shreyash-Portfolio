import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import GithubActivity from './github-activity';
import ArchModalTrigger from './arch-modal-trigger';

export default function Footer() {
    return (
        <footer className="border-t border-border py-16 px-4 bg-bg-surface">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
                    <div className="flex flex-col gap-6">
                        <div className="font-bold text-3xl text-text-primary tracking-tighter uppercase font-mono">
                            Shreyash <span className="text-accent underline decoration-4 underline-offset-8">Srivastava</span>
                        </div>
                        <p className="text-text-muted max-w-sm text-sm font-medium leading-relaxed">
                            Engineering high-concurrency backend systems with a focus on security, scalability, and technical rigor.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
                        <div className="flex flex-col gap-4">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-accent">Socials</span>
                            <div className="flex flex-col gap-2">
                                <Link href="https://github.com/ShreyashSrivastavaa" target="_blank" className="font-mono text-xs text-text-muted hover:text-accent transition-colors">GITHUB</Link>
                                <Link href="https://www.linkedin.com/in/shreyashsrivastavaa" target="_blank" className="font-mono text-xs text-text-muted hover:text-accent transition-colors">LINKEDIN</Link>
                                <Link href="mailto:shreyashsr2004@gmail.com" className="font-mono text-xs text-text-muted hover:text-accent transition-colors">EMAIL</Link>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-accent">Navigation</span>
                            <div className="flex flex-col gap-2">
                                <Link href="#about" className="font-mono text-xs text-text-muted hover:text-accent transition-colors">ABOUT</Link>
                                <Link href="#projects" className="font-mono text-xs text-text-muted hover:text-accent transition-colors">PROJECTS</Link>
                                <Link href="#contact" className="font-mono text-xs text-text-muted hover:text-accent transition-colors">CONTACT</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border gap-6">
                    <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-mono font-bold text-text-muted uppercase tracking-widest">
                        <span>&copy; {new Date().getFullYear()} CORE_SYSTEM</span>
                        <span className="hidden sm:inline">/</span>
                        <span className="text-accent">Built for Scale</span>
                        <span className="hidden sm:inline">/</span>
                        <ArchModalTrigger />
                    </div>

                    <GithubActivity />
                </div>
            </div>
        </footer>
    );
}
