/**
 * Payment Terminal Management API
 * Admin endpoints for provisioning and managing sub-merchant terminals
 * 
 * Endpoints:
 *   GET    /api/payment/terminals                     — list all terminals
 *   POST   /api/payment/terminals                     — create new terminal
 *   GET    /api/payment/terminals/[id]                — get terminal details
 *   PATCH  /api/payment/terminals/[id]                — update terminal
 *   POST   /api/payment/terminals/[id]/suspend        — suspend terminal
 *   GET    /api/payment/transactions                  — list transactions (admin)
 *   GET    /api/payment/transactions/[id]             — get transaction details
 *   GET    /api/payment/payouts                       — list payout ledger
 *   POST   /api/payment/payouts/process               — trigger manual payout
 */

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

// ─── GET /api/payment/terminals ───
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const entityType = url.searchParams.get('entity_type');
    const status = url.searchParams.get('status');
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '50'), 100);
    const offset = parseInt(url.searchParams.get('offset') || '0');

    let terminals;
    if (entityType) {
      terminals = await sql`
        SELECT t.*, tc.daily_limit_cents, tc.single_txn_limit_cents, tc.require_pin, tc.custom_branding
        FROM payment_terminals t
        LEFT JOIN terminal_config tc ON t.id = tc.terminal_id
        WHERE t.entity_type = ${entityType}
        ${status ? sql`AND t.status = ${status}` : sql``}
        ORDER BY t.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
    } else {
      terminals = await sql`
        SELECT t.*, tc.daily_limit_cents, tc.single_txn_limit_cents, tc.require_pin, tc.custom_branding
        FROM payment_terminals t
        LEFT JOIN terminal_config tc ON t.id = tc.terminal_id
        ${status ? sql`WHERE t.status = ${status}` : sql``}
        ORDER BY t.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
    }

    // Get summary stats
    const stats = await sql`
      SELECT
        COUNT(*) as total_terminals,
        COUNT(*) FILTER (WHERE status = 'active') as active_terminals,
        COUNT(*) FILTER (WHERE status = 'suspended') as suspended_terminals,
        COALESCE(SUM(net_cents) FILTER (WHERE pl.status = 'pending'), 0) as pending_payout_cents
      FROM payment_terminals t
      LEFT JOIN payout_ledger pl ON t.id = pl.transaction_id
    `;

    return NextResponse.json({
      terminals,
      stats: stats[0],
      pagination: { limit, offset, total: parseInt(stats[0]?.total_terminals || '0') }
    });
  } catch (error: any) {
    if (error.code === '42P01') return NextResponse.json({ terminals: [], stats: {}, error: 'Payment tables not yet migrated' }, { status: 200 });
    console.error('Error fetching terminals:', error);
    return NextResponse.json({ error: 'Failed to fetch terminals' }, { status: 500 });
  }
}

// ─── POST /api/payment/terminals ───
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      entity_type, entity_id, display_name, terminal_type = 'sub_account',
      payout_bank_name, payout_account_last4, payout_routing, payout_swift,
      daily_limit_cents = 500000, single_txn_limit_cents = 100000
    } = body;

    if (!entity_type || !entity_id) {
      return NextResponse.json({ error: 'entity_type and entity_id are required' }, { status: 400 });
    }

    // Validate entity type
    const validTypes = ['vendor', 'service_provider', 'coop_member', 'driver', 'tour_operator'];
    if (!validTypes.includes(entity_type)) {
      return NextResponse.json({ error: `Invalid entity_type. Must be one of: ${validTypes.join(', ')}` }, { status: 400 });
    }

    // Generate internal terminal ID
    const internalTerminalId = `ibt_${entity_type}_${entity_id}_${Date.now()}`;

    // Create terminal record
    const terminal = await sql`
      INSERT INTO payment_terminals (
        terminal_id, entity_type, entity_id, terminal_type, display_name,
        payout_bank_name, payout_account_last4, payout_routing, payout_swift,
        status, created_at
      ) VALUES (
        ${internalTerminalId}, ${entity_type}, ${parseInt(entity_id)}, ${terminal_type}, ${display_name || null},
        ${payout_bank_name || null}, ${payout_account_last4 || null}, ${payout_routing || null}, ${payout_swift || null},
        'pending', NOW()
      )
      RETURNING *
    `;

    const terminalId = terminal[0].id;

    // Create default terminal config
    await sql`
      INSERT INTO terminal_config (terminal_id, daily_limit_cents, single_txn_limit_cents)
      VALUES (${terminalId}, ${daily_limit_cents}, ${single_txn_limit_cents})
    `;

    // TODO: Call Fygaro API to provision sub-account
    // const fygaroResponse = await fetch(`${FYARGO_API_URL}/terminals`, {
    //   method: 'POST',
    //   headers: { 'Authorization': `Bearer ${FYARGO_API_KEY}`, 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ display_name, entity_type, currency: 'XCD' })
    // });
    // Update terminal.fygaro_account_id with Fygaro's response

    return NextResponse.json({
      success: true,
      terminal: terminal[0],
      message: `Terminal created for ${entity_type} #${entity_id}. Awaiting payment gateway provisioning.`
    });
  } catch (error: any) {
    if (error.code === '42P01') return NextResponse.json({ error: 'Payment tables not yet migrated' }, { status: 400 });
    if (error.code === '23505') return NextResponse.json({ error: 'Terminal already exists for this entity' }, { status: 409 });
    console.error('Error creating terminal:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
