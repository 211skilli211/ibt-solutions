'use client';

import { useState, useEffect } from 'react';
import { Badge, Button, GradientText } from '@/components/ui';

interface HeroData {
  asset_url: string;
  asset_type: string;
  overlay_color: string;
  overlay_opacity: number;
  title: string;
  subtitle: string;
  cta_text: string;
  cta_link: string;
  cta2_text: string;
  cta2_link: string;
  icon_url: string;
  layout_template: string;
  style_config: any;
}

interface PageHeroProps {
  pageKey: string;
  fallback: {
    badge: string;
    badgeVariant?: 'teal' | 'emerald' | 'sunset' | 'slate';
    title: string;
    titleGradient?: string;
    subtitle: string;
    ctaPrimary?: { label: string; href: string };
    ctaSecondary?: { label: string; href: string; variant?: 'outline' | 'ghost' };
    bgImage?: string;
  };
}

export default function PageHero({ pageKey, fallback }: PageHeroProps) {
  const [hero, setHero] = useState<HeroData | null>(null);

  useEffect(() => {
    fetch(`/api/hero-assets/${pageKey}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => { if (data) setHero(data); })
      .catch(() => {});
  }, [pageKey]);

  const bgUrl = hero?.asset_url || fallback.bgImage || 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&h=1080&fit=crop&q=80';
  const title = hero?.title || fallback.title;
  const gradient = hero?.subtitle?.split(' ')[0] || fallback.titleGradient || '';
  const subtitle = hero?.subtitle || fallback.subtitle;
  const cta1Label = hero?.cta_text || fallback.ctaPrimary?.label || '';
  const cta1Link = hero?.cta_link || fallback.ctaPrimary?.href || '#';
  const cta2Label = hero?.cta2_text || fallback.ctaSecondary?.label || '';
  const cta2Link = hero?.cta2_link || fallback.ctaSecondary?.href || '#';
  const cta2Variant = fallback.ctaSecondary?.variant || 'outline';

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {hero?.asset_type === 'video' ? (
          <video src={bgUrl} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-20" />
        ) : (
          <img src={bgUrl} alt="" className="w-full h-full object-cover opacity-20" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-surface-0/40 via-surface-0/70 to-surface-0" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <Badge variant={fallback.badgeVariant || 'teal'} className="mb-6">
          {fallback.badge}
        </Badge>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
          {gradient ? (
            <>
              {title} <GradientText>{gradient}</GradientText>
            </>
          ) : title}
        </h1>

        <p className="text-xl text-slate-400 mb-8">{subtitle}</p>

        {(cta1Label || cta2Label) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {cta1Label && <Button href={cta1Link} size="lg">{cta1Label}</Button>}
            {cta2Label && <Button href={cta2Link} variant={cta2Variant as any} size="lg">{cta2Label}</Button>}
          </div>
        )}
      </div>
    </section>
  );
}
