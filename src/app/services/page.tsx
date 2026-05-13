'use client';

import { useState } from 'react';
import Link from 'next/link';
import { submitServiceInquiry } from '@/lib/api';

interface Service {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  image: string;
  color: string;
  gradient: string;
  href: string;
  category: 'tourism' | 'business' | 'audit' | 'web-dev' | 'ai';
  features: string[];
  whiteLabel: boolean;
  comingSoon?: boolean;
}

const services: Service[] = [
  {
    id: 'tourism-apis',
    title: 'Tourism APIs',
    shortTitle: 'Tourism',
    description: 'One subscription for all Caribbean Tourism APIs — currency exchange free, events, places, weather, transport, marine, geospatial.',
    icon: '🏝️',
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&h=400&fit=crop',
    color: 'cyan',
    gradient: 'from-cyan-500 to-emerald-500',
    href: '/services/tourism',
    category: 'tourism',
    features: ['Currency Exchange FREE', 'Events & Places', 'Weather & Marine', 'Transport & Geospatial'],
    whiteLabel: true,
  },
  {
    id: 'business-apis',
    title: 'Business APIs',
    shortTitle: 'Business',
    description: 'Powerful APIs for data conversion, accounting, inventory management and business automation.',
    icon: '💼',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    color: 'blue',
    gradient: 'from-blue-500 to-indigo-500',
    href: '/services/business',
    category: 'business',
    features: ['Data↔Spreadsheet API', 'Accounting Integration', 'Inventory Management', 'Business Automation'],
    whiteLabel: true,
  },
  {
    id: 'business-audit',
    title: 'Business Auditing',
    shortTitle: 'Audit',
    description: 'Comprehensive business scoring - SEO analysis, Google Maps profile verification, website quality audits.',
    icon: '🔍',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    color: 'amber',
    gradient: 'from-amber-500 to-orange-500',
    href: '/services/audit',
    category: 'audit',
    features: ['SEO Score Analysis', 'Google Maps Profile Check', 'Website Quality Audit', 'Social Presence Score'],
    whiteLabel: true,
  },
  {
    id: 'web-dev',
    title: 'Website Development',
    shortTitle: 'Web Dev',
    description: 'Build new websites for businesses without one, or optimize and refine existing websites.',
    icon: '🌐',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-500',
    href: '/services/web-dev',
    category: 'web-dev',
    features: ['New Website Build', 'Website Optimization', 'SEO Enhancement', 'Performance Tuning'],
    whiteLabel: true,
  },
  {
    id: 'ai-marketing',
    title: 'AI Marketing',
    shortTitle: 'AI Marketing',
    description: 'AI-powered marketing campaigns, content generation, and automated outreach.',
    icon: '📢',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&h=400&fit=crop',
    color: 'rose',
    gradient: 'from-rose-500 to-pink-500',
    href: '/services/ai/marketing',
    category: 'ai',
    features: ['Campaign Automation', 'Content Generation', 'Audience Targeting', 'Performance Analytics'],
    whiteLabel: true,
  },
  {
    id: 'mirofish-ai',
    title: 'MiroFish AI',
    shortTitle: 'MiroFish',
    description: 'AI-powered crowd simulation and demographic analysis for events and locations.',
    icon: '🐟',
    image: 'https://images.unsplash.com/photo-1505163515351-3c8f7b4b4e4e?w=600&h=400&fit=crop',
    color: 'teal',
    gradient: 'from-teal-500 to-cyan-500',
    href: '/services/ai/mirofish',
    category: 'ai',
    features: ['Crowd Simulation', 'Demographic Analysis', 'Event Planning', 'Location Analytics'],
    whiteLabel: true,
  },
  {
    id: 'ask-maps',
    title: 'Ask Maps',
    shortTitle: 'Ask Maps',
    description: 'AI-powered business Q&A using Google Maps data - find businesses, reviews, and local insights.',
    icon: '🗺️',
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=400&fit=crop',
    color: 'indigo',
    gradient: 'from-indigo-500 to-blue-500',
    href: '/services/ai/ask-maps',
    category: 'ai',
    features: ['Business Search', 'Review Analysis', 'Local Insights', 'AI Q&A Interface'],
    whiteLabel: true,
  },
  {
    id: 'developer',
    title: 'Developer Portal',
    shortTitle: 'API Access',
    description: 'API keys, usage statistics, sandbox testing, and full developer documentation.',
    icon: '🔧',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
    color: 'slate',
    gradient: 'from-slate-500 to-zinc-500',
    href: '/api-services',
    category: 'business',
    features: ['API Keys', 'Usage Analytics', 'Sandbox Testing', 'Full Documentation'],
    whiteLabel: false,
  },
];

const categories = [
  { id: 'all', label: 'All Services', icon: '✨' },
  { id: 'tourism', label: 'Tourism', icon: '🏝️' },
  { id: 'business', label: 'Business', icon: '💼' },
  { id: 'audit', label: 'Auditing', icon: '🔍' },
  { id: 'web-dev', label: 'Web Dev', icon: '🌐' },
  { id: 'ai', label: 'AI Solutions', icon: '🤖' },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={service.href}
      className="group relative rounded-3xl overflow-hidden block"
      style={{ animationDelay: `${index * 0.05}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-900 rounded-3xl border border-slate-800 group-hover:border-slate-700 transition-all" />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-900 rounded-3xl border border-slate-800 group-hover:border-slate-700 transition-all">
        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
      </div>
      
      <div className="relative flex flex-col h-full">
        <div className="aspect-[16/9] overflow-hidden rounded-t-3xl">
          <img 
            src={service.image} 
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-3">
            {service.whiteLabel && (
              <span className="px-2 py-1 text-[10px] font-medium rounded-full bg-white/10 text-slate-400 backdrop-blur-sm">
                White Label
              </span>
            )}
            {service.comingSoon && (
              <span className="px-2 py-1 text-[10px] font-medium rounded-full bg-amber-500/20 text-amber-400 backdrop-blur-sm">
                Coming Soon
              </span>
            )}
          </div>
          
          <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
          <p className="text-slate-400 text-sm mb-3 flex-1">{service.description}</p>
          
          <div className="flex flex-wrap gap-1.5 mb-3">
            {service.features.slice(0, 3).map((feature) => (
              <span key={feature} className="px-2 py-0.5 text-[10px] rounded-full bg-slate-800 text-slate-400">
                {feature}
              </span>
            ))}
            {service.features.length > 3 && (
              <span className="px-2 py-0.5 text-[10px] rounded-full bg-slate-800 text-slate-500">
                +{service.features.length - 3}
              </span>
            )}
          </div>
          
          <div className="flex items-center text-sm font-medium text-cyan-400 group-hover:text-cyan-300 mt-auto">
            <span>Explore</span>
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState('');

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await submitServiceInquiry({
      service_type: 'general',
      name: 'Website Visitor',
      email: email,
      source: 'bquikr'
    });
    
    setFormStatus('Thanks for your interest! We\'ll contact you within 24 hours.');
    setEmail('');
  };

  return (
    <div className="bg-slate-950 min-h-screen">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px]" />
      </div>

      <section className="relative pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm mb-6">
              Our Services
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              Solutions for
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Modern Business
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              From Tourism APIs to AI-powered solutions - comprehensive tools designed specifically for Caribbean businesses. 
              White-label ready for partners and resellers.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-cyan-500 text-slate-900'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-400">No services found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-12 text-center border border-slate-700">
            <h2 className="text-3xl font-bold text-white mb-4">Partner with IBT Solutions</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              All our services are white-label ready. Partner with us to deliver premium solutions under your brand. 
              Reseller packages available for agencies and consultants.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-medium rounded-xl transition-colors"
              >
                Contact Us
              </Link>
              <Link 
                href="#contact" 
                className="px-6 py-3 border border-slate-700 hover:border-slate-600 text-white font-medium rounded-xl transition-colors"
              >
                Request Info
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 border-t border-slate-800">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Get in Touch</h2>
            <p className="text-slate-400">Have questions about our services? We&apos;ll get back to you within 24 hours.</p>
          </div>
          
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-6 py-4 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              required
            />
            <button
              type="submit"
              className="w-full px-6 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl transition-colors"
            >
              Request Information
            </button>
            {formStatus && (
              <p className="text-center text-emerald-400 text-sm">{formStatus}</p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}