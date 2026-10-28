'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import projectsData from '@/data/projects.json';

export default function ProjectNavigation({ currentId }) {
  const currentIndex = projectsData.findIndex((p) => p.id === currentId);
  if (currentIndex === -1) return null;

  const total = projectsData.length;
  const prevProject = projectsData[(currentIndex - 1 + total) % total];
  const nextProject = projectsData[(currentIndex + 1) % total];

  return (
    <nav
      aria-label="Previous and next project navigation"
      className="pt-10 pb-6 border-t border-white/10 mt-14 flex items-center justify-between gap-6"
    >
      {prevProject ? (
        <Link
          href={`/projects/${prevProject.id}`}
          className="group inline-flex items-center gap-3.5 p-3 sm:p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 hover:border-[#0066ff]/40 transition-all text-left"
        >
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#0066ff] group-hover:border-[#0066ff] transition-colors shrink-0">
            <ArrowLeft size={14} className="text-white group-hover:-translate-x-0.5 transition-transform" />
          </div>
          {prevProject.logo_url && (
            <img
              src={prevProject.logo_url}
              alt=""
              className="w-8 h-8 rounded-lg object-contain border border-white/10 bg-white/5 p-1 shrink-0 hidden sm:block"
            />
          )}
          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#707070] group-hover:text-[#0066ff] transition-colors">
              PREVIOUS CASE STUDY
            </span>
            <span className="font-sans font-semibold text-sm sm:text-base text-[#f1f0eb] group-hover:text-white transition-colors truncate max-w-[200px] sm:max-w-[280px]">
              {prevProject.title.split(/[:—]/)[0].trim()}
            </span>
          </div>
        </Link>
      ) : <div />}

      <Link
        href="/#portfolio"
        className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#0066ff]/40 text-xs font-mono text-[#f1f0eb] hover:text-[#0066ff] transition-all"
      >
        <ArrowLeft size={13} className="text-[#0066ff]" />
        <span>BACK TO WORK</span>
      </Link>

      {nextProject && (
        <Link
          href={`/projects/${nextProject.id}`}
          className="group inline-flex items-center gap-3.5 p-3 sm:p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 hover:border-[#0066ff]/40 transition-all text-right ml-auto"
        >
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#707070] group-hover:text-[#0066ff] transition-colors">
              NEXT CASE STUDY
            </span>
            <span className="font-sans font-semibold text-sm sm:text-base text-[#f1f0eb] group-hover:text-white transition-colors truncate max-w-[200px] sm:max-w-[280px]">
              {nextProject.title.split(/[:—]/)[0].trim()}
            </span>
          </div>
          {nextProject.logo_url && (
            <img
              src={nextProject.logo_url}
              alt=""
              className="w-8 h-8 rounded-lg object-contain border border-white/10 bg-white/5 p-1 shrink-0 hidden sm:block"
            />
          )}
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#0066ff] group-hover:border-[#0066ff] transition-colors shrink-0">
            <ArrowRight size={14} className="text-white group-hover:translate-x-0.5 transition-transform" />
          </div>
        </Link>
      )}
    </nav>
  );
}
