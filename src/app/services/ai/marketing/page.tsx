'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, Section, SectionHeader, Card, Badge, GradientText, Input } from '@/components/ui';
import { submitServiceInquiry } from '@/lib/api';
import AdminServiceHero from '@/components/AdminServiceHero';
import { motion } from 'framer-motion';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations';

/* ─── Higgsfield AI Feature Cards ─── */
const generationFeatures = [
  {
    id: 'image-gen',
    title: 'AI Image Generation',
    description: 'Generate product photos, banners, social graphics, and ad creatives from text prompts. GPT Image 2 for high-fidelity output, Nano Banana for stylized work.',
    icon: '🖼️',
    tag: 'GPT Image 2',
    capabilities: ['Product mockups & lifestyle scenes', 'Social media graphics & carousels', 'Banner ads & hero images', 'Brand-consistent visual assets'],
  },
  {
    id: 'video-gen',
    title: 'AI Video Generation',
    description: 'Create marketing videos from text or images. Seedance 2.0 for cinematic clips, Marketing Studio for branded ads with avatars and products.',
    icon: '🎬',
    tag: 'Seedance 2.0',
    capabilities: ['Product showcase videos', 'UGC-style ad content', 'Image-to-video animation', '15-second cinematic spots'],
  },
  {
    id: 'product-photo',
    title: 'Product Photoshoot AI',
    description: 'Studio-quality product photography without a studio. 10 modes: studio, lifestyle, Pinterest, hero banner, ad packs, virtual try-on, and more.',
    icon: '📸',
    tag: 'Product Photoshoot',
    capabilities: ['Studio & catalog shots', 'Lifestyle & context scenes', 'Pinterest-native pins', 'Ad creative packs'],
  },
  {
    id: 'marketing-studio',
    title: 'Marketing Studio',
    description: 'Branded ad generation with AI avatars, product imports, hooks, and settings. 9 modes from UGC to TV spots. Full brand kit support.',
    icon: '🎯',
    tag: 'Marketing Studio',
    capabilities: ['AI presenter avatars', 'Product import from URL', 'UGC, unboxing, TV spots', 'Brand kit integration'],
  },
  {
    id: 'virality',
    title: 'Virality Predictor',
    description: 'Analyze any video for hook strength, attention retention, and virality potential. Get actionable scores before you spend on distribution.',
    icon: '🧠',
    tag: 'Virality Predictor',
    capabilities: ['Hook strength scoring', 'Attention & retention analysis', 'Virality potential rating', 'Visual report with insights'],
  },
  {
    id: 'marketplace-cards',
    title: 'Marketplace Cards',
    description: 'Generate marketplace-compliant product cards, secondary images, and A+ style modules. Optimized for conversion on any platform.',
    icon: '🛍️',
    tag: 'Marketplace Cards',
    capabilities: ['Compliant main images', 'Secondary product photos', 'A+ content modules', 'Platform-optimized layouts'],
  },
];

const workflowSteps = [
  { step: '1', title: 'Describe Your Brief', desc: 'Tell our AI what you need — product photos, ad videos, social content, or full campaign assets.' },
  { step: '2', title: 'AI Generates Assets', desc: 'Higgsfield AI generates high-fidelity images, videos, or branded ads based on your brief.' },
  { step: '3', title: 'Review & Refine', desc: 'Review generated assets, request variations, and fine-tune until perfect.' },
  { step: '4', title: 'Deploy & Scale', desc: 'Download assets, deploy across channels, and use Virality Predictor to optimize performance.' },
];

const stats = [
  { value: '30+', label: 'AI Models' },
  { value: '10', label: 'Photoshoot Modes' },
  { value: '9', label: 'Ad Formats' },
  { value: '4K', label: 'Max Resolution' },
];

export default function AIMarketingPage() {
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitServiceInquiry({
      service_type: 'ai-marketing',
      name: 'Marketing Visitor',
      email,
      source: 'bquikr',
      message: 'Interested in AI Marketing services — Higgsfield AI generation',
    });
    setFormStatus("Thanks! We'll contact you within 24 hours.");
    setEmail('');
  };

  return (
    <div className="bg-surface-0">
      {/* ─── Hero ─── */}
      <AdminServiceHero
        pageKey="ibt-services-ai-marketing"
        fallback={{
          badge: 'AI Marketing',
          badgeVariant: 'sunset',
          title: 'Generative AI for',
          titleGradient: 'Marketing & Content',
          subtitle: 'Product photos, ad videos, branded content, and virality analysis — powered by Higgsfield AI. From brief to broadcast-ready assets in minutes.',
          ctaPrimary: { label: 'See Capabilities', href: '#capabilities' },
          ctaSecondary: { label: 'Get Started', href: '#contact', variant: 'outline' as const },
        }}
      >
        {({ title, titleGradient, subtitle, cta1Label, cta1Link, cta2Label, cta2Link, badge }) => (
          <Section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <Badge variant="sunset">{badge}</Badge>
                <h1 className="text-4xl sm:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
                  {title}
                  <br />
                  <GradientText>{titleGradient}</GradientText>
                </h1>
                <p className="text-xl text-ink-300 mb-8 leading-relaxed">{subtitle}</p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button href={cta1Link} size="lg">{cta1Label}</Button>
                  <Button href={cta2Link} variant="outline" size="lg">{cta2Label}</Button>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-ink-400">
                  {['30+ AI models', 'Studio-quality output', 'Virality scoring'].map((t) => (
                    <span key={t} className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats Preview */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s) => (
                  <Card key={s.label} className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{s.value}</div>
                    <div className="text-sm text-ink-400">{s.label}</div>
                  </Card>
                ))}
              </div>
            </div>
          </Section>
        )}
      </AdminServiceHero>

      {/* ─── Capabilities ─── */}
      <Section id="capabilities" className="bg-surface-1/50">
        <SectionHeader
          badge="Capabilities"
          title="Full AI Generation Stack"
          subtitle="From single images to full video campaigns — every tool you need to produce marketing content at scale."
        />
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {generationFeatures.map((f) => (
            <StaggerItem key={f.id}>
              <Card hover className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{f.icon}</span>
                  <Badge variant="sunset" size="sm">{f.tag}</Badge>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-ink-400 mb-4 flex-1">{f.description}</p>
                <ul className="space-y-2">
                  {f.capabilities.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-xs text-ink-300">
                      <svg className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {c}
                    </li>
                  ))}
                </ul>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* ─── How It Works ─── */}
      <Section>
        <SectionHeader
          badge="Workflow"
          title="From Brief to Broadcast"
          subtitle="Four steps from concept to campaign-ready assets."
        />
        <div className="max-w-3xl mx-auto space-y-4">
          {workflowSteps.map((s, i) => (
            <ScrollReveal key={s.step} delay={i * 0.1}>
              <div className="flex items-center gap-5 p-5 bg-surface-1 border border-surface-3 rounded-xl hover:border-teal-500/20 transition-colors">
                <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center text-teal-400 font-bold text-lg shrink-0">
                  {s.step}
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">{s.title}</h4>
                  <p className="text-sm text-ink-400">{s.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* ─── Use Cases ─── */}
      <Section className="bg-surface-1/50">
        <SectionHeader
          badge="Use Cases"
          title="What You Can Build"
          subtitle="Real marketing assets generated with Higgsfield AI."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              title: 'E-commerce Product Lines',
              desc: 'Generate studio product shots, lifestyle scenes, and ad creative packs for entire product catalogs — consistent quality, zero studio costs.',
              icon: '🛒',
            },
            {
              title: 'Social Media Campaigns',
              desc: 'Full carousel sets, story sequences, and feed posts generated from a single brand brief. Platform-optimized formats for Instagram, TikTok, LinkedIn.',
              icon: '📱',
            },
            {
              title: 'Video Ad Production',
              desc: 'UGC-style ads, product showcases, and TV spots with AI presenters. Import products from URL, pick a mode, and generate in minutes.',
              icon: '📺',
            },
            {
              title: 'Pre-Launch Testing',
              desc: 'Use Virality Predictor to score ad concepts before spending on distribution. Optimize hooks, retention, and attention before launch.',
              icon: '🔬',
            },
          ].map((uc) => (
            <Card key={uc.title} hover>
              <div className="text-3xl mb-3">{uc.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{uc.title}</h3>
              <p className="text-sm text-ink-400">{uc.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ─── CTA ─── */}
      <Section id="contact">
        <Card className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Generate Your First Assets?
          </h2>
          <p className="text-ink-400 mb-8 max-w-xl mx-auto">
            Book a demo and see Higgsfield AI generate product photos, ad videos, and branded content in real time.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your work email" required />
            <Button type="submit">Book Demo</Button>
          </form>
          {formStatus && <p className="mt-4 text-teal-400 text-sm">{formStatus}</p>}
          <p className="text-xs text-ink-500 mt-4">No credit card. No commitment. See results first.</p>
        </Card>
      </Section>
    </div>
  );
}
