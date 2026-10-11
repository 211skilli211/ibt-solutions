import { neon, type NeonQueryFunction } from '@neondatabase/serverless';

/** The callable type Neon's factory returns, so the Proxy keeps the generic signature. */
type SqlClient = NeonQueryFunction<false, false>;

/**
 * The Neon client, created on first use rather than at import.
 *
 * This used to be `export const sql = neon(process.env.DATABASE_URL)` behind a
 * module-scope `if (!DATABASE_URL) throw`, which made **importing this file throw
 * whenever DATABASE_URL was absent**. `next build` imports every route to collect
 * page data, so the whole production build failed with
 * "Failed to collect page data for /api/geospatial/farm-plots" on any machine
 * without a live database — including Render's builder, which is where this was
 * found. A build should not need database credentials; only a query should.
 *
 * The export stays callable as a tagged template (`sql\`SELECT 1\``) and keeps its
 * `.query()`, so all 16 importing files and their 77 call sites are unchanged.
 * A `Proxy` with an `apply` trap forwards both the callable and property forms.
 *
 * The configuration error is kept, only deferred: it now surfaces on the first
 * query, naming what is missing, instead of as an opaque build failure.
 */
let client: SqlClient | null = null;

function getClient(): SqlClient {
  if (client) return client;

  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      'DATABASE_URL is not set. Set it in the environment before making a database request. ' +
        '(The build no longer requires it — only queries do.)',
    );
  }

  client = neon(url) as SqlClient;
  return client;
}

export const sql = new Proxy((() => undefined) as unknown as SqlClient, {
  apply(_target, _thisArg, args: unknown[]) {
    // Forward the tagged-template call: sql`SELECT ...`
    return (getClient() as unknown as (...a: unknown[]) => unknown)(...args);
  },
  get(_target, property, receiver) {
    return Reflect.get(getClient() as object, property, receiver);
  },
}) as SqlClient;

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