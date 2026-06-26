'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, Section, SectionHeader, Card, Badge, GradientText, Input } from '@/components/ui';
import { submitServiceInquiry } from '@/lib/api';
import AdminServiceHero from '@/components/AdminServiceHero';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations';

/* ─── AI Hedge Fund ─── */
const agents = [
  { name: 'Warren Buffett', role: 'Value Oracle', desc: 'Seeks wonderful companies at fair price. Long-term compounder.', icon: '🏛️' },
  { name: 'Charlie Munger', role: 'Quality Filter', desc: 'Only buys wonderful businesses. Multi-disciplinary thinking.', icon: '🧠' },
  { name: 'Ben Graham', role: 'Margin of Safety', desc: 'Godfather of value investing. Hidden gems only.', icon: '💎' },
  { name: 'Peter Lynch', role: 'Growth Hunter', desc: 'Practical investor seeking ten-baggers in everyday businesses.', icon: '🔍' },
  { name: 'Cathie Wood', role: 'Innovation Thesis', desc: 'Queen of growth. Bets on disruptive innovation.', icon: '🚀' },
  { name: 'Bill Ackman', role: 'Activist Edge', desc: 'Bold positions. Pushes for change. Concentrated bets.', icon: '⚡' },
  { name: 'Michael Burry', role: 'Contrarian', desc: 'The Big Short. Hunts deep value others miss.', icon: '🎯' },
  { name: 'Nassim Taleb', role: 'Tail Risk', desc: 'Black Swan analyst. Antifragile positioning. Asymmetric payoffs.', icon: '🦢' },
  { name: 'Stanley Druckenmiller', role: 'Macro Legend', desc: 'Asymmetric opportunities. Growth + macro convergence.', icon: '🌊' },
  { name: 'Phil Fisher', role: 'Scuttlebutt Research', desc: 'Meticulous growth investor. Deep due diligence.', icon: '🔬' },
  { name: 'Aswath Damodaran', role: 'Dean of Valuation', desc: 'Story + numbers + disciplined valuation framework.', icon: '📊' },
  { name: 'Mohnish Pabrai', role: 'Dhandho Investor', desc: 'Doubles at low risk. Cloning proven strategies.', icon: '♻️' },
];

const workflowSteps = [
  { step: '1', title: 'Define Universe', desc: 'Set the investment universe — sectors, geographies, market caps, and constraints.' },
  { step: '2', title: 'Agent Analysis', desc: '12+ AI agents analyze each stock through their unique investment lens — value, growth, contrarian, macro.' },
  { step: '3', title: 'Signal Aggregation', desc: 'Buy/sell/hold signals are aggregated across all agents with confidence scores.' },
  { step: '4', title: 'Risk Management', desc: 'Risk manager evaluates position sizing, portfolio risk, and sets exposure limits.' },
  { step: '5', title: 'Portfolio Decision', desc: 'Portfolio manager makes final allocation decisions with full audit trail.' },
];

const capabilities = [
  { title: 'Multi-Agent Analysis', desc: '12+ legendary investor personas analyze every opportunity through their unique framework.', icon: '🤖' },
  { title: 'Fundamental Analysis', desc: 'Automated financial statement analysis, ratio screening, and intrinsic value calculation.', icon: '📈' },
  { title: 'Sentiment Analysis', desc: 'Real-time news sentiment, social media signals, and market mood detection.', icon: '📡' },
  { title: 'Technical Indicators', desc: 'Momentum, volatility, volume analysis, and pattern recognition across timeframes.', icon: '📉' },
  { title: 'Risk Management', desc: 'Position sizing, portfolio heat mapping, drawdown protection, and exposure limits.', icon: '🛡️' },
  { title: 'Macro Intelligence', desc: 'Interest rate sensitivity, sector rotation signals, and economic regime detection.', icon: '🌍' },
];

export default function AIHedgeFundPage() {
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitServiceInquiry({
      service_type: 'ai-hedge-fund',
      name: 'Hedge Fund Prospect',
      email,
      source: 'bquikr',
      message: 'Interested in AI Hedge Fund — multi-agent investment analysis',
    });
    setFormStatus("Thanks! We'll contact you within 24 hours.");
    setEmail('');
  };

  return (
    <div className="bg-surface-0">
      {/* ─── Hero ─── */}
      <AdminServiceHero
        pageKey="ibt-services-ai-hedge-fund"
        fallback={{
          badge: 'AI Hedge Fund',
          badgeVariant: 'sunset',
          title: 'Multi-Agent Investment',
          titleGradient: 'Intelligence',
          subtitle: '12+ AI agents, each modeled after a legendary investor, analyze markets through their unique frameworks. Aggregated signals. Disciplined risk management. Full audit trail.',
          ctaPrimary: { label: 'See How It Works', href: '#how-it-works' },
          ctaSecondary: { label: 'Get Started', href: '#contact', variant: 'outline' as const },
        }}
      >
        {({ title, titleGradient, subtitle, cta1Label, cta1Link, cta2Label, cta2Link, badge }) => (
          <Section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <ScrollReveal>
                <Badge variant="sunset">{badge}</Badge>
                <h1 className="text-4xl sm:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
                  {title}
                  <br />
                  <GradientText>{titleGradient}</GradientText>
                </h1>
                <p className="text-xl text-ink-300 mb-8 leading-relaxed">{subtitle}</p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button href={cta1Link} size="lg">{cta1Label}</Button>
                  <Button href={cta2Link} variant="outline" size="lg">{cta2Label}</Button>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-ink-400">
                  {['12+ AI agents', 'Full audit trail', 'Risk-managed'].map((t) => (
                    <span key={t} className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {t}
                    </span>
                  ))}
                </div>
              </ScrollReveal>

              {/* Agent Preview */}
              <div className="grid grid-cols-3 gap-3">
                {agents.slice(0, 6).map((a) => (
                  <Card key={a.name} className="text-center p-4">
                    <div className="text-2xl mb-2">{a.icon}</div>
                    <div className="text-xs font-bold text-white leading-tight">{a.name}</div>
                    <div className="text-[10px] text-ink-400 mt-0.5">{a.role}</div>
                  </Card>
                ))}
              </div>
            </div>
          </Section>
        )}
      </AdminServiceHero>

      {/* ─── All Agents ─── */}
      <Section className="bg-surface-1/50">
        <SectionHeader
          badge="The Agents"
          title="Legendary Investors, Reimagined"
          subtitle="Each agent is modeled after a real investment legend — their philosophy, framework, and decision-making process."
        />
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {agents.map((a) => (
            <StaggerItem key={a.name}>
              <Card hover className="h-full">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{a.icon}</span>
                  <div>
                    <h4 className="font-bold text-white text-sm">{a.name}</h4>
                    <span className="text-[10px] text-teal-400 font-medium">{a.role}</span>
                  </div>
                </div>
                <p className="text-xs text-ink-400">{a.desc}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* ─── How It Works ─── */}
      <Section id="how-it-works">
        <SectionHeader
          badge="Workflow"
          title="From Universe to Allocation"
          subtitle="Five-step process from defining the investment universe to final portfolio decisions."
        />
        <div className="max-w-3xl mx-auto space-y-4">
          {workflowSteps.map((s, i) => (
            <ScrollReveal key={s.step} delay={i * 0.08}>
              <div className="flex items-center gap-5 p-5 bg-surface-1 border border-surface-3 rounded-xl hover:border-teal-500/20 transition-colors">
                <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center text-teal-400 font-bold text-lg shrink-0">
                  {s.step}
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">{s.title}</h4>
                  <p className="text-sm text-ink-400">{s.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* ─── Capabilities ─── */}
      <Section className="bg-surface-1/50">
        <SectionHeader
          badge="Capabilities"
          title="Full Investment Stack"
          subtitle="From fundamental analysis to macro intelligence — every layer of the investment process."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {capabilities.map((c) => (
            <Card key={c.title} hover>
              <div className="text-3xl mb-3">{c.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{c.title}</h3>
              <p className="text-sm text-ink-400">{c.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ─── Disclaimer ─── */}
      <Section>
        <Card className="max-w-3xl mx-auto text-center">
          <div className="text-3xl mb-4">⚠️</div>
          <h3 className="text-lg font-bold text-white mb-2">Educational & Research Purposes Only</h3>
          <p className="text-sm text-ink-400 leading-relaxed">
            The AI Hedge Fund is a proof of concept for exploring AI-powered investment analysis.
            It is not intended for real trading or investment. No investment advice or guarantees are provided.
            Always consult a qualified financial advisor for investment decisions.
          </p>
        </Card>
      </Section>

      {/* ─── CTA ─── */}
      <Section id="contact" className="bg-surface-1/50">
        <Card className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Explore AI-Powered Investment Analysis
          </h2>
          <p className="text-ink-400 mb-8 max-w-xl mx-auto">
            See how multi-agent AI analysis can enhance your investment research and decision-making process.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your work email" required />
            <Button type="submit">Book Demo</Button>
          </form>
          {formStatus && <p className="mt-4 text-teal-400 text-sm">{formStatus}</p>}
          <p className="text-xs text-ink-500 mt-4">No credit card. No commitment. Educational demo only.</p>
        </Card>
      </Section>
    </div>
  );
}
