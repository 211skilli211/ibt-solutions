import Link from 'next/link';

export const metadata = {
  title: 'Portfolio | IBT Solutions',
  description: 'Explore projects and work by IBT Solutions - from IslandHub marketplace to IBT Co-operative Federation.',
};

const projects = [
  {
    title: 'IslandHub Marketplace',
    description: 'Complete Caribbean marketplace platform featuring vendor stores, food delivery, ride services, auctions, and secure payments. Built to connect local businesses with regional customers.',
    tags: ['Next.js', 'PostgreSQL', 'Stripe', 'Mapbox'],
    status: 'Live',
    href: 'https://islandhub-7dor6ly4p-rpskilli211-3018s-projects.vercel.app',
    image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&h=400&fit=crop',
  },
  {
    title: 'IBT Co-operative Federation',
    description: 'Multi-cooperative platform uniting Trades & Services, Micro-Farms, and Micro-Manufacturing under democratic governance. IBT Solutions serves as temporary facilitator.',
    tags: ['Next.js', 'Neon', 'WhatsApp API', 'Telegram'],
    status: 'Building',
    href: '/coops',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=400&fit=crop',
  },
  {
    title: 'Business API Suite',
    description: 'Comprehensive APIs for Caribbean businesses - currency exchange, geospatial mapping, accounting integrations, inventory management, and AI-powered business intelligence.',
    tags: ['REST API', 'Node.js', 'OpenAI', 'PostgreSQL'],
    status: 'Live',
    href: '/api-services',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
  },
  {
    title: 'Graphic Trends Micro-Manufacturing',
    description: 'Local production facility for custom apparel, print-on-demand merchandise, and promotional materials. Sustainable practices, quick turnaround, community-focused.',
    tags: ['Print-on-Demand', 'E-commerce', 'Design'],
    status: 'Launching',
    href: '/coops/graphic-trends',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
  },
  {
    title: 'AI Digital Influencer',
    description: 'Create AI-powered influencers with authentic Caribbean accents for marketing and social media. Voice cloning, video generation, multi-platform deployment.',
    tags: ['AI', 'Voice Cloning', 'Marketing'],
    status: 'Beta',
    href: '/influencer',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
  },
  {
    title: 'Regional Intel & Geospatial',
    description: 'Location intelligence platform with Caribbean-focused mapping, POI data, events discovery, weather integration, and marine conditions for maritime activities.',
    tags: ['Maps', 'GIS', 'Analytics'],
    status: 'Live',
    href: '/geospatial',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
  },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Portfolio</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Building the future of Caribbean commerce through technology, community, and innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.href}
              className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    project.status === 'Live' ? 'bg-emerald-500/20 text-emerald-400' :
                    project.status === 'Building' ? 'bg-cyan-500/20 text-cyan-400' :
                    project.status === 'Beta' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-slate-500/20 text-slate-400'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs rounded-full bg-slate-800 text-slate-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-16 text-center p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
          <p className="text-slate-400 mb-4">
            Interested in working together or contributing to these projects?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl transition-all"
            >
              Get in Touch
            </Link>
            <Link
              href="/coops"
              className="px-6 py-3 border border-slate-700 hover:border-slate-600 text-white font-medium rounded-xl transition-all"
            >
              Join IBT Co-ops
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/founder" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
            About the founder →
          </Link>
        </div>
      </div>
    </div>
  );
}