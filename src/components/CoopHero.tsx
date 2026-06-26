'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface HeroData {
  asset_url: string | null;
  asset_type: string;
  overlay_color: string;
  overlay_opacity: number;
  title: string;
  subtitle: string;
  cta_text: string;
  cta_link: string;
  cta2_text: string;
  cta2_link: string;
  style_config: any;
}

interface CoopHeroProps {
  pageKey: string;
  fallback: {
    badge: string;
    title: string;
    titleGradient: string;
    subtitle: string;
    ctaPrimary?: { label: string; href: string };
    ctaSecondary?: { label: string; href: string };
  };
  rightContent: React.ReactNode;
}

export default function CoopHero({ pageKey, fallback, rightContent }: CoopHeroProps) {
  const [hero, setHero] = useState<HeroData | null>(null);

  useEffect(() => {
    fetch(`/api/hero-assets/${pageKey}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => { if (data) setHero(data); })
      .catch(() => {});
  }, [pageKey]);

  const title = hero?.title || fallback.title;
  const gradient = hero?.style_config?.gradient || fallback.titleGradient;
  const subtitle = hero?.subtitle || fallback.subtitle;
  const cta1Label = hero?.cta_text || fallback.ctaPrimary?.label || '';
  const cta1Link = hero?.cta_link || fallback.ctaPrimary?.href || '#';
  const cta2Label = hero?.cta2_text || fallback.ctaSecondary?.label || '';
  const cta2Link = hero?.cta2_link || fallback.ctaSecondary?.href || '#';
  const badge = fallback.badge;

  return (
    <>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px]" />
      </div>

      <div className="relative pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-ink-400 mb-8">
            <Link href="/coops" className="hover:text-white transition-colors">IBT Co-ops</Link>
            <span>/</span>
            <span className="text-white">{title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm mb-6">
                {badge}
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                {title}
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  {gradient}
                </span>
              </h1>
              <p className="text-xl text-ink-400 mb-8">
                {subtitle}
              </p>
              {(cta1Label || cta2Label) && (
                <div className="flex flex-col sm:flex-row gap-4">
                  {cta1Label && cta1Link && (
                    <Link href={cta1Link} className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-surface-1 font-semibold rounded-xl transition-all text-center">
                      {cta1Label}
                    </Link>
                  )}
                  {cta2Label && cta2Link && (
                    <a href={cta2Link} target="_blank" rel="noopener noreferrer" className="px-8 py-4 border border-ink-700 hover:border-ink-600 text-white font-medium rounded-xl transition-all text-center">
                      {cta2Label}
                    </a>
                  )}
                </div>
              )}
            </div>

            {rightContent}
          </div>
        </div>
      </div>
    </>
  );
}
