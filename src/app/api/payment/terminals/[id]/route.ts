/**
 * GET /api/payment/terminals/[id] — get terminal details
 * PATCH /api/payment/terminals/[id] — update terminal (limits, config, payout info)
 * POST /api/payment/terminals/[id]/suspend — suspend terminal
 */

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const terminal = await sql`
      SELECT t.*, tc.daily_limit_cents, tc.single_txn_limit_cents, tc.require_pin,
             tc.receipt_email, tc.receipt_phone, tc.custom_branding
      FROM payment_terminals t
      LEFT JOIN terminal_config tc ON t.id = tc.terminal_id
      WHERE t.id = ${parseInt(id)}
    `;

    if (terminal.length === 0) {
      return NextResponse.json({ error: 'Terminal not found' }, { status: 404 });
    }

    // Get recent transactions
    const recentTxns = await sql`
      SELECT transaction_id, amount_cents, currency, status, payment_method, created_at
      FROM payment_transactions
      WHERE terminal_id = ${parseInt(id)}
      ORDER BY created_at DESC
      LIMIT 10
    `;

    // Get pending payouts
    const pendingPayouts = await sql`
      SELECT SUM(net_amount_cents) as total_pending
      FROM payout_ledger
      WHERE entity_type = ${terminal[0].entity_type}
        AND entity_id = ${terminal[0].entity_id}
        AND status = 'pending'
    `;

    return NextResponse.json({
      terminal: terminal[0],
      recent_transactions: recentTxns,
      pending_payout_cents: parseInt(pendingPayouts[0]?.total_pending || '0')
    });
  } catch (error: any) {
    console.error('Error fetching terminal:', error);
    return NextResponse.json({ error: 'Failed to fetch terminal' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const {
      display_name, status, payout_bank_name, payout_account_last4,
      payout_routing, payout_swift,
      daily_limit_cents, single_txn_limit_cents, require_pin,
      receipt_email, receipt_phone, custom_branding
    } = body;

    // Update terminal
    const terminal = await sql`
      UPDATE payment_terminals
      SET
        display_name = COALESCE(${display_name || null}, display_name),
        status = COALESCE(${status || null}, status),
        payout_bank_name = CASE WHEN ${payout_bank_name !== undefined} THEN ${payout_bank_name} ELSE payout_bank_name END,
        payout_account_last4 = CASE WHEN ${payout_account_last4 !== undefined} THEN ${payout_account_last4} ELSE payout_account_last4 END,
        payout_routing = CASE WHEN ${payout_routing !== undefined} THEN ${payout_routing} ELSE payout_routing END,
        payout_swift = CASE WHEN ${payout_swift !== undefined} THEN ${payout_swift} ELSE payout_swift END,
        updated_at = NOW()
      WHERE id = ${parseInt(id)}
      RETURNING *
    `;

    if (terminal.length === 0) {
      return NextResponse.json({ error: 'Terminal not found' }, { status: 404 });
    }

    // Update terminal config if provided
    if (daily_limit_cents !== undefined || single_txn_limit_cents !== undefined || require_pin !== undefined ||
        receipt_email !== undefined || receipt_phone !== undefined || custom_branding !== undefined) {
      await sql`
        INSERT INTO terminal_config (terminal_id, daily_limit_cents, single_txn_limit_cents, require_pin, receipt_email, receipt_phone, custom_branding, updated_at)
        VALUES (
          ${parseInt(id)},
          COALESCE(${daily_limit_cents || null}, 500000),
          COALESCE(${single_txn_limit_cents || null}, 100000),
          COALESCE(${require_pin ?? null}, false),
          ${receipt_email || null},
          ${receipt_phone || null},
          ${custom_branding ? JSON.stringify(custom_branding) : null},
          NOW()
        )
        ON CONFLICT (terminal_id) DO UPDATE SET
          daily_limit_cents = COALESCE(${daily_limit_cents || null}, terminal_config.daily_limit_cents),
          single_txn_limit_cents = COALESCE(${single_txn_limit_cents || null}, terminal_config.single_txn_limit_cents),
          require_pin = COALESCE(${require_pin ?? null}, terminal_config.require_pin),
          receipt_email = CASE WHEN ${receipt_email !== undefined} THEN ${receipt_email} ELSE terminal_config.receipt_email END,
          receipt_phone = CASE WHEN ${receipt_phone !== undefined} THEN ${receipt_phone} ELSE terminal_config.receipt_phone END,
          custom_branding = CASE WHEN ${custom_branding !== undefined} THEN ${JSON.stringify(custom_branding)} ELSE terminal_config.custom_branding END,
          updated_at = NOW()
      `;
    }

    return NextResponse.json({ success: true, terminal: terminal[0] });
  } catch (error: any) {
    console.error('Error updating terminal:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  // Soft-delete: mark as closed
  try {
    const terminal = await sql`
      UPDATE payment_terminals
      SET status = 'closed', updated_at = NOW()
      WHERE id = ${parseInt(id)}
      RETURNING *
    `;

    if (terminal.length === 0) {
      return NextResponse.json({ error: 'Terminal not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Terminal closed' });
  } catch (error: any) {
    console.error('Error closing terminal:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
