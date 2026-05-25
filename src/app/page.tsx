'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Section, SectionHeader, ServiceCard, Stat, GradientText, Badge } from '@/components/ui';
import { motion } from 'framer-motion';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations';
import ParticleField from '@/components/shaders/ParticleField';
import ShaderBackground from '@/components/shaders/ShaderBackground';

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
  const heroTitle = hero?.title || 'Upgrade Your Business';
  const heroGradient = hero?.subtitle?.split(' ')[0] || 'Agentic Services';
  const heroSubtitle = hero?.subtitle || 'Agentic tools, professional services, and a growing co-operative federation — everything you need to compete in the modern economy.';
  const heroCta1 = hero?.cta_text || 'Explore Services';
  const heroCta1Link = hero?.cta_link || '/services';
  const heroCta2 = hero?.cta2_text || 'Join IBT Co-ops';
  const heroCta2Link = hero?.cta2_link || '/coops';

  // Hero background from admin config
  const assetType = hero?.asset_type || 'image';
  const styleConfig = hero?.style_config || {};
  const overlayColor = hero?.overlay_color || '#000000';
  const overlayOpacity = hero?.overlay_opacity !== undefined ? hero.overlay_opacity : 0.4;

  const renderHeroBackground = () => {
    if (assetType === 'shader' && styleConfig.shader) {
      return (
        <div className="absolute inset-0 z-0">
          <ShaderBackground
            shader={styleConfig.shader}
            colors={styleConfig.shaderColors}
            opacity={1}
            className="absolute inset-0"
          />
          <div className="absolute inset-0" style={{ backgroundColor: overlayColor, opacity: overlayOpacity }} />
          <div className="absolute inset-0 bg-gradient-to-b from-surface-0/40 via-surface-0/70 to-surface-0" />
        </div>
      );
    }
    if (assetType === 'video' && heroBg) {
      return (
        <div className="absolute inset-0 z-0">
          <video src={heroBg} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-surface-0/40 via-surface-0/70 to-surface-0" />
        </div>
      );
    }
    if (assetType === 'particle') {
      return (
        <div className="absolute inset-0 z-0">
          <ParticleField
            count={styleConfig.particleCount || 100}
            color={styleConfig.particleColor || '#06b6d4'}
            speed={styleConfig.particleSpeed || 0.3}
            size={styleConfig.particleSize || 1.5}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface-0/60 via-surface-0/40 to-surface-0" />
        </div>
      );
    }
    // Default: image
    return (
      <div className="absolute inset-0 z-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-20"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-0/40 via-surface-0/70 to-surface-0" />
      </div>
    );
  };

  return (
    <div className="bg-surface-0">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/8 rounded-full blur-[128px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-[128px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative">
        {/* Hero */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          {renderHeroBackground()}

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge variant="teal" className="mb-6">
                <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse" />
                Caribbean Business Solutions
              </Badge>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
              {heroTitle}
              <br />
              <GradientText>{heroGradient}</GradientText>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
              className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
              {heroSubtitle}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button href={heroCta1Link} size="lg">{heroCta1}</Button>
              <Button href={heroCta2Link} variant="outline" size="lg">{heroCta2}</Button>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-3">
              {trustSignals.map((s, i) => (
                <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400 font-medium">{s}</span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <ScrollReveal>
          <Section className="py-12 border-y border-white/5">
            <div className="max-w-5xl mx-auto grid grid-cols-3 gap-8">
              {stats.map((s, i) => (
                <Stat key={i} value={s.value} label={s.label} />
              ))}
            </div>
          </Section>
        </ScrollReveal>

        {/* Services */}
        <ScrollReveal>
          <Section className="py-20">
            <SectionHeader
              badge="What We Do"
              title="Services Built for"
              gradientTitle="Caribbean Business"
              description="From Tourism APIs to AI-powered solutions — comprehensive tools designed specifically for Caribbean businesses."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              <StaggerContainer className="contents">
                {services.map((s, i) => (
                  <StaggerItem key={i}>
                    <ServiceCard {...s} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </Section>
        </ScrollReveal>

        {/* Co-ops */}
        <ScrollReveal>
          <Section className="py-20 bg-surface-50">
            <SectionHeader
              badge="IBT Co-operative Federation"
              title="Community-Driven"
              gradientTitle="Cooperatives"
              description="Join our growing network of Caribbean cooperatives — built by locals, for locals."
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {coops.map((c, i) => (
                <Link key={i} href={c.href} className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/5">
                  <img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-white font-bold text-sm">{c.title}</div>
                    <div className="text-slate-400 text-xs">{c.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </Section>
        </ScrollReveal>

        {/* Contact CTA */}
        <ScrollReveal>
          <Section className="py-20">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-4xl font-extrabold text-white mb-4">Ready to Get Started?</h2>
              <p className="text-slate-400 mb-8">Tell us about your project and we'll get back to you within 24 hours.</p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
                />
                <button type="submit" className="px-6 py-3 bg-teal-500 text-white font-bold rounded-xl hover:bg-teal-600 transition-colors whitespace-nowrap">
                  Contact Us
                </button>
              </form>
              {formStatus && <p className="text-teal-400 text-sm mt-4">{formStatus}</p>}
            </div>
          </Section>
        </ScrollReveal>
      </div>
    </div>
  );
}
