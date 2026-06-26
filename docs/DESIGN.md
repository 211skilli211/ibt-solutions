# IBT Solutions & IslandHub - Design System

Inspired by Google Stitch DESIGN.md format. A custom Caribbean-inspired design system for building consistent UI across IBT Solutions and IslandHub platforms.

---

# TABLE OF CONTENTS

1. [Visual Theme & Atmosphere](#1-visual-theme--atmosphere)
2. [Color Palette](#2-color-palette)
3. [Typography](#3-typography)
4. [Component Stylings - Base](#4-component-stylings---base)
5. [Layout Principles](#5-layout-principles)
6. [Depth & Elevation](#6-depth--elevation)
7. [Do's and Don'ts](#7-dos-and-donts)
8. [Vendor Type Design Variants](#8-vendor-type-design-variants)
9. [Listing Type Designs](#9-listing-type-designs)
10. [Community Section Designs](#10-community-section-designs)
11. [Transport Interface Designs](#11-transport-interface-designs)
12. [Auction Design - Sudden Death](#12-auction-design---sudden-death)
13. [Admin Dashboard](#13-admin-dashboard)
14. [Platform-Specific Reference](#14-platform-specific-reference)

---

## 1. Visual Theme & Atmosphere

**Philosophy**: Tropical Premium meets Technical Precision

The design draws from Caribbean geography and culture while maintaining the professional feel of top tech platforms. Ocean blues blend with sunset oranges, creating a warm yet professional aesthetic. The system balances warmth (Caribbean hospitality) with precision (modern tech platforms).

**Density**: Medium - comfortable spacing with clear visual hierarchy

**Motion**: Subtle, purposeful animations. No excessive movement. Respect 200ms minimum transition times.

---

## 2. Color Palette

### Core Colors (Ocean - Primary)

| Token | Hex | Role | Usage |
|-------|-----|------|-------|
| `--ocean-900` | `#0A1628` | Primary Dark | Main backgrounds, headers |
| `--ocean-800` | `#0F2744` | Dark | Cards, elevated surfaces |
| `--ocean-700` | `#1A3A5C` | Medium Dark | Borders, dividers |
| `--ocean-600` | `#264D73` | Medium | Secondary elements |
| `--ocean-500` | `#0066CC` | Primary | Primary actions, links |
| `--ocean-400` | `#3388E0` | Primary Light | Hover states |
| `--ocean-300` | `#80B3E8` | Light | Secondary text, icons |

### Accent Colors (Sunset/Coral)

| Token | Hex | Role | Usage |
|-------|-----|------|-------|
| `--sunset-600` | `#D94E1F` | Bold Accent | Urgent, important |
| `--sunset-500` | `#FF6B35` | Primary Accent | CTAs, highlights |
| `--sunset-400` | `#FF8A5C` | Accent Light | Hover, secondary actions |
| `--coral-500` | `#FF6B6B` | Soft Accent | Alerts, notifications |
| `--turquoise-500` | `#40E0D0` | Success | Success states, positive |

### Neutral Colors (Sand/Slate)

| Token | Hex | Role | Usage |
|-------|-----|------|-------|
| `--sand-50` | `#FDFBF7` | Lightest | Light backgrounds |
| `--sand-100` | `#F5EFE6` | Light | Card backgrounds |
| `--sand-200` | `#E8DFD0` | Light Border | Borders |
| `--sand-300` | `#C9BBA8` | Muted | Placeholder text |
| `--slate-500` | `#64748B` | Secondary | Body text |
| `--slate-700` | `#334155` | Primary Text | Headings |
| `--slate-900` | `#0F172A` | Dark Text | Primary content |

### Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--success` | `#10B981` | Success states |
| `--warning` | `#F59E0B` | Warnings |
| `--error` | `#EF4444` | Errors |
| `--info` | `#3B82F6` | Informational |

### Light Mode

| Token | Hex | Role |
|-------|-----|------|
| `--bg-primary` | `#FFFFFF` | Main background |
| `--bg-secondary` | `#F8FAFC` | Secondary surfaces |
| `--bg-tertiary` | `#F1F5F9` | Tertiary surfaces |
| `--text-primary` | `#0F172A` | Primary text |
| `--text-secondary` | `#475569` | Secondary text |
| `--text-muted` | `#94A3B8` | Muted text |
| `--border` | `#E2E8F0` | Borders |

### Dark Mode

| Token | Hex | Role |
|-------|-----|------|
| `--bg-primary` | `#0A1628` | Main background |
| `--bg-secondary` | `#0F2744` | Secondary surfaces |
| `--bg-tertiary` | `#1A3A5C` | Tertiary surfaces |
| `--text-primary` | `#F8FAFC` | Primary text |
| `--text-secondary` | `#CBD5E1` | Secondary text |
| `--text-muted` | `#64748B` | Muted text |
| `--border` | `#264D73` | Borders |

### Theme Modes

| Theme | Primary Colors | Background | Best For |
|-------|---------------|------------|----------|
| **Ocean** | Ocean blues | Deep sea / bright horizon | Professional services, B2B |
| **Sunset** | Orange/coral accents | Warm tones | Tourism, lifestyle, hospitality |
| **Emerald** | Palm greens | Jungle / fresh green | Environment, eco-tourism |
| **Coral Reef** | Coral + turquoise | Underwater blues | Marine, beach, water sports |

---

## 3. Typography

### Font Families

**Primary Font** (Headings & UI):
```
font-family: 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
```

**Monospace Font** (Code & Technical):
```
font-family: 'Geist Mono', 'JetBrains Mono', 'Fira Code', monospace
```

### Type Scale

| Level | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| Display | 48px / 3rem | 1.1 | 800 | Hero headlines |
| H1 | 36px / 2.25rem | 1.2 | 700 | Page titles |
| H2 | 30px / 1.875rem | 1.25 | 700 | Section headers |
| H3 | 24px / 1.5rem | 1.3 | 600 | Subsection |
| H4 | 20px / 1.25rem | 1.4 | 600 | Card titles |
| Body Large | 18px / 1.125rem | 1.6 | 400 | Lead paragraphs |
| Body | 16px / 1rem | 1.6 | 400 | Standard text |
| Body Small | 14px / 0.875rem | 1.5 | 400 | Secondary text |
| Caption | 12px / 0.75rem | 1.4 | 500 | Labels, badges |
| Overline | 11px / 0.6875rem | 1.3 | 600 | Category labels |

### Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Regular | 400 | Body text |
| Medium | 500 | Emphasis, UI labels |
| Semibold | 600 | Headings, buttons |
| Bold | 700 | Strong emphasis |
| Black | 800 | Display, hero |

---

## 4. Component Stylings - Base

### Buttons

**Primary Button**:
```css
background: var(--ocean-500);
color: white;
border-radius: 12px;
padding: 12px 24px;
font-weight: 600;
transition: all 0.2s ease;
```
Hover: `background: var(--ocean-400)`

**Secondary Button**:
```css
background: transparent;
color: var(--ocean-500);
border: 2px solid var(--ocean-500);
border-radius: 12px;
padding: 12px 24px;
font-weight: 600;
```
Hover: `background: var(--ocean-500); color: white`

**Accent Button**:
```css
background: var(--sunset-500);
color: white;
border-radius: 12px;
padding: 12px 24px;
font-weight: 600;
```
Hover: `background: var(--sunset-400)`

**Ghost Button**:
```css
background: transparent;
color: var(--slate-500);
border-radius: 12px;
padding: 12px 24px;
font-weight: 500;
```
Hover: `background: var(--bg-tertiary); color: var(--text-primary)`

### Button Sizes

| Size | Padding | Font Size | Border Radius |
|------|---------|-----------|---------------|
| sm | 8px 16px | 14px | 8px |
| md | 12px 24px | 16px | 12px |
| lg | 16px 32px | 18px | 16px |
| xl | 20px 40px | 20px | 20px |

### Cards

```css
background: var(--bg-secondary);
border: 1px solid var(--border);
border-radius: 16px;
padding: 24px;
box-shadow: 0 1px 3px rgba(0,0,0,0.05);
```

**Card Hover**:
```css
transform: translateY(-2px);
box-shadow: 0 8px 30px rgba(0,0,0,0.12);
border-color: var(--ocean-500);
```

### Form Inputs

```css
background: var(--bg-primary);
border: 1px solid var(--border);
border-radius: 12px;
padding: 12px 16px;
font-size: 16px;
color: var(--text-primary);
transition: all 0.2s ease;
```

**Input Focus**:
```css
border-color: var(--ocean-500);
box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.2);
```

**Input Error**:
```css
border-color: var(--error);
box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
```

### Navigation

**Top Nav**:
```css
background: rgba(255, 255, 255, 0.8);
backdrop-filter: blur(12px);
border-bottom: 1px solid var(--border);
height: 64px;
padding: 0 24px;
```

**Sidebar**:
```css
background: var(--bg-secondary);
width: 280px;
border-right: 1px solid var(--border);
```

### Badges & Tags

```css
background: rgba(0, 102, 204, 0.1);
color: var(--ocean-500);
border-radius: 100px;
padding: 4px 12px;
font-size: 12px;
font-weight: 600;
```

**Status Badge Variants**:
- Success: `background: rgba(16, 185, 129, 0.1); color: var(--success)`
- Warning: `background: rgba(245, 158, 11, 0.1); color: var(--warning)`
- Error: `background: rgba(239, 68, 68, 0.1); color: var(--error)`
- Info: `background: rgba(59, 130, 246, 0.1); color: var(--info)`

---

## 5. Layout Principles

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight spacing |
| `--space-2` | 8px | Component internal |
| `--space-3` | 12px | Related elements |
| `--space-4` | 16px | Standard padding |
| `--space-5` | 20px | Section padding |
| `--space-6` | 24px | Card padding |
| `--space-8` | 32px | Section gaps |
| `--space-10` | 40px | Major sections |
| `--space-12` | 48px | Hero spacing |
| `--space-16` | 64px | Page margins |
| `--space-20` | 80px | Large gaps |
| `--space-24` | 96px | Full sections |

### Grid System

**Container**:
```css
max-width: 1280px;
padding: 0 24px;
margin: 0 auto;
```

**Grid**:
```css
display: grid;
gap: 24px;
```

| Grid Type | Columns |
|-----------|---------|
| Mobile | 1 column |
| Tablet | 2 columns |
| Desktop | 3 columns |
| Wide | 4 columns |

### Responsive Breakpoints

| Breakpoint | Width | Target |
|------------|-------|--------|
| xs | 480px | Large phones |
| sm | 640px | Tablets portrait |
| md | 768px | Tablets landscape |
| lg | 1024px | Laptops |
| xl | 1280px | Desktops |
| 2xl | 1536px | Wide screens |

---

## 6. Depth & Elevation

### Shadow Scale

```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1);
--shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1);
--shadow-xl: 0 20px 25px -5px rgba(0,0,0,0.1);
--shadow-glow: 0 0 40px rgba(0, 102, 204, 0.3);
```

### Layer Hierarchy

| Layer | Elevation | Usage |
|-------|-----------|-------|
| Base | 0 | Page background |
| Card | 1 | Content cards |
| Dropdown | 2 | Menus, popovers |
| Sticky | 3 | Navigation |
| Modal | 4 | Dialogs, modals |
| Toast | 5 | Notifications |

### Gradients

**Hero Gradient**:
```css
background: linear-gradient(135deg, var(--ocean-900) 0%, var(--ocean-800) 50%, var(--sunset-600) 100%);
```

**Card Gradient**:
```css
background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
```

**Accent Glow**:
```css
background: radial-gradient(circle at center, rgba(0, 102, 204, 0.2) 0%, transparent 70%);
```

---

## 7. Do's and Don'ts

### Do
✅ Use semantic color tokens for consistent meaning  
✅ Maintain 16px minimum touch targets on mobile  
✅ Use clear visual hierarchy (size, weight, color)  
✅ Include adequate whitespace (minimum 24px between sections)  
✅ Use icons consistently with the platform style  
✅ Support both dark and light modes  
✅ Follow the spacing scale exactly  

### Don't
❌ Use arbitrary colors outside the palette  
❌ Create custom font sizes outside the type scale  
❌ Use shadows for non-interactive elements  
❌ Mix different border radius values on the same page  
❌ Use more than 3 font weights on a single page  
❌ Create custom spacing values not in the spacing scale  
❌ Use pure black (#000000) or pure white (#FFFFFF)  

---

## 8. Vendor Type Design Variants

### 8.1 Food Kitchens

**Design Inspiration**: Uber Eats, DoorDash

**Store Header**:
- Logo: 48px, left-aligned
- Banner: None or small 80px gradient banner
- Colors: Sunset accent for food highlights

**Card Layout** (Food Item):
```css
border-radius: 12px;
image-height: 160px;
title: 16px semibold;
price: 14px bold, sunset-500;
description: 14px, truncated 2 lines;
```

**Menu Section**:
- Category tabs: Horizontal scroll, chip-style
- Items: Grid 2 columns mobile, 3 desktop
- Add to cart: Floating button bottom-right

**Order Tracking**:
- Progress bar: Horizontal, 4 stages
- Status badges: Icon + text, color-coded

**Reference**: See `/docs/design-platforms/uber_reference.md`

---

### 8.2 Restaurants (Full Dine-in)

**Design Inspiration**: OpenTable, Yelp

**Store Header**:
- Logo: 64px, centered
- Banner: Full-width 200px with parallax
- Cover image with gradient overlay

**Reservation Widget**:
- Date picker: Calendar grid
- Time selector: Horizontal scroll chips
- Party size: Stepper control

**Review Cards**:
- Avatar: 40px circle
- Star rating: 5 stars, filled coral
- Review text: Body with "Read more" truncation

**Table Booking Flow**:
1. Date/Time selection
2. Party size
3. Special requests (textarea)
4. Confirmation with QR code

**Reference**: See `/docs/design-platforms/airbnb_reference.md`

---

### 8.3 Shops (Retail)

**Design Inspiration**: Shopify, Etsy

**Store Header**:
- Logo: 56px left
- Banner: 160px with store branding
- Follow button: Pill shape, accent color

**Product Grid**:
```css
columns: 2 mobile, 3 tablet, 4 desktop;
gap: 16px;
card-radius: 12px;
image-aspect: 1:1;
```

**Product Card**:
```css
image-height: 200px;
title: 14px, max 2 lines;
price: 16px bold;
original-price: strikethrough, muted;
badges: "Sale", "New" (top-right corner);
```

**Variant Selector**:
- Color swatches: 24px circles
- Size buttons: Pill chips
- Quantity: Stepper input

**Cart Drawer**:
- Slide-in from right
- Item list with quantity controls
- Subtotal + Checkout button

**Reference**: See `/docs/design-platforms/shopify_reference.md`

---

### 8.4 Service Providers

**Design Inspiration**: Thumbtack, TaskRabbit, Zapier

**Profile Header**:
- Avatar: 80px circle with verification badge
- Name: H2, bold
- Tagline: 16px, secondary color
- Rating: Stars + count

**Service Cards**:
```css
border: 1px solid var(--border);
border-radius: 16px;
padding: 20px;
icon: 40px, accent background;
title: 18px semibold;
description: 14px, 3 lines;
price: "From $X" format;
```

**Portfolio Gallery**:
- Masonry grid layout
- Lightbox on click
- Before/After slider option

**Booking Calendar**:
- Month view with available dates highlighted
- Time slots: 1-hour blocks
- Confirmation modal

**Quote Request Form**:
- Multi-step wizard
- Project details textarea
- Budget range slider
- Photo upload

**Reference**: See `/docs/design-platforms/zapier_reference.md`

---

### 8.5 Health & Beauty

**Design Inspiration**: Mindbody, Fresha

**Booking Widget**:
- Sticky on scroll (right side desktop)
- Service selection: Accordion list
- Staff selection: Avatar + rating
- Date/Time: Calendar picker

**Staff Profiles**:
```css
avatar: 64px;
name: 18px semibold;
title: 14px, secondary;
specialties: Tags (pill);
availability: "Available Today" badge;
```

**Service Menu**:
- Category sidebar (desktop) / tabs (mobile)
- Duration + Price displayed
- "Book Now" button per item

**Reviews**:
- Photo reviews supported
- Star rating breakdown (5 bars)
- Verified booking badge

---

### 8.6 Automotive

**Design Inspiration**: AutoRepair shops

**Service List**:
```css
card-layout: List view (image left, details right);
image-size: 120px 120px;
services-list: Bullet points;
"Get Quote" button: Secondary style;
```

**Quote Request**:
- Vehicle details: Year/Make/Model dropdowns
- Issue description: Textarea with photo upload
- Preferred date: Date picker
- Contact: Phone + email

**Service History**:
- Timeline view
- Status: Pending / In Progress / Complete
- Invoice links

---

### 8.7 Marine Services

**Design Inspiration**: Boatsetter, Viator

**Boat/Card Design**:
```css
image-slider: Multiple photos, swipeable;
boat-type-badge: Top-left overlay;
capacity: "Max X guests" pill;
amenities-icons: Row of 4-6;
price: "From $X/hour" or "$X/day";
```

**Availability Calendar**:
- Marine-specific: Tide times displayed
- Captain required: Badge prominent
- Weather conditions: Icon + text

**Charter Booking**:
- Route selection on map
- Itinerary timeline
- Add-ons: Snorkel gear, fishing equipment

**Theme**: Use Coral Reef theme (turquoise accents)

**Reference**: See `/docs/design-platforms/airbnb_reference.md` (marine variant)

---

### 8.8 Tour Operators

**Design Inspiration**: GetYourGuide, Viator

**Tour Card**:
```css
image-height: 180px;
duration-badge: Bottom-left overlay;
rating: Star + count, top-right;
highlights: 3-4 bullet icons;
price: "From $X" prominent;
```

**Itinerary Display**:
- Timeline vertical
- Time + activity + location
- Expandable details

**Date Selection**:
- Calendar with tour availability
- Group size selector
- Price calculator (updates live)

**Reviews Section**:
- Trip photos from users
- "Traveler photos" tab
- Language filters

---

### 8.9 Event Services

**Design Inspiration**: GigSalad, Shopify (dark theme)

**Portfolio Gallery**:
```css
masonry-grid: 3 columns;
lightbox: Full-screen with carousel;
category-tabs: Photos / Videos / Reviews;
```

**Availability Calendar**:
- Event type selector (Wedding, Corporate, etc.)
- Package selector
- Location radius filter

**Service Packages**:
- Package cards: Basic / Standard / Premium
- Feature comparison table
- Custom quote button

**Reference**: See `/docs/design-platforms/shopify_reference.md`

---

### 8.10 Professional Services

**Design Inspiration**: LinkedIn, Notion

**Profile Page**:
```css
header: Large cover image;
avatar: 100px, overlapping cover;
name: H1;
title: 18px, secondary;
credentials: Badges row;
contact-buttons: Primary + Ghost;
```

**Credentials Display**:
- License/Certification badges
- Years of experience
- Specializations (tags)
- Education (timeline)

**Contact Form**:
- Service type dropdown
- Message textarea
- Preferred contact method
- Attach files

**Reference**: See `/docs/design-platforms/notion_reference.md`

---

## 9. Listing Type Designs

### 9.1 Products (Physical Goods)

**Design Inspiration**: Amazon, Etsy, Shopify

**Product Card**:
```css
image: 1:1 aspect ratio;
title: 14px, 2 lines max;
vendor: 12px, muted;
price: 16px bold;
original-price: strikethrough if discounted;
rating: Stars + count;
prime-badge: Optional;
```

**Detail Page**:
- Image gallery: Main + thumbnails
- Price: Large, with "Deal" badge if applicable
- Variants: Swatches for color/size
- Add to cart: Sticky bottom on mobile
- Description: Collapsible sections
- Reviews: Sortable, filterable

**Listing Form**:
- Title + Description (rich text)
- Price + Compare-at price
- Category selector
- Images: Drag-drop, up to 10
- Variants: Color, Size, Material
- Inventory: SKU, quantity
- Shipping: Dimensions, weight

---

### 9.2 Services

**Design Inspiration**: Thumbtack, Zapier

**Service Card**:
```css
icon: 48px, accent bg (rounded);
title: 18px semibold;
description: 14px, 3 lines;
rating: Stars + jobs completed;
price: "From $X" or "Fixed $X";
location: City/region;
```

**Detail Page**:
- About section: Long-form text
- Portfolio: Grid of images/videos
- Reviews: With verified badge
- FAQ: Collapsible
- Book / Contact buttons

**Service Form**:
- Category + Subcategory
- Title + Description
- Pricing: Hourly / Fixed / Package
- Availability calendar
- Location + Service area

---

### 9.3 Rentals

**Design Inspiration**: Airbnb, Turo

**Rental Card**:
```css
image-carousel: Swipeable;
location: Below image;
title: 16px, 2 lines;
details: "X beds • X baths • X guests";
price: "$X / night" bold;
rating: Stars + count;
superhost-badge: If applicable;
```

**Detail Page**:
- Photo grid: Masonry layout
- Title + Location (with map link)
- Amenities: Icons + list, filterable
- Calendar: Date range picker
- Reviews: Summary + list
- Host: Profile card + contact

**Rental Form**:
- Property type selector
- Address (with map pin)
- Amenities checkboxes
- House rules
- Pricing: Night / Week / Month
- Availability settings

---

### 9.4 Transport

**Design Inspiration**: Uber, Uber Eats

**Route Card**:
```css
vehicle-icon: 40px;
route: "From X to Y" with icons;
vehicle-type: UberX / Comfort / XL;
eta: "X min away";
price: Estimated range;
surge-indicator: Red if applicable;
```

**Tracking View**:
- Map: Full-screen with driver location
- Status: Searching / Arriving / In Trip
- Driver card: Photo + name + rating
- License plate: Highlighted
- Contact buttons: Call / Message

**Transport Form**:
- Pickup location (autocomplete)
- Dropoff location
- Vehicle type selection
- Schedule: Now / Later
- Preferences: Pets, Luggage, etc.

---

### 9.5 Campaigns (Fundraising)

**Design Inspiration**: GoFundMe

**Campaign Card**:
```css
image: 16:9 aspect;
title: 18px semibold;
organizer: Avatar + name;
progress-bar: Percentage filled;
goal: "$X raised of $Y goal";
days-left: "X days to go";
share-buttons: Row;
```

**Detail Page**:
- Story: Rich text with images
- Updates: Timeline of campaign news
- Backers: List with amounts (optional)
- Reward tiers: If applicable
- Share: Social + copy link

**Campaign Form**:
- Goal amount
- Title + Story (editor)
- Cover image
- Category
- Deadline
- Reward tiers (optional)

---

### 9.6 Auctions (Live Bidding)

**Design Inspiration**: WhatNot, eBay Live

**Auction Card**:
```css
live-indicator: Red dot + pulse animation;
image: Square, product focus;
title: 14px semibold;
current-bid: Large, bold, sunset accent;
time-left: Countdown format "2h 15m";
bid-count: "X bids";
watch-button: Heart icon;
quick-bid: "+$5" button;
```

**Live Auction View**:
- Full-screen product display
- Bid stream: Scrolling list
- Current high bidder: Highlighted
- Timer: Large, with extension indicator
- Quick bid buttons: +$5, +$10, +$20, Custom
- Chat: Floating comments

**"Sudden Death" Timer**:
- Timer color: Red (#EF4444) when < 30 seconds
- Pulse animation: Faster as time decreases
- Extension indicator: "Time extended!" banner
- Reset to 30 seconds on bid in last 30s
- Audio cue: Optional notification sound

**Auction Form**:
- Starting bid
- Reserve price (optional)
- Duration: 5min / 15min / 30min / 1hr
- Buy now price (optional)
- Product details + images

---

## 10. Community Section Designs

### 10.1 Feed

**Design Inspiration**: Instagram

**Layout**:
- Single column, centered (max-width 470px)
- Stories: Horizontal scroll top, circular avatars
- Post card: Full-width images

**Post Card**:
```css
header: Avatar (32px) + Username + timestamp;
content: Text (expandable), images (swipeable);
actions: Like / Comment / Share (icons + count);
comments: Preview 2, "View all X comments";
```

**Create Post**:
- Image/video upload
- Caption textarea
- Tag users
- Location
- Privacy selector

**Reference**: See `/docs/design-platforms/instagram_reference.md` (to be created)

---

### 10.2 Business (Networking)

**Design Inspiration**: LinkedIn

**Company Card**:
```css
logo: 48px;
name: 16px semibold;
tagline: 14px, secondary;
industry: Badge style;
followers: "X followers";
follow-button: Outline style;
```

**Profile View**:
- Cover image + Logo
- About section
- Stats: Employees, Founded, Location
- Team: Grid of member cards

**Job Listings**:
```css
company-logo: 48px;
job-title: 18px semibold;
company-name: 14px;
location + salary: Tags;
easy-apply: Button variant;
```

---

### 10.3 Groups (Forums)

**Design Inspiration**: Facebook Groups

**Group Card**:
```css
cover-image: 16:9;
name: 18px semibold;
member-count: "X members";
privacy-badge: Public / Private;
join-button: Primary style;
```

**Group Detail**:
- Header: Cover + Stats
- Tabs: Discussion / Events / Files / Members
- Post composer
- Feed: Mixed media posts

**Reference**: See `/docs/design-platforms/facebook_reference.md` (to be created)

---

### 10.4 Stories (Long-form)

**Design Inspiration**: Medium, Substack

**Article Layout**:
- Title: H1, large
- Author: Avatar + name + date
- Cover image: Full-width
- Content: Rich text, embedded media
- Tags: Bottom
- Reactions: Claps / Comments

**Article Card**:
```css
image: 16:9;
title: 20px semibold;
excerpt: 14px, 2 lines;
author: Avatar + name;
read-time: "X min read";
```

---

### 10.5 Events

**Design Inspiration**: Eventbrite, Facebook Events

**Event Card**:
```css
date-badge: Month + Day (prominent, left);
image: 16:9 aspect;
title: 18px semibold;
date-time: "Fri, Mar 15 • 7:00 PM";
location: With map pin icon;
attendees: "X attending" + avatars;
rsvp-button: Toggle states;
```

**Event Detail**:
- Cover image + Title
- Date/Time with calendar add button
- Location with map embed
- Description
- Attendees grid
- Organizer profile

**Create Event**:
- Title + Description
- Date/Time picker
- Location (venue or virtual)
- Ticket types (free / paid)
- Cover image

---

### 10.6 Jobs

**Design Inspiration**: Indeed, LinkedIn Jobs

**Job Card**:
```css
company-logo: 48px;
job-title: 18px semibold;
company-name: 14px;
location: With remote badge option;
salary: If provided;
posted-date: Relative ("2d ago");
easy-apply: Green button;
```

**Job Detail**:
- Header: Title + Company + Location
- Salary + Type (Full-time/Part-time)
- Description: Rich text
- Requirements: Bullet list
- How to apply: Button or instructions

**Post Job Form**:
- Title + Description
- Location + Remote option
- Salary range
- Job type
- Application method

---

### 10.7 Map (Discovery)

**Design Inspiration**: Google Maps, Yelp

**Map View**:
- Full-screen map with cluster markers
- Filter bar: Category + Price + Rating
- Results sidebar (collapsible on mobile)

**Pin/Preview Card**:
```css
thumbnail: 80px square;
name: 16px semibold;
category: Badge;
rating: Stars + count;
distance: "X km away";
price: If applicable;
action-buttons: Direction / Call / Save;
```

---

## 11. Transport Interface Designs

### 11.1 Taxi Service

**Driver View** (See `/docs/design-platforms/uber_reference.md`):
- Job queue: List of available rides
- Current job: Map with route
- Earnings: Daily/Weekly summary
- Acceptance: Accept/Decline buttons

**Customer View**:
- Request form: Pickup + Dropoff
- Ride options: Different vehicle types
- Tracking: Real-time driver location
- Payment: Auto-charge + receipt

### 11.2 Delivery

**Driver View**:
- Package queue: Multi-stop route
- Package details: Size, instructions
- Route: Map navigation
- Earnings: Per delivery + tips

**Customer View**:
- Send package: Size selector
- Route: Pickup + Dropoff
- Tracking: Timeline view
- Receive: Notification + proof

### 11.3 Pickup (Food/Retail)

**Seller View**:
- Order queue: List of pending orders
- Status: Preparing / Ready
- Customer notification: "Order Ready"
- Code display: For pickup verification

**Customer View**:
- Order list: Status timeline
- Ready notification: Push + in-app
- Code display: For pickup
- Timer: Ready by time

---

## 12. Auction Design - "Sudden Death"

**Design Inspiration**: WhatNot, StockX Live

### Key Visual Elements

**Live Indicator**:
```css
background: var(--coral-500);
width: 8px;
height: 8px;
border-radius: 50%;
animation: pulse 1.5s infinite;
```

**Countdown Timer**:
```css
font-size: 32px;
font-weight: 700;
font-family: var(--font-mono);
```

**Urgent State** (< 30 seconds):
```css
color: var(--coral-500);
animation: pulse 0.5s infinite;
```

### Auction Card Components

```
┌─────────────────────────────────┐
│ 🔴 LIVE              + Watch   │
│ ┌───────────────────────────┐  │
│ │       Product Image       │  │
│ └───────────────────────────┘  │
│ Product Name                    │
│ $125.00                    24b  │
│ ─────────────────────────────  │
│ 02:45                        🎯 │
│ [+5] [+10] [+20]              │
└─────────────────────────────────┘
```

### Quick Bid Buttons

| Button | Action | Style |
|--------|--------|-------|
| +$5 | Add $5 to current bid | Secondary |
| +$10 | Add $10 to current bid | Secondary |
| +$20 | Add $20 to current bid | Secondary |
| Custom | Open bid input | Ghost |

### Bid History Stream

```css
height: 200px;
overflow-y: scroll;
item-padding: 8px;
bidder-name: Truncated after 20 chars;
bid-amount: Right-aligned, bold;
timestamp: Relative ("2s ago");
```

### "Sudden Death" Rules

1. **Initial timer**: Set duration (e.g., 5 minutes)
2. **Extension trigger**: Bid in last 30 seconds
3. **Extension action**: Reset timer to 30 seconds
4. **Visual feedback**: 
   - Timer turns red
   - Pulse animation speeds up
   - "Time Extended!" banner appears
5. **End condition**: No bids for 30 seconds = SOLD

---

## 13. Admin Dashboard

**Design Inspiration**: Linear, Notion

### 13.1 Overview Dashboard

**Stats Cards**:
```css
grid: 4 columns (2 tablet, 1 mobile);
icon: 24px, accent color bg;
value: 32px bold;
label: 14px, secondary;
change: "+X% vs last week", green/red;
```

**Charts**:
- Revenue: Line graph
- Orders: Bar chart
- Top vendors: Horizontal list
- Activity feed: Timeline

### 13.2 ZeroClaw Agent Panel

**Agent Status Grid**:
```
┌─────────────────────────────────────────┐
│ Agent Name    Status    Memory   Cron  │
├─────────────────────────────────────────┤
│ Hermes        🟢 Running  85%    5m    │
│ Paperclip    🟡 Idle     42%    15m   │
│ MiroFish     🟢 Running  67%    30m   │
│ Unsloth      🔴 Error    --     --    │
└─────────────────────────────────────────┘
```

**Agent Detail View**:
- Status indicator (color-coded)
- Memory usage: Progress bar
- Last cron run timestamp
- Logs: Scrollable terminal output
- Control buttons: Start / Stop / Restart

**Memory Dashboard**:
- Context usage visualization
- Recent memory entries (list)
- Clear memory button
- Export memory option

### 13.3 Vendor Management

**Vendor Table**:
```css
columns: Avatar, Name, Type, Status, Actions;
sortable: All columns;
filterable: Type, Status;
bulk-actions: Select all + action dropdown;
row-hover: Highlight;
```

**Actions**:
- View profile
- Edit details
- Toggle status (Active/Suspended)
- Delete (with confirmation)

### 13.4 Reports

**Export Options**:
- Format: CSV, PDF, Excel
- Date range: Preset + Custom
- Schedule: Daily/Weekly/Monthly

**Scheduled Reports**:
- List of active schedules
- Next run time
- Enable/Disable toggle

### 13.5 Moderation

**Content Queue**:
```css
flags: Reported items list;
preview: Image/text snippet;
reason: Reported reason;
actions: Approve / Reject / Escalate;
```

**AI-assisted Flags**:
- Auto-detection badge
- Confidence score
- Quick actions

**Reference**: See `/docs/design-platforms/linear_reference.md` (to be created)

---

## 14. Platform-Specific Reference

### Available Reference Files

| File | Platform | Usage |
|------|----------|-------|
| `airbnb_reference.md` | Airbnb | Rentals, Marine, Tours |
| `uber_reference.md` | Uber | Transport, Food Kitchens |
| `shopify_reference.md` | Shopify | Shops, Products, Events |
| `stripe_reference.md` | Stripe | Payments, Pricing |
| `figma_reference.md` | Figma | Design tools UI |
| `notion_reference.md` | Notion | Content, Professional |
| `zapier_reference.md` | Zapier | Services, Automation |
| `linear_reference.md` | Linear | Admin Dashboard |
| `whatnot_reference.md` | WhatNot | Auctions (CREATE) |

### Reference File Location

All reference files are stored in:
```
/docs/design-platforms/
```

### Usage Notes

1. **Base tokens come from Section 2-6** of this DESIGN.md
2. **Vendor-specific styles** reference the platform files
3. **Override with Caribbean tokens** where specified in vendor sections
4. **For whatnot/linear** - create manually as they're not available on getdesign.md

---

## Agent Prompt Guide

When using this design system in an AI agent, use these prompts:

**For a landing page:**
```
Create a landing page using DESIGN.md as the visual reference. 
Include a hero section with gradient background, services grid with image cards, 
partner ecosystem section, and footer. Use the ocean theme with sunset accents.
```

**For a vendor store:**
```
Build a [Vendor Type] store page following DESIGN.md vendor variants section.
Use [airbnb/shopify/zapier] reference for specific component patterns.
Apply Caribbean theme tokens from the color palette.
```

**For an auction page:**
```
Create auction UI with "Sudden Death" timer following DESIGN.md Section 12.
Include live indicator, countdown timer, bid history, and quick bid buttons.
Use sunset accent colors for urgency states.
```

**For admin dashboard:**
```
Build admin dashboard using DESIGN.md Section 13.
Include ZeroClaw agent panel, vendor management table, and stats cards.
Apply linear-style dark theme.
```

---

## Preview Files

See companion preview files for visual reference:
- `/docs/preview.html` - Light mode preview
- `/docs/preview-dark.html` - Dark mode preview

---

*This design system is custom-created for IBT Solutions and IslandHub. 
Not affiliated with any mentioned brands. Design inspiration only.*