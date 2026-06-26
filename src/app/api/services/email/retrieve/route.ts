import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    {
      error: 'Not implemented',
      message: 'Email retrieval is not yet implemented. Connect to an email API (e.g. Resend, SendGrid) for production.',
      status: 'not_implemented',
    },
    { status: 501 }
  );
}
