import Link from 'next/link';
import PageHero from '@/components/PageHero';

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
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px]" />
      </div>

      <div className="relative pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/coops" className="hover:text-white transition-colors">IBT Co-ops</Link>
            <span>/</span>
            <span className="text-white">Trades & Services</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm mb-6">
                Founding Phase
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Trades & Services
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Cooperative
                </span>
              </h1>
              <p className="text-xl text-slate-400 mb-8">
                Skilled tradespeople and service providers united for collective growth. 
                From plumbing to electrical work, we pool resources, share contracts, 
                and elevate the profession together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/coops/get-involved" className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl transition-all text-center">
                  Join as Founding Member
                </Link>
                <a href="https://chat.whatsapp.com/example" target="_blank" className="px-8 py-4 border border-slate-700 hover:border-slate-600 text-white font-medium rounded-xl transition-all text-center flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Join WhatsApp
                </a>
              </div>
            </div>

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
          </div>
        </div>
      </div>

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