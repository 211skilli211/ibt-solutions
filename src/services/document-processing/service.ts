export interface ParseResult {
  content: string;
  format: 'markdown' | 'json';
  metadata: {
    pageCount?: number;
    title?: string;
    author?: string;
    extractedAt: string;
  };
}

export interface ParseOptions {
  outputFormat: 'markdown' | 'json';
  ocrSensitivity?: 'low' | 'medium' | 'high';
  preserveLayout?: boolean;
}

export class DocumentProcessor {
  private baseUrl = process.env.LIGHT_PARSE_URL || 'http://localhost:3001';

  async parse(file: File | Blob, options: ParseOptions): Promise<ParseResult> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('outputFormat', options.outputFormat);
    if (options.ocrSensitivity) {
      formData.append('ocrSensitivity', options.ocrSensitivity);
    }
    formData.append('preserveLayout', String(options.preserveLayout ?? true));

    const response = await fetch(`${this.baseUrl}/parse`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Parse failed: ${response.statusText}`);
    }

    return response.json();
  }

  async parseFromUrl(url: string, options: ParseOptions): Promise<ParseResult> {
    const response = await fetch(`${this.baseUrl}/parse-url`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, ...options }),
    });

    if (!response.ok) {
      throw new Error(`Parse failed: ${response.statusText}`);
    }

    return response.json();
  }

  async parseMultiple(files: File[], options: ParseOptions): Promise<ParseResult[]> {
    const results = await Promise.all(
      files.map(file => this.parse(file, options))
    );
    return results;
  }
}

export const documentProcessor = new DocumentProcessor();