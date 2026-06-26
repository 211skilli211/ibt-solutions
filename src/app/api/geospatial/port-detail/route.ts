import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

/**
 * Port Detail API
 * Returns building footprints + heights for 3D extrusion,
 * plus vessel/berth data for the port scene.
 */

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const portId = searchParams.get("port_id");
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const radius = searchParams.get("radius") || "0.01";

    // ─── 1. Buildings from POIs with location data ──────────────────────
    let buildings: any[] = [];

    if (portId) {
      // Get buildings associated with this port
      buildings = await sql`
        SELECT 
          p.poi_id as id,
          p.name,
          p.lat,
          p.lng,
          p.category,
          COALESCE(
            (SELECT height FROM ibt_buildings WHERE poi_id = p.poi_id LIMIT 1),
            2 + random() * 8
          ) as height
        FROM ibt_pois p
        WHERE p.category IN ('Town', 'Hotel', 'Restaurant', 'Port', 'Marina')
        AND p.lat IS NOT NULL AND p.lng IS NOT NULL
        ORDER BY p.name
        LIMIT 200
      `;
    } else if (lat && lng) {
      // Get buildings near coordinates
      const latNum = parseFloat(lat);
      const lngNum = parseFloat(lng);
      const radNum = parseFloat(radius);

      buildings = await sql`
        SELECT 
          p.poi_id as id,
          p.name,
          p.lat,
          p.lng,
          p.category,
          COALESCE(
            (SELECT height FROM ibt_buildings WHERE poi_id = p.poi_id LIMIT 1),
            2 + random() * 8
          ) as height
        FROM ibt_pois p
        WHERE p.category IN ('Town', 'Hotel', 'Restaurant', 'Port', 'Marina')
        AND p.lat IS NOT NULL AND p.lng IS NOT NULL
        AND (
          6371 * acos(
            cos(radians(${latNum})) * cos(radians(p.lat)) *
            cos(radians(p.lng) - radians(${lngNum})) +
            sin(radians(${latNum})) * sin(radians(p.lat))
          )
        ) < ${radNum}
        ORDER BY p.name
        LIMIT 200
      `;
    }

    // Convert to building extrusion format
    const extrudedBuildings = buildings.map((b) => {
      const h = parseFloat(b.height) || 3;
      // Generate rectangular footprint around the point
      const footprintSize = 0.00015; // ~15m
      const lngOffset = footprintSize / Math.cos((b.lat * Math.PI) / 180);
      const latOffset = footprintSize;

      return {
        id: String(b.id),
        name: b.name,
        positions: [
          [b.lng - lngOffset, b.lat - latOffset],
          [b.lng + lngOffset, b.lat - latOffset],
          [b.lng + lngOffset, b.lat + latOffset],
          [b.lng - lngOffset, b.lat + latOffset],
        ] as [number, number][],
        height: h,
        color: getCategoryColor(b.category),
      };
    });

    // ─── 2. Vessel data ─────────────────────────────────────────────────
    const vessels = await sql`
      SELECT 
        v.id,
        v.vessel_type,
        v.heading,
        l.lat,
        l.lng
      FROM ibt_vessels v
      LEFT JOIN ibt_locations l ON v.location_id = l.location_id
      WHERE v.status = 'docked'
      ${portId ? sql`AND v.port_id = ${portId}` : sql``}
      ${lat && lng ? sql`AND l.lat IS NOT NULL AND (
        6371 * acos(
          cos(radians(${parseFloat(lat)})) * cos(radians(l.lat)) *
          cos(radians(l.lng) - radians(${parseFloat(lng)})) +
          sin(radians(${parseFloat(lat)})) * sin(radians(l.lat))
        )
      ) < ${parseFloat(radius)}` : sql``}
      ORDER BY v.name
      LIMIT 20
    `;

    // ─── 3. Port metadata ───────────────────────────────────────────────
    const portInfo = await sql`
      SELECT 
        location_id,
        name,
        lat,
        lng,
        harbor_depth,
        (SELECT COUNT(*) FROM ibt_vessels WHERE port_id = ibt_locations.location_id AND status = 'docked') as vessel_count
      FROM ibt_locations
      WHERE type = 'port' OR type = 'marina'
      ${portId ? sql`AND location_id = ${parseInt(portId)}` : sql``}
      ${lat && lng ? sql`AND (
        6371 * acos(
          cos(radians(${parseFloat(lat)})) * cos(radians(lat)) *
          cos(radians(lng) - radians(${parseFloat(lng)})) +
          sin(radians(${parseFloat(lat)})) * sin(radians(lat))
        )
      ) < ${parseFloat(radius)}` : sql``}
      LIMIT 1
    `;

    return NextResponse.json({
      success: true,
      port: portInfo[0] || null,
      buildings: extrudedBuildings,
      vessels: vessels.map((v: any) => ({
        id: v.id,
        name: v.name,
        type: v.vessel_type || "cargo",
        heading: v.heading || 0,
        position: v.lat && v.lng ? { lat: v.lat, lng: v.lng } : null,
      })),
      stats: {
        buildingCount: extrudedBuildings.length,
        vesselCount: vessels.length,
      },
    });
  } catch (error) {
    console.error("Port detail API error:", error);
    // Return empty data rather than error — frontend handles empty state
    return NextResponse.json({
      success: true,
      port: null,
      buildings: [],
      vessels: [],
      stats: { buildingCount: 0, vesselCount: 0 },
    });
  }
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    Town: "oklch(0.72 0.05 230)",
    Hotel: "oklch(0.68 0.10 310)",
    Restaurant: "oklch(0.72 0.15 20)",
    Port: "oklch(0.55 0.10 250)",
    Marina: "oklch(0.65 0.15 200)",
    Beach: "oklch(0.80 0.12 80)",
    Historic: "oklch(0.65 0.10 30)",
  };
  return colors[category] || "oklch(0.70 0.05 230)";
}
