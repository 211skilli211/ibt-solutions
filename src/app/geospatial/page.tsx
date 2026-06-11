"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Client-only: Cesium is CDN-only, SSR breaks it
const CesiumGaussianSplat = dynamic(
  () => import("@/components/CesiumGaussianSplat"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-surface-0 rounded-2xl">
        <div className="text-center">
          <div
            style={{
              width: 40,
              height: 40,
              border: "3px solid rgba(20, 184, 166, 0.2)",
              borderTopColor: "#14B8A6",
              borderRadius: "50%",
              animation: "gsSpin 0.8s linear infinite",
              margin: "0 auto",
            }}
          />
          <p className="text-xs text-ink-500 mt-3">Loading 3D scene…</p>
          <style>{`@keyframes gsSpin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    ),
  }
);

// Client-only: Three.js / R3F
const GaussianSplatViewer = dynamic(
  () => import("@/components/GaussianSplatViewer"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-surface-0 rounded-2xl">
        <div className="text-center">
          <div
            style={{
              width: 40,
              height: 40,
              border: "3px solid rgba(20, 184, 166, 0.2)",
              borderTopColor: "#14B8A6",
              borderRadius: "50%",
              animation: "gsSpin 0.8s linear infinite",
              margin: "0 auto",
            }}
          />
          <p className="text-xs text-ink-500 mt-3">Loading splat viewer…</p>
        </div>
      </div>
    ),
  }
);

// ─── Types ───────────────────────────────────────────────────────────────────

interface GeospatialSettings {
  enable_3d_tiles: boolean;
  enable_gaussian_splat: boolean;
  cesium_ion_asset_id: number | null;
  splat_ply_url: string | null;
  spz_url: string | null;
  splat_camera_lat: number;
  splat_camera_lng: number;
  splat_camera_height: number;
}

const DEFAULT_SETTINGS: GeospatialSettings = {
  enable_3d_tiles: true,
  enable_gaussian_splat: false,
  cesium_ion_asset_id: null,
  splat_ply_url: null,
  spz_url: null,
  splat_camera_lat: 17.3026,
  splat_camera_lng: -62.7248,
  splat_camera_height: 500,
};

// ─── Region Data ─────────────────────────────────────────────────────────────

const regions = [
  { id: "st-kitts", name: "St. Kitts", lat: 17.357822, lng: -62.782998 },
  { id: "nevis", name: "Nevis", lat: 17.153935, lng: -62.583344 },
  { id: "caribbean", name: "Caribbean Overview", lat: 18.2208, lng: -66.5901 },
];

const pois = [
  { id: "1", name: "Frigate Bay Beach", category: "Beach", island: "St. Kitts" },
  { id: "2", name: "Timothy Beach", category: "Beach", island: "St. Kitts" },
  { id: "3", name: "Montpelier Plantation", category: "Historic", island: "Nevis" },
  { id: "4", name: "Charlestown", category: "Town", island: "Nevis" },
  { id: "5", name: "Basseterre", category: "Town", island: "St. Kitts" },
  { id: "6", name: "Pinneys Beach", category: "Beach", island: "Nevis" },
];

const categories = ["All", "Beach", "Historic", "Town", "Restaurant", "Hotel"];

// ─── View Mode Tabs ──────────────────────────────────────────────────────────

type ViewMode = "2d" | "3d-tiles" | "gaussian-splat";

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function GeospatialPage() {
  const [activeRegion, setActiveRegion] = useState("st-kitts");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<ViewMode>("2d");
  const [settings, setSettings] = useState<GeospatialSettings>(DEFAULT_SETTINGS);
  const [settingsLoaded, setSettingsLoaded] = useState(false);

  // Load settings from API
  useEffect(() => {
    fetch("/api/geospatial/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data && Object.keys(data).length > 0) {
          setSettings({ ...DEFAULT_SETTINGS, ...data });
        }
      })
      .catch(() => {})
      .finally(() => setSettingsLoaded(true));
  }, []);

  const activeRegionData = regions.find((r) => r.id === activeRegion) || regions[0];
  const filteredPOIs =
    selectedCategory === "All"
      ? pois
      : pois.filter((p) => p.category === selectedCategory);

  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    activeRegionData.lng - 0.1
  },${activeRegionData.lat - 0.05},${activeRegionData.lng + 0.1},${
    activeRegionData.lat + 0.05
  }&layer=mapnik&marker=${activeRegionData.lat},${activeRegionData.lng}`;

  const show3DTiles = settings.enable_3d_tiles && viewMode === "3d-tiles";
  const showGaussianSplat = settings.enable_gaussian_splat && viewMode === "gaussian-splat";

  return (
    <div className="min-h-screen bg-ocean-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-white">Regional Intelligence</h1>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
              Beta
            </span>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              Cesium 1.139
            </span>
          </div>
          <p className="text-ink-400">
            Caribbean geospatial platform — interactive 3D mapping, gaussian splatting, and real-time POI data for St. Kitts & Nevis.
          </p>
        </div>

        {/* Coming Soon Banner */}
        <div className="mb-6 p-5 rounded-2xl bg-gradient-to-r from-cyan-900/20 via-emerald-900/10 to-cyan-900/20 border border-cyan-800/30">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white mb-1">3D Gaussian Splatting + 3D Tiles Integration</h3>
              <p className="text-xs text-ink-400 mb-3">
                Using CesiumJS 1.139 with KHR_gaussian_splatting_spz_2 + SPZ 4.0 compression (Niantic/Khronos standard).
                Cesium Ion direct PLY/SPZ upload now supported for automatic 3D Tiles generation with LOD.
                Skyfall-GS satellite-to-3D pipeline and Scaniverse on-device capture for St. Kitts locations in progress.
              </p>
              <div className="flex gap-3">
                <a href="/contact" className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-surface-1 text-xs font-semibold rounded-lg transition-colors">
                  Join Beta
                </a>
                <a href="https://github.com/211skilli211" target="_blank" className="px-4 py-2 border border-ink-700 hover:border-ink-600 text-white text-xs font-medium rounded-lg transition-colors">
                  Contribute on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Region Selector */}
        <div className="flex gap-3 mb-4 overflow-x-auto pb-2">
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => setActiveRegion(region.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeRegion === region.id
                  ? "bg-cyan-500 text-surface-1"
                  : "bg-surface-1 border border-surface-2 text-ink-400 hover:text-white hover:border-ink-700"
              }`}
            >
              {region.name}
            </button>
          ))}
        </div>

        {/* View Mode Tabs */}
        <div className="flex gap-2 mb-4">
          {(
            [
              { id: "2d", label: "2D Map", icon: "🗺️" },
              { id: "3d-tiles", label: "3D Tiles (Cesium)", icon: "🌍" },
              { id: "gaussian-splat", label: "Gaussian Splat", icon: "✨" },
            ] as const
          ).map((tab) => {
            const disabled =
              (tab.id === "3d-tiles" && !settings.enable_3d_tiles) ||
              (tab.id === "gaussian-splat" && !settings.enable_gaussian_splat);
            return (
              <button
                key={tab.id}
                onClick={() => !disabled && setViewMode(tab.id)}
                disabled={disabled}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                  viewMode === tab.id
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                    : disabled
                    ? "bg-surface-1/50 text-ink-600 border border-surface-2 cursor-not-allowed"
                    : "bg-surface-1 text-ink-400 border border-surface-2 hover:text-white hover:border-ink-700"
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
                {disabled && (
                  <span className="text-[10px] text-ink-600 ml-1">Off</span>
                )}
              </button>
            );
          })}
          <div className="flex-1" />
          <a
            href="https://www.openstreetmap.org"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl text-sm font-medium bg-surface-2 border border-ink-700 text-ink-400 hover:text-white transition-all whitespace-nowrap"
          >
            OpenStreetMap ↗
          </a>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Map / 3D View */}
          <div className="lg:col-span-2 space-y-4">
            {/* 2D Map */}
            {viewMode === "2d" && (
              <div className="rounded-2xl overflow-hidden border border-surface-2 bg-surface-1">
                <div className="relative">
                  <div className="aspect-[16/10]">
                    <iframe
                      src={mapUrl}
                      title="Caribbean Map"
                      className="w-full h-full border-0"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute top-3 left-3 px-3 py-1.5 bg-surface-1/90 backdrop-blur rounded-lg border border-ink-700">
                    <span className="text-xs text-ink-300">
                      OpenStreetMap — {activeRegionData.name}
                    </span>
                  </div>
                </div>
                <div className="p-3 border-t border-surface-2 flex items-center justify-between">
                  <p className="text-xs text-ink-400">
                    {activeRegionData.lat.toFixed(4)}, {activeRegionData.lng.toFixed(4)}
                  </p>
                  <a
                    href={`https://www.openstreetmap.org/?mlat=${activeRegionData.lat}&mlon=${activeRegionData.lng}#map=12/${activeRegionData.lat}/${activeRegionData.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    Open full map ↗
                  </a>
                </div>
              </div>
            )}

            {/* 3D Tiles (Cesium) */}
            {show3DTiles && settingsLoaded && (
              <div className="rounded-2xl overflow-hidden border border-surface-2 bg-surface-1">
                <CesiumGaussianSplat
                  ionAssetId={settings.cesium_ion_asset_id || undefined}
                  tilesetUrl={settings.splat_ply_url || undefined}
                  spzUrl={settings.spz_url || undefined}
                  longitude={activeRegionData.lng}
                  latitude={activeRegionData.lat}
                  height={settings.splat_camera_height}
                  containerHeight="520px"
                  scene={activeRegion as any}
                />
                <div className="p-3 border-t border-surface-2 flex items-center justify-between">
                  <p className="text-xs text-ink-400">
                    {settings.cesium_ion_asset_id
                      ? `Cesium Ion Asset #${settings.cesium_ion_asset_id}`
                      : settings.splat_ply_url
                      ? "Self-hosted tileset"
                      : "No tileset configured — terrain only"}
                  </p>
                  <span className="text-xs text-cyan-400">CesiumJS 1.133 · 3D Tiles</span>
                </div>
              </div>
            )}

            {/* Gaussian Splat (R3F) */}
            {showGaussianSplat && settingsLoaded && (
              <div className="rounded-2xl overflow-hidden border border-surface-2 bg-surface-1">
                {settings.splat_ply_url ? (
                  <GaussianSplatViewer
                    src={settings.splat_ply_url}
                    height="520px"
                    autoRotate
                    autoRotateSpeed={0.3}
                    backgroundColor="#0A1628"
                  />
                ) : (
                  <div className="h-[520px] flex items-center justify-center bg-surface-0">
                    <div className="text-center">
                      <div className="text-4xl mb-3">✨</div>
                      <p className="text-sm text-ink-400">No splat file configured</p>
                      <p className="text-xs text-ink-600 mt-1">
                        Add a .PLY URL in admin settings
                      </p>
                    </div>
                  </div>
                )}
                <div className="p-3 border-t border-surface-2 flex items-center justify-between">
                  <p className="text-xs text-ink-400">
                    {settings.splat_ply_url ? "3D Gaussian Splatting (PLY)" : "Awaiting splat data"}
                  </p>
                  <span className="text-xs text-cyan-400">R3F + Three.js</span>
                </div>
              </div>
            )}

            {/* No 3D enabled message */}
            {viewMode !== "2d" && !show3DTiles && !showGaussianSplat && (
              <div className="h-[520px] rounded-2xl border border-surface-2 bg-surface-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-3">🔒</div>
                  <p className="text-sm text-ink-400">3D view disabled</p>
                  <p className="text-xs text-ink-600 mt-1">
                    Enable in admin or contact IBT for access
                  </p>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3">
              <div className="bg-surface-1 border border-surface-2 rounded-xl p-4 text-center">
                <div className="text-xl font-bold text-cyan-400">{pois.length}</div>
                <div className="text-[10px] text-ink-500 mt-0.5">Points of Interest</div>
              </div>
              <div className="bg-surface-1 border border-surface-2 rounded-xl p-4 text-center">
                <div className="text-xl font-bold text-emerald-400">2</div>
                <div className="text-[10px] text-ink-500 mt-0.5">Islands</div>
              </div>
              <div className="bg-surface-1 border border-surface-2 rounded-xl p-4 text-center">
                <div className="text-xl font-bold text-amber-400">{categories.length - 1}</div>
                <div className="text-[10px] text-ink-500 mt-0.5">Categories</div>
              </div>
              <div className="bg-surface-1 border border-surface-2 rounded-xl p-4 text-center">
                <div className="text-xl font-bold text-violet-400">3D</div>
                <div className="text-[10px] text-ink-500 mt-0.5">GS + Tiles</div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Category Filter */}
            <div className="bg-surface-1 border border-surface-2 rounded-xl p-4">
              <h3 className="font-semibold text-white mb-3">Filter by Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      selectedCategory === cat
                        ? "bg-cyan-500 text-surface-1"
                        : "bg-surface-2 text-ink-400 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* POI List */}
            <div className="bg-surface-1 border border-surface-2 rounded-xl p-4">
              <h3 className="font-semibold text-white mb-3">Points of Interest</h3>
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {filteredPOIs.map((poi) => (
                  <div
                    key={poi.id}
                    className="p-3 rounded-xl bg-surface-2/50 border border-ink-700/50"
                  >
                    <p className="text-sm text-white font-medium">{poi.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-ink-500">{poi.category}</span>
                      <span className="w-1 h-1 rounded-full bg-ink-600" />
                      <span className="text-xs text-ink-500">{poi.island}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Info */}
            <div className="bg-surface-1/50 border border-surface-2 rounded-xl p-4">
              <h3 className="font-medium text-white mb-2 text-sm">Tech Stack</h3>
              <div className="space-y-2 text-xs text-ink-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  CesiumJS 1.139 + 3D Tiles 2.0
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  KHR_gaussian_splatting_spz_2 (glTF)
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  SPZ 4.0 compression (Niantic/Khronos)
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-violet-400" />
                  Three.js + React Three Fiber
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-pink-400" />
                  Skyfall-GS satellite pipeline
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  TAK 4.4 CoT integration
                </div>
              </div>
            </div>

            {/* Developer CTA */}
            <div className="bg-surface-1/50 border border-surface-2 rounded-xl p-4">
              <h3 className="font-medium text-white mb-2 text-sm">For Developers</h3>
              <p className="text-xs text-ink-400 mb-3">
                Geospatial APIs for POI data, routing, 3D tiles, and gaussian splat streaming — coming in 2026.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-medium"
              >
                Request API Access →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
