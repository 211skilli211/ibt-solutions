import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    {
      error: 'Not implemented',
      message: 'Inventory endpoint uses in-memory storage. Connect to the Neon inventory/products table for production.',
      status: 'not_implemented',
    },
    { status: 501 }
  );
}

export async function POST() {
  return NextResponse.json(
    { error: 'Not implemented', status: 'not_implemented' },
    { status: 501 }
  );
}
