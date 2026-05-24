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

    const asset = result[0];
    return NextResponse.json({
      ...asset,
      asset_url: resolveUrl(asset.asset_url),
      icon_url: resolveUrl(asset.icon_url),
    });
  } catch (error: any) {
    if (error.code === '42P01') return NextResponse.json(null);
    console.error('Error fetching hero asset:', error);
    return NextResponse.json(null, { status: 200 });
  }
}
