'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, Section, SectionHeader, Card, Badge, GradientText, Input } from '@/components/ui';
import { submitServiceInquiry } from '@/lib/api';
import AdminServiceHero from '@/components/AdminServiceHero';

const auditDimensions = [
  { id: 'seo', name: 'SEO Score', icon: '🔍', description: 'On-page SEO, technical SEO, content quality, backlinks', weight: 30 },
  { id: 'maps', name: 'Google Maps', icon: '📍', description: 'Business listing, verification, reviews, info completeness', weight: 25 },
  { id: 'website', name: 'Website Quality', icon: '🌐', description: 'Speed, mobile, security, content quality', weight: 25 },
  { id: 'social', name: 'Social Presence', icon: '📱', description: 'Facebook, Instagram, LinkedIn presence', weight: 20 },
];

function ScoreCircle({ score, label }: { score: number; label: string }) {
  const grade = score >= 90 ? 'A' : score >= 75 ? 'B' : score >= 60 ? 'C' : score >= 40 ? 'D' : 'F';
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 transform -rotate-90">
          <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="none" className="text-surface-2" />
          <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="none" strokeDasharray={251.2} strokeDashoffset={251.2 - (251.2 * score) / 100} className="text-teal-400 transition-all duration-1000" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-teal-400">{grade}</span>
        </div>
      </div>
      <span className="text-sm text-ink-400 mt-2">{label}</span>
      <span className="text-xs text-ink-500">{score}/100</span>
    </div>
  );
}

interface AuditResult {
  domain: string;
  overallScore: number;
  seoScore: number;
  mapsScore: number;
  websiteScore: number;
  socialScore: number;
  grade: string;
  issues: string[];
  recommendations: string[];
}

export default function AuditPage() {
  const [domain, setDomain] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState('');

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setTimeout(() => {
      setResult({
        domain, overallScore: 72, seoScore: 65, mapsScore: 78, websiteScore: 68, socialScore: 82, grade: 'C',
        issues: ['Missing meta descriptions on 3 pages', 'No Google Business Profile found', 'Slow load time (4.2s)', 'No Instagram business account'],
        recommendations: ['Claim and verify Google Business Profile', 'Optimize images for web (use WebP)', 'Add structured data markup', 'Set up Instagram business account'],
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitServiceInquiry({ service_type: 'audit', name: 'Website Visitor', email, source: 'bquikr', message: 'Request for business audit service' });
    setFormStatus('Thanks! We\'ll contact you within 24 hours.');
    setEmail('');
  };

  return (
    <div className="bg-surface-0">
      <AdminServiceHero
        pageKey="ibt-services-audit"
        fallback={{
          badge: 'Business Auditing',
          badgeVariant: 'sunset',
          title: 'Know Your Business',
          titleGradient: 'Score',
          subtitle: 'Comprehensive business scoring — SEO analysis, Google Maps profile verification, website quality audits, and social presence analysis.',
        }}
      >
        {({ title, titleGradient, subtitle, badge }) => (
          <Section>
            <div className="text-center max-w-3xl mx-auto">
              <Badge variant="sunset">{badge}</Badge>
              <h1 className="text-4xl sm:text-6xl font-bold text-white mt-4 mb-6">
                {title}
                <br />
                <GradientText>{titleGradient}</GradientText>
              </h1>
              <p className="text-xl text-ink-400">
                {subtitle}
              </p>
            </div>
          </Section>
        )}
      </AdminServiceHero>

      {/* Audit Dimensions */}
      <Section>
        <SectionHeader badge="How We Grade" title="Audit Dimensions" center />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {auditDimensions.map((dim) => (
            <Card key={dim.id}>
              <div className="text-4xl mb-4">{dim.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{dim.name}</h3>
              <p className="text-sm text-ink-400 mb-4">{dim.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink-500">Weight</span>
                <span className="text-sm font-medium text-white">{dim.weight}%</span>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Audit Tool */}
      <Section>
        <Card className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Analyze Your Business</h2>
          <form onSubmit={handleAnalyze} className="space-y-4">
            <Input label="Website or Business Name" value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="example.com or Business Name" required />
            <Button type="submit" loading={isAnalyzing} className="w-full">{isAnalyzing ? 'Analyzing...' : 'Run Free Audit'}</Button>
          </form>
        </Card>
      </Section>

      {/* Results */}
      {result && (
        <Section>
          <Card className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">{result.domain}</h2>
              <div className="text-6xl font-bold text-white mb-2">{result.grade}</div>
              <p className="text-ink-400">Overall Score: {result.overallScore}/100</p>
            </div>
            <div className="flex justify-center gap-8 mb-8">
              <ScoreCircle score={result.seoScore} label="SEO" />
              <ScoreCircle score={result.mapsScore} label="Maps" />
              <ScoreCircle score={result.websiteScore} label="Website" />
              <ScoreCircle score={result.socialScore} label="Social" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Issues Found</h3>
                <ul className="space-y-2">
                  {result.issues.map((issue, i) => (
                    <li key={i} className="flex items-center gap-2 text-ink-400 text-sm">
                      <span className="w-2 h-2 rounded-full bg-error" />{issue}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Recommendations</h3>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-center gap-2 text-ink-400 text-sm">
                      <span className="w-2 h-2 rounded-full bg-success" />{rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <Button variant="secondary" className="flex-1">Download Full Report</Button>
              <Button className="flex-1">Get Fix Quote</Button>
            </div>
          </Card>
        </Section>
      )}

      {/* No Website CTA */}
      <Section>
        <Card className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">Don't Have a Website?</h2>
          <p className="text-ink-400 mb-6">
            Our audit can find businesses that don't have a web presence. We specialize in creating professional websites for Caribbean businesses — from restaurants to tour operators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/services/web-dev">Get a Quote</Button>
            <Button variant="outline">List My Business</Button>
          </div>
        </Card>
      </Section>

      {/* Contact */}
      <Section>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Request Full Audit</h2>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" required />
            <Button type="submit">Request Audit</Button>
          </form>
          {formStatus && <p className="mt-4 text-teal-400">{formStatus}</p>}
        </div>
      </Section>
    </div>
  );
}
