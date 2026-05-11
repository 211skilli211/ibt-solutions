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

export default function CoopCard({ title, description, icon, href, features, status = 'coming-soon' }: CoopCardProps) {
  return (
    <Link href={href} className="group relative block">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative p-8 rounded-3xl bg-slate-900 border border-slate-800 group-hover:border-slate-700 transition-all h-full">
        <div className="flex items-start justify-between mb-6">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-3xl backdrop-blur-sm">
            {icon}
          </div>
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
        
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-slate-400 mb-6">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {features.map((feature) => (
            <span key={feature} className="px-3 py-1 text-xs rounded-full bg-slate-800 text-slate-400">
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
    </Link>
  );
}