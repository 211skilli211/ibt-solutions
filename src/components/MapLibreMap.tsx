"use client";

import { useEffect, useRef, useState, useCallback, type ReactNode, type ChangeEvent, type KeyboardEvent } from "react";
import maplibregl from "maplibre-gl";
// CSS imported in layout.tsx as "./maplibre-ibt.css" for SSR safety

// GeoJSON types (avoid needing @types/geojson)
type GeoJSONFeatureCollection = {
  type: "FeatureCollection";
  features: any[];
};

// ─── Types ───────────────────────────────────────────────────────────────────

export interface MapMarker {
  id: string;
  name: string;
  lat: number;
  lng: number;
  category?: string;
  island?: string;
  description?: string;
  color?: string;
  icon?: string;
}

export interface MapLayerConfig {
  id: string;
  name: string;
  type: "marker" | "circle" | "fill" | "line" | "heatmap";
  visible: boolean;
  color?: string;
  source?: "db" | "api" | "geojson";
  data?: MapMarker[] | GeoJSONFeatureCollection;
  endpoint?: string;
  minZoom?: number;
  maxZoom?: number;
}

export interface MapViewState {
  center: [number, number];
  zoom: number;
  pitch?: number;
  bearing?: number;
}

export interface MapLibreMapProps {
  center?: [number, number];
  zoom?: number;
  style?: string;
  layers?: MapLayerConfig[];
  markers?: MapMarker[];
  farmPlots?: any[]; // GeoJSON features
  showControls?: boolean;
  showSearch?: boolean;
  showLayerPanel?: boolean;
  height?: string;
  className?: string;
  onMarkerClick?: (marker: MapMarker) => void;
  onMoveEnd?: (state: MapViewState) => void;
  children?: ReactNode;
}

// ─── Default Styles (No Token Required) ───────────────────────────────────────

const STYLE_SATELLITE = {
  version: 8 as const,
  sources: {
    "satellite-imagery": {
      type: "raster" as const,
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      attribution: "Tiles © Esri — Source: Esri, Earthstar Geographics",
      maxzoom: 19,
    },
    "osm-labels": {
      type: "raster" as const,
      tiles: [
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors",
      maxzoom: 19,
      opacity: 0.6,
    },
  },
  layers: [
    { id: "satellite", type: "raster" as const, source: "satellite-imagery" },
    { id: "labels", type: "raster" as const, source: "osm-labels" },
  ],
};

const STYLE_DARK = {
  version: 8 as const,
  sources: {
    "osm-tiles": {
      type: "raster" as const,
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "© OpenStreetMap",
      maxzoom: 19,
    },
  },
  layers: [
    { id: "osm", type: "raster" as const, source: "osm-tiles" },
  ],
};

// ─── Category Colors (OKLCH) ──────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  Beach: "oklch(0.70 0.15 80)",
  Historic: "oklch(0.65 0.10 30)",
  Town: "oklch(0.60 0.05 230)",
  Restaurant: "oklch(0.72 0.18 20)",
  Hotel: "oklch(0.68 0.12 310)",
  Marina: "oklch(0.65 0.15 200)",
  Port: "oklch(0.55 0.10 250)",
  Agricultural: "oklch(0.65 0.18 145)",
  Default: "oklch(0.70 0.12 180)",
};

const CATEGORY_ICONS: Record<string, string> = {
  Beach: "🏖️",
  Historic: "🏛️",
  Town: "🏘️",
  Restaurant: "🍽️",
  Hotel: "🏨",
  Marina: "⛵",
  Port: "🚢",
  Agricultural: "🌾",
  Default: "📍",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function MapLibreMap({
  center = [-62.78, 17.36],
  zoom = 10,
  style = "satellite",
  layers = [],
  markers = [],
  showControls = true,
  showSearch = false,
  showLayerPanel = false,
  height = "520px",
  className = "",
  onMarkerClick,
  onMoveEnd,
  children,
}: MapLibreMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [mapReady, setMapReady] = useState(false);
  const [activeLayers, setActiveLayers] = useState<Record<string, boolean>>(
    Object.fromEntries(layers.map((l) => [l.id, l.visible]))
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<MapMarker[]>([]);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const mapStyle =
      style === "satellite" ? STYLE_SATELLITE : style === "dark" ? STYLE_DARK : STYLE_SATELLITE;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: mapStyle as any,
      center,
      zoom,
      attributionControl: { compact: true },
    });

    map.on("load", () => {
      setMapReady(true);
    });

    map.on("moveend", () => {
      if (onMoveEnd) {
        onMoveEnd({
          center: [map.getCenter().lng, map.getCenter().lat],
          zoom: map.getZoom(),
          pitch: map.getPitch(),
          bearing: map.getBearing(),
        });
      }
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Render farm plots as GeoJSON layer
  useEffect(() => {
    if (!mapReady || !mapRef.current) return;
    const map = mapRef.current;

    if (!farmPlots || farmPlots.length === 0) {
      // Remove farm plots layer/source if they exist
      if (map.getLayer("farm-plots-fill")) map.removeLayer("farm-plots-fill");
      if (map.getLayer("farm-plots-outline")) map.removeLayer("farm-plots-outline");
      if (map.getSource("farm-plots")) map.removeSource("farm-plots");
      return;
    }

    const geojson: any = {
      type: "FeatureCollection",
      features: farmPlots,
    };

    // Update or add source
    const existingSource = map.getSource("farm-plots") as maplibregl.GeoJSONSource | undefined;
    if (existingSource) {
      existingSource.setData(geojson);
    } else {
      map.addSource("farm-plots", { type: "geojson", data: geojson });
      map.addLayer({
        id: "farm-plots-fill",
        type: "fill",
        source: "farm-plots",
        paint: {
          "fill-color": "oklch(0.65 0.18 145)",
          "fill-opacity": 0.3,
        },
      });
      map.addLayer({
        id: "farm-plots-outline",
        type: "line",
        source: "farm-plots",
        paint: {
          "line-color": "oklch(0.55 0.20 145)",
          "line-width": 2,
        },
      });
    }
  }, [mapReady, farmPlots]);

  // Render markers
  useEffect(() => {
    if (!mapReady || !mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach((m: maplibregl.Marker) => m.remove());
    markersRef.current = [];

    // Add markers
    markers.forEach((marker) => {
      const color = marker.color || CATEGORY_COLORS[marker.category || "Default"] || CATEGORY_COLORS.Default;
      const icon = marker.icon || CATEGORY_ICONS[marker.category || "Default"] || CATEGORY_ICONS.Default;

      const el = document.createElement("div");
      el.className = "map-marker";
      el.style.cssText = `
        width: 32px; height: 32px; border-radius: 50%;
        background: ${color}; border: 2px solid white;
        display: flex; align-items: center; justify-content: center;
        font-size: 16px; cursor: pointer;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        transition: transform 0.15s ease;
      `;
      el.innerHTML = icon;
      el.addEventListener("mouseenter", () => { el.style.transform = "scale(1.2)"; });
      el.addEventListener("mouseleave", () => { el.style.transform = "scale(1)"; });

      const popup = new maplibregl.Popup({ offset: 24, closeButton: true, maxWidth: "240px" }).setHTML(`
        <div style="font-family: system-ui; padding: 4px; min-width: 160px;">
          <div style="font-weight: 600; font-size: 13px; color: oklch(0.25 0.02 230); margin-bottom: 2px;">${marker.name}</div>
          ${marker.description ? `<div style="font-size: 11px; color: oklch(0.50 0.02 230); margin-bottom: 4px;">${marker.description}</div>` : ""}
          ${marker.category ? `<span style="font-size: 10px; padding: 2px 6px; border-radius: 4px; background: ${color}22; color: ${color};">${marker.category}</span>` : ""}
        </div>
      `);

      const m = new maplibregl.Marker({ element: el })
        .setLngLat([marker.lng, marker.lat])
        .setPopup(popup)
        .addTo(mapRef.current!);

      if (onMarkerClick) {
        el.addEventListener("click", () => onMarkerClick(marker));
      }

      markersRef.current.push(m);
    });
  }, [mapReady, markers, onMarkerClick]);

  // Toggle layers
  const toggleLayer = useCallback((layerId: string) => {
    setActiveLayers((prev: Record<string, boolean>) => ({ ...prev, [layerId]: !prev[layerId] }));
  }, []);

  // Search handler
  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;
    try {
      const res = await fetch(
        `/api/geospatial/search?q=${encodeURIComponent(searchQuery)}`
      );
      const data = await res.json();
      if (data.results) setSearchResults(data.results as MapMarker[]);
    } catch (_e) {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Fly to location
  const flyTo = useCallback((lat: number, lng: number, zoomLevel?: number) => {
    const map = mapRef.current;
    if (!map) return;
    map.flyTo({
      center: [lng, lat],
      zoom: zoomLevel || map.getZoom(),
      duration: 1500,
      essential: true,
    });
  }, []);

  return (
    <div className={`relative ${className}`} style={{ height }}>
      {/* Map Container */}
      <div ref={mapContainer} className="w-full h-full rounded-2xl overflow-hidden" />

      {/* Controls Overlay */}
      {showControls && mapReady && (
        <>
          {/* Zoom Controls */}
          <div className="absolute top-3 right-3 flex flex-col gap-1 z-10">
            <button
              onClick={() => mapRef.current?.zoomIn()}
              className="w-9 h-9 bg-surface-1/90 backdrop-blur border border-surface-2 rounded-lg flex items-center justify-center text-white hover:bg-surface-2 transition-colors"
              title="Zoom in"
            >
              +
            </button>
            <button
              onClick={() => mapRef.current?.zoomOut()}
              className="w-9 h-9 bg-surface-1/90 backdrop-blur border border-surface-2 rounded-lg flex items-center justify-center text-white hover:bg-surface-2 transition-colors"
              title="Zoom out"
            >
              −
            </button>
            <button
              onClick={() => {
                mapRef.current?.easeTo({ pitch: 0, bearing: 0, duration: 500 });
              }}
              className="w-9 h-9 bg-surface-1/90 backdrop-blur border border-surface-2 rounded-lg flex items-center justify-center text-white hover:bg-surface-2 transition-colors text-xs"
              title="Reset view"
            >
              ⟲
            </button>
          </div>

          {/* Compass / Pitch Toggle */}
          <button
            onClick={() => {
              const current = mapRef.current?.getPitch() || 0;
              mapRef.current?.easeTo({ pitch: current > 0 ? 0 : 50, duration: 500 });
            }}
            className="absolute top-3 left-3 z-10 px-3 py-1.5 bg-surface-1/90 backdrop-blur border border-surface-2 rounded-lg text-xs text-ink-300 hover:text-white transition-colors"
          >
            {style === "satellite" ? "🛰️ Satellite" : "🗺️ Map"}
          </button>
        </>
      )}

      {/* Search */}
      {showSearch && (
        <div className="absolute top-14 left-3 z-10 w-72">
          <div className="flex gap-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleSearch()}
              placeholder="Search locations..."
              className="flex-1 px-3 py-2 bg-surface-1/95 backdrop-blur border border-surface-2 rounded-lg text-sm text-white placeholder:text-ink-500 focus:outline-none focus:border-cyan-500/50"
            />
            <button
              onClick={handleSearch}
              className="px-3 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-cyan-400 text-sm hover:bg-cyan-500/30 transition-colors"
            >
              🔍
            </button>
          </div>
          {searchResults.length > 0 && (
            <div className="mt-1 bg-surface-1/95 backdrop-blur border border-surface-2 rounded-lg overflow-hidden max-h-48 overflow-y-auto">
              {searchResults.map((r: MapMarker, i: number) => (
                <button
                  key={i}
                  onClick={() => {
                    flyTo(r.lat, r.lng, 14);
                    setSearchResults([]);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-white hover:bg-surface-2/50 border-b border-surface-2/50 last:border-0"
                >
                  <div className="font-medium">{r.name}</div>
                  {r.category && (
                    <div className="text-xs text-ink-500">{r.category} • {r.island}</div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Layer Panel */}
      {showLayerPanel && layers.length > 0 && (
        <div className="absolute bottom-3 left-3 z-10 w-56 bg-surface-1/95 backdrop-blur border border-surface-2 rounded-xl p-3">
          <div className="text-xs font-medium text-ink-400 mb-2">Layers</div>
          {layers.map((layer) => (
            <label
              key={layer.id}
              className="flex items-center gap-2 py-1 cursor-pointer text-sm text-white"
            >
              <input
                type="checkbox"
                checked={activeLayers[layer.id] ?? layer.visible}
                onChange={() => toggleLayer(layer.id)}
                className="accent-cyan-500"
              />
              <span>{layer.name}</span>
            </label>
          ))}
        </div>
      )}

      {/* Children overlay */}
      {children}
    </div>
  );
}
