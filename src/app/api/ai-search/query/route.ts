import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  type: 'document' | 'image' | 'video' | 'audio';
  relevance: number;
}

async function getEmbedding(text: string): Promise<number[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('Gemini API not configured');
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/embedding-001:embedContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: { parts: [{ text }] },
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to get embedding');
  }

  const data = await response.json();
  return data.embedding?.values || [];
}

async function searchPinecone(queryEmbedding: number[], typeFilter?: string) {
  const apiKey = process.env.PINECONE_API_KEY;
  const environment = process.env.PINECONE_ENVIRONMENT || 'us-east-1';
  const indexName = process.env.PINECONE_INDEX || 'quikr-knowledge';

  if (!apiKey) {
    throw new Error('Pinecone not configured');
  }

  const response = await fetch(
    `https://${indexName}-${environment}.svc.pinecone.io/vectors/query`,
    {
      method: 'POST',
      headers: {
        'Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        vector: queryEmbedding,
        topK: 10,
        includeMetadata: true,
        filter: typeFilter && typeFilter !== 'all' ? { type: { $eq: typeFilter } } : undefined,
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Pinecone query failed');
  }

  const data = await response.json();
  return data.matches || [];
}

export async function POST(request: NextRequest) {
  try {
    const { query, type = 'all' } = await request.json();

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    // Get query embedding
    const queryEmbedding = await getEmbedding(query);

    // Search vector DB
    const matches = await searchPinecone(queryEmbedding, type);

    // Format results
    const results: SearchResult[] = matches.map((match: any) => ({
      id: match.id,
      title: match.metadata?.title || 'Untitled',
      snippet: match.metadata?.snippet || '',
      type: match.metadata?.type || 'document',
      relevance: match.score || 0,
    }));

    return NextResponse.json({ results });
  } catch (error) {
    console.error('AI Search error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Search failed' },
      { status: 500 }
    );
  }
}