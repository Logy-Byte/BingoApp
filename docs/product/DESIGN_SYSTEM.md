# DESIGN SYSTEM SPECIFICATION
**Version:** 2.0.0  
**Status:** Frozen for Implementation  

---

## 1. Color Palette & Roles

```typescript
export const COLORS = {
  // Base Obsidian & Neutral Foundation
  bgDark: '#101214',        // Deep neutral dark
  surfaceDeep: '#17191C',   // Primary surface / bottom chrome
  surfaceRaised: '#1D2023', // Raised cards / modals / sheets
  surfaceHighlight: '#23272B',

  // Hairline Borders & Dividers
  borderSubtle: '#292D31',
  borderStrong: '#363B41',
  borderHighlight: '#D5A33A', // Reserved strictly for focus / active states

  // Primary Game Action Accent (Warm Amber / Gold - Restrained)
  primaryAmber: '#D5A33A',
  primaryAmberStrong: '#E6B84F',
  primaryAmberHighlight: '#E6B84F',
  primaryAmberPressed: '#B98222',
  primaryAmberGlow: 'rgba(213, 163, 58, 0.12)',

  // Semantic Feedback States
  deepForest: '#1D2B22',
  successGreen: '#5FA56D',
  dangerRed: '#D76464',
  infoBlue: '#6E95C5',
  warningAmber: '#D5A33A',

  // Typography Contrast (Meets WCAG AAA)
  textPrimary: '#F4F1E9',   // High-contrast warm off-white
  textSecondary: '#AAA79F', // Muted neutral
  textMuted: '#77746E',     // Secondary metadata
  textWhite: '#FFFFFF',

  // 5×5 Board Cell Tokens
  boardSurface: '#141618',
  cellDefaultBg: '#1A1D20',
  cellDefaultBorder: '#272B2F',
  cellCalledBg: 'rgba(213, 163, 58, 0.12)',
  cellCalledBorder: '#D5A33A',
  cellMarkedBg: '#1A291E',
  cellMarkedBorder: '#5FA56D',
  cellWinningBg: '#2E2718',
  cellWinningBorder: '#E6B84F',
  cellFreeBg: '#24211A',
  cellFreeBorder: '#D5A33A',
};
```

---

## 2. Typography Hierarchy (Apple Dynamic Type & Tabular Figures)

```typescript
export const TYPOGRAPHY = {
  fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Manrope', 'Segoe UI', Roboto, sans-serif",
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    heavy: '800' as const,
  },
  sizes: {
    display: 40,   // Dominant current called number (tabular)
    largeTitle: 28,// Main headers
    heading: 20,   // Screen title
    subheading: 15,// Section title
    body: 14,      // Explanatory content
    label: 12,     // Metadata
    micro: 11,     // Status badge / sub-label
  },
};
```

---

## 3. Spacing, Radii & Touch Targets

- **Touch Target**: Minimum **44×44pt** across all interactive elements on iOS, 48dp on Android.
- **Radii**:
  - `control`: 10pt (Buttons, input fields, game cells).
  - `surface`: 14pt (Cards, modal dialogs, sections).
  - `board`: 16pt (5×5 Game board frame).
  - `navBar`: 22pt (Bottom floating navigation bar).
  - `pill`: 9999pt (Micro indicators only).
- **Spacing Scale**: `xs: 4`, `sm: 8`, `md: 12`, `lg: 16`, `xl: 20`, `xxl: 24`.

---

## 4. Motion Tokens (Emil Kowalski Restraint Specification)

- **Durations**:
  - Micro-interaction (press/tap acknowledge): **100–140ms**.
  - State confirmation (line completion / modal reveal): **160–240ms**.
  - Max duration: **300ms** (reserved for modal transitions).
- **Easing**: Standard `cubic-bezier(0.2, 0, 0, 1)` ease-out. No bouncy, lingering springs.
- **Reduced Motion**: All translations and scales reduced to instant opacity shifts.
