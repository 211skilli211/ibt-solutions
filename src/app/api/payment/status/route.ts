/**
 * Payment Gateway Status API
 * 
 * GET /api/payment/status — check if payment gateway is configured
 */

import { NextResponse } from 'next/server';

export async function GET() {
  const hasFygaro = !!(process.env.FYARGO_API_KEY && process.env.FYARGO_API_URL);

  return NextResponse.json({
    gateway_configured: hasFygaro,
    gateway: hasFygaro ? 'fygaro' : null,
    environment: process.env.NODE_ENV,
    message: hasFygaro
      ? 'Payment gateway is configured and active'
      : 'Payment gateway not configured. Set FYARGO_API_KEY and FYARGO_API_URL environment variables. Transactions will be created but not processed until gateway is connected.',
  });
}
