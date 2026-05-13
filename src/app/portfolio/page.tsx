'use client';

import Link from 'next/link';

const aims = [
  {
    title: 'Empower Caribbean Businesses',
    description: 'Provide affordable, professional-grade technology solutions that help Caribbean businesses compete globally.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Build Cooperative Infrastructure',
    description: 'Establish democratic, member-owned cooperatives that provide sustainable income and community resilience.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Open Data & APIs',
    description: 'Develop proprietary geospatial and business APIs for the Caribbean, creating data infrastructure that benefits the entire region.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  },
  {
    title: 'Community-Led Growth',
    description: 'Ensure technology serves people, not the other way around — every product and service designed with community benefit at its core.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const projects = [
  {
    title: 'IslandHub Marketplace',
    description: 'Complete Caribbean marketplace — vendor stores, food delivery, rides, auctions, secure payments.',
    tags: ['Next.js', 'PostgreSQL', 'Stripe'],
    status: 'Live',
    href: 'https://islandhub-a8hkyd2ry-rpskilli211-3018s-projects.vercel.app',
    image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=600&h=350&fit=crop',
  },
  {
    title: 'IBT Co-operative Federation',
    description: 'Multi-cooperative platform — Trades & Services, Micro-Farms, Micro-Manufacturing under democratic governance.',
    tags: ['Next.js', 'Neon', 'WhatsApp'],
    status: 'Building',
    href: '/coops',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=350&fit=crop',
  },
  {
    title: 'Business API Suite',
    description: 'APIs for currency exchange, geospatial mapping, accounting integrations, inventory management.',
    tags: ['REST API', 'Node.js', 'OpenAI'],
    status: 'Live',
    href: '/api-services',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=350&fit=crop',
  },
  {
    title: 'Graphic Trends Co-op',
    description: 'Custom apparel, print-on-demand merchandise, sustainable promotional materials.',
    tags: ['E-commerce', 'Design'],
    status: 'Launching',
    href: '/coops/graphic-trends',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=350&fit=crop',
  },
  {
    title: 'AI Digital Influencer',
    description: 'AI-powered influencers with authentic Caribbean accents for marketing and social media.',
    tags: ['AI', 'Voice Cloning'],
    status: 'Beta',
    href: '/influencer',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=350&fit=crop',
  },
  {
    title: 'Regional Intel',
    description: 'Caribbean-focused mapping, POI data, events, weather integration, marine conditions.',
    tags: ['Maps', 'GIS'],
    status: 'Building',
    href: '/geospatial',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=350&fit=crop',
  },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Portfolio</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Building the future of Caribbean commerce through technology, community, and innovation.
          </p>
        </div>

        {/* Aims & Objectives */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Our Mission & Aims</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm">
              What drives every project, product, and decision at IBT Solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {aims.map((aim) => (
              <div
                key={aim.title}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/30 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-3">
                  {aim.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{aim.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{aim.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Grid */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Our Work</h2>
            <p className="text-slate-400 text-sm">Products, platforms, and services we have built and are building.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project) => (
              <a
                key={project.title}
                href={project.href}
                target={project.href.startsWith('http') ? '_blank' : undefined}
                rel={project.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group block rounded-xl overflow-hidden bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <span className={`px-2 py-0.5 text-[10px] rounded-full ${
                      project.status === 'Live' ? 'bg-emerald-500/20 text-emerald-400' :
                      project.status === 'Building' ? 'bg-cyan-500/20 text-cyan-400' :
                      project.status === 'Beta' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-slate-500/20 text-slate-400'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-3 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 text-[10px] rounded-full bg-slate-800 text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <div className="mt-12 text-center p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
          <p className="text-slate-400 mb-4 text-sm">
            Interested in working together or contributing to these projects?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl transition-all text-sm"
            >
              Get in Touch
            </Link>
            <Link
              href="/coops"
              className="px-6 py-3 border border-slate-700 hover:border-slate-600 text-white font-medium rounded-xl transition-all text-sm"
            >
              Join IBT Co-ops
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/founder" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
            About the founder →
          </Link>
        </div>
      </div>
    </div>
  );
}