# DESIGN SYSTEM SPECIFICATION: BINGO MOBILE GAME
**System Title:** "The Floating Console & Tactile Game Board"  
**Source:** Reference Architecture (Images 1–5)  
**Version:** 3.0.0  
**Status:** Canonical Design Token Authority  

---

## 1. The 5-Color Reference Palette (Reference 3)

| Token Name | Hex Code | Purpose & Semantic Application |
| :--- | :--- | :--- |
| **`lunarShadow`** | `#282828` | Primary dark surface, floating dock container, primary text in Light Mode, dark button labels. |
| **`cleanWhite`** | `#FFFFFF` | Primary card background in Light Mode, active pill container in floating dock, high-contrast text in Dark Mode. |
| **`grayWhisper`** | `#F7F7F7` | Base canvas background in Light Mode, recessed input containers, neutral disabled states. |
| **`gentleOlive`** | `#CBD77E` | Primary interactive accent, play buttons, daub seals, active streak bars, live indicator pips. |
| **`winterHazel`** | `#E6CA9A` | Secondary accent, victory line highlights, gold medal/crown badges, ranked tier highlights. |

---

## 2. Dual Theme Token Architecture

```typescript
export interface ThemeColors {
  isDark: boolean;
  bgCanvas: string;         // Root background
  bgCard: string;           // Primary content cards
  bgElevated: string;       // Floating headers, modal dialogs
  bgRecessed: string;       // Inputs, badge backgrounds
  borderSubtle: string;     // Hairline card borders
  textPrimary: string;      // High-contrast titles & numerals
  textSecondary: string;    // Subtitles, secondary copy
  textMuted: string;        // Inactive labels, placeholder text
  accentOlive: string;      // Gentle Olive (#CBD77E)
  accentHazel: string;      // Winter Hazel (#E6CA9A)
  dockBg: string;           // Always Lunar Shadow (#282828)
  activePillBg: string;     // Clean White (#FFFFFF)
  activePillIcon: string;   // Lunar Shadow (#282828)
}
```

### Contrast Compliance:
- `textPrimary` on `bgCanvas` achieves a contrast ratio of > 11:1 in both Light and Dark themes (WCAG AAA).
- `accentOlive` against `#282828` achieves > 7.2:1 (WCAG AAA).

---

## 3. Typography Hierarchy (Google Font Sora)

Font family: `'Sora', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`.

| Level | Size | Line Height | Weight | Letter Spacing | Primary Use Case |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display** | 36px | 44px | 800 (Bold) | -0.5px | Large victory announcements, score fanfare |
| **Hero** | 28px | 34px | 700 (Bold) | -0.3px | Screen headlines, caller ball announcer numeral |
| **Title 1** | 24px | 30px | 700 (Bold) | 0px | Major section titles, modal headers |
| **Title 2** | 20px | 26px | 600 (SemiBold) | 0px | Card headers, game mode names |
| **Headline** | 17px | 22px | 600 (SemiBold) | 0px | Primary button labels, board cell numbers |
| **Body** | 15px | 20px | 400 (Regular) | 0.1px | Descriptive copy, room rules, instructions |
| **Footnote** | 13px | 17px | 500 (Medium) | 0.2px | Secondary stats, time stamps, subtitles |
| **Caption** | 11px | 14px | 600 (SemiBold) | 0.4px | Pill chips, status badges, uppercase tags |

---

## 4. 4px Grid & Spacing System

All layout dimensions, paddings, and margins adhere strictly to the 4px baseline grid:
- **`2px` (`SPACING.xxs`)**: Hairline borders, micro offsets
- **`4px` (`SPACING.xs`)**: Tight chip gaps, icon badge paddings
- **`8px` (`SPACING.sm`)**: Internal card padding, item spacing
- **`12px` (`SPACING.md`)**: Control padding, input field height offsets
- **`16px` (`SPACING.lg`)**: Standard page gutter, card internal padding
- **`20px` (`SPACING.xl`)**: Generous card gutters, header gaps
- **`24px` (`SPACING.xxl`)**: Section separations
- **`32px` (`SPACING.hero`)**: Major module boundaries
- **`48px` / `64px`**: Screen terminal clearance, bottom dock float offset

---

## 5. Shape & Geometry Hierarchy

Components are not uniformly given the same radius. Geometry reflects physical function:
- **Floating Dock Capsule (`RADIUS.dock: 36px`)**: Full pill silhouette floating above the canvas.
- **Active Navigation Pill (`RADIUS.pill: 28px`)**: Soft elongated pill cradling the active tab icon.
- **Hero Media Card (`RADIUS.hero: 28px`)**: Generous architectural radius establishing the hero focal point.
- **Content Cards (`RADIUS.card: 20px–24px`)**: Defined, tactile surfaces with subtle 1px border.
- **Controls & Cells (`RADIUS.control: 12px–14px`)**: Ergonomic, touch-friendly rounded rectangles with debossed depth.
- **Action Buttons (`RADIUS.button: 16px–24px`)**: High-contrast, tactile capsules with micro-spring responses.
- **Avatar & Caller Spheres (`RADIUS.full: 9999px`)**: Perfect geometric circles.
