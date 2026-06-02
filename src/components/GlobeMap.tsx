"use client";

import { useEffect, useRef, useState } from "react";

interface GlobeMapProps {
  className?: string;
}

const CESIUM_CDN = "https://cesium.com/downloads/cesiumjs/releases/1.114/Build/Cesium/Cesium.js";
const CESIUM_CSS = "https://cesium.com/downloads/cesiumjs/releases/1.114/Build/Cesium/Widgets/widgets.css";

export default function GlobeMap({ className = "" }: GlobeMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;
    if (viewerRef.current) return;

    let cancelled = false;

    function loadScript(src: string): Promise<void> {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve();
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }

    function loadCSS(href: string) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    }

    async function init() {
      // Load CSS first
      loadCSS(CESIUM_CSS);

      // Load Cesium JS
      await loadScript(CESIUM_CDN);
      if (cancelled) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Cesium = (window as any).Cesium;
      if (!Cesium) {
        setError(true);
        return;
      }

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
          // OpenStreetMap imagery — no token needed
          baseLayer: new Cesium.ImageryLayer(
            new Cesium.OpenStreetMapImageryProvider({
              url: "https://tile.openstreetmap.org/",
            })
          ),
          // Simple dark sky — no texture dependencies
          // Dark background instead of skybox
          backgroundColor: Cesium.Color.fromCssColorString("#0a0f1a"),
          // Request render mode for performance
          requestRenderMode: false,
          maximumRenderTimeChange: Infinity,
        });

        if (cancelled) {
          viewer.destroy();
          return;
        }

        viewerRef.current = viewer;

        // Remove bottom credits
        const credit = viewer.cesiumWidget.creditContainer;
        if (credit) credit.style.display = "none";

        // St. Kitts marker
        viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(-62.7248, 17.3026),
          point: {
            pixelSize: 10,
            color: Cesium.Color.fromCssColorString("#00d4ff"),
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 2,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            disableDepthTestDistance: 500000,
          },
          label: {
            text: "IBT — St. Kitts",
            font: "13px sans-serif",
            fillColor: Cesium.Color.WHITE,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 2,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -25),
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            disableDepthTestDistance: 500000,
          },
        });

        // Fly to Caribbean
        viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(-62.7248, 17.3026, 250000),
          orientation: {
            heading: 0,
            pitch: Cesium.Math.toRadians(-30),
            roll: 0,
          },
          duration: 2,
        });

        // Very slow rotation
        viewer.clock.onTick.addEventListener(() => {
          viewer.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, 0.0001);
        });

        setLoaded(true);
      } catch (err) {
        console.error("Cesium init error:", err);
        setError(true);
      }
    }

    init();

    return () => {
      cancelled = true;
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
        style={{ minHeight: "400px", background: "#0a0f1a" }}
      >
        <div className="text-center">
          <div className="text-slate-500 text-sm">Map unavailable</div>
          <div className="text-slate-600 text-xs mt-1">Please check your connection</div>
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
        background: "#0a0f1a",
      }}
    />
  );
}
