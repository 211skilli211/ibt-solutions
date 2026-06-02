"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Cesium: any;
 }
}

interface GlobeMapProps {
  className?: string;
  /** Cesium Ion access token — if omitted, uses default (rate-limited) */
  ionToken?: string;
}

export default function GlobeMap({ className = "" }: GlobeMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;

    let cancelled = false;

    async function init() {
      // Dynamic import of Cesium (client-side only)
      const Cesium = await import("cesium");
      if (cancelled) return;

      // Set base URL for assets
      window.Cesium = Cesium;

      const viewer = new Cesium.Viewer(containerRef.current!, {
        // Disable default UI clutter for embedded use
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
        // Use a subtle basemap
        baseLayer: Cesium.ImageryLayer.fromProviderAsync(
          Cesium.IonImageryProvider.fromAssetId(3845) // Natural Earth II
        ),
        // Dark sky for professional look
        skyBox: new Cesium.SkyBox({
          sources: {
            positiveX: Cesium.buildModuleUrl("Assets/Textures/SkyBox/tycho2t3_80_px.jpg"),
            negativeX: Cesium.buildModuleUrl("Assets/Textures/SkyBox/tycho2t3_80_mx.jpg"),
            positiveY: Cesium.buildModuleUrl("Assets/Textures/SkyBox/tycho2t3_80_py.jpg"),
            negativeY: Cesium.buildModuleUrl("Assets/Textures/SkyBox/tycho2t3_80_my.jpg"),
            positiveZ: Cesium.buildModuleUrl("Assets/Textures/SkyBox/tycho2t3_80_pz.jpg"),
            negativeZ: Cesium.buildModuleUrl("Assets/Textures/SkyBox/tycho2t3_80_mz.jpg"),
          },
        }),
        // Disable terrain for smooth performance
        terrain: undefined,
        // Higher quality render
        requestRenderMode: false,
        maximumRenderTimeChange: Infinity,
      });

      if (cancelled) {
        viewer.destroy();
        return;
      }

      viewerRef.current = viewer;

      // Remove Cesium logo credit
      viewer.cesiumWidget.creditContainer.style.display = "none";

      // Set initial camera to Caribbean (St. Kitts)
      // Basseterre: 17.3°N, 62.7°W
      viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(-62.7, 17.3, 500000),
        orientation: {
          heading: 0,
          pitch: Cesium.Math.toRadians(-45),
          roll: 0,
        },
      });

      // Add St. Kitts marker
      viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-62.7, 17.3),
        point: {
          pixelSize: 8,
          color: Cesium.Color.fromCssColorString("#00d4ff"),
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 2,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          disableDepthTestDistance: 500000,
        },
        label: {
          text: "IBT — St. Kitts",
          font: "12px sans-serif",
          fillColor: Cesium.Color.WHITE,
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 2,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          pixelOffset: new Cesium.Cartesian2(0, -20),
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          disableDepthTestDistance: 500000,
        },
      });

      // Add fly-to animation
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(-62.7, 17.3, 200000),
        orientation: {
          heading: 0,
          pitch: Cesium.Math.toRadians(-30),
          roll: 0,
        },
        duration: 3,
      });

      // Slow auto-rotate when idle
      viewer.clock.onTick.addEventListener(() => {
        viewer.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, 0.0002);
      });
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

  return (
    <div
      ref={containerRef}
      className={`w-full h-full ${className}`}
      style={{ minHeight: "400px" }}
    />
  );
}
