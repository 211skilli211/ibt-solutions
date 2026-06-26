import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in environment variables');
}

export const sql = neon(DATABASE_URL);

export async function testConnection(): Promise<{ success: true; now: Date; version: string } | { success: false; error: string }> {
  try {
    const result = await sql`SELECT NOW() as now, version() as version`;
    console.log('Database connected:', result[0]);
    return { success: true, now: result[0].now, version: result[0].version };
  } catch (error) {
    console.error('Database connection failed:', error);
    return { success: false, error: String(error) };
  }
}

export async function checkPlatformColumns() {
  try {
    const usersHasPlatform = await sql`
      SELECT column_name FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'platform'
    `;
    const storesHasPlatform = await sql`
      SELECT column_name FROM information_schema.columns 
      WHERE table_name = 'stores' AND column_name = 'platform'
    `;
    const listingsHasPlatform = await sql`
      SELECT column_name FROM information_schema.columns 
      WHERE table_name = 'listings' AND column_name = 'platform'
    `;
    
    return {
      users: usersHasPlatform.length > 0,
      stores: storesHasPlatform.length > 0,
      listings: listingsHasPlatform.length > 0
    };
  } catch (error) {
    console.error('Error checking columns:', error);
    return { users: false, stores: false, listings: false };
  }
}

export async function checkIBTTables() {
  try {
    const tables = await sql`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN (
        'ibt_subscriptions', 'ibt_api_usage', 'ibt_locations', 
        'ibt_pois', 'ibt_marine_conditions', 'ibt_weather_cache'
      )
    `;
    return tables.map(t => t.table_name);
  } catch (error) {
    console.error('Error checking tables:', error);
    return [];
  }
}