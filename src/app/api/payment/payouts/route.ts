/**
 * Payout Management API
 * 
 * Endpoints:
 *   GET  /api/payment/payouts              — list payout ledger
 *   POST /api/payment/payouts/process       — trigger manual payout batch
 *   GET  /api/payment/settlements           — list settlement batches
 */

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

// ─── GET /api/payment/payouts ───
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const entityType = url.searchParams.get('entity_type');
    const entityId = url.searchParams.get('entity_id');
    const status = url.searchParams.get('status') || 'pending';
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '50'), 200);
    const offset = parseInt(url.searchParams.get('offset') || '0');

    let payouts;
    if (entityType && entityId) {
      payouts = await sql`
        SELECT pl.*, t.transaction_id, t.amount_cents as txn_amount, t.payment_method
        FROM payout_ledger pl
        LEFT JOIN payment_transactions t ON pl.transaction_id = t.id
        WHERE pl.entity_type = ${entityType} AND pl.entity_id = ${parseInt(entityId)}
        ${status !== 'all' ? sql`AND pl.status = ${status}` : sql``}
        ORDER BY pl.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
    } else {
      payouts = await sql`
        SELECT pl.*, t.transaction_id, t.amount_cents as txn_amount, t.payment_method
        FROM payout_ledger pl
        LEFT JOIN payment_transactions t ON pl.transaction_id = t.id
        ${status !== 'all' ? sql`WHERE pl.status = ${status}` : sql``}
        ORDER BY pl.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
    }

    // Summary
    const summary = await sql`
      SELECT
        COUNT(*) as total_entries,
        COALESCE(SUM(net_amount_cents) FILTER (WHERE status = 'pending'), 0) as pending_cents,
        COALESCE(SUM(net_amount_cents) FILTER (WHERE status = 'completed'), 0) as completed_cents,
        COALESCE(SUM(platform_fee_cents), 0) as total_platform_fees
      FROM payout_ledger
      ${entityType && entityId ? sql`WHERE entity_type = ${entityType} AND entity_id = ${parseInt(entityId)}` : sql``}
    `;

    return NextResponse.json({
      payouts,
      summary: summary[0],
      pagination: { limit, offset }
    });
  } catch (error: any) {
    if (error.code === '42P01') return NextResponse.json({ payouts: [], summary: {}, error: 'Payment tables not yet migrated' }, { status: 200 });
    console.error('Error fetching payouts:', error);
    return NextResponse.json({ error: 'Failed to fetch payouts' }, { status: 500 });
  }
}

// ─── POST /api/payment/payouts/process ───
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { entity_type, entity_id, payout_method = 'bank_transfer' } = body;

    // Get pending payouts for this entity
    let pendingPayouts;
    if (entity_type && entity_id) {
      pendingPayouts = await sql`
        SELECT * FROM payout_ledger
        WHERE entity_type = ${entity_type} AND entity_id = ${parseInt(entity_id)} AND status = 'pending'
        ORDER BY created_at ASC
      `;
    } else {
      // Process all pending payouts
      pendingPayouts = await sql`
        SELECT * FROM payout_ledger
        WHERE status = 'pending'
        ORDER BY created_at ASC
        LIMIT 100
      `;
    }

    if (pendingPayouts.length === 0) {
      return NextResponse.json({ message: 'No pending payouts to process', processed: 0 });
    }

    const totalCents = pendingPayouts.reduce((sum: number, p: any) => sum + parseInt(p.net_amount_cents), 0);
    const payoutIds = pendingPayouts.map(p => p.id);

    // Mark as processing
    await sql`
      UPDATE payout_ledger
      SET status = 'processing', scheduled_at = NOW()
      WHERE id = ANY(${payoutIds})
    `;

    // TODO: Call bank API or Fygaro payout API
    // For now, mark as completed (manual process until bank API is integrated)
    await sql`
      UPDATE payout_ledger
      SET status = 'completed', completed_at = NOW(), payout_method = ${payout_method}
      WHERE id = ANY(${payoutIds})
    `;

    return NextResponse.json({
      success: true,
      processed: pendingPayouts.length,
      total_cents: totalCents,
      total_xcd: (totalCents / 100).toFixed(2),
      message: `Processed ${pendingPayouts.length} payouts totaling XCD $${(totalCents / 100).toFixed(2)}`
    });
  } catch (error: any) {
    console.error('Error processing payouts:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
