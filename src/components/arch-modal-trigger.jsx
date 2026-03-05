'use client';

import { Cpu } from 'lucide-react';
import { useUI } from '../context/ui-context.jsx';

export default function ArchModalTrigger() {
    const { openArchModal } = useUI();

    return (
        <div
            onClick={openArchModal}
            className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors group"
        >
            <Cpu size={14} className="group-hover:rotate-12 transition-transform" />
            <span className="font-mono uppercase tracking-tighter">System Arch</span>
        </div>
    );
}
