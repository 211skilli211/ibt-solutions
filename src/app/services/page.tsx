'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, Section, SectionHeader, Card, Badge, GradientText, Input } from '@/components/ui';
import { submitServiceInquiry } from '@/lib/api';

import PageHero from '@/components/PageHero';

// ─── Data ───
const services = [
  { id: 'tourism-apis', title: 'Tourism APIs', description: 'Unified access to Caribbean Tourism APIs — currency exchange, events, places, weather, transport, marine, and geospatial data.', icon: '🏝️', image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&h=400&fit=crop', href: '/services/tourism', category: 'tourism', features: ['Currency Exchange', 'Events & Places', 'Weather & Marine', 'Transport & Geospatial'], whiteLabel: true },
  { id: 'business-apis', title: 'Business APIs', description: 'Data conversion, accounting, inventory management, and business automation APIs.', icon: '💼', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop', href: '/services/business', category: 'business', features: ['Data Conversion', 'Accounting Integration', 'Inventory Management', 'Business Automation'], whiteLabel: true },
  { id: 'business-audit', title: 'Business Auditing', description: 'Comprehensive business scoring — SEO analysis, Google Maps profile verification, and website quality audits.', icon: '🔍', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop', href: '/services/audit', category: 'audit', features: ['SEO Score Analysis', 'Google Maps Profile Check', 'Website Quality Audit', 'Social Presence Score'], whiteLabel: true },
  { id: 'web-dev', title: 'Website Development', description: 'Custom websites and web applications — from landing pages to full business platforms.', icon: '🌐', image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop', href: '/services/web-dev', category: 'web-dev', features: ['New Website Build', 'Website Optimization', 'SEO Enhancement', 'Performance Tuning'], whiteLabel: true },
  { id: 'ai-agents', title: 'AI Solutions', description: 'Intelligent automation agents for customer service, data analysis, and business operations.', icon: '🤖', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop', href: '/services/ai', category: 'ai', features: ['Customer Service Agents', 'Data Analysis', 'Process Automation', 'Rapid Deployment'], whiteLabel: true },
  { id: 'ai-marketing', title: 'AI Marketing', description: 'AI-powered marketing campaigns, content generation, and automated outreach.', icon: '📢', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&h=400&fit=crop', href: '/services/ai/marketing', category: 'ai', features: ['Campaign Automation', 'Content Generation', 'Audience Targeting', 'Performance Analytics'], whiteLabel: true },
  { id: 'mirofish-ai', title: 'MiroFish AI', description: 'AI-powered crowd simulation and demographic analysis for events and locations.', icon: '🐟', image: 'https://images.unsplash.com/photo-1505163515351-3c8f7b4b4e4e?w=600&h=400&fit=crop', href: '/services/ai/mirofish', category: 'ai', features: ['Crowd Simulation', 'Demographic Analysis', 'Event Planning', 'Location Analytics'], whiteLabel: true },
  { id: 'ask-maps', title: 'Ask Maps', description: 'AI-powered business Q&A using Google Maps data — find businesses, reviews, and local insights.', icon: '🗺️', image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=400&fit=crop', href: '/services/ai/ask-maps', category: 'ai', features: ['Business Search', 'Review Analysis', 'Local Insights', 'AI Q&A Interface'], whiteLabel: true },
  { id: 'developer', title: 'Developer Portal', description: 'API keys, usage statistics, sandbox testing, and full developer documentation.', icon: '🔧', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop', href: '/api-services', category: 'business', features: ['API Keys', 'Usage Analytics', 'Sandbox Testing', 'Full Documentation'], whiteLabel: false },
];

const categories = [
  { id: 'all', label: 'All Services' },
  { id: 'tourism', label: 'Tourism' },
  { id: 'business', label: 'Business' },
  { id: 'audit', label: 'Auditing' },
  { id: 'web-dev', label: 'Web Dev' },
  { id: 'ai', label: 'AI Solutions' },
];

// ─── Page ───
export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState('');

  const filtered = activeCategory === 'all' ? services : services.filter((s) => s.category === activeCategory);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitServiceInquiry({ service_type: 'general', name: 'Website Visitor', email, source: 'bquikr' });
    setFormStatus('Thanks for your interest! We\'ll contact you within 24 hours.');
    setEmail('');
  };

  return (
    <div className="bg-surface-0">
      <PageHero
        pageKey="ibt-services"
        fallback={{
          badge: 'Our Services',
          title: 'Solutions for',
          titleGradient: 'Modern Business',
          subtitle: 'From Tourism APIs to AI-powered solutions — comprehensive tools designed specifically for Caribbean businesses. White-label ready for partners and resellers.',
          bgImage: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&h=1080&fit=crop&q=80',
        }}
      />

      {/* Category Filter */}
      <Section className="pt-0">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-teal-500 text-ocean-900'
                    : 'bg-surface-2 text-ink-400 hover:text-white border border-surface-3'
                }`}
              >
                {cat.label}
              </button>
            ))}
        </div>
      </Section>

      {/* Services Grid */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((service) => (
            <Link
              key={service.id}
              href={service.href}
              className="group rounded-2xl overflow-hidden bg-surface-1 border border-surface-3 hover:border-teal-500/30 transition-all duration-300 hover:-translate-y-1 block"
            >
              {service.image && (
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  {service.whiteLabel && <Badge variant="slate" size="sm">White Label</Badge>}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                <p className="text-ink-400 text-sm mb-3">{service.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {service.features.slice(0, 3).map((f) => (
                    <span key={f} className="px-2 py-0.5 text-[10px] rounded-full bg-surface-2 text-ink-400">{f}</span>
                  ))}
                  {service.features.length > 3 && (
                    <span className="px-2 py-0.5 text-[10px] rounded-full bg-surface-2 text-ink-500">+{service.features.length - 3}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-ink-400">No services found in this category.</p>
          </div>
        )}
      </Section>

      {/* Partner CTA */}
      <Section className="bg-surface-1/50">
        <Card className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Partner with IBT Solutions</h2>
          <p className="text-ink-400 mb-8 max-w-xl mx-auto">
            All our services are white-label ready. Partner with us to deliver premium solutions under your brand. Reseller packages available for agencies and consultants.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact">Contact Us</Button>
            <Button href="#contact" variant="outline">Request Info</Button>
          </div>
        </Card>
      </Section>

      {/* Contact Form */}
      <Section id="contact">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-ink-400 mb-8">Have questions about our services? We'll get back to you within 24 hours.</p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
            <Button type="submit">Request Info</Button>
          </form>
          {formStatus && <p className="text-teal-400 mt-4 text-sm">{formStatus}</p>}
        </div>
      </Section>
    </div>
  );
}
