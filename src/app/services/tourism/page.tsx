'use client';

import { useState } from 'react';
import Link from 'next/link';
import { submitServiceInquiry } from '@/lib/api';

const freeAPIs = [
  {
    id: 'currency',
    name: 'Currency Exchange',
    description: 'Real-time Caribbean and international exchange rates. Historical data, trend charts, and rate alerts.',
    features: ['150+ currencies', 'Real-time rates', 'Historical data', 'Trend charts', 'Rate alerts'],
    badge: 'Free Forever',
    badgeColor: 'emerald',
  },
  {
    id: 'weather',
    name: 'Weather API',
    description: 'Land and marine weather forecasts with alerts for the Caribbean region.',
    features: ['7-day forecast', 'Marine conditions', 'Alerts', 'Historical data'],
    badge: 'Free Forever',
    badgeColor: 'emerald',
  },
];

const proAPIs = [
  {
    id: 'events',
    name: 'Caribbean Events',
    description: 'Comprehensive events database — festivals, concerts, sports, cultural celebrations.',
    features: ['10,000+ events', 'Filters by location', 'Categories', 'iCal export'],
  },
  {
    id: 'places',
    name: 'Places Discovery',
    description: 'Discover restaurants, attractions, beaches, and hidden gems across the Caribbean.',
    features: ['5000+ places', 'Reviews', 'Photos', 'Ratings', 'Maps'],
  },
  {
    id: 'transport',
    name: 'Transport API',
    description: 'Public transport schedules, ferry times, and taxi services across the Caribbean.',
    features: ['Schedules', 'Route planning', 'Fare estimates', 'Real-time updates'],
  },
  {
    id: 'marine',
    name: 'Marine Conditions',
    description: 'Beach water temperature, wave height, safety flags, and maritime data.',
    features: ['Water temp', 'Wave height', 'Safety flags', 'Tide data'],
  },
  {
    id: 'geospatial',
    name: 'Geospatial Mapping',
    description: 'Interactive maps, POI data, and location intelligence for Caribbean businesses.',
    features: ['Custom maps', 'POI data', 'Route optimization', '5 view modes'],
  },
];

const addons = [
  {
    id: 'leads',
    name: 'Leads Pack',
    price: '$15/mo',
    description: 'Business contact data, tourism vendor leads, and FX arbitrage opportunity alerts.',
    features: ['Business contacts', 'Tourism vendor leads', 'FX opportunity alerts', 'Webhook notifications'],
  },
  {
    id: 'webhooks',
    name: 'Webhook Pack',
    price: '$10/mo',
    description: 'Real-time WebSocket updates and push notifications for all endpoints.',
    features: ['Real-time updates', 'Push notifications', 'Event triggers', 'Custom endpoints'],
  },
  {
    id: 'export',
    name: 'Export Pack',
    price: '$10/mo',
    description: 'Bulk CSV/JSON export, scheduled reports, iCal sync, and PDF generation.',
    features: ['Bulk export', 'Scheduled reports', 'iCal sync', 'PDF generation'],
  },
];

export default function TourismPage() {
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await submitServiceInquiry({
      service_type: 'tourism-api',
      name: 'API Visitor',
      email: email,
      source: 'bquikr',
      message: 'Interested in Tourism API Subscription'
    });
    
    setFormStatus('Check your email for access instructions!');
    setEmail('');
  };

  return (
    <div className="bg-slate-950 min-h-screen">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px]" />
      </div>

      <section className="pt-32 pb-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm mb-6">
              Tourism API Suite
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              Caribbean Tourism
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                APIs on Subscription
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
              One subscription. All Tourism APIs. Start free, unlock everything with Pro. 
              Currency exchange — always free. Add powerful extras as needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/api-services" className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl transition-all">
                View All Pricing
              </a>
              <a href="#get-started" className="px-8 py-4 border border-slate-700 hover:border-slate-600 text-white font-medium rounded-xl transition-all">
                Get API Access
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Free APIs */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Free APIs — Always Free</h2>
            <p className="text-slate-400">Core data available to everyone, no subscription needed.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {freeAPIs.map((api) => (
              <div key={api.id} className="bg-slate-900/60 border border-emerald-500/20 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{api.name}</h3>
                    <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full bg-${api.badgeColor}-500/20 text-${api.badgeColor}-400 border border-${api.badgeColor}-500/30`}>
                      {api.badge}
                    </span>
                  </div>
                </div>
                <p className="text-slate-400 text-sm mb-4">{api.description}</p>
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {api.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-slate-300">
                      <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </div>
                  ))}
                </div>
                <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-colors">
                  Access Free
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pro Subscription + Add-ons */}
      <section className="py-16 bg-slate-900/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Pro Tier */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-3">Pro Subscription</h2>
              <p className="text-slate-400">Unlock all Tourism APIs with one subscription.</p>
            </div>

            <div className="bg-slate-900/80 border-2 border-cyan-500/30 rounded-3xl p-8 relative">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-5 py-2 bg-cyan-500 text-slate-900 text-sm font-bold rounded-full shadow-lg shadow-cyan-500/20">
                PRO TIER
              </div>

              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="text-4xl font-bold text-white mb-1">$39/mo</div>
                  <p className="text-sm text-slate-500">10,000 requests/month</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">$39</div>
                  <p className="text-xs text-slate-500">per month</p>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">What You Get</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {proAPIs.map((api) => (
                    <div key={api.id} className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                      <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <h5 className="font-medium text-white text-sm">{api.name}</h5>
                        <p className="text-xs text-slate-400 line-clamp-1">{api.features.slice(0, 2).join(' · ')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl transition-colors">
                  Subscribe Pro
                </button>
                <button className="px-6 py-3 border border-slate-700 hover:border-slate-600 text-white font-medium rounded-xl transition-colors">
                  View Docs
                </button>
              </div>
            </div>
          </div>

          {/* Add-ons */}
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Pro Add-ons</h3>
              <p className="text-slate-400 text-sm">Extend your Pro subscription with powerful extras.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {addons.map((addon) => (
                <div key={addon.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-white">{addon.name}</h4>
                    <span className="text-lg font-bold text-cyan-400">{addon.price}</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-4">{addon.description}</p>
                  <ul className="space-y-2 mb-5">
                    {addon.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                        <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-xl transition-colors">
                    Add to Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* API Comparison Table */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">API Access Overview</h2>
            <p className="text-slate-400">See which APIs are free and which require Pro.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-4 px-4 text-sm font-medium text-slate-400">API</th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-slate-400">Access</th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-slate-400">Rate Limit</th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-slate-400">Add-on</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-800/50">
                  <td className="py-4 px-4">
                    <span className="font-medium text-white">Currency Exchange</span>
                    <span className="text-xs text-slate-500 block">Exchange rates, historical data</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">FREE</span>
                  </td>
                  <td className="py-4 px-4 text-center text-sm text-slate-400">500/day free</td>
                  <td className="py-4 px-4 text-center text-sm text-slate-500">—</td>
                </tr>
                <tr className="border-b border-slate-800/50">
                  <td className="py-4 px-4">
                    <span className="font-medium text-white">Weather API</span>
                    <span className="text-xs text-slate-500 block">Land & marine forecasts</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">FREE</span>
                  </td>
                  <td className="py-4 px-4 text-center text-sm text-slate-400">500/day free</td>
                  <td className="py-4 px-4 text-center text-sm text-slate-500">—</td>
                </tr>
                <tr className="border-b border-slate-800/50">
                  <td className="py-4 px-4">
                    <span className="font-medium text-white">Caribbean Events</span>
                    <span className="text-xs text-slate-500 block">10,000+ events</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">PRO</span>
                  </td>
                  <td className="py-4 px-4 text-center text-sm text-slate-400">10K/mo</td>
                  <td className="py-4 px-4 text-center text-sm text-slate-500">Export Pack (+$10)</td>
                </tr>
                <tr className="border-b border-slate-800/50">
                  <td className="py-4 px-4">
                    <span className="font-medium text-white">Places Discovery</span>
                    <span className="text-xs text-slate-500 block">5,000+ POIs</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">PRO</span>
                  </td>
                  <td className="py-4 px-4 text-center text-sm text-slate-400">10K/mo</td>
                  <td className="py-4 px-4 text-center text-sm text-slate-500">Leads Pack (+$15)</td>
                </tr>
                <tr className="border-b border-slate-800/50">
                  <td className="py-4 px-4">
                    <span className="font-medium text-white">Transport API</span>
                    <span className="text-xs text-slate-500 block">Routes, schedules, fares</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">PRO</span>
                  </td>
                  <td className="py-4 px-4 text-center text-sm text-slate-400">10K/mo</td>
                  <td className="py-4 px-4 text-center text-sm text-slate-500">—</td>
                </tr>
                <tr className="border-b border-slate-800/50">
                  <td className="py-4 px-4">
                    <span className="font-medium text-white">Marine Conditions</span>
                    <span className="text-xs text-slate-500 block">Beach & maritime data</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">PRO</span>
                  </td>
                  <td className="py-4 px-4 text-center text-sm text-slate-400">10K/mo</td>
                  <td className="py-4 px-4 text-center text-sm text-slate-500">Webhook Pack (+$10)</td>
                </tr>
                <tr>
                  <td className="py-4 px-4">
                    <span className="font-medium text-white">Geospatial Mapping</span>
                    <span className="text-xs text-slate-500 block">Maps & POI intelligence</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">PRO</span>
                  </td>
                  <td className="py-4 px-4 text-center text-sm text-slate-400">10K/mo</td>
                  <td className="py-4 px-4 text-center text-sm text-slate-500">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Monetization: Leads & Data */}
      <section className="py-16 bg-slate-900/50 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-cyan-900/20 to-emerald-900/20 rounded-3xl p-10 border border-cyan-800/30">
            <div className="w-14 h-14 bg-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Beyond Free Data — Real Business Intelligence</h2>
            <p className="text-slate-400 mb-6 max-w-xl mx-auto text-sm">
              Currency exchange rates are free everywhere. Our edge is in the data around them — who needs them, 
              when they need it, and why. The Leads Pack gives you business contact data for tourism vendors, 
              FX service providers, and arbitrage opportunities. This is where we monetize.
            </p>
            <a href="#get-started" className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl transition-colors">
              Get Started
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative" id="get-started">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Start Building Today</h2>
          <p className="text-slate-400 mb-8">
            Get your free API key or subscribe to Pro. No credit card required for free tier.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
              required
            />
            <button type="submit" className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl transition-colors">
              Get API Access
            </button>
          </form>
          {formStatus && <p className="mt-4 text-emerald-400 text-sm">{formStatus}</p>}
        </div>
      </section>
    </div>
  );
}