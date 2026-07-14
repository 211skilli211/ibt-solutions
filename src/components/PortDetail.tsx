"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import * as THREE from "three";

// ─── Types ───────────────────────────────────────────────────────────────────

export type Building = {
  id: string;
  positions: [number, number][];
  height: number;
  color?: string;
  name?: string;
};

interface PortDetailProps {
  portId: string;
  portName: string;
  centerLat: number;
  centerLng: number;
  buildings: Building[];
  harborDepth?: number;
  vesselCount?: number;
  className?: string;
  height?: string;
}

// ─── Building Extruder ────────────────────────────────────────────────────────

function Building({
  positions,
  height,
  color = "oklch(0.70 0.05 230)",
  name,
}: Omit<Building, "id"> & { key: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();

    // Convert [lng, lat] positions to shape coordinates
    // Use first point as origin reference
    const refLng = positions[0][0];
    const refLat = positions[0][1];
    const scale = 1000; // Scale degrees to scene units

    const points = positions.map(([lng, lat]) => {
      return [
        (lng - refLng) * scale * Math.cos((refLat * Math.PI) / 180),
        (lat - refLat) * scale,
      ] as [number, number];
    });

    shape.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      shape.lineTo(points[i][0], points[i][1]);
    }
    shape.closePath();

    const extrudeSettings = {
      depth: height,
      bevelEnabled: false,
      bevelThickness: 0.1,
      bevelSize: 0.1,
    };

    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    // Rotate so buildings go up (Y axis)
    geo.rotateX(-Math.PI / 2);
    geo.translate(0, height, 0);

    return geo;
  }, [positions, height]);

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshStandardMaterial
        color={hovered ? "oklch(0.80 0.12 200)" : color}
        roughness={0.7}
        metalness={0.1}
        transparent
        opacity={hovered ? 1.0 : 0.85}
      />
      {hovered && name && (
        <mesh position={[0, height + 0.5, 0]}>
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshBasicMaterial color="oklch(0.95 0.02 230)" />
        </mesh>
      )}
    </mesh>
  );
}

// ─── Harbor Water Plane ───────────────────────────────────────────────────────

function HarborWater({ size = 50, depth = 0 }: { size?: number; depth?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && "material" in meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial & {
        opacity: number;
      };
      // Subtle shimmer effect
      mat.opacity = 0.7 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, depth, 0]}
    >
      <planeGeometry args={[size, size, 32, 32]} />
      <meshStandardMaterial
        color="oklch(0.45 0.12 220)"
        transparent
        opacity={0.7}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}

// ─── Vessel Marker ────────────────────────────────────────────────────────────

function VesselMarker({
  position,
  heading = 0,
  type = "cargo",
}: { position: [number, number, number]; heading?: number; type?: string; key: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const vesselColor = useMemo(() => {
    switch (type) {
      case "tanker":
        return "oklch(0.60 0.15 30)";
      case "passenger":
        return "oklch(0.65 0.10 280)";
      case "fishing":
        return "oklch(0.70 0.15 80)";
      default:
        return "oklch(0.55 0.08 230)";
    }
  }, [type]);

  return (
    <mesh ref={meshRef} position={position} rotation={[0, heading, 0]}>
      <boxGeometry args={[1, 0.4, 2.5]} />
      <meshStandardMaterial color={vesselColor} roughness={0.5} />
      {/* Bridge/cabin */}
      <mesh position={[0, 0.4, -0.5]}>
        <boxGeometry args={[0.6, 0.4, 0.8]} />
        <meshStandardMaterial color="oklch(0.90 0.005 230)" roughness={0.3} />
      </mesh>
    </mesh>
  );
}

// ─── Scene ───────────────────────────────────────────────────────────────────

function PortScene({
  buildings,
  centerLat,
  centerLng,
  harborDepth,
  vessels,
}: {
  buildings: Building[];
  centerLat: number;
  centerLng: number;
  harborDepth?: number;
  vessels: Array<{
    id: string;
    position: [number, number, number];
    heading: number;
    type: string;
  }>;
}) {
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(30, 40, 30);
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  }, [camera, centerLat, centerLng]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[30, 40, 30]} fov={50} />
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.05}
        minDistance={5}
        maxDistance={200}
        maxPolarAngle={Math.PI / 2.1}
        target={[0, 0, 0]}
      />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[50, 80, 30]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[-30, 40, -50]} intensity={0.3} />

      {/* Environment for reflections */}
      <Environment preset="city" />

      {/* Harbor water */}
      <HarborWater size={80} depth={harborDepth ?? 0} />

      {/* Buildings */}
      {buildings.map((b) => (
        <Building
          key={b.id}
          positions={b.positions}
          height={b.height}
          color={b.color}
          name={b.name}
        />
      ))}

      {/* Vessels */}
      {vessels.map((v) => (
        <VesselMarker
          key={v.id}
          position={v.position}
          heading={v.heading}
          type={v.type}
        />
      ))}

      {/* Ground reference grid */}
      <gridHelper
        args={[100, 20, "oklch(0.20 0.015 230)", "oklch(0.15 0.015 230)"]}
        position={[0, 0.01, 0]}
      />
    </>
  );
}

// ─── Info Overlay ─────────────────────────────────────────────────────────────

function InfoOverlay({
  portName,
  buildingCount,
  harborDepth,
  vesselCount,
}: {
  portName: string;
  buildingCount: number;
  harborDepth?: number;
  vesselCount?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: 12,
        left: 12,
        padding: "12px 16px",
        background: "oklch(0.12 0.018 230 / 0.85)",
        borderRadius: 12,
        backdropFilter: "blur(8px)",
        border: "1px solid oklch(0.25 0.015 230 / 0.5)",
        color: "oklch(0.95 0.005 230)",
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{portName}</div>
      <div style={{ fontSize: 11, color: "oklch(0.75 0.02 230)", lineHeight: 1.6 }}>
        <div>{buildingCount} buildings · {vesselCount ?? 0} vessels</div>
        {harborDepth !== undefined && <div>Harbor depth: {harborDepth}m</div>}
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function PortDetail({
  portId,
  portName,
  centerLat,
  centerLng,
  buildings,
  harborDepth,
  vesselCount,
  className = "",
  height = "520px",
}: PortDetailProps) {
  const [loading, setLoading] = useState(true);

  // Generate synthetic vessels based on port
  const vessels = useMemo(() => {
    const count = vesselCount ?? Math.floor(Math.random() * 5) + 2;
    return Array.from({ length: count }, (_, i) => ({
      id: `${portId}-vessel-${i}`,
      position: [
        (Math.random() - 0.5) * 40,
        0,
        (Math.random() - 0.5) * 40,
      ] as [number, number, number],
      heading: Math.random() * Math.PI * 2,
      type: ["cargo", "tanker", "passenger", "fishing"][Math.floor(Math.random() * 4)],
    }));
  }, [portId, vesselCount]);

  useEffect(() => {
    // Simulate loading building data
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [portId]);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height,
        borderRadius: 16,
        overflow: "hidden",
        background: "oklch(0.10 0.018 230)",
      }}
    >
      {/* Info overlay */}
      {!loading && (
        <InfoOverlay
          portName={portName}
          buildingCount={buildings.length}
          harborDepth={harborDepth}
          vesselCount={vessels.length}
        />
      )}

      {/* Debug info */}
      <div
        style={{
          position: "absolute",
          bottom: 12,
          left: 12,
          padding: "6px 10px",
          background: "oklch(0.10 0.015 230 / 0.7)",
          borderRadius: 6,
          fontSize: 10,
          color: "oklch(0.60 0.02 230)",
          pointerEvents: "none",
        }}
      >
        R3F · OSM Buildings · Extruded Footprints · Drag to orbit
      </div>

      {/* 3D Canvas */}
      {!loading && (
        <Canvas
          shadows
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <PortScene
            buildings={buildings}
            centerLat={centerLat}
            centerLng={centerLng}
            harborDepth={harborDepth}
            vessels={vessels}
          />
        </Canvas>
      )}

      {/* Loading state */}
      {loading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "oklch(0.10 0.018 230)",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 40,
                height: 40,
                margin: "0 auto 12px",
                border: "3px solid oklch(0.14 0.018 230)",
                borderTopColor: "oklch(0.70 0.12 200)",
                borderRadius: "50%",
                animation: "portSpin 0.8s linear infinite",
              }}
            />
            <div style={{ fontSize: 12, color: "oklch(0.55 0.02 230)" }}>
              Loading 3D port…
            </div>
            <style>{`@keyframes portSpin { to { transform: rotate(360deg); } }`}</style>
          </div>
        </div>
      )}
    </div>
  );
}
