'use client';

import { useState } from 'react';
import Link from 'next/link';
import { submitServiceInquiry } from '@/lib/api';

export default function MiroFishPage() {
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState('');

  const features = [
    { title: 'Crowd Simulation', desc: 'Predict crowd flow and density at events, venues, beaches' },
    { title: 'Demographic Analysis', desc: 'Analyze age groups, family vs solo, tourist vs local' },
    { title: 'Event Planning', desc: 'Optimize event layout and staff placement' },
    { title: 'Location Analytics', desc: 'Assess popularity patterns by time and day' },
    { title: 'White Label', desc: 'Rebrand as your own product for clients' },
  ];

  const useCases = [
    { title: 'Festival & Events', icon: '🎭' },
    { title: 'Beach Clubs', icon: '🏖️' },
    { title: 'Restaurants', icon: '🍽️' },
    { title: 'Shopping Malls', icon: '🛒' },
    { title: 'Public Spaces', icon: '🌳' },
    { title: 'Transportation Hubs', icon: '✈️' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await submitServiceInquiry({
      service_type: 'mirofish',
      name: 'MiroFish Visitor',
      email: email,
      source: 'bquikr',
      message: 'Interested in MiroFish AI crowd simulation'
    });
    
    setFormStatus('Thanks! We\'ll contact you within 24 hours.');
    setEmail('');
  };

  return (
    <div className="bg-ocean-900 min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-ocean-900/80 backdrop-blur-lg border-b border-surface-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/services" className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">IBT</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/services/ai" className="text-sm text-emerald-400">AI Solutions</Link>
              <Link href="#contact" className="px-4 py-2 bg-cyan-500 text-surface-1 text-sm font-medium rounded-lg">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-sm mb-6">
            MiroFish AI
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
            Crowd Intelligence
            <br />
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
              Powered by AI
            </span>
          </h1>
          <p className="text-xl text-ink-400 max-w-2xl mx-auto">
            AI-powered crowd simulation and demographic analysis. Predict crowd flow, 
            analyze patterns, and make data-driven decisions for events and locations.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-surface-1 rounded-2xl p-6 border border-surface-2">
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-ink-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-surface-2">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white text-center mb-12">Use Cases</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {useCases.map((uc) => (
              <div key={uc.title} className="bg-surface-1 rounded-xl p-4 text-center border border-surface-2">
                <div className="text-3xl mb-2">{uc.icon}</div>
                <div className="text-sm text-white">{uc.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-surface-2">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-br from-teal-900/20 to-cyan-900/20 rounded-3xl p-12 border border-teal-500/30 text-center">
            <div className="text-4xl mb-4">🐟</div>
            <h2 className="text-3xl font-bold text-white mb-4">White Label Ready</h2>
            <p className="text-ink-400 mb-6 max-w-xl mx-auto">
              MiroFish AI is available for white labeling. Offer crowd intelligence 
              under your own brand. Perfect for agencies, consultants, and tourism boards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#pricing" className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-surface-1 font-medium rounded-xl">
                Get White Label
              </Link>
              <button className="px-6 py-3 border border-ink-700 text-white font-medium rounded-xl">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 border-t border-surface-2">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Try MiroFish AI</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className="w-full px-6 py-4 bg-surface-1 border border-surface-2 rounded-xl text-white focus:outline-none focus:border-teal-500" required />
            <button className="w-full px-6 py-4 bg-teal-500 hover:bg-teal-400 text-surface-1 font-semibold rounded-xl">Request Demo</button>
          </form>
          {formStatus && <p className="mt-4 text-emerald-400">{formStatus}</p>}
        </div>
      </section>

      <footer className="py-12 border-t border-surface-2 text-center text-ink-500">
        <p>© 2025 IBT Solutions</p>
      </footer>
    </div>
  );
}