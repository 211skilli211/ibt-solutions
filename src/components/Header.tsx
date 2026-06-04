'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] bg-ocean-900/95 backdrop-blur-lg border-b border-surface-2">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              IBT
            </span>
            <span className="text-sm text-ink-500 font-medium">Solutions</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/#services" className="text-sm text-ink-300 hover:text-white transition-colors">Services</Link>
            <Link href="/coops" className="text-sm text-ink-300 hover:text-white transition-colors">IBT Co-ops</Link>
            <Link href="/#partners" className="text-sm text-ink-300 hover:text-white transition-colors">Partners</Link>
            <Link href="/#contact" className="text-sm text-ink-300 hover:text-white transition-colors">Contact</Link>
            <a href="https://islandhub.app" target="_blank" className="text-sm font-medium text-emerald-400 hover:text-emerald-300">
              IslandHub →
            </a>
          </nav>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className="md:hidden min-w-[44px] min-h-[44px] p-2 text-ink-300 hover:text-white hover:bg-surface-2 rounded-lg transition-colors flex items-center justify-center"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <nav ref={menuRef} className="md:hidden py-4 border-t border-surface-2 space-y-1 animate-in slide-in-from-top-2">
            <Link href="/#services" onClick={() => setIsOpen(false)} className="block py-3 px-4 text-ink-300 hover:text-white hover:bg-surface-2 rounded-lg transition-colors">Services</Link>
            <Link href="/coops" onClick={() => setIsOpen(false)} className="block py-3 px-4 text-ink-300 hover:text-white hover:bg-surface-2 rounded-lg transition-colors">IBT Co-ops</Link>
            <Link href="/#partners" onClick={() => setIsOpen(false)} className="block py-3 px-4 text-ink-300 hover:text-white hover:bg-surface-2 rounded-lg transition-colors">Partners</Link>
            <Link href="/#contact" onClick={() => setIsOpen(false)} className="block py-3 px-4 text-ink-300 hover:text-white hover:bg-surface-2 rounded-lg transition-colors">Contact</Link>
            <a href="https://islandhub.app" target="_blank" className="block py-3 px-4 text-emerald-400 font-medium hover:bg-surface-2 rounded-lg">IslandHub →</a>
          </nav>
        )}
      </div>
    </header>
  );
}