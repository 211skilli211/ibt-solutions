import Link from 'next/link';
import { Button, Section, Card, Badge, GradientText } from '@/components/ui';
import FounderPhoto from './FounderPhoto';

export const metadata = {
  title: 'N. J. Robin — Founder & Creative Technologist | IBT Solutions',
  description: 'N. J. Robin — Founder & Creative Technologist at IBT Solutions. Graphic Designer, App Developer, 3D Designer. 13+ years experience in creative technology.',
};

const skills = [
  'Flutter', 'Dart', 'Java', 'UX/UI Design', 'Graphic Design',
  '3D Modeling & Rendering', 'Corporate Branding', 'Decal Design',
  'Print Production (DTF/DTG)', 'Web Development', 'Data Analysis',
  'AI Tools', 'Architecture', 'Figma', 'Adobe Creative Suite',
  'Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL',
  'Tailwind CSS', 'Python', 'Blender', 'AutoCAD',
];

const experience = [
  {
    title: 'Creative Designer',
    period: '13 Years',
    org: 'Freelance · Google Arts · Carib Craft and Graphics',
    desc: 'Delivered professional graphic design, branding, and visual identity solutions for clients across the Caribbean and internationally. Specialized in corporate branding, print production, and digital media.',
  },
  {
    title: 'App Developer',
    period: '5+ Years',
    org: 'UX/UI & Full-Stack (Flutter, Dart, Java)',
    desc: 'Designed and developed cross-platform mobile applications with focus on user experience, performance, and scalable architecture. Built end-to-end solutions from concept to deployment.',
  },
  {
    title: '3D Designer & Architect',
    period: 'Ongoing',
    org: '3D Modeling, Rendering & Architectural Design',
    desc: 'Created 3D visualizations, architectural renderings, and spatial designs. Combined technical drafting with artistic vision for residential and commercial projects.',
  },
  {
    title: 'Professional Painter & Construction',
    period: '10 Years',
    org: 'Dominica',
    desc: 'Hands-on experience in professional painting, construction, and project management. Built practical skills in materials, finishes, and structural design across residential and commercial builds.',
  },
];

export default function FounderPage() {
  return (
    <div className="min-h-screen bg-surface-0">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Back link */}
        <div className="mb-8">
          <Link href="/portfolio" className="text-sm text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Portfolio
          </Link>
        </div>

        {/* Hero Card */}
        <Card className="p-6 md:p-10 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Photo */}
            <div className="shrink-0">
              <FounderPhoto />
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-2 tracking-tight">
                N. J. Robin
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-teal-400 mb-1">
                Founder & Creative Technologist
              </p>
              <p className="text-base text-slate-400 mb-4">
                Graphic Designer · App Developer · 3D Designer
              </p>

              {/* Contact pills */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-5">
                <a href="tel:+18697639919" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-2 border border-surface-3 text-slate-300 text-sm hover:border-teal-500/30 hover:text-teal-400 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  +1 (869) 763-9919
                </a>
                <a href="mailto:businesstrends869@gmail.com" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-2 border border-surface-3 text-slate-300 text-sm hover:border-teal-500/30 hover:text-teal-400 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  businesstrends869@gmail.com
                </a>
                <a href="https://quikrsolutions.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-2 border border-surface-3 text-slate-300 text-sm hover:border-teal-500/30 hover:text-teal-400 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                  quikrsolutions.app
                </a>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-2 border border-surface-3 text-slate-300 text-sm">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  St. Kitts
                </span>
              </div>

              {/* Download Resume */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-400 text-ocean-900 font-bold rounded-xl transition-all text-sm shadow-lg shadow-teal-500/20 hover:shadow-teal-400/30"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Download Full Resume (PDF)
              </a>
            </div>
          </div>
        </Card>

        {/* Bio */}
        <Card className="p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </span>
            About
          </h2>
          <div className="text-slate-300 leading-relaxed space-y-4">
            <p>
              <span className="text-teal-400 font-semibold">N. J. Robin</span> is a multi-disciplinary creative technologist and founder based in St. Kitts & Nevis. With over <span className="text-white font-medium">13 years of experience in graphic design</span>, <span className="text-white font-medium">5+ years in app development</span>, and a decade of hands-on work in painting and construction, he brings a rare combination of creative vision and technical execution to every project.
            </p>
            <p>
              His work spans the full spectrum of digital creation — from corporate branding and print production (DTF/DTG) to full-stack mobile development with Flutter and Dart, 3D modeling and architectural rendering, and AI-powered business tools. He founded <span className="text-teal-400 font-medium">IBT Solutions</span> to build practical technology infrastructure for Caribbean businesses.
            </p>
            <p>
              Beyond technology, his background in professional painting and construction across Dominica gives him a grounded understanding of physical craft, materials, and project management — skills that inform his approach to digital product design and development.
            </p>
          </div>
        </Card>

        {/* Experience Highlights */}
        <Card className="p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </span>
            Experience Highlights
          </h2>
          <div className="space-y-6">
            {experience.map((exp, i) => (
              <div key={i} className="relative pl-8 border-l-2 border-surface-3 hover:border-teal-500/50 transition-colors">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-surface-1 border-2 border-teal-500" />
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                  <h3 className="text-lg font-bold text-white">{exp.title}</h3>
                  <Badge variant="teal" size="sm">{exp.period}</Badge>
                </div>
                <p className="text-sm text-slate-400 mb-2">{exp.org}</p>
                <p className="text-sm text-slate-300 leading-relaxed">{exp.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Technical Skills */}
        <Card className="p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            </span>
            Technical Skills & Platforms
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="px-3 py-1.5 rounded-full bg-surface-2 border border-surface-3 text-slate-300 text-sm hover:border-teal-500/30 hover:text-teal-400 transition-colors cursor-default">
                {skill}
              </span>
            ))}
          </div>
        </Card>

        {/* CTA */}
        <div className="bg-gradient-to-br from-surface-1 to-surface-2 border border-surface-3 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Let's Build Something Together</h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Whether you need a complete brand identity, a mobile app, 3D visualization, or a full digital transformation — let's talk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:businesstrends869@gmail.com" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-teal-500 hover:bg-teal-400 text-ocean-900 font-bold rounded-xl transition-all shadow-lg shadow-teal-500/20">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Get in Touch
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-surface-3 hover:border-teal-500/50 text-white font-medium rounded-xl transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
