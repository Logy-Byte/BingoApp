# BINGO UI AUDIT & HIERARCHY RESTRUCTURING SPECIFICATION
**Version:** 4.0.0  
**Classification:** Core Shared Artifact (`docs/bingo/UI_AUDIT.md`)

---

## 1. Preserved Brand & Visual Tokens
- **Color Palette (Strict 5-Color System)**:
  - Lunar Shadow: `#282828` (primary dark surface, text, buttons)
  - Clean White: `#FFFFFF` (light cards, active pills, high-contrast badges)
  - Gray Whisper: `#F7F7F7` (light mode canvas)
  - Gentle Olive: `#CBD77E` (primary interactive accent, daubs, ready badges)
  - Winter Hazel: `#E6CA9A` (victory rays, golden accents, room badges)
- **Typography**: Sora geometric family (`Regular 400`, `SemiBold 600`, `Bold 700`).
- **Tactile Shapes**: 16–28px rounded containers, pill chips, debossed cell wells.
- **Dock Navigation**: Floating dark console dock with active white pill and gentle olive indicator dot.

---

## 2. Restructured Game Body Hierarchy

| Priority Level | Visual Component | Purpose & Information Density |
| :--- | :--- | :--- |
| **1. Game Context (Top)** | Header HUD Island | Room name, opponent status/lines, forfeit button, connection status dot. Compact height (48pt). |
| **2. Current Game Event** | Concentric Caller HUD | Prominent concentric dial with orbital green dot, current drawn ball numeral, and horizontal scroll of recent 5 calls. |
| **3. Primary Focus** | 5×5 Tactile Game Board | Center-stage grid with debossed cell wells, clear numerals, and responsive instant daub feedback. Touch target &ge; 48×48pt. |
| **4. Primary Action** | CLAIM BINGO Action Bar | High-contrast Gentle Olive bar. Pulsing glow when lines &ge; 1. Single tap initiates authoritative claim. |
| **5. Secondary / Feedback**| Victory Track & Feedback | Completed pattern announcements, streak tracker, and error feedback toast. |

---

## 3. Touch Ergonomics & Mobile QA Standards
- All interactive buttons and board cells have hit slop & bounding boxes &ge; 44×44pt.
- No buttons placed under mobile status bars, camera notches, or home indicator bars.
- Press interactions utilize immediate `scale(0.97)` tactile compression.
