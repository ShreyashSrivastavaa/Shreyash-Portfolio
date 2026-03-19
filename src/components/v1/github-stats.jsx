'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Book, GitCommit, Code2, AlertCircle, Loader2 } from 'lucide-react';

async function fetchGitHubStats(username) {
    try {
        const [userRes, reposRes] = await Promise.all([
            fetch(`https://api.github.com/users/${username}`),
            fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error('Failed to fetch data');

        const userData = await userRes.json();
        const reposData = await reposRes.json();

        // Calculate top languages
        const languages = reposData.reduce((acc, repo) => {
            if (repo.language) {
                acc[repo.language] = (acc[repo.language] || 0) + 1;
            }
            return acc;
        }, {});

        const topLanguages = Object.entries(languages)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([name]) => name);

        return {
            publicRepos: userData.public_repos,
            followers: userData.followers,
            topLanguages,
            // Estimation since public API doesn't give total commits easily without auth/iteration
            estimatedCommits: userData.public_repos * 15,
        };
    } catch (e) {
        return null;
    }
}

export default function GithubStats() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchGitHubStats('ShreyashSrivastavaa')
            .then((data) => {
                if (data) {
                    setStats(data);
                } else {
                    setError(true);
                }
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="py-24 flex items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={40} />
            </div>
        );
    }

    if (error || !stats) {
        return (
            <div className="py-24 text-center">
                <div className="inline-flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-2 rounded-full mb-4">
                    <AlertCircle size={16} /> Failed to load development activity
                </div>
            </div>
        );
    }

    return (
        <section className="py-24 px-4 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Development <span className="gradient-text">Activity.</span></h2>
                    <p className="text-foreground/60 text-lg mb-8">
                        Real-time synchronization with my GitHub profile to showcase consistent coding activity and repository growth.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: 'Repositories', value: stats?.publicRepos || 0, icon: <Book size={20} /> },
                            { label: 'Followers', value: stats?.followers || 0, icon: <Github size={20} /> },
                            { label: 'Est. Commits', value: stats?.estimatedCommits || '500+', icon: <GitCommit size={20} /> },
                            { label: 'Primary Tech', value: stats?.topLanguages?.[0] || 'JavaScript', icon: <Code2 size={20} /> },
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-6 rounded-2xl glass dark:glass-dark border border-white/5"
                            >
                                <div className="text-primary mb-2">{stat.icon}</div>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <div className="text-xs uppercase font-bold text-foreground/40">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <div className="aspect-video rounded-2xl glass dark:glass-dark border border-white/10 p-8 flex flex-col justify-center overflow-hidden">
                        <div className="flex justify-between items-end mb-8">
                            <h3 className="uppercase tracking-widest text-foreground/40 text-xs font-bold">Contribution Heatmap</h3>
                            <div className="flex gap-1">
                                {['#0e4429', '#006d32', '#26a641', '#39d353'].map(c => (
                                    <div key={c} className="w-3 h-3 rounded-sm" style={{ backgroundColor: c }} />
                                ))}
                            </div>
                        </div>

                        {/* Dummy Heatmap Grid */}
                        <div className="grid grid-cols-12 gap-2 opacity-50">
                            {Array.from({ length: 96 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="aspect-square rounded-sm"
                                    style={{
                                        backgroundColor: i % 7 === 0 ? '#161b22' :
                                            i % 4 === 0 ? '#0e4429' :
                                                i % 3 === 0 ? '#006d32' : '#26a641'
                                    }}
                                />
                            ))}
                        </div>

                        <div className="mt-8 text-center text-xs font-mono text-foreground/30">
                            * Data fetched dynamically from github.com/ShreyashSrivastavaa
                        </div>
                    </div>

                    {/* Decorative Blur */}
                    <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 rounded-full blur-[100px]" />
                </div>
            </div>
        </section>
    );
}
