'use client';

import { useState } from 'react';
import Link from 'next/link';

const services = [
  {
    title: 'Website Auditing',
    description: "Comprehensive analysis of your website's SEO, performance, user experience, and conversion potential.",
    href: '/services/audit',
    color: 'cyan',
  },
  {
    title: 'Web & App Design',
    description: 'Custom websites and mobile applications built with modern technologies. From landing pages to full platforms.',
    href: '/services/web-dev',
    color: 'emerald',
  },
  {
    title: 'Graphic Design',
    description: 'Professional branding, logos, marketing materials, and print-on-demand merchandise.',
    href: '/coops/graphic-trends',
    color: 'violet',
  },
  {
    title: 'Business Automation',
    description: 'Streamline operations with automated workflows, API integrations, and intelligent business processes.',
    href: '/services/business',
    color: 'amber',
  },
  {
    title: 'Gap & Pain Analysis',
    description: 'Deep-dive consultation to identify business challenges and uncover growth opportunities.',
    href: '/contact',
    color: 'rose',
  },
  {
    title: 'Lead Generation',
    description: 'Data-driven strategies to identify and capture high-quality leads for your business.',
    href: '/contact',
    color: 'teal',
  },
  {
    title: 'AI Solutions',
    description: 'From chatbots to predictive analytics — leverage AI to transform your operations.',
    href: '/services/ai',
    color: 'indigo',
  },
  {
    title: 'Consultation',
    description: 'Expert guidance on digital strategy, technology decisions, and business growth.',
    href: '/contact',
    color: 'cyan',
  },
];

const coops = [
  {
    title: 'Trades & Services',
    desc: 'Skilled workers united',
    href: '/coops/trades',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop',
  },
  {
    title: 'Micro-Farms',
    desc: 'Local agriculture',
    href: '/coops/micro-farms',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
  },
  {
    title: 'Graphic Trends',
    desc: 'Micro-manufacturing',
    href: '/coops/graphic-trends',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop',
  },
  {
    title: 'Storage & Logistics',
    desc: 'Coming soon',
    href: '#',
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=400&h=300&fit=crop',
  },
];

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState('');

  const stats = [
    { value: '50K+', label: 'API Requests' },
    { value: '99.9%', label: 'Uptime' },
    { value: '100+', label: 'Projects' },
  ];

  const trustSignals = [
    'Caribbean-Based', 'St. Kitts & Nevis', '24/7 Support', 'Fast Delivery',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('Thanks for your interest! We\'ll be in touch soon.');
    setEmail('');
  };

  return (
    <div className="bg-slate-950">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative">
        <section className="relative min-h-[90vh] flex items-center justify-center">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&h=1080&fit=crop&q=80" 
              alt="Caribbean business district"
              className="w-full h-full object-cover opacity-30"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/70 to-slate-950" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm mb-8">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              Caribbean Business Solutions
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Transform Your
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Caribbean Business
              </span>
            </h1>

            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
              AI-powered tools, professional services, and a growing co-operative federation — 
              everything you need to compete in the modern economy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/services" className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-cyan-500/25">
                Explore Services
              </Link>
              <Link href="/coops" className="px-8 py-4 border border-emerald-500/50 hover:border-emerald-400 text-emerald-400 font-medium rounded-xl transition-all">
                Join IBT Co-ops
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {trustSignals.map((signal) => (
                <span key={signal} className="px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 text-slate-300 text-sm">
                  {signal}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Our Services</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                From website audits to AI integration — comprehensive solutions for modern Caribbean businesses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all hover:-translate-y-1"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-slate-800 group-hover:bg-slate-700 flex items-center justify-center mb-4 transition-colors">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-400">{service.description}</p>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
              >
                View All Services
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-24 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm mb-6">
                  IBT Co-operative Federation
                </span>
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                  Own Your Future.
                  <br />
                  <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                    Build Together.
                  </span>
                </h2>
                <p className="text-lg text-slate-400 mb-8">
                  Join a community of small businesses, skilled workers, and entrepreneurs united 
                  in democratically-governed cooperatives. IBT Solutions provides the tools and 
                  infrastructure — you own the future.
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  {['Trades & Services', 'Micro-Farms', 'Graphic Trends'].map((coop) => (
                    <span key={coop} className="px-4 py-2 rounded-full bg-slate-800 text-slate-300 text-sm">
                      {coop}
                    </span>
                  ))}
                </div>
                <Link
                  href="/coops"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold rounded-xl transition-all"
                >
                  Explore IBT Co-ops
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {coops.map((coop) => (
                  <Link
                    key={coop.title}
                    href={coop.href}
                    className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-800"
                  >
                    <img
                      src={coop.image}
                      alt={coop.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.style.background = 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-semibold text-white text-sm">{coop.title}</h3>
                      <p className="text-xs text-slate-400">{coop.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-3xl blur-xl" />
                <img 
                  src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&h=500&fit=crop"
                  alt="IslandHub Marketplace"
                  className="relative rounded-2xl shadow-2xl border border-slate-800 w-full"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute -bottom-4 -right-4 px-4 py-2 bg-cyan-500 rounded-xl shadow-lg">
                  <span className="text-slate-900 font-bold text-sm">Live Marketplace</span>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm mb-6">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  Featured Platform
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                  Meet <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">IslandHub</span>
                </h2>
                <p className="text-lg text-slate-400 mb-6">
                  The Caribbean&apos;s complete marketplace — vendor stores, food delivery, 
                  ride services, auctions, and more, all in one platform.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {['Vendor Stores', 'Food Delivery', 'Ride Services', 'Secure Payments'].map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-slate-300">
                      <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
                <a
                  href="https://islandhub-7dor6ly4p-rpskilli211-3018s-projects.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl transition-all"
                >
                  Explore IslandHub
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-slate-400 mb-8">
              Let&apos;s discuss how IBT Solutions can help transform your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/contact" className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl transition-all">
                Book Consultation
              </Link>
              <Link href="/portfolio" className="px-8 py-4 border border-slate-700 hover:border-slate-600 text-white font-medium rounded-xl transition-all">
                View Portfolio
              </Link>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                required
              />
              <button type="submit" className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-all">
                Submit
              </button>
            </form>
            {formStatus && <p className="text-cyan-400 mt-4">{formStatus}</p>}
          </div>
        </section>
      </div>
    </div>
  );
}