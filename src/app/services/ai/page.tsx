'use client';

import { useState } from 'react';
import Link from 'next/link';
import { submitServiceInquiry } from '@/lib/api';

const verticals = [
  {
    name: 'Law Firms',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    outcomes: [
      'Draft demand letters and client correspondence in minutes, not hours',
      'Monitor case deadlines and court schedules automatically',
      'Research case precedents and legal briefs on demand',
      'Generate retainer agreements and intake forms from client data',
      'Qualify new cases and screen for liability before taking on representation',
    ],
  },
  {
    name: 'Real Estate',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    outcomes: [
      'Analyze commercial property listings and generate comparison reports',
      'Respond to RFPs and tender documents with full proposals',
      'Monitor geographic market data and alert on new listings in target zones',
      'Generate CMA reports and market analyses for clients automatically',
      'Qualify leads and schedule property tours without staff intervention',
    ],
  },
  {
    name: 'Insurance',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    outcomes: [
      'Process and adjudicate claims with document review and data extraction',
      'Generate policy summaries and coverage comparisons for prospects',
      'Monitor reinsurance market data and flag relevant policy changes',
      'Automate renewals and send proactive outreach to expiring policies',
      'Underwrite new applications by pulling and analyzing third-party data',
    ],
  },
  {
    name: 'Manufacturing',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    outcomes: [
      'Monitor supplier contracts and flag renewal dates and price escalation clauses',
      'Generate purchase orders and RFQs from inventory triggers',
      'Analyze production data and flag anomalies before they become failures',
      'Process incoming RFPs and generate compliant bid submissions',
      'Monitor compliance documentation and flag gaps in certifications',
    ],
  },
];

const guaranteeItems = [
  { icon: '⚡', label: 'First agent live in 48 hours', desc: 'From kickoff to operating in your sandbox environment.' },
  { icon: '📈', label: 'Revenue generated, not time saved', desc: 'Every agent is measured by output and business outcomes.' },
  { icon: '🔄', label: 'Agent improves every week', desc: 'Continuous learning loop — your agent gets smarter with every task.' },
  { icon: '🛡️', label: 'Unlimited usage, zero surprises', desc: 'Unlimited agents. Unlimited requests. Fixed monthly fee.' },
];

export default function AIPage() {
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await submitServiceInquiry({
      service_type: 'ai-agents',
      name: 'AI Agent Prospect',
      email: email,
      source: 'bquikr',
      message: 'Interested in AI Digital Employee services - Unlimited model'
    });
    
    setFormStatus('We\'ll be in touch within 24 hours to schedule your demo.');
    setEmail('');
  };

  return (
    <div className="bg-slate-950 min-h-screen">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[128px]" />
      </div>

      {/* Hero */}
      <section className="pt-32 pb-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-sm mb-6">
                AI Digital Employees
              </span>
              <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
                Hire a Digital Employee
                <br />
                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  That Knows Your Business
                </span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Not a chatbot. Not a copilot. A trained agent that learns your operations, 
                handles repetitive work, and gets smarter every week — on a flat monthly fee.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href="#offer" className="px-8 py-4 bg-violet-500 hover:bg-violet-400 text-white font-semibold rounded-xl transition-all text-center">
                  See Unlimited Offer
                </a>
                <a href="#demo" className="px-8 py-4 border border-slate-700 hover:border-slate-600 text-white font-medium rounded-xl transition-all text-center flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.554z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Watch Demo
                </a>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  No per-task pricing
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  48-hour deployment
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Learns your business
                </span>
              </div>
            </div>

            {/* Agent Preview / Loom Placeholder */}
            <div className="relative">
              <div id="demo" className="aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 relative">
                <img
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop"
                  alt="AI Agent Dashboard"
                  className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-violet-500/20 backdrop-blur flex items-center justify-center mb-4 border border-violet-500/30">
                    <svg className="w-10 h-10 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.554z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-white font-semibold mb-1">See Your Agent in Action</p>
                  <p className="text-slate-400 text-sm">Loom demo — agent operating in sandbox</p>
                </div>
                <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-slate-900/90 rounded-lg border border-slate-700">
                  <span className="text-xs text-slate-300">Digital Employee Dashboard</span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-violet-500 text-slate-900 text-xs font-bold rounded-full">DEMO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Unlimited Offer */}
      <section id="offer" className="py-20 bg-slate-900/50 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-sm mb-4">
              The Offer
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Unlimited Digital Employees.
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                One Flat Fee.
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Stop paying per task. Stop paying per agent. Hire as many as you need — 
              for one fixed monthly investment.
            </p>
          </div>

          <div className="bg-gradient-to-br from-violet-900/30 via-slate-900 to-pink-900/20 rounded-3xl border border-violet-500/20 p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            
            <div className="relative text-center mb-10">
              <div className="inline-block mb-4">
                <span className="text-6xl sm:text-7xl font-black text-white">$5,000</span>
                <span className="text-2xl text-slate-400 ml-2">/month</span>
              </div>
              <p className="text-slate-400 text-sm">Everything included. No add-ons. No hidden fees.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
              {[
                { label: 'Unlimited Agents', desc: 'Deploy as many digital employees as your operations need.' },
                { label: 'Unlimited Usage', desc: 'No per-request charges. No task limits. Full throughput.' },
                { label: 'Unlimited Support', desc: 'Direct access to our AI engineering team — anytime.' },
                { label: 'Continuous Monitoring', desc: 'We track agent performance and optimize weekly.' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 p-5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{item.label}</h4>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <a href="#contact" className="inline-flex items-center gap-2 px-10 py-4 bg-violet-500 hover:bg-violet-400 text-white font-bold rounded-xl transition-all text-lg">
                Start With Your First Agent
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <p className="text-xs text-slate-500 mt-3">48-hour turnaround on first agent. No long-term contract required.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantees / Speed to Yes */}
      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {guaranteeItems.map((item) => (
              <div key={item.label} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-center hover:border-violet-500/30 transition-all">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h4 className="font-bold text-white mb-1 text-sm">{item.label}</h4>
                <p className="text-xs text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Verticals */}
      <section className="py-20 bg-slate-900/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Built for Legacy Industries
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              We specialize in industries where legacy systems meet new technology. 
              Each agent is trained on the specific workflows, terminology, and compliance 
              requirements of your sector.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {verticals.map((vertical) => (
              <div 
                key={vertical.name}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-400">
                    {vertical.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{vertical.name}</h3>
                </div>
                <ul className="space-y-3">
                  {vertical.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      <span className="text-slate-300 text-sm">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-slate-400 text-sm mb-4">
              Don&apos;t see your industry? Every business has repeatable knowledge work. 
              Let&apos;s discuss how a digital employee can transform yours.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 font-medium text-sm">
              Request Custom Assessment
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Revenue vs Time */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 sm:p-12 border border-slate-800 text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              We Don&apos;t Talk About Time Saved.
              <br />
              <span className="text-slate-400">We Talk About Revenue Generated.</span>
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto leading-relaxed">
              Your digital employee isn&apos;t here to "save you 20 hours a week." 
              It&apos;s here to generate revenue — drafting proposals that win contracts, 
              processing claims that close faster, qualifying leads that convert. 
              The time it saves is a byproduct. The money it makes is the point.
            </p>
          </div>
        </div>
      </section>

      {/* Other AI Services */}
      <section className="py-16 bg-slate-900/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white mb-2">More AI Solutions</h2>
            <p className="text-slate-400 text-sm">Alongside digital employees, we offer specialized AI tools.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: 'AI Marketing', desc: 'Campaign automation, content generation, audience targeting.', href: '/services/ai/marketing', color: 'rose' },
              { title: 'MiroFish AI', desc: 'Crowd simulation and demographic analysis for events.', href: '/services/ai/mirofish', color: 'teal' },
              { title: 'White Label AI', desc: 'Reseller and partner programs for AI solutions.', href: '/services', color: 'violet' },
            ].map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all group"
              >
                <h4 className="font-bold text-white mb-1 group-hover:text-violet-400 transition-colors">{s.title}</h4>
                <p className="text-xs text-slate-400 mb-3">{s.desc}</p>
                <span className="text-xs text-violet-400 font-medium group-hover:underline">Learn More →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-20 relative">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Hire Your First Digital Employee?
          </h2>
          <p className="text-slate-400 mb-8">
            Book a discovery call. We&apos;ll map your first workflow, show you a demo agent 
            operating in a sandbox, and have your production agent live within 48 hours.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your work email"
              className="w-full px-6 py-4 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500"
              required
            />
            <button className="w-full px-6 py-4 bg-violet-500 hover:bg-violet-400 text-white font-semibold rounded-xl transition-colors text-lg">
              Book Discovery Call
            </button>
          </form>
          {formStatus && <p className="mt-4 text-emerald-400 text-sm">{formStatus}</p>}
          <p className="text-xs text-slate-500 mt-4">No credit card. No long-term contract. Cancel anytime.</p>
        </div>
      </section>
    </div>
  );
}