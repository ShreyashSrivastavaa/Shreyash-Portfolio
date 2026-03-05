import Hero from "../components/hero.jsx";
import About from "../components/about.jsx";
import Skills from "../components/skills.jsx";
import Projects from "../components/projects.jsx";
import Experience from "../components/experience.jsx";
import Contact from "../components/contact.jsx";
import DynamicProfileImage from "../components/dynamic-profile-image.jsx";

export default function Home() {
    return (
        <main className="relative">
            <DynamicProfileImage />
            <div className="flex flex-col gap-0">
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Contact />
            </div>
        </main>
    );
}
