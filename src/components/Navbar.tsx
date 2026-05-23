'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/partners', label: 'Partners' },
  { href: '/coops', label: 'IBT Co-ops' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    fetch('/api/site-settings')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && Array.isArray(data)) {
          const logo = data.find((s: any) => s.setting_key === 'ibt_logo_url');
          if (logo?.setting_value) setLogoUrl(logo.setting_value);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-surface-0/95 backdrop-blur-lg border-b border-surface-3 shadow-lg'
            : 'bg-surface-0/80 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              {logoUrl ? (
                <img src={logoUrl} alt="IBT Solutions" className="h-8 md:h-10 w-auto object-contain" />
              ) : (
                <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent transition-transform group-hover:scale-105">
                  IBT
                </span>
              )}
              <span className="text-sm text-slate-500 font-medium hidden sm:block">Solutions</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    pathname === link.href ? 'text-teal-400' : 'text-slate-300 hover:text-white'
                  } after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-teal-400 after:transform after:scale-x-0 after:transition-transform ${
                    pathname === link.href ? 'after:scale-x-100' : 'hover:after:scale-x-100'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://islandhub-git-master-rpskilli211-3018s-projects.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
              >
                IslandHub
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </nav>

            {/* Mobile Toggle */}
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden min-w-[44px] min-h-[44px] p-2 text-slate-300 hover:text-white hover:bg-surface-2 rounded-lg transition-colors flex items-center justify-center"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="fixed top-16 left-0 right-0 z-50 bg-surface-1/98 backdrop-blur-lg border-b border-surface-3 shadow-2xl animate-slide-up">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <nav className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between py-3 px-4 text-base font-medium rounded-xl transition-colors ${
                      pathname === link.href
                        ? 'bg-teal-500/10 text-teal-400 border border-teal-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-surface-2'
                    }`}
                  >
                    {link.label}
                    <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
                <a
                  href="https://islandhub-git-master-rpskilli211-3018s-projects.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-3 px-4 text-base font-medium text-emerald-400 hover:bg-emerald-500/10 rounded-xl transition-colors border border-emerald-500/30 bg-emerald-500/5"
                >
                  IslandHub
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </nav>
              <div className="mt-4 pt-4 border-t border-surface-3">
                <Button
                  href="https://chat.whatsapp.com/example"
                  external
                  variant="primary"
                  className="w-full"
                >
                  Join WhatsApp Community
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
