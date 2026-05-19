import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

/**
 * GET /api/hero-assets/[pageKey]
 * Returns hero asset for a specific page (public)
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ pageKey: string }> }
) {
  try {
    const { pageKey } = await params;
    const result = await sql`
      SELECT asset_url, asset_type, overlay_color, overlay_opacity,
             title, subtitle, cta_text, cta_link, cta2_text, cta2_link,
             icon_url, typography, layout_template, style_config
      FROM hero_assets 
      WHERE page_key = ${pageKey}
    `;

    if (result.length === 0) {
      return NextResponse.json(null);
    }

    return NextResponse.json(result[0]);
  } catch (error: any) {
    if (error.code === '42P01') {
      return NextResponse.json(null);
    }
    console.error('Error fetching hero asset:', error);
    return NextResponse.json(null, { status: 200 });
  }
}
