# ACCESSIBILITY, RESPONSIVE RULES & VISUAL QA

## 1. Accessibility Architecture
1. **Touch Target Standard**:
   - Every single button, tab, cell, and control enforces a minimum bounding box of **44×44pt**.
   - Bounding hit slop is applied to compact icons or tags to guarantee zero missed taps.
2. **Contrast & Legibility (WCAG AAA)**:
   - Text against dark surfaces maintains at least **7:1** contrast for body and numbers, and **4.5:1** for large headings.
   - Primary numbers: `#F0F6FC` on `#181C22` (Contrast ~ 13.5:1).
   - Signal accents: `#00E5A3` on `#13161A` (Contrast ~ 11.8:1).
3. **Screen Reader (VoiceOver / TalkBack)**:
   - All cells provide clear semantic labels: `"Row 2 Column 3, Number 14, uncalled"`, `"Row 2 Column 3, Number 14, called and daubed"`.
   - Live caller updates broadcast via `accessibilityLiveRegion="polite"`.

---

## 2. Responsive Rules (Phone, Tablet, Web)
1. **Small Phone (<380px width)**:
   - Board cell size dynamically calculates based on viewport: `(width - padding - 4 * gap) / 5`.
   - Number font size scales smoothly between 16pt and 22pt.
2. **Standard Phone (380px - 500px width)**:
   - Board max-width: 390px, perfectly centered with thumb reach padding at bottom.
3. **Tablet & Desktop Web (>500px width)**:
   - Play view frames the Bingo Object within an architectural console layout (max-width: 480px), preserving direct reachability.

---

## 3. Visual QA Checklist
- [x] **No Generic AI Cards**: Screens use open typography, hairline guides, and negative space.
- [x] **No Apple Clones**: Custom mechanical game object aesthetic, not iOS Settings or Stocks.
- [x] **Bingo Identity**: Unmistakable physical matrix with tactile wells and daub stamps.
- [x] **Color-Independent Hierarchy**: Monospace weights, borders, and debossed levels convey hierarchy without color.
- [x] **Shadow-Independent Structure**: Hairline precision rims define layout cleanly even if shadows are disabled.
- [x] **Zero Fluff**: Every pixel, badge, and transition serves active player feedback.
