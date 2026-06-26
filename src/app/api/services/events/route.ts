import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(
    {
      error: 'Not implemented',
      message: 'Events endpoint returns hardcoded mock data. Connect to the Neon events table for production use.',
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
