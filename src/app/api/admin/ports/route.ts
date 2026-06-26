/**
 * GET /api/admin/ports — List all ports from ibt_locations
 * POST /api/admin/ports — Create a new port
 * DELETE /api/admin/ports — Delete a port by id
 */

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  try {
    const ports = await sql`
      SELECT id, name, type, lat, lng, harbor_depth, max_vessel_size, description, created_at
      FROM ibt_locations
      ORDER BY created_at DESC
    `;
    return NextResponse.json({ ports });
  } catch (error) {
    console.error('Error fetching ports:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, type, lat, lng, harbor_depth, max_vessel_size, description } = body;

    if (!name || !type || lat === undefined || lng === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: name, type, lat, lng' },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO ibt_locations (name, type, lat, lng, harbor_depth, max_vessel_size, description)
      VALUES (
        ${name},
        ${type},
        ${parseFloat(lat)},
        ${parseFloat(lng)},
        ${harbor_depth ? parseFloat(harbor_depth) : null},
        ${max_vessel_size || null},
        ${description || null}
      )
      RETURNING id, name, type, lat, lng, harbor_depth, max_vessel_size, description, created_at
    `;

    return NextResponse.json({ port: result[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating port:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Missing required field: id' },
        { status: 400 }
      );
    }

    await sql`
      DELETE FROM ibt_locations WHERE id = ${id}
    `;

    return NextResponse.json({ status: 'deleted', id });
  } catch (error) {
    console.error('Error deleting port:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
