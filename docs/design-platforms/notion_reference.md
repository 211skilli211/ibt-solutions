# Notion Design Reference

Source: https://getdesign.md/design-md/notion/preview.html

## Color Palette

### Primary

| Name | Hex | Role |
|------|-----|------|
| Notion Black | rgba(0,0,0,0.95) | Primary text, headings |
| Pure White | #ffffff | Page background |
| Notion Blue | #0075de | Primary CTA, links |

### Warm Neutrals

| Name | Hex | Role |
|------|-----|------|
| Warm White | #f6f5f4 | Surface tint, sections |
| Warm Dark | #31302e | Dark surfaces |
| Warm Gray 500 | #615d59 | Secondary text |
| Warm Gray 300 | #a39e98 | Placeholder, muted |

### Semantic Accents

| Name | Hex | Role |
|------|-----|------|
| Teal | #2a9d99 | Success states |
| Green | #1aae39 | Confirmation |
| Orange | #dd5b00 | Warning |
| Pink | #ff64c8 | Decorative accent |
| Purple | #391c57 | Premium features |
| Brown | #523410 | Earthy accent |

### Interactive

| Name | Hex | Role |
|------|-----|------|
| Active Blue | #005bab | Button active state |
| Focus Blue | #097fe8 | Focus ring |
| Deep Navy | #213183 | Brand secondary |
| Badge Bg | #f2f9ff | Pill badge surface |

## Typography Scale

### Display

| Style | Size | Weight | Line Height | Letter Spacing | Font |
|-------|------|--------|-------------|---------------|------|
| Display Hero | 64px | 700 | 1.00 | -2.125px | Inter |
| Display Secondary | 54px | 700 | 1.04 | -1.875px | Inter |
| Section Heading | 48px | 700 | 1.00 | -1.5px | Inter |

### Sub-headings

| Style | Size | Weight | Line Height | Letter Spacing | Font |
|-------|------|--------|-------------|---------------|------|
| Sub-heading Large | 40px | 700 | 1.50 | normal | Inter |
| Sub-heading | 26px | 700 | 1.23 | -0.625px | Inter |
| Card Title | 22px | 700 | 1.27 | -0.25px | Inter |

### Body

| Style | Size | Weight | Line Height | Letter Spacing | Font |
|-------|------|--------|-------------|---------------|------|
| Body Large | 20px | 600 | 1.40 | -0.125px | Inter |
| Body Medium | 16px | 500 | 1.50 | normal | Inter |
| Body | 16px | 400 | 1.50 | normal | Inter |
| Nav / Button | 15px | 600 | 1.33 | normal | Inter |
| Caption | 14px | 500 | 1.43 | normal | Inter |
| Badge | 12px | 600 | 1.33 | 0.125px | Inter |

## Button Variants

| Variant | Style |
|---------|-------|
| Primary Blue | Solid Notion Blue, primary CTA |
| Secondary | Outlined, secondary actions |
| Pill Badge | Rounded badge style |
| Teal Badge | Teal colored badge |
| Warning | Orange badge |
| Confirmed | Green badge |

## Card Patterns

| Pattern | Description |
|---------|-------------|
| Workspace | Card for workspace features |
| Productivity | Connected wikis and knowledge |
| Projects | Team projects with flexible views |

## Form Elements

| Element | State | Description |
|---------|-------|-------------|
| Input | Default | Standard input field |
| Input | Focus | Blue ring focus state |
| Input | Error | Orange ring error state |

## Spacing Scale

Base unit: 2px

| Token | Value |
|-------|-------|
| 2 | 2px |
| 4 | 4px |
| 6 | 6px |
| 8 | 8px |
| 12 | 12px |
| 14 | 14px |
| 16 | 16px |
| 24 | 24px |
| 32 | 32px |

## Border Radius Scale

| Token | Value | Usage |
|-------|-------|-------|
| 4px | 4px | Buttons, inputs |
| 5px | 5px | Links, menus |
| 8px | 8px | Small cards |
| 12px | 12px | Cards |
| 16px | 16px | Hero cards |
| 9999px | 9999px | Badges |
| 50% | 50% | Avatars |

## Elevation System

| Level | Description |
|-------|-------------|
| Level 0: Flat | No shadow |
| Level 1: Whisper | 1px solid rgba(0,0,0,0.1) |
| Level 2: Card | 4-layer stack, max 0.04 |
| Level 3: Deep | 5-layer stack, 52px blur |
| Focus | 2px solid focus ring |