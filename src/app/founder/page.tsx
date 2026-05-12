import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Founder | IBT Solutions',
  description: 'Learn about the founder of IBT Solutions - experience, skills, and vision for Caribbean digital transformation.',
};

export default function FounderPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-8">
          <Link href="/portfolio" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Portfolio
          </Link>
        </div>

        <div className="bg-slate-900/50 rounded-3xl p-8 md:p-12 border border-slate-800">
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center text-6xl">
              👨‍💻
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Founder & Visionary</h1>
              <p className="text-xl text-cyan-400 mb-4">IBT Solutions</p>
              <p className="text-slate-400">
                Building digital infrastructure for the Caribbean, one solution at a time.
              </p>
              <div className="flex gap-3 mt-4">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm rounded-lg transition-colors">
                  LinkedIn
                </a>
                <a href="https://github.com/211skilli211" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm rounded-lg transition-colors">
                  GitHub
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">About</h2>
              <div className="prose prose-invert prose-slate max-w-none">
                <p className="text-slate-300 leading-relaxed">
                  A Caribbean-based entrepreneur and developer focused on building practical technology solutions for regional businesses. 
                  With deep roots in St. Kitts & Nevis, the mission is to accelerate digital transformation across the Caribbean 
                  through accessible AI tools, robust APIs, and community-owned cooperative structures.
                </p>
                <p className="text-slate-300 leading-relaxed mt-4">
                  The vision extends beyond individual services — creating an ecosystem where small businesses can thrive 
                  through shared resources, collective purchasing power, and direct market access via platforms like IslandHub.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Core Expertise</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { skill: 'Full-Stack Development', level: 'Expert' },
                  { skill: 'AI/ML Integration', level: 'Advanced' },
                  { skill: 'API Architecture', level: 'Expert' },
                  { skill: 'Business Strategy', level: 'Advanced' },
                  { skill: 'UI/UX Design', level: 'Proficient' },
                  { skill: 'Co-op Development', level: 'Advanced' },
                ].map((item) => (
                  <div key={item.skill} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                    <div className="text-white font-medium">{item.skill}</div>
                    <div className="text-xs text-slate-500 mt-1">{item.level}</div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Technical Stack</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  'Next.js', 'React', 'TypeScript', 'Node.js', 'Python',
                  'PostgreSQL', 'Tailwind CSS', 'OpenAI', 'Neon', 'Vercel',
                  'AWS', 'Docker', 'GraphQL', 'REST APIs', 'Figma'
                ].map((tech) => (
                  <span key={tech} className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Experience</h2>
              <div className="space-y-6">
                <div className="border-l-2 border-cyan-500 pl-6">
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <h3 className="text-lg font-semibold text-white">Founder & Developer</h3>
                    <span className="text-sm text-slate-500">2022 - Present</span>
                  </div>
                  <p className="text-cyan-400 text-sm">IBT Solutions</p>
                  <p className="text-slate-400 text-sm mt-2">
                    Building AI-powered business tools, APIs, and the IBT Co-operative Federation.
                  </p>
                </div>
                <div className="border-l-2 border-slate-700 pl-6">
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <h3 className="text-lg font-semibold text-white">Platform Development</h3>
                    <span className="text-sm text-slate-500">2020 - 2022</span>
                  </div>
                  <p className="text-slate-400 text-sm">IslandHub Marketplace</p>
                  <p className="text-slate-400 text-sm mt-2">
                    Led development of regional marketplace platform for Caribbean commerce.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Education & Certifications</h2>
              <ul className="space-y-3">
                {[
                  'Computer Science / Software Development',
                  'AWS Certified Developer',
                  'Google Cloud Professional',
                  'Meta Front-End Developer Certificate',
                ].map((edu) => (
                  <li key={edu} className="flex items-start gap-3 text-slate-300">
                    <svg className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {edu}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Resume</h2>
              <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 text-center">
                <p className="text-slate-400 mb-4">Download full resume with complete work history and references.</p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Resume (PDF)
                </a>
                <p className="text-xs text-slate-500 mt-3">Coming Soon</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}