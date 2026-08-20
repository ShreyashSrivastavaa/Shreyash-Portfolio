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
    <div className="pt-12 pb-6 border-t border-white/[0.08] mt-20 flex items-center justify-between gap-6 text-sm">
      {prevProject ? (
        <Link
          href={`/projects/${prevProject.id}`}
          className="group inline-flex items-center gap-2 text-[#9ca3af] hover:text-[#f5f5f7] transition-colors"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#6b7280]">Previous</span>
            <span className="font-medium text-xs sm:text-sm text-[#d1d5db] group-hover:text-white transition-colors">
              {prevProject.title.split('—')[0].trim()}
            </span>
          </div>
        </Link>
      ) : <div />}

      {nextProject && (
        <Link
          href={`/projects/${nextProject.id}`}
          className="group inline-flex items-center gap-2 text-[#9ca3af] hover:text-[#f5f5f7] transition-colors text-right ml-auto"
        >
          <div className="flex flex-col text-right">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#6b7280]">Next</span>
            <span className="font-medium text-xs sm:text-sm text-[#d1d5db] group-hover:text-white transition-colors">
              {nextProject.title.split('—')[0].trim()}
            </span>
          </div>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}
