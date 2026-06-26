import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const island = searchParams.get('island');
    const category = searchParams.get('category');
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const radius = searchParams.get('radius') || '50';

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
      WHERE 1=1
    `;

    const params: any[] = [];

    if (island) {
      params.push(island);
      query += ` AND island = $${params.length}`;
    }

    if (category) {
      params.push(category);
      query += ` AND category = $${params.length}`;
    }

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

    query += ` ORDER BY name LIMIT 100`;

    const pois = await sql(query, params);

    const categories = await sql`
      SELECT DISTINCT category FROM ibt_pois ORDER BY category
    `;

    const islands = await sql`
      SELECT DISTINCT island FROM ibt_pois ORDER BY island
    `;

    return NextResponse.json({
      success: true,
      count: pois.length,
      pois: pois.map(p => ({
        ...p,
        images: typeof p.images === 'string' ? JSON.parse(p.images) : p.images
      })),
      filters: {
        categories: categories.map(c => c.category),
        islands: islands.map(i => i.island)
      }
    });

  } catch (error) {
    console.error('POI API error:', error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, lat, lng, category, island, images } = body;

    if (!name || !lat || !lng || !category) {
      return NextResponse.json(
        { success: false, error: 'Name, lat, lng, and category are required' },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO ibt_pois (name, description, lat, lng, category, island, images)
      VALUES (${name}, ${description || null}, ${lat}, ${lng}, ${category}, ${island || 'Caribbean'}, ${JSON.stringify(images || [])})
      RETURNING poi_id as id, name, category, island
    `;

    return NextResponse.json({
      success: true,
      message: 'POI created successfully',
      poi: result[0]
    });

  } catch (error) {
    console.error('POI create error:', error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}