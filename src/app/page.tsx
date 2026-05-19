'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Section, SectionHeader, ServiceCard, Stat, GradientText, Badge } from '@/components/ui';

interface HeroData {
  asset_url: string;
  asset_type: string;
  overlay_color: string;
  overlay_opacity: number;
  title: string;
  subtitle: string;
  cta_text: string;
  cta_link: string;
  cta2_text: string;
  cta2_link: string;
  icon_url: string;
  layout_template: string;
  style_config: any;
}

async function fetchHero(pageKey: string): Promise<HeroData | null> {
  try {
    const res = await fetch(`/api/hero-assets/${pageKey}`, { next: { revalidate: 60 } });
    if (res.ok) return await res.json();
  } catch {}
  return null;
}

const services = [
  {
    title: 'Website Auditing',
    description: "Comprehensive analysis of your website's SEO, performance, user experience, and conversion potential.",
    href: '/services/audit',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
  },
  {
    title: 'Web & App Design',
    description: 'Custom websites and mobile applications built with modern technologies. From landing pages to full platforms.',
    href: '/services/web-dev',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=250&fit=crop',
  },
  {
    title: 'Graphic Design',
    description: 'Professional branding, logos, marketing materials, and print-on-demand merchandise.',
    href: '/coops/graphic-trends',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=250&fit=crop',
  },
  {
    title: 'Business Automation',
    description: 'Streamline operations with automated workflows, API integrations, and intelligent business processes.',
    href: '/services/business',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
  },
  {
    title: 'AI Solutions',
    description: 'From chatbots to predictive analytics — leverage AI to transform your operations.',
    href: '/services/ai',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
  },
  {
    title: 'Lead Generation',
    description: 'Data-driven strategies to identify and capture high-quality leads for your business.',
    href: '/contact',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=250&fit=crop',
  },
  {
    title: 'Gap & Pain Analysis',
    description: 'Deep-dive consultation to identify business challenges and uncover growth opportunities.',
    href: '/contact',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=250&fit=crop',
  },
  {
    title: 'Consultation',
    description: 'Expert guidance on digital strategy, technology decisions, and business growth.',
    href: '/contact',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop',
  },
];

const coops = [
  { title: 'Trades & Services', desc: 'Skilled workers united', href: '/coops/trades', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop' },
  { title: 'Micro-Farms', desc: 'Local agriculture', href: '/coops/micro-farms', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop' },
  { title: 'Graphic Trends', desc: 'Micro-manufacturing', href: '/coops/graphic-trends', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop' },
  { title: 'Storage & Logistics', desc: 'Coming soon', href: '#', image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=400&h=300&fit=crop' },
];

const stats = [
  { value: '50K+', label: 'API Requests' },
  { value: '99.9%', label: 'Uptime' },
  { value: '100+', label: 'Projects' },
];

const trustSignals = ['Caribbean-Based', 'St. Kitts & Nevis', '24/7 Support', 'Fast Delivery'];

export default function HomePage() {
  const [hero, setHero] = useState<HeroData | null>(null);
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    fetchHero('ibt-home').then(setHero);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('Thanks for your interest! We\'ll be in touch soon.');
    setEmail('');
  };

  // Use hero data from API, with fallbacks
  const heroBg = hero?.asset_url || 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&h=1080&fit=crop&q=80';
  const heroTitle = hero?.title || 'Transform Your';
  const heroGradient = hero?.subtitle?.split(' ')[0] || 'Caribbean';
  const heroSubtitle = hero?.subtitle || 'AI-powered tools, professional services, and a growing co-operative federation — everything you need to compete in the modern economy.';
  const heroCta1 = hero?.cta_text || 'Explore Services';
  const heroCta1Link = hero?.cta_link || '/services';
  const heroCta2 = hero?.cta2_text || 'Join IBT Co-ops';
  const heroCta2Link = hero?.cta2_link || '/coops';

  return (
    <div className="bg-surface-0">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/8 rounded-full blur-[128px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-[128px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative">
        {/* Hero */}
        <section className="relative min-h-[90vh] flex items-center justify-center">
          <div className="absolute inset-0">
            {hero?.asset_type === 'video' ? (
              <video
                src={heroBg}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-20"
              />
            ) : (
              <img
                src={heroBg}
                alt="Caribbean business"
                className="w-full h-full object-cover opacity-20"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-surface-0/40 via-surface-0/70 to-surface-0" />
          </div>

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <Badge variant="teal" className="mb-6">
              <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse" />
              Caribbean Business Solutions
            </Badge>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight animate-fade-in">
              {heroTitle}
              <br />
              <GradientText>{heroGradient}</GradientText>
            </h1>

            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 animate-slide-up">
              {heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up">
              <Button href={heroCta1Link} size="lg">{heroCta1}</Button>
              <Button href={heroCta2Link} variant="outline" size="lg">{heroCta2}</Button>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {trustSignals.map((signal) => (
                <span key={signal} className="px-4 py-2 rounded-full bg-surface-1/80 border border-surface-3 text-slate-300 text-sm">
                  {signal}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
              {stats.map((stat) => (
                <Stat key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <Section>
          <SectionHeader
            badge="What We Offer"
            title="Our Services"
            subtitle="From website audits to AI integration — comprehensive solutions for modern Caribbean businesses."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button href="/services" variant="ghost" size="lg">
              View All Services →
            </Button>
          </div>
        </Section>

        {/* IBT Co-ops */}
        <Section className="bg-surface-1/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="emerald" className="mb-6">IBT Co-operative Federation</Badge>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Own Your Future.
                <br />
                <GradientText>Build Together.</GradientText>
              </h2>
              <p className="text-lg text-slate-400 mb-8">
                Join a community of small businesses, skilled workers, and entrepreneurs united
                in democratically-governed cooperatives. IBT Solutions provides the tools and
                infrastructure — you own the future.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {['Trades & Services', 'Micro-Farms', 'Graphic Trends'].map((coop) => (
                  <span key={coop} className="px-4 py-2 rounded-full bg-surface-2 border border-surface-3 text-slate-300 text-sm">
                    {coop}
                  </span>
                ))}
              </div>
              <Button href="/coops" size="lg">Explore IBT Co-ops →</Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {coops.map((coop) => (
                <Link
                  key={coop.title}
                  href={coop.href}
                  className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-surface-1 border border-surface-3 hover:border-teal-500/30 transition-all"
                >
                  <img
                    src={coop.image}
                    alt={coop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
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
        </Section>

        {/* IslandHub */}
        <Section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-4 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-3xl blur-xl" />
              <img
                src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&h=500&fit=crop"
                alt="IslandHub Marketplace"
                className="relative rounded-2xl shadow-2xl border border-surface-3 w-full"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="absolute -bottom-3 -right-3 px-4 py-2 bg-teal-500 rounded-xl shadow-lg">
                <span className="text-ocean-900 font-bold text-sm">Live Marketplace</span>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <Badge variant="teal" className="mb-6">
                <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse" />
                Featured Platform
              </Badge>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Meet <GradientText>IslandHub</GradientText>
              </h2>
              <p className="text-lg text-slate-400 mb-6">
                The Caribbean's complete marketplace — vendor stores, food delivery,
                ride services, auctions, and more, all in one platform.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {['Vendor Stores', 'Food Delivery', 'Ride Services', 'Secure Payments'].map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-slate-300 text-sm">
                    <svg className="w-4 h-4 text-teal-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>
              <a
                href="https://islandhub.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-teal-500 hover:bg-teal-400 text-ocean-900 font-semibold rounded-xl transition-all shadow-lg shadow-teal-500/20"
              >
                Explore IslandHub
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </Section>

        {/* CTA */}
        <Section className="bg-gradient-to-b from-surface-0 to-surface-1/50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-slate-400 mb-8">
              Let's discuss how IBT Solutions can help transform your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button href="/contact" size="lg">Book Consultation</Button>
              <Button href="/portfolio" variant="outline" size="lg">View Portfolio</Button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-5 py-3.5 bg-surface-1 border border-surface-3 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
                required
              />
              <Button type="submit" size="md">Submit</Button>
            </form>
            {formStatus && <p className="text-teal-400 mt-4 text-sm">{formStatus}</p>}
          </div>
        </Section>
      </div>
    </div>
  );
}
