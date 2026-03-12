import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import GithubActivity from './github-activity';
import ArchModalTrigger from './arch-modal-trigger';

export default function Footer() {
    return (
        <footer className="border-t border-white/10 py-12 px-4 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
                    <div className="flex flex-col gap-4">
                        <div className="font-bold text-2xl gradient-text">Shreyash Srivastava</div>
                        <p className="text-foreground/40 max-w-xs text-sm">
                            Engineering high-impact systems for a safer, scalable digital future.
                        </p>
                    </div>

                    <div className="flex gap-6 items-center">
                        <Link href="https://github.com/ShreyashSrivastavaa" target="_blank" className="text-foreground/40 hover:text-primary transition-colors">
                            <Github size={20} />
                        </Link>
                        <Link href="https://www.linkedin.com/in/shreyashsrivastavaa" target="_blank" className="text-foreground/40 hover:text-primary transition-colors">
                            <Linkedin size={20} />
                        </Link>
                        <Link href="mailto:shreayshsr2004@gmail.com" className="text-foreground/40 hover:text-primary transition-colors">
                            <Mail size={20} />
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-6">
                    <div className="flex items-center gap-4 text-xs text-foreground/40">
                        <span>&copy; {new Date().getFullYear()} Shreyash. All rights reserved.</span>
                        <ArchModalTrigger />
                    </div>

                    <GithubActivity />
                </div>
            </div>
        </footer>
    );
}
