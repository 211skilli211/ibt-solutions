'use client';

import { useState } from 'react';

export default function GeospatialPage() {
  const [activeRegion, setActiveRegion] = useState('st-kitts');

  const regions = [
    { id: 'st-kitts', name: 'St. Kitts', lat: 17.357822, lng: -62.782998 },
    { id: 'nevis', name: 'Nevis', lat: 17.153935, lng: -62.583344 },
    { id: 'caribbean', name: 'Caribbean Overview', lat: 18.2208, lng: -66.5901 },
  ];

  const pois = [
    { id: '1', name: 'Frigate Bay Beach', category: 'Beach', island: 'St. Kitts' },
    { id: '2', name: 'Timothy Beach', category: 'Beach', island: 'St. Kitts' },
    { id: '3', name: 'Montpelier Plantation', category: 'Historic', island: 'Nevis' },
    { id: '4', name: 'Charlestown', category: 'Town', island: 'Nevis' },
    { id: '5', name: 'Basseterre', category: 'Town', island: 'St. Kitts' },
    { id: '6', name: 'Pinneys Beach', category: 'Beach', island: 'Nevis' },
  ];

  const categories = ['All', 'Beach', 'Historic', 'Town', 'Restaurant', 'Hotel'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const activeRegionData = regions.find(r => r.id === activeRegion) || regions[0];
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${activeRegionData.lng - 0.1},${activeRegionData.lat - 0.05},${activeRegionData.lng + 0.1},${activeRegionData.lat + 0.05}&layer=mapnik&marker=${activeRegionData.lat},${activeRegionData.lng}`;

  const filteredPOIs = selectedCategory === 'All'
    ? pois
    : pois.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-white">Regional Intelligence</h1>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
              In Development
            </span>
          </div>
          <p className="text-slate-400">Caribbean geospatial mapping — powered by OpenStreetMap (temporary view)</p>
        </div>

        <div className="mb-6 p-5 rounded-2xl bg-gradient-to-r from-cyan-900/20 via-emerald-900/10 to-cyan-900/20 border border-cyan-800/30">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white mb-1">Custom Geospatial Platform Coming Soon</h3>
              <p className="text-xs text-slate-400 mb-3">
                IBT Solutions is building a proprietary Caribbean geospatial API and interactive mapping platform — 
                real-time POI data, business listings, events, weather, marine conditions, and more for St. Kitts & Nevis 
                and the wider Caribbean. The map below is a temporary OpenStreetMap preview. 
                Contact us to join beta testing or contribute data.
              </p>
              <div className="flex gap-3">
                <a href="/contact" className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 text-xs font-semibold rounded-lg transition-colors">
                  Join Beta
                </a>
                <a href="https://github.com/211skilli211" target="_blank" className="px-4 py-2 border border-slate-700 hover:border-slate-600 text-white text-xs font-medium rounded-lg transition-colors">
                  Contribute on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mb-4 overflow-x-auto pb-2">
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => setActiveRegion(region.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeRegion === region.id
                  ? 'bg-cyan-500 text-slate-900'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {region.name}
            </button>
          ))}
          <a 
            href="https://www.openstreetmap.org" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl text-sm font-medium bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-all whitespace-nowrap"
          >
            OpenStreetMap
            <svg className="w-3 h-3 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
              <div className="relative">
                <div className="aspect-[16/10]">
                  <iframe
                    src={mapUrl}
                    title="Caribbean Map"
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                </div>
                <div className="absolute top-3 left-3 px-3 py-1.5 bg-slate-900/90 backdrop-blur rounded-lg border border-slate-700">
                  <span className="text-xs text-slate-300">
                    OpenStreetMap Preview — {activeRegionData.name}
                  </span>
                </div>
              </div>
              <div className="p-3 border-t border-slate-800 flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  {activeRegionData.lat.toFixed(4)}, {activeRegionData.lng.toFixed(4)}
                </p>
                <a 
                  href={`https://www.openstreetmap.org/?mlat=${activeRegionData.lat}&mlon=${activeRegionData.lng}#map=12/${activeRegionData.lat}/${activeRegionData.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  Open full map
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
                <div className="text-xl font-bold text-cyan-400">{pois.length}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Points of Interest</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
                <div className="text-xl font-bold text-emerald-400">2</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Islands</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
                <div className="text-xl font-bold text-amber-400">{categories.length - 1}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Categories</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <h3 className="font-semibold text-white mb-3">Filter by Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-cyan-500 text-slate-900'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <h3 className="font-semibold text-white mb-3">Points of Interest</h3>
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {filteredPOIs.map((poi) => (
                  <div
                    key={poi.id}
                    className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50"
                  >
                    <p className="text-sm text-white font-medium">{poi.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-slate-500">{poi.category}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-600" />
                      <span className="text-xs text-slate-500">{poi.island}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
              <h3 className="font-medium text-white mb-2 text-sm">For Developers</h3>
              <p className="text-xs text-slate-400 mb-3">
                Geospatial APIs for POI data, routing, and location services — coming in 2026.
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-medium"
              >
                Request API Access
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}