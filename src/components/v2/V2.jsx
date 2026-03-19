'use client';

import HeroV2 from './hero';
import AboutV2 from './about';
import ProjectsV2 from './projects';
import TechStackV2 from './tech-stack';
import FooterV2 from './footer';

export default function V2Portfolio() {
  return (
    <div className="bg-[#0d0d0d] text-white selection:bg-primary selection:text-[#0d0d0d]">
      <HeroV2 />
      <AboutV2 />
      <ProjectsV2 />
      <TechStackV2 />
      <FooterV2 />
    </div>
  );
}
