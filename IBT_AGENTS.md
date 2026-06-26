# IBT Solutions - Agent Instructions

## Project Overview

IBT Solutions (Island Bridge Trade) is a Caribbean-focused API-as-a-service platform and business solutions provider. It's part of an ecosystem of companies designed to promote positive trade and standards of living through technological advancement, artificial and human intelligence.

**Core Services:**
- AI Digital Influencer (with voice cloning)
- Business APIs (data conversion, accounting, inventory)
- Geospatial Intelligence (mapping, tourism, marine data)
- B2B Connectivity

**Brand Identity:**
- Colors: Ocean blue (#0066CC), Sunset orange (#FF6B35), Palm green (#2D5A27), Coral (#FF6B6B), Turquoise (#40E0D0)
- Vibe: Tropical premium, professional but welcoming
- Target: Caribbean SMEs and offshore agencies (UK, US, Canada)

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS
- **Database**: Neon PostgreSQL (shared with IslandHub via platform column)
- **APIs**: REST endpoints with API key authentication

## Architecture

### Microservices Approach
- Core services separated into API routes
- API key/tier management via `ibt_subscriptions` table
- Usage tracking via `ibt_api_usage` table

### Database Schema (Shared with IslandHub)
```sql
-- Platform column distinguishes data sources:
-- 'marketplace' = IslandHub data
-- 'ibt_solutions' = IBT Solutions data

-- IBT-specific tables:
ibt_subscriptions  -- API keys and tier management
ibt_api_usage     -- Usage tracking
ibt_locations     -- Geospatial data (shared with marketplace)
ibt_pois          -- Tourism points of interest
ibt_marine_conditions  -- Beach/water conditions
ibt_weather_cache -- Weather data cache
```

### File Structure
```
bquikr/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── page.tsx      # Landing page
│   │   ├── tools/        # Tools/services page
│   │   ├── api-services/ # API services dashboard
│   │   ├── influencer/   # AI Digital Influencer
│   │   ├── geospatial/  # Geospatial dashboard
│   │   └── api/         # API endpoints
│   ├── lib/             # Utilities, database client
│   └── components/      # Reusable components
├── migrations/          # SQL migrations
└── .env                 # Environment variables
```

## Page Guidelines

### Landing Page (/page.tsx)
- Services showcase with image cards
- Partner ecosystem (IslandHub, CTC Marketplace, Graphic Trends, IBT Financial, Eloh Processing)
- IslandHub marketplace feature section
- Dark theme with gradient accents

### Tools Page (/tools)
- Business APIs: Data→Spreadsheet, Accounting, Inventory
- Communication: SMS, Email (future)
- Document processing: PDF, Screenshot
- Verification: Email verify/retrieve

### API Services Dashboard (/api-services)
- List of available APIs with documentation
- Pricing/tier information
- API key management interface

### AI Digital Influencer (/influencer)
- Multi-step form for profile creation
- Voice cloning configuration
- Caribbean accent selection
- Platform selection (Instagram, TikTok, YouTube, etc.)

### Geospatial Dashboard (/geospatial)
- Interactive map (CesiumJS or Leaflet)
- Multiple visual modes: Standard, Commerce, Eco-Alert, Night, FLIR
- Layer system: Vendors, POIs, Marine, Weather
- Vendor auto-listing from marketplace
- Day/night mode

## API Endpoints

All APIs follow REST conventions and require API key authentication.

| Endpoint | Service |
|----------|---------|
| `GET /api/services/conversion` | Data → Spreadsheet |
| `GET /api/services/accounting` | Invoice generation |
| `GET /api/services/inventory` | Stock management |
| `GET /api/services/pdf` | PDF generation |
| `GET /api/services/screenshot` | Website screenshots |
| `GET /api/services/email/verify` | Email verification |
| `GET /api/services/email/retrieve` | Email info retrieval |
| `POST /api/services/influencer` | AI Influencer creation |
| `GET /api/pois` | Points of interest |
| `GET /api/marine` | Marine conditions |
| `GET /api/weather` | Weather data |

## Geospatial Features

### Map Modes (per IslandHub prompt)
1. **Standard Day**: Regular map view
2. **Commerce**: Vendor markers, store locations
3. **Eco-Alert**: Sargassum, hurricane overlays
4. **Night Vision (NVG)**: Green-amplified shader
5. **FLIR**: Thermal imaging mode

### Data Layers
- **Vendors**: From marketplace stores (auto-listed on paid tiers)
- **POIs**: Tourism points (waterfalls, beaches, restaurants)
- **Marine**: Water temp, wave height, visibility, safety flags
- **Weather**: Caribbean forecasts, hurricane alerts

### Tourism APIs to Build
- POI Discovery API
- Marine Conditions API
- Weather API
- Currency Exchange API
- Event/Festival API

## Design Guidelines

See `DESIGN.md` for visual system. Key points:
- Use custom Caribbean-inspired color palette
- Support multiple theme modes
- Mobile-first responsive
- Professional, developer-focused for API docs

## Internal Tools Integration

IBT Solutions connects to internal tools:
- **Paperclip**: Agent orchestration for automation
- **MiroFish**: Simulation/prediction engine
- **Hermes**: Autonomous agent with persistent memory
- **Unsloth**: LLM fine-tuning

These run on separate infrastructure (user's laptop via Tailscale). Dashboard at `/internal` monitors their status.

## Environment Variables

```
DATABASE_URL=postgresql://neondb_owner:...@ep-...neon.tech/neondb
```

## Security

- API key required for all service endpoints
- Tier-based rate limiting
- Input validation with Zod
- SQL injection prevention via parameterized queries
- Helmet.js security headers