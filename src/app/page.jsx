'use client';

import { useVersion } from "../context/version-context.jsx";

// V1 Components
import HeroV1 from "../components/v1/hero.jsx";
import AboutV1 from "../components/v1/about.jsx";
import SkillsV1 from "../components/v1/skills.jsx";
import ProjectsV1 from "../components/v1/projects.jsx";
import BackendArchitectureV1 from "../components/v1/backend-architecture.jsx";
import GithubStatsV1 from "../components/v1/github-stats.jsx";
import ExperienceV1 from "../components/v1/experience.jsx";
import ContactV1 from "../components/v1/contact.jsx";

// V2 Components (Placeholders)
const HeroV2 = () => <div className="min-h-screen flex items-center justify-center">V2 Hero (Coming Soon)</div>;

export default function Home() {
    const { version } = useVersion();

    if (version === 'v2') {
        return (
            <main className="relative">
                <HeroV2 />
            </main>
        );
    }

    return (
        <main className="relative">
            <div className="flex flex-col gap-0">
                <HeroV1 />
                <AboutV1 />
                <SkillsV1 />
                <BackendArchitectureV1 />
                <ProjectsV1 />
                <GithubStatsV1 />
                <ExperienceV1 />
                <ContactV1 />
            </div>
        </main>
    );
}

