/**
 * Settlement Management API
 * 
 * Endpoints:
 *   GET /api/payment/settlements                    — list settlements
 *   GET /api/payment/settlements/[id]               — get settlement details + reconciliation
 */

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

// ─── GET /api/payment/settlements ───
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const reconStatus = url.searchParams.get('reconciliation');
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '30'), 100);

    let settlements;
    if (status) {
      settlements = await sql`
        SELECT * FROM payment_settlements
        WHERE status = ${status}
        ORDER BY settlement_date DESC
        LIMIT ${limit}
      `;
    } else if (reconStatus) {
      settlements = await sql`
        SELECT * FROM payment_settlements
        WHERE reconciliation_status = ${reconStatus}
        ORDER BY settlement_date DESC
        LIMIT ${limit}
      `;
    } else {
      settlements = await sql`
        SELECT * FROM payment_settlements
        ORDER BY settlement_date DESC
        LIMIT ${limit}
      `;
    }

    // Summary
    const summary = await sql`
      SELECT
        COUNT(*) as total_settlements,
        COALESCE(SUM(net_amount_cents), 0) as total_settled_cents,
        COUNT(*) FILTER (WHERE reconciliation_status = 'unreconciled') as unreconciled_count
      FROM payment_settlements
    `;

    return NextResponse.json({
      settlements,
      summary: summary[0]
    });
  } catch (error: any) {
    if (error.code === '42P01') return NextResponse.json({ settlements: [], summary: {}, error: 'Payment tables not yet migrated' }, { status: 200 });
    console.error('Error fetching settlements:', error);
    return NextResponse.json({ error: 'Failed to fetch settlements' }, { status: 500 });
  }
}
