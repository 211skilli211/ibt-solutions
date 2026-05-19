import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

/**
 * GET /api/site-settings
 * Returns all site settings as key-value pairs
 */
export async function GET() {
  try {
    const result = await sql`
      SELECT setting_key, setting_value, setting_type, description 
      FROM site_settings 
      ORDER BY setting_key
    `;
    return NextResponse.json(result);
  } catch (error: any) {
    // Gracefully handle missing table
    if (error.code === '42P01') {
      return NextResponse.json([]);
    }
    console.error('Error fetching site settings:', error);
    return NextResponse.json([], { status: 200 });
  }
}
