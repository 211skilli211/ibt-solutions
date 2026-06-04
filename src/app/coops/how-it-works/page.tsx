import Link from 'next/link';
import CoopHero from '@/components/CoopHero';

export const metadata = {
  title: 'How It Works | IBT Co-operative Federation',
  description: 'Understand the democratic governance, profit-sharing model, and facilitation structure of the IBT Co-operative Federation.',
};

const phases = [
  {
    phase: 1,
    title: 'Foundation Phase',
    duration: 'Months 1-12',
    description: 'IBT Solutions provides infrastructure, training, and operational support. Co-ops learn governance and build membership.',
    activities: [
      'Establish cooperative governance structures',
      'Recruit founding members (50-100 per coop)',
      'Implement IBT-provided tools and systems',
      'Develop initial service offerings',
      'Begin profit distribution trials',
    ],
    ibtRole: 'Primary facilitator - handles operations, technology, compliance',
  },
  {
    phase: 2,
    title: 'Transition Phase',
    duration: 'Months 12-24',
    description: 'Co-ops take increasing ownership. IBT steps back from day-to-day operations while remaining available.',
    activities: [
      'Elect independent boards',
      'Member-funded operations begin',
      'Gradual transition of tools ownership',
      'Cross-coop collaboration programs',
      'Profit-sharing model finalized',
    ],
    ibtRole: 'Advisory role - support when requested, tools subsidized',
  },
  {
    phase: 3,
    title: 'Independence Phase',
    duration: 'Months 24+',
    description: 'Fully self-governed cooperatives operating independently with optional continued IBT support for shared services.',
    activities: [
      'Full member governance',
      'Self-sustaining finances',
      'Independent technology systems',
      'Own branding and marketing',
      'Optional federation membership',
    ],
    ibtRole: 'Optional partner - premium services available',
  },
];

const governanceStructure = [
  {
    level: 'Member',
    description: 'Every member has equal voting rights regardless of investment level.',
    powers: ['Vote on major decisions', 'Elect board members', 'Approve profit distribution', 'Review financial statements'],
  },
  {
    level: 'Board',
    description: 'Elected representatives overseeing cooperative strategy and operations.',
    powers: ['Strategic planning', 'Budget approval', 'Policy development', 'Member representation'],
  },
  {
    level: 'Committees',
    description: 'Specialized teams handling specific functions like finance, membership, and marketing.',
    powers: ['Day-to-day operations', 'Specialized expertise', 'Member coordination', 'Quality assurance'],
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <CoopHero
        pageKey="ibt-coops"
        fallback={{
          badge: 'How It Works',
          title: 'Democratic Governance',
          titleGradient: '& Profit Sharing',
          subtitle: 'Understand the democratic governance, profit-sharing model, and facilitation structure of the IBT Co-operative Federation.',
          ctaPrimary: { label: 'Get Involved', href: '/coops/get-involved' },
        }}
        rightContent={
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-3xl blur-xl" />
            <div className="relative space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-transparent border border-slate-800 text-center">
                <div className="text-4xl mb-3">🏛️</div>
                <h3 className="font-semibold text-white mb-1">Democratic</h3>
                <p className="text-sm text-slate-400">One member, one vote</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-slate-800 text-center">
                <div className="text-4xl mb-3">💰</div>
                <h3 className="font-semibold text-white mb-1">Profit Sharing</h3>
                <p className="text-sm text-slate-400">Based on participation</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-transparent border border-slate-800 text-center">
                <div className="text-4xl mb-3">🔄</div>
                <h3 className="font-semibold text-white mb-1">3-Phase Model</h3>
                <p className="text-sm text-slate-400">Foundation → Transition → Independence</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-teal-500/10 to-transparent border border-slate-800 text-center">
                <div className="text-4xl mb-3">🏝️</div>
                <h3 className="font-semibold text-white mb-1">Caribbean Focus</h3>
                <p className="text-sm text-slate-400">Built for locals, by locals</p>
              </div>
            </div>
          </div>
        }
      />

      {/* Phases */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">The 3-Phase Model</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">A structured path from founding to full independence.</p>
          </div>

          <div className="space-y-8">
            {phases.map((phase) => (
              <div key={phase.phase} className="p-8 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center text-slate-900 font-bold text-xl">{phase.phase}</div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{phase.title}</h3>
                    <p className="text-cyan-400 text-sm">{phase.duration}</p>
                  </div>
                </div>
                <p className="text-slate-400 mb-4">{phase.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-2">Key Activities</h4>
                    <ul className="space-y-1">
                      {phase.activities.map((activity) => (
                        <li key={activity} className="flex items-center gap-2 text-sm text-slate-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
                    <h4 className="text-sm font-semibold text-cyan-400 mb-1">IBT Role</h4>
                    <p className="text-sm text-slate-400">{phase.ibtRole}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Governance Structure</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Every member has a voice in how the cooperative operates.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {governanceStructure.map((level) => (
              <div key={level.level} className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                <h3 className="text-xl font-bold text-white mb-3">{level.level}</h3>
                <p className="text-slate-400 text-sm mb-6">{level.description}</p>
                <div className="space-y-2">
                  {level.powers.map((power) => (
                    <div key={power} className="flex items-center gap-2 text-sm text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
                      {power}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Involved?</h2>
          <p className="text-slate-400 mb-8">Join the founding phase and help shape the future of cooperative business in the Caribbean.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/coops/get-involved" className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl transition-all">
              Express Interest
            </Link>
            <a href="https://chat.whatsapp.com/IfkJFCpgKRn9dOLaAUzOxW" target="_blank" className="px-8 py-4 border border-slate-700 hover:border-slate-600 text-white font-medium rounded-xl transition-all">
              Join WhatsApp Group
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
