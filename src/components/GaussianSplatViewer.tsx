"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import * as THREE from "three";

// ─── Types ───────────────────────────────────────────────────────────────────

interface GaussianSplatViewerProps {
  /** URL to a .splat or .ply file */
  src?: string;
  /** Camera position [x, y, z] */
  cameraPosition?: [number, number, number];
  /** Enable auto-rotation */
  autoRotate?: boolean;
  /** Auto-rotation speed */
  autoRotateSpeed?: number;
  /** Background color */
  backgroundColor?: string;
  /** CSS class */
  className?: string;
  /** Height style */
  height?: string;
  /** Show loading indicator */
  showLoading?: boolean;
  /** Error callback */
  onError?: (err: Error) => void;
  /** Loaded callback */
  onLoaded?: () => void;
}

interface SplatData {
  positions: Float32Array;
  scales: Float32Array;
  rotations: Float32Array;
  colors: Float32Array;
  count: number;
}

// ─── PLY Parser ──────────────────────────────────────────────────────────────

function parsePLY(buffer: ArrayBuffer): SplatData {
  const text = new TextDecoder().decode(buffer);
  const lines = text.split("\n");

  let vertexCount = 0;
  let headerEnd = 0;
  const properties: string[] = [];

  // Parse header
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("element vertex")) {
      vertexCount = parseInt(line.split(" ")[2], 10);
    } else if (line.startsWith("property")) {
      properties.push(line.split(" ").pop()!);
    } else if (line === "end_header") {
      headerEnd = i + 1;
      break;
    }
  }

  if (vertexCount === 0) {
    throw new Error("No vertices found in PLY file");
  }

  const positions = new Float32Array(vertexCount * 3);
  const scales = new Float32Array(vertexCount * 3);
  const rotations = new Float32Array(vertexCount * 4);
  const colors = new Float32Array(vertexCount * 4);

  // Find property indices
  const propIndex: Record<string, number> = {};
  properties.forEach((p, i) => (propIndex[p] = i));

  // Parse vertices
  for (let i = 0; i < vertexCount; i++) {
    const line = lines[headerEnd + i]?.trim();
    if (!line) continue;
    const vals = line.split(" ").map(Number);
    const idx = i * 3;
    const idx4 = i * 4;

    // Position
    positions[idx] = vals[propIndex["x"] ?? 0] ?? 0;
    positions[idx + 1] = vals[propIndex["y"] ?? 1] ?? 0;
    positions[idx + 2] = vals[propIndex["z"] ?? 2] ?? 0;

    // Scale (default to small uniform)
    scales[idx] = vals[propIndex["scale_0"] ?? -1] ?? 0.01;
    scales[idx + 1] = vals[propIndex["scale_1"] ?? -1] ?? 0.01;
    scales[idx + 2] = vals[propIndex["scale_2"] ?? -1] ?? 0.01;

    // Rotation quaternion (default to identity)
    rotations[idx4] = vals[propIndex["rot_0"] ?? -1] ?? 0;
    rotations[idx4 + 1] = vals[propIndex["rot_1"] ?? -1] ?? 0;
    rotations[idx4 + 2] = vals[propIndex["rot_2"] ?? -1] ?? 0;
    rotations[idx4 + 3] = vals[propIndex["rot_3"] ?? -1] ?? 1;

    // Color (from DC_0/DC_1/DC_2 or red/green/blue)
    const r = propIndex["red"] !== undefined ? vals[propIndex["red"]] / 255 : ((vals[propIndex["f_dc_0"] ?? -1] ?? 0) + 1) / 2;
    const g = propIndex["green"] !== undefined ? vals[propIndex["green"]] / 255 : ((vals[propIndex["f_dc_1"] ?? -1] ?? 0) + 1) / 2;
    const b = propIndex["blue"] !== undefined ? vals[propIndex["blue"]] / 255 : ((vals[propIndex["f_dc_2"] ?? -1] ?? 0) + 1) / 2;
    const a = propIndex["alpha"] !== undefined ? vals[propIndex["alpha"]] / 255 : 1.0;

    colors[idx4] = Math.max(0, Math.min(1, r));
    colors[idx4 + 1] = Math.max(0, Math.min(1, g));
    colors[idx4 + 2] = Math.max(0, Math.min(1, b));
    colors[idx4 + 3] = Math.max(0, Math.min(1, a));
  }

  return { positions, scales, rotations, colors, count: vertexCount };
}

// ─── Splat Point Cloud ───────────────────────────────────────────────────────

function SplatPoints({ data }: { data: SplatData }) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const vertexShader = `
    attribute vec3 scales;
    attribute vec4 rotations;
    attribute vec4 splatColor;

    varying vec4 vColor;
    varying vec2 vUv;

    void main() {
      vColor = splatColor;

      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = 300.0 * scales.x / -mvPosition.z;
      gl_PointSize = clamp(gl_PointSize, 1.0, 200.0);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    varying vec4 vColor;

    void main() {
      vec2 center = gl_PointCoord - vec2(0.5);
      float dist = length(center);
      if (dist > 0.5) discard;

      float alpha = exp(-dist * dist * 8.0) * vColor.a;
      gl_FragColor = vec4(vColor.rgb, alpha);
    }
  `;

  useEffect(() => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    geo.setAttribute("position", new THREE.BufferAttribute(data.positions, 3));
    geo.setAttribute("scales", new THREE.BufferAttribute(data.scales, 3));
    geo.setAttribute("rotations", new THREE.BufferAttribute(data.rotations, 4));
    geo.setAttribute("splatColor", new THREE.BufferAttribute(data.colors, 4));
  }, [data]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ─── Scene ───────────────────────────────────────────────────────────────────

function Scene({
  splatData,
  autoRotate,
  autoRotateSpeed,
}: {
  splatData: SplatData | null;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
}) {
  const controlsRef = useRef<any>(null);

  useFrame(() => {
    if (controlsRef.current && autoRotate) {
      controlsRef.current.update();
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={60} />
      <OrbitControls
        ref={controlsRef}
        autoRotate={autoRotate}
        autoRotateSpeed={autoRotateSpeed ?? 0.5}
        enableDamping
        dampingFactor={0.05}
        minDistance={0.5}
        maxDistance={100}
      />
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {splatData && <SplatPoints data={splatData} />}

      {!splatData && (
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#14B8A6" wireframe />
        </mesh>
      )}
    </>
  );
}

// ─── Loading Spinner ─────────────────────────────────────────────────────────

function LoadingSpinner() {
  return (
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
          animation: "gaussianSpin 0.8s linear infinite",
        }}
      />
      <style>{`
        @keyframes gaussianSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// ─── Error Display ───────────────────────────────────────────────────────────

function ErrorDisplay({ message }: { message: string }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(10, 22, 40, 0.9)",
        zIndex: 10,
      }}
    >
      <div style={{ textAlign: "center", color: "#64748B" }}>
        <div style={{ fontSize: 14, marginBottom: 4 }}>Unable to load 3D scene</div>
        <div style={{ fontSize: 12, opacity: 0.6 }}>{message}</div>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function GaussianSplatViewer({
  src,
  cameraPosition = [0, 2, 5],
  autoRotate = true,
  autoRotateSpeed = 0.5,
  backgroundColor = "#0A1628",
  className = "",
  height = "480px",
  showLoading = true,
  onError,
  onLoaded,
}: GaussianSplatViewerProps) {
  const [splatData, setSplatData] = useState<SplatData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const loadSplat = useCallback(
    async (url: string) => {
      setLoading(true);
      setError(null);
      setSplatData(null);

      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

        const buffer = await res.arrayBuffer();
        if (controller.signal.aborted) return;

        const data = parsePLY(buffer);
        if (controller.signal.aborted) return;

        setSplatData(data);
        onLoaded?.();
      } catch (err: any) {
        if (err.name === "AbortError") return;
        const msg = err.message || "Failed to load splat data";
        setError(msg);
        onError?.(err);
      } finally {
        setLoading(false);
      }
    },
    [onError, onLoaded]
  );

  useEffect(() => {
    if (src) loadSplat(src);
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [src, loadSplat]);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height,
        background: backgroundColor,
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      {loading && showLoading && <LoadingSpinner />}
      {error && <ErrorDisplay message={error} />}

      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <Scene
          splatData={splatData}
          autoRotate={autoRotate}
          autoRotateSpeed={autoRotateSpeed}
        />
      </Canvas>

      {/* Info overlay */}
      {splatData && (
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: 12,
            padding: "6px 12px",
            background: "rgba(10, 22, 40, 0.7)",
            borderRadius: 8,
            fontSize: 11,
            color: "#64748B",
            backdropFilter: "blur(4px)",
            pointerEvents: "none",
          }}
        >
          {splatData.count.toLocaleString()} splats · Drag to orbit · Scroll to zoom
        </div>
      )}
    </div>
  );
}
