import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const radius = searchParams.get("radius") || "50";

    if (!q) {
      return NextResponse.json(
        { success: false, error: "Query parameter 'q' is required" },
        { status: 400 }
      );
    }

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
      WHERE (
        name ILIKE $1
        OR description ILIKE $1
        OR category ILIKE $1
        OR island ILIKE $1
      )
    `;

    const params: any[] = [`%${q}%`];

    if (lat && lng) {
      params.push(parseFloat(lat), parseFloat(lng), parseFloat(radius));
      query += ` AND (
        6371 * acos(
          cos(radians($${params.length - 2})) * cos(radians(lat)) *
          cos(radians(lng) - radians($${params.length - 1})) +
          sin(radians($${params.length - 2})) * sin(radians(lat))
        )
      ) < $${params.length}`;
    }

    query += ` ORDER BY name LIMIT 20`;

    const results = await sql(query, params);

    return NextResponse.json({
      success: true,
      count: results.length,
      results: results.map((r: any) => ({
        ...r,
        images:
          typeof r.images === "string" ? JSON.parse(r.images) : r.images,
      })),
    });
  } catch (error) {
    console.error("Geospatial search error:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
