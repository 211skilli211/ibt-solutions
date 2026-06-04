'use client';

import { useState } from 'react';
import { submitServiceInquiry } from '@/lib/api';
import AdminServiceHero from '@/components/AdminServiceHero';

const businessAPIs = [
  {
    id: 'data-convert',
    name: 'Data Conversion API',
    description: 'Convert between data formats - JSON, CSV, XML, Excel, and more.',
    price: 'From $19/mo',
    features: ['10+ formats', 'Batch processing', 'Validation', 'Schema mapping'],
  },
  {
    id: 'spreadsheet',
    name: 'Spreadsheet API',
    description: 'Programmatic Google Sheets and Excel operations.',
    price: 'From $29/mo',
    features: ['Read/Write', 'Formulas', 'Charts', 'Real-time sync'],
  },
  {
    id: 'accounting',
    name: 'Accounting API',
    description: 'Simple accounting integration for small businesses.',
    price: 'From $49/mo',
    features: ['Invoicing', 'Expense tracking', 'Reports', 'Tax prep'],
  },
  {
    id: 'inventory',
    name: 'Inventory API',
    description: 'Real-time inventory management and tracking.',
    price: 'From $39/mo',
    features: ['Stock levels', 'Reorder alerts', 'Multi-location', 'Barcode'],
  },
  {
    id: 'crm',
    name: 'CRM Lite API',
    description: 'Lightweight CRM operations for small business.',
    price: 'From $29/mo',
    features: ['Contacts', 'Deals', 'Tasks', 'Notes'],
  },
  {
    id: 'automation',
    name: 'Workflow Automation',
    description: 'Automate business processes with triggers and actions.',
    price: 'From $49/mo',
    features: ['Triggers', 'Actions', 'Schedules', 'Webhooks'],
  },
];

export default function BusinessPage() {
  const [activeAPI, setActiveAPI] = useState(businessAPIs[0]);
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await submitServiceInquiry({
      service_type: 'business-api',
      name: 'API Visitor',
      email: email,
      source: 'bquikr',
      message: 'Interested in Business APIs'
    });
    
    setFormStatus('Thanks! Check your email for API access.');
    setEmail('');
  };

  return (
    <div className="bg-ocean-900 min-h-screen">
      <AdminServiceHero
        pageKey="ibt-services-business"
        fallback={{
          badge: 'Business APIs',
          badgeVariant: 'emerald',
          title: 'Automate Your',
          titleGradient: 'Business Operations',
          subtitle: 'Powerful APIs for data conversion, accounting, inventory management and business automation. Built for small Caribbean businesses.',
        }}
      >
        {({ title, titleGradient, subtitle, badge }) => (
          <section className="pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm mb-6">
                  {badge}
                </span>
                <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
                  {title}
                  <br />
                  <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-amber-400 bg-clip-text text-transparent">
                    {titleGradient}
                  </span>
                </h1>
                <p className="text-xl text-ink-400 max-w-2xl mx-auto">
                  {subtitle}
                </p>
              </div>
            </div>
          </section>
        )}
      </AdminServiceHero>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-surface-1 rounded-2xl p-4 border border-surface-2 sticky top-24">
                <h3 className="text-sm font-medium text-ink-400 mb-4 uppercase tracking-wider">APIs</h3>
                <div className="space-y-2">
                  {businessAPIs.map((api) => (
                    <button
                      key={api.id}
                      onClick={() => setActiveAPI(api)}
                      className={`w-full text-left p-4 rounded-xl transition-all ${
                        activeAPI.id === api.id
                          ? 'bg-blue-500/20 border border-blue-500/50 text-white'
                          : 'bg-surface-2/50 border border-transparent text-ink-400 hover:text-white hover:bg-surface-2'
                      }`}
                    >
                      <div className="font-medium">{api.name}</div>
                      <div className="text-sm text-ink-500">{api.price}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-surface-1 rounded-3xl p-8 border border-surface-2">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{activeAPI.name}</h2>
                    <p className="text-ink-400">{activeAPI.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">{activeAPI.price}</div>
                    <div className="text-sm text-ink-500">per month</div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-sm font-medium text-ink-400 mb-4 uppercase tracking-wider">Features</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {activeAPI.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-white">
                        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 px-6 py-3 bg-surface-2 hover:bg-ink-700 text-white text-center font-medium rounded-xl">
                    View Docs
                  </button>
                  <button className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-400 text-surface-1 text-center font-medium rounded-xl">
                    Get API Key
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 border-t border-surface-2">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to automate?</h2>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="flex-1 px-6 py-4 bg-surface-1 border border-surface-2 rounded-xl text-white placeholder:text-ink-500 focus:outline-none focus:border-blue-500" required />
            <button type="submit" className="px-8 py-4 bg-blue-500 hover:bg-blue-400 text-surface-1 font-semibold rounded-xl">Get Key</button>
          </form>
          {formStatus && <p className="mt-4 text-emerald-400">{formStatus}</p>}
        </div>
      </section>
    </div>
  );
}