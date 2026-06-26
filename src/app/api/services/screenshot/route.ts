import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, width = 1920, height = 1080 } = body;

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const apiKey = process.env.ABSTRACT_SCREENSHOT_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ 
        error: 'Screenshot API not configured',
        setup: 'Get API key from https://abstractapi.com'
      }, { status: 500 });
    }

    // Abstract API screenshot endpoint
    const response = await fetch(
      `https://screenshotapi.net/api/v1/screenshot?api_key=${apiKey}&url=${encodeURIComponent(url)}&width=${width}&height=${height}&output=json`,
      { method: 'POST' }
    );

    if (!response.ok) {
      throw new Error('Screenshot service error');
    }

    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      url: data.screenshot,
      originalUrl: url,
      dimensions: { width, height },
    });
  } catch (error) {
    console.error('Screenshot error:', error);
    return NextResponse.json({ error: 'Screenshot failed' }, { status: 500 });
  }
}