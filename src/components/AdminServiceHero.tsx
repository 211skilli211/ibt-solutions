'use client';

import { useState, useEffect, ReactNode } from 'react';

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

/**
 * Fetches admin hero data for a page key.
 * Returns hero data and a render function that merges admin data with fallback.
 */
export function useServiceHero(pageKey: string) {
  const [hero, setHero] = useState<HeroData | null>(null);

  useEffect(() => {
    fetch(`/api/hero-assets/${pageKey}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => { if (data) setHero(data); })
      .catch(() => {});
  }, [pageKey]);

  return hero;
}

interface AdminServiceHeroProps {
  pageKey: string;
  fallback: {
    badge: string;
    badgeVariant?: 'teal' | 'emerald' | 'sunset' | 'slate';
    title: string;
    titleGradient?: string;
    subtitle: string;
    ctaPrimary?: { label: string; href: string };
    ctaSecondary?: { label: string; href: string; variant?: 'outline' | 'ghost' };
  };
  children: (props: {
    hero: HeroData | null;
    title: string;
    titleGradient: string;
    subtitle: string;
    cta1Label: string;
    cta1Link: string;
    cta2Label: string;
    cta2Link: string;
    badge: string;
    badgeVariant: string;
  }) => ReactNode;
}

export function AdminServiceHero({ pageKey, fallback, children }: AdminServiceHeroProps) {
  const hero = useServiceHero(pageKey);

  const title = hero?.title || fallback.title;
  const titleGradient = hero?.style_config?.gradient || fallback.titleGradient || '';
  const subtitle = hero?.subtitle || fallback.subtitle;
  const cta1Label = hero?.cta_text || fallback.ctaPrimary?.label || '';
  const cta1Link = hero?.cta_link || fallback.ctaPrimary?.href || '#';
  const cta2Label = hero?.cta2_text || fallback.ctaSecondary?.label || '';
  const cta2Link = hero?.cta2_link || fallback.ctaSecondary?.href || '#';

  return children({
    hero,
    title,
    titleGradient,
    subtitle,
    cta1Label,
    cta1Link,
    cta2Label,
    cta2Link,
    badge: fallback.badge,
    badgeVariant: fallback.badgeVariant || 'teal',
  });
}
