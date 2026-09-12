# REFERENCE EXTRACTION MATRIX & TRANSLATION SYSTEM
**Source Artifacts:** Reference Images 1 through 5  
**Discipline:** Systematic Design Extraction & Game Architecture Translation  
**Status:** Canonical Visual Source of Truth  

---

## 1. Principles of Reference-Driven Extraction

Rather than asking "What generic UI looks premium?", we analyze the exact physical, geometric, and compositional decisions embedded in the 5 reference images:
- **Ref 1**: Minimalist luxury device layout, high-contrast black intercom capsule with diagonal hatch texture, hero media card with scrubber line & circular play button, floating dark dock with active white pill and accent dot.
- **Ref 2**: Modular component cards, concentric dial controls with perimeter track indicators, 7-day vertical energy/activity bar chart with rounded pill bars and lightning glyph.
- **Ref 3**: "Typography And Color" master sheet defining the 5 foundational colors and Sora geometric font.
- **Ref 4**: Clean wireframe architecture displaying soft-cornered containers, pill chips, circular badge actions, and hierarchy of primary/secondary controls.
- **Ref 5**: Spatial layout, isometric composition, and floating layers.

---

## 2. Comprehensive Reference Extraction Matrix

| Reference # | Component Observed | Visual Property | Exact Visual Observation | Design Rule | Bingo Application |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Ref 1** | Top Header Action Banner | Geometry & Texture | High-contrast dark capsule (`#282828`) with angled diagonal hatch stripes, left green circular emblem, right white circular arrow button (`↗`). | Important live action callouts use textured dark capsules with circular anchor points. | `IntercomCalloutBanner.tsx` for live ranked matches, tournament status, and broadcast telemetry. |
| **Ref 1** | Hero Media Card | Hierarchy & Controls | 28px rounded white card, thumbnail preview on left, category pill tag, bold title/artist, scrubber bar with circular bead thumb, playback buttons with central circular green play button. | The hero component must combine live preview, status tag, progress bar, and a prominent circular primary action. | `LobbyStageHero.tsx` with 5×5 board preview, live room badge, scrubber track, and circular Gentle Olive Play button. |
| **Ref 1 & 2**| Bottom Navigation | Container & Active State | Floating dark console dock (`#282828`) with generous corner radii, active item rendered as an illuminated white pill container (`#FFFFFF`) with dark icon and top-right green accent dot (`#CBD77E`). | Navigation dock remains a floating dark capsule; active tab is emphasized by a high-contrast white pill with an accent indicator. | `BottomNavBar.tsx` (Strictly preserved floating dock style, with new Home icon and Gentle Olive dot). |
| **Ref 1** | Home Icon | Iconography & Geometry | Pitched roof house with curved apex, rounded eaves, flat base, and arched inner doorway. | Primary home anchor uses soft architectural geometry rather than sharp angular lines. | `HomeIcon` in `CustomIcons.tsx` and `iconPaths.ts`. |
| **Ref 2** | Energy Saving Chart | Data Visualization | 7-day vertical bar chart, rounded pill bars with staggered heights, active days rendered in solid green with lightning glyph, inactive days in soft gray. | Progress and streaks must be visualized with tactile vertical pill bars and semantic green fills. | `StreakBarChart.tsx` in `ProfileScreen.tsx` for daily puzzle and match win streak tracking. |
| **Ref 2** | Concentric Dials | Telemetry & Announcer | Circular dial with inner readout (temperature), segmented outer perimeter track, and green orbital dot. | Number announcements and timers should use concentric dial rings with high-contrast centered numerals. | `CallerHUD.tsx` for Bingo ball announcement with outer ring and Gentle Olive perimeter dot. |
| **Ref 3** | Color Palette | Color Values | 5 specific colors: Lunar Shadow `#282828`, Clean White `#FFFFFF`, Gray Whisper `#F7F7F7`, Gentle Olive `#CBD77E`, Winter Hazel `#E6CA9A`. | Strictly limit the palette to these 5 colors; use them semantically for backgrounds, surfaces, interactive accents, and highlights. | `theme.tsx` and `tokens.ts` (Dual theme engine with Light and Dark modes). |
| **Ref 3** | Typography | Font Family & Weight | Google Font Sora (`'Sora', sans-serif`), clean geometric numerals and modern letterforms with weights Regular (400) and SemiBold (600/700). | Numerals and game copy must use Sora for optimal tabular clarity and modern elegance. | Base typography loaded in `index.html` and applied via `TYPOGRAPHY` tokens. |
| **Ref 4** | Wireframe Composition | Information Flow | Clear separation of Hero section, horizontal segmented switches, modular cards, and circular badge triggers. | Maintain generous breathing room (16–24px) between distinct component families. | Layout and spacing across `HomeScreen`, `LobbyScreen`, and `CreateRoomScreen`. |

---

## 3. Translation into Original Bingo System Identity

1. **The Bingo Board as Hero Object**:
   - The 5×5 board is designed as a living physical object: debossed cell wells, tactile compression, stamped daub seals (`#CBD77E`), and warm gold victory rays (`#E6CA9A`).
2. **The Floating Console Dock**:
   - Anchors the player experience at the bottom of the screen with zero clutter, providing single-tap switching between Play, Leaderboard, and Profile.
3. **Dual Theme Harmony**:
   - In Light mode: Soft Gray Whisper (`#F7F7F7`) canvas with crisp Clean White (`#FFFFFF`) cards and Lunar Shadow (`#282828`) text.
   - In Dark mode: Deep Lunar Shadow (`#282828`) canvas with refined dark cards and luminous accents.
