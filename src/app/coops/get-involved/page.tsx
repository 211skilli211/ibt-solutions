import Link from 'next/link';
import RoleCard from '@/components/RoleCard';

export const metadata = {
  title: 'Get Involved | IBT Co-operative Federation',
  description: 'Join the IBT Co-operative Federation - express your interest, apply for membership, or join our WhatsApp community.',
};

const roles = [
  {
    title: 'Cooperative Board Member',
    description: 'Elected position overseeing governance and strategic direction of your cooperative.',
    icon: '🏛️',
    responsibilities: [
      'Attend monthly board meetings',
      'Vote on policy and budget decisions',
      'Represent member interests',
      'Guide cooperative strategy',
    ],
    requirements: ['Leadership experience', 'Good standing member', 'Available 5-10 hrs/month'],
  },
  {
    title: 'Operations Coordinator',
    description: 'Manages day-to-day activities, member coordination, and operational logistics.',
    icon: '⚙️',
    responsibilities: [
      'Coordinate member schedules',
      'Manage project assignments',
      'Track participation hours',
      'Handle member communications',
    ],
    requirements: ['Organizational skills', 'Communication proficiency', 'Basic tech knowledge'],
  },
  {
    title: 'Finance & Accounting Lead',
    description: 'Handles member contribution tracking, profit distribution, and financial reporting.',
    icon: '💰',
    responsibilities: [
      'Track revenue and expenses',
      'Calculate profit distributions',
      'Prepare financial reports',
      'Manage member accounts',
    ],
    requirements: ['Basic accounting knowledge', 'Attention to detail', 'Spreadsheet proficiency'],
  },
  {
    title: 'Marketing & Outreach Coordinator',
    description: 'Promotes the cooperative, recruits new members, and builds external partnerships.',
    icon: '📢',
    responsibilities: [
      'Manage social media presence',
      'Create promotional content',
      'Recruit new members',
      'Build business partnerships',
    ],
    requirements: ['Marketing experience', 'Social media savvy', 'Community connections'],
  },
];

const involvementOptions = [
  {
    title: 'WhatsApp Community',
    description: 'Join our active community group for real-time updates, discussions, and networking.',
    icon: '💬',
    cta: 'Join WhatsApp',
    href: 'https://chat.whatsapp.com/example',
    external: true,
  },
  {
    title: 'Interest Form',
    description: 'Submit your details and we will contact you within 48 hours with next steps.',
    icon: '📝',
    cta: 'Express Interest',
    href: '#interest-form',
    external: false,
  },
  {
    title: 'Founding Member Application',
    description: 'Apply for founding member status and secure your place in the federation.',
    icon: '🌟',
    cta: 'Apply Now',
    href: '#application',
    external: false,
  },
];

export default function GetInvolvedPage() {
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
              <Link href="/coops/get-involved" className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 text-sm font-medium rounded-lg transition-colors">Get Involved</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Link href="/coops" className="text-sm text-slate-400 hover:text-white transition-colors">IBT Co-ops</Link>
              <span className="text-slate-600">/</span>
              <span className="text-sm text-slate-300">Get Involved</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              Join the
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Movement
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Multiple ways to get involved. Whether you want to contribute skills, invest time, 
              or simply stay informed - there is a place for you in the IBT Co-operative Federation.
            </p>
          </div>
        </div>
      </section>

      {/* Involvement Options */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {involvementOptions.map((option) => (
              <a
                key={option.title}
                href={option.href}
                target={option.external ? '_blank' : '_self'}
                className="group relative p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all"
              >
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-3xl mb-6">
                  {option.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{option.title}</h3>
                <p className="text-slate-400 mb-6">{option.description}</p>
                <div className="flex items-center text-cyan-400 font-medium group-hover:text-cyan-300">
                  {option.cta}
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Available Roles */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Available Roles</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Each cooperative needs dedicated members. These are volunteer positions with 
              time commitments ranging from 5-15 hours per month.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roles.map((role) => (
              <RoleCard key={role.title} {...role} />
            ))}
          </div>
        </div>
      </section>

      {/* Interest Form */}
      <section id="interest-form" className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
            <h2 className="text-3xl font-bold text-white mb-2">Express Your Interest</h2>
            <p className="text-slate-400 mb-8">Tell us about yourself and how you would like to contribute.</p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">First Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="Your first name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="Your last name" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="your@email.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Phone / WhatsApp</label>
                <input type="tel" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="+1 (000) 000-0000" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Which cooperative interests you?</label>
                <select className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors">
                  <option value="">Select a cooperative...</option>
                  <option value="trades">Trades & Services Cooperative</option>
                  <option value="graphic-trends">Graphic Trends Micro-Manufacturing</option>
                  <option value="micro-farms">Micro-Farms Cooperative</option>
                  <option value="storage">Storage & Logistics Cooperative</option>
                  <option value="garden">Garden-to-Table Cooperative</option>
                  <option value="multiple">Multiple / Not Sure Yet</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">What skills or experience do you bring?</label>
                <textarea className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors h-32" placeholder="Tell us about your background, skills, and how you can contribute..." />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">How much time can you commit?</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {['1-5 hrs/week', '5-10 hrs/week', '10+ hrs/week'].map((time) => (
                    <label key={time} className="flex items-center gap-3 p-4 rounded-xl bg-slate-800 border border-slate-700 cursor-pointer hover:border-cyan-500/50 transition-colors">
                      <input type="radio" name="time-commitment" value={time} className="w-4 h-4 text-cyan-500 bg-slate-700 border-slate-600 focus:ring-cyan-500" />
                      <span className="text-sm text-slate-300">{time}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl transition-all">
                  Submit Interest
                </button>
                <p className="text-xs text-slate-500 text-center mt-3">We will respond within 48 hours.</p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* IslandHub Integration */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-3xl">🏝️</div>
          <h2 className="text-3xl font-bold text-white mb-4">IslandHub Marketplace Integration</h2>
          <p className="text-slate-400 mb-6">
            All IBT Co-operatives will be integrated with the IslandHub marketplace, giving members 
            access to a regional platform for selling products and services, managing orders, and reaching customers across the Caribbean.
          </p>
          <a href="https://islandhub.app" target="_blank" className="inline-flex items-center gap-2 text-emerald-400 font-medium hover:text-emerald-300">
            Visit IslandHub Marketplace
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
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