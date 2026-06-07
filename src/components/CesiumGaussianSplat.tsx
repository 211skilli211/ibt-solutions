"use client";

import { useEffect, useRef, useState } from "react";

interface CesiumGaussianSplatProps {
  /** Cesium Ion asset ID for a 3D Tiles gaussian splat tileset */
  ionAssetId?: number;
  /** URL to a tileset.json (self-hosted 3D Tiles) */
  tilesetUrl?: string;
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
}

// CesiumJS 1.133+ with 3D Tiles gaussian splat support
const CESIUM_CDN =
  "https://cesium.com/downloads/cesiumjs/releases/1.133/Build/Cesium/Cesium.js";
const CESIUM_CSS_URL =
  "https://cesium.com/downloads/cesiumjs/releases/1.133/Build/Cesium/Widgets/widgets.css";

export default function CesiumGaussianSplat({
  ionAssetId,
  tilesetUrl,
  longitude = -62.7248,
  latitude = 17.3026,
  height: cameraHeight = 500,
  className = "",
  containerHeight = "480px",
}: CesiumGaussianSplatProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

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

        // Imagery
        try {
          const ionLayer = await Cesium.ImageryLayer.fromProviderAsync(
            Cesium.IonImageryProvider.fromAssetId(2)
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

        // Terrain
        try {
          viewer.terrainProvider =
            await Cesium.Terrain.fromWorldTerrainAsync();
        } catch {}

        // Load gaussian splat tileset
        if (ionAssetId) {
          try {
            const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(
              ionAssetId
            );
            viewer.scene.primitives.add(tileset);
          } catch (e) {
            console.warn("Failed to load Ion gaussian splat tileset:", e);
          }
        } else if (tilesetUrl) {
          try {
            const tileset = await Cesium.Cesium3DTileset.fromUrl(tilesetUrl);
            viewer.scene.primitives.add(tileset);
          } catch (e) {
            console.warn("Failed to load gaussian splat tileset:", e);
          }
        }

        // Camera
        viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(
            longitude,
            latitude,
            cameraHeight
          ),
          orientation: {
            heading: 0,
            pitch: Cesium.Math.toRadians(-45),
            roll: 0,
          },
          duration: 2,
          easingFunction: Cesium.EasingFunction.CUBIC_IN_OUT,
        });

        // Rendering
        viewer.scene.globe.enableLighting = true;
        viewer.scene.globe.depthTestAgainstTerrain = true;
        viewer.scene.fog.enabled = true;
        try {
          viewer.scene.postProcessStages.fxaa.enabled = true;
        } catch {}

        clearTimeout(timeoutId);
        setLoading(false);
      } catch (err) {
        console.error("Cesium gaussian splat init error:", err);
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
  }, [ionAssetId, tilesetUrl, longitude, latitude, cameraHeight]);

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
            Check your connection
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
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(10, 22, 40, 0.8)",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              border: "3px solid rgba(20, 184, 166, 0.2)",
              borderTopColor: "#14B8A6",
              borderRadius: "50%",
              animation: "cesiumGSSpin 0.8s linear infinite",
            }}
          />
          <style>{`
            @keyframes cesiumGSSpin {
              to { transform: rotate(360deg); }
            }
          `}</style>
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
