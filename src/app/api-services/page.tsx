import { Button, Section, SectionHeader, Card, Badge, Stat, GradientText, Input } from '@/components/ui';

// ─── Data ───
const apis = [
  { id: 'currency', name: 'Currency Exchange', description: 'Real-time Caribbean and international exchange rates.', category: 'tourism', tier: 'free' as const, status: 'Live', features: ['150+ currencies', 'Real-time rates', 'Historical data', 'Trend charts', 'Rate alerts'], endpoint: '/api/tourism/currency' },
  { id: 'events', name: 'Caribbean Events', description: 'Comprehensive events database — festivals, concerts, sports, cultural celebrations.', category: 'tourism', tier: 'pro' as const, status: 'Live', features: ['10,000+ events', 'Filters by location', 'Categories', 'iCal export'], endpoint: '/api/tourism/events' },
  { id: 'places', name: 'Places Discovery', description: 'Discover restaurants, attractions, beaches, and hidden gems across the Caribbean.', category: 'tourism', tier: 'pro' as const, status: 'Live', features: ['5000+ places', 'Reviews', 'Photos', 'Ratings', 'Maps'], endpoint: '/api/tourism/places' },
  { id: 'weather', name: 'Weather API', description: 'Land and marine weather forecasts with alerts for the Caribbean region.', category: 'tourism', tier: 'free' as const, status: 'Live', features: ['7-day forecast', 'Marine conditions', 'Alerts', 'Historical data'], endpoint: '/api/tourism/weather' },
  { id: 'transport', name: 'Transport API', description: 'Public transport schedules, ferry times, and taxi services across the Caribbean.', category: 'tourism', tier: 'pro' as const, status: 'Live', features: ['Schedules', 'Route planning', 'Fare estimates', 'Real-time updates'], endpoint: '/api/tourism/transport' },
  { id: 'marine', name: 'Marine Conditions', description: 'Beach water temperature, wave height, safety flags, and maritime data.', category: 'tourism', tier: 'pro' as const, status: 'Live', features: ['Water temp', 'Wave height', 'Safety flags', 'Tide data'], endpoint: '/api/tourism/marine' },
  { id: 'geospatial', name: 'Geospatial Mapping', description: 'Interactive maps, POI data, and location intelligence for Caribbean businesses.', category: 'tourism', tier: 'pro' as const, status: 'Live', features: ['Custom maps', 'POI data', 'Route optimization', '5 view modes'], endpoint: '/api/tourism/geospatial' },
  { id: 'data-convert', name: 'Data Conversion', description: 'Convert between data formats — JSON, CSV, XML, Excel, and more.', category: 'business', tier: 'pro' as const, status: 'Live', features: ['10+ formats', 'Batch processing', 'Schema mapping', 'Validation'], endpoint: '/api/business/convert' },
  { id: 'email-verify', name: 'Email Verification', description: 'Check if an email address is valid and deliverable.', category: 'business', tier: 'pro' as const, status: 'Live', features: ['Format check', 'Deliverability', 'MX records', 'Disposable detection'], endpoint: '/api/business/email/verify' },
];

const tiers = [
  { name: 'Free', price: '$0', period: 'Forever free', cta: 'Get Free Key', features: ['1,000 requests/month', 'Currency Exchange API', 'Weather API (basic)', 'Community support'], excluded: ['Events & Places APIs'] },
  { name: 'Pro', price: '$39', period: 'per month', cta: 'Start My Pro Plan', popular: true, features: ['10,000 requests/month', 'All Tourism APIs', 'All Business APIs', 'Email support', 'Add-ons available'] },
  { name: 'Enterprise', price: 'Custom', period: 'Contact for pricing', cta: 'Contact Sales', features: ['Unlimited requests', 'White-label', 'Dedicated support', 'Custom SLAs', 'All add-ons included'] },
];

const addons = [
  { name: 'Leads Pack', price: '$15/mo', description: 'Business contact data, tourism vendor leads, and FX arbitrage alerts.', features: ['Business contacts', 'Tourism vendor leads', 'FX opportunity alerts', 'Webhook notifications'] },
  { name: 'Webhook Pack', price: '$10/mo', description: 'Real-time WebSocket updates and push notifications.', features: ['Real-time updates', 'Push notifications', 'Event triggers', 'Custom endpoints'] },
  { name: 'Export Pack', price: '$10/mo', description: 'Bulk CSV/JSON export, scheduled reports, iCal sync, and PDF generation.', features: ['Bulk export', 'Scheduled reports', 'iCal sync', 'PDF generation'] },
];

const sdks = [
  { name: 'Node.js', version: 'v2.1.0', installs: '12K/mo' },
  { name: 'Python', version: 'v1.8.0', installs: '8K/mo' },
  { name: 'Go', version: 'v1.3.0', installs: '3K/mo' },
];

const categories = ['All', 'Tourism', 'Business'];

// ─── Page Component ───
export default function APIServicesPage() {
  return (
    <div className="bg-surface-0">
      <Section id="get-started">
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="teal">Developer Portal</Badge>
          <h1 className="text-4xl sm:text-6xl font-bold text-white mt-4 mb-6">
            Build with <GradientText>IBT APIs</GradientText>
          </h1>
          <p className="text-xl text-slate-400 mb-8">
            Powerful, reliable APIs for Caribbean applications. Tourism data, business automation, geospatial intelligence — all in one developer platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button href="#pricing" size="lg">Get Free API Key</Button>
            <Button href="#catalog" variant="outline" size="lg">Browse APIs</Button>
          </div>
          <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
            {[
              { value: '50K+', label: 'Requests/day' },
              { value: '99.9%', label: 'Uptime' },
              { value: '9', label: 'APIs' },
              { value: '<100ms', label: 'Avg Response' },
            ].map((s) => <Stat key={s.label} {...s} />)}
          </div>
        </div>
      </Section>

      {/* API Catalog */}
      <Section id="catalog">
        <SectionHeader badge="API Catalog" title="Available APIs" subtitle="Everything you need to build Caribbean-focused applications." />
        <div className="flex gap-2 mb-8 justify-center">
          {categories.map((cat) => (
            <button key={cat} className="px-4 py-1.5 rounded-lg text-sm font-medium bg-surface-2 text-slate-400 hover:text-white border border-surface-3 transition-colors">
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {apis.map((api) => (
            <Card key={api.id} hover>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-white">{api.name}</h3>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500">{api.category}</p>
                </div>
                <Badge variant={api.status === 'Live' ? 'emerald' : 'slate'} size="sm">{api.status}</Badge>
              </div>
              <p className="text-sm text-slate-400 mb-3">{api.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {api.features.slice(0, 2).map((f) => (
                    <span key={f} className="px-2 py-0.5 text-[10px] rounded-full bg-surface-2 text-slate-400">{f}</span>
                  ))}
                  {api.features.length > 2 && (
                    <span className="px-2 py-0.5 text-[10px] rounded-full bg-surface-2 text-slate-400">+{api.features.length - 2}</span>
                  )}
                </div>
                <Badge variant={api.tier === 'free' ? 'emerald' : 'teal'} size="sm">
                  {api.tier === 'free' ? 'FREE' : 'PRO'}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Pricing */}
      <Section id="pricing" className="bg-surface-1/50">
        <SectionHeader badge="Pricing" title="Simple & Transparent" subtitle="Start free, scale as you grow." center />
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
                <div className="text-sm text-slate-500">{tier.period}</div>
              </div>
              <ul className="text-sm text-slate-400 space-y-2 mb-6">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-teal-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
                {'excluded' in tier && tier.excluded?.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-slate-600">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant={tier.popular ? 'primary' : 'secondary'} className="w-full">{tier.cta}</Button>
            </Card>
          ))}
        </div>

        {/* Add-ons */}
        <div className="mt-16">
          <SectionHeader badge="Add-ons" title="Extend Your Plan" subtitle="Powerful extras for your Pro subscription." center />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {addons.map((addon) => (
              <Card key={addon.name}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white">{addon.name}</h4>
                  <span className="text-lg font-bold text-teal-400">{addon.price}</span>
                </div>
                <p className="text-xs text-slate-400 mb-3">{addon.description}</p>
                <ul className="space-y-1 mb-4">
                  {addon.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-slate-400">
                      <svg className="w-3.5 h-3.5 text-teal-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button variant="secondary" size="sm" className="w-full">Add to Plan</Button>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* SDKs */}
      <Section>
        <SectionHeader badge="SDKs" title="Official Libraries" center />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {sdks.map((sdk) => (
            <Card key={sdk.name} className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-white">{sdk.name}</h4>
                <p className="text-xs text-slate-500">{sdk.version} · {sdk.installs} installs</p>
              </div>
              <Button variant="secondary" size="sm">Install</Button>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <Card className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Start Building?</h2>
          <p className="text-slate-400 mb-6">Get your free API key and make your first call in minutes.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input placeholder="Enter your email" type="email" />
            <Button>Get API Key</Button>
          </div>
        </Card>
      </Section>
    </div>
  );
}
