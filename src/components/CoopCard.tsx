'use client';

import Link from 'next/link';

interface CoopCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  features: string[];
  status?: 'active' | 'coming-soon' | 'founding';
}

const coopImages: Record<string, string> = {
  'Trades & Services Cooperative': 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop',
  'Graphic Trends Micro-Manufacturing': 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop',
  'Micro-Farms Cooperative': 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
  'Storage & Logistics Cooperative': 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&h=400&fit=crop',
  'Garden-to-Table Cooperative': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop',
};

export default function CoopCard({ title, description, icon, href, features, status = 'coming-soon' }: CoopCardProps) {
  const imageUrl = coopImages[title];

  return (
    <Link href={href} className="group block">
      <div className="relative rounded-3xl overflow-hidden bg-surface-1 border border-surface-2 group-hover:border-ink-700 transition-all h-full">
        {imageUrl && (
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            {status === 'founding' && (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Founding Phase
              </span>
            )}
            {status === 'coming-soon' && (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Coming Soon
              </span>
            )}
          </div>
          
          <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
          <p className="text-ink-400 text-sm mb-4">{description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {features.slice(0, 3).map((feature) => (
              <span key={feature} className="px-3 py-1 text-xs rounded-full bg-surface-2 text-ink-400">
                {feature}
              </span>
            ))}
          </div>
          
          <div className="flex items-center text-sm font-medium text-cyan-400 group-hover:text-cyan-300">
            <span>Learn More</span>
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}