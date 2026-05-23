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
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Democratic Governance</h3>
              <p className="text-slate-400">One member, one vote. All decisions made collectively by member vote.</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Member-Owned</h3>
              <p className="text-slate-400">Profits distributed to members based on participation, not investment.</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
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

        <section className="py-20 border-t border-slate-800/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="relative p-12 rounded-3xl bg-gradient-to-br from-emerald-900/30 to-cyan-900/30 border border-emerald-500/20">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/20">
                <span className="text-slate-900 font-bold text-sm">Join the Movement</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-4">
                Be Part of Something Bigger
              </h2>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                The IBT Co-operative Federation is more than a business network — it is a movement toward 
                community ownership, shared prosperity, and Caribbean self-reliance. Whether you have 
                skills to offer, capital to invest, or simply believe in the vision — there is a place for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://chat.whatsapp.com/example" 
                  target="_blank" 
                  className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Join Our Community
                </a>
                <Link href="/coops/get-involved" className="px-8 py-4 border border-emerald-500/50 hover:border-emerald-400 text-emerald-400 font-medium rounded-xl transition-all flex items-center justify-center gap-2">
                  Express Interest
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ IBT COOPERATIVE ECOSYSTEM ═══ */}
        <section className="py-24 relative overflow-hidden">
          {/* Background accents */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
          <div className="absolute top-20 right-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 left-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-[100px]" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-20">
              <span className="inline-block px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm mb-6">
                The Cooperative Ecosystem
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                The IBT Cooperative
                <br />
                <span className="bg-gradient-to-r from-amber-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Ecosystem
                </span>
              </h2>
              <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
                A comprehensive framework for democratic ownership, shared prosperity, and Caribbean self-reliance — 
                rooted in St. Kitts & Nevis law and built for the communities we serve.
              </p>
            </div>

            {/* Legal Framework */}
            <div className="mb-20">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-2xl">⚖️</div>
                <h3 className="text-2xl font-bold text-white">Legal Framework</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/30 transition-colors">
                  <h4 className="text-lg font-bold text-emerald-400 mb-3">St. Kitts & Nevis Co-operative Societies Act 2011</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    All IBT co-operatives are registered under the Co-operative Societies Act 2011 (No. 10 of 2011), 
                    which governs the formation, regulation, and operation of co-operatives in St. Kitts & Nevis. 
                    This legislation provides the legal foundation for democratic member-owned enterprises.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">▸</span>
                      Registration with the Registrar of Co-operative Societies
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">▸</span>
                      By-laws drafted and approved by founding members
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">▸</span>
                      Annual general meetings with full member participation
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">▸</span>
                      Compliance with reserve fund requirements
                    </li>
                  </ul>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/30 transition-colors">
                  <h4 className="text-lg font-bold text-cyan-400 mb-3">St. Kitts & Nevis Chamber of Commerce</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    The SKCCU (St. Kitts & Nevis Chamber of Commerce, Industry, and Consumer Unity) has demonstrated 
                    the viability of the cooperative model locally. In 2023, SKCCU distributed a notable 6% dividend 
                    to its members — proof that member-owned enterprises can deliver real returns.
                  </p>
                  <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
                    <p className="text-cyan-300 text-sm font-medium">
                      "The cooperative model isn't theoretical in St. Kitts & Nevis — it's delivering measurable returns 
                      to real people. IBT Solutions exists to scale that success."
                    </p>
                    <p className="text-slate-500 text-xs mt-2">— IBT Solutions Cooperative Development Team</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Compensation System */}
            <div className="mb-20">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-2xl">💰</div>
                <h3 className="text-2xl font-bold text-white">Compensation System</h3>
              </div>
              <p className="text-slate-400 max-w-3xl mb-8">
                Members earn through a three-tier compensation model designed to reward both labor and participation. 
                This system ensures fair compensation while building long-term member wealth.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-gradient-to-b from-amber-900/20 to-slate-900 border border-amber-500/20 hover:border-amber-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center text-xl mb-4">1</div>
                  <h4 className="text-lg font-bold text-amber-400 mb-2">Wages & Service Fees</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    Members who provide labor or services to the cooperative are paid competitive rates. 
                    The current minimum wage benchmark in St. Kitts & Nevis is EC$500/week — IBT co-operatives 
                    compensate above this baseline.
                  </p>
                  <div className="px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <span className="text-amber-300 text-xs font-bold">Benchmark: EC$500/week minimum</span>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-b from-emerald-900/20 to-slate-900 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-xl mb-4">2</div>
                  <h4 className="text-lg font-bold text-emerald-400 mb-2">Patronage Dividends</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    Annual profits are returned to members proportional to their participation and patronage. 
                    Unlike shareholder dividends based on capital invested, patronage dividends reward members 
                    who actively use and contribute to the cooperative.
                  </p>
                  <div className="px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <span className="text-emerald-300 text-xs font-bold">SKCCU paid 6% dividend to members (2023)</span>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-b from-cyan-900/20 to-slate-900 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center text-xl mb-4">3</div>
                  <h4 className="text-lg font-bold text-cyan-400 mb-2">IBT Points System</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    A parallel loyalty and contribution tracking system. Members earn IBT Points for participation, 
                    referrals, and milestone achievements. Points unlock tiered benefits, priority access, 
                    and governance weight within the federation.
                  </p>
                  <div className="px-3 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                    <span className="text-cyan-300 text-xs font-bold">Participation → Points → Privileges</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Island Context */}
            <div className="mb-20">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-2xl">🏝️</div>
                <h3 className="text-2xl font-bold text-white">Built for St. Kitts & Nevis</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                  <span className="text-3xl mb-3 block">🧂</span>
                  <h4 className="font-bold text-white text-sm mb-1">Sea Moss & Salt</h4>
                  <p className="text-slate-500 text-xs">Frigate Bay salt ponds and sea moss cultivation as coop products</p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                  <span className="text-3xl mb-3 block">🎭</span>
                  <h4 className="font-bold text-white text-sm mb-1">Carnival Economy</h4>
                  <p className="text-slate-500 text-xs">Event services, costumes, and hospitality through co-op structures</p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                  <span className="text-3xl mb-3 block">⛰️</span>
                  <h4 className="font-bold text-white text-sm mb-1">Mt. Liamuiga</h4>
                  <p className="text-slate-500 text-xs">Tours, farming, and eco-tourism cooperatives serving the mountain region</p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                  <span className="text-3xl mb-3 block">⚓</span>
                  <h4 className="font-bold text-white text-sm mb-1">Frigate Bay</h4>
                  <p className="text-slate-500 text-xs">Marine charters, watersports, and coastal commerce cooperatives</p>
                </div>
              </div>
            </div>

            {/* Governance Timeline */}
            <div className="mb-20">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-2xl">🗳️</div>
                <h3 className="text-2xl font-bold text-white">Path to Independence</h3>
              </div>
              <div className="space-y-4">
                {[
                  { phase: 'Phase 1 — Foundation', desc: 'IBT Solutions provides infrastructure, training, and seed funding. Founding members draft by-laws and register under the Act.', active: true },
                  { phase: 'Phase 2 — Growth', desc: 'Co-operatives begin operations, build revenue, and recruit members. IBT gradually reduces direct involvement.', active: false },
                  { phase: 'Phase 3 — Self-Governance', desc: 'Elected boards take full operational control. IBT transitions to advisory role only.', active: false },
                  { phase: 'Phase 4 — Federation', desc: 'Independent co-operatives join the IBT Federation for shared services, purchasing power, and mutual support.', active: false },
                ].map((item, i) => (
                  <div key={i} className={`flex items-start gap-4 p-5 rounded-2xl border transition-colors ${item.active ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-slate-900/50 border-slate-800'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${item.active ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                      {item.active ? '✓' : i + 1}
                    </div>
                    <div>
                      <h4 className={`font-bold ${item.active ? 'text-emerald-400' : 'text-white'}`}>{item.phase}</h4>
                      <p className="text-slate-400 text-sm mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
              {[
                { value: '2011', label: 'Co-operative Societies Act', sub: 'Legal foundation' },
                { value: '6%', label: 'SKCCU Dividend (2023)', sub: 'Proven model' },
                { value: '$500', label: 'Weekly Minimum (EC$)', sub: 'Compensation baseline' },
                { value: '100%', label: 'Member Ownership', sub: 'Democratic governance' },
              ].map((stat, i) => (
                <div key={i} className="text-center p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="text-2xl font-black text-emerald-400 mb-1">{stat.value}</div>
                  <div className="text-xs font-bold text-white mb-1">{stat.label}</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}