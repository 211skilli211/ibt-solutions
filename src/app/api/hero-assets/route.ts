import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

const ASSET_BASE = 'https://islandhub.onrender.com';

function resolveUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
  // Route /uploads/ filenames through the media file API for DB-stored files
  if (url.startsWith('/uploads/')) {
    const filename = url.replace('/uploads/', '');
    return `${ASSET_BASE}/api/media/file/${filename}`;
  }
  if (url.startsWith('/')) return `${ASSET_BASE}${url}`;
  return `${ASSET_BASE}/${url}`;
}

export async function GET() {
  try {
    const result = await sql`
      SELECT page_key, asset_url, asset_type, overlay_color, overlay_opacity,
             title, subtitle, cta_text, cta_link, cta2_text, cta2_link,
             icon_url, typography, layout_template, style_config, updated_at
      FROM hero_assets 
      ORDER BY page_key ASC
    `;
    const assets = result.map((a: any) => ({
      ...a,
      asset_url: resolveUrl(a.asset_url),
      icon_url: resolveUrl(a.icon_url),
    }));
    return NextResponse.json(assets);
  } catch (error: any) {
    if (error.code === '42P01') return NextResponse.json([]);
    console.error('Error fetching hero assets:', error);
    return NextResponse.json([], { status: 200 });
  }
}
