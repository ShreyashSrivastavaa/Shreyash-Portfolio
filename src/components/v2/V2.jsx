'use client';

import NavV2 from './nav';
import HeroV2 from './hero';
import AboutV2 from './about';
import ProjectsV2 from './projects';
import TechStackV2 from './tech-stack';
import ExperienceV2 from './experience';
import CredentialsV2 from './credentials';
import FooterV2 from './footer';

export default function V2Portfolio() {
  return (
    <div className="bg-[#0f0f0f] text-[#f5f5f5] selection:bg-white selection:text-black font-sans">
      <NavV2 />
      <main>
        <HeroV2 />
        <AboutV2 />
        <ProjectsV2 />
        <TechStackV2 />
        <ExperienceV2 />
        <CredentialsV2 />
        <FooterV2 />
      </main>
    </div>
  );
}
