import CoopHero from '@/components/CoopHero';
import Link from 'next/link';

export const metadata = {
  title: 'Trades & Services Cooperative | IBT Co-operative Federation',
  description: 'Join the Trades & Services Cooperative - skilled tradespeople and service providers united for collective growth.',
};

const services = [
  { name: 'Plumbing & Piping', icon: '🔧' },
  { name: 'Electrical Work', icon: '⚡' },
  { name: 'Carpentry', icon: '🪚' },
  { name: 'Painting & Finishing', icon: '🎨' },
  { name: 'AC & Refrigeration', icon: '❄️' },
  { name: 'Welding & Metalwork', icon: '🔥' },
  { name: 'HVAC Installation', icon: '🌬️' },
  { name: 'General Contracting', icon: '🏗️' },
];

const benefits = [
  { title: 'Contract Pooling', description: 'Access to larger contracts that individual members cannot secure alone.' },
  { title: 'Skill Development', description: 'Training programs, certifications, and cross-trade knowledge sharing.' },
  { title: 'Equipment Sharing', description: 'Reduced costs through shared tools, vehicles, and specialized equipment.' },
  { title: 'Quality Standards', description: 'Unified branding and quality assurance that attracts premium clients.' },
];

export default function TradesPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <CoopHero
        pageKey="ibt-coops-trades"
        fallback={{
          badge: '🔧 Founding Phase',
          title: 'Trades & Services',
          titleGradient: 'Cooperative',
          subtitle: 'Skilled tradespeople and service providers united for collective growth. From plumbing to electrical work, we pool resources, share contracts, and elevate the profession together.',
          ctaPrimary: { label: 'Join as Founding Member', href: '/coops/get-involved' },
          ctaSecondary: { label: 'Join WhatsApp', href: 'https://chat.whatsapp.com/IfkJFCpgKRn9dOLaAUzOxW' },
        }}
        rightContent={
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-3xl blur-xl" />
            <div className="relative grid grid-cols-4 gap-4">
              {services.map((service) => (
                <div key={service.name} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                  <div className="text-3xl mb-2">{service.icon}</div>
                  <div className="text-xs text-slate-400">{service.name}</div>
                </div>
              ))}
            </div>
          </div>
        }
      />

      {/* Benefits */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Member Benefits</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Everything you gain by joining the collective rather than working alone.
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

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
            <h2 className="text-2xl font-bold text-white mb-6">How Contract Pooling Works</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-slate-900 font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Contract Identification</h3>
                  <p className="text-slate-400 text-sm">Co-op identifies large contracts that need multiple trades and expertise.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-slate-900 font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Member Assembly</h3>
                  <p className="text-slate-400 text-sm">Appropriate members are assembled based on skills and availability.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-slate-900 font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Unified Execution</h3>
                  <p className="text-slate-400 text-sm">Co-op manages client relationship while members execute their specialized work.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-slate-900 font-bold flex-shrink-0">✓</div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Profit Distribution</h3>
                  <p className="text-slate-400 text-sm">Revenue distributed based on participation and contribution.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Join?</h2>
          <p className="text-slate-400 mb-8">Be among the founding members who shape this cooperative.</p>
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