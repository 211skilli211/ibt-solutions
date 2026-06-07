# Admin Dashboard & Vendor Panel — Design Spec

> Designed using: Unified Design System (Impeccable + Taste Skill + Perception-First), UI-UX-Pro-Max, Stripe/Vercel/Shopify/MedusaJS reference patterns, OKLCH Caribbean palette.

---

## Design Philosophy

**Perception-First diagnostic** applied to admin:
- **L0 (Visual Noise)**: Admin has HIGH data density. Reduce chrome, not data. Every pixel earns its place.
- **L1 (Focal Hierarchy)**: Stats → Table → Detail. Eye lands on KPIs first, then actionable rows.
- **L2 (Trust Rhythm)**: Consistent 4px grid, predictable patterns, status colors always mean the same thing.
- **L3 (Value Prop)**: "What needs attention?" — surface pending approvals, flagged items, anomalies.
- **L4 (Arousal)**: Feels powerful, not cluttered. Dark mode default (OLED), subtle motion, confident typography.

**UI-UX-Pro-Max recommendation**: Marketplace (P2P) → Vibrant & Block-based + Flat Design + Trust & Authority. Dashboard: E-commerce Analytics. Colors: Trust + Category + Success green.

**Anti-slop enforcement**: All 27 Impeccable rules apply. No Inter. No pure gray. No cards-in-cards. No 100vh on mobile. No nested backdrop-filter.

---

## Layout Architecture

### Admin Shell
```
┌─────────────────────────────────────────────────────────────┐
│ HEADER (56px)                                                │
│ [Logo] [Search ⌘K] [...] [Notifications] [Avatar ▾]         │
├──────────┬──────────────────────────────────────────────────┤
│ SIDEBAR  │ CONTENT AREA                                     │
│ (240px)  │ max-width: 1280px, padding: 24px                 │
│          │                                                   │
│ ▸ Home   ┌─────────────────────────────────────────────────┐│
│   Stats  │ PAGE HEADER                                     ││
│   Charts │ Title + Breadcrumb + Actions                    ││
│          ├─────────────────────────────────────────────────┤│
│ ▸ Manage │                                                 ││
│   Vendors│ STAT ROW (4 cards)                              ││
│   Listings│ [Stat1] [Stat2] [Stat3] [Stat4]               ││
│   Orders │                                                 ││
│   Customers├─────────────────────────────────────────────────┤│
│          │                                                 ││
│ ▸ Finance│ DATA TABLE                                      ││
│   Payouts│ [Filters] [Search] [Bulk ▾] [+ New]            ││
│   Analytics│ ┌───────────────────────────────────────────┐ ││
│          │ │ ☐ │ Name    │ Status │ Date   │ Actions   │ ││
│ ▸ System │ ├───┼─────────┼────────┼────────┼───────────┤ ││
│   Settings│ ☐ │ Vendor A│ ● Active│ Jun 7  │ View Edit │ ││
│   3D/GS │ ☐ │ Vendor B│ ○ Pend  │ Jun 6  │ View Edit │ ││
│   API Keys│ ☐ │ Vendor C│ ● Active│ Jun 5  │ View Edit │ ││
│          │ └───┴─────────┴────────┴────────┴───────────┘ ││
│          │ [← 1 2 3 →] Showing 1-25 of 156               ││
│          └─────────────────────────────────────────────────┘│
└──────────┴──────────────────────────────────────────────────┘
```

### Vendor Panel Shell
```
┌─────────────────────────────────────────────────────────────┐
│ VENDOR HEADER (56px)                                         │
│ [Store Name ▾] [Earnings Today $0.00] [Online ●] [Avatar]  │
├──────────┬──────────────────────────────────────────────────┤
│ VENDOR   │ CONTENT AREA                                     │
│ SIDEBAR  │                                                   │
│ (200px)  │                                                   │
│          │                                                   │
│ ▸ Dashboard│                                                 │
│   Listings│                                                  │
│   Orders │                                                   │
│   Payouts│                                                   │
│   Analytics│                                                 │
│   Profile│                                                   │
│   Settings│                                                  │
│          │                                                   │
│ ─────── │                                                   │
│ [Help]  │                                                   │
│ [Logout]│                                                   │
└──────────┴──────────────────────────────────────────────────┘
```

### Mobile (≤768px)
- Sidebar → bottom tab bar (5 items: Home, Listings, Orders, Payouts, More)
- Header → hamburger menu + search icon
- Tables → card layout (each row becomes a card)
- Stats → 2x2 grid → scrollable horizontal

---

## OKLCH Color Tokens (Caribbean Admin)

```css
/* === SURFACES (dark mode default) === */
--color-ground:      oklch(0.07 0.006 250);   /* Page bg — deep ocean */
--color-deep:        oklch(0.04 0.004 250);   /* Deepest inset */
--color-raised:      oklch(0.11 0.006 250);   /* Card bg */
--color-raised-2:    oklch(0.15 0.008 250);   /* Elevated card */
--color-overlay:     oklch(0.18 0.008 250);   /* Modal/drawer bg */

/* === BORDERS === */
--color-border:      oklch(0.22 0.008 250);   /* Default border */
--color-border-strong: oklch(0.28 0.008 250); /* Hover/focus border */

/* === INK (text) === */
--color-ink-100:     oklch(0.95 0.01 250);    /* Headline */
--color-ink-200:     oklch(0.85 0.01 250);    /* Body */
--color-ink-300:     oklch(0.65 0.02 250);    /* Secondary */
--color-ink-400:     oklch(0.45 0.02 250);    /* Muted */
--color-ink-500:     oklch(0.30 0.02 250);    /* Disabled */

/* === ACCENT (Caribbean teal) === */
--color-accent:          oklch(0.65 0.15 170);    /* Primary teal */
--color-accent-hover:    oklch(0.70 0.15 170);    /* Hover */
--color-accent-muted:    oklch(0.25 0.05 170);    /* Muted bg */
--color-accent-ink:      oklch(0.95 0.02 170);    /* On accent */

/* === SEMANTIC === */
--color-success:         oklch(0.65 0.15 145);    /* Emerald */
--color-success-muted:   oklch(0.20 0.05 145);
--color-success-ink:     oklch(0.95 0.02 145);

--color-warning:         oklch(0.70 0.15 80);     /* Amber */
--color-warning-muted:   oklch(0.20 0.05 80);
--color-warning-ink:     oklch(0.95 0.02 80);

--color-danger:          oklch(0.60 0.18 25);     /* Red */
--color-danger-muted:    oklch(0.20 0.05 25);
--color-danger-ink:      oklch(0.95 0.02 25);

--color-info:            oklch(0.65 0.12 250);    /* Blue */
--color-info-muted:      oklch(0.20 0.05 250);
--color-info-ink:        oklch(0.95 0.02 250);

/* === STATUS BADGES === */
--status-active-bg:      var(--color-success-muted);
--status-active-text:    var(--color-success);
--status-pending-bg:     var(--color-warning-muted);
--status-pending-text:   var(--color-warning);
--status-suspended-bg:   var(--color-danger-muted);
--status-suspended-text: var(--color-danger);
--status-review-bg:      var(--color-info-muted);
--status-review-text:    var(--color-info);
```

### Light Mode Variant
```css
--color-ground:      oklch(0.97 0.003 250);
--color-deep:        oklch(0.94 0.003 250);
--color-raised:      oklch(1.00 0.000 250);    /* Pure white cards */
--color-raised-2:    oklch(0.98 0.002 250);
--color-border:      oklch(0.88 0.005 250);
--color-ink-100:     oklch(0.12 0.01 250);
--color-ink-200:     oklch(0.25 0.01 250);
--color-ink-300:     oklch(0.45 0.02 250);
--color-ink-400:     oklch(0.60 0.02 250);
--color-ink-500:     oklch(0.75 0.02 250);
```

---

## Typography

```css
/* Font stack */
--font-sans:    "Geist", "Albert Sans", system-ui, sans-serif;
--font-mono:    "Geist Mono", "JetBrains Mono", monospace;
--font-display: "Cabinet Grotesk", "Geist", sans-serif;

/* Scale (4px grid) */
--text-xs:      0.75rem;   /* 12px — badges, timestamps */
--text-sm:      0.875rem;  /* 14px — secondary text, table cells */
--text-base:    1.0rem;    /* 16px — body */
--text-lg:      1.125rem;  /* 18px — section headers */
--text-xl:      1.25rem;   /* 20px — page titles */
--text-2xl:     1.5rem;    /* 24px — stat values */
--text-3xl:     1.875rem;  /* 30px — hero stats */

/* Weights */
--weight-normal:   400;
--weight-medium:   500;
--weight-semibold: 600;
--weight-bold:     700;

/* Line heights */
--leading-tight:   1.25;   /* Headings */
--leading-normal:  1.5;    /* Body */
--leading-relaxed: 1.75;   /* Descriptions */
```

---

## Component Specs

### 1. Stat Card
```
┌─────────────────────────────────┐
│ [Icon] Label                    │
│ 1,247                           │  ← text-2xl, weight-bold, accent color
│ ↑ 12% from last month           │  ← text-xs, success/warning color
└─────────────────────────────────┘

Props:
- icon: ReactNode (Lucide icon)
- label: string
- value: string | number
- change?: { value: number, period: string }  // +12% from last month
- trend?: 'up' | 'down' | 'neutral'
- color?: 'accent' | 'success' | 'warning' | 'danger' | 'info'
```

### 2. Data Table
```
┌──────────────────────────────────────────────────────────────┐
│ [Filters] [Search...] [Bulk ▾]                    [+ New]   │
├────┬──────────┬──────────┬──────────┬──────────┬────────────┤
│ ☐  │ Name  ▾  │ Status   │ Date  ▾  │ Amount   │ Actions    │
├────┼──────────┼──────────┼──────────┼──────────┼────────────┤
│ ☐  │ Vendor A │ ● Active │ Jun 7    │ $1,247   │ [View][⋯]  │
│ ☐  │ Vendor B │ ○ Pend   │ Jun 6    │ $834     │ [View][⋯]  │
│ ☐  │ Vendor C │ ● Active │ Jun 5    │ $2,103   │ [View][⋯]  │
├────┴──────────┴──────────┴──────────┴──────────┴────────────┤
│ Showing 1-25 of 156                    [← 1 2 3 4 5 →]     │
└──────────────────────────────────────────────────────────────┘

Features:
- Column sorting (click header)
- Row selection (checkbox) with bulk actions
- Search (debounced 300ms)
- Filters (status, date range, category)
- Pagination (25/50/100 per page)
- Inline actions (View, Edit, Suspend)
- Mobile: card layout
```

### 3. Status Badge
```
● Active     → bg: success-muted, text: success, dot: success
○ Pending    → bg: warning-muted, text: warning, dot: warning
◉ Suspended  → bg: danger-muted, text: danger, dot: danger
◌ In Review  → bg: info-muted, text: info, dot: info

Size: text-xs (12px), padding: 2px 8px, radius: 9999px (pill)
```

### 4. Sidebar Nav
```
┌──────────────────────┐
│ [Logo] Admin         │  ← 48px height, brand color
├──────────────────────┤
│                      │
│ ▸ Home               │  ← text-sm, icon + label
│   Dashboard          │
│   Analytics          │
│                      │
│ ▸ Manage             │  ← Section header: text-xs, uppercase, ink-400
│   Vendors            │  ← Active: accent bg + text
│   Listings           │     Inactive: transparent + ink-300
│   Orders             │     Hover: raised bg + ink-200
│   Customers          │
│                      │
│ ▸ Finance            │
│   Payouts            │
│   Transactions       │
│                      │
│ ▸ System             │
│   Settings           │
│   3D / Geospatial    │
│   API Keys           │
│                      │
├──────────────────────┤
│ [User] Name          │  ← Bottom: user info + logout
│ [Logout]             │
└──────────────────────┘

Width: 240px (expanded) / 64px (collapsed, icons only)
Background: ground
Border-right: border
```

### 5. Header Bar
```
┌──────────────────────────────────────────────────────────────┐
│ [≡] [Logo]  [Search... ⌘K]        [🔔 3] [Avatar ▾]        │
└──────────────────────────────────────────────────────────────┘

Height: 56px
Background: ground
Border-bottom: border
Position: sticky, top: 0, z-index: 50

Search: Cmd+K opens command palette
Notifications: badge count, dropdown panel
Avatar: name, email, logout
```

### 6. Command Palette (Cmd+K)
```
┌──────────────────────────────────────┐
│ ⌘ K  Search commands...             │
├──────────────────────────────────────┤
│ Recent                               │
│   View Vendor #1234                  │
│   Create New Listing                 │
│                                      │
│ Navigation                           │
│   Go to Dashboard                    │
│   Go to Vendors                      │
│   Go to Orders                       │
│   Go to Settings                     │
│                                      │
│ Actions                              │
│   Create Vendor                      │
│   Create Listing                     │
│   Run Payout                         │
│   Toggle 3D View                     │
└──────────────────────────────────────┘

Implementation: cmdk (shadcn/ui)
Width: 640px, max-height: 400px
Background: overlay, border, shadow-2xl
```

### 7. Modal / Dialog
```
┌──────────────────────────────────────┐
│ Title                           [×]  │
├──────────────────────────────────────┤
│                                      │
│  Form content...                     │
│  [Input]                             │
│  [Select]                            │
│  [Textarea]                          │
│                                      │
├──────────────────────────────────────┤
│                    [Cancel] [Save]   │
└──────────────────────────────────────┘

Background: overlay
Border: border
Radius: 12px (rounded-xl)
Shadow: 2xl
Animation: fade-in 150ms + scale(0.95→1)
Backdrop: bg-black/60, backdrop-blur-sm
```

### 8. Toast Notifications
```
┌──────────────────────────────────────┐
│ ✓ Vendor approved successfully      │  ← success: emerald
│                                      │
│ ⚠ 3 vendors pending review          │  ← warning: amber
│                                      │
│ ✕ Failed to process payout          │  ← danger: red
│                                      │
│ ℹ New order received                │  ← info: blue
└──────────────────────────────────────┘

Position: bottom-right, stack vertically
Duration: 5s auto-dismiss, pause on hover
Animation: slide-in-right 200ms
```

### 9. Loading Skeletons
```
Stat Card:
┌─────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░                │
│ ░░░░░░░░░░░░░░░░░░░░░░          │
│ ░░░░░░░░░░░░░░                  │
└─────────────────────────────────┘

Table Row:
┌──────────────────────────────────────────────────────────────┐
│ ░░░░ │ ░░░░░░░░░░ │ ░░░░░░░░ │ ░░░░░░░░ │ ░░░░░░ │ ░░░░░░ │
└──────────────────────────────────────────────────────────────┘

Implementation: ShimmerCard (custom)
Animation: shimmer 1.5s infinite linear
Background: raised → raised-2 gradient shimmer
```

### 10. Empty States
```
┌──────────────────────────────────────┐
│                                      │
│           [Illustration]             │
│                                      │
│       No vendors yet                 │  ← text-lg, ink-100
│                                      │
│  Get started by inviting your first  │  ← text-sm, ink-300
│  vendor to the platform.             │
│                                      │
│       [+ Invite Vendor]              │  ← btn-primary
│                                      │
└──────────────────────────────────────┘

Illustration: custom SVG or Lucide icon (large, muted)
```

---

## Page Specs

### Admin Dashboard (Home)
```
┌──────────────────────────────────────────────────────────────┐
│ Dashboard                                                    │
│ Admin / Overview                                             │
│                                                 [+ Quick ▾]  │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ [👥 156]  [📦 1,247]  [💰 $45.2K]  [⚠ 3]                 │
│ Vendors   Listings    Revenue     Pending                    │
│ ↑ 12%     ↑ 8%       ↑ 23%       ↓ 2                      │
│                                                              │
├──────────────────────────────┬───────────────────────────────┤
│ Revenue (30d)                │ Recent Activity               │
│ ┌──────────────────────────┐ │                               │
│ │    ╱╲    ╱╲              │ │ ● Vendor A approved    2m ago│
│ │   ╱  ╲  ╱  ╲   ╱╲       │ │ ● New order #1234      15m  │
│ │  ╱    ╲╱    ╲ ╱  ╲      │ │ ● Payout $834 sent     1h   │
│ │ ╱              ╲╱   ╲    │ │ ● Vendor B pending     2h   │
│ │╱                     ╲   │ │ ● Listing flagged      3h   │
│ └──────────────────────────┘ │ ● Order #1230 shipped  4h   │
│                              │                               │
├──────────────────────────────┴───────────────────────────────┤
│ Pending Approvals                                            │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ Vendor        │ Type      │ Submitted  │ Actions         │ │
│ ├───────────────┼───────────┼────────────┼─────────────────┤ │
│ │ Caribbean Co  │ Vendor    │ Jun 7      │ [Review]        │ │
│ │ Island Tours  │ Listing   │ Jun 6      │ [Review]        │ │
│ │ Nevis Farms   │ Vendor    │ Jun 6      │ [Review]        │ │
│ └───────────────┴───────────┴────────────┴─────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

### Vendor List Page
```
┌──────────────────────────────────────────────────────────────┐
│ Vendors                                          [+ Invite]  │
│ Admin / Vendors                                              │
├──────────────────────────────────────────────────────────────┤
│ [All ▾] [Search vendors...        ] [Bulk ▾]     [Filter ▾] │
├────┬──────────────┬──────────┬──────────┬──────────┬────────┤
│ ☐  │ Vendor    ▾  │ Status   │ Listings │ Revenue  │ Actions│
├────┼──────────────┼──────────┼──────────┼──────────┼────────┤
│ ☐  │ 🏪 Caribbean│ ● Active │ 24       │ $12,450  │ [⋯]   │
│    │   Co         │          │          │          │        │
│ ☐  │ 🏖 Island   │ ○ Pend   │ 0        │ $0       │ [⋯]   │
│    │   Tours      │          │          │          │        │
│ ☐  │ 🌿 Nevis    │ ● Active │ 18       │ $8,234   │ [⋯]   │
│    │   Farms      │          │          │          │        │
├────┴──────────────┴──────────┴──────────┴──────────┴────────┤
│ Showing 1-25 of 156                    [← 1 2 3 4 5 →]     │
└──────────────────────────────────────────────────────────────┘
```

### Vendor Detail Page
```
┌──────────────────────────────────────────────────────────────┐
│ ← Back to Vendors                                           │
│                                                              │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ [Logo] Caribbean Co                                      │ │
│ │ Basseterre, St. Kitts                                    │ │
│ │ ● Active since Jun 1, 2026                               │ │
│ │                                                          │ │
│ │ [Edit] [Suspend] [Message] [View Storefront]             │ │
│ └──────────────────────────────────────────────────────────┘ │
│                                                              │
│ [Overview] [Listings (24)] [Orders (156)] [Payouts] [Logs]  │
│                                                              │
│ ┌─────────────┬─────────────┬─────────────┬─────────────┐   │
│ │ $12,450     │ 24          │ 156         │ 4.8 ★       │   │
│ │ Revenue     │ Listings    │ Orders      │ Rating      │   │
│ └─────────────┴─────────────┴─────────────┴─────────────┘   │
│                                                              │
│ Recent Orders                                                │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ Order     │ Customer │ Amount │ Status    │ Date         │ │
│ ├───────────┼──────────┼────────┼───────────┼──────────────┤ │
│ │ #1234     │ John D.  │ $89.00 │ Completed │ Jun 7        │ │
│ │ #1233     │ Jane S.  │ $145.00│ Shipped   │ Jun 7        │ │
│ │ #1232     │ Bob M.   │ $67.00 │ Completed │ Jun 6        │ │
│ └───────────┴──────────┴────────┴───────────┴──────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

### Vendor Dashboard (Vendor Panel)
```
┌──────────────────────────────────────────────────────────────┐
│ 👋 Good morning, Caribbean Co                     [● Online] │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ Today's Overview                                             │
│ ┌─────────────┬─────────────┬─────────────┬─────────────┐   │
│ │ $347.00     │ 12          │ 3           │ 4.8 ★       │   │
│ │ Earnings    │ Orders      │ Pending     │ Rating      │   │
│ └─────────────┴─────────────┴─────────────┴─────────────┘   │
│                                                              │
├──────────────────────────────┬───────────────────────────────┤
│ Earnings (7d)                │ Recent Orders                 │
│ ┌──────────────────────────┐ │                               │
│ │    ╱╲    ╱╲              │ │ #1234  John D.  $89  ● Ship  │
│ │   ╱  ╲  ╱  ╲   ╱╲       │ │ #1233  Jane S.  $145 ○ New  │
│ │  ╱    ╲╱    ╲ ╱  ╲      │ │ #1232  Bob M.   $67  ● Done │
│ │ ╱              ╲╱   ╲    │ │ #1231  Ann K.   $234 ● Done │
│ │╱                     ╲   │ │                               │
│ └──────────────────────────┘ │ [View All Orders →]           │
│                              │                               │
├──────────────────────────────┴───────────────────────────────┤
│ Top Listings                                                 │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ [Img] Frigate Bay Tour    │ 45 sales │ $2,340 │ [Edit]  │ │
│ │ [Img] Island Hopping      │ 32 sales │ $1,890 │ [Edit]  │ │
│ │ [Img] Brimstone Hill      │ 28 sales │ $1,560 │ [Edit]  │ │
│ └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

---

## Motion Spec

```css
/* Page transitions */
.page-enter {
  opacity: 0;
  transform: translateY(8px);
}
.page-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 150ms ease-out, transform 150ms ease-out;
}

/* Sidebar collapse */
.sidebar {
  transition: width 200ms ease-in-out;
}

/* Stat card hover */
.stat-card {
  transition: transform 200ms ease-out, box-shadow 200ms ease-out;
}
.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px oklch(0 0 0 / 0.3);
}

/* Table row hover */
.table-row {
  transition: background-color 100ms ease;
}
.table-row:hover {
  background-color: var(--color-raised);
}

/* Modal */
.modal-overlay {
  animation: fadeIn 150ms ease-out;
}
.modal-content {
  animation: scaleIn 150ms ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes scaleIn {
  from { opacity: 0.95; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

/* Toast */
.toast {
  animation: slideInRight 200ms ease-out;
}
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(100%); }
  to { opacity: 1; transform: translateX(0); }
}

/* Skeleton shimmer */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-raised) 25%,
    var(--color-raised-2) 50%,
    var(--color-raised) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
}
@keyframes shimmer {
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Responsive Breakpoints

```css
--breakpoint-sm:   640px;   /* Mobile */
--breakpoint-md:   768px;   /* Tablet */
--breakpoint-lg:   1024px;  /* Desktop */
--breakpoint-xl:   1280px;  /* Wide */
--breakpoint-2xl:  1536px;  /* Ultra-wide */
```

### Breakpoint Behavior

| Element | Mobile (≤768px) | Tablet (768-1024px) | Desktop (>1024px) |
|---------|-----------------|---------------------|-------------------|
| Sidebar | Bottom tab bar (5 items) | Collapsed icons (64px) | Expanded (240px) |
| Header | Hamburger + search icon | Full search | Full search |
| Stats | 2×2 grid | 2×2 grid | 4-column row |
| Tables | Card layout | Card layout | Full table |
| Modals | Full screen | Centered 640px | Centered 640px |
| Vendor detail | Stacked | Stacked | Side-by-side |

---

## File Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── layout.tsx              # Sidebar + header shell
│   │   ├── page.tsx                # Dashboard home
│   │   ├── vendors/
│   │   │   ├── page.tsx            # Vendor list
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx        # Vendor detail
│   │   │   └── new/
│   │   │       └── page.tsx        # Create vendor
│   │   ├── listings/
│   │   │   ├── page.tsx            # Listing management
│   │   │   └── [id]/
│   │   │       └── page.tsx        # Listing detail
│   │   ├── orders/
│   │   │   ├── page.tsx            # Order management
│   │   │   └── [id]/
│   │   │       └── page.tsx        # Order detail
│   │   ├── customers/
│   │   │   └── page.tsx            # Customer list
│   │   ├── analytics/
│   │   │   └── page.tsx            # Analytics dashboard
│   │   ├── payouts/
│   │   │   └── page.tsx            # Payout management
│   │   ├── settings/
│   │   │   ├── page.tsx            # Site settings
│   │   │   └── 3d/
│   │   │       └── page.tsx        # 3D/GS settings
│   │   └── api-keys/
│   │       └── page.tsx            # API key management
│   └── vendor/
│       ├── layout.tsx              # Vendor sidebar shell
│       ├── page.tsx                # Vendor dashboard
│       ├── listings/
│       │   ├── page.tsx            # My listings
│       │   ├── new/
│       │   │   └── page.tsx        # Create listing
│       │   └── [id]/
│       │       └── page.tsx        # Edit listing
│       ├── orders/
│       │   ├── page.tsx            # My orders
│       │   └── [id]/
│       │       └── page.tsx        # Order detail
│       ├── payouts/
│       │   └── page.tsx            # Payout history
│       ├── analytics/
│       │   └── page.tsx            # My analytics
│       ├── profile/
│       │   └── page.tsx            # Business profile
│       └── settings/
│           └── page.tsx            # Vendor settings
├── components/
│   ├── admin/
│   │   ├── AdminShell.tsx          # Layout wrapper
│   │   ├── AdminSidebar.tsx        # Sidebar nav
│   │   ├── AdminHeader.tsx         # Top bar
│   │   ├── StatCard.tsx            # KPI card
│   │   ├── DataTable.tsx           # Sortable/filterable table
│   │   ├── StatusBadge.tsx         # Status pill
│   │   ├── SearchCommand.tsx       # Cmd+K palette
│   │   ├── ActivityFeed.tsx        # Timeline feed
│   │   ├── DateRangePicker.tsx     # Date filter
│   │   ├── EmptyState.tsx          # Empty state
│   │   ├── LoadingSkeleton.tsx     # Shimmer loading
│   │   ├── RevenueChart.tsx        # Area chart
│   │   ├── VendorCard.tsx          # Vendor grid card
│   │   └── OrderStatusBadge.tsx    # Order status
│   ├── vendor/
│   │   ├── VendorShell.tsx         # Vendor layout wrapper
│   │   ├── VendorSidebar.tsx       # Vendor nav
│   │   ├── VendorHeader.tsx        # Vendor top bar
│   │   ├── EarningsCard.tsx        # Earnings overview
│   │   ├── ListingCard.tsx         # Product card
│   │   ├── OrderRow.tsx            # Order list row
│   │   ├── PayoutRow.tsx           # Payout history row
│   │   └── OnlineToggle.tsx        # Online/offline switch
│   └── ui/                         # shadcn/ui primitives
│       ├── button.tsx
│       ├── input.tsx
│       ├── table.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── select.tsx
│       ├── badge.tsx
│       ├── card.tsx
│       ├── command.tsx
│       ├── toast.tsx
│       ├── skeleton.tsx
│       ├── tabs.tsx
│       ├── calendar.tsx
│       ├── popover.tsx
│       ├── separator.tsx
│       ├── tooltip.tsx
│       ├── avatar.tsx
│       ├── scroll-area.tsx
│       └── ...
├── lib/
│   ├── admin/
│   │   ├── nav-config.ts           # Sidebar nav items
│   │   ├── status-config.ts        # Status badge config
│   │   └── order-status.ts         # Order workflow
│   └── vendor/
│       └── nav-config.ts           # Vendor nav items
└── hooks/
    ├── useAdminStats.ts            # Dashboard stats
    ├── useVendors.ts               # Vendor CRUD
    ├── useListings.ts              # Listing CRUD
    ├── useOrders.ts                # Order management
    ├── usePayouts.ts               # Payout data
    ├── useAnalytics.ts             # Analytics data
    └── useCommandPalette.ts        # Cmd+K logic
```

---

## Implementation Priority

### P0 — Must Have (Week 1-2)
- [ ] AdminShell layout (sidebar + header)
- [ ] StatCard component
- [ ] DataTable component (sort, filter, paginate)
- [ ] StatusBadge component
- [ ] Dashboard page (stats + activity feed)
- [ ] Vendor list page
- [ ] Vendor detail page
- [ ] VendorShell layout
- [ ] Vendor dashboard page

### P1 — Should Have (Week 3-4)
- [ ] Command palette (Cmd+K)
- [ ] Order management pages
- [ ] Listing management pages
- [ ] Payout management page
- [ ] Vendor listing CRUD
- [ ] Vendor order management
- [ ] Toast notification system
- [ ] Loading skeletons
- [ ] Empty states

### P2 — Nice to Have (Week 5-6)
- [ ] Analytics dashboard (charts)
- [ ] Customer management
- [ ] Settings pages (site + 3D)
- [ ] API key management
- [ ] Activity feed with real-time updates
- [ ] Mobile responsive (bottom tab bar)
- [ ] Dark/light mode toggle
- [ ] Export (CSV, PDF)

---

## Dependencies to Add

```json
{
  "dependencies": {
    "@radix-ui/react-dialog": "^1.1.0",
    "@radix-ui/react-dropdown-menu": "^2.1.0",
    "@radix-ui/react-select": "^2.1.0",
    "@radix-ui/react-tabs": "^1.1.0",
    "@radix-ui/react-toast": "^1.2.0",
    "@radix-ui/react-tooltip": "^1.1.0",
    "@radix-ui/react-popover": "^1.1.0",
    "@radix-ui/react-avatar": "^1.1.0",
    "@radix-ui/react-scroll-area": "^1.1.0",
    "@radix-ui/react-separator": "^1.1.0",
    "@radix-ui/react-checkbox": "^1.1.0",
    "@radix-ui/react-slot": "^1.1.0",
    "cmdk": "^1.0.0",
    "date-fns": "^4.1.0",
    "lucide-react": "^0.460.0",
    "recharts": "^2.13.0",
    "zustand": "^5.0.0",
    "@tanstack/react-table": "^8.20.0",
    "react-hook-form": "^7.53.0",
    "zod": "^3.23.0",
    "@hookform/resolvers": "^3.9.0",
    "sonner": "^1.7.0"
  }
}
```
