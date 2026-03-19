'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useVersion } from '../../context/version-context';
import { Menu, X } from 'lucide-react';

export default function NavV2() {
  const { version, setVersion } = useVersion();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = (e) => {
    if (e) e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Credentials', href: '#credentials' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f]/80 backdrop-blur-md border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Left side - Brand and Hamburger */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-white hover:text-[#ffb300] transition-colors"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-white font-semibold text-lg hover:text-[#ffb300] transition-colors cursor-pointer"
            >
              Shreyash
            </button>
          </div>

          {/* Right side - Options & Links */}
          <div className="flex items-center gap-6 md:gap-8">
            <div className="flex items-center p-1 bg-[#1a1a1a] rounded-full border border-[#222222]">
              <button 
                onClick={() => setVersion('v1')}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${version === 'v1' ? 'bg-white text-black' : 'text-[#888888] hover:text-white bg-transparent'}`}
              >
                V1
              </button>
              <button 
                onClick={() => setVersion('v2')}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${version === 'v2' ? 'bg-white text-black' : 'text-[#888888] hover:text-white bg-transparent'}`}
              >
                V2
              </button>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="text-[#888888] hover:text-white transition-colors text-sm font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-[#1a1a1a] bg-[#0f0f0f]/95 backdrop-blur-md overflow-hidden"
            >
              <div className="flex flex-col px-6 py-6 space-y-6 shadow-2xl">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-[#888888] hover:text-[#ffb300] transition-colors text-base font-semibold uppercase tracking-widest"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Floating Profile / Back to Top */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-10 right-10 z-50 w-16 h-16 rounded-full border-2 border-[#222222] bg-[#1a1a1a] overflow-hidden group shadow-2xl hover:border-[#ffb300]/50 transition-colors"
          >
            <Image 
              src="/profile.png" 
              alt="Back to top"
              width={64}
              height={64}
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
