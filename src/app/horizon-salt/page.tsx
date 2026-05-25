import Link from 'next/link';
import HeroSection from './HeroSection';

const API_BASE = 'https://islandhub.onrender.com';

async function getProducts() {
  try {
    const res = await fetch(`${API_BASE}/api/listings?store_id=46&limit=20`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.listings || data || [];
  } catch {
    return [];
  }
}

export default async function HorizonSaltPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-stone-50">
      <HeroSection />

      {/* Story */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-amber-600 font-semibold tracking-widest uppercase text-sm mb-3">Our Story</p>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-6">Born from the Sea</h2>
            <div className="space-y-4 text-stone-600 leading-relaxed">
              <p>
                For generations, the salt ponds of St. Kitts have produced some of the finest sea salt in the Caribbean. What began as a small family operation has grown into Horizon Salt Co. — a brand dedicated to preserving this tradition while sharing it with the world.
              </p>
              <p>
                Our salt is hand-harvested using traditional methods, allowing the Caribbean sun and wind to naturally crystallize each grain. The result is a pure, mineral-rich salt with a distinctive flavor that captures the essence of the islands.
              </p>
              <p>
                Every purchase supports local St. Kitts communities and helps sustain the centuries-old salt harvesting tradition.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-teal-100 to-amber-50 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-teal-700">100%</p>
                <p className="text-stone-500 text-sm mt-1">Natural</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-teal-700">84+</p>
                <p className="text-stone-500 text-sm mt-1">Minerals</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-teal-700">Hand</p>
                <p className="text-stone-500 text-sm mt-1">Harvested</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-teal-700">Zero</p>
                <p className="text-stone-500 text-sm mt-1">Additives</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-stone-800 text-center mb-12">Why Horizon Salt?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: '🌊', title: 'Pure Origin', desc: 'Harvested from the pristine salt ponds of St. Kitts & Nevis.' },
              { icon: '✨', title: 'Mineral Rich', desc: 'Contains 84+ naturally occurring minerals and trace elements.' },
              { icon: '🤲', title: 'Hand Harvested', desc: 'Traditional methods passed down through generations.' },
              { icon: '🌿', title: 'Sustainable', desc: 'Eco-friendly harvesting that respects the natural environment.' }
            ].map((b, i) => (
              <div key={i} className="text-center p-6 rounded-xl bg-stone-50 hover:bg-teal-50 transition-colors">
                <span className="text-4xl">{b.icon}</span>
                <h3 className="font-bold text-stone-800 mt-4 mb-2">{b.title}</h3>
                <p className="text-stone-500 text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-stone-800 text-center mb-3">Our Products</h2>
        <p className="text-stone-500 text-center mb-12">Authentic St. Kitts sea salt, delivered to your door</p>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-stone-400 text-lg">Products coming soon...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p: any) => {
              const img = p.images?.[0] || p.photos?.[0] || 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=400';
              const price = typeof p.price === 'string' ? parseFloat(p.price) : (p.price || 0);
              return (
                <div key={p.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-stone-100">
                  <div className="aspect-square bg-stone-100 overflow-hidden">
                    <img src={img} alt={p.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-stone-800 mb-1">{p.title}</h3>
                    <p className="text-stone-500 text-sm mb-3">{p.description || ''}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-teal-700">${price.toFixed(2)} <span className="text-sm font-normal text-stone-400">XCD</span></span>
                      <a href={`${API_BASE}/store/horizon-salt`} className="bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors">
                        View
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="text-center mt-10">
          <a href={`${API_BASE}/store/horizon-salt`} className="inline-block bg-teal-700 hover:bg-teal-600 text-white font-bold px-8 py-4 rounded-full text-lg transition-colors">
            Visit Full Store on IslandHub →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-2xl font-bold text-white mb-2">Horizon Salt Co.</p>
          <p className="text-sm mb-6">From the salt ponds of St. Kitts to your table</p>
          <div className="flex justify-center gap-6 text-sm">
            <Link href="/" className="hover:text-white transition-colors">IBT Solutions</Link>
            <a href={`${API_BASE}/store/horizon-salt`} className="hover:text-white transition-colors">IslandHub Store</a>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
          <p className="text-xs mt-8 text-stone-600">© 2026 Horizon Salt Co. — A division of IBT Solutions. St. Kitts & Nevis.</p>
        </div>
      </footer>
    </main>
  );
}
