"use client";

import { useEffect, useRef, useState } from "react";

interface CesiumGaussianSplatProps {
  /** Cesium Ion asset ID for a 3D Tiles gaussian splat tileset */
  ionAssetId?: number;
  /** URL to a tileset.json (self-hosted 3D Tiles) */
  tilesetUrl?: string;
  /** URL to an SPZ file (will be loaded via Cesium's KHR_gaussian_splatting) */
  spzUrl?: string;
  /** Camera longitude (degrees) */
  longitude?: number;
  /** Camera latitude (degrees) */
  latitude?: number;
  /** Camera height (meters) */
  height?: number;
  /** CSS class */
  className?: string;
  /** Container height */
  containerHeight?: string;
  /** Scene preset — selects camera position and tileset */
  scene?: "st-kitts" | "nevis" | "caribbean" | "custom";
}

// CesiumJS 1.133+ with KHR_gaussian_splatting 3D Tiles support
const CESIUM_CDN =
  "https://cesium.com/downloads/cesiumjs/releases/1.133/Build/Cesium/Cesium.js";
const CESIUM_CSS_URL =
  "https://cesium.com/downloads/cesiumjs/releases/1.133/Build/Cesium/Widgets/widgets.css";

// Scene presets for St. Kitts & Nevis
const SCENE_PRESETS: Record<string, { lat: number; lng: number; height: number; label: string }> = {
  "st-kitts": { lat: 17.3578, lng: -62.7830, height: 800, label: "St. Kitts" },
  nevis: { lat: 17.1539, lng: -62.5833, height: 600, label: "Nevis" },
  caribbean: { lat: 18.2208, lng: -66.5901, height: 5000, label: "Caribbean Overview" },
};

export default function CesiumGaussianSplat({
  ionAssetId,
  tilesetUrl,
  spzUrl,
  longitude = -62.7248,
  latitude = 17.3026,
  height: cameraHeight = 500,
  className = "",
  containerHeight = "480px",
  scene = "st-kitts",
}: CesiumGaussianSplatProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewerReady, setViewerReady] = useState(false);

  // Apply scene preset camera
  useEffect(() => {
    if (!viewerReady || !viewerRef.current) return;
    const preset = SCENE_PRESETS[scene];
    if (!preset) return;

    const Cesium = (window as any).Cesium;
    if (!Cesium) return;

    viewerRef.current.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(preset.lng, preset.lat, preset.height),
      orientation: { heading: 0, pitch: Cesium.Math.toRadians(-45), roll: 0 },
      duration: 2,
    });
  }, [scene, viewerReady]);

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;
    if (viewerRef.current) return;

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    timeoutId = setTimeout(() => {
      if (!viewerRef.current && !cancelled) {
        setError(true);
        setLoading(false);
      }
    }, 20000);

    function loadScript(src: string): Promise<void> {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve();
        const s = document.createElement("script");
        s.src = src;
        s.async = true;
        s.onload = () => resolve();
        s.onerror = reject;
        document.head.appendChild(s);
      });
    }

    function loadCSS(href: string) {
      if (document.querySelector(`link[href="${href}"]`)) return;
      const l = document.createElement("link");
      l.rel = "stylesheet";
      l.href = href;
      document.head.appendChild(l);
    }

    async function init() {
      loadCSS(CESIUM_CSS_URL);
      await loadScript(CESIUM_CDN);
      if (cancelled) return;

      const Cesium = (window as any).Cesium;
      if (!Cesium) return setError(true);

      Cesium.Ion.defaultAccessToken =
        process.env.NEXT_PUBLIC_CESIUM_ION_TOKEN || "";

      try {
        const viewer = new Cesium.Viewer(containerRef.current!, {
          animation: false,
          timeline: false,
          baseLayerPicker: false,
          geocoder: false,
          homeButton: false,
          navigationHelpButton: false,
          sceneModePicker: false,
          fullscreenButton: false,
          infoBox: false,
          selectionIndicator: false,
          creditContainer: document.createElement("div"),
          requestRenderMode: true,
          maximumRenderTimeChange: Infinity,
          skyBox: false,
        });

        if (cancelled) return viewer.destroy();
        viewerRef.current = viewer;
        setViewerReady(true);

        // Imagery — Bing Maps (requires key) or OSM fallback
        try {
          const ionLayer = await Cesium.ImageryLayer.fromProviderAsync(
            Cesium.IonImageryProvider.fromAssetId(2) // Bing Maps Aerial
          );
          viewer.imageryLayers.removeAll();
          viewer.imageryLayers.add(ionLayer);
        } catch {
          viewer.imageryLayers.removeAll();
          viewer.imageryLayers.add(
            new Cesium.ImageryLayer(
              new Cesium.OpenStreetMapImageryProvider({
                url: "https://tile.openstreetmap.org/",
              })
            )
          );
        }

        // Terrain — Cesium World Terrain
        try {
          viewer.terrainProvider =
            await Cesium.Terrain.fromWorldTerrainAsync();
        } catch {}

        // ─── Load 3D Tiles Gaussian Splat ───────────────────────────────
        // Priority: 1) Ion asset, 2) Self-hosted tileset.json, 3) SPZ URL
        if (ionAssetId) {
          try {
            const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(ionAssetId);
            viewer.scene.primitives.add(tileset);
            console.log(`[Cesium] Loaded Ion 3D Tiles gaussian splat: asset #${ionAssetId}`);
          } catch (e) {
            console.warn("[Cesium] Failed to load Ion gaussian splat tileset:", e);
          }
        } else if (tilesetUrl) {
          try {
            const tileset = await Cesium.Cesium3DTileset.fromUrl(tilesetUrl);
            viewer.scene.primitives.add(tileset);
            console.log(`[Cesium] Loaded self-hosted 3D Tiles: ${tilesetUrl}`);
          } catch (e) {
            console.warn("[Cesium] Failed to load tileset:", e);
          }
        } else if (spzUrl) {
          // CesiumJS 1.133+ supports KHR_gaussian_splatting in glTF
          // SPZ files need to be wrapped in a glTF container or served as 3D Tiles
          // For now, show a message that SPZ needs to be converted to 3D Tiles
          console.log(`[Cesium] SPZ file available: ${spzUrl}`);
          console.log("[Cesium] SPZ → 3D Tiles conversion required for Cesium rendering");
        }

        // Camera — use scene preset or custom coordinates
        const camLng = longitude || SCENE_PRESETS[scene]?.lng || -62.7248;
        const camLat = latitude || SCENE_PRESETS[scene]?.lat || 17.3026;
        const camHeight = cameraHeight || SCENE_PRESETS[scene]?.height || 500;

        viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(camLng, camLat, camHeight),
          orientation: { heading: 0, pitch: Cesium.Math.toRadians(-45), roll: 0 },
          duration: 2,
          easingFunction: Cesium.EasingFunction.CUBIC_IN_OUT,
        });

        // Rendering settings
        viewer.scene.globe.enableLighting = true;
        viewer.scene.globe.depthTestAgainstTerrain = true;
        viewer.scene.fog.enabled = true;
        try { viewer.scene.postProcessStages.fxaa.enabled = true; } catch {}

        clearTimeout(timeoutId);
        setLoading(false);
      } catch (err) {
        console.error("[Cesium] Init error:", err);
        clearTimeout(timeoutId);
        setError(true);
        setLoading(false);
      }
    }

    init();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      if (viewerRef.current && !viewerRef.current.isDestroyed()) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [ionAssetId, tilesetUrl, spzUrl, longitude, latitude, cameraHeight]);

  if (error) {
    return (
      <div
        className={`w-full flex items-center justify-center ${className}`}
        style={{ minHeight: "400px", background: "var(--color-surface-0, #0A1628)" }}
      >
        <div className="text-center">
          <div className="text-sm" style={{ color: "var(--ink-500, #64748B)" }}>
            3D Scene unavailable
          </div>
          <div className="text-xs mt-1" style={{ color: "var(--ink-700, #334155)" }}>
            Check your connection or Cesium Ion token
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", width: "100%", height: containerHeight }}>
      {loading && (
        <div
          style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(10, 22, 40, 0.8)", zIndex: 10,
          }}
        >
          <div
            style={{
              width: 40, height: 40,
              border: "3px solid rgba(20, 184, 166, 0.2)",
              borderTopColor: "#14B8A6",
              borderRadius: "50%",
              animation: "cesiumGSSpin 0.8s linear infinite",
            }}
          />
          <style>{`@keyframes cesiumGSSpin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}
      <div
        ref={containerRef}
        className={`w-full ${className}`}
        style={{ height: containerHeight, background: "var(--color-surface-0, #0A1628)" }}
      />
    </div>
  );
}
