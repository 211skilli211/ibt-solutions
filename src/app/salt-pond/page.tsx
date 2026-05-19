import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'St. Kitts Salt Pond | Premium Natural Sea Salt from the Caribbean',
  description: 'Hand-harvested, sun-dried sea salt from the pristine salt ponds of St. Kitts. Rich in natural minerals, processed using traditional Caribbean methods.',
  openGraph: {
    title: 'St. Kitts Salt Pond | Premium Natural Sea Salt',
    description: 'Hand-harvested, sun-dried sea salt from the pristine salt ponds of St. Kitts.',
    type: 'website',
  },
};

const products = [
  {
    name: 'Coarse Sea Salt',
    weight: '500g',
    price: '$15.00',
    description: 'Hand-harvested coarse sea salt. Perfect for cooking, seasoning, and finishing dishes. Rich in natural minerals.',
    image: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=600&h=400&fit=crop',
  },
  {
    name: 'Fine Sea Salt',
    weight: '250g',
    price: '$10.00',
    description: 'Finely ground sea salt, ideal for everyday cooking and baking. Sun-dried and minimally processed.',
    image: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=600&h=400&fit=crop',
  },
  {
    name: 'Smoked Sea Salt',
    weight: '200g',
    price: '$20.00',
    description: 'Artisan smoked sea salt, cold-smoked over local hardwoods for a rich, complex flavor. A gourmet chef favorite.',
    image: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=600&h=400&fit=crop',
  },
  {
    name: 'Salt Sampler Gift Box',
    weight: '3 varieties',
    price: '$35.00',
    description: 'A curated gift box featuring coarse, fine, and smoked sea salt. Beautifully packaged in eco-friendly materials.',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&h=400&fit=crop',
  },
];

const benefits = [
  { title: '100% Natural', desc: 'No additives, no processing — just pure sun-dried sea salt from the Caribbean sun.' },
  { title: 'Mineral Rich', desc: 'Contains over 80 naturally occurring minerals including magnesium, potassium, and calcium.' },
  { title: 'Hand Harvested', desc: 'Carefully harvested by hand using traditional Caribbean salt-making methods passed down through generations.' },
  { title: 'Sustainable', desc: 'Our salt ponds are a natural, renewable resource. We harvest responsibly to preserve the ecosystem.' },
];

export default function SaltPondPage() {
  return (
    <div className="min-h-screen bg-amber-50 text-slate-900">
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1505164294013-73197a9b8af6?w=1920&h=1080&fit=crop"
            alt="St. Kitts salt pond aerial view"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/60 via-amber-900/40 to-amber-900/70" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="inline-block px-4 py-2 bg-amber-500/20 backdrop-blur-sm border border-amber-300/30 rounded-full text-amber-200 text-xs font-bold uppercase tracking-[0.3em] mb-6">
            St. Kitts & Nevis, Caribbean
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            St. Kitts<br />
            <span className="text-amber-300">Salt Pond</span>
          </h1>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            Premium natural sea salt, hand-harvested from the pristine salt ponds of the Southeast Peninsula. Sun-dried, mineral-rich, and processed using traditional Caribbean methods.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#products" className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-amber-900 font-bold rounded-xl transition-all shadow-lg">
              Shop Our Salt
            </a>
            <a href="#story" className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-bold rounded-xl transition-all">
              Our Story
            </a>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Why St. Kitts Salt?</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Our salt is more than a seasoning — it&apos;s a piece of Caribbean heritage, crafted by nature and tradition.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b) => (
              <div key={b.title} className="text-center p-6 rounded-2xl bg-amber-50 border border-amber-100">
                <h3 className="text-lg font-bold text-amber-800 mb-2">{b.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section id="story" className="py-20 bg-amber-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-6">Our Story</h2>
              <div className="space-y-4 text-amber-100 leading-relaxed">
                <p>
                  Nestled on the southeast peninsula of St. Kitts lies a natural treasure — ancient salt ponds where the Caribbean sun and sea have been creating premium sea salt for centuries.
                </p>
                <p>
                  Our salt is harvested by hand using traditional methods passed down through generations of Caribbean salt makers. Seawater flows into shallow ponds, where the tropical sun slowly evaporates the water, leaving behind crystals rich with over 80 naturally occurring minerals.
                </p>
                <p>
                  Unlike mass-produced table salt, our salt contains no additives, no anti-caking agents, and undergoes no chemical processing. What you get is pure, unrefined sea salt — exactly as nature intended.
                </p>
                <p>
                  Every purchase supports local St. Kitts communities and helps preserve this traditional craft for future generations.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1505164294013-73197a9b8af6?w=800&h=600&fit=crop"
                alt="Salt pond landscape"
                className="rounded-3xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-amber-500 text-amber-900 p-6 rounded-2xl shadow-xl max-w-xs">
                <p className="font-bold text-lg">Est. 2024</p>
                <p className="text-sm mt-1">Proudly harvested in St. Kitts & Nevis, Caribbean</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Our Products</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              From coarse finishing salt to artisan smoked varieties — each product is hand-harvested and carefully packaged.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((p) => (
              <div key={p.name} className="group bg-amber-50 rounded-2xl overflow-hidden border border-amber-100 hover:border-amber-300 transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-bold text-slate-900">{p.name}</h3>
                    <span className="text-xs text-amber-600 font-medium">{p.weight}</span>
                  </div>
                  <p className="text-sm text-slate-500 mb-4 line-clamp-2">{p.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black text-amber-700">{p.price}</span>
                    <a
                      href="https://islandhub.vercel.app/store/st-kitts-salt-pond"
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-amber-900 text-sm font-bold rounded-lg transition-all"
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a
              href="https://islandhub.vercel.app/store/st-kitts-salt-pond"
              className="inline-block px-8 py-4 bg-amber-500 hover:bg-amber-400 text-amber-900 font-bold rounded-xl transition-all shadow-lg"
            >
              View All Products on IslandHub →
            </a>
          </div>
        </div>
      </section>

      {/* Contact / Footer */}
      <footer className="py-16 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-black mb-4">
                St. Kitts <span className="text-amber-400">Salt Pond</span>
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Premium natural sea salt from the Caribbean. Hand-harvested, sun-dried, and rich in minerals.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <div className="space-y-2 text-slate-400">
                <p>📍 Salt Pond, Southeast Peninsula</p>
                <p>St. Kitts & Nevis, Caribbean</p>
                <p>📧 info@saltpond.kn</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#products" className="block text-slate-400 hover:text-amber-400 transition-colors">Products</a>
                <a href="#story" className="block text-slate-400 hover:text-amber-400 transition-colors">Our Story</a>
                <a href="https://islandhub.vercel.app/store/st-kitts-salt-pond" className="block text-slate-400 hover:text-amber-400 transition-colors">Shop on IslandHub</a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500 text-sm">
            <p>© 2026 St. Kitts Salt Pond. All rights reserved. A proud IBT Solutions partner.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
