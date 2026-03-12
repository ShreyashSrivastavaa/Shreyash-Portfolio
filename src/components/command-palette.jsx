'use client';

import {
    KBarProvider,
    KBarPortal,
    KBarPositioner,
    KBarAnimator,
    KBarSearch,
    useMatches,
    KBarResults,
} from 'kbar';
import { useRouter } from 'next/navigation';
import {
    Home,
    User,
    Code,
    Briefcase,
    Mail,
    Github,
    Linkedin,
    Moon,
    Sun,
    Search
} from 'lucide-react';
import { useTheme } from 'next-themes';

export default function CommandPalette({ children }) {
    const router = useRouter();
    const { theme, setTheme } = useTheme();

    const actions = [
        // Navigation
        {
            id: 'home',
            name: 'Home',
            shortcut: ['h'],
            keywords: 'back to home index',
            perform: () => router.push('/'),
            icon: <Home size={18} />,
            section: 'Navigation',
        },
        {
            id: 'about',
            name: 'About',
            shortcut: ['a'],
            keywords: 'biography info story',
            perform: () => router.push('#about'),
            icon: <User size={18} />,
            section: 'Navigation',
        },
        {
            id: 'skills',
            name: 'Skills',
            shortcut: ['s'],
            keywords: 'stack languages tools',
            perform: () => router.push('#skills'),
            icon: <Code size={18} />,
            section: 'Navigation',
        },
        {
            id: 'projects',
            name: 'Projects',
            shortcut: ['p'],
            keywords: 'work portfolio cases',
            perform: () => router.push('#projects'),
            icon: <Briefcase size={18} />,
            section: 'Navigation',
        },
        {
            id: 'contact',
            name: 'Contact',
            shortcut: ['c'],
            keywords: 'email reach out hire',
            perform: () => router.push('#contact'),
            icon: <Mail size={18} />,
            section: 'Navigation',
        },
        // Socials
        {
            id: 'github',
            name: 'GitHub',
            shortcut: ['g'],
            keywords: 'source code repo',
            perform: () => window.open('https://github.com/ShreyashSrivastavaa', '_blank'),
            icon: <Github size={18} />,
            section: 'Socials',
        },
        {
            id: 'linkedin',
            name: 'LinkedIn',
            shortcut: ['l'],
            keywords: 'professional network connect',
            perform: () => window.open('https://www.linkedin.com/in/shreyashsrivastavaa', '_blank'),
            icon: <Linkedin size={18} />,
            section: 'Socials',
        },
        // Theme
        {
            id: 'theme',
            name: 'Toggle Theme',
            shortcut: ['t'],
            keywords: 'dark light mode appearance',
            perform: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
            icon: theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />,
            section: 'Appearance',
        },
    ];

    return (
        <KBarProvider actions={actions}>
            <KBarPortal>
                <KBarPositioner className="bg-bg-primary/80 backdrop-blur-md z-[99999]">
                    <KBarAnimator className="w-full max-w-[600px] bg-bg-surface border border-border shadow-2xl overflow-hidden rounded-[2px]">
                        <div className="flex items-center px-4 py-4 border-b border-border bg-bg-surface">
                            <Search size={18} className="text-text-muted mr-3" />
                            <KBarSearch className="w-full bg-transparent outline-hidden font-mono text-sm text-text-primary placeholder:text-text-muted/30" placeholder="Type a command or search..." />
                            <div className="flex items-center gap-1 ml-2">
                                <kbd className="px-1.5 py-0.5 font-mono text-[10px] bg-bg-primary border border-border text-text-muted rounded-[1px]">ESC</kbd>
                            </div>
                        </div>
                        <RenderResults />
                    </KBarAnimator>
                </KBarPositioner>
            </KBarPortal>
            {children}
        </KBarProvider>
    );
}

function RenderResults() {
    const { results } = useMatches();

    return (
        <KBarResults
            items={results}
            onRender={({ item, active }) =>
                typeof item === 'string' ? (
                    <div className="px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-accent bg-bg-primary/50">
                        {item}
                    </div>
                ) : (
                    <div
                        className={`px-4 py-3 flex items-center justify-between cursor-pointer transition-colors ${active ? 'bg-accent text-bg-primary shadow-lg scale-[1.01] z-10' : 'bg-transparent text-text-muted'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <span className={active ? 'text-bg-primary' : 'text-accent'}>{item.icon}</span>
                            <span className={`font-mono text-sm font-bold uppercase tracking-tight ${active ? 'text-bg-primary' : 'text-text-primary'}`}>{item.name}</span>
                        </div>
                        {item.shortcut?.length > 0 && (
                            <div className="flex gap-1">
                                {item.shortcut.map((sc) => (
                                    <kbd key={sc} className={`px-2 py-0.5 font-mono text-[10px] rounded-[1px] border ${active ? 'bg-bg-primary/20 border-bg-primary/30 text-bg-primary' : 'bg-bg-primary border-border text-text-muted'}`}>
                                        {sc.toUpperCase()}
                                    </kbd>
                                ))}
                            </div>
                        )}
                    </div>
                )
            }
        />
    );
}
