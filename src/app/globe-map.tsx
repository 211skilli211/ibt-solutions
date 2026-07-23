'use client';

import dynamic from 'next/dynamic';

// Shared GlobeMap - Cesium is CDN-only, never SSR
export const GlobeMap = dynamic(() => import('@/components/GlobeMap'), {
  ssr: false,
  loading: () => <div className="w-full h-[480px] bg-surface-0 rounded-2xl flex items-center justify-center"><span className="text-ink-500 text-sm">Loading map…</span></div>,
});