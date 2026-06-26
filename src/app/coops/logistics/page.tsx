import Link from 'next/link';
import CoopHero from '@/components/CoopHero';

export const metadata = {
  title: 'Logistics & Distribution Cooperative | IBT Co-operative Federation',
  description: 'Community-owned logistics, warehousing, and distribution network for small businesses and cooperatives across the Caribbean.',
};

const services = [
  { name: 'Last-Mile Delivery', icon: '🚚' },
  { name: 'Cold Chain', icon: '❄️' },
  { name: 'Warehousing', icon: '🏭' },
  { name: 'Cross-Docking', icon: '🔄' },
  { name: 'Freight Forwarding', icon: '🚢' },
  { name: 'Inventory Mgmt', icon: '📋' },
  { name: 'Route Optimization', icon: '🗺️' },
  { name: 'Bulk Shipping', icon: '📦' },
];

const benefits = [
  { title: 'Shared Fleet', description: 'Access to delivery vehicles and drivers without owning your own fleet.' },
  { title: 'Warehousing Hub', description: 'Shared storage facilities with climate-controlled options for perishables.' },
  { title: 'Island-Wide Coverage', description: 'Deliver to all major Caribbean islands through our partner network.' },
  { title: 'Cost Reduction', description: 'Bulk rates and shared overhead mean lower per-unit shipping costs.' },
];

export default function LogisticsPage() {
  return (
    <div className="min-h-screen bg-ocean-900">
      <CoopHero
        pageKey="ibt-coops-logistics"
        fallback={{
          badge: '🚛 Founding Phase',
          title: 'Logistics & Distribution',
          titleGradient: 'Cooperative',
          subtitle: 'Community-owned logistics network connecting Caribbean businesses with reliable, affordable delivery and warehousing. From last-mile to cross-island freight — we move together.',
          ctaPrimary: { label: 'Join as Founding Member', href: '/coops/get-involved' },
          ctaSecondary: { label: 'Join WhatsApp', href: 'https://chat.whatsapp.com/IfkJFCpgKRn9dOLaAUzOxW' },
        }}
        rightContent={
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-3xl blur-xl" />
            <div className="relative grid grid-cols-4 gap-4">
              {services.map((service) => (
                <div key={service.name} className="p-4 rounded-2xl bg-surface-1 border border-surface-2 text-center">
                  <div className="text-3xl mb-2">{service.icon}</div>
                  <div className="text-xs text-ink-400">{service.name}</div>
                </div>
              ))}
            </div>
          </div>
        }
      />

      {/* Benefits */}
      <section className="py-20 bg-surface-1/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Member Benefits</h2>
            <p className="text-ink-400 max-w-2xl mx-auto">
              Logistics infrastructure that would be impossible for any single small business to build alone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="p-6 rounded-2xl bg-surface-1 border border-surface-2">
                <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-sm text-ink-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-surface-1 rounded-3xl p-8 border border-surface-2">
            <h2 className="text-2xl font-bold text-white mb-6">How the Network Works</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-surface-1 font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Order Placement</h3>
                  <p className="text-ink-400 text-sm">Members and IslandHub vendors submit delivery requests through the platform.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-surface-1 font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Route Consolidation</h3>
                  <p className="text-ink-400 text-sm">Orders heading to the same area are grouped for efficient delivery runs.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-surface-1 font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Pickup & Delivery</h3>
                  <p className="text-ink-400 text-sm">Co-op drivers handle pickup from vendors and delivery to customers or retail points.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-surface-1 font-bold flex-shrink-0">✓</div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Settlement</h3>
                  <p className="text-ink-400 text-sm">Transparent pricing with per-delivery billing deducted from member earnings.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IslandHub Integration */}
      <section className="py-20 bg-gradient-to-b from-ocean-900 to-surface-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-amber-500/20 flex items-center justify-center text-3xl">🏝️</div>
          <h2 className="text-3xl font-bold text-white mb-4">Integrated with IslandHub</h2>
          <p className="text-ink-400 mb-6">
            The Logistics Co-op powers delivery for IslandHub marketplace vendors. When a customer
            places an order, our network handles fulfillment — making Caribbean e-commerce actually work.
          </p>
          <a href="https://islandhub.app" target="_blank" className="inline-flex items-center gap-2 text-amber-400 font-medium hover:text-amber-300">
            Visit IslandHub Marketplace
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-surface-2">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Move With Us</h2>
          <p className="text-ink-400 mb-8">Whether you need delivery services or want to be a driver — there is a place for you.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/coops/get-involved" className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-surface-1 font-semibold rounded-xl transition-all">
              Express Interest
            </Link>
            <a href="https://chat.whatsapp.com/IfkJFCpgKRn9dOLaAUzOxW" target="_blank" className="px-8 py-4 border border-ink-700 hover:border-ink-600 text-white font-medium rounded-xl transition-all">
              Join WhatsApp Group
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
