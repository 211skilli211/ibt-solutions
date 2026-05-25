'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, Section, SectionHeader, Card, Badge, GradientText, Input } from '@/components/ui';
import { submitServiceInquiry } from '@/lib/api';
import AdminServiceHero from '@/components/AdminServiceHero';

const verticals = [
  { name: 'Law Firms', icon: '⚖️', outcomes: ['Draft demand letters and client correspondence in minutes, not hours', 'Monitor case deadlines and court schedules automatically', 'Research case precedents and legal briefs on demand', 'Generate retainer agreements and intake forms from client data', 'Qualify new cases and screen for liability before taking on representation'] },
  { name: 'Real Estate', icon: '🏠', outcomes: ['Analyze commercial property listings and generate comparison reports', 'Respond to RFPs and tender documents with full proposals', 'Monitor geographic market data and alert on new listings in target zones', 'Generate CMA reports and market analyses for clients automatically', 'Qualify leads and schedule property tours without staff intervention'] },
  { name: 'Insurance', icon: '🛡️', outcomes: ['Process and adjudicate claims with document review and data extraction', 'Generate policy summaries and coverage comparisons for prospects', 'Monitor reinsurance market data and flag relevant policy changes', 'Automate renewals and send proactive outreach to expiring policies', 'Underwrite new applications by pulling and analyzing third-party data'] },
  { name: 'Manufacturing', icon: '⚙️', outcomes: ['Monitor supplier contracts and flag renewal dates and price escalation clauses', 'Generate purchase orders and RFQs from inventory triggers', 'Analyze production data and flag anomalies before they become failures', 'Process incoming RFPs and generate compliant bid submissions', 'Monitor compliance documentation and flag gaps in certifications'] },
];

const guarantees = [
  { icon: '⚡', label: 'First agent live in 48 hours', desc: 'From kickoff to operating in your sandbox environment.' },
  { icon: '📈', label: 'Revenue generated, not time saved', desc: 'Every agent is measured by output and business outcomes.' },
  { icon: '🔄', label: 'Agent improves every week', desc: 'Continuous learning loop — your agent gets smarter with every task.' },
  { icon: '🛡️', label: 'Unlimited usage, zero surprises', desc: 'Unlimited agents. Unlimited requests. Fixed monthly fee.' },
];

const moreServices = [
  { title: 'AI Marketing', desc: 'Campaign automation, content generation, audience targeting.', href: '/services/ai/marketing' },
  { title: 'MiroFish AI', desc: 'Crowd simulation and demographic analysis for events.', href: '/services/ai/mirofish' },
  { title: 'White Label AI', desc: 'Reseller and partner programs for AI solutions.', href: '/services' },
];

export default function AIPage() {
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitServiceInquiry({ service_type: 'ai-agents', name: 'AI Agent Prospect', email, source: 'bquikr', message: 'Interested in AI Digital Employee services - Unlimited model' });
    setFormStatus('We\'ll be in touch within 24 hours to schedule your demo.');
    setEmail('');
  };

  return (
    <div className="bg-surface-0">
      <AdminServiceHero
        pageKey="ibt-services-ai"
        fallback={{
          badge: 'AI Digital Employees',
          badgeVariant: 'sunset',
          title: 'Hire a Digital Employee',
          titleGradient: 'That Knows Your Business',
          subtitle: 'Not a chatbot. Not a copilot. A trained agent that learns your operations, handles repetitive work, and gets smarter every week — on a flat monthly fee.',
          ctaPrimary: { label: 'See Unlimited Offer', href: '#offer' },
          ctaSecondary: { label: 'Watch Demo', href: '#demo', variant: 'outline' },
        }}
      >
        {({ title, titleGradient, subtitle, cta1Label, cta1Link, cta2Label, cta2Link, badge }) => (
          <Section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <Badge variant="sunset">{badge}</Badge>
                <h1 className="text-4xl sm:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
                  {title}
                  <br />
                  <GradientText>{titleGradient}</GradientText>
                </h1>
                <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                  {subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button href={cta1Link} size="lg">{cta1Label}</Button>
                  <Button href={cta2Link} variant="outline" size="lg">{cta2Label}</Button>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                  {['No per-task pricing', '48-hour deployment', 'Learns your business'].map((t) => (
                    <span key={t} className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Demo Preview */}
              <div className="relative">
                <div id="demo" className="aspect-video rounded-2xl overflow-hidden bg-surface-1 border border-surface-3 relative">
                  <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop" alt="AI Agent Dashboard" className="w-full h-full object-cover opacity-40" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-surface-2/80 backdrop-blur flex items-center justify-center mb-4 border border-surface-3">
                      <svg className="w-10 h-10 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.554z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <p className="text-white font-semibold mb-1">See Your Agent in Action</p>
                    <p className="text-slate-400 text-sm">Loom demo — agent operating in sandbox</p>
                  </div>
                  <div className="absolute top-4 right-4"><Badge variant="sunset">DEMO</Badge></div>
                </div>
              </div>
            </div>
          </Section>
        )}
      </AdminServiceHero>

      {/* The Offer */}
      <Section id="offer" className="bg-surface-1/50">
        <div className="text-center mb-12">
          <Badge variant="sunset">The Offer</Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-4">
            Unlimited Digital Employees.
            <br />
            <GradientText>One Flat Fee.</GradientText>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Stop paying per task. Stop paying per agent. Hire as many as you need — for one fixed monthly investment.
          </p>
        </div>

        <Card className="max-w-3xl mx-auto text-center">
          <div className="mb-10">
            <span className="text-6xl sm:text-7xl font-black text-white">$5,000</span>
            <span className="text-2xl text-slate-400 ml-2">/month</span>
            <p className="text-slate-400 text-sm mt-2">Everything included. No add-ons. No hidden fees.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            {[
              { label: 'Unlimited Agents', desc: 'Deploy as many digital employees as your operations need.' },
              { label: 'Unlimited Usage', desc: 'No per-request charges. No task limits. Full throughput.' },
              { label: 'Unlimited Support', desc: 'Direct access to our AI engineering team — anytime.' },
              { label: 'Continuous Monitoring', desc: 'We track agent performance and optimize weekly.' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 p-5 rounded-xl bg-surface-1 text-left">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">{item.label}</h4>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Button href="#contact" size="lg">Start With Your First Agent</Button>
          <p className="text-xs text-slate-500 mt-3">48-hour turnaround on first agent. No long-term contract required.</p>
        </Card>
      </Section>

      {/* Guarantees */}
      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {guarantees.map((g) => (
            <Card key={g.label} className="text-center">
              <div className="text-2xl mb-3">{g.icon}</div>
              <h4 className="font-bold text-white mb-1 text-sm">{g.label}</h4>
              <p className="text-xs text-slate-400">{g.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Industry Verticals */}
      <Section className="bg-surface-1/50">
        <SectionHeader badge="Industries" title="Built for Legacy Industries" subtitle="We specialize in industries where legacy systems meet new technology. Each agent is trained on the specific workflows, terminology, and compliance requirements of your sector." />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {verticals.map((v) => (
            <Card key={v.name}>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{v.icon}</span>
                <h3 className="text-xl font-bold text-white">{v.name}</h3>
              </div>
              <ul className="space-y-3">
                {v.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    <span className="text-slate-300 text-sm">{o}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
        <div className="mt-10 text-center">
          <p className="text-slate-400 text-sm mb-4">Don't see your industry? Every business has repeatable knowledge work.</p>
          <Button href="/contact" variant="ghost">Request Custom Assessment →</Button>
        </div>
      </Section>

      {/* Revenue vs Time */}
      <Section>
        <Card className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            We Don't Talk About Time Saved.
            <br />
            <span className="text-slate-400">We Talk About Revenue Generated.</span>
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto leading-relaxed">
            Your digital employee isn't here to "save you 20 hours a week." It's here to generate revenue — drafting proposals that win contracts, processing claims that close faster, qualifying leads that convert.
          </p>
        </Card>
      </Section>

      {/* Other AI Services */}
      <Section className="bg-surface-1/50">
        <SectionHeader badge="More AI" title="Other AI Solutions" center />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {moreServices.map((s) => (
            <Link key={s.title} href={s.href} className="bg-surface-1 border border-surface-3 rounded-xl p-5 hover:border-teal-500/30 transition-all group">
              <h4 className="font-bold text-white mb-1 group-hover:text-teal-400 transition-colors">{s.title}</h4>
              <p className="text-xs text-slate-400 mb-3">{s.desc}</p>
              <span className="text-xs text-teal-400 font-medium">Learn More →</span>
            </Link>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section id="contact">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Hire Your First Digital Employee?</h2>
          <p className="text-slate-400 mb-8">Book a discovery call. We'll map your first workflow, show you a demo agent operating in a sandbox, and have your production agent live within 48 hours.</p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your work email" required />
            <Button type="submit">Book Discovery Call</Button>
          </form>
          {formStatus && <p className="mt-4 text-teal-400 text-sm">{formStatus}</p>}
          <p className="text-xs text-slate-500 mt-4">No credit card. No long-term contract. Cancel anytime.</p>
        </div>
      </Section>
    </div>
  );
}
