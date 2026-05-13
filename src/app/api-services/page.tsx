'use client';

import { useState } from 'react';
import Link from 'next/link';
import { submitServiceInquiry } from '@/lib/api';

const allAPIs = [
  {
    id: 'currency',
    name: 'Currency Exchange',
    description: 'Real-time Caribbean and international exchange rates. Historical data, trend charts, and rate alerts.',
    category: 'tourism',
    included: 'free',
    status: 'Live',
    features: ['150+ currencies', 'Real-time rates', 'Historical data', 'Trend charts', 'Rate alerts'],
    endpoint: '/api/tourism/currency',
  },
  {
    id: 'events',
    name: 'Caribbean Events',
    description: 'Comprehensive events database — festivals, concerts, sports, cultural celebrations across the Caribbean.',
    category: 'tourism',
    included: 'pro',
    status: 'Live',
    features: ['10,000+ events', 'Filters by location', 'Categories', 'iCal export'],
    endpoint: '/api/tourism/events',
  },
  {
    id: 'places',
    name: 'Places Discovery',
    description: 'Discover restaurants, attractions, beaches, and hidden gems across the Caribbean.',
    category: 'tourism',
    included: 'pro',
    status: 'Live',
    features: ['5000+ places', 'Reviews', 'Photos', 'Ratings', 'Maps'],
    endpoint: '/api/tourism/places',
  },
  {
    id: 'weather',
    name: 'Weather API',
    description: 'Land and marine weather forecasts with alerts for the Caribbean region.',
    category: 'tourism',
    included: 'free',
    status: 'Live',
    features: ['7-day forecast', 'Marine conditions', 'Alerts', 'Historical data'],
    endpoint: '/api/tourism/weather',
  },
  {
    id: 'transport',
    name: 'Transport API',
    description: 'Public transport schedules, ferry times, and taxi services across the Caribbean.',
    category: 'tourism',
    included: 'pro',
    status: 'Live',
    features: ['Schedules', 'Route planning', 'Fare estimates', 'Real-time updates'],
    endpoint: '/api/tourism/transport',
  },
  {
    id: 'marine',
    name: 'Marine Conditions',
    description: 'Beach water temperature, wave height, safety flags, and maritime data.',
    category: 'tourism',
    included: 'pro',
    status: 'Live',
    features: ['Water temp', 'Wave height', 'Safety flags', 'Tide data'],
    endpoint: '/api/tourism/marine',
  },
  {
    id: 'geospatial',
    name: 'Geospatial Mapping',
    description: 'Interactive maps, POI data, and location intelligence for Caribbean businesses.',
    category: 'tourism',
    included: 'pro',
    status: 'Live',
    features: ['Custom maps', 'POI data', 'Route optimization', '5 view modes'],
    endpoint: '/api/tourism/geospatial',
  },
  {
    id: 'data-convert',
    name: 'Data Conversion',
    description: 'Convert between data formats — JSON, CSV, XML, Excel, and more.',
    category: 'business',
    included: 'pro',
    status: 'Live',
    features: ['10+ formats', 'Batch processing', 'Schema mapping', 'Validation'],
    endpoint: '/api/business/convert',
  },
  {
    id: 'email-verify',
    name: 'Email Verification',
    description: 'Check if an email address is valid and deliverable.',
    category: 'business',
    included: 'pro',
    status: 'Live',
    features: ['Format check', 'Deliverability', 'MX records', 'Disposable detection'],
    endpoint: '/api/business/email/verify',
  },
];

const addons = [
  {
    id: 'leads',
    name: 'Leads Pack',
    price: '$15/mo',
    description: 'Business contact data, tourism vendor leads, and FX arbitrage opportunity alerts.',
    features: ['Business contacts', 'Tourism vendor leads', 'FX opportunity alerts', 'Webhook notifications'],
    popular: false,
  },
  {
    id: 'webhooks',
    name: 'Webhook Pack',
    price: '$10/mo',
    description: 'Real-time WebSocket updates and push notifications for all endpoints.',
    features: ['Real-time updates', 'Push notifications', 'Event triggers', 'Custom endpoints'],
    popular: false,
  },
  {
    id: 'export',
    name: 'Export Pack',
    price: '$10/mo',
    description: 'Bulk CSV/JSON export, scheduled reports, iCal sync, and PDF generation.',
    features: ['Bulk export', 'Scheduled reports', 'iCal sync', 'PDF generation'],
    popular: false,
  },
];

const codeExamples = {
  curl: 'curl -X GET "https://api.ibtsolutions.com/v1/tourism/events?location=St+Kitts" \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json"',
  python: 'import requests\n\nresponse = requests.get(\n    "https://api.ibtsolutions.com/v1/tourism/events",\n    headers={"Authorization": "Bearer YOUR_API_KEY"},\n    params={"location": "St+Kitts"}\n)\nprint(response.json())',
  javascript: 'fetch("https://api.ibtsolutions.com/v1/tourism/events?location=St+Kitts", {\n  headers: {\n    "Authorization": "Bearer YOUR_API_KEY"\n  }\n})\n.then(res => res.json())\n.then(data => console.log(data));',
};

const sdks = [
  { name: 'Node.js', version: 'v2.1.0', installs: '12K/mo', color: 'emerald' },
  { name: 'Python', version: 'v1.8.0', installs: '8K/mo', color: 'blue' },
  { name: 'Go', version: 'v1.3.0', installs: '3K/mo', color: 'cyan' },
];

const categories = ['All', 'Tourism', 'Business', 'Utility'];

export default function APIServicesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState('');
  const [activeCode, setActiveCode] = useState<'curl' | 'python' | 'javascript'>('curl');

  const filteredAPIs = activeCategory === 'All' 
    ? allAPIs 
    : allAPIs.filter(a => a.category.toLowerCase() === activeCategory.toLowerCase());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitServiceInquiry({
      service_type: 'api-dev-portal',
      name: 'Developer',
      email: email,
      source: 'bquikr',
      message: 'Interested in IBT API Developer Portal'
    });
    setFormStatus('Check your email for API access instructions!');
    setEmail('');
  };

  return (
    <div className="bg-slate-950 min-h-screen">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px]" />
      </div>

      {/* Hero */}
      <section className="pt-32 pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm mb-6">
              Developer Portal
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              Build with
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                IBT APIs
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
              Powerful, reliable APIs for Caribbean applications. Tourism data, business automation, 
              geospatial intelligence — all in one developer platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a 
                href="#get-started" 
                className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl transition-all"
              >
                Get Free API Key
              </a>
              <a 
                href="#docs" 
                className="px-8 py-4 border border-slate-700 hover:border-slate-600 text-white font-medium rounded-xl transition-all"
              >
                View Documentation
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { value: '50K+', label: 'Requests/day' },
                { value: '99.9%', label: 'Uptime' },
                { value: '9', label: 'APIs' },
                { value: '<100ms', label: 'Avg Response' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* API Catalog */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">API Catalog</h2>
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-cyan-500 text-slate-900'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAPIs.map((api) => (
              <div 
                key={api.id}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">{api.name}</h3>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 mt-0.5">{api.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 text-[10px] rounded-full font-medium ${
                      api.status === 'Live' 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {api.status}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-slate-400 mb-3">{api.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {api.features.slice(0, 2).map((f) => (
                      <span key={f} className="px-2 py-0.5 text-[10px] rounded-full bg-slate-800 text-slate-500">{f}</span>
                    ))}
                    {api.features.length > 2 && (
                      <span className="px-2 py-0.5 text-[10px] rounded-full bg-slate-800 text-slate-500">+{api.features.length - 2}</span>
                    )}
                  </div>
                  <span className={`text-[10px] font-medium ${
                    api.included === 'free' ? 'text-emerald-400' : 'text-cyan-400'
                  }`}>
                    {api.included === 'free' ? 'FREE' : 'PRO'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-slate-900/50 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Simple, Transparent Pricing</h2>
            <p className="text-slate-400">Start free, scale as you grow.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 text-center">
              <div className="text-lg font-bold text-white mb-1">Free</div>
              <div className="text-3xl font-bold text-white mb-1">$0</div>
              <div className="text-sm text-slate-500 mb-6">Forever free</div>
              <ul className="text-sm text-slate-400 space-y-2 mb-6 text-left">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  1,000 requests/month
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Currency Exchange API
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Weather API (basic)
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Community support
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Events & Places APIs
                </li>
              </ul>
              <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-colors">
                Get Free Key
              </button>
            </div>

            {/* Pro */}
            <div className="relative bg-slate-900/80 border-2 border-cyan-500/50 rounded-2xl p-6 text-center">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-cyan-500 text-slate-900 text-xs font-bold rounded-full">
                MOST POPULAR
              </div>
              <div className="text-lg font-bold text-white mb-1">Pro</div>
              <div className="text-3xl font-bold text-white mb-1">$39</div>
              <div className="text-sm text-slate-500 mb-6">per month</div>
              <ul className="text-sm text-slate-400 space-y-2 mb-6 text-left">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  10,000 requests/month
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  All Tourism APIs
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  All Business APIs
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Email support
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Add-ons available
                </li>
              </ul>
              <button className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl transition-colors">
                Subscribe Pro
              </button>
            </div>

            {/* Enterprise */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 text-center">
              <div className="text-lg font-bold text-white mb-1">Enterprise</div>
              <div className="text-3xl font-bold text-white mb-1">Custom</div>
              <div className="text-sm text-slate-500 mb-6">Contact for pricing</div>
              <ul className="text-sm text-slate-400 space-y-2 mb-6 text-left">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited requests
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  White-label
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Dedicated support
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Custom SLAs
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  All add-ons included
                </li>
              </ul>
              <Link href="/contact" className="block w-full py-3 border border-slate-700 hover:border-slate-600 text-white font-medium rounded-xl transition-all text-center">
                Contact Sales
              </Link>
            </div>
          </div>

          {/* Add-ons */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-white mb-2">Pro Add-ons</h3>
              <p className="text-slate-400 text-sm">Extend your Pro subscription with powerful extras.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {addons.map((addon) => (
                <div key={addon.id} className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white">{addon.name}</h4>
                    <span className="text-lg font-bold text-cyan-400">{addon.price}</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-3">{addon.description}</p>
                  <ul className="space-y-1 mb-4">
                    {addon.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-slate-400">
                        <svg className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors">
                    Add to Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16 relative" id="docs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Get Started in Minutes</h2>
            <p className="text-slate-400">Three steps to your first API call.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { step: '1', title: 'Get Your API Key', desc: 'Sign up for free and receive your API key instantly.' },
              { step: '2', title: 'Read the Docs', desc: 'Browse our comprehensive documentation and examples.' },
              { step: '3', title: 'Make Your First Call', desc: 'Start building with code snippets in your preferred language.' },
            ].map((s) => (
              <div key={s.step} className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 text-center">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400 font-bold mx-auto mb-3">
                  {s.step}
                </div>
                <h3 className="font-semibold text-white mb-1">{s.title}</h3>
                <p className="text-sm text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Code Examples */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="flex border-b border-slate-800">
              {(['curl', 'python', 'javascript'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveCode(lang)}
                  className={`px-6 py-3 text-sm font-medium transition-all ${
                    activeCode === lang
                      ? 'bg-slate-800 text-white border-b-2 border-cyan-500'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {lang}
                </button>
              ))}
              <div className="flex-1" />
              <button className="px-4 py-3 text-slate-400 hover:text-white text-sm flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </button>
            </div>
            <pre className="p-6 text-sm text-slate-300 overflow-x-auto font-mono">
              {codeExamples[activeCode]}
            </pre>
          </div>
        </div>
      </section>

      {/* SDKs */}
      <section className="py-16 bg-slate-900/50 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-3">SDKs & Libraries</h2>
            <p className="text-slate-400 text-sm">Official libraries to speed up your integration.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {sdks.map((sdk) => (
              <div key={sdk.name} className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white">{sdk.name}</h4>
                  <p className="text-xs text-slate-500">v{sdk.version} · {sdk.installs} installs</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs rounded-lg transition-colors">
                    npm install
                  </button>
                  <button className="px-3 py-1.5 border border-slate-700 hover:border-slate-600 text-white text-xs rounded-lg transition-colors">
                    GitHub
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-3">Developer Dashboard</h2>
            <p className="text-slate-400 text-sm">Manage your API keys, monitor usage, and track quotas from your dashboard.</p>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white">Your API Keys</h3>
                  <button className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-900 text-xs font-medium rounded-lg transition-colors">
                    + Create New Key
                  </button>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Production Key', key: 'sk_live_ib_••••••••••••••••', used: '8,234', limit: '10,000' },
                    { name: 'Test Key', key: 'sk_test_ib_••••••••••••••••', used: '1,205', limit: '10,000' },
                  ].map((k) => (
                    <div key={k.name} className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-white">{k.name}</span>
                        <span className="text-xs text-slate-500">{k.used}/{k.limit} requests</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="text-xs text-cyan-400 font-mono">{k.key}</code>
                        <button className="text-xs text-slate-500 hover:text-white">Copy</button>
                      </div>
                      <div className="mt-2 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-cyan-500 rounded-full" 
                          style={{ width: `${(parseInt(k.used.replace(',','')) / parseInt(k.limit.replace(',',''))) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-4">Usage This Month</h3>
                <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
                  <div className="flex items-end justify-between mb-2 h-32">
                    {[40, 65, 55, 70, 85, 60, 75, 90, 72, 88, 95, 78].map((h, i) => (
                      <div 
                        key={i} 
                        className="w-6 bg-cyan-500/80 rounded-t-sm" 
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                    <span>Aug</span>
                    <span>Sep</span>
                    <span>Oct</span>
                    <span>Nov</span>
                    <span>Dec</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-slate-950 rounded-xl p-3 border border-slate-800">
                    <p className="text-xs text-slate-500">Total Requests</p>
                    <p className="text-xl font-bold text-white">48,234</p>
                  </div>
                  <div className="bg-slate-950 rounded-xl p-3 border border-slate-800">
                    <p className="text-xs text-slate-500">Avg Latency</p>
                    <p className="text-xl font-bold text-white">87ms</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="py-16 bg-slate-900/50 relative" id="get-started">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Build?</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Get your free API key and start building Caribbean-powered applications today. 
            No credit card required.
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
              Get API Key
            </button>
          </form>
          {formStatus && <p className="mt-4 text-emerald-400 text-sm">{formStatus}</p>}

          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <a href="https://github.com/211skilli211" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white text-sm flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a href="#" className="text-slate-400 hover:text-white text-sm flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Documentation
            </a>
            <a href="#" className="text-slate-400 hover:text-white text-sm flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Support
            </a>
            <a href="#" className="text-slate-400 hover:text-white text-sm flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Status Page
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}