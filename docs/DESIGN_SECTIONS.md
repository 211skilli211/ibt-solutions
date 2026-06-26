# IslandHub Section-Specific Design Variations

These variations layer on top of the base DESIGN.md for specific platform sections.

---

## Rentals Hub Design

### Inspiration Sources
- Airbnb (apartments)
- Turo (vehicles)
- Boatsetter (sea vehicles)
- FatLlama (equipment)

### Section Variations

#### Apartments & Studios
**Theme**: Warm, inviting, home-like
- Primary: Sunset tones (#FF6B35, #FF8A5C)
- Background: Sand/cream (#FDFBF7)
- Cards: Large images, soft shadows
- Key UI: Date picker, guest count, price calendar
- Map: Property locations with price markers

#### Vehicles (Cars, Motorbikes)
**Theme**: Clean, functional, trust-oriented
- Primary: Ocean blue (#0066CC)
- Background: Light neutral (#F8FAFC)
- Cards: Vehicle specs prominent (seats, transmission, fuel)
- Key UI: Vehicle comparison, availability calendar
- Map: Pickup/dropoff locations

#### Sea Vehicles (Boats, Jet Skis)
**Theme**: Ocean, adventure, marine
- Primary: Turquoise (#40E0D0)
- Background: Deep ocean (#0A1628 dark / #F0F9FF light)
- Cards: Water-themed, wave patterns
- Key UI: Weather conditions, captain required badges
- Map: Marina locations, anchor zones

#### Equipment (Tools, Gear)
**Theme**: Industrial, reliable, utility
- Primary: Slate gray (#64748B)
- Background: Light industrial (#F1F5F9)
- Cards: Specs-focused, condition badges
- Key UI: Availability calendar, pickup location
- Map: Nearby equipment locations

### Shared Rental UI Elements
- Search bar with category tabs
- Filter sidebar (price, dates, amenities)
- Map/list toggle view
- Booking flow (dates → details → payment)

---

## Transport Design

### Inspiration Sources
- Uber (taxi)
- Uber Eats (delivery)
- DoorDash (pickup)

### Section Variations

#### Taxi
**Theme**: Premium, reliable, fast
- Primary: Ocean dark (#0F2744)
- Accent: Emerald (#2D5A27)
- Map: Full-screen with driver location
- Key UI: Destination input, driver card, trip status
- Flow: Enter destination → Match driver → Track trip → Rate

#### Delivery
**Theme**: Urgency, freshness, tracking
- Primary: Sunset orange (#FF6B35)
- Background: Light warm (#FFFBF5)
- Key UI: Package size selector, tracking timeline, ETA
- Flow: Package details → Pickup/Dropoff → Track → Receive

#### Pickup
**Theme**: Quick, simple, ready
- Primary: Ocean blue (#0066CC)
- Key UI: Ready notification, code display, timer
- Flow: Order → Prepare → Ready → Pickup → Complete

### Shared Transport UI
- Map with real-time location
- Driver/rider profile cards
- Status timeline
- Cost estimation
- Rating interface

---

## Auctions Design (WhatNot Style)

### Inspiration
- WhatNot (live social auctions)
- eBay (traditional auctions)
- StockX (sneaker drops)

### Visual Treatment
**Theme**: Live, urgent, social
- Primary: Coral (#FF6B6B)
- Accent: Sunset orange (#FF6B35)
- Background: Dark preferred (#0A1628)
- Countdown: Large, bold, pulsing animation

### Key UI Components

#### Auction Card
- Live indicator (red dot, pulse animation)
- Current bid (large, prominent)
- Time remaining (countdown format: 2h 15m)
- Bid count
- Watch button (heart icon)
- Quick bid button

#### Auction Detail
- Main image/video carousel
- Current bid with bid history
- Bid input (prominent, easy to use)
- Quick bid buttons (+$5, +$10, +$20)
- Watchers count
- Seller info
- Similar items

#### Live Auction Stream
- Video/image of item
- Current high bidder
- Bid history scrolling
- Chat/comment stream
- "Sudden Death" timer extension indicator
- Buy now button (optional)

### "Sudden Death" Feature
- Timer starts at fixed time (e.g., 5 minutes)
- If bid in last 30 seconds, timer resets to 30 seconds
- Visual: Timer turns red, pulses faster
- Audio cue option (notified by sound)

---

## Community Design

### Inspiration Sources
- Instagram (Feed, Stories)
- Facebook (Groups, Events)
- LinkedIn (Business, Jobs)

### Section Variations

#### Feed
**Theme**: Instagram-inspired
- Full-width images
- Engagement actions (like, comment, share)
- Story ring at top
- Avatar-centric
- Caption with hashtags

#### Business
**Theme**: LinkedIn-inspired
- Professional cards
- Connection suggestions
- Industry filters
- Company pages

#### Groups
**Theme**: Facebook Groups
- Group cover images
- Member list
- Post feed
- Admin tools

#### Stories
**Theme**: Instagram Stories
- Full-screen vertical
- Progress bars at top
- Reaction buttons
- 24-hour expiry indicator

#### Events
**Theme**: Facebook Events
- Cover image prominent
- Date/time clear
- RSVP button
- Attendee count
- Map for location

#### Jobs
**Theme**: LinkedIn Jobs
- Company logo
- Job title prominent
- Location, salary, type tags
- Easy apply button

#### Map
**Theme**: Discovery-focused
- Map with pins
- Category filters
- Preview cards on tap
- Directions integration

### Shared Community UI
- Navigation: Bottom tab bar (mobile), Sidebar (desktop)
- Create post floating action button
- Notification indicators
- Search with type filters

---

## Vendor Stores Design

### Inspiration Sources
- Shopify (store builder)
- Etsy (handmade/crafts)
- Amazon (marketplace)

### Store Types

#### Food Kitchens / Restaurants
- Menu-focused layout
- Food imagery prominent
- Ratings/reviews visible
- Order tracking
- Delivery/shipping options

#### Shops / Retail
- Product grid
- Category navigation
- Cart functionality
- Wishlist

#### Service Providers
- Service cards
- Booking calendar
- Portfolio/gallery
- Contact options
- Reviews

### Shared Store UI
- Store header with branding (logo, banner, name)
- Navigation: Categories, About, Contact, Reviews
- Product/service listing
- Search within store
- Sort/filter options

---

## Implementation Notes

### Using Multiple Design Files

For a section, reference both files:
1. `DESIGN.md` - Base system (colors, typography, spacing)
2. `DESIGN_SECTIONS.md` - Section-specific overrides

### Overriding Rules
- Section variations take precedence over base
- Use semantic tokens when possible
- Match patterns (buttons, cards) but customize details

### Creating New Sections
1. Choose inspiration source
2. Determine primary accent color
3. Define key UI components
4. Document in this file
5. Update AI agent context

---

*These variations are templates - customize for Caribbean/local context.*