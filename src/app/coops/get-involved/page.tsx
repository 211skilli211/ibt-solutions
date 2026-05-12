import Link from 'next/link';
import RoleCard from '@/components/RoleCard';

export const metadata = {
  title: 'Get Involved | IBT Co-operative Federation',
  description: 'Join the IBT Co-operative Federation - express your interest, apply for membership, or join our community.',
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

export default function GetInvolvedPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px]" />
      </div>

      <div className="relative pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/coops" className="hover:text-white transition-colors">IBT Co-ops</Link>
            <span>/</span>
            <span className="text-white">Get Involved</span>
          </nav>

          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              Join the
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Movement
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Multiple ways to get involved. Whether you want to contribute skills, invest time, 
              or simply stay informed — there is a place for you in the IBT Co-operative Federation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            <a
              href="https://chat.whatsapp.com/example"
              target="_blank"
              rel="noopener noreferrer"
              className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 hover:border-emerald-500/50 transition-all group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center text-3xl">
                  💬
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">WhatsApp Community</h3>
                  <p className="text-sm text-emerald-400">Join our active group</p>
                </div>
              </div>
              <p className="text-slate-400">
                Real-time updates, discussions, and networking with other members.
              </p>
              <div className="mt-4 flex items-center text-emerald-400 font-medium group-hover:text-emerald-300">
                Join WhatsApp Group
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </a>

            <a
              href="https://t.me/example"
              target="_blank"
              rel="noopener noreferrer"
              className="p-8 rounded-2xl bg-sky-500/10 border border-sky-500/30 hover:border-sky-500/50 transition-all group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-sky-500/20 flex items-center justify-center text-3xl">
                  ✈️
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Telegram Channel</h3>
                  <p className="text-sm text-sky-400">News and announcements</p>
                </div>
              </div>
              <p className="text-slate-400">
                Get updates, news, and announcements delivered to your Telegram.
              </p>
              <div className="mt-4 flex items-center text-sky-400 font-medium group-hover:text-sky-300">
                Join Telegram Channel
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </a>
          </div>

          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Available Roles</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Volunteer positions with time commitments ranging from 5-15 hours per month.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roles.map((role) => (
                <RoleCard key={role.title} {...role} />
              ))}
            </div>
          </section>

          <section id="interest-form" className="max-w-2xl mx-auto">
            <div className="bg-slate-900/50 rounded-3xl p-8 border border-slate-800">
              <h2 className="text-2xl font-bold text-white mb-2">Express Your Interest</h2>
              <p className="text-slate-400 mb-8">Tell us about yourself and how you would like to contribute.</p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">First Name *</label>
                    <input type="text" required className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="Your first name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Last Name *</label>
                    <input type="text" required className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="Your last name" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email *</label>
                    <input type="email" required className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Phone / WhatsApp</label>
                    <input type="tel" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="+1 (000) 000-0000" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Which cooperative interests you? *</label>
                  <select required className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors">
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
                  <textarea className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors h-24 resize-none" placeholder="Tell us about your background, skills, and how you can contribute..." />
                </div>

                <button type="submit" className="w-full px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl transition-all">
                  Submit Interest
                </button>
                <p className="text-xs text-slate-500 text-center">We will respond within 48 hours.</p>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}