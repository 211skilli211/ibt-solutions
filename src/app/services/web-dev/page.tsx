'use client';

import { useState } from 'react';
import { submitServiceInquiry } from '@/lib/api';
import AdminServiceHero from '@/components/AdminServiceHero';

const webServices = [
  {
    id: 'new-site',
    title: 'New Website Build',
    description: 'Complete professional website built from scratch.',
    price: '$199',
    originalPrice: '$499',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=350&fit=crop',
    features: ['Custom design', 'Mobile responsive', 'SEO ready', 'Contact forms', 'Social integration'],
    popular: true,
  },
  {
    id: 'redesign',
    title: 'Website Redesign',
    description: 'Modernize your existing website with fresh design.',
    price: '$199',
    originalPrice: '$299',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=350&fit=crop',
    features: ['New design system', 'Speed optimization', 'Mobile-first', 'Content refresh', 'Analytics setup'],
  },
  {
    id: 'optimize',
    title: 'SEO Optimization',
    description: 'Improve search rankings and organic traffic.',
    price: 'From $199',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=350&fit=crop',
    features: ['Keyword research', 'On-page SEO', 'Technical fixes', 'Link building', 'Monthly reports'],
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Store',
    description: 'Online store with payments and inventory.',
    price: 'From $799',
    image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=600&h=350&fit=crop',
    features: ['Product catalog', 'Payment processing', 'Inventory mgmt', 'Order tracking', 'Staff accounts'],
  },
  {
    id: 'maintenance',
    title: 'Ongoing Maintenance',
    description: 'Monthly care for your website.',
    price: '$99/mo',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=350&fit=crop',
    features: ['Security updates', 'Content changes', 'Backups', 'Uptime monitoring', 'Support'],
  },
  {
    id: 'reseller',
    title: 'White Label Partner',
    description: 'Resell website services under your brand.',
    price: 'Partner',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=350&fit=crop',
    features: ['White label', 'Partner pricing', 'Dedicated support', 'Client portal', 'API access'],
  },
];

export default function WebDevPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await submitServiceInquiry({
      service_type: 'web-dev',
      name: 'Website Visitor',
      email: email,
      source: 'bquikr',
      message: message || 'Interested in website development services'
    });
    
    setFormStatus('Thanks! We\'ll contact you within 24 hours.');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="bg-slate-950 min-h-screen">
      <AdminServiceHero
        pageKey="ibt-services-web"
        fallback={{
          badge: 'Website Development',
          badgeVariant: 'teal',
          title: 'Build or Refine Your',
          titleGradient: 'Online Presence',
          subtitle: 'Professional websites for Caribbean businesses. From new builds to SEO optimization — we help you stand out online.',
        }}
      >
        {({ title, titleGradient, subtitle, badge }) => (
          <section className="pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <span className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm mb-6">
                {badge}
              </span>
              <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
                {title}
                <br />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  {titleGradient}
                </span>
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                {subtitle}
              </p>
            </div>
          </section>
        )}
      </AdminServiceHero>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {webServices.map((service) => (
              <div key={service.id} className={`bg-slate-900 rounded-3xl overflow-hidden border ${service.popular ? 'border-emerald-500/50' : 'border-slate-800'} relative`}>
                {service.popular && (
                  <span className="absolute top-3 right-3 z-10 px-3 py-1 bg-emerald-500 text-slate-900 text-xs font-bold rounded-full shadow-lg">
                    PROMO
                  </span>
                )}
                <div className="aspect-video overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-1">{service.title}</h3>
                  <p className="text-slate-400 text-xs mb-3">{service.description}</p>
                  <div className="mb-3">
                    <span className="text-xl font-bold text-white">{service.price}</span>
                    {service.originalPrice && (
                      <span className="ml-2 text-sm text-slate-500 line-through">{service.originalPrice}</span>
                    )}
                  </div>
                  <ul className="space-y-1.5 mb-4">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-slate-400">
                        <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-2.5 rounded-lg font-medium text-sm ${service.popular ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-900' : 'bg-slate-800 hover:bg-slate-700 text-white'}`}>
                    Get Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Discovery', desc: 'We learn about your business and goals' },
              { step: '2', title: 'Design', desc: 'We create mockups for your approval' },
              { step: '3', title: 'Build', desc: 'We develop your website' },
              { step: '4', title: 'Launch', desc: 'We go live and train you' },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 font-bold mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="text-white font-medium mb-2">{s.title}</h3>
                <p className="text-sm text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-slate-800">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to get started?</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className="w-full px-6 py-4 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500" required />
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us about your project" className="w-full px-6 py-4 bg-slate-900 border border-slate-800 rounded-xl text-white h-32 focus:outline-none focus:border-emerald-500" />
            <button className="w-full px-6 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold rounded-xl">Send Inquiry</button>
          </form>
          {formStatus && <p className="mt-4 text-emerald-400">{formStatus}</p>}
        </div>
      </section>
    </div>
  );
}