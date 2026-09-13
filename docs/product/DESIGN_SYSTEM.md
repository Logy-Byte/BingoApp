# DESIGN SYSTEM SPECIFICATION: THE CONSOLE DOCK & ARCHITECTURAL GRAMMAR
**Version:** 3.0.0  
**Status:** Implemented & Verified

---

## 1. Core Reference Palette & Semantic Roles
Derived directly from our 5-color architectural palette:
```typescript
export const REFERENCE_PALETTE = {
  lunarShadow: '#282828', // Primary dark container & elevated surface
  cleanWhite: '#FFFFFF',  // Active pill capsule, high-contrast typography
  grayWhisper: '#F7F7F7', // Canvas backdrop in light mode
  gentleOlive: '#CBD77E', // Accent 1: radiant game action, primary CTA
  winterHazel: '#E6CA9A', // Accent 2: luxury trophy, milestone, win illumination
};
```

---

## 2. The Navigation Anchor Visual Grammar
The bottom floating console dock anchors the design language:

```
┌─────────────────────────────────────────────────────────────┐
│  [ Home ]      ( Ranks )      ( Shop )      ( Profile )     │
│  ┌──────┐                                                   │
│  │ Home │ •                                                 │
│  └──────┘                                                   │
└─────────────────────────────────────────────────────────────┘
  ↑ 28px Dock Radius, Lunar Shadow substrate (#282828), 
    1px top specular glint, 16px bottom float offset
```

- **Active Pill Capsule**: Clean White (`#FFFFFF`), `RADIUS.pill` (9999), dark `#282828` icon/text, Gentle Olive (`#CBD77E`) accent dot.
- **Inactive Tab**: Muted slate (`#7B818C` / `#8E94A0`), zero background noise.
- **Top Specular Glint**: 1px micro-border (`rgba(255, 255, 255, 0.12)`).

---

## 3. Surface Hierarchy (6-Tier System)
1. **Tier 1: Canvas Backdrop** — `#16181B` (Dark) / `#F7F7F7` (Light)
2. **Tier 2: Recessed Wells** — `#1D2024` (Dark) / `#EFEFEF` (Light) — 5×5 Board tray substrate, input wells
3. **Tier 3: Elevated Cards** — `#282828` (Dark) / `#FFFFFF` (Light) — Tactical room cards, match shelves
4. **Tier 4: Floating Console Dock** — `#1A1C1F` / `#282828` floating capsule
5. **Tier 5: Active Illuminated Capsule** — `#FFFFFF` clean white pill
6. **Tier 6: Radiant CTA Surface** — `#CBD77E` Gentle Olive with dark `#0F172A` text

---

## 4. Concentric Geometry Token Formula
Concentric radii follow Apple HIG curvature continuity:
$$R_{\text{inner}} = \max(R_{\text{outer}} - \text{Padding}, \text{minRadius})$$
- Hero Card (`RADIUS.hero: 24px`) with 16px padding $\rightarrow$ Inner Well (`8px`).
- Sheet Modal (`RADIUS.sheet: 28px`) with 20px padding $\rightarrow$ Inner Well (`8px`).
- Dock Capsule (`RADIUS.dock: 28px`) with 4px padding $\rightarrow$ Active Pill (`RADIUS.pill: 9999`).

---

## 5. Spacing & Touch Boundaries (4px/8px Modular Grid)
- `SPACING.xxs`: 2px (sub-grid hairline compensation)
- `SPACING.xs`: 4px (micro indicators, pips)
- `SPACING.sm`: 8px (icon-to-label, button internal gap)
- `SPACING.md`: 12px (input padding, card internal gap)
- `SPACING.lg`: 16px (standard margin, card padding, dock bottom float)
- `SPACING.xl`: 20px (modal padding, large card internal spacing)
- `SPACING.xxl`: 24px (major section spacing)
- `SPACING.xxxl`: 32px (major module separation)
- `TOUCH_TARGET.minSize`: 44px (Apple HIG & Android standard)

---

## 6. Primitive Components
- **`GameButton`**: `primary` (Gentle Olive), `secondary` (card surface), `pill` (illuminated white capsule), `outline` (transparent), `danger` (red).
- **`SettingsRow`**: Clean mobile row (`Title` + `Supporting description` + `Affordance / Chevron`). Strictly devoid of decorative launcher icons.
- **`GameInput`**: Recessed well, focus ring, tokenized label and error.
- **`GameCard`**: Concentric elevation, subtle shadow, zero card nesting clutter.
