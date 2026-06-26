'use client';

import { useState } from 'react';
import Link from 'next/link';
import { submitServiceInquiry } from '@/lib/api';

const askExamples = [
  { q: 'What are the best beaches near me?', a: 'Based on your location (St. Lucia), the top-rated beaches are' },
  { q: 'Find restaurants with outdoor dining in Barbados', a: 'I found 47 restaurants matching your criteria. Top picks include' },
  { q: 'Which hotels have the best reviews in Antigua?', a: 'Here are the highest-rated hotels based on 2,000+ reviews:' },
];

export default function AskMapsPage() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<null | { answer: string; places: any[] }>(null);
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    // Simulate search
    setTimeout(() => {
      setResults({
        answer: 'Based on your search, I found several relevant results:',
        places: [
          { name: 'Example Restaurant', rating: 4.5, reviews: 230, category: 'Restaurant', distance: '0.3 mi' },
          { name: 'Local Beach Bar', rating: 4.2, reviews: 156, category: 'Bar', distance: '0.5 mi' },
          { name: 'Caribbean Cafe', rating: 4.7, reviews: 412, category: 'Cafe', distance: '0.8 mi' },
        ],
      });
      setIsSearching(false);
    }, 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await submitServiceInquiry({
      service_type: 'ask-maps',
      name: 'Ask Maps Visitor',
      email: email,
      source: 'bquikr',
      message: 'Interested in Ask Maps API integration'
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
          <div className="inline-block px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-sm mb-6">
            Gemini Ask Maps
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
            Ask Google Maps
            <br />
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
              Anything
            </span>
          </h1>
          <p className="text-xl text-ink-400 max-w-2xl mx-auto">
            AI-powered business Q&A using Google Maps data. Find businesses, 
            analyze reviews, and get local insights - all through natural conversation.
          </p>
        </div>
      </section>

      {/* Search Interface */}
      <section className="py-10">
        <div className="max-w-2xl mx-auto px-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything about local businesses..."
              className="w-full px-6 py-5 pr-16 bg-surface-1 border border-ink-700 rounded-2xl text-white text-lg placeholder:text-ink-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
            <button
              type="submit"
              disabled={isSearching || !query}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-indigo-500 hover:bg-indigo-400 rounded-xl flex items-center justify-center text-white disabled:opacity-50"
            >
              {isSearching ? (
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Results */}
      {results && (
        <section className="py-10">
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-surface-1 rounded-2xl p-6 border border-surface-2">
              <p className="text-white mb-6">{results.answer}</p>
              <div className="space-y-3">
                {results.places.map((place, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-surface-2/50 rounded-xl">
                    <div>
                      <h4 className="font-medium text-white">{place.name}</h4>
                      <p className="text-sm text-ink-400">{place.category} • {place.distance}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-white">⭐ {place.rating}</div>
                      <p className="text-xs text-ink-500">{place.reviews} reviews</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Example Questions */}
      <section className="py-20 border-t border-surface-2">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-bold text-white text-center mb-8">Try asking...</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {askExamples.map((ex, i) => (
              <button
                key={i}
                onClick={() => setQuery(ex.q)}
                className="p-4 bg-surface-1 rounded-xl border border-surface-2 text-left hover:border-indigo-500/50 transition-all"
              >
                <p className="text-sm text-white">{ex.q}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t border-surface-2">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Natural Language Search', desc: 'Ask questions in plain English' },
              { title: 'Review Analysis', desc: 'AI summarizes thousands of reviews' },
              { title: 'Local Insights', desc: 'Get insider knowledge about places' },
              { title: 'White Label API', desc: 'Integrate into your own app' },
            ].map((f, i) => (
              <div key={i} className="bg-surface-1 rounded-xl p-6 border border-surface-2">
                <h3 className="text-white font-medium mb-2">{f.title}</h3>
                <p className="text-ink-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 border-t border-surface-2">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Integrate Ask Maps</h2>
          <p className="text-ink-400 mb-8">Add AI-powered Maps search to your website or app.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className="w-full px-6 py-4 bg-surface-1 border border-surface-2 rounded-xl text-white focus:outline-none focus:border-indigo-500" required />
            <button className="w-full px-6 py-4 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold rounded-xl">Request API Access</button>
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