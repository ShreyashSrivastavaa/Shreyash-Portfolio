import { getBlogPosts } from '../../lib/blog.js';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';

export default async function BlogPage() {
    const posts = await getBlogPosts();

    return (
        <div className="max-w-4xl mx-auto py-24 px-4 min-h-screen">
            <Link
                href="/"
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-12 font-medium"
            >
                <ArrowLeft size={20} /> Back to Portfolio
            </Link>

            <div className="mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Engineering <span className="gradient-text">Thoughts.</span></h1>
                <p className="text-foreground/60 text-lg max-w-xl">
                    Detailed breakdowns, architectural decisions, and reflections on high-impact engineering.
                </p>
            </div>

            <div className="flex flex-col gap-12">
                {posts.map((post) => (
                    <article key={post.slug} className="group cursor-pointer">
                        <Link href={`/blog/${post.slug}`} className="block">
                            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4 gap-2">
                                <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                                    {post.title}
                                </h2>
                                <div className="flex items-center gap-2 text-sm text-foreground/40 font-mono">
                                    <Calendar size={14} />
                                    {post.date}
                                </div>
                            </div>
                            <p className="text-foreground/70 leading-relaxed mb-6">
                                {post.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <span key={tag} className="px-3 py-1 rounded-md text-xs font-mono bg-foreground/5 border border-foreground/10">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
}
