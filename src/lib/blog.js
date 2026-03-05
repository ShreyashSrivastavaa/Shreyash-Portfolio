import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIRECTORY = path.join(process.cwd(), 'src/content/blog');

export async function getBlogPosts() {
    const filenames = fs.readdirSync(BLOG_DIRECTORY);

    const posts = filenames
        .filter((filename) => filename.endsWith('.mdx'))
        .map((filename) => {
            const filePath = path.join(BLOG_DIRECTORY, filename);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const { data } = matter(fileContent);

            return {
                slug: filename.replace('.mdx', ''),
                title: data.title,
                date: data.date,
                description: data.description,
                tags: data.tags,
            };
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
}

export async function getBlogPost(slug) {
    const filePath = path.join(BLOG_DIRECTORY, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) {
        return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    return {
        meta: {
            title: data.title,
            date: data.date,
            description: data.description,
            tags: data.tags,
        },
        content,
    };
}
