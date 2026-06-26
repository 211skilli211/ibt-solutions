# WhatNot-Inspired Design System - Reference

> Source: Manually created based on WhatNot app UI analysis

## 1. Color Palette

### Live Auction Theme
| Name | Hex | Role |
|------|-----|------|
| Live Red | #FF3B3B | Live indicator, urgency |
| Bid Green | #10B981 | Winning bid, success |
| Coral | #FF6B6B | Accent, alerts |
| Dark Surface | #1A1A1A | Background |
| Card Dark | #252525 | Card surfaces |
| Border Dark | #333333 | Borders |
| Text White | #FFFFFF | Primary text |
| Text Muted | #9CA3AF | Secondary text |

### Light Mode Variant
| Name | Hex | Role |
|------|-----|------|
| Live Red | #DC2626 | Live indicator |
| Background | #FFFFFF | Page bg |
| Card | #F9FAFB | Card surfaces |
| Border | #E5E7EB | Borders |

## 2. Typography Scale

| Style | Size/Weight/Line Height | Usage |
|-------|------------------------|-------|
| Display | 48px / 700 / 1.1 | Hero timers |
| Heading 1 | 32px / 700 / 1.2 | Section titles |
| Heading 2 | 24px / 600 / 1.3 | Card titles |
| Body | 16px / 400 / 1.5 | Standard text |
| Body Bold | 16px / 600 / 1.5 | Bid amounts |
| Caption | 14px / 500 / 1.4 | Metadata |
| Micro | 12px / 400 / 1.3 | Timestamps |

**Font:** System UI stack (San Francisco, Segoe UI, Roboto)

## 3. Component Patterns

### Live Indicator
```css
display: inline-flex;
align-items: center;
gap: 6px;
background: var(--live-red);
color: white;
padding: 4px 12px;
border-radius: 100px;
font-size: 12px;
font-weight: 600;
```

**Pulse Animation**:
```css
animation: pulse 1.5s infinite;
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

### Countdown Timer

**Normal State**:
```css
font-size: 48px;
font-weight: 700;
font-family: monospace;
color: var(--text-white);
```

**Urgent State** (< 30 seconds):
```css
color: var(--live-red);
animation: pulse 0.5s infinite;
```

**Extended State**:
```css
banner: "Time Extended!";
background: var(--live-red);
animation: flash 0.3s;
```

### Quick Bid Buttons

| Button | Style |
|--------|-------|
| +$5 | Secondary, 999px radius |
| +$10 | Secondary, 999px radius |
| +$20 | Secondary, 999px radius |
| Custom | Ghost with input |

```css
button {
  padding: 12px 24px;
  border-radius: 999px;
  font-weight: 600;
  transition: all 0.15s ease;
}
button:hover {
  transform: scale(1.05);
}
```

### Bid History Stream

```css
max-height: 300px;
overflow-y: auto;
bid-item {
  padding: 8px 12px;
  border-bottom: 1px solid var(--border-dark);
  display: flex;
  justify-content: space-between;
}
bid-amount {
  font-weight: 600;
  color: var(--bid-green);
}
```

### Product Card (Auction)

```
┌─────────────────────────────────┐
│ 🔴 LIVE                         │
│ ┌─────────────────────────────┐ │
│ │       Product Image         │ │
│ │       (Square 1:1)          │ │
│ └─────────────────────────────┘ │
│ Product Title                    │
│ Current Bid: $125.00             │
│ Time Left: 02:45                 │
│ ─────────────────────────────── │
│ [+5] [+10] [+20] [Custom Bid]   │
└─────────────────────────────────┘
```

## 4. Form Elements

### Bid Input
```css
input {
  background: var(--card-dark);
  border: 2px solid var(--border-dark);
  border-radius: 8px;
  padding: 16px;
  font-size: 18px;
  color: white;
}
input:focus {
  border-color: var(--live-red);
}
```

### Validation
- Min bid: Current + increment
- Max bid: Optional reserve
- Error: "Bid must be at least $X"

## 5. Spacing Scale

Base: 4px
| Value | Usage |
|-------|-------|
| 4px | Tight |
| 8px | Component |
| 12px | Related |
| 16px | Standard |
| 24px | Section |
| 32px | Large |
| 48px | Hero |

## 6. Border Radius

| Value | Usage |
|-------|-------|
| 4px | Small elements |
| 8px | Inputs |
| 12px | Cards |
| 16px | Large cards |
| 999px | Buttons (pill) |

## 7. Elevation

| Level | Shadow |
|-------|--------|
| Base | No shadow |
| Hover | 0 4px 12px rgba(0,0,0,0.3) |
| Focus Ring | 0 0 0 2px var(--live-red) |

## 8. "Sudden Death" Timer Logic

### Timer States
1. **Normal**: White text, standard pulse
2. **Warning** (< 60s): Yellow text
3. **Critical** (< 30s): Red text, fast pulse
4. **Extended**: Red banner flash, reset to 30s

### Extension Rules
- If bid placed in last 30 seconds: Reset to 30 seconds
- Visual: Timer turns red, "Time Extended!" appears
- Audio: Optional notification sound

### End Conditions
- No bids for 30 seconds = SOLD
- Final price displayed
- Winner highlighted

## IslandHub Usage

**Auction Features:**
- Live auction cards
- Bid history
- Quick bid buttons
- "Sudden Death" timer
- Product gallery

**Design Character:**
- High contrast dark theme
- Red for urgency/live states
- Green for winning/success
- Prominent timers
- Quick action buttons
- Real-time updates