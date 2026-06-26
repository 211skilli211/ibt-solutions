import { NextRequest, NextResponse } from 'next/server';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';

export const dynamic = 'force-dynamic';

async function parseToSpreadsheet(data: any, format: string): Promise<any> {
  // Parse various data formats and convert to spreadsheet
  let rows: any[][] = [];
  let headers: string[] = [];

  if (Array.isArray(data)) {
    if (data.length > 0) {
      if (typeof data[0] === 'object' && !Array.isArray(data[0])) {
        headers = Object.keys(data[0]);
        rows = data.map((item: any) => headers.map(h => item[h]));
      } else if (Array.isArray(data[0])) {
        rows = data;
      } else {
        rows = data.map((v: any) => [v]);
      }
    }
  } else if (typeof data === 'object') {
    headers = Object.keys(data);
    rows = [headers, ...headers.map((h: string) => data[h])];
  }

  // Convert to requested format
  if (format === 'csv') {
    const csv = [
      headers.join(','),
      ...rows.map((row: any[]) => row.map((cell: any) => 
        typeof cell === 'string' && cell.includes(',') ? `"${cell}"` : cell
      ).join(','))
    ].join('\n');
    return { format: 'csv', content: csv, mimeType: 'text/csv' };
  }

  // Default to JSON with spreadsheet structure
  return {
    format: 'json',
    data: { headers, rows },
    rowCount: rows.length
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data, format = 'csv', filename = 'export' } = body;

    if (!data) {
      return NextResponse.json({ error: 'No data provided' }, { status: 400 });
    }

    const result = await parseToSpreadsheet(data, format);
    
    // Generate downloadable content
    const content = result.content || JSON.stringify(result.data, null, 2);
    const filenameFinal = `${filename}.${result.format === 'csv' ? 'csv' : 'json'}`;

    return NextResponse.json({
      success: true,
      filename: filenameFinal,
      content: content.substring(0, 10000), // Limit preview
      stats: {
        rows: result.rowCount || 0,
        format: result.format
      }
    });

  } catch (error) {
    console.error('Conversion error:', error);
    return NextResponse.json(
      { error: 'Failed to convert data' },
      { status: 500 }
    );
  }
}