import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const apiKey = process.env.ABSTRACT_EMAIL_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ 
        error: 'Email verification API not configured',
        setup: 'Get API key from https://abstractapi.com'
      }, { status: 500 });
    }

    const response = await fetch(
      `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${encodeURIComponent(email)}`
    );

    if (!response.ok) {
      throw new Error('Verification service error');
    }

    const data = await response.json();
    
    return NextResponse.json({
      valid: data.is_valid_format?.value === true,
      status: data.is_valid_format?.value === true ? 'deliverable' : 'invalid',
      email,
      risk: data.is_disposable?.value ? 'high' : 'low',
      details: {
        formatValid: data.is_valid_format?.value,
        disposable: data.is_disposable?.value,
        deliverable: data.is_deliverable?.value,
      },
    });
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}