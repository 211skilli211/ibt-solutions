import { Metadata } from 'next';
import Link from 'next/link';
import { HeroClient } from './hero-client';
import { Button, Section, SectionHeader, ServiceCard, Stat, GradientText, Badge } from '@/components/ui';
import { ScrollReveal, StaggerContainer, StaggerItem, TiltCard, SlideReveal, CountUp, ParallaxSection } from '@/components/animations';
import { GlobeMap } from './globe-map';

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

export const metadata: Metadata = {
  title: 'IBT Solutions — Business Solutions for the Caribbean',
  description: 'Professional services, cooperative infrastructure, and modern technology — purpose-built for Caribbean businesses ready to compete globally.',
};

export default function HomePage() {
  return (
    <div className="bg-surface-0">
      {/* Hero — client component with all interactivity */}
      <HeroClient />

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
          {[
            { title: 'Trades & Services', desc: 'Skilled workers united', href: '/coops/trades', icon: '🔧' },
            { title: 'Micro-Farms', desc: 'Local agriculture', href: '/coops/micro-farms', icon: '🌿' },
            { title: 'Graphic Trends', desc: 'Micro-manufacturing', href: '/coops/graphic-trends', icon: '🎨' },
            { title: 'Storage & Logistics', desc: 'Coming soon', href: '#', icon: '📦' },
          ].map((c, i) => (
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
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                required
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-ink-500 focus:outline-none focus:border-teal-500 transition-colors"
              />
              <button type="submit" className="px-6 py-3 bg-teal-500 text-white font-bold rounded-xl hover:bg-teal-600 transition-colors whitespace-nowrap">
                Contact Us
              </button>
            </form>
          </div>
        </ScrollReveal>
      </Section>
    </div>
  );
}