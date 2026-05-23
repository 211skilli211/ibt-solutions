import Link from 'next/link';

const flagUrl = 'https://flagcdn.com/kn.svg';

const footerLinks = {
  services: [
    { href: '/services', label: 'All Services' },
    { href: '/services/ai', label: 'AI Solutions' },
    { href: '/services/web-dev', label: 'Web Development' },
    { href: '/services/audit', label: 'Business Audit' },
  ],
  company: [
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/founder', label: 'Founder' },
    { href: '/contact', label: 'Contact' },
    { href: '/partners', label: 'Partners' },
  ],
  coops: [
    { href: '/coops', label: 'IBT Co-ops' },
    { href: '/coops/how-it-works', label: 'How It Works' },
    { href: '/coops/get-involved', label: 'Get Involved' },
    { href: '/coops/trades', label: 'Trades Co-op' },
    { href: '/coops/micro-farms', label: 'Micro-Farms' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-surface-0 border-t border-surface-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                IBT
              </span>
              <span className="text-sm text-slate-500">Solutions</span>
            </Link>
            <p className="text-slate-400 text-sm mb-4">
              Caribbean-focused AI tools, business APIs, and co-operative federation building the future of regional commerce.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500">Proudly from</span>
              <img
                src={flagUrl}
                alt="St. Kitts & Nevis"
                className="h-4 w-auto rounded shadow-sm opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Co-ops */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">IBT Co-ops</h4>
            <ul className="space-y-2">
              {footerLinks.coops.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-surface-3 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-slate-500 text-sm">
            <span>© {new Date().getFullYear()} IBT Solutions.</span>
            <span className="hidden md:inline">All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://github.com/211skilli211" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="GitHub">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a href="https://twitter.com/211skilli211" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="Twitter">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://linkedin.com/in/billy-blanco" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
