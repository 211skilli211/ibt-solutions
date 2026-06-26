# Stripe-Inspired Design System - Reference

> Source: https://getdesign.md/design-md/stripe/preview.html

## 1. Color Palette

### Primary
| Name | Hex | Role |
|------|-----|------|
| Stripe Purple | #533afd | Primary brand, CTA |
| Deep Navy | #061b31 | Headings |
| White | #ffffff | Page background |

### Brand & Dark
| Name | Hex | Role |
|------|-----|------|
| Brand Dark | #1c1e54 | Dark sections |
| Dark Navy | #0d253d | Darkest neutral |

### Accent
| Name | Hex | Role |
|------|-----|------|
| Ruby | #ea2261 | Accent, alerts |
| Magenta | #f96bee | Gradients, decorative |
| Magenta Light | #ffd7ef | Tinted surface |

### Interactive Purple Scale
| Name | Hex | Role |
|------|-----|------|
| Purple Hover | #4434d4 | CTA hover state |
| Purple Mid | #665efd | Range selectors |
| Purple Light | #b9b9f9 | Subdued hover bg |
| Purple Deep | #2e2b8c | Icon hover |

### Neutral & Status
| Name | Hex | Role |
|------|-----|------|
| Dark Slate | #273951 | Labels |
| Slate | #64748d | Body text |
| Border | #e5edf5 | Default border |
| Success | #15be53 | Status, badges |
| Lemon | #9b6829 | Warning accent |

### Border & Surface
| Name | Hex | Role |
|------|-----|------|
| Border Soft | #d6d9fc | Purple-tinted border |
| Dashed Border | #362baa | Drop zones |

## 2. Typography Scale

| Style | Size/Weight/Line Height | Usage |
|-------|------------------------|-------|
| Display Hero | 56px / 300 / 1.03 / -1.4px | Hero headlines |
| Display Large | 48px / 300 / 1.15 / -0.96px | Large titles |
| Section Heading | 32px / 300 / 1.10 / -0.64px | Section titles |
| Sub-heading Large | 26px / 300 / 1.12 / -0.26px | Big subheads |
| Sub-heading | 22px / 300 / 1.10 / -0.22px | Standard subheads |
| Body Large | 18px / 300 / 1.40 | Lead paragraphs |
| Body | 16px / 300 / 1.40 | Standard text |
| Button Text | 16px / 400 / 1.00 | Button labels |
| Link / Navigation | 14px / 400 / 1.00 | Links, nav |
| Caption | 12px / 300 / 1.45 | Small labels |
| Tabular Numbers | 12px / 300 / 1.33 | Financial data |
| Code Body | 12px / 500 / 2.00 | Code snippets |
| Code Label | 12px / 500 / uppercase | API labels |

**Fonts:** 
- Primary: sohne-var (Sohne, SF Pro Display) with ss01 feature
- Mono: Source Code Pro

## 3. Button Variants

| Variant | Style |
|---------|-------|
| Primary Purple | bg:#533afd, color:#fff, 4px radius |
| Ghost / Outlined | bg:transparent, border:#b9b9f9, color:#533afd |
| Transparent Info | bg:transparent, color:#2874ad, border:rgba(43,145,223,0.2) |
| Neutral Ghost | bg:transparent, color:rgba(16,16,16,0.3), outline border |
| Success Badge | bg:rgba(21,190,83,0.2), color:#108c3d |
| Neutral Badge | bg:#ffffff, color:#000000, border:#f6f9fc |

## 4. Card Patterns

- 6px border radius
- White background
- 1px #e5edf5 border
- Padding: 24px
- Badge on top with colored background
- Title: 22px, weight 300
- Description: 14px, Slate color

**Elevated Card:** Full blue-tinted shadow stack (rgba(50,50,93,0.25) 0px 30px 45px -30px)

## 5. Form Elements

| State | Style |
|-------|-------|
| Default | border:#e5edf5, 4px radius |
| Focus | border:#533afd, 1px purple ring |
| Error | border:#ea2261, 1px ruby ring |

**Input padding:** 10px 12px, font-size 14px

## 6. Spacing Scale

Base: 2px grid
| Value | Usage |
|-------|-------|
| 2px | Micro spacing |
| 4px | Tight |
| 6px | Component internal |
| 8px | Standard |
| 10px | Related |
| 12px | Section |
| 14px | Large |
| 16px | Section gaps |
| 18px | Major |
| 20px | Hero |

## 7. Border Radius

| Value | Usage |
|-------|-------|
| 1px | Micro |
| 4px | Buttons, inputs |
| 5px | Standard cards |
| 6px | Nav, large cards |
| 8px | Featured |

## 8. Elevation

| Level | Shadow |
|-------|--------|
| Level 0: Flat | No shadow |
| Level 1: Subtle | rgba(23,23,23,0.06) 0px 3px 6px |
| Level 2: Standard | rgba(23,23,23,0.08) 0px 15px 35px |
| Level 3: Elevated | Blue-tinted dual layer |
| Level 4: Deep | Dark blue-tinted |
| Focus | Purple 2px ring |

## IslandHub Usage

**Payment Features:**
- Checkout flow
- Payment forms
- Pricing displays
- Transaction history

**Listing Types:**
- Products (pricing display)
- Campaigns (fundraising progress)

**Design Character:** 
- Precision financial UI
- Purple accent for primary actions
- Light weight typography (300)
- Tight letter-spacing for headings
- Tabular numbers for prices