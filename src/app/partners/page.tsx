import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Partners | IBT Solutions',
  description: 'Explore our partner brands and businesses across the Caribbean.',
};

const partners = [
  {
    name: 'Horizon Salt Co.',
    description: 'Premium hand-harvested sea salt from the pristine salt ponds of St. Kitts & Nevis. Rich in minerals, sustainably sourced, and crafted with Caribbean heritage.',
    href: '/horizon-salt',
    icon: '🧂',
    color: '#d97706',
    tag: 'Product Partner',
  },
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="relative py-24 md:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-900/20 to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-400 text-xs font-bold uppercase tracking-[0.3em] mb-6">
            🤝 Our Partners
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Partner <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Brands</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            We collaborate with exceptional Caribbean businesses to bring you authentic products and services. Each partner is carefully selected for quality and shared values.
          </p>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {partners.map((partner) => (
            <Link
              key={partner.name}
              href={partner.href}
              className="group relative bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-teal-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-500/5"
            >
              <div className="absolute top-4 right-4">
                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-slate-800 text-slate-400">
                  {partner.tag}
                </span>
              </div>
              <div className="text-5xl mb-4">{partner.icon}</div>
              <h2 className="text-2xl font-black mb-3 group-hover:text-teal-400 transition-colors">{partner.name}</h2>
              <p className="text-slate-400 leading-relaxed mb-6">{partner.description}</p>
              <div className="flex items-center gap-2 text-sm font-bold text-teal-400 group-hover:gap-3 transition-all">
                Visit Partner <span>→</span>
              </div>
            </Link>
          ))}

          {/* Add New Partner Card */}
          <div className="relative bg-slate-900/50 border-2 border-dashed border-slate-700 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-slate-600 transition-colors min-h-[280px]">
            <div className="text-4xl mb-4 opacity-30">➕</div>
            <h3 className="text-lg font-bold text-slate-500 mb-2">Become a Partner</h3>
            <p className="text-sm text-slate-600 mb-4">Interested in partnering with IBT Solutions?</p>
            <Link href="/contact" className="text-sm font-bold text-teal-400 hover:text-teal-300 transition-colors">
              Get in Touch →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-800 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-4">Explore All Partner Stores on IslandHub</h2>
          <p className="text-slate-400 mb-8">Visit our marketplace to discover products from all our partners and local vendors.</p>
          <a
            href="https://islandhub-git-master-rpskilli211-3018s-projects.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-teal-500 hover:bg-teal-400 text-white font-bold rounded-xl transition-colors shadow-lg"
          >
            Visit IslandHub
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
