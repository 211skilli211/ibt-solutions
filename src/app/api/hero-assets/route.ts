import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

/**
 * GET /api/hero-assets
 * Returns all hero assets (public)
 */
export async function GET() {
  try {
    const result = await sql`
      SELECT page_key, asset_url, asset_type, overlay_color, overlay_opacity,
             title, subtitle, cta_text, cta_link, cta2_text, cta2_link,
             icon_url, typography, layout_template, style_config, updated_at
      FROM hero_assets 
      ORDER BY page_key ASC
    `;
    return NextResponse.json(result);
  } catch (error: any) {
    if (error.code === '42P01') {
      return NextResponse.json([]);
    }
    console.error('Error fetching hero assets:', error);
    return NextResponse.json([], { status: 200 });
  }
}
