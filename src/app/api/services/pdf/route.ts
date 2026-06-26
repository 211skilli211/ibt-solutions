import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  return NextResponse.json(
    {
      error: 'Not implemented',
      message: 'PDF generation is not yet implemented. Use /api/documents/process for document processing instead.',
      status: 'not_implemented'
    },
    { status: 501 }
  );
}