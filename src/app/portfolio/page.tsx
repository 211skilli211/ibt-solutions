'use client';

import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { Section, SectionHeader, Card, Badge, GradientText } from '@/components/ui';

const aims = [
  { title: 'Empower Caribbean Businesses', description: 'Provide affordable, professional-grade technology solutions that help Caribbean businesses compete globally.', icon: '💼' },
  { title: 'Build Cooperative Infrastructure', description: 'Establish democratic, member-owned cooperatives that provide sustainable income and community resilience.', icon: '🤝' },
  { title: 'Open Data & APIs', description: 'Develop proprietary geospatial and business APIs for the Caribbean, creating data infrastructure that benefits the entire region.', icon: '📊' },
  { title: 'Community-Led Growth', description: 'Ensure technology serves people, not the other way around — every product and service designed with community benefit at its core.', icon: '🌱' },
];

const projects = [
  { title: 'IslandHub Marketplace', description: 'Complete Caribbean marketplace — vendor stores, food delivery, rides, auctions, secure payments.', tags: ['Next.js', 'PostgreSQL', 'Stripe'], status: 'Live', href: 'https://islandhub-a8hkyd2ry-rpskilli211-3018s-projects.vercel.app', image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=600&h=350&fit=crop' },
  { title: 'IBT Co-operative Federation', description: 'Multi-cooperative platform — Trades & Services, Micro-Farms, Micro-Manufacturing under democratic governance.', tags: ['Next.js', 'Neon', 'WhatsApp'], status: 'Building', href: '/coops', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=350&fit=crop' },
  { title: 'Business API Suite', description: 'APIs for currency exchange, geospatial mapping, accounting integrations, inventory management.', tags: ['REST API', 'Node.js', 'OpenAI'], status: 'Live', href: '/api-services', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=350&fit=crop' },
  { title: 'Graphic Trends Co-op', description: 'Custom apparel, print-on-demand merchandise, sustainable promotional materials.', tags: ['E-commerce', 'Design'], status: 'Launching', href: '/coops/graphic-trends', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=350&fit=crop' },
  { title: 'AI Digital Influencer', description: 'AI-powered influencers with authentic Caribbean accents for marketing and social media.', tags: ['AI', 'Voice Cloning'], status: 'Beta', href: '/influencer', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=350&fit=crop' },
  { title: 'Regional Intel', description: 'Caribbean-focused mapping, POI data, events, weather integration, marine conditions.', tags: ['Maps', 'GIS'], status: 'Building', href: '/geospatial', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=350&fit=crop' },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-surface-0">
      <PageHero
        pageKey="ibt-portfolio"
        fallback={{
          badge: 'Our Work',
          badgeVariant: 'teal',
          title: 'Portfolio',
          subtitle: 'Building the future of Caribbean commerce through technology, community, and innovation.',
          bgImage: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1920&h=1080&fit=crop',
        }}
      />

      {/* Aims & Objectives */}
      <Section>
        <SectionHeader badge="Mission" title="Our Aims & Objectives" subtitle="What drives every project, product, and decision at IBT Solutions." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {aims.map((aim) => (
            <Card key={aim.title} hover>
              <div className="text-3xl mb-3">{aim.icon}</div>
              <h3 className="text-base font-bold text-white mb-2">{aim.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{aim.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Projects Grid */}
      <Section>
        <SectionHeader badge="Our Work" title="Projects & Platforms" subtitle="Products, platforms, and services we have built and are building." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <Link
              key={project.title}
              href={project.href}
              target={project.href.startsWith('http') ? '_blank' : undefined}
              rel={project.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group block rounded-xl overflow-hidden bg-surface-1 border border-surface-3 hover:border-teal-500/30 transition-all"
            >
              <div className="aspect-video overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-white group-hover:text-teal-400 transition-colors">{project.title}</h3>
                  <Badge variant={project.status === 'Live' ? 'emerald' : project.status === 'Building' ? 'teal' : project.status === 'Beta' ? 'sunset' : 'slate'} size="sm">{project.status}</Badge>
                </div>
                <p className="text-xs text-slate-400 mb-3 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-[10px] rounded-full bg-surface-2 text-slate-400">{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="text-center p-6 rounded-2xl bg-surface-1 border border-surface-3">
          <p className="text-slate-400 mb-4 text-sm">Interested in working together or contributing to these projects?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-teal-500 hover:bg-teal-400 text-ocean-900 font-bold rounded-xl transition-all text-sm">Get in Touch</Link>
            <Link href="/coops" className="inline-flex items-center justify-center px-6 py-3 border border-surface-3 hover:border-teal-500/50 text-white font-medium rounded-xl transition-all text-sm">Join IBT Co-ops</Link>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Link href="/founder" className="text-sm text-slate-400 hover:text-teal-400 transition-colors inline-flex items-center gap-1">
            Meet the Founder →
          </Link>
        </div>
      </Section>
    </div>
  );
}
