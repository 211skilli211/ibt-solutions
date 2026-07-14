"use client";

import { useState, useEffect, useCallback, useRef, type ChangeEvent, type KeyboardEvent } from "react";
import dynamic from "next/dynamic";
import type { MapLayerConfig, MapMarker } from "@/components/MapLibreMap";
import type { Building } from "@/components/PortDetail";

// ─── Client-only dynamic imports ─────────────────────────────────────────────

const MapLibreMap = dynamic(() => import("@/components/MapLibreMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-surface-0 rounded-2xl">
      <div className="text-center">
        <div className="w-10 h-10 mx-auto mb-3 border-3 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
        <p className="text-xs text-ink-500">Loading map…</p>
      </div>
    </div>
  ),
});

const PortDetail = dynamic(() => import("@/components/PortDetail"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-surface-0 rounded-2xl">
      <div className="text-center">
        <div className="w-10 h-10 mx-auto mb-3 border-3 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
        <p className="text-xs text-ink-500">Loading 3D port…</p>
      </div>
    </div>
  ),
});

// ─── Types ───────────────────────────────────────────────────────────────────

interface POI {
  id: number;
  name: string;
  description: string;
  lat: number;
  lng: number;
  category: string;
  island: string;
  images: string[];
}

interface MarineCondition {
  id: number;
  location_id: number;
  location_name: string;
  coordinates: { lat: number; lng: number } | null;
  water_temp: string;
  wave_height: string;
  visibility: string;
  wind_speed: string;
  safety_flag: string;
  recorded_at: string;
}

// ─── Region Data ─────────────────────────────────────────────────────────────

const REGIONS = [
  { id: "st-kitts", name: "St. Kitts", lat: 17.3578, lng: -62.7830, zoom: 12, island: "St. Kitts" },
  { id: "nevis", name: "Nevis", lat: 17.1539, lng: -62.5833, zoom: 12, island: "Nevis" },
  { id: "caribbean", name: "Caribbean Overview", lat: 18.2208, lng: -66.5901, zoom: 7, island: undefined },
  { id: "antigua", name: "Antigua & Barbuda", lat: 17.0744, lng: -61.8175, zoom: 10, island: "Antigua" },
  { id: "barbados", name: "Barbados", lat: 13.1907, lng: -59.5572, zoom: 11, island: "Barbados" },
  { id: "trinidad-tobago", name: "Trinidad & Tobago", lat: 10.69, lng: -61.22, zoom: 9, island: "Trinidad" },
  { id: "jamaica", name: "Jamaica", lat: 18.11, lng: -77.30, zoom: 9, island: "Jamaica" },
  { id: "bahamas", name: "Bahamas", lat: 25.06, lng: -77.34, zoom: 9, island: "Bahamas" },
];

const CATEGORIES = ["All", "Beach", "Historic", "Town", "Restaurant", "Hotel", "Marina", "Port", "Agricultural"];

// ─── Safety Flag Colors ───────────────────────────────────────────────────────

const SAFETY_COLORS: Record<string, string> = {
  green: "oklch(0.75 0.15 145)",
  yellow: "oklch(0.80 0.15 80)",
  red: "oklch(0.65 0.20 25)",
  orange: "oklch(0.72 0.18 50)",
};

// ─── POI List Content ────────────────────────────────────────────────────────

function renderPOILoading() {
  return (
    <div className="text-center py-4">
      <div className="w-6 h-6 mx-auto border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
      <p className="text-xs text-ink-500 mt-2">Loading…</p>
    </div>
  );
}

function renderPOIEmpty() {
  return <p className="text-xs text-ink-500 text-center py-4">No POIs found</p>;
}

function renderPOIList(
  pois: POI[],
  onFlyTo: (lat: number, lng: number) => void
) {
  return pois.map((poi: POI) => (
    <div
      key={poi.id}
      className="p-3 rounded-xl bg-surface-2/50 border border-ink-700/50 hover:border-cyan-500/30 transition-colors cursor-pointer"
      onClick={() => onFlyTo(poi.lat, poi.lng)}
    >
      <p className="text-sm text-white font-medium">{poi.name}</p>
      <div className="flex items-center gap-2 mt-0.5">
        <span className="text-xs text-ink-500">{poi.category}</span>
        <span className="w-1 h-1 rounded-full bg-ink-600" />
        <span className="text-xs text-ink-500">{poi.island}</span>
      </div>
    </div>
  ));
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function GeospatialPage() {
  const [activeRegion, setActiveRegion] = useState("st-kitts");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"2d-satellite" | "2d-map" | "3d-tiles" | "3d-port">("2d-satellite");
  const [pois, setPois] = useState<POI[]>([]);
  const [marineConditions, setMarineConditions] = useState<MarineCondition[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPortId, setSelectedPortId] = useState<string | null>(null);
  const [portBuildings, setPortBuildings] = useState<Building[]>([]);
  const [portVesselCount, setPortVesselCount] = useState<number | undefined>(undefined);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [farmPlots, setFarmPlots] = useState<any[]>([]);
  const drawerRef = useRef<HTMLDivElement>(null);

  const activeRegionData = REGIONS.find((r) => r.id === activeRegion) || REGIONS[0];

  // Close drawer on outside click (mobile)
  useEffect(() => {
    if (!drawerOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setDrawerOpen(false);
      }
    }
    function handleEsc(this: Document, e: globalThis.KeyboardEvent) {
      if (e.key === "Escape") setDrawerOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [drawerOpen]);

  // Lock body scroll when drawer is open on mobile
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  // Fetch POIs from DB
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (activeRegion !== "caribbean") {
      const region = REGIONS.find((r) => r.id === activeRegion);
      if (region?.island) params.set("island", region.island);
    }
    if (selectedCategory !== "All") params.set("category", selectedCategory);

    fetch(`/api/services/poi?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setPois((data.pois as POI[]) || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [activeRegion, selectedCategory]);

  // Fetch marine conditions
  useEffect(() => {
    const params = new URLSearchParams();
    const region = REGIONS.find((r) => r.id === activeRegion);
    if (region) {
      params.set("lat", String(region.lat));
      params.set("lng", String(region.lng));
      params.set("radius", "50");
    }

    fetch(`/api/services/marine?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setMarineConditions((data.conditions as MarineCondition[]) || []);
      })
      .catch(() => {});
  }, [activeRegion]);

  // Fetch agricultural plots
  useEffect(() => {
    if (selectedCategory !== "Agricultural" && selectedCategory !== "All") {
      setFarmPlots([]);
      return;
    }
    const region = REGIONS.find((r) => r.id === activeRegion);
    if (!region) return;
    fetch(`/api/geospatial/farm-plots?island=${region.island || ""}&limit=50`)
      .then((r) => r.json())
      .then((data) => {
        if (data.features) setFarmPlots(data.features);
      })
      .catch(() => setFarmPlots([]));
  }, [activeRegion, selectedCategory]);

  // Convert POIs to markers
  const markers = pois.map((poi: POI) => ({
    id: String(poi.id),
    name: poi.name,
    lat: poi.lat,
    lng: poi.lng,
    category: poi.category,
    island: poi.island,
    description: poi.description,
  }));

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) return;
    const res = await fetch(
      `/api/services/poi?lat=${activeRegionData.lat}&lng=${activeRegionData.lng}&radius=100`
    );
    const data = await res.json();
    if (data.success) {
      const filtered = (data.pois as POI[]).filter(
        (p: POI) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      );
      setPois(filtered);
    }
  }, [activeRegionData]);

  // Handler for POI click -> fly to location
  const handleFlyTo = useCallback((lat: number, lng: number) => {
    window.dispatchEvent(
      new CustomEvent("map-fly-to", { detail: { lat, lng } })
    );
  }, []);

  // Layer config
  const layers: MapLayerConfig[] = [
    { id: "pois", name: "Points of Interest", type: "marker", visible: true, source: "db" },
    { id: "marine", name: "Marine Conditions", type: "circle", visible: true, source: "db" },
    { id: "farm-plots", name: "Agricultural Plots", type: "fill", visible: selectedCategory === "Agricultural" || selectedCategory === "All", source: "db" },
    { id: "weather", name: "Weather Overlay", type: "fill", visible: false, source: "api" },
  ];

  // POI content (extracted to avoid ternary nesting issues)
  const poiContent = loading
    ? renderPOILoading()
    : pois.length === 0
    ? renderPOIEmpty()
    : renderPOIList(pois, handleFlyTo);

  return (
    <div className="min-h-screen bg-ocean-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-white">Regional Intelligence</h1>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              Live Data
            </span>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              MapLibre GL
            </span>
          </div>
          <p className="text-ink-400">
            Caribbean geospatial platform — interactive mapping, marine conditions, and real-time POI data.
          </p>
        </div>

        {/* Region Selector */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {REGIONS.map((region) => (
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

        {/* View Mode + Category Filter */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {(["2d-satellite", "2d-map", "3d-tiles", "3d-port"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                viewMode === mode
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  : "bg-surface-1 text-ink-400 border border-surface-2 hover:text-white hover:border-ink-700"
              }`}
            >
              {mode === "2d-satellite" && "🛰️ Satellite"}
              {mode === "2d-map" && "🗺️ Map"}
              {mode === "3d-tiles" && "🌍 3D Tiles"}
              {mode === "3d-port" && "🏗️ 3D Port"}
            </button>
          ))}

          <div className="w-px h-6 bg-surface-2 mx-1" />

          {/* Category Filter */}
          <div className="flex flex-wrap gap-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
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

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-5 relative">
          {/* Mobile Toggle Button (hamburger) */}
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="md:hidden fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-cyan-500 text-surface-1 shadow-lg shadow-cyan-500/30 flex items-center justify-center hover:bg-cyan-400 active:scale-95 transition-all"
            aria-label={drawerOpen ? "Close sidebar" : "Open sidebar"}
          >
            {drawerOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Map View — full width on mobile when drawer is closed */}
          <div className="w-full md:flex-1 space-y-4 min-w-0">
            {(viewMode === "2d-satellite" || viewMode === "2d-map") && (
              <div className="rounded-2xl overflow-hidden border border-surface-2 bg-surface-1">
                <MapLibreMap
                  center={[activeRegionData.lng, activeRegionData.lat]}
                  zoom={activeRegionData.zoom}
                  style={viewMode === "2d-satellite" ? "satellite" : "dark"}
                  markers={markers}
                  farmPlots={farmPlots}
                  showControls
                  showSearch
                  showLayerPanel
                  height="520px"
                  layers={layers}
                  onMarkerClick={(marker: MapMarker) => {
                    console.log("Marker clicked:", marker);
                  }}
                />
                <div className="p-3 border-t border-surface-2 flex items-center justify-between">
                  <p className="text-xs text-ink-400">
                    {pois.length} POIs • {marineConditions.length} marine stations • {farmPlots.length} farm plots
                  </p>
                  <span className="text-xs text-cyan-400">
                    MapLibre GL • Esri Satellite • OSM Labels
                  </span>
                </div>
              </div>
            )}

            {viewMode === "3d-tiles" && (
              <div className="rounded-2xl overflow-hidden border border-surface-2 bg-surface-1 p-8 h-[560px] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-4">🌍</div>
                  <h3 className="text-white font-semibold mb-2">3D Tiles</h3>
                  <p className="text-sm text-ink-400 max-w-sm">
                    Cesium 3D Tiles + Gaussian Splat rendering requires a configured Cesium Ion asset.
                    Upload a .PLY or .SPZ file in admin settings to enable.
                  </p>
                </div>
              </div>
            )}

            {viewMode === "3d-port" && (
              <div className="rounded-2xl overflow-hidden border border-surface-2 bg-surface-1">
                <PortDetail
                  portId={selectedPortId || "st-kitts"}
                  portName={activeRegionData.name}
                  centerLat={activeRegionData.lat}
                  centerLng={activeRegionData.lng}
                  buildings={portBuildings}
                  harborDepth={12}
                  vesselCount={portVesselCount}
                  height="520px"
                />
                <div className="p-3 border-t border-surface-2 flex items-center justify-between">
                  <p className="text-xs text-ink-400">
                    {portBuildings.length} buildings · R3F Extrusion
                  </p>
                  <span className="text-xs text-cyan-400">
                    React Three Fiber · Three.js
                  </span>
                </div>
              </div>
            )}

            {/* Marine Conditions Summary */}
            {marineConditions.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {marineConditions.slice(0, 4).map((mc: MarineCondition) => (
                  <div
                    key={mc.id}
                    className="bg-surface-1 border border-surface-2 rounded-xl p-3"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: SAFETY_COLORS[mc.safety_flag] || SAFETY_COLORS.green,
                        }}
                      />
                      <span className="text-xs text-ink-400 truncate">{mc.location_name}</span>
                    </div>
                    <div className="text-lg font-bold text-white">
                      {mc.water_temp || "—"}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-ink-500">
                      <span>🌊 {mc.wave_height || "—"}</span>
                      <span>💨 {mc.wind_speed || "—"}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Overlay Backdrop */}
          {drawerOpen && (
            <div
              className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
            />
          )}

          {/* Sidebar — overlay drawer on mobile, static panel on desktop */}
          <div
            ref={drawerRef}
            className={`
              fixed inset-y-0 right-0 z-50 w-[85%] max-w-sm
              bg-surface-elevated/95 border-l border-white/10
              transform transition-transform duration-300 ease-in-out
              md:relative md:inset-auto md:z-auto md:w-80 md:max-w-none md:flex-shrink-0
              md:transform-none md:bg-transparent md:border-l-0
              ${drawerOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
              overflow-y-auto
            `}
          >
            {/* Mobile Drawer Header */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-sm font-semibold text-white">Controls</h2>
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-8 h-8 rounded-lg bg-surface-2 flex items-center justify-center text-ink-400 hover:text-white"
                aria-label="Close drawer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4 md:p-0 space-y-4">
            {/* Search */}
            <div className="bg-surface-1 border border-surface-2 rounded-xl p-4">
              <h3 className="font-semibold text-white mb-3">Search Locations</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleSearch(searchQuery)}
                  placeholder="Beaches, restaurants..."
                  className="flex-1 px-3 py-2 bg-surface-2 border border-ink-700 rounded-lg text-sm text-white placeholder:text-ink-600 focus:outline-none focus:border-cyan-500/50"
                />
                <button
                  onClick={() => handleSearch(searchQuery)}
                  className="px-3 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-cyan-400 text-sm hover:bg-cyan-500/30"
                >
                  🔍
                </button>
              </div>
            </div>

            {/* POI List */}
            <div className="bg-surface-1 border border-surface-2 rounded-xl p-4">
              <h3 className="font-semibold text-white mb-3">
                Points of Interest
                <span className="text-xs text-ink-500 ml-2">({pois.length})</span>
              </h3>
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {poiContent}
              </div>
            </div>

            {/* Marine Safety Legend */}
            <div className="bg-surface-1 border border-surface-2 rounded-xl p-4">
              <h3 className="font-medium text-white mb-2 text-sm">Safety Flags</h3>
              <div className="space-y-1.5">
                {[
                  { color: "oklch(0.75 0.15 145)", label: "Green — Safe conditions" },
                  { color: "oklch(0.80 0.15 80)", label: "Yellow — Caution advised" },
                  { color: "oklch(0.72 0.18 50)", label: "Orange — Exercise caution" },
                  { color: "oklch(0.65 0.20 25)", label: "Red — Avoid, unsafe" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-xs text-ink-400">
                    <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Data Sources */}
            <div className="bg-surface-1/50 border border-surface-2 rounded-xl p-4">
              <h3 className="font-medium text-white mb-2 text-sm">Data Sources</h3>
              <div className="space-y-1.5 text-xs text-ink-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  POIs from Neon DB (ibt_pois)
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Marine conditions (ibt_marine_conditions)
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Weather cache (ibt_weather_cache)
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-violet-400" />
                  Satellite imagery (Esri)
                </div>
              </div>
            </div>
            </div>{/* end sidebar inner wrapper */}
          </div>{/* end sidebar */}
        </div>
      </div>
    </div>
  );
}
