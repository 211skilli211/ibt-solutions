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

const trustSignals = ['Caribbean-Based', 'St. Kitts & Nevis', 'Enterprise-Grade', '24/7 Support'];
const stats = [
  { value: '50K+', label: 'API Requests' },
  { value: '99.9%', label: 'Uptime' },
  { value: '100+', label: 'Projects' },
];

export function HeroClient() {
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
              )))}
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
      </div>
    </div>
  );
}