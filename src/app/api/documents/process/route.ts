import { NextRequest, NextResponse } from 'next/server';
import { writeFile, unlink, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export const dynamic = 'force-dynamic';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

async function processWithLightParse(filePath: string, outputFormat: string) {
  const lightParseUrl = process.env.LIGHT_PARSE_URL;
  
  if (!lightParseUrl) {
    throw new Error('Light Parse not configured');
  }

  const fileContent = await fetch(`file://${filePath}`).then(r => r.arrayBuffer());
  const formData = new FormData();
  formData.append('file', new Blob([fileContent]));
  formData.append('outputFormat', outputFormat);

  const response = await fetch(`${lightParseUrl}/parse`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Light Parse error: ${response.statusText}`);
  }

  return response.json();
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const format = (formData.get('format') as string) || 'markdown';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const allowedExtensions = ['.pdf', '.xlsx', '.xls', '.csv', '.doc', '.docx'];
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!allowedExtensions.includes(ext)) {
      return NextResponse.json({ error: 'File type not supported' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const uploadDir = join(process.cwd(), 'tmp');
    
    // Ensure tmp directory exists
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }
    
    const filename = `${generateId()}-${file.name}`;
    const filePath = join(uploadDir, filename);
    
    await writeFile(filePath, buffer);

    const result = await processWithLightParse(filePath, format);

    await unlink(filePath).catch(() => {});

    return NextResponse.json(result);
  } catch (error) {
    console.error('Document processing error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process document' },
      { status: 500 }
    );
  }
}