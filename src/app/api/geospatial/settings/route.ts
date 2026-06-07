import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

// UPSERT helper — INSERT ON CONFLICT DO UPDATE
async function upsertSetting(
  key: string,
  value: string,
  type: string,
  description: string
) {
  await sql`
    INSERT INTO site_settings (setting_key, setting_value, setting_type, description)
    VALUES (${key}, ${value}, ${type}, ${description})
    ON CONFLICT (setting_key)
    DO UPDATE SET
      setting_value = ${value},
      setting_type = ${type},
      updated_at = NOW()
  `;
}

// ─── GET: Fetch geospatial settings ──────────────────────────────────────────

export async function GET() {
  try {
    const result = await sql`
      SELECT setting_key, setting_value, setting_type
      FROM site_settings
      WHERE setting_key LIKE 'geospatial_%'
      ORDER BY setting_key
    `;

    const settings: Record<string, any> = {};
    for (const row of result) {
      const key = row.setting_key.replace("geospatial_", "");
      let value = row.setting_value;

      // Type coercion
      if (row.setting_type === "boolean") {
        value = value === "true" || value === "1" || value === true;
      } else if (row.setting_type === "number") {
        const n = Number(value);
        settings[key] = isNaN(n) ? null : n;
        continue;
      }

      settings[key] = value;
    }

    return NextResponse.json(settings);
  } catch (error: any) {
    if (error.code === "42P01") return NextResponse.json({});
    console.error("Error fetching geospatial settings:", error);
    return NextResponse.json({}, { status: 200 });
  }
}

// ─── POST: Update geospatial settings (admin only) ───────────────────────────

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const mappings: Array<{
      field: string;
      key: string;
      type: string;
      coerce: (v: any) => string;
    }> = [
      {
        field: "enable_3d_tiles",
        key: "geospatial_enable_3d_tiles",
        type: "boolean",
        coerce: (v: any) => String(v),
      },
      {
        field: "enable_gaussian_splat",
        key: "geospatial_enable_gaussian_splat",
        type: "boolean",
        coerce: (v: any) => String(v),
      },
      {
        field: "cesium_ion_asset_id",
        key: "geospatial_cesium_ion_asset_id",
        type: "number",
        coerce: (v: any) => String(v),
      },
      {
        field: "splat_ply_url",
        key: "geospatial_splat_ply_url",
        type: "string",
        coerce: (v: any) => String(v),
      },
      {
        field: "splat_camera_lat",
        key: "geospatial_splat_camera_lat",
        type: "number",
        coerce: (v: any) => String(v),
      },
      {
        field: "splat_camera_lng",
        key: "geospatial_splat_camera_lng",
        type: "number",
        coerce: (v: any) => String(v),
      },
      {
        field: "splat_camera_height",
        key: "geospatial_splat_camera_height",
        type: "number",
        coerce: (v: any) => String(v),
      },
    ];

    let updated = 0;
    for (const m of mappings) {
      if (body[m.field] !== undefined && body[m.field] !== null) {
        await upsertSetting(
          m.key,
          m.coerce(body[m.field]),
          m.type,
          `Geospatial setting: ${m.key}`
        );
        updated++;
      }
    }

    return NextResponse.json({ success: true, updated });
  } catch (error: any) {
    console.error("Error updating geospatial settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings", detail: error.message },
      { status: 500 }
    );
  }
}
