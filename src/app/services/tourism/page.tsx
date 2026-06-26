'use client';

import { ServiceHero, FeaturesGrid, PricingSection, CTASection, ContactFormSection } from '@/components/sections';
import AdminServiceHero from '@/components/AdminServiceHero';

const freeAPIs = [
  { id: 'currency', name: 'Currency Exchange', description: 'Real-time Caribbean and international exchange rates.', features: ['150+ currencies', 'Real-time rates', 'Historical data', 'Trend charts', 'Rate alerts'], badge: 'Free Forever', badgeVariant: 'emerald' as const },
  { id: 'weather', name: 'Weather API', description: 'Land and marine weather forecasts with alerts for the Caribbean region.', features: ['7-day forecast', 'Marine conditions', 'Alerts', 'Historical data'], badge: 'Free Forever', badgeVariant: 'emerald' as const },
];

const proAPIs = [
  { id: 'events', name: 'Caribbean Events', description: 'Comprehensive events database — festivals, concerts, sports, cultural celebrations.', features: ['10,000+ events', 'Filters by location', 'Categories', 'iCal export'] },
  { id: 'places', name: 'Places Discovery', description: 'Discover restaurants, attractions, beaches, and hidden gems across the Caribbean.', features: ['5000+ places', 'Reviews', 'Photos', 'Ratings', 'Maps'] },
  { id: 'transport', name: 'Transport API', description: 'Public transport schedules, ferry times, and taxi services across the Caribbean.', features: ['Schedules', 'Route planning', 'Fare estimates', 'Real-time updates'] },
  { id: 'marine', name: 'Marine Conditions', description: 'Beach water temperature, wave height, safety flags, and maritime data.', features: ['Water temp', 'Wave height', 'Safety flags', 'Tide data'] },
  { id: 'geospatial', name: 'Geospatial Mapping', description: 'Interactive maps, POI data, and location intelligence for Caribbean businesses.', features: ['Custom maps', 'POI data', 'Route optimization', '5 view modes'] },
];

const pricingTiers = [
  { name: 'Free', price: '$0', period: 'Forever free', features: ['1,000 requests/month', 'Currency Exchange API', 'Weather API (basic)', 'Community support'], cta: 'Get Free Key', variant: 'secondary' as const },
  { name: 'Pro', price: '$39', period: 'per month', features: ['10,000 requests/month', 'All Tourism APIs', 'Priority support', 'Rate limit increases', 'Webhook access'], cta: 'Start My Pro Plan', popular: true, variant: 'primary' as const },
  { name: 'Enterprise', price: 'Custom', period: 'Contact for pricing', features: ['Unlimited requests', 'White-label', 'Dedicated support', 'Custom SLAs', 'All add-ons included'], cta: 'Contact Sales', href: '/contact', variant: 'secondary' as const },
];

export default function TourismPage() {
  return (
    <div className="bg-surface-0">
      <AdminServiceHero
        pageKey="ibt-services-tourism"
        fallback={{
          badge: 'Tourism APIs',
          badgeVariant: 'sunset',
          title: 'Caribbean Tourism',
          titleGradient: 'Data Platform',
          subtitle: 'Comprehensive APIs for Caribbean tourism — currency exchange, events, places, weather, transport, marine conditions, and geospatial mapping.',
          ctaPrimary: { label: 'Get Started', href: '#pricing' },
          ctaSecondary: { label: 'View Docs', href: '#features', variant: 'outline' },
        }}
      >
        {({ title, titleGradient, subtitle, cta1Label, cta1Link, cta2Label, cta2Link, badge, badgeVariant }) => (
          <ServiceHero
            badge={badge}
            badgeVariant={badgeVariant as 'teal' | 'emerald' | 'sunset' | 'slate'}
            title={title}
            titleGradient={titleGradient}
            subtitle={subtitle}
            ctaPrimary={cta1Label ? { label: cta1Label, href: cta1Link } : undefined}
            ctaSecondary={cta2Label ? { label: cta2Label, href: cta2Link, variant: 'outline' } : undefined}
            stats={[
              { value: '7', label: 'APIs' },
              { value: '10K+', label: 'Events' },
              { value: '5K+', label: 'Places' },
              { value: '150+', label: 'Currencies' },
            ]}
          />
        )}
      </AdminServiceHero>

      <FeaturesGrid
        badge="Free APIs"
        title="Start Free"
        subtitle="Powerful APIs available at no cost."
        features={freeAPIs}
        columns={2}
      />

      <FeaturesGrid
        badge="Pro APIs"
        title="Tourism Pro Suite"
        subtitle="Unlock the full power of Caribbean tourism data."
        features={proAPIs}
        columns={3}
      />

      <PricingSection
        badge="Pricing"
        title="Simple & Transparent"
        subtitle="Start free, scale as you grow."
        tiers={pricingTiers}
      />

      <CTASection
        title="Ready to Build?"
        subtitle="Get your free API key and start integrating Caribbean tourism data today."
        ctaPrimary={{ label: 'Get API Key', href: '#contact' }}
        ctaSecondary={{ label: 'Contact Sales', href: '/contact', variant: 'outline' }}
      />

      <ContactFormSection
        title="Get Started with Tourism APIs"
        subtitle="Sign up for free and get instant access to Currency Exchange and Weather APIs."
        serviceType="tourism-apis"
      />
    </div>
  );
}
