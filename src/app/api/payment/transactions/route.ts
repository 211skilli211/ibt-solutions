/**
 * Payment Transactions API
 * 
 * Endpoints:
 *   GET  /api/payment/transactions              — list transactions (admin or entity-scoped)
 *   GET  /api/payment/transactions/[id]         — get transaction details
 *   POST /api/payment/transactions/[id]/refund  — request refund
 */

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

// ─── GET /api/payment/transactions ───
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const entityType = url.searchParams.get('entity_type');
    const entityId = url.searchParams.get('entity_id');
    const status = url.searchParams.get('status');
    const terminalId = url.searchParams.get('terminal_id');
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '50'), 200);
    const offset = parseInt(url.searchParams.get('offset') || '0');
    const fromDate = url.searchParams.get('from');
    const toDate = url.searchParams.get('to');

    // Build dynamic query
    const conditions: string[] = [];
    const params: any[] = [];

    if (entityType) {
      conditions.push(`entity_type = $${params.length + 1}`);
      params.push(entityType);
    }
    if (entityId) {
      conditions.push(`entity_id = $${params.length + 1}`);
      params.push(parseInt(entityId));
    }
    if (status) {
      conditions.push(`t.status = $${params.length + 1}`);
      params.push(status);
    }
    if (terminalId) {
      conditions.push(`t.terminal_id = $${params.length + 1}`);
      params.push(parseInt(terminalId));
    }
    if (fromDate) {
      conditions.push(`t.created_at >= $${params.length + 1}`);
      params.push(fromDate);
    }
    if (toDate) {
      conditions.push(`t.created_at <= $${params.length + 1}`);
      params.push(toDate);
    }

    // Use raw query for dynamic conditions
    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const transactions = await sql(`
      SELECT t.*, pt.display_name as terminal_name, pt.entity_type
      FROM payment_transactions t
      LEFT JOIN payment_terminals pt ON t.terminal_id = pt.id
      ${whereClause}
      ORDER BY t.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `);

    // Summary stats
    const stats = await sql(`
      SELECT
        COUNT(*) as total_transactions,
        COALESCE(SUM(amount_cents) FILTER (WHERE status = 'approved'), 0) as total_volume_cents,
        COALESCE(SUM(net_cents) FILTER (WHERE status = 'approved'), 0) as total_net_cents,
        COALESCE(SUM(fee_cents) FILTER (WHERE status = 'approved'), 0) as total_fees_cents,
        COUNT(*) FILTER (WHERE status = 'approved') as approved_count,
        COUNT(*) FILTER (WHERE status = 'declined') as declined_count,
        COUNT(*) FILTER (WHERE status = 'pending') as pending_count
      FROM payment_transactions t
      ${whereClause}
    `);

    return NextResponse.json({
      transactions,
      stats: stats[0],
      pagination: { limit, offset }
    });
  } catch (error: any) {
    if (error.code === '42P01') return NextResponse.json({ transactions: [], stats: {}, error: 'Payment tables not yet migrated' }, { status: 200 });
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}

// ─── POST /api/payment/transactions (create payment) ───
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      terminal_id, entity_type, entity_id, order_id,
      amount_cents, currency = 'XCD', payment_method = 'qr_code',
      device_info
    } = body;

    if (!amount_cents || amount_cents <= 0) {
      return NextResponse.json({ error: 'Valid amount_cents is required' }, { status: 400 });
    }

    // Check terminal exists and is active
    if (terminal_id) {
      const terminal = await sql`
        SELECT id, status FROM payment_terminals WHERE id = ${parseInt(terminal_id)} LIMIT 1
      `;
      if (terminal.length === 0) {
        return NextResponse.json({ error: 'Terminal not found' }, { status: 404 });
      }
      if (terminal[0].status !== 'active') {
        return NextResponse.json({ error: `Terminal is ${terminal[0].status}` }, { status: 400 });
      }
    }

    // Generate internal transaction ID
    const txnId = `ibt_txn_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const estimatedFee = Math.round(amount_cents * 0.025 + 25); // 2.5% + $0.25
    const netCents = amount_cents - estimatedFee;

    // Create transaction record
    const txn = await sql`
      INSERT INTO payment_transactions (
        transaction_id, terminal_id, order_id, entity_type, entity_id,
        amount_cents, currency, fee_cents, net_cents, payment_method,
        status, device_info, created_at
      ) VALUES (
        ${txnId}, ${terminal_id ? parseInt(terminal_id) : null}, ${order_id || null},
        ${entity_type || null}, ${entity_id ? parseInt(entity_id) : 0},
        ${parseInt(amount_cents)}, ${currency}, ${estimatedFee}, ${netCents}, ${payment_method},
        'pending', ${device_info ? JSON.stringify(device_info) : null}, NOW()
      )
      RETURNING *
    `;

    // TODO: Call Fygaro API to create payment session
    // const fygaroPayment = await fetch(`${FYARGO_API_URL}/payments`, {
    //   method: 'POST',
    //   headers: { 'Authorization': `Bearer ${FYARGO_API_KEY}`, 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     amount: amount_cents,
    //     currency,
    //     terminal_id: terminal?.fygaro_account_id,
    //     metadata: { internal_txn_id: txnId, order_id }
    //   })
    // });

    return NextResponse.json({
      success: true,
      transaction: txn[0],
      payment_session: {
        // Return Fygaro payment URL / SDK config for frontend to complete payment
        status: 'awaiting_gateway',
        message: 'Transaction created. Awaiting payment gateway session.'
      }
    });
  } catch (error: any) {
    if (error.code === '42P01') return NextResponse.json({ error: 'Payment tables not yet migrated' }, { status: 400 });
    console.error('Error creating transaction:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
