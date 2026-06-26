# IslandHub - Agent Instructions

## Project Overview

IslandHub is a comprehensive Caribbean-focused multi-vendor marketplace platform consisting of:
- **Marketplace**: Multi-vendor e-commerce with products, services, campaigns
- **Vendor Stores**: Food kitchens, restaurants, shops, service providers
- **Rentals Hub**: Apartments, vehicles (cars/motorbikes), sea vehicles (boats/jetskis), equipment (tools/gear)
- **Transport**: Taxi, delivery, pickup services
- **Auctions**: "Sudden Death" style auctions inspired by WhatNot
- **Community**: Social platform (Feed, Business, Groups, Stories, Events, Jobs, Map)
- **Campaigns**: Crowdfunding/pledges

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS
- **Backend**: Express/Node.js, PostgreSQL with PostGIS + pgvector
- **Real-time**: WebSocket + Redis Pub/Sub
- **Auth**: JWT-based with role system

## Build Patterns

### File Organization
```
islandhub/
├── web/                  # Next.js frontend
│   ├── src/
│   │   ├── app/         # App Router pages
│   │   ├── components/  # Reusable components
│   │   ├── lib/         # Utilities, API client
│   │   └── hooks/       # Custom React hooks
│   └── public/          # Static assets
├── server/              # Express backend
│   ├── src/
│   │   ├── routes/      # API routes
│   │   ├── services/    # Business logic
│   │   ├── middleware/  # Express middleware
│   │   ├── models/      # Database models
│   │   └── lib/         # Utilities
│   └── migrations/      # SQL migrations
```

### Component Structure
- Use `page.tsx` for Next.js pages (App Router)
- Use `components/` for reusable UI
- Follow co-location pattern: keep component files near their usage
- Use TypeScript strictly - no `any` without comment

### Database Patterns
- Use PostGIS for geospatial queries
- Use pgvector for semantic search
- Follow naming: `snake_case` for tables/columns
- Always use parameterized queries (no string interpolation for SQL)

### API Design
- RESTful endpoints
- Return consistent JSON structure
- Use proper HTTP status codes
- Implement rate limiting on sensitive endpoints

## Platform-Specific Guidelines

### Vendor Stores
- Support multiple store types: food kitchens, restaurants, shops, service providers
- Each store has: branding, menu/products, orders, promotions, reviews
- Delivery and shipping options per store

### Rentals Hub Categories
- **Accommodations**: Apartments, studios, villas
- **Vehicles**: Cars, motorbikes
- **Sea Vehicles**: Boats, jet skis, paddleboards
- **Equipment**: Tools, adventure gear, party equipment

### Transport Services
- Taxi: Point-to-point transport
- Delivery: Package/goods delivery
- Pickup: Curbside pickup

### Auctions
- "Sudden Death" style: countdown timer extends on last-second bids
- Live bidding with real-time updates
- Social shopping experience

### Community Sections
- Feed: Social posts, photos, stories
- Business: Business networking
- Groups: Community groups
- Stories: Long-form content
- Events: Local events
- Jobs: Employment listings
- Map: Location-based discovery

## Design System

See `DESIGN.md` for visual guidelines. Key principles:
- Tropical premium aesthetic (Caribbean-inspired)
- Support for multiple theme variations beyond dark/light
- Mobile-first responsive design
- Accessible components (WCAG 2.1 AA)

## Security Requirements

- All user input must be validated (use Zod schemas)
- Implement CSRF protection
- Use parameterized queries (prevent SQL injection)
- Sanitize user inputs (prevent XSS)
- Rate limit public endpoints
- Use Helmet.js security headers

## Performance Guidelines

- Use Redis for caching frequently accessed data
- Implement database connection pooling
- Use proper indexes on frequently queried columns
- Optimize images (next/image)
- Implement lazy loading for heavy components
- Use proper pagination for list endpoints

## Testing Requirements

- Write unit tests for services and utilities
- Write integration tests for API endpoints
- Use Playwright for E2E testing
- Maintain 60% code coverage minimum

## Common Tasks

### Adding a New Store Type
1. Add type to `store_types` enum in database
2. Create store-specific dashboard components
3. Add relevant listing categories
4. Update UI components for new store features

### Adding a New Rental Category
1. Add category to `rental_categories` table
2. Create category-specific listing form
3. Add filtering/search options
4. Update rental page UI

### Adding Community Feature
1. Create database table for feature data
2. Add API routes for CRUD operations
3. Build frontend components
4. Add to community navigation

## Environment Variables

Required in `server/.env`:
```
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=...
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
ZEROCLAW_GATEWAY_URL=http://localhost:3001
OPENROUTER_API_KEY=...
```

---

## ZeroClaw Integration

IslandHub uses ZeroClaw for AI agent orchestration. See `/islandhub/zeroclaw/config.toml` for configuration.

### ZeroClaw Agents Defined

| Agent | Purpose | Model |
|-------|---------|-------|
| **directory_manager** | Vendor application review, KYB compliance | Claude Sonnet 4 |
| **admin_console** | Emergency admin operations (requires pairing) | Claude Opus 4 |
| **vendor_helper** | Vendor onboarding & technical support | Claude Sonnet 4 |
| **marketplace_auditor** | Listing audits, fraud detection, compliance | Claude Sonnet 4 |
| **customer_service** | Customer support, product search, orders | Claude Sonnet 4 |

### ZeroClaw Cron Jobs

Configured in `zeroclaw/config.toml`:

| Job | Schedule | Agent | Purpose |
|-----|-----------|-------|---------|
| daily_listings_audit | 0 2 * * * (2 AM daily) | marketplace_auditor | Comprehensive listing audit |
| fraud_check | 0 */6 * * * (every 6 hours) | marketplace_auditor | Transaction fraud detection |
| price_monitor | 0 */4 * * * (every 4 hours) | marketplace_auditor | Price anomaly detection |
| vendor_compliance | 0 1 * * * (1 AM daily) | directory_manager | Vendor application review |

### ZeroClaw API Endpoints

Server-side endpoints in `server/src/routes/agentRoutes.ts`:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/agent/chat` | POST | General agent chat |
| `/api/agent/chat-with-memory` | POST | Chat with memory context |
| `/api/agent/command` | POST | Send command to specific agent |
| `/api/agent/agents` | GET | List available agents |
| `/api/agent/memory/sync` | GET | Trigger ZeroClaw memory sync |

### ZeroClaw Health Check

- Gateway health: `GET /health` on ZeroClaw gateway (port 3001)
- Fallback: If ZeroClaw unavailable, system uses direct LLM (OpenRouter)

### Connecting to ZeroClaw

1. Start ZeroClaw gateway: `cd /islandhub/zeroclaw && ./zeroclaw`
2. Gateway runs on `http://localhost:3001`
3. Server routes check gateway health before routing requests
4. If gateway offline, falls back to OpenRouter direct

### Adding New ZeroClaw Agents

1. Add agent config to `zeroclaw/config.toml`:
```toml
[agents.your_agent]
name = "Your Agent Name"
model = "anthropic/claude-sonnet-4"
system_prompt = "..."
allowed_tools = ["http_request", "file_read"]
```

2. Add cron job if needed:
```toml
[[cron.jobs]]
name = "your_job_name"
schedule = "0 * * * *"  # hourly
agent = "your_agent"
prompt = "What to do..."
```

3. Add API endpoint in `server/src/routes/agentRoutes.ts` if needed