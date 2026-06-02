/**
 * Payment Webhook Handler
 * Receives and processes webhooks from Fygaro vPOS gateway
 * 
 * Endpoints:
 *   POST /api/payment/webhooks/fygaro  — incoming webhook events
 *   GET  /api/payment/webhooks         — webhook audit log (admin)
 */

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import crypto from 'crypto';

// ─── Webhook Signature Verification ───
function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  try {
    const expected = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'utf8'),
      Buffer.from(expected, 'utf8')
    );
  } catch {
    return false;
  }
}

// ─── POST /api/payment/webhooks/fygaro ───
export async function POST(request: NextRequest) {
  const webhookSecret = process.env.FYARGO_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  const signature = request.headers.get('x-fygaro-signature') || '';
  const rawBody = await request.text();

  // Verify HMAC signature
  if (!verifyWebhookSignature(rawBody, signature, webhookSecret)) {
    console.warn('⚠️ Invalid webhook signature, rejecting');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  // Parse and log webhook
  let payload: any;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const eventType = payload.event || 'unknown';
  const transactionId = payload.transaction_id || null;
  const terminalId = payload.terminal_id || null;

  // Log the webhook
  const webhookLog = await sql`
    INSERT INTO payment_webhooks (event_type, payload, signature, processed, created_at)
    VALUES (${eventType}, ${JSON.stringify(rawBody)}, ${signature}, false, NOW())
    RETURNING id
  `;
  const webhookId = webhookLog[0]?.id;

  try {
    // Route event to handler
    switch (eventType) {
      case 'payment.success':
        await handlePaymentSuccess(payload);
        break;
      case 'payment.declined':
        await handlePaymentDeclined(payload);
        break;
      case 'payment.refunded':
        await handlePaymentRefunded(payload);
        break;
      case 'settlement.completed':
        await handleSettlementCompleted(payload);
        break;
      case 'terminal.created':
        await handleTerminalCreated(payload);
        break;
      case 'terminal.suspended':
        await handleTerminalSuspended(payload);
        break;
      default:
        console.log(`Unhandled webhook event: ${eventType}`);
    }

    // Mark webhook as processed
    await sql`
      UPDATE payment_webhooks
      SET processed = true, processing_result = ${JSON.stringify({ success: true })}, processed_at = NOW()
      WHERE id = ${webhookId}
    `;

    return NextResponse.json({ received: true, event: eventType, transaction_id: transactionId });
  } catch (error: any) {
    // Mark webhook as failed
    await sql`
      UPDATE payment_webhooks
      SET processing_result = ${JSON.stringify({ error: error.message })}, retry_count = retry_count + 1
      WHERE id = ${webhookId}
    `;
    console.error(`Webhook processing failed:`, error);
    // Return 200 so Fygaro doesn't retry — we log it for manual review
    return NextResponse.json({ received: true, error: 'Processing logged, manual review needed' });
  }
}

// ─── Event Handlers ───

async function handlePaymentSuccess(payload: any) {
  const { transaction_id, terminal_id, amount, currency, status, order_id } = payload;

  // Update transaction status
  await sql`
    UPDATE payment_transactions
    SET status = 'approved',
        completed_at = NOW(),
        gateway_response = ${JSON.stringify(payload)},
        gateway_signature = ${payload.signature || null}
    WHERE transaction_id = ${transaction_id}
  `;

  // Find terminal and create payout ledger entry
  const terminal = await sql`
    SELECT id, entity_type, entity_id FROM payment_terminals WHERE fygaro_account_id = ${terminal_id} LIMIT 1
  `;

  if (terminal.length > 0) {
    const t = terminal[0];
    const feeCents = Math.round(amount * 0.025 + 25); // 2.5% + $0.25 estimate
    const platformFeeCents = 0; // 0% for launch
    const netCents = amount - feeCents - platformFeeCents;

    await sql`
      INSERT INTO payout_ledger (
        entity_type, entity_id, transaction_id,
        gross_amount_cents, gateway_fee_cents, platform_fee_cents, net_amount_cents,
        status, created_at
      ) VALUES (
        ${t.entity_type}, ${t.entity_id}, (SELECT id FROM payment_transactions WHERE transaction_id = ${transaction_id} LIMIT 1),
        ${amount}, ${feeCents}, ${platformFeeCents}, ${netCents},
        'pending', NOW()
      )
    `;
  }
}

async function handlePaymentDeclined(payload: any) {
  const { transaction_id, decline_reason } = payload;
  await sql`
    UPDATE payment_transactions
    SET status = 'declined',
        decline_reason = ${decline_reason || null},
        completed_at = NOW()
    WHERE transaction_id = ${transaction_id}
  `;
}

async function handlePaymentRefunded(payload: any) {
  const { transaction_id } = payload;
  await sql`
    UPDATE payment_transactions
    SET status = 'refunded',
        completed_at = NOW()
    WHERE transaction_id = ${transaction_id}
  `;
}

async function handleSettlementCompleted(payload: any) {
  const { settlement_id, settlement_date, total_amount, total_fees, net_amount, transaction_count, bank_reference } = payload;

  await sql`
    INSERT INTO payment_settlements (
      settlement_id, settlement_date, total_amount_cents, total_fees_cents,
      net_amount_cents, transaction_count, status, bank_reference, completed_at
    ) VALUES (
      ${settlement_id}, ${settlement_date}, ${total_amount}, ${total_fees},
      ${net_amount}, ${transaction_count}, 'completed', ${bank_reference}, NOW()
    )
    ON CONFLICT (settlement_id) DO UPDATE SET
      status = 'completed',
      bank_reference = EXCLUDED.bank_reference,
      completed_at = NOW()
  `;
}

async function handleTerminalCreated(payload: any) {
  // Terminal provisioning confirmed by gateway
  const { terminal_id } = payload;
  await sql`
    UPDATE payment_terminals
    SET status = 'active', fygaro_account_id = ${terminal_id}, updated_at = NOW()
    WHERE terminal_id = ${terminal_id}
  `;
}

async function handleTerminalSuspended(payload: any) {
  const { terminal_id, reason } = payload;
  await sql`
    UPDATE payment_terminals
    SET status = 'suspended', updated_at = NOW()
    WHERE fygaro_account_id = ${terminal_id}
  `;
  console.warn(`Terminal suspended: ${terminal_id}, reason: ${reason}`);
}

// ─── GET /api/payment/webhooks (Admin: Webhook Audit Log) ───
export async function GET(request: NextRequest) {
  try {
    // TODO: Add admin auth check
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const processed = url.searchParams.get('processed');

    let query = sql`
      SELECT id, event_type, processed, retry_count, created_at, processed_at
      FROM payment_webhooks
    `;

    if (processed !== null) {
      const isProcessed = processed === 'true';
      query = sql`
        SELECT id, event_type, processed, retry_count, created_at, processed_at
        FROM payment_webhooks
        WHERE processed = ${isProcessed}
        ORDER BY created_at DESC
        LIMIT ${Math.min(limit, 100)}
      `;
    } else {
      query = sql`
        SELECT id, event_type, processed, retry_count, created_at, processed_at
        FROM payment_webhooks
        ORDER BY created_at DESC
        LIMIT ${Math.min(limit, 100)}
      `;
    }

    const result = await query;
    return NextResponse.json({ webhooks: result });
  } catch (error: any) {
    console.error('Error fetching webhook log:', error);
    return NextResponse.json({ webhooks: [], error: error.message }, { status: 200 });
  }
}
