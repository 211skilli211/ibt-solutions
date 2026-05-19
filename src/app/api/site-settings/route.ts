import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

// The IslandHub backend serves all uploaded assets
const ASSET_BASE = 'https://islandhub.onrender.com';

function resolveUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
  if (url.startsWith('/')) return `${ASSET_BASE}${url}`;
  return `${ASSET_BASE}/${url}`;
}

export async function GET() {
  try {
    const result = await sql`
      SELECT setting_key, setting_value, setting_type, description 
      FROM site_settings 
      ORDER BY setting_key
    `;
    const settings = result.map((s: any) => ({
      ...s,
      setting_value: resolveUrl(s.setting_value) || s.setting_value,
    }));
    return NextResponse.json(settings);
  } catch (error: any) {
    if (error.code === '42P01') return NextResponse.json([]);
    console.error('Error fetching site settings:', error);
    return NextResponse.json([], { status: 200 });
  }
}
