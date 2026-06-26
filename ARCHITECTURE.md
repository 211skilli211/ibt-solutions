# Quikr Solutions - Architecture Plan

## Project Overview
**Name**: Quikr Solutions  
**Type**: Business Platform / Web Application  
**Focus**: Caribbean & South America economies, life, and business solutions

## Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16 (React + TypeScript + Tailwind) |
| Backend | Neon PostgreSQL + Directus |
| AI | Gemini (embeddings), OpenAI/Anthropic (LLM) |
| Vector DB | Pinecone |
| Development | OpenClaw AI agents + Paperclip |

## Features (10 Total)

### Phase 1 - MVP (Current)
1. **AI Search & Knowledge** - Gemini embeddings + Pinecone vector search
2. **Document Processing** - Light Parse (PDF/spreadsheet to Markdown/JSON)
3. **API Services** - Email verification, screenshot, PDF generation
4. **Paperclip AI Company** - Autonomous agents (VPS deployment)

### Phase 2
5. **AI Influencer 3D/Avatar** - Google Flow + Room 11
6. **Geospatial Dashboard** - Google 3D Tiles, OpenSky API

### Phase 3
7. **Full Geospatial Intelligence** - CRT/NVG/FLIR shaders
8. **Simulation Engine** - Mirofish

## API Endpoints

| Service | Endpoint | Description |
|---------|----------|-------------|
| Document Processing | `POST /api/documents/process` | Parse PDF/Excel to Markdown/JSON |
| AI Search | `POST /api/ai-search/query` | Semantic search with vector DB |
| Email Verify | `POST /api/services/email/verify` | Check email deliverability |
| Email Retrieve | `POST /api/services/email/retrieve` | Find emails from domain |
| Screenshot | `POST /api/services/screenshot` | Capture website as image |
| PDF Generate | `POST /api/services/pdf` | Create PDF from data |

## Setup Instructions

### 1. Environment Variables
Copy `.env` and fill in your API keys:
```bash
cp .env.example .env
```

Required services:
- **Neon** (https://neon.tech) - PostgreSQL database
- **Google AI Studio** (https://aistudio.google.com) - Gemini API key
- **Pinecone** (https://pinecone.io) - Vector database
- **Abstract API** (https://abstractapi.com) - Email verification

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Run Development Server
```bash
pnpm dev
```

### 4. Deploy to Vercel
```bash
# Push to GitHub
git add .
git commit -m "Quikr MVP"
git push origin main

# Import project in Vercel
# Add environment variables in Vercel dashboard
```

## Directory Structure

```
/bquikr
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── page.tsx            # Homepage
│   │   ├── documents/          # Document processing UI
│   │   ├── ai-search/          # AI search UI
│   │   ├── api-services/       # API dashboard
│   │   └── api/                # API routes
│   │       ├── documents/
│   │       ├── ai-search/
│   │       └── services/
│   └── services/               # Service modules
├── public/                     # Static assets
├── .env                        # Environment variables
├── ARCHITECTURE.md             # This file
└── package.json
```

## Status
- [x] Project scaffold created
- [x] Phase 1 MVP implemented
- [ ] Environment configured
- [ ] Deployed to production

---
*Created: April 2026*