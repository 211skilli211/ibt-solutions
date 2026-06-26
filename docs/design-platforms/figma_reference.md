# Figma Design Reference

Source: https://getdesign.md/design-md/figma/preview.html

## Color Palette

### Primary

| Name | Hex | Role |
|------|-----|------|
| Pure Black | #000000 | All text, solid buttons, all borders. The sole interface color. |
| Pure White | #ffffff | All backgrounds, white buttons, text on dark surfaces. |

### Surface & Glass

| Name | Hex | Role |
|------|-----|------|
| Glass Black | rgba(0,0,0,0.08) | Secondary circular buttons, glass overlays on light surfaces. |
| Glass White | rgba(255,255,255,0.16) | Frosted glass overlay for buttons on dark or colored surfaces. |

### Gradient System

| Name | Colors | Role |
|------|--------|------|
| Hero Gradient | Electric Green, Purple, Orange, Pink, Cyan | Color exists only in hero gradients and product showcases. |

## Typography Scale

### Display

| Style | Size | Weight | Line Height | Letter Spacing | Font |
|-------|------|--------|-------------|----------------|------|
| Display / Hero | 86px | 400 | 1.00 | -1.72px | figmaSans |
| Section Heading | 64px | 400 | 1.10 | -0.96px | figmaSans |

### Sub-headings

| Style | Size | Weight | Line Height | Letter Spacing | Font |
|-------|------|--------|-------------|----------------|------|
| Sub-heading Medium | 26px | 540 | 1.35 | -0.26px | figmaSans |
| Sub-heading Light | 26px | 340 | 1.35 | -0.26px | figmaSans |

### Body

| Style | Size | Weight | Line Height | Letter Spacing | Font |
|-------|------|--------|-------------|----------------|------|
| Feature Title | 24px | 700 | 1.45 | normal | figmaSans |
| Body Large | 20px | 330 | 1.40 | -0.14px | figmaSans |
| Body Light | 18px | 320 | 1.45 | -0.26px | figmaSans |
| Body / Button | 16px | 400 | 1.45 | -0.14px | figmaSans |

### Mono

| Style | Size | Weight | Line Height | Letter Spacing | Transform |
|-------|------|--------|-------------|---------------|------------|
| Mono Label | 18px | 400 | 1.30 | 0.54px | uppercase |
| Mono Small | 12px | 400 | 1.00 | 0.6px | uppercase |

## Button Variants

| Variant | Description |
|---------|-------------|
| Black Pill CTA | Primary action, solid black background |
| White Pill | Secondary action on dark surfaces |
| Black Circle | Icon button, circular |
| Glass Dark | Glass overlay on light surfaces |
| Glass Light | Frosted glass on dark/colored surfaces |
| Dashed Focus Indicator | 2px dashed outline on focus |

## Card Patterns

| Pattern | Description |
|---------|-------------|
| Standard Card | Subtle border, 8px radius. Default container for features. |
| Elevated Card | Subtle shadow elevation. Used for product showcases. |
| Glass Surface | rgba(0,0,0,0.08) background. Secondary containers. |

## Form Elements

| Element | Description |
|---------|-------------|
| Input Default | Standard text input |
| Input Focus | Blue focus ring |
| Input Error | Error state with message |

## Spacing Scale

Base unit: 8px

| Token | Value |
|-------|-------|
| 1px | 1px |
| 2px | 2px |
| 4px | 4px |
| 8px | 8px |
| 10px | 10px |
| 12px | 12px |
| 16px | 16px |
| 18px | 18px |
| 24px | 24px |
| 32px | 32px |
| 40px | 40px |
| 48px | 48px |
| 50px | 50px |

## Border Radius Scale

| Token | Value | Usage |
|-------|-------|-------|
| 2px | 2px | Small links |
| 6px | 6px | Small containers |
| 8px | 8px | Cards, images |
| 50px | 50px | Pill buttons |
| 50% | 50% | Circle / Icon |

## Elevation System

| Level | Description |
|-------|-------------|
| Flat | No shadow. Page background and most text. |
| Level 0 | Surface. White card on gradient or dark section. |
| Level 1 | Elevated. Subtle shadow for floating cards and hover states. |
| Level 2 | Stronger elevation for modals and popovers. |