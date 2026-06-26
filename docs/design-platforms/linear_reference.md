# Linear-Inspired Design System - Reference

> Source: Manually created based on Linear app UI analysis

## 1. Color Palette

### Dark Theme (Primary)
| Name | Hex | Role |
|------|-----|------|
| Void | #0D0D0F | Page background |
| Surface | #141415 | Card surfaces |
| Surface Elevated | #1A1A1D | Elevated elements |
| Border | #2A2A2E | Borders |
| Border Subtle | #222226 | Subtle dividers |

### Accent Colors
| Name | Hex | Role |
|------|-----|------|
| Purple | #5E6AD2 | Primary accent |
| Purple Hover | #757AC7 | Accent hover |
| Purple Light | #8B96D9 | Light accent bg |

### Text
| Name | Hex | Role |
|------|-----|------|
| Text Primary | #FFFFFF | Primary text |
| Text Secondary | #A1A1AA | Secondary text |
| Text Muted | #71717A | Muted text |

### Status Colors
| Name | Hex | Role |
|------|-----|------|
| Success | #2EA043 | Success states |
| Warning | #D29922 | Warning states |
| Error | #F85149 | Error states |
| Info | #539BF5 | Info states |

## 2. Typography Scale

| Style | Size/Weight/Line Height | Usage |
|-------|------------------------|-------|
| Display | 32px / 600 / 1.2 | Large headings |
| Heading 1 | 24px / 600 / 1.3 | Page titles |
| Heading 2 | 18px / 600 / 1.4 | Section titles |
| Heading 3 | 14px / 600 / 1.4 | Card titles |
| Body | 14px / 400 / 1.5 | Standard text |
| Body Small | 13px / 400 / 1.5 | Secondary text |
| Caption | 12px / 500 / 1.4 | Labels, metadata |
| Micro | 11px / 500 / 1.3 | Fine print |

**Font:** Inter (variable weight)

## 3. Component Patterns

### Buttons

| Variant | Style |
|---------|-------|
| Primary | bg:#5E6AD2, color:#fff, 6px radius |
| Secondary | bg:transparent, border:#2A2A2E, color:#fff |
| Ghost | bg:transparent, color:#A1A1AA |
| Destructive | bg:#F85149, color:#fff |

```css
button {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.15s ease;
}
```

### Cards

```css
card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
}
card-elevated {
  background: var(--surface-elevated);
}
```

### Sidebar Navigation

```css
sidebar {
  width: 240px;
  background: var(--surface);
  border-right: 1px solid var(--border);
}
nav-item {
  padding: 8px 12px;
  border-radius: 6px;
  color: var(--text-secondary);
}
nav-item-active {
  background: rgba(94, 106, 210, 0.15);
  color: var(--purple);
}
```

### Data Tables

```css
table {
  width: 100%;
  border-collapse: collapse;
}
th {
  text-align: left;
  padding: 12px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border);
}
td {
  padding: 12px;
  font-size: 14px;
  border-bottom: 1px solid var(--border-subtle);
}
```

### Status Badges

| State | Style |
|-------|-------|
| Active | bg:rgba(46, 160, 67, 0.15), color:#2EA043 |
| Pending | bg:rgba(210, 153, 34, 0.15), color:#D29922 |
| Error | bg:rgba(248, 81, 73, 0.15), color:#F85149 |
| Info | bg:rgba(83, 155, 245, 0.15), color:#539BF5 |

### Input Fields

```css
input {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 14px;
  color: var(--text-primary);
}
input:focus {
  border-color: var(--purple);
  outline: none;
}
```

## 4. Spacing Scale

Base: 4px
| Value | Usage |
|-------|-------|
| 4px | Tight |
| 8px | Component |
| 12px | Related |
| 16px | Standard |
| 24px | Section |
| 32px | Large |
| 48px | Page |

## 5. Border Radius

| Value | Usage |
|-------|-------|
| 4px | Small elements, tags |
| 6px | Buttons, inputs |
| 8px | Cards |
| 12px | Large cards |
| 16px | Modals |

## 6. Elevation

| Level | Shadow |
|-------|--------|
| Flat | No shadow |
| Subtle | 0 1px 2px rgba(0,0,0,0.2) |
| Medium | 0 4px 8px rgba(0,0,0,0.2) |
| Focus Ring | 0 0 0 2px var(--purple) |

## 7. Interactive Behaviors

### Hover States
```css
hover {
  background: var(--surface-elevated);
}
```

### Transitions
```css
transition: all 0.15s ease;
```

### Loading States
- Skeleton screens with subtle shimmer
- Spinner: Purple, 16px

## IslandHub Usage

**Admin Dashboard:**
- Sidebar navigation
- Stats cards with trend indicators
- Data tables with sorting/filtering
- Status badges
- ZeroClaw agent status panel

**Dashboard Components:**
- Overview stats (revenue, orders, vendors)
- Agent status grid
- Vendor management table
- Reports and exports
- Content moderation queue

**Design Character:**
- Ultra-minimal dark theme
- Purple accent for primary actions
- Precise typography hierarchy
- Clean data visualization
- Focus on content over chrome

**Reference**: Use for admin dashboard, vendor management, analytics views