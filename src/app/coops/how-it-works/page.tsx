import Link from 'next/link';
import PageHero from '@/components/PageHero';

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
    powers: ['Operational execution', 'Member onboarding', 'Quality assurance', 'Community engagement'],
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px]" />
      </div>

      <div className="relative pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/coops" className="hover:text-white transition-colors">IBT Co-ops</Link>
            <span>/</span>
            <span className="text-white">How It Works</span>
          </nav>

          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              How the Federation
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Operates
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              A clear path from IBT facilitation to full cooperative independence, 
              with democratic governance and fair profit distribution at every step.
            </p>
          </div>
        </div>
      </div>

      {/* Three Phases */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">The Three-Phase Journey</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              From establishment to independence, each phase builds capacity for the next.
            </p>
          </div>

          <div className="space-y-8">
            {phases.map((phase, index) => (
              <div key={phase.phase} className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-800" />
                <div className="relative flex flex-col lg:flex-row gap-8 p-8 rounded-3xl bg-slate-900/50 border border-slate-800 ml-4 lg:ml-0">
                  <div className="absolute -left-4 top-8 w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-slate-900 font-bold text-lg">
                    {phase.phase}
                  </div>
                  <div className="lg:w-1/3">
                    <span className="inline-block px-3 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-400 mb-2">{phase.duration}</span>
                    <h3 className="text-2xl font-bold text-white mb-2">{phase.title}</h3>
                    <p className="text-slate-400">{phase.description}</p>
                  </div>
                  <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-emerald-400 mb-3">Key Activities</h4>
                      <ul className="space-y-2">
                        {phase.activities.map((activity) => (
                          <li key={activity} className="flex items-start gap-2 text-sm text-slate-300">
                            <svg className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-800/50">
                      <h4 className="text-sm font-medium text-amber-400 mb-2">IBT Solutions Role</h4>
                      <p className="text-sm text-slate-300">{phase.ibtRole}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance Structure */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Democratic Governance</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Every member has equal voice. Decision-making flows from the bottom up.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {governanceStructure.map((level, index) => (
              <div key={level.level} className="text-center p-8 rounded-3xl bg-slate-900 border border-slate-800">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center text-2xl font-bold text-cyan-400">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{level.level}</h3>
                <p className="text-slate-400 text-sm mb-6">{level.description}</p>
                <div className="text-left">
                  <h4 className="text-xs font-medium text-slate-500 mb-2">Powers:</h4>
                  <ul className="space-y-1">
                    {level.powers.map((power) => (
                      <li key={power} className="flex items-center gap-2 text-xs text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                        {power}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Profit Distribution */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-12 border border-slate-700">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Profit Distribution Model</h2>
            <p className="text-slate-400 mb-8 text-center">
              Unlike traditional businesses, cooperatives distribute profits based on participation, not ownership shares.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-xl">💰</div>
                  <div>
                    <div className="font-medium text-white">Revenue Generated</div>
                    <div className="text-sm text-slate-400">Total income from services and sales</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-white">100%</div>
              </div>
              
              <div className="flex justify-center">
                <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                  <div className="text-2xl font-bold text-cyan-400 mb-2">60%</div>
                  <div className="font-medium text-white">Member Distribution</div>
                  <div className="text-sm text-slate-400">Based on participation hours and contribution</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                  <div className="text-2xl font-bold text-emerald-400 mb-2">25%</div>
                  <div className="font-medium text-white">Co-op Reserve</div>
                  <div className="text-sm text-slate-400">Operational costs, upgrades, emergency fund</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                  <div className="text-2xl font-bold text-amber-400 mb-2">15%</div>
                  <div className="font-medium text-white">Development Fund</div>
                  <div className="text-sm text-slate-400">Training, new member onboarding, community programs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Learn More?</h2>
          <p className="text-slate-400 mb-8">Join the WhatsApp group or explore other ways to get involved.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://chat.whatsapp.com/example" target="_blank" className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold rounded-xl transition-all">
              Join WhatsApp Group
            </a>
            <Link href="/coops/get-involved" className="px-8 py-4 border border-slate-700 hover:border-slate-600 text-white font-medium rounded-xl transition-all">
              Get Involved
            </Link>
          </div>
        </div>
      </section>

      
    </div>
  );
}