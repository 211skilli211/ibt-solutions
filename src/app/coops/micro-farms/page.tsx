import Link from 'next/link';

export const metadata = {
  title: 'Micro-Farms Cooperative | IBT Co-operative Federation',
  description: 'Connecting small-scale farmers and urban growers through the IBT Co-operative Federation with shared resources and market access.',
};

const offerings = [
  { title: 'Fresh Produce', description: 'Seasonal vegetables, herbs, and fruits from local farms.', icon: '🥬' },
  { title: 'Organic Options', description: 'Certified organic produce grown without synthetic inputs.', icon: '🌿' },
  { title: 'Farm Shares', description: 'Weekly or bi-weekly subscription boxes of fresh harvest.', icon: '📦' },
  { title: 'Wholesale Supply', description: 'Restaurants, hotels, and retailers can source locally.', icon: '🏨' },
];

const benefits = [
  { title: 'Shared Resources', description: 'Pool equipment, seeds, and supplies to reduce individual costs.' },
  { title: 'Knowledge Exchange', description: 'Learn from experienced growers and share best practices.' },
  { title: 'Market Access', description: 'Direct connection to restaurants, hotels, and IslandHub customers.' },
  { title: 'Distribution Network', description: 'Shared logistics and cold chain infrastructure.' },
];

export default function MicroFarmsPage() {
  return (
    <div className="bg-slate-950 min-h-screen">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">IBT</span>
              <span className="text-sm text-slate-500 font-medium">Solutions</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/services" className="text-sm text-slate-300 hover:text-white transition-colors">Services</Link>
              <Link href="/coops" className="text-sm text-emerald-400 font-medium">IBT Co-ops</Link>
              <a href="https://islandhub.app" target="_blank" className="text-sm text-slate-300 hover:text-white transition-colors">IslandHub</a>
              <Link href="/coops/get-involved" className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 text-sm font-medium rounded-lg transition-colors">Join</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/coops" className="text-sm text-slate-400 hover:text-white transition-colors">IBT Co-ops</Link>
            <span className="text-slate-600">/</span>
            <span className="text-sm text-slate-300">Micro-Farms</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm mb-6">
                Founding Phase
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Micro-Farms
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Cooperative
                </span>
              </h1>
              <p className="text-xl text-slate-400 mb-8">
                Connecting small-scale farmers and urban growers to share resources, knowledge, 
                and access to the IslandHub marketplace. From backyard gardens to community plots 
                - everyone grows together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/coops/get-involved" className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold rounded-xl transition-all text-center">
                  Join the Co-op
                </Link>
                <a href="https://chat.whatsapp.com/example" target="_blank" className="px-8 py-4 border border-slate-700 hover:border-slate-600 text-white font-medium rounded-xl transition-all text-center">
                  Join WhatsApp
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-3xl blur-xl" />
              <div className="relative grid grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-transparent border border-slate-800">
                  <div className="text-4xl mb-3">🌱</div>
                  <h3 className="font-semibold text-white">Urban Growers</h3>
                  <p className="text-sm text-slate-400">Rooftop gardens, vertical farms</p>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/20 to-transparent border border-slate-800">
                  <div className="text-4xl mb-3">🚜</div>
                  <h3 className="font-semibold text-white">Small Farms</h3>
                  <p className="text-sm text-slate-400">1-5 acre plots</p>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-transparent border border-slate-800">
                  <div className="text-4xl mb-3">🏡</div>
                  <h3 className="font-semibold text-white">Community Plots</h3>
                  <p className="text-sm text-slate-400">Shared garden spaces</p>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-500/20 to-transparent border border-slate-800">
                  <div className="text-4xl mb-3">🌿</div>
                  <h3 className="font-semibold text-white">Herbs & Specialty</h3>
                  <p className="text-sm text-slate-400">Medical, culinary, ornamental</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">What We Offer</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              From plot to plate - connecting local growers with customers who value fresh, 
              sustainably grown produce.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offerings.map((offering) => (
              <div key={offering.title} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                <div className="text-4xl mb-4">{offering.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{offering.title}</h3>
                <p className="text-sm text-slate-400">{offering.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits for Members */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Member Benefits</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              By joining together, small growers gain advantages usually reserved for large operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-sm text-slate-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IslandHub Marketplace */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-3xl">🏝️</div>
          <h2 className="text-3xl font-bold text-white mb-4">IslandHub Marketplace Integration</h2>
          <p className="text-slate-400 mb-6">
            Micro-Farms produce will be listed on IslandHub, giving members direct access to 
            customers across the Caribbean. Manage orders, track deliveries, and grow your customer base 
            through our integrated platform.
          </p>
          <a href="https://islandhub.app" target="_blank" className="inline-flex items-center gap-2 text-emerald-400 font-medium hover:text-emerald-300">
            Visit IslandHub Marketplace
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Grow With Us</h2>
          <p className="text-slate-400 mb-8">Whether you have a backyard garden or a small farm - there is room for you.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/coops/get-involved" className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold rounded-xl transition-all">
              Express Interest
            </Link>
            <a href="https://chat.whatsapp.com/example" target="_blank" className="px-8 py-4 border border-slate-700 hover:border-slate-600 text-white font-medium rounded-xl transition-all">
              Join WhatsApp Group
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">IBT</span>
              <span className="text-sm text-slate-500">Solutions</span>
            </div>
            <p className="text-sm text-slate-500">© 2026 IBT Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}