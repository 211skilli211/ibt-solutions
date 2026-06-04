'use client';

import { Button, Section, SectionHeader, Card, Badge, GradientText, Input, Textarea } from '@/components/ui';
import { submitServiceInquiry } from '@/lib/api';
import { useState } from 'react';

/* ═══════════════════════════════════════════════════════════
   Shared Section Components for Service Pages
   ═══════════════════════════════════════════════════════════ */

interface Feature {
  id: string;
  name: string;
  description: string;
  features: string[];
  badge?: string;
  badgeVariant?: 'teal' | 'emerald' | 'sunset' | 'slate';
}

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description?: string;
  features: string[];
  cta: string;
  href?: string;
  popular?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

/* ─── Hero Section ─── */
interface HeroProps {
  badge: string;
  badgeVariant?: 'teal' | 'emerald' | 'sunset' | 'slate';
  title: string;
  titleGradient?: string;
  subtitle: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string; variant?: 'outline' | 'ghost' };
  stats?: { value: string; label: string }[];
}

export function ServiceHero({ badge, badgeVariant = 'teal', title, titleGradient, subtitle, ctaPrimary, ctaSecondary, stats }: HeroProps) {
  return (
    <Section>
      <div className="text-center max-w-3xl mx-auto">
        <Badge variant={badgeVariant}>{badge}</Badge>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
          {titleGradient ? (
            <>
              {title} <GradientText>{titleGradient}</GradientText>
            </>
          ) : title}
        </h1>
        <p className="text-xl text-ink-400 mb-8">{subtitle}</p>
        {(ctaPrimary || ctaSecondary) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            {ctaPrimary && <Button href={ctaPrimary.href} size="lg">{ctaPrimary.label}</Button>}
            {ctaSecondary && <Button href={ctaSecondary.href} variant={ctaSecondary.variant || 'outline'} size="lg">{ctaSecondary.label}</Button>}
          </div>
        )}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-ink-500">{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}

/* ─── Features Grid ─── */
interface FeaturesGridProps {
  badge?: string;
  title: string;
  subtitle?: string;
  features: Feature[];
  columns?: 2 | 3;
}

export function FeaturesGrid({ badge, title, subtitle, features, columns = 3 }: FeaturesGridProps) {
  return (
    <Section>
      <SectionHeader badge={badge} title={title} subtitle={subtitle} />
      <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-4`}>
        {features.map((feature) => (
          <Card key={feature.id} hover>
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-white">{feature.name}</h3>
              {feature.badge && (
                <Badge variant={feature.badgeVariant || 'teal'} size="sm">{feature.badge}</Badge>
              )}
            </div>
            <p className="text-sm text-ink-400 mb-3">{feature.description}</p>
            <ul className="space-y-1">
              {feature.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-ink-400">
                  <svg className="w-3.5 h-3.5 text-teal-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}

/* ─── Pricing Section ─── */
interface PricingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  tiers: PricingTier[];
}

export function PricingSection({ badge, title, subtitle, tiers }: PricingProps) {
  return (
    <Section className="bg-surface-1/50">
      <SectionHeader badge={badge} title={title} subtitle={subtitle} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <Card key={tier.name} className={tier.popular ? 'border-teal-500/50 border-2 relative' : ''}>
            {tier.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-teal-500 text-ocean-900 text-xs font-bold rounded-full">
                MOST POPULAR
              </div>
            )}
            <div className="text-center mb-6">
              <div className="text-lg font-bold text-white mb-1">{tier.name}</div>
              <div className="text-3xl font-bold text-white mb-1">{tier.price}</div>
              <div className="text-sm text-ink-500">{tier.period}</div>
            </div>
            <ul className="text-sm text-ink-400 space-y-2 mb-6">
              {tier.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-teal-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            {tier.href ? (
              <Button variant={tier.variant || (tier.popular ? 'primary' : 'secondary')} className="w-full" href={tier.href}>
                {tier.cta}
              </Button>
            ) : (
              <Button variant={tier.variant || (tier.popular ? 'primary' : 'secondary')} className="w-full">
                {tier.cta}
              </Button>
            )}
          </Card>
        ))}
      </div>
    </Section>
  );
}

/* ─── CTA Section ─── */
interface CTAProps {
  title: string;
  subtitle?: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string; variant?: 'outline' | 'ghost' };
}

export function CTASection({ title, subtitle, ctaPrimary, ctaSecondary }: CTAProps) {
  return (
    <Section>
      <Card className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
        {subtitle && <p className="text-ink-400 mb-8 max-w-xl mx-auto">{subtitle}</p>}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {ctaPrimary && <Button href={ctaPrimary.href} size="lg">{ctaPrimary.label}</Button>}
          {ctaSecondary && <Button href={ctaSecondary.href} variant={ctaSecondary.variant || 'outline'} size="lg">{ctaSecondary.label}</Button>}
        </div>
      </Card>
    </Section>
  );
}

/* ─── Contact Form Section ─── */
interface ContactFormProps {
  title?: string;
  subtitle?: string;
  serviceType?: string;
  onSuccess?: () => void;
}

export function ContactFormSection({ title = "Get in Touch", subtitle = "Have questions? We'll get back to you within 24 hours.", serviceType = 'general', onSuccess }: ContactFormProps) {
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitServiceInquiry({ service_type: serviceType, name: 'Website Visitor', email, source: 'bquikr' });
    setFormStatus('Thanks for your interest! We\'ll be in touch soon.');
    setEmail('');
    onSuccess?.();
  };

  return (
    <Section id="contact">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
        <p className="text-ink-400 mb-8">{subtitle}</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
          <Button type="submit">Submit</Button>
        </form>
        {formStatus && <p className="text-teal-400 mt-4 text-sm">{formStatus}</p>}
      </div>
    </Section>
  );
}

/* ─── Feature List (inline) ─── */
interface FeatureListProps {
  features: string[];
  columns?: 1 | 2;
}

export function FeatureList({ features, columns = 1 }: FeatureListProps) {
  return (
    <ul className={`grid grid-cols-1 ${columns === 2 ? 'md:grid-cols-2' : ''} gap-3`}>
      {features.map((f) => (
        <li key={f} className="flex items-center gap-2 text-ink-300 text-sm">
          <svg className="w-4 h-4 text-teal-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {f}
        </li>
      ))}
    </ul>
  );
}
