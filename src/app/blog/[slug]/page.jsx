import { getBlogPost } from '../../../lib/blog.js';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';

const mdxOptions = {
    mdxOptions: {
        rehypePlugins: [
            [
                rehypePrettyCode,
                {
                    theme: 'github-dark',
                    keepBackground: true,
                },
            ],
        ],
    },
};

export default async function BlogPostPage({ params }) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="max-w-3xl mx-auto py-24 px-4 min-h-screen">
            <Link
                href="/blog"
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-12 font-medium"
            >
                <ArrowLeft size={20} /> Back to Blog
            </Link>

            <header className="mb-12">
                <div className="flex items-center gap-4 text-sm text-foreground/40 mb-6 font-mono">
                    <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {post.meta.date}
                    </div>
                    <div className="flex items-center gap-2">
                        <Tag size={14} />
                        <div className="flex gap-2">
                            {post.meta.tags.map((tag) => (
                                <span key={tag}>#{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">{post.meta.title}</h1>
                <p className="text-xl text-foreground/60 leading-relaxed italic">
                    {post.meta.description}
                </p>
            </header>

            <div className="prose prose-invert prose-primary max-w-none prose-pre:bg-foreground/5 prose-pre:border prose-pre:border-white/10">
                <MDXRemote source={post.content} options={mdxOptions} />
            </div>

            <footer className="mt-24 pt-12 border-t border-white/10">
                <div className="glass dark:glass-dark p-8 rounded-2xl">
                    <h3 className="text-xl font-bold mb-4">Enjoyed this deep dive?</h3>
                    <p className="text-foreground/70 mb-6">
                        I write about building secure, scalable systems. Follow my journey on GitHub for more interactive case studies.
                    </p>
                    <Link
                        href="https://github.com/ShreyashSrivastavaa"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-white font-semibold hover:scale-105 transition-transform"
                    >
                        Visit GitHub Profile
                    </Link>
                </div>
            </footer>
        </div>
    );
}
