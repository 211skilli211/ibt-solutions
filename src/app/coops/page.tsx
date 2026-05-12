import Link from 'next/link';
import CoopCard from '@/components/CoopCard';

export const metadata = {
  title: 'IBT Co-operative Federation | IBT Solutions',
  description: 'Join the IBT Co-operative Federation - democratic, member-owned cooperatives supported by IBT Solutions as temporary facilitator.',
};

const phaseOneCoops = [
  {
    title: 'Trades & Services Cooperative',
    description: 'Skilled tradespeople, service providers, and craftsmen uniting to offer collective expertise, shared contracts, and professional development.',
    icon: '🔧',
    href: '/coops/trades',
    features: ['Contract Pooling', 'Skill Development', 'Equipment Sharing', 'Quality Standards'],
    status: 'founding' as const,
  },
  {
    title: 'Graphic Trends Micro-Manufacturing',
    description: 'Local micro-manufacturing of branded merchandise, print-on-demand products, and promotional materials with sustainable practices.',
    icon: '🎨',
    href: '/coops/graphic-trends',
    features: ['Print-on-Demand', 'Branded Merch', 'Sustainable Materials', 'Digital Design'],
    status: 'founding' as const,
  },
  {
    title: 'Micro-Farms Cooperative',
    description: 'Connecting small-scale farmers and urban growers to share resources, knowledge, and access to the IslandHub marketplace.',
    icon: '🌱',
    href: '/coops/micro-farms',
    features: ['Urban Farming', 'Organic Produce', 'Market Access', 'Resource Sharing'],
    status: 'founding' as const,
  },
  {
    title: 'Storage & Logistics Cooperative',
    description: 'Community-owned storage solutions and logistics network for small businesses and cooperatives across the island.',
    icon: '📦',
    href: '#',
    features: ['Shared Warehousing', 'Last-Mile Delivery', 'Inventory Management', 'Cold Storage'],
    status: 'coming-soon' as const,
  },
  {
    title: 'Garden-to-Table Cooperative',
    description: 'Farm-to-consumer supply chain connecting local growers with restaurants, hotels, and households seeking fresh local produce.',
    icon: '🍽️',
    href: '#',
    features: ['Farm Fresh', 'Restaurant Supply', 'Meal Kits', 'Subscription Boxes'],
    status: 'coming-soon' as const,
  },
];

const foundingBenefits = [
  'Founding member voting rights from day one',
  'Shape the cooperative governance structure',
  'First access to shared resources and contracts',
  'Reduced joining fees and favorable terms',
  'Direct line to IBT Solutions support team',
  'Priority listing on IslandHub marketplace',
];

const keyRoles = [
  { role: 'Cooperative Board Members', count: '5-7 per coop', description: 'Elected positions overseeing governance and strategy.' },
  { role: 'Operations Coordinators', count: '2-3 per coop', description: 'Day-to-day management and member coordination.' },
  { role: 'Finance & Accounting Leads', count: '1-2 per coop', description: 'Member contribution tracking and profit distribution.' },
  { role: 'Marketing & Outreach', count: '2-4 per coop', description: 'Member recruitment and external partnerships.' },
];

export default function CoopsPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px]" />
      </div>

      <div className="relative pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm mb-6">
              IBT Co-operative Federation
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              Empowering Communities Through
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Democratic Ownership
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
              The IBT Co-operative Federation unites small businesses, skilled workers, and community members 
              in democratically governed cooperatives. IBT Solutions serves as temporary facilitator, 
              building infrastructure and providing tools until cooperatives can stand independently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://chat.whatsapp.com/example" target="_blank" className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Join WhatsApp Group
              </a>
              <Link href="/coops/get-involved" className="px-8 py-4 border border-slate-700 hover:border-slate-600 text-white font-medium rounded-xl transition-all">
                Express Interest
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="text-center p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-3xl">🗳️</div>
              <h3 className="text-xl font-bold text-white mb-2">Democratic Governance</h3>
              <p className="text-slate-400">One member, one vote. All decisions made collectively by member vote.</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-3xl">🤝</div>
              <h3 className="text-xl font-bold text-white mb-2">Member-Owned</h3>
              <p className="text-slate-400">Profits distributed to members based on participation, not investment.</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-500/20 flex items-center justify-center text-3xl">🚀</div>
              <h3 className="text-xl font-bold text-white mb-2">IBT Facilitation</h3>
              <p className="text-slate-400">IBT Solutions provides tools, training, and infrastructure during the founding phase.</p>
            </div>
          </div>
        </div>

        <section className="py-20 border-t border-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Phase 1 Co-operatives</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Founding cooperatives currently forming. Be a founding member and help shape the future.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {phaseOneCoops.map((coop) => (
                <CoopCard key={coop.title} {...coop} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm mb-6">
                  Founding Members
                </span>
                <h2 className="text-4xl font-bold text-white mb-6">Benefits of Joining Early</h2>
                <p className="text-slate-400 mb-8">
                  Founding members get the best terms and the most influence. As we grow, 
                  these benefits remain with the founding cohort.
                </p>
                <div className="space-y-4">
                  {foundingBenefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-white mb-6">Volunteer Roles</h2>
                <p className="text-slate-400 mb-8">
                  Help build the federation from the ground up. These volunteer positions 
                  are the backbone of our cooperative structure.
                </p>
                <div className="space-y-4">
                  {keyRoles.map((r) => (
                    <div key={r.role} className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold text-white">{r.role}</h3>
                        <span className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded-full">{r.count}</span>
                      </div>
                      <p className="text-sm text-slate-400">{r.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-slate-400 mb-8">Join the movement toward democratic, community-owned business.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/coops/get-involved" className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold rounded-xl transition-all">
                Get Involved
              </Link>
              <Link href="/coops/how-it-works" className="px-8 py-4 border border-slate-700 hover:border-slate-600 text-white font-medium rounded-xl transition-all">
                Learn How It Works
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}