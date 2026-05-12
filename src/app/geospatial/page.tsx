'use client';

import { useState } from 'react';

export default function GeospatialPage() {
  const [activeRegion, setActiveRegion] = useState('st-kitts');
  const [selectedPOI, setSelectedPOI] = useState<string | null>(null);

  const regions = [
    { id: 'st-kitts', name: 'St. Kitts', lat: 17.357822, lng: -62.782998 },
    { id: 'nevis', name: 'Nevis', lat: 17.153935, lng: -62.583344 },
    { id: 'caribbean', name: 'Caribbean Overview', lat: 18.2208, lng: -66.5901 },
  ];

  const pois = [
    { id: '1', name: 'Frigate Bay Beach', category: 'Beach', island: 'St. Kitts', lat: 17.305, lng: -62.68 },
    { id: '2', name: 'Timothy Beach', category: 'Beach', island: 'St. Kitts', lat: 17.32, lng: -62.69 },
    { id: '3', name: 'Montpelier Plantation', category: 'Historic', island: 'Nevis', lat: 17.14, lng: -62.60 },
    { id: '4', name: 'Charlestown', category: 'Town', island: 'Nevis', lat: 17.14, lng: -62.62 },
    { id: '5', name: 'Basseterre', category: 'Town', island: 'St. Kitts', lat: 17.30, lng: -62.72 },
    { id: '6', name: 'Pinneys Beach', category: 'Beach', island: 'Nevis', lat: 17.16, lng: -62.60 },
  ];

  const categories = ['All', 'Beach', 'Historic', 'Town', 'Restaurant', 'Hotel'];

  const activeRegionData = regions.find(r => r.id === activeRegion) || regions[0];
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${activeRegionData.lng - 0.1},${activeRegionData.lat - 0.05},${activeRegionData.lng + 0.1},${activeRegionData.lat + 0.05}&layer=mapnik&marker=${activeRegionData.lat},${activeRegionData.lng}`;

  const filteredPOIs = selectedPOI && selectedPOI !== 'all' 
    ? pois.filter(p => p.category === selectedPOI) 
    : pois;

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Regional Intelligence</h1>
          <p className="text-slate-400">Interactive Caribbean mapping powered by OpenStreetMap</p>
        </div>

        {/* Region Selector */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => setActiveRegion(region.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
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
            className="px-5 py-2.5 rounded-xl text-sm font-medium bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-all"
          >
            OpenStreetMap
            <svg className="w-3 h-3 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-2 space-y-4">
            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
              <div className="aspect-[16/10] relative">
                <iframe
                  src={mapUrl}
                  title="Caribbean Map"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
              <div className="p-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-white">{activeRegionData.name}</h3>
                  <p className="text-xs text-slate-500">
                    {activeRegionData.lat.toFixed(4)}, {activeRegionData.lng.toFixed(4)}
                  </p>
                </div>
                <a 
                  href={`https://www.openstreetmap.org/?mlat=${activeRegionData.lat}&mlon=${activeRegionData.lng}#map=12/${activeRegionData.lat}/${activeRegionData.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  View Full Map
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-cyan-400">{pois.length}</div>
                <div className="text-xs text-slate-500 mt-1">Points of Interest</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-emerald-400">2</div>
                <div className="text-xs text-slate-500 mt-1">Islands Covered</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-amber-400">{categories.length - 1}</div>
                <div className="text-xs text-slate-500 mt-1">Categories</div>
              </div>
            </div>

            {/* Info Banner */}
            <div className="bg-gradient-to-r from-cyan-900/20 to-emerald-900/20 rounded-xl p-4 border border-cyan-800/30">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm mb-1">Building Regional Intelligence</h4>
                  <p className="text-xs text-slate-400">
                    This map is powered by OpenStreetMap data. IBT Solutions is developing proprietary geospatial APIs for St. Kitts & Nevis and the wider Caribbean. 
                    Contact us to partner or contribute data.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Category Filter */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <h3 className="font-semibold text-white mb-3">Filter by Category</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedPOI('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    !selectedPOI || selectedPOI === 'all'
                      ? 'bg-cyan-500 text-slate-900'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  All
                </button>
                {categories.filter(c => c !== 'All').map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedPOI(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedPOI === cat
                        ? 'bg-cyan-500 text-slate-900'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* POI List */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <h3 className="font-semibold text-white mb-3">Points of Interest</h3>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {filteredPOIs.map((poi) => (
                  <div
                    key={poi.id}
                    className="p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer border border-slate-700/50 hover:border-slate-600"
                  >
                    <p className="text-sm text-white font-medium">{poi.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500">{poi.category}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-600" />
                      <span className="text-xs text-slate-500">{poi.island}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Developer API Note */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
              <h3 className="font-medium text-white mb-2">For Developers</h3>
              <p className="text-xs text-slate-400 mb-3">
                Geospatial APIs for POI data, routing, and location-based services coming soon.
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