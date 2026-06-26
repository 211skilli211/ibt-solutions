# Role-Based Dashboard Architecture — Complete Spec

> All dashboards use the same design system (OKLCH Caribbean, Geist typography, 4px grid, 27 anti-patterns) but are scoped to role-specific data and actions.

---

## User Roles & Dashboard Mapping

| Role | Dashboard | Primary Hub | Key Actions |
|------|-----------|-------------|-------------|
| **Admin** | `/admin/*` | All | Full platform management |
| **Vendor** | `/vendor/*` | food, products, services, tours, rentals | Listings, orders, payouts |
| **Driver** | `/driver/*` | transport | Rides, deliveries, earnings |
| **Customer** | `/customer/*` | All (buyer) | Orders, bookings, favorites |
| **Tour Operator** | `/vendor/*` (shared) | tours | Tour listings, bookings, calendar |
| **Service Provider** | `/vendor/*` (shared) | services | Service listings, appointments |
| **Co-op Member** | `/vendor/*` (shared) | products | Collective listings, shared inventory |

**Note**: Vendor, Tour Operator, Service Provider, and Co-op Member share the same `/vendor` panel but with role-specific features enabled/disabled based on `entity_type` in `payment_terminals` table.

---

## Role Hierarchy & Shared Components

```
┌─────────────────────────────────────────────────────────────┐
│                    SHARED LAYOUT                             │
│  ┌──────────┬──────────────────────────────────────────┐    │
│  │ Sidebar  │ Content Area                              │    │
│  │ (role-   │ (role-scoped pages)                       │    │
│  │  scoped) │                                           │    │
│  └──────────┴──────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────┤
│  SHARED COMPONENTS (all roles):                              │
│  • Shell layout (sidebar + header)                           │
│  • StatCard, DataTable, StatusBadge                          │
│  • Command palette (Cmd+K)                                   │
│  • Toast notifications                                       │
│  • Loading skeletons                                         │
│  • Empty states                                              │
│  • Modal/Dialog                                              │
│  • Form patterns (React Hook Form + Zod)                     │
├─────────────────────────────────────────────────────────────┤
│  ROLE-SPECIFIC:                                              │
│  • Sidebar nav items                                         │
│  • Page routes                                               │
│  • Data scopes (own data vs all data)                        │
│  • Action permissions                                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 1. Admin Dashboard (`/admin/*`)

**Full spec in `admin-design-spec.md` — 12 pages, complete wireframes above.**

### Sidebar Nav
```
▸ Home
  Dashboard
  Analytics

▸ Manage
  Vendors          ← All entity types (vendor, service_provider, coop_member, tour_operator)
  Drivers          ← Transport-specific
  Customers        ← Buyer management
  Listings         ← All products/services/tours
  Orders           ← All orders

▸ Finance
  Payouts          ← Fygaro integration
  Transactions     ← Payment history
  Settlements      ← Bank transfers

▸ System
  Settings         ← Site settings
  3D / Geospatial  ← Cesium/GS config
  API Keys         ← API management
```

### Key Data Scope
- **Vendors**: See ALL vendors across all entity types. Can filter by type.
- **Drivers**: See ALL drivers. Can verify, suspend, view earnings.
- **Customers**: See ALL customers. Can view order history, issue refunds.
- **Orders**: See ALL orders across all vendors/drivers. Full status workflow.
- **Payouts**: See ALL payouts. Can trigger manual payouts, view Fygaro status.

---

## 2. Vendor Dashboard (`/vendor/*`)

**Shared by**: Vendor, Tour Operator, Service Provider, Co-op Member

### Sidebar Nav
```
▸ Dashboard        ← Earnings, orders, stats overview
▸ Listings         ← Products/services/tours CRUD
▸ Orders           ← Incoming orders, fulfillment
▸ Calendar         ← Availability, bookings (tours/services)
▸ Payouts          ← Earnings history, payout schedule
▸ Analytics        ← Views, conversions, top items
▸ Profile          ← Business info, verification, logo
▸ Settings         ← Notifications, bank account, preferences
```

### Role-Specific Features

| Feature | Vendor | Tour Operator | Service Provider | Co-op Member |
|---------|--------|---------------|------------------|--------------|
| Product listings | ✅ | ❌ | ❌ | ✅ (shared) |
| Tour listings | ❌ | ✅ | ❌ | ❌ |
| Service listings | ❌ | ❌ | ✅ | ❌ |
| Calendar booking | ❌ | ✅ | ✅ | ❌ |
| Inventory mgmt | ✅ | ❌ | ❌ | ✅ |
| Staff accounts | ✅ | ✅ | ✅ | ❌ |
| Collective pricing | ❌ | ❌ | ❌ | ✅ |
| Delivery options | ✅ | ❌ | ❌ | ✅ |

### Vendor Dashboard Layout
```
┌──────────────────────────────────────────────────────────────┐
│ 👋 Good morning, Caribbean Co            [● Online] [$347]   │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ Today's Overview                                             │
│ ┌─────────────┬─────────────┬─────────────┬─────────────┐   │
│ │ $347.00     │ 12          │ 3           │ 4.8 ★       │   │
│ │ Earnings    │ Orders      │ Pending     │ Rating      │   │
│ │ today       │ today       │ fulfillment │ avg         │   │
│ └─────────────┴─────────────┴─────────────┴─────────────┘   │
│                                                              │
├──────────────────────────────┬───────────────────────────────┤
│ Earnings (7d)                │ Recent Orders                 │
│ ┌──────────────────────────┐ │                               │
│ │    ╱╲    ╱╲              │ │ #1234  John D.  $89  ○ New  │
│ │   ╱  ╲  ╱  ╲   ╱╲       │ │ #1233  Jane S.  $145 ● Ship │
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
│                                                              │
│ Quick Actions: [+ New Listing] [View Storefront] [Payouts]  │
└──────────────────────────────────────────────────────────────┘
```

### Vendor Listing Management
```
┌──────────────────────────────────────────────────────────────┐
│ My Listings                                      [+ New]     │
│                                                              │
│ [All ▾] [Active ▾] [Search...              ] [Filter ▾]     │
│                                                              │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ [Img] Frigate Bay Beach Tour                             │ │
│ │ 📍 St. Kitts │ 🏷 Tour │ ● Active                        │ │
│ │ $89.00 │ 45 sales │ 4.8 ★ │ Stock: ∞                    │ │
│ │ [Edit] [Duplicate] [Deactivate]                          │ │
│ ├──────────────────────────────────────────────────────────┤ │
│ │ [Img] Island Hopping Adventure                           │ │
│ │ 📍 St. Kitts │ 🏷 Tour │ ● Active                        │ │
│ │ $145.00 │ 32 sales │ 4.6 ★ │ Stock: ∞                   │ │
│ │ [Edit] [Duplicate] [Deactivate]                          │ │
│ ├──────────────────────────────────────────────────────────┤ │
│ │ [Img] Local Spice Box                                    │ │
│ │ 📍 Basseterre │ 🏷 Product │ ○ Draft                     │ │
│ │ $24.99 │ 0 sales │ — │ Stock: 50                       │ │
│ │ [Edit] [Publish] [Delete]                                │ │
│ └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

### Vendor Order Management
```
┌──────────────────────────────────────────────────────────────┐
│ Orders                                                       │
│                                                              │
│ [All ▾] [New ▾] [Search...              ] [Date Range ▾]    │
│                                                              │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ ☐ │ Order    │ Customer │ Items │ Total │ Status │ Date  │ │
│ ├───┼──────────┼──────────┼───────┼───────┼────────┼───────┤ │
│ │   │ #1234    │ John D.  │ 2     │ $89   │ ○ New  │ Jun 7 │ │
│ │   │ #1233    │ Jane S.  │ 1     │ $145  │ ● Ship │ Jun 7 │ │
│ │   │ #1232    │ Bob M.   │ 3     │ $67   │ ✓ Done │ Jun 6 │ │
│ └───┴──────────┴──────────┴───────┴───────┴────────┴───────┘ │
│                                                              │
│ Order Detail (slide-over):                                   │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ Order #1234                                         [×]  │ │
│ │ John D. │ john@email.com │ +1 (869) 555-0123             │ │
│ │                                                          │ │
│ │ Items:                                                   │ │
│ │ • Frigate Bay Tour × 1 .............. $65.00             │ │
│ │ • Local Spice Box × 1 ............... $24.00             │ │
│ │ ─────────────────────────────────────────                │ │
│ │ Total: $89.00                                            │ │
│ │                                                          │ │
│ │ Status: [○ New] → [● Processing] → [● Shipped] → [✓ Done]│ │
│ │                                                          │ │
│ │ [Mark Shipped] [Cancel Order] [Message Customer]         │ │
│ └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

---

## 3. Driver Dashboard (`/driver/*`)

**Specific to**: Transport role (ride hailing, delivery, boat charters)

### Sidebar Nav
```
▸ Dashboard        ← Earnings, trips, rating, online status
▸ Rides            ← Ride requests, history
▸ Deliveries       ← Delivery jobs, history
▸ Earnings         ← Daily/weekly/monthly breakdown
▸ Schedule         ← Availability calendar
▸ Vehicle          ← Vehicle info, documents, insurance
▸ Profile          ← Driver profile, verification
▸ Settings         ← Notifications, payout method
```

### Driver Dashboard Layout
```
┌──────────────────────────────────────────────────────────────┐
│ 🚕 Driver Dashboard                        [● Online] [$187] │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │                    [● ONLINE]                             │ │
│ │                                                          │ │
│ │     Tap to go offline                                    │ │
│ │                                                          │ │
│ │  Today: 12 trips │ $187 │ 4.9 ★ │ 3.2 hrs               │ │
│ └──────────────────────────────────────────────────────────┘ │
│                                                              │
│ ┌─────────────┬─────────────┬─────────────┬─────────────┐   │
│ │ $187.00     │ 12          │ 4.9 ★       │ 3.2 hrs     │   │
│ │ Today       │ Trips       │ Rating      │ Online      │   │
│ │ earnings    │ completed   │ average     │ time        │   │
│ └─────────────┴─────────────┴─────────────┴─────────────┘   │
│                                                              │
├──────────────────────────────┬───────────────────────────────┤
│ Earnings (7d)                │ Recent Trips                  │
│ ┌──────────────────────────┐ │                               │
│ │    ╱╲    ╱╲              │ │ 🚕 Frigate Bay → Airport     │
│ │   ╱  ╲  ╱  ╲   ╱╲       │ │    $24 │ 12 min │ 5 ★ │ 2m  │
│ │  ╱    ╲╱    ╲ ╱  ╲      │ │ 📦 Basseterre Delivery       │
│ │ ╱              ╲╱   ╲    │ │    $8 │ 5 min │ 4 ★ │ 15m  │
│ │╱                     ╲   │ │ 🚤 Pinneys Beach → Charlestown│
│ └──────────────────────────┘ │    $45 │ 30 min │ 5 ★ │ 1h  │
│                              │                               │
│ [Weekly Earnings →]          │ [View All Trips →]            │
├──────────────────────────────┴───────────────────────────────┤
│ Active Requests                                             │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ 🚕 Ride Request                                          │ │
│ │ From: Frigate Bay → To: Robert L. Bradshaw Airport       │ │
│ │ Distance: 8.2 km │ Est: $24 │ Est time: 15 min           │ │
│ │ [Accept] [Decline]                                       │ │
│ └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

### Driver Trip Detail
```
┌──────────────────────────────────────────────────────────────┐
│ Trip #847                                                    │
│                                                              │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ [Map Preview]                                            │ │
│ │ 📍 Frigate Bay → 🛬 Airport                              │ │
│ └──────────────────────────────────────────────────────────┘ │
│                                                              │
│ Passenger: John D. │ 4.8 ★                                  │
│ Phone: +1 (869) 555-0123                                     │
│                                                              │
│ Distance: 8.2 km                                             │
│ Duration: 12 min                                             │
│ Fare: $24.00                                                 │
│                                                              │
│ Status: ● Completed                                          │
│ Rating: ⭐⭐⭐⭐⭐ (5.0)                                       │
│                                                              │
│ [Message Passenger] [Report Issue]                           │
└──────────────────────────────────────────────────────────────┘
```

### Driver Earnings Breakdown
```
┌──────────────────────────────────────────────────────────────┐
│ Earnings                                                     │
│                                                              │
│ [Today] [This Week] [This Month] [Custom Range]              │
│                                                              │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ Total Earnings                                           │ │
│ │ $1,247.00                                                │ │
│ │ ↑ 18% from last week                                     │ │
│ │                                                          │ │
│ │ ┌────────────┬────────────┬────────────┬────────────┐    │ │
│ │ │ Rides      │ Deliveries │ Tips       │ Bonuses    │    │ │
│ │ │ $892.00    │ $234.00    │ $89.00     │ $32.00     │    │ │
│ │ │ 72%        │ 19%        │ 7%         │ 2%         │    │ │
│ │ └────────────┴────────────┴────────────┴────────────┘    │ │
│ └──────────────────────────────────────────────────────────┘ │
│                                                              │
│ Daily Breakdown                                              │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ Mon │ Tue │ Wed │ Thu │ Fri │ Sat │ Sun                 │ │
│ │ $89 │ $134│ $156│ $178│ $203│ $267│ $220                │ │
│ │ ██  │ ███ │ ████│ ████│ █████│ ██████│ █████            │ │
│ └──────────────────────────────────────────────────────────┘ │
│                                                              │
│ Payout Schedule: Next payout Jun 14 → $1,247.00              │
│ [Request Early Payout] [View Payout History]                 │
└──────────────────────────────────────────────────────────────┘
```

### Driver Vehicle Profile
```
┌──────────────────────────────────────────────────────────────┐
│ Vehicle Information                                          │
│                                                              │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ [Vehicle Photo]                                          │ │
│ │                                                          │ │
│ │ Make/Model: Toyota Corolla 2022                           │ │
│ │ Color: White                                             │ │
│ │ License: SKN-2022-847                                    │ │
│ │ Seats: 4                                                 │ │
│ │                                                          │ │
│ │ Status: ● Verified                                       │ │
│ │ Last inspection: May 15, 2026                            │ │
│ │ Insurance expires: Dec 31, 2026                          │ │
│ │                                                          │ │
│ │ [Update Vehicle] [Upload Documents]                       │ │
│ └──────────────────────────────────────────────────────────┘ │
│                                                              │
│ Required Documents:                                          │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ ✅ Driver's License        Uploaded  May 1, 2026         │ │
│ │ ✅ Vehicle Registration    Uploaded  May 1, 2026         │ │
│ │ ✅ Insurance Certificate   Uploaded  May 1, 2026         │ │
│ │ ⏳ Background Check        Pending review                │ │
│ └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

---

## 4. Customer Dashboard (`/customer/*`)

**All users with buyer role**

### Sidebar Nav
```
▸ Dashboard        ← Overview, recent activity
▸ Orders           ← Order history, tracking
▸ Bookings         ← Tour/service bookings, calendar
▸ Favorites        ← Saved listings, wishlist
▸ Messages         ← Chat with vendors/drivers
▸ Payments         ← Payment methods, transaction history
▸ Profile          ← Personal info, addresses
▸ Settings         ← Notifications, privacy
```

### Customer Dashboard Layout
```
┌──────────────────────────────────────────────────────────────┐
│ 👋 Welcome back, John!                                       │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ ┌─────────────┬─────────────┬─────────────┬─────────────┐   │
│ │ 12          │ 3           │ 8           │ $2,340      │   │
│ │ Orders      │ Active      │ Favorites   │ Total       │   │
│ │ total       │ bookings    │ saved       │ spent       │   │
│ └─────────────┴─────────────┴─────────────┴─────────────┘   │
│                                                              │
├──────────────────────────────┬───────────────────────────────┤
│ Active Bookings              │ Recent Orders                 │
│ ┌──────────────────────────┐ │                               │
│ │ 🏖 Frigate Bay Tour      │ │ #1234  Caribbean Co  $89     │
│ │ Tomorrow, 9:00 AM        │ │ ● Shipped │ Track →         │
│ │ [View] [Message] [Cancel]│ │                               │
│ │                          │ │ #1233  Island Spice  $24      │
│ │ 🚕 Ride to Airport       │ │ ✓ Delivered │ Reorder →     │
│ │ Jun 10, 2:00 PM          │ │                               │
│ │ [View] [Message] [Cancel]│ │ #1232  Nevis Farms  $156     │
│ └──────────────────────────┘ │ ✓ Delivered │ Reorder →     │
│                              │                               │
│ [View All Bookings →]        │ [View All Orders →]           │
├──────────────────────────────┴───────────────────────────────┤
│ Recommended For You                                          │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ [Img] Brimstone Hill Tour    │ $65 │ 4.8 ★ │ [Book]    │ │
│ │ [Img] Local Spice Box        │ $24 │ 4.9 ★ │ [Add]     │ │
│ │ [Img] Island Hopping         │ $145│ 4.7 ★ │ [Book]    │ │
│ └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

### Customer Order Tracking
```
┌──────────────────────────────────────────────────────────────┐
│ Order #1234                                                  │
│ Caribbean Co │ Placed Jun 7, 2026                            │
│                                                              │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ Order Status                                              │ │
│ │                                                          │ │
│ │ ✓ Ordered    →  ✓ Confirmed  →  ● Shipped  →  ○ Delivered│ │
│ │ Jun 7          Jun 7           Jun 8         Est Jun 9   │ │
│ └──────────────────────────────────────────────────────────┘ │
│                                                              │
│ Items                                                       │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ [Img] Frigate Bay Beach Tour × 1 .......... $65.00       │ │
│ │ [Img] Local Spice Box × 1 .................. $24.00       │ │
│ │ ─────────────────────────────────────────                │ │
│ │ Subtotal: $89.00                                         │ │
│ │ Delivery: $0.00 (Free)                                   │ │
│ │ Total: $89.00                                            │ │
│ └──────────────────────────────────────────────────────────┘ │
│                                                              │
│ Delivery                                                     │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ 📍 Pickup: Frigate Bay Beach                             │ │
│ │ 📦 Tracking: SKN-2026-847293                             │ │
│ │ 🚕 Driver: Marcus T. │ 4.9 ★ │ [Message]                 │ │
│ └──────────────────────────────────────────────────────────┘ │
│                                                              │
│ [Message Vendor] [Cancel Order] [Get Help]                   │
└──────────────────────────────────────────────────────────────┘
```

### Customer Booking Management
```
┌──────────────────────────────────────────────────────────────┐
│ My Bookings                                                  │
│                                                              │
│ [Upcoming] [Past] [Cancelled]                                │
│                                                              │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ 🏖 Frigate Bay Beach Tour                                │ │
│ │ Caribbean Co                                             │ │
│ │ 📅 Jun 8, 2026 │ 9:00 AM │ 2 people                     │ │
│ │ $130.00 (2 × $65.00)                                    │ │
│ │ ● Confirmed                                              │ │
│ │ [View Details] [Message] [Cancel]                        │ │
│ ├──────────────────────────────────────────────────────────┤ │
│ │ 🚕 Airport Transfer                                      │ │
│ │ Marcus T. (Driver)                                       │ │
│ │ 📅 Jun 10, 2026 │ 2:00 PM │ 1 person                    │ │
│ │ $24.00                                                   │ │
│ │ ● Confirmed                                              │ │
│ │ [View Details] [Message] [Cancel]                        │ │
│ ├──────────────────────────────────────────────────────────┤ │
│ │ 🌿 Brimstone Hill Tour                                   │ │
│ │ Island Adventures                                        │ │
│ │ 📅 May 28, 2026 │ 10:00 AM │ 2 people                   │ │
│ │ $130.00 (2 × $65.00)                                    │ │
│ │ ✓ Completed │ ⭐ Rate Experience                          │ │
│ │ [View Details] [Rebook] [Review]                         │ │
│ └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

---

## Shared Component Variants by Role

### Shell Layout
| Element | Admin | Vendor | Driver | Customer |
|---------|-------|--------|--------|----------|
| Sidebar width | 240px | 200px | 200px | 200px |
| Header | Logo + Search + Notif + Avatar | Store name + Earnings + Online + Avatar | Vehicle + Earnings + Online + Avatar | Greeting + Avatar |
| Background | ground (dark) | ground (dark) | ground (dark) | ground (dark) |
| Accent | teal | teal | sky (transport) | emerald |

### StatCard Colors by Role
| Role | Primary | Success | Warning | Danger |
|------|---------|---------|---------|--------|
| Admin | teal | emerald | amber | red |
| Vendor | teal | emerald | amber | red |
| Driver | sky | emerald | amber | red |
| Customer | emerald | teal | amber | red |

### Status Badges by Role
| Role | Statuses |
|------|----------|
| Admin | Active, Pending, Suspended, Review |
| Vendor | Active, Draft, Paused, Rejected |
| Driver | Online, Offline, Busy, Suspended |
| Customer | Active, Inactive, Flagged |
| Order | New, Processing, Shipped, Delivered, Cancelled, Refunded |
| Booking | Confirmed, Pending, Completed, Cancelled, No-show |
| Payout | Pending, Processing, Completed, Failed |

---

## File Structure (Complete)

```
src/
├── app/
│   ├── admin/                          # Admin (all entity types)
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # Dashboard
│   │   ├── vendors/page.tsx            # All vendors
│   │   ├── vendors/[id]/page.tsx       # Vendor detail
│   │   ├── drivers/page.tsx            # Driver management
│   │   ├── drivers/[id]/page.tsx       # Driver detail
│   │   ├── customers/page.tsx          # Customer management
│   │   ├── customers/[id]/page.tsx     # Customer detail
│   │   ├── listings/page.tsx           # All listings
│   │   ├── orders/page.tsx             # All orders
│   │   ├── orders/[id]/page.tsx        # Order detail
│   │   ├── analytics/page.tsx          # Platform analytics
│   │   ├── payouts/page.tsx            # Payout management
│   │   ├── settings/
│   │   │   ├── page.tsx                # Site settings
│   │   │   └── 3d/page.tsx             # 3D/GS settings
│   │   └── api-keys/page.tsx           # API keys
│   ├── vendor/                         # Vendor / Tour Operator / Service Provider / Co-op
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # Dashboard
│   │   ├── listings/
│   │   │   ├── page.tsx                # My listings
│   │   │   ├── new/page.tsx            # Create listing
│   │   │   └── [id]/page.tsx           # Edit listing
│   │   ├── orders/
│   │   │   ├── page.tsx                # My orders
│   │   │   └── [id]/page.tsx           # Order detail
│   │   ├── calendar/page.tsx           # Availability/bookings
│   │   ├── payouts/page.tsx            # Earnings & payouts
│   │   ├── analytics/page.tsx          # My analytics
│   │   ├── profile/page.tsx            # Business profile
│   │   └── settings/page.tsx           # Vendor settings
│   ├── driver/                         # Driver (transport)
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # Dashboard
│   │   ├── rides/
│   │   │   ├── page.tsx                # Ride history
│   │   │   └── [id]/page.tsx           # Ride detail
│   │   ├── deliveries/
│   │   │   ├── page.tsx                # Delivery history
│   │   │   └── [id]/page.tsx           # Delivery detail
│   │   ├── earnings/page.tsx           # Earnings breakdown
│   │   ├── schedule/page.tsx           # Availability
│   │   ├── vehicle/page.tsx            # Vehicle profile
│   │   ├── profile/page.tsx            # Driver profile
│   │   └── settings/page.tsx           # Driver settings
│   └── customer/                       # Customer (buyer)
│       ├── layout.tsx
│       ├── page.tsx                    # Dashboard
│       ├── orders/
│       │   ├── page.tsx                # Order history
│       │   └── [id]/page.tsx           # Order tracking
│       ├── bookings/
│       │   ├── page.tsx                # My bookings
│       │   └── [id]/page.tsx           # Booking detail
│       ├── favorites/page.tsx          # Saved/wishlist
│       ├── messages/page.tsx           # Chat with vendors
│       ├── payments/page.tsx           # Payment methods
│       ├── profile/page.tsx            # Personal profile
│       └── settings/page.tsx           # Customer settings
├── components/
│   ├── admin/                          # Admin-specific components
│   ├── vendor/                         # Vendor-specific components
│   ├── driver/                         # Driver-specific components
│   ├── customer/                       # Customer-specific components
│   └── ui/                             # Shared shadcn/ui primitives
└── lib/
│   ├── roles.ts                        # Role definitions & permissions
│   ├── nav-config.ts                   # Per-role sidebar config
│   └── permissions.ts                  # Permission helpers
```

---

## Role-Based Access Control (RBAC)

```typescript
// lib/roles.ts
export type UserRole = 'admin' | 'vendor' | 'driver' | 'customer' | 'tour_operator' | 'service_provider' | 'coop_member';

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  admin: ['*'],  // Full access
  
  vendor: [
    'vendor.dashboard',
    'vendor.listings.read', 'vendor.listings.write',
    'vendor.orders.read', 'vendor.orders.write',
    'vendor.payouts.read',
    'vendor.analytics.read',
    'vendor.profile.read', 'vendor.profile.write',
  ],
  
  driver: [
    'driver.dashboard',
    'driver.rides.read', 'driver.rides.write',
    'driver.deliveries.read', 'driver.deliveries.write',
    'driver.earnings.read',
    'driver.schedule.read', 'driver.schedule.write',
    'driver.vehicle.read', 'driver.vehicle.write',
    'driver.profile.read', 'driver.profile.write',
  ],
  
  customer: [
    'customer.dashboard',
    'customer.orders.read',
    'customer.bookings.read', 'customer.bookings.write',
    'customer.favorites.read', 'customer.favorites.write',
    'customer.messages.read', 'customer.messages.write',
    'customer.payments.read', 'customer.payments.write',
    'customer.profile.read', 'customer.profile.write',
  ],
  
  // Tour Operator, Service Provider, Co-op Member
  // inherit from 'vendor' with additional scoping
  tour_operator: ['vendor.*'],
  service_provider: ['vendor.*'],
  coop_member: ['vendor.*'],
};

export function hasPermission(role: UserRole, permission: string): boolean {
  const perms = ROLE_PERMISSIONS[role];
  if (perms.includes('*')) return true;
  if (perms.includes(permission)) return true;
  // Wildcard match (e.g., 'vendor.*' matches 'vendor.listings.read')
  const prefix = permission.split('.').slice(0, -1).join('.') + '.*';
  return perms.includes(prefix);
}
```
