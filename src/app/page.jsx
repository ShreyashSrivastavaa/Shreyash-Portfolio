import Hero from "../components/hero.jsx";
import About from "../components/about.jsx";
import Skills from "../components/skills.jsx";
import Projects from "../components/projects.jsx";
import BackendArchitecture from "../components/backend-architecture.jsx";
import GithubStats from "../components/github-stats.jsx";
import Experience from "../components/experience.jsx";
import Contact from "../components/contact.jsx";

export default function Home() {
    return (
        <main className="relative">
            <div className="flex flex-col gap-0">
                <Hero />
                <About />
                <Skills />
                <BackendArchitecture />
                <Projects />
                <GithubStats />
                <Experience />
                <Contact />
            </div>
        </main>
    );
}
