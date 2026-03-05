import { GitCommit, Github } from 'lucide-react';

async function getGithubActivity(username) {
    try {
        const res = await fetch(`https://api.github.com/users/${username}/events`, {
            headers: {
                Authorization: process.env.GITHUB_TOKEN ? `token ${process.env.GITHUB_TOKEN}` : '',
            },
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (!res.ok) return null;
        const events = await res.json();

        // Filter for push events
        const pushEvents = events.filter((e) => e.type === 'PushEvent').slice(0, 3);
        return pushEvents;
    } catch (e) {
        return null;
    }
}

export default async function GithubActivity() {
    const activities = await getGithubActivity('ShreyashSrivastavaa');

    if (!activities || activities.length === 0) {
        return (
            <div className="flex items-center gap-3 text-foreground/40 text-xs font-mono">
                <Github size={14} />
                <span>No recent activity found.</span>
            </div>
        );
    }

    const latest = activities[0];
    const repoName = latest?.repo?.name?.split('/')?.[1] || 'shreyash-portfolio';
    const commitMsg = latest?.payload?.commits?.[0]?.message || 'Worked on repository';

    return (
        <div className="flex items-center gap-6 text-xs font-mono">
            <div className="flex items-center gap-2 text-foreground/40">
                <Github size={14} className="animate-pulse text-primary" />
                <span className="uppercase tracking-widest font-bold">Live Activity</span>
            </div>

            <div className="h-4 w-px bg-white/10" />

            <div className="flex items-center gap-3 group">
                <div className="flex items-center gap-2 text-foreground/60">
                    <GitCommit size={14} className="text-accent" />
                    <span className="font-bold text-foreground/80">{repoName}</span>
                </div>
                <span className="text-foreground/40 hidden md:inline truncate max-w-[200px]">
                    &quot;{commitMsg}&quot;
                </span>
            </div>
        </div>
    );
}
