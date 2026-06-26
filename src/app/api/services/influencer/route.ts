import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    {
      error: 'Not implemented',
      message: 'Influencer video generation is not yet implemented. Use a video generation API (e.g. Runway, Pika) for production.',
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
