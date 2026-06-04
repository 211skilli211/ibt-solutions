'use client';

import { useState } from 'react';
import Link from 'next/link';
import { submitServiceInquiry } from '@/lib/api';

const marketingFeatures = [
  {
    id: 'campaigns',
    title: 'AI Campaigns',
    description: 'Create and manage marketing campaigns with AI assistance.',
    icon: '📢',
  },
  {
    id: 'content',
    title: 'Content Generation',
    description: 'Generate marketing copy, descriptions, and social posts.',
    icon: '✍️',
  },
  {
    id: 'audience',
    title: 'Audience Analysis',
    description: 'Understand your audience with AI-driven insights.',
    icon: '👥',
  },
  {
    id: 'scheduler',
    title: 'Smart Scheduling',
    description: 'Post at optimal times automatically.',
    icon: '⏰',
  },
];

export default function AIMarketingPage() {
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await submitServiceInquiry({
      service_type: 'ai-marketing',
      name: 'Marketing Visitor',
      email: email,
      source: 'bquikr',
      message: 'Interested in AI Marketing services'
    });
    
    setFormStatus('Thanks! We\'ll contact you within 24 hours.');
    setEmail('');
  };

  return (
    <div className="bg-ocean-900 min-h-screen">
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-rose-500/10 border border-amber-500/30 text-rose-400 text-sm mb-6">
            AI Marketing
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
            Smart Marketing
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-teal-400 bg-clip-text text-transparent">
              Powered by AI
            </span>
          </h1>
          <p className="text-xl text-ink-400 max-w-2xl mx-auto">
            AI-powered marketing campaigns, content generation, and automated outreach. 
            Let AI handle the heavy lifting while you focus on your business.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {marketingFeatures.map((feature) => (
              <div key={feature.id} className="bg-surface-1 rounded-3xl p-8 border border-surface-2 hover:border-rose-500/50 transition-all group">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-ink-400">{feature.description}</p>
                <button className="mt-4 text-rose-400 text-sm font-medium group-hover:underline">
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-surface-2">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white text-center mb-12">How It Works</h2>
          <div className="space-y-4">
            {[
              { step: '1', title: 'Connect', desc: 'Connect your social accounts and website' },
              { step: '2', title: 'AI Analysis', desc: 'Our AI analyzes your audience and competitors' },
              { step: '3', title: 'Create', desc: 'Generate content tailored to your brand' },
              { step: '4', title: 'Automate', desc: 'Schedule and publish automatically' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-surface-1 rounded-xl">
                <div className="w-10 h-10 bg-rose-500/20 rounded-full flex items-center justify-center text-rose-400 font-bold">
                  {s.step}
                </div>
                <div>
                  <h4 className="font-medium text-white">{s.title}</h4>
                  <p className="text-sm text-ink-400">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-surface-2">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-br from-amber-900/20 to-teal-900/20 rounded-3xl p-12 border border-amber-500/30">
            <h2 className="text-2xl font-bold text-white mb-4">Automation Flows</h2>
            <p className="text-ink-400 mb-6">
              Set up automated marketing flows with triggers and actions:
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'New signup → Welcome email + Social follow',
                'Purchase → Thank you + Upsell suggestion',
                'Inactivity → Re-engagement campaign',
                'Review received → Social share request',
                'Blog post → Content distribution',
              ].map((flow, i) => (
                <li key={i} className="flex items-center gap-2 text-ink-300">
                  <svg className="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {flow}
                </li>
              ))}
            </ul>
            <Link href="#pricing" className="px-6 py-3 bg-rose-500 hover:bg-rose-400 text-white font-medium rounded-xl inline-block">
              Set Up Automation
            </Link>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 border-t border-surface-2">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Get Started with AI Marketing</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className="w-full px-6 py-4 bg-surface-1 border border-surface-2 rounded-xl text-white focus:outline-none focus:border-rose-500" required />
            <button className="w-full px-6 py-4 bg-rose-500 hover:bg-rose-400 text-white font-semibold rounded-xl">Request Demo</button>
          </form>
          {formStatus && <p className="mt-4 text-emerald-400">{formStatus}</p>}
        </div>
      </section>
    </div>
  );
}