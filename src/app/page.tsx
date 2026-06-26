'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button, Section, SectionHeader, ServiceCard, Stat, GradientText, Badge } from '@/components/ui';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ScrollReveal, StaggerContainer, StaggerItem, TiltCard, SlideReveal, CountUp, ParallaxSection } from '@/components/animations';
import ParticleField from '@/components/shaders/ParticleField';
import ShaderBackground from '@/components/shaders/ShaderBackground';
import dynamic from 'next/dynamic';

// Load GlobeMap client-only — Cesium is CDN-only, never SSR
const GlobeMap = dynamic(() => import('@/components/GlobeMap'), {
  ssr: false,
  loading: () => <div className="w-full h-[480px] bg-surface-0 rounded-2xl flex items-center justify-center"><span className="text-ink-500 text-sm">Loading map…</span></div>,
});

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
    icon: '📊',
  },
  {
    title: 'Web & App Design',
    description: 'Custom websites and mobile applications built with modern technologies. From landing pages to full platforms.',
    href: '/services/web-dev',
    icon: '🎨',
  },
  {
    title: 'Graphic Design',
    description: 'Professional branding, logos, marketing materials, and print-on-demand merchandise.',
    href: '/coops/graphic-trends',
    icon: '✨',
  },
  {
    title: 'Business Automation',
    description: 'Streamline operations with automated workflows, API integrations, and intelligent business processes.',
    href: '/services/business',
    icon: '⚙️',
  },
  {
    title: 'AI Solutions',
    description: 'From chatbots to predictive analytics — leverage AI to transform your operations.',
    href: '/services/ai',
    icon: '🤖',
  },
  {
    title: 'Lead Generation',
    description: 'Data-driven strategies to identify and capture high-quality leads for your business.',
    href: '/contact',
    icon: '🎯',
  },
  {
    title: 'Business Gap Analysis',
    description: 'Comprehensive assessment to identify operational challenges and uncover growth opportunities.',
    href: '/contact',
    icon: '🔍',
  },
  {
    title: 'Consultation',
    description: 'Expert guidance on digital strategy, technology decisions, and business growth.',
    href: '/contact',
    icon: '💡',
  },
];

const coops = [
  { title: 'Trades & Services', desc: 'Skilled workers united', href: '/coops/trades', icon: '🔧' },
  { title: 'Micro-Farms', desc: 'Local agriculture', href: '/coops/micro-farms', icon: '🌿' },
  { title: 'Graphic Trends', desc: 'Micro-manufacturing', href: '/coops/graphic-trends', icon: '🎨' },
  { title: 'Storage & Logistics', desc: 'Coming soon', href: '#', icon: '📦' },
];

const stats = [
  { value: '50K+', label: 'API Requests' },
  { value: '99.9%', label: 'Uptime' },
  { value: '100+', label: 'Projects' },
];

const trustSignals = ['Caribbean-Based', 'St. Kitts & Nevis', 'Enterprise-Grade', '24/7 Support'];

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
  const heroTitle = hero?.title || 'Business Solutions for the Caribbean';
  const heroGradient = hero?.subtitle?.split(' ')[0] || 'Technology & Consulting';
  const heroSubtitle = hero?.subtitle || 'Professional services, cooperative infrastructure, and modern technology — purpose-built for Caribbean businesses ready to compete globally.';
  const heroCta1 = hero?.cta_text || 'Explore Services';
  const heroCta1Link = hero?.cta_link || '/services';
  const heroCta2 = hero?.cta2_text || 'Join IBT Co-ops';
  const heroCta2Link = hero?.cta2_link || '/coops';

  // Hero background from admin config — no external fallback images
  const assetType = hero?.asset_type || 'image';
  const styleConfig = hero?.style_config || {};
  const overlayColor = hero?.overlay_color || '#000000';
  const overlayOpacity = hero?.overlay_opacity !== undefined ? hero.overlay_opacity : 0.4;

  // Parallax hero scroll effect
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

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
    if (assetType === 'video' && hero?.asset_url) {
      return (
        <div className="absolute inset-0 z-0">
          <video src={hero.asset_url} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30" />
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
    // Default: admin-configured image only — no external fallback
    if (hero?.asset_url) {
      return (
        <div className="absolute inset-0 z-0">
          <img src={hero.asset_url} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-surface-0/40 via-surface-0/70 to-surface-0" />
        </div>
      );
    }
    // No image set — use branded gradient
    return (
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/30 via-surface-0 to-cyan-900/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-0/20 via-transparent to-surface-0" />
      </div>
    );
  };

  return (
    <div className="bg-surface-0">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/8 rounded-full blur-[128px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' as const }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-[128px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' as const }}
        />
      </div>

      <div className="relative">
        {/* Hero with parallax */}
        <section ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
            {renderHeroBackground()}
          </motion.div>

          <motion.div
            className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center z-10"
            style={{ opacity: heroOpacity }}
          >
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
              className="text-xl text-ink-400 max-w-2xl mx-auto mb-10">
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
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-ink-400 font-medium"
                >
                  {s}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' as const }}
          >
            <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-white/40 rounded-full" />
            </div>
          </motion.div>
        </section>

        {/* Stats with count-up animation */}
        <Section className="py-12 border-y border-white/5">
          <div className="max-w-5xl mx-auto grid grid-cols-3 gap-8">
            {stats.map((s, i) => (
              <CountUp key={i} value={s.value} label={s.label} className="text-center" />
            ))}
          </div>
        </Section>

        {/* Services / What We Do */}
        <ParallaxSection speed={0.3} className="py-20">
          <Section className="py-0">
            <ScrollReveal>
              <SectionHeader
                badge="What We Do"
                title="Services Built for Caribbean Business"
                subtitle="Professional services and technology solutions designed for Caribbean enterprises."
              />
            </ScrollReveal>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12" staggerDelay={0.08}>
              {services.map((s, i) => (
                <StaggerItem key={i}>
                  <TiltCard intensity={8}>
                    <ServiceCard {...s} />
                  </TiltCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </Section>
        </ParallaxSection>

        {/* AI-Powered Marketing */}
        <Section className="py-20 bg-surface-1/50">
          <ScrollReveal>
            <SectionHeader
              badge="AI-Powered"
              title="Generative AI for Marketing"
              subtitle="Product photos, ad videos, branded content, and virality analysis — powered by Higgsfield AI."
            />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[
              { title: 'AI Image Generation', desc: 'Product photos, banners, social graphics from text. GPT Image 2 + Nano Banana.', icon: '🖼️', href: '/services/ai/marketing' },
              { title: 'AI Video Generation', desc: 'Marketing videos from text or images. Seedance 2.0 + Marketing Studio.', icon: '🎬', href: '/services/ai/marketing' },
              { title: 'Product Photoshoot AI', desc: 'Studio-quality product shots. 10 modes: studio, lifestyle, Pinterest, ads.', icon: '📸', href: '/services/ai/marketing' },
              { title: 'Marketing Studio', desc: 'Branded ads with AI avatars, products, hooks. 9 modes from UGC to TV spots.', icon: '🎯', href: '/services/ai/marketing' },
              { title: 'Virality Predictor', desc: 'Score any video for hook strength, attention, and virality before distribution.', icon: '🧠', href: '/services/ai/marketing' },
              { title: 'AI Hedge Fund', desc: 'Multi-agent investment analysis modeled after Buffett, Munger, Taleb.', icon: '📊', href: '/services/ai/hedge-fund' },
            ].map((item, i) => (
              <SlideReveal key={item.title} direction={i % 2 === 0 ? 'left' : 'right'}>
                <Link href={item.href} className="group bg-surface-1 border border-surface-3 rounded-2xl p-6 hover:border-teal-500/30 transition-all duration-300 hover:-translate-y-1 block h-full">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">{item.title}</h3>
                  <p className="text-sm text-ink-400 mb-3">{item.desc}</p>
                  <span className="text-xs text-teal-400 font-medium">Learn More →</span>
                </Link>
              </SlideReveal>
            ))}
          </div>
          <ScrollReveal delay={0.3}>
            <div className="mt-10 text-center">
              <Button href="/services/ai/marketing" size="lg">Explore AI Marketing</Button>
            </div>
          </ScrollReveal>
        </Section>

        {/* Co-ops */}
        <Section className="py-20">
          <ScrollReveal>
            <SectionHeader
              badge="IBT Co-operative Federation"
              title="Community-Driven Cooperatives"
              subtitle="A growing network of Caribbean cooperatives — democratic, community-owned, and built to last."
            />
          </ScrollReveal>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12" staggerDelay={0.12}>
            {coops.map((c, i) => (
              <StaggerItem key={i}>
                <TiltCard intensity={6}>
                  <Link href={c.href} className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/5 bg-surface-1 hover:border-teal-500/30 transition-all duration-300 block">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{c.icon}</div>
                      <div className="text-white font-bold text-sm">{c.title}</div>
                      <div className="text-ink-400 text-xs mt-1">{c.desc}</div>
                    </div>
                  </Link>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Section>

        {/* Regional Presence — Interactive Globe */}
        <Section className="py-24">
          <ScrollReveal>
            <SectionHeader
              badge="Regional Presence"
              title="Serving the Caribbean"
              subtitle="Headquartered in St. Kitts & Nevis, delivering technology solutions across the Eastern Caribbean."
            />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div
              className="mt-12 max-w-5xl mx-auto glass-card"
              style={{
                height: "480px",
                overflow: "hidden",
              }}
            >
              <GlobeMap className="w-full h-full rounded-2xl" />
            </div>
          </ScrollReveal>
          <StaggerContainer className="max-w-3xl mx-auto mt-12 grid grid-cols-3 gap-8 text-center" staggerDelay={0.15}>
            {[
              { value: '14', label: 'Caribbean Markets' },
              { value: 'XCD', label: 'Eastern Caribbean Dollar' },
              { value: '24h', label: 'Response Time' },
            ].map((item, i) => (
              <StaggerItem key={i}>
                <CountUp value={item.value} label={item.label} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Section>

        {/* Contact CTA */}
        <Section className="py-20">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-4xl font-extrabold text-white mb-4">Start a Conversation</h2>
              <p className="text-ink-400 mb-8">Share your project details and we'll respond within one business day.</p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-ink-500 focus:outline-none focus:border-teal-500 transition-colors"
                />
                <button type="submit" className="px-6 py-3 bg-teal-500 text-white font-bold rounded-xl hover:bg-teal-600 transition-colors whitespace-nowrap">
                  Contact Us
                </button>
              </form>
              {formStatus && <p className="text-teal-400 text-sm mt-4">{formStatus}</p>}
            </div>
          </ScrollReveal>
        </Section>
      </div>
    </div>
  );
}
