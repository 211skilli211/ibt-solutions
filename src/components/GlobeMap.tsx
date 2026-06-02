"use client";

import { useEffect, useRef } from "react";

interface GlobeMapProps {
  className?: string;
}

const CESIUM_CDN = "https://cesium.com/downloads/cesiumjs/releases/1.114/Build/Cesium/Cesium.js";
const CESIUM_CSS = "https://cesium.com/downloads/cesiumjs/releases/1.114/Build/Cesium/Widgets/widgets.css";

export default function GlobeMap({ className = "" }: GlobeMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);

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
      loadCSS(CESIUM_CSS);
      await loadScript(CESIUM_CDN);
      if (cancelled) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Cesium = (window as any).Cesium;
      if (!Cesium) return;

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
        baseLayer: Cesium.ImageryLayer.fromProviderAsync(
          Cesium.IonImageryProvider.fromAssetId(3845)
        ),
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
        requestRenderMode: false,
        maximumRenderTimeChange: Infinity,
      });

      if (cancelled) {
        viewer.destroy();
        return;
      }

      viewerRef.current = viewer;
      viewer.cesiumWidget.creditContainer.style.display = "none";

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

      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(-62.7, 17.3, 200000),
        orientation: {
          heading: 0,
          pitch: Cesium.Math.toRadians(-30),
          roll: 0,
        },
        duration: 3,
      });

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
