import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

/**
 * Farm Plots API
 * Returns agricultural plot GeoJSON data from ibt_pois table.
 * Each POI becomes a small polygon (simulating detected field boundaries).
 * In production, these would come from agribound inference results stored in a farm_plots table.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const island = searchParams.get("island");
    const limit = searchParams.get("limit") || "100";

    let query = `
      SELECT
        poi_id as id,
        name,
        description,
        lat,
        lng,
        category,
        island,
        images,
        created_at
      FROM ibt_pois
      WHERE category = 'agricultural'
    `;

    const params: any[] = [];

    if (island) {
      params.push(island);
      query += ` AND island = $${params.length}`;
    }

    query += ` ORDER BY name LIMIT ${parseInt(limit, 10)}`;

    const pois = await sql(query, params);

    // Convert to GeoJSON with approximate polygon boundaries
    // Each farm plot gets a small rectangular polygon (~0.5 acre at equator)
    const features = pois.map((p: any) => {
      const lat = parseFloat(p.lat);
      const lng = parseFloat(p.lng);
      // Approximate 0.5 acre plot: ~0.003 degrees square (varies by latitude)
      const dLat = 0.003;
      const dLng = 0.003 / Math.cos((lat * Math.PI) / 180);

      return {
        type: "Feature" as const,
        geometry: {
          type: "Polygon" as const,
          coordinates: [
            [
              [lng - dLng, lat - dLat],
              [lng + dLng, lat - dLat],
              [lng + dLng, lat + dLat],
              [lng - dLng, lat + dLat],
              [lng - dLng, lat - dLat],
            ],
          ],
        },
        properties: {
          id: p.id,
          name: p.name,
          description: p.description,
          category: p.category,
          island: p.island,
          images: typeof p.images === "string" ? JSON.parse(p.images) : p.images,
          created_at: p.created_at,
        },
      };
    });

    const geojson = {
      type: "FeatureCollection" as const,
      features,
    };

    return NextResponse.json({
      success: true,
      count: features.length,
      geojson,
    });
  } catch (error) {
    console.error("Farm plots API error:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
