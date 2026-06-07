# Admin Dashboard & Vendor Panel — Design Overhaul Research

## Current State

**IBT Admin** (`/admin`): Basic 4-stat card layout + 4 quick action links. No sidebar, no data tables, no vendor management. Emoji icons.

**IslandHub Admin** (Express backend): Theme settings controller, site_settings DB table. No frontend admin panel built yet.

**Shared**: `site_settings` table (key/value/type), Neon DB, Express backend on Render.

---

## Reference Dashboards — What to Learn From

### Tier 1: Best-in-Class SaaS Admin (Direct Inspiration)

#### 1. **Stripe Dashboard** — Gold Standard for Financial Admin
**Why**: Clean data hierarchy, contextual actions, real-time stats, excellent empty states.
**Patterns to steal**:
- Left sidebar with collapsible sections (Balances, Payouts, Customers, Connect)
- Stat cards with sparkline mini-charts + trend indicators (% change)
- Data tables with inline actions (view, edit, suspend) — no page navigation
- Contextual header: workspace badge + account name + date range picker
- Color-coded status badges (Active, Pending, Suspended, Review)
- "Quick actions" floating button for common tasks
- Responsive: sidebar collapses to icons on tablet, hamburger on mobile

#### 2. **Vercel Dashboard** — Best for Project/Deployment Management
**Why**: Clean project cards, deployment status, analytics integration.
**Patterns to steal**:
- Project grid → detail drill-down pattern
- Status indicators with color + pulse animation for "building"
- Environment tabs (Production, Preview, Development)
- Activity feed with timeline
- Usage meters with progress bars (bandwidth, builds, functions)

#### 3. **Linear** — Best for Issue/Project Management
**Why**: Keyboard-first, minimal chrome, fast navigation.
**Patterns to steal**:
- Command palette (Cmd+K) for global search + navigation
- Sidebar with favorites, teams, projects
- Issue list with priority, status, assignee, labels
- Inline editing (click to edit without modal)
- Subtle animations, no loading spinners (optimistic UI)

#### 4. **Shopify Admin** — Best for E-commerce / Marketplace
**Why**: Direct parallel to IslandHub vendor management.
**Patterns to steal**:
- Left nav: Home, Orders, Products, Customers, Analytics, Marketing, Discounts
- Order management: filterable table, bulk actions, status workflow
- Product grid with image thumbnails, stock indicators
- Customer profiles with order history, lifetime value
- Analytics: revenue chart, top products, conversion funnel
- App integrations panel

#### 5. **MedusaJS Admin** (Open Source) — Direct Code Reference
**Why**: Open-source Node.js headless commerce, 30K+ GitHub stars.
**Patterns to steal**:
- Order management with status workflow (pending → completed → archived)
- Product CRUD with variants, images, inventory
- Customer groups with discount rules
- Region/currency management
- Built with React + Tailwind — same stack as IslandHub

### Tier 2: Marketplace-Specific Patterns

#### 6. **Airbnb Host Dashboard** — Vendor/Seller Panel
**Why**: Best-in-class for individual vendor experience.
**Patterns to steal**:
- Earnings overview with payout schedule
- Listing management with occupancy/performance metrics
- Guest/reviewer management
- Calendar view for availability
- Message center with guest communication
- Performance score with improvement tips

#### 7. **Uber Driver Dashboard** — Service Provider Panel
**Why**: Real-time status, earnings, ratings.
**Patterns to steal**:
- Online/offline toggle (big, prominent)
- Real-time earnings counter
- Rating display with breakdown
- Trip history with map preview
- Weekly goals with progress ring

#### 8. **Gumroad** — Creator/Seller Dashboard
**Why**: Simple, clean, product-focused.
**Patterns to steal**:
- Product cards with sales count, revenue
- Audience/subscriber management
- Payout history with status
- Analytics: views, conversions, top products

### Tier 3: Design System References (Already Cloned)

#### 9. **Impeccable** — Anti-Pattern Rules
- 27 anti-pattern rules to avoid
- Domain-specific typography scales
- OKLCH color space (already using)
- 4-8px grid system
- Purposeful motion with stagger timing

#### 10. **Tremor** — Dashboard Components
- Chart components (area, bar, line, pie)
- Stat cards with trend indicators
- Progress bars, badges, tables
- Built with React + Tailwind

#### 11. **shadcn/ui** — Component Primitives
- Data table with sorting, filtering, pagination
- Command palette (Cmd+K)
- Sheet/drawer for mobile nav
- Toast notifications
- Form patterns with validation

---

## Recommended Architecture

### Admin Panel Structure

```
/admin
├── /                    → Dashboard (stats, activity feed, quick actions)
├── /vendors             → Vendor management (list, approve, suspend)
├── /vendors/[id]        → Vendor detail (profile, listings, payouts, compliance)
├── /listings            → Product/service listings management
├── /orders              → Order management (all vendors)
├── /orders/[id]         → Order detail
├── /customers           → Customer management
├── /analytics           → Revenue, traffic, conversion analytics
├── /payouts             → Payout management (Fygaro integration)
├── /geospatial          → 3D settings, tileset management
├── /settings            → Site settings (theme, toggles, config)
├── /settings/3d         → 3D/GS specific settings
└── /api-keys            → API key management
```

### Vendor Panel Structure (IslandHub)

```
/vendor
├── /                    → Vendor dashboard (earnings, orders, stats)
├── /listings            → My listings (CRUD)
├── /listings/new        → Create listing
├── /listings/[id]       → Edit listing
├── /orders              → My orders
├── /orders/[id]         → Order detail / fulfillment
├── /payouts             → My payout history
├── /analytics           → My performance analytics
├── /profile             → Business profile, verification
└── /settings            → Vendor settings, notifications
```

---

## Design System Spec

### Layout
- **Sidebar**: 240px fixed left, collapsible to 64px icons
- **Header**: 56px top bar with search, notifications, profile
- **Content**: max-width 1280px, 24px padding
- **Mobile**: sidebar becomes bottom tab bar (5 items) + hamburger for rest

### Components Needed
| Component | Source | Priority |
|-----------|--------|----------|
| Sidebar nav | shadcn/ui NavigationMenu | P0 |
| Data table | shadcn/ui DataTable | P0 |
| Stat cards | Tremor StatCard | P0 |
| Charts | Tremor AreaChart/BarChart | P1 |
| Command palette | shadcn/ui Command | P1 |
| Status badges | Custom (OKLCH colors) | P0 |
| Toast notifications | shadcn/ui Toast | P1 |
| Form patterns | shadcn/ui Form + Zod | P0 |
| Date range picker | shadcn/ui Calendar + Popover | P1 |
| File upload | shadcn/ui Dropzone | P2 |
| Rich text editor | Tiptap or TipTap | P2 |

### Color Tokens (OKLCH — Caribbean Theme)
```css
/* Surface */
--surface-0: oklch(0.12 0.02 250);   /* Deep ocean bg */
--surface-1: oklch(0.18 0.02 250);   /* Card bg */
--surface-2: oklch(0.24 0.02 250);   /* Border / elevated */

/* Ink (text) */
--ink-100: oklch(0.95 0.01 250);     /* Primary text */
--ink-200: oklch(0.75 0.02 250);     /* Secondary text */
--ink-300: oklch(0.55 0.02 250);     /* Muted text */
--ink-400: oklch(0.40 0.02 250);     /* Disabled */

/* Accent */
--accent-primary: oklch(0.65 0.15 170);   /* Teal */
--accent-success: oklch(0.65 0.15 145);   /* Emerald */
--accent-warning: oklch(0.70 0.15 80);    /* Amber */
--accent-danger: oklch(0.60 0.18 25);     /* Red */
--accent-info: oklch(0.65 0.12 250);      /* Blue */
```

### Typography
- **Font**: Geist (already in IBT) + Geist Mono for data
- **Scale**: 12/14/16/20/24/32px (4px grid)
- **Weights**: 400 (body), 500 (medium), 600 (semibold), 700 (bold)

### Motion
- **Page transitions**: 150ms ease-out fade + 8px slide
- **Sidebar collapse**: 200ms ease-in-out
- **Modal/dialog**: 150ms ease-out scale(0.95→1) + fade
- **Stagger**: 30ms delay between list items
- **Reduced motion**: disable all, keep instant state changes

---

## Implementation Plan

### Phase 1: Foundation (Week 1)
1. Install `@radix-ui/*` primitives + `cmdk` (command palette)
2. Install `recharts` or `@tremor/react` for charts
3. Install `date-fns` for date formatting
4. Create layout shell: sidebar + header + content area
5. Create stat card component
6. Create data table component with sorting/filtering

### Phase 2: Admin Pages (Week 2-3)
1. Dashboard: stats, activity feed, quick actions
2. Vendor management: list, detail, approve/suspend
3. Listing management: grid/list view, bulk actions
4. Order management: table, status workflow, detail
5. Settings: site_settings CRUD UI

### Phase 3: Vendor Panel (Week 4-5)
1. Vendor dashboard shell
2. Listing CRUD with image upload
3. Order management (vendor-scoped)
4. Payout history
5. Analytics (vendor-scoped)

### Phase 4: Polish (Week 6)
1. Command palette (Cmd+K)
2. Toast notification system
3. Mobile responsive (bottom tab bar)
4. Dark/light mode toggle
5. Loading skeletons
6. Empty states with illustrations

---

## Key UX Decisions

### 1. Sidebar vs Top Nav
**Decision**: Left sidebar (240px)
**Why**: More nav items than top nav can handle. Collapsible for focus mode. Industry standard for admin (Stripe, Shopify, Vercel all use left sidebar).

### 2. Data Tables
**Decision**: shadcn/ui DataTable pattern
**Why**: Sorting, filtering, pagination, row selection, bulk actions out of the box. Server-side for large datasets.

### 3. Charts
**Decision**: Tremor (if license allows) or Recharts
**Why**: Tremor is purpose-built for dashboards, OKLCH-compatible, React + Tailwind. Recharts is free alternative.

### 4. Forms
**Decision**: React Hook Form + Zod + shadcn/ui Form
**Why**: Type-safe validation, minimal re-renders, accessible error messages.

### 5. State Management
**Decision**: Server state (React Query / SWR) + Client state (Zustand)
**Why**: Server state for DB data (vendors, orders, listings). Client state for UI (sidebar collapsed, filters, modals).

### 6. Real-time Updates
**Decision**: Polling (5s interval) for orders, SSE for notifications
**Why**: Simpler than WebSockets. Good enough for admin panel refresh rates.

---

## Vendor Onboarding Flow

```
1. Vendor registers → email verification
2. Admin reviews → approves/rejects (with reason)
3. Vendor completes profile → business info, logo, description
4. Vendor submits for verification → compliance check
5. Vendor can create listings → pending admin approval
6. Listings go live → appear in marketplace
7. Orders flow in → vendor fulfills → payout processed
```

## Compliance / Verification Checklist
- [ ] Business registration number
- [ ] Tax ID / VAT number
- [ ] Bank account for payouts
- [ ] Identity verification (owner)
- [ ] Product/service category approval
- [ ] Terms of service acceptance
- [ ] Fygaro merchant account (for payment processing)

---

## Files to Create

### Admin
- `src/app/admin/layout.tsx` — Sidebar + header layout
- `src/app/admin/page.tsx` — Dashboard
- `src/app/admin/vendors/page.tsx` — Vendor list
- `src/app/admin/vendors/[id]/page.tsx` — Vendor detail
- `src/app/admin/listings/page.tsx` — Listing management
- `src/app/admin/orders/page.tsx` — Order management
- `src/app/admin/orders/[id]/page.tsx` — Order detail
- `src/app/admin/analytics/page.tsx` — Analytics
- `src/app/admin/payouts/page.tsx` — Payout management
- `src/app/admin/settings/page.tsx` — Site settings
- `src/app/admin/settings/3d/page.tsx` — 3D/GS settings
- `src/app/admin/api-keys/page.tsx` — API key management

### Vendor Panel
- `src/app/vendor/layout.tsx` — Vendor sidebar + header
- `src/app/vendor/page.tsx` — Vendor dashboard
- `src/app/vendor/listings/page.tsx` — My listings
- `src/app/vendor/listings/new/page.tsx` — Create listing
- `src/app/vendor/listings/[id]/page.tsx` — Edit listing
- `src/app/vendor/orders/page.tsx` — My orders
- `src/app/vendor/payouts/page.tsx` — Payout history
- `src/app/vendor/analytics/page.tsx` — My analytics
- `src/app/vendor/profile/page.tsx` — Business profile

### Shared Components
- `src/components/admin/Sidebar.tsx`
- `src/components/admin/Header.tsx`
- `src/components/admin/StatCard.tsx`
- `src/components/admin/DataTable.tsx`
- `src/components/admin/StatusBadge.tsx`
- `src/components/admin/SearchCommand.tsx`
- `src/components/admin/ActivityFeed.tsx`
- `src/components/admin/DateRangePicker.tsx`
- `src/components/admin/EmptyState.tsx`
- `src/components/admin/LoadingSkeleton.tsx`

### API Routes
- `src/app/api/admin/vendors/route.ts` — List/create vendors
- `src/app/api/admin/vendors/[id]/route.ts` — Get/update/delete vendor
- `src/app/api/admin/vendors/[id]/approve/route.ts` — Approve vendor
- `src/app/api/admin/vendors/[id]/suspend/route.ts` — Suspend vendor
- `src/app/api/admin/listings/route.ts` — List/create listings
- `src/app/api/admin/orders/route.ts` — List/create orders
- `src/app/api/admin/analytics/route.ts` — Analytics data
- `src/app/api/admin/payouts/route.ts` — Payout management
- `src/app/api/vendor/listings/route.ts` — Vendor-scoped listings
- `src/app/api/vendor/orders/route.ts` — Vendor-scoped orders
- `src/app/api/vendor/analytics/route.ts` — Vendor-scoped analytics
- `src/app/api/vendor/payouts/route.ts` — Vendor-scoped payouts
