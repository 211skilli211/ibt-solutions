import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locationId = searchParams.get('location_id');
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const radius = searchParams.get('radius') || '25';

    let query = `
      SELECT 
        mc.id,
        mc.location_id,
        mc.water_temp,
        mc.wave_height,
        mc.visibility,
        mc.wind_speed,
        mc.safety_flag,
        mc.recorded_at,
        l.name as location_name,
        l.lat,
        l.lng
      FROM ibt_marine_conditions mc
      LEFT JOIN ibt_locations l ON mc.location_id = l.location_id
      WHERE 1=1
    `;

    const params: any[] = [];

    if (locationId) {
      params.push(parseInt(locationId));
      query += ` AND mc.location_id = $${params.length}`;
    }

    if (lat && lng) {
      params.push(parseFloat(lat), parseFloat(lng), parseFloat(radius));
      query += ` AND l.lat IS NOT NULL AND (
        6371 * acos(
          cos(radians($${params.length - 2})) * cos(radians(l.lat)) *
          cos(radians(l.lng) - radians($${params.length - 1})) +
          sin(radians($${params.length - 2})) * sin(radians(l.lat))
        )
      ) < $${params.length}`;
    }

    query += ` ORDER BY mc.recorded_at DESC LIMIT 50`;

    const conditions = await sql(query, params);

    return NextResponse.json({
      success: true,
      count: conditions.length,
      conditions: conditions.map(c => ({
        id: c.id,
        location_id: c.location_id,
        location_name: c.location_name,
        coordinates: c.lat && c.lng ? { lat: c.lat, lng: c.lng } : null,
        water_temp: c.water_temp ? `${c.water_temp}°C` : null,
        wave_height: c.wave_height ? `${c.wave_height}m` : null,
        visibility: c.visibility ? `${c.visibility}m` : null,
        wind_speed: c.wind_speed ? `${c.wind_speed} km/h` : null,
        safety_flag: c.safety_flag,
        recorded_at: c.recorded_at
      }))
    });

  } catch (error) {
    console.error('Marine API error:', error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { location_id, water_temp, wave_height, visibility, wind_speed, safety_flag } = body;

    if (!location_id) {
      return NextResponse.json(
        { success: false, error: 'Location ID is required' },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO ibt_marine_conditions 
        (location_id, water_temp, wave_height, visibility, wind_speed, safety_flag, recorded_at)
      VALUES 
        (${location_id}, ${water_temp || null}, ${wave_height || null}, ${visibility || null}, ${wind_speed || null}, ${safety_flag || 'green'}, NOW())
      RETURNING id, location_id, safety_flag
    `;

    return NextResponse.json({
      success: true,
      message: 'Marine condition recorded',
      record: result[0]
    });

  } catch (error) {
    console.error('Marine create error:', error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}