"use client";

import { useEffect, useRef, useState } from "react";

interface GlobeMapProps {
  className?: string;
}

const CESIUM_CDN =
  "https://cesium.com/downloads/cesiumjs/releases/1.114/Build/Cesium/Cesium.js";
const CESIUM_CSS =
  "https://cesium.com/downloads/cesiumjs/releases/1.114/Build/Cesium/Widgets/widgets.css";

export default function GlobeMap({ className = "" }: GlobeMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;
    if (viewerRef.current) return;

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    // Fail-safe: if Cesium doesn't load in 15s, show error
    timeoutId = setTimeout(() => {
      if (!viewerRef.current && !cancelled) setError(true);
    }, 15000);

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
      loadCSS(CESIUM_CSS);
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
          minimumZoomDistance: 50_000,
          maximumZoomDistance: 10_000_000,
        });

        if (cancelled) return viewer.destroy();
        viewerRef.current = viewer;

        // Imagery: try Ion Bing Aerial, fallback to OSM
        try {
          const ionLayer = await Cesium.ImageryLayer.fromProviderAsync(
            Cesium.IonImageryProvider.fromAssetId(2)
          );
          viewer.imageryLayers.removeAll();
          viewer.imageryLayers.add(ionLayer);
        } catch {
          // Fallback: OpenStreetMap
          viewer.imageryLayers.removeAll();
          viewer.imageryLayers.add(
            new Cesium.ImageryLayer(
              new Cesium.OpenStreetMapImageryProvider({
                url: "https://tile.openstreetmap.org/",
              })
            )
          );
        }

        // Terrain: try world terrain, silent fail
        try {
          viewer.terrainProvider =
            await Cesium.Terrain.fromWorldTerrainAsync();
        } catch {
          // flat globe is fine
        }

        // Rendering
        viewer.scene.globe.enableLighting = true;
        viewer.scene.globe.depthTestAgainstTerrain = true;
        try {
          viewer.scene.postProcessStages.fxaa.enabled = true;
        } catch {
          // FXAA not supported on all GPUs
        }

        // Camera controls
        const ssc = viewer.scene.screenSpaceCameraController;
        ssc.inertiaSpin = 0.9;
        ssc.inertiaTranslate = 0.9;
        ssc.inertiaZoom = 0.8;

        // Marker: St. Kitts & Nevis
        viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(-62.7248, 17.3026),
          point: {
            pixelSize: 12,
            color: Cesium.Color.fromCssColorString("#14B8A6"),
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 3,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            disableDepthTestDistance: 1_000_000,
            scaleByDistance: new Cesium.NearFarScalar(1e5, 1.4, 5e6, 0.6),
          },
          label: {
            text: "IBT — St. Kitts & Nevis",
            fontFamily: "Geist, Albert Sans, sans-serif",
            fontSize: 14,
            fontStyle: "600",
            fillColor: Cesium.Color.WHITE,
            outlineColor: new Cesium.Color(0.039, 0.086, 0.157, 1),
            outlineWidth: 4,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -30),
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            disableDepthTestDistance: 1_000_000,
            scaleByDistance: new Cesium.NearFarScalar(1e5, 1.0, 3e6, 0),
          },
        });

        // Fly to Caribbean
        viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(
            -62.7248,
            17.3026,
            350_000
          ),
          orientation: {
            heading: 0,
            pitch: Cesium.Math.toRadians(-35),
            roll: 0,
          },
          duration: 2.5,
          easingFunction: Cesium.EasingFunction.CUBIC_IN_OUT,
        });

        // Idle rotation
        viewer.clock.onTick.addEventListener(() => {
          if (viewer.scene.mode !== Cesium.SceneMode.SCENE3D) return;
          viewer.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, 0.00008);
        });

        clearTimeout(timeoutId);
      } catch (err) {
        console.error("Cesium init error:", err);
        clearTimeout(timeoutId);
        setError(true);
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
  }, []);

  if (error) {
    return (
      <div
        className={`w-full flex items-center justify-center ${className}`}
        style={{
          minHeight: "400px",
          background: "var(--color-surface-0, #0A1628)",
        }}
      >
        <div className="text-center">
          <div
            className="text-sm"
            style={{ color: "var(--slate-500, #64748B)" }}
          >
            Map unavailable
          </div>
          <div
            className="text-xs mt-1"
            style={{ color: "var(--slate-700, #334155)" }}
          >
            Check your connection
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`w-full ${className}`}
      style={{
        height: "480px",
        background: "var(--color-surface-0, #0A1628)",
      }}
    />
  );
}
