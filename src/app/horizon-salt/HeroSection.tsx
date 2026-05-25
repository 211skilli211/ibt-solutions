'use client';

import PageHero from '@/components/PageHero';

export default function HeroSection() {
  return (
    <PageHero
      pageKey="horizon-salt"
      fallback={{
        badge: 'From the Salt Ponds of St. Kitts',
        badgeVariant: 'sunset',
        title: 'Horizon Salt Co.',
        subtitle: 'Hand-harvested Caribbean sea salt — rich in minerals, sustainably sourced, and crafted with island heritage.',
        ctaPrimary: { label: 'Shop Now', href: '#products' },
      }}
    />
  );
}
