'use client';

import { useState } from 'react';
import Link from 'next/link';

function ServiceCard({ service, index }: { service: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a 
      href={service.href || '#'}
      className="group relative rounded-2xl overflow-hidden block"
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0">
        <img 
          src={service.image} 
          alt={service.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/60" />
      </div>
      <div className="relative p-8 h-full flex flex-col min-h-[320px]">
        <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
        <p className="text-slate-300 mb-4 flex-1">{service.description}</p>
        <div className="flex flex-wrap gap-2">
          {service.tags?.map((tag: string) => (
            <span key={tag} className="px-3 py-1 text-xs rounded-full bg-white/10 text-slate-300">
              {tag}
            </span>
          ))}
        </div>
        {service.comingSoon && (
          <span className="absolute top-4 right-4 px-3 py-1 text-xs font-medium rounded-full bg-amber-500/20 text-amber-400">
            Coming Soon
          </span>
        )}
      </div>
    </a>
  );
}

function PartnerCard({ partner }: { partner: any }) {
  return (
    <a
      href={partner.href}
      target="_blank"
      className="group relative rounded-xl overflow-hidden"
    >
      <img 
        src={partner.image} 
        alt={partner.name}
        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span className="text-xs text-slate-400">{partner.type}</span>
        <h4 className="font-semibold text-white">{partner.name}</h4>
      </div>
    </a>
  );
}

export default function Home() {
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState('');

  const services = [
    {
      title: 'AI Digital Influencer',
      description: 'Create AI-powered influencers with authentic Caribbean accents. Full setup including voice cloning for marketing and social media.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
      tags: ['Voice Cloning', 'Multi-Platform', '24/7'],
      href: '/influencer',
      comingSoon: true,
    },
    {
      title: 'Business APIs',
      description: 'Powerful APIs for data conversion, accounting, inventory management and business automation.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      tags: ['Data→Spreadsheet', 'Accounting', 'Inventory'],
      href: '/api-services',
      comingSoon: false,
    },
    {
      title: 'Regional Intel',
      description: 'Location intelligence and geospatial analytics for Caribbean businesses and tourism.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      tags: ['Mapping', 'Analytics', 'Tourism'],
      href: '/geospatial',
      comingSoon: false,
    },
    {
      title: 'B2B Connectivity',
      description: 'API integration for regional businesses and telecom partnerships.',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
      tags: ['Telecom', 'Enterprise', 'Integration'],
      href: '#',
      comingSoon: true,
    },
  ];

  const partners = [
    { name: 'IslandHub', type: 'Marketplace', image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=400&h=200&fit=crop', href: 'https://islandhub-9itk6wkoc-rpskilli211-3018s-projects.vercel.app/' },
    { name: 'CTC Marketplace', type: 'Marketplace', image: 'https://images.unsplash.com/photo-1557821552-17105176666c?w=400&h=200&fit=crop', href: '#' },
    { name: 'Graphic Trends', type: 'Services', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=200&fit=crop', href: '#' },
    { name: 'IBT Financial', type: 'Fintech', image: 'https://images.unsplash.com/photo-1563013544-824ae1b70457?w=400&h=200&fit=crop', href: '#' },
    { name: 'Eloh Processing', type: 'Payments', image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=200&fit=crop', href: '#' },
  ];

  const whyChooseUs = [
    { icon: '🎯', title: 'Caribbean-First', description: 'Purpose-built for regional needs and challenges' },
    { icon: '⚡', title: 'API-First', description: 'Modern architecture for seamless integration' },
    { icon: '🌍', title: 'Global Reach', description: 'Serving clients across Caribbean and beyond' },
    { icon: '💬', title: '24/7 Support', description: 'Round-the-clock technical assistance' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('Thanks for your interest! We\'ll be in touch soon.');
    setEmail('');
  };

  return (
    <div className="bg-slate-950">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                IBT
              </span>
              <span className="text-sm text-slate-500 font-medium">Solutions</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-8">
                <Link href="/services" className="text-sm text-slate-300 hover:text-white transition-colors">Services</Link>
                <Link href="/coops" className="text-sm text-slate-300 hover:text-white transition-colors">IBT Co-ops</Link>
                <Link href="#partners" className="text-sm text-slate-300 hover:text-white transition-colors">Partners</Link>
                <Link href="#contact" className="text-sm text-slate-300 hover:text-white transition-colors">Contact</Link>
                <a href="https://islandhub.app" target="_blank" className="text-sm font-medium text-emerald-400 hover:text-emerald-300">
                  IslandHub →
                </a>
              </div>
              
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1519608487953-e999c86e7555?w=1920&h=1080&fit=crop" 
            alt="Caribbean Business"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fadeIn">
            <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm mb-8">
              Intelligent Business Solutions
            </span>
            <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6 leading-tight">
              Powering Caribbean
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Digital Excellence
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
              AI-powered tools, business APIs, and connectivity solutions for modern enterprises. 
              From the Caribbean to the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services" className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-cyan-500/25">
                Explore Services
              </Link>
              <Link href="/coops" className="px-8 py-4 border border-emerald-500 hover:border-emerald-400 text-emerald-400 font-medium rounded-xl transition-all">
                IBT Co-ops →
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20">
            {[
              { value: '50K+', label: 'API Requests' },
              { value: '99.9%', label: 'Uptime' },
              { value: '24/7', label: 'Support' },
            ].map((stat, i) => (
              <div key={i} className="text-center animate-slideUp" style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
                <div className="text-3xl sm:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Comprehensive solutions for modern Caribbean enterprises
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <div key={service.title} className="animate-fadeIn" style={{ animationDelay: `${i * 0.1}s` }}>
                <ServiceCard service={service} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, i) => (
              <div key={item.title} className="text-center p-6 animate-fadeIn" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IslandHub Marketplace Feature */}
      <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-3xl blur-2xl" />
              <img 
                src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&h=600&fit=crop"
                alt="IslandHub Marketplace"
                className="relative rounded-2xl shadow-2xl border border-slate-800"
              />
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 px-6 py-3 bg-cyan-500 rounded-xl shadow-lg">
                <span className="text-slate-900 font-bold">Marketplace Live</span>
              </div>
            </div>
            
            {/* Right - Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm mb-6">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Featured Platform
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Meet <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">IslandHub</span>
              </h2>
              <p className="text-lg text-slate-300 mb-8">
                Your complete Caribbean marketplace. Buy, sell, and connect with vendors across the region. 
                From local artisans to island-wide delivery — everything you need in one platform.
              </p>
              
              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  'Vendor Stores & Listings',
                  'Food & Grocery Delivery',
                  'Ride & Transport Services',
                  'Local Services & Bookings',
                  'Auction System',
                  'Secure Payments'
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              {/* CTA */}
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://islandhub-9itk6wkoc-rpskilli211-3018s-projects.vercel.app/" 
                  target="_blank"
                  className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-cyan-500/25"
                >
                  Explore IslandHub →
                </a>
                <a 
                  href="#contact"
                  className="px-8 py-4 border border-slate-700 hover:border-slate-600 text-white font-medium rounded-xl transition-all"
                >
                  Become a Vendor
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Our Ecosystem</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Connected platforms powering Caribbean commerce
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {partners.map((partner, i) => (
              <div key={partner.name} className="animate-scaleIn" style={{ animationDelay: `${i * 0.05}s` }}>
                <PartnerCard partner={partner} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-900/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform?</h2>
          <p className="text-slate-400 mb-8">
            Let&apos;s build something extraordinary together.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              required
            />
            <button type="submit" className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl transition-all">
              Submit
            </button>
          </form>
          {formStatus && <p className="text-cyan-400 mt-4">{formStatus}</p>}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                IBT
              </span>
              <span className="text-sm text-slate-500">Solutions</span>
            </div>
            <p className="text-slate-500 text-sm">
              © 2026 IBT Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}