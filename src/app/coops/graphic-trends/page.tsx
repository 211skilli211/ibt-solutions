import Link from 'next/link';
import PageHero from '@/components/PageHero';

export const metadata = {
  title: 'Graphic Trends Micro-Manufacturing | IBT Co-operative Federation',
  description: 'Local micro-manufacturing of branded merchandise and print-on-demand products through the IBT Co-operative Federation.',
};

const products = [
  { category: 'Apparel', items: ['T-Shirts', 'Hoodies', 'Caps', 'Workwear'] },
  { category: 'Print', items: ['Business Cards', 'Flyers', 'Banners', 'Stickers'] },
  { category: 'Promotional', items: ['Mugs', 'Keychains', 'Bags', 'Water Bottles'] },
  { category: 'Signage', items: ['Vehicle Wraps', 'Window Graphics', 'Trade Show Banners'] },
];

const features = [
  { title: 'Print-on-Demand', description: 'No inventory risk - produce only what is ordered.' },
  { title: 'Sustainable Materials', description: 'Eco-friendly inks and recycled materials where possible.' },
  { title: 'Quick Turnaround', description: 'Standard 3-5 business days, expedited options available.' },
  { title: 'Design Support', description: 'In-house design team to help bring your vision to life.' },
];

export default function GraphicTrendsPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px]" />
      </div>

      <div className="relative pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/coops" className="hover:text-white transition-colors">IBT Co-ops</Link>
            <span>/</span>
            <span className="text-white">Graphic Trends</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm mb-6">
                Founding Phase
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Graphic Trends
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Micro-Manufacturing
                </span>
              </h1>
              <p className="text-xl text-slate-400 mb-8">
                Local micro-manufacturing of branded merchandise, print-on-demand products, 
                and promotional materials. Sustainable practices, quick turnaround, 
                and community-focused production.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/coops/get-involved" className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl transition-all text-center">
                  Become a Member
                </Link>
                <a href="https://chat.whatsapp.com/example" target="_blank" className="px-8 py-4 border border-slate-700 hover:border-slate-600 text-white font-medium rounded-xl transition-all text-center">
                  Join WhatsApp
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-3xl blur-xl" />
              <div className="relative grid grid-cols-2 gap-4">
                {[
                  { icon: '👕', title: 'Custom Apparel', desc: 'T-shirts, hoodies, caps' },
                  { icon: '📦', title: 'Print Products', desc: 'Cards, flyers, banners' },
                  { icon: '🎁', title: 'Promotional', desc: 'Mugs, bags, swag' },
                  { icon: '🚗', title: 'Signage', desc: 'Vehicle wraps, graphics' },
                ].map((item) => (
                  <div key={item.title} className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-transparent border border-slate-800 text-center">
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">What We Produce</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              From custom apparel to full-scale signage solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.category} className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                <h3 className="text-lg font-bold text-white mb-4">{product.category}</h3>
                <ul className="space-y-2">
                  {product.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why Choose Us</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Community-based production with professional quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-3xl">🏝️</div>
          <h2 className="text-3xl font-bold text-white mb-4">Available on IslandHub</h2>
          <p className="text-slate-400 mb-6">
            Products from this cooperative will be available through the IslandHub marketplace, 
            making it easy for customers across the Caribbean to order custom merchandise.
          </p>
          <a href="https://islandhub.app" target="_blank" className="inline-flex items-center gap-2 text-emerald-400 font-medium hover:text-emerald-300">
            Visit IslandHub Marketplace
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </section>

      <section className="py-20 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join the Cooperative</h2>
          <p className="text-slate-400 mb-8">Whether you are a designer, production specialist, or want to support local manufacturing.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/coops/get-involved" className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl transition-all">
              Express Interest
            </Link>
            <a href="https://chat.whatsapp.com/example" target="_blank" className="px-8 py-4 border border-slate-700 hover:border-slate-600 text-white font-medium rounded-xl transition-all">
              Join WhatsApp Group
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}