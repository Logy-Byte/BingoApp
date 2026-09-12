# REFERENCE-DRIVEN PREMIUM UI EXTRACTION SPECIFICATION
## BINGO MOBILE APP — ARCHITECTURAL DESIGN SYSTEM & TRACEABILITY MATRIX

> **Core Mandate**: Do not invent design in a vacuum. Extract exact visual decisions from the 4 provided reference images, analyze the structural causes of their premium feel, translate those principles into an authentic 5×5 Bingo game identity, and implement across the entire application without altering any underlying game rules or multiplayer logic.

---

## 1. FORENSIC VISUAL EXTRACTION: THE 4 REFERENCE IMAGES

### Reference Image 1: Minimalist Luxury Product Showcase
- **Overall Composition**: High-contrast, clean visual hierarchy balancing light neutral surfaces with deep dark hero surfaces.
- **Screen Structure**:
  - Screen 1: Minimal top search pill (`#F0F1F3`, subtle magnifying glass + filter toggle), dark hero banner (`#14171A`, 24px radius, white typography + white pill "Buy Now" button), 2-column balanced product grid.
  - Screen 2: Horizontal scrollable category pill chips (active: solid dark `#12161F` with white text; inactive: light bordered pill `#FFFFFF` / `#E5E7EB`), product cards with micro-tags ("New", "Bestseller").
  - Screen 3: Full-bleed product presentation, page indicator ribbon (active is elongated rounded pill, inactive are dots), elevated white bottom sheet (30px top radius), star rating pill badge (`★ 4.9`), and a wide dark capsule action button ("Add to cart") with an embedded circular cart icon on the right edge.
- **Key Visual Decisions**:
  - Dual surface contrast (deep graphite hero vs airy content plane).
  - High internal button padding with nested micro-badges.
  - Generous corner radii (cards: 20–24px, buttons/chips: 9999px pill, sheets: 30px).
  - Subtle hairline borders (`1px solid rgba(255,255,255,0.08)` on dark, `1px solid #E5E7EB` on light) instead of harsh dropshadows.

### Reference Image 2: Executive Productivity & Task Schedule
- **Overall Composition**: Layered tactile card stacks on an architectural slate backdrop.
- **Screen Structure**:
  - Top Floating Island: Dark pill capsule header at screen apex with circular player avatar, greeting text ("Hello, William"), and an inline success pill chip ("Tasks Completed - 24" with green checkmark).
  - Context & Date Ribbon: White project card with avatar stacks, coupled with a dark pill container enclosing a horizontal day selector (`Mo 6`, `Tu 7`, `We 8`, `Th 9`, `Fr 10`). **The active day (`Th 9`) is an inverted high-contrast white circular badge with bold dark numeral**.
  - Timeline & Cards: Tabular left-aligned hour marks (`8 AM`, `9 AM`, `10 AM`) anchoring stacked off-white cards with nested sub-cards, category chips, tool icons (Figma, Slack), and comment counters.
  - Bottom Navigation: Floating white pill dock with a vivid blue/periwinkle circular floating action button (`+`).
- **Key Visual Decisions**:
  - Floating island header for player context.
  - Inverted high-contrast active indicator inside a dark track.
  - Clear spatial rhythm: major cards contain micro-cards and pill tags.
  - Instant glanceability through typography and icon grouping.

### Reference Image 3: Metrics, Teams & Calendar Suite
- **Overall Composition**: Soft ambient pastel gradient background (soft lime to peach/cream) elevating crisp, clean metric cards and a floating dark navigation dock.
- **Screen Structure**:
  - Screen 1 (Metrics): Dark pill segmented period filter ("Last 3 days", "Last Week", "Last Month"), massive tabular hero numeral (`2,683`) with micro-trend badge (`+43%`), and a smooth two-tone gradient progress pill bar (coral sunset fading into mint green).
  - Screen 2 (Teams / Leaderboards): "Over Time" wave trend card with pastel gradient area fill; **"Best Employees" leaderboard podium featuring top 3 circular avatars with rating pill badges (`★ 5.0`), followed by clean ranked player rows with rank numbers, names, subtitles, and right-aligned rating pills**.
  - Screen 3 (Calendar / Agenda): Month dropdown pill, circular day cells, and horizontal event cards with participant avatars and high-contrast dark time pill badges (`4:30 PM`, `8:30 AM`).
  - **Universal Floating Dark Dock**: Deep slate floating dock (`#111620` / `#161B26`). Inactive items are outline icons in muted grey. **The active item is an illuminated white rounded pill capsule with dark icon + bold text** (`[ 📊 Metrics ]`, `[ 👥 Teams ]`, `[ 📅 Calendar ]`).
- **Key Visual Decisions**:
  - The white active pill capsule dock is the definitive navigation signature.
  - Giant tabular numbers communicate immediate mathematical state.
  - Top 3 podium hierarchy prevents leaderboards from feeling like monotonous flat lists.
  - Smooth two-tone gradient progress meters add living energy without visual noise.

### Reference Image 4: Ronas IT CRM & Insights Showcase
- **Overall Composition**: Demonstration of dark graphite (`#14171A`) and warm ivory (`#F4F3EF`) sharing identical geometric and typographic rules.
- **Screen Structure**:
  - 3-metric KPI counter row ("3 Clients", "2 Projects", "8 Tasks") with bold numbers and subtle labels.
  - Radial progress gauges and vertical bar charts with rounded pill bars.
  - High-contrast solid action buttons ("Sign in", "Create Task").
- **Key Visual Decisions**:
  - 3-metric summary row is optimal for mobile density and player profiles.
  - Restrained micro-interactions and tactile card boundaries.

---

## 2. REFERENCE EXTRACTION MATRIX

| Reference Source | Component | Visual Property | Exact Visual Observation | Extracted Design Rule | Bingo Mobile App Application |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Ref 3 (Metrics/Teams)** | Bottom Navigation | Container Geometry | Floating dark charcoal dock capsule with generous rounding (28px radius) | Navigation floats above content plane as an authored console dock | `BottomNavBar.tsx`: Floating console dock (`#111620`, 28px radius, elevated z-index) |
| **Ref 3 (Metrics/Teams)** | Bottom Navigation | Active State | Active tab expands into a high-contrast white rounded pill capsule with dark icon and bold text | Active state must be an illuminated pill capsule, not an underline or faint tint | `BottomNavBar.tsx`: Active tab renders `[ 🎮 Play ]`, `[ 🏆 Ranks ]`, `[ 👤 Profile ]` white pill capsule |
| **Ref 3 (Metrics/Teams)** | Bottom Navigation | Inactive State | Clean outline stroke icons in muted slate (`#64748B`), no text label | Inactive items remain quiet to emphasize the active destination | `BottomNavBar.tsx`: Inactive tabs show 20px outline custom SVG icons |
| **Ref 2 (Schedule)** | Header / Identity | Top Bar Composition | Floating dark pill capsule at top of screen with circular avatar, user name, and green status chip | Player identity is anchored in a compact top island with telemetry | `PlayerStageBar.tsx`: Avatar with ring, username, tier pill badge, audio toggles |
| **Ref 1 (Product Showcase)** | Hero Stage | Hero Banner Proportions | Deep graphite card (`#14171A`) with 24px radius, crisp white title, high-contrast action button | Screen must have one clear dominant hero object rather than equal-weight tiles | `LobbyStageHero.tsx` & `HomeScreen.tsx`: 5×5 preview board with atmospheric lighting |
| **Ref 1 & 4** | Primary Action | Button Proportions & Depth | Wide pill button with generous touch height (54px), bold typography, nested circular icon badge | Primary action feels authoritative, physical, and immediately clickable | `PrimaryActionButton.tsx`: "PLAY RANKED" hero button with emerald glow & chevron pill |
| **Ref 2 (Schedule)** | Caller Timeline | Temporal Sequence | Dark pill track enclosing sequential numbers; active item is an inverted white circular badge | Time progression is linear with the latest event sharply highlighted | `CallerHUD.tsx`: Broadcast caller ball + recent drawn number timeline ribbon with inverted active pip |
| **Ref 3 (Metrics)** | Progress Meter | Fill & Geometry | Smooth horizontal pill bar with two-tone gradient (sunset coral into mint green) | Progress should feel organic and vibrant rather than flat monochrome | `GameplayScreen.tsx` (Lines Completed) & `ProfileScreen.tsx` (Rank Progress) |
| **Ref 3 (Teams)** | Leaderboard | Podium Presentation | Top 3 entries featured in an elevated podium cluster with star rating pills (`★ 5.0`) | Top ranks have unique spatial prominence; ranks 4+ are tabular rows | `LeaderboardScreen.tsx`: Gold, Silver, Bronze podium cluster with rating badges |
| **Ref 3 & 4** | Segmented Filter | Switcher Geometry | Dark pill container with solid high-contrast active chip and transparent inactive chips | Mode switching uses restrained pill chips without messy borders | `LeaderboardScreen.tsx` ("Today", "This Week", "All Season") & `SettingsScreen.tsx` |
| **Ref 4 (Insights)** | Profile Statistics | KPI Counter Row | 3 compact rectangular cards with subtle borders: bold count above muted title | Player stats presented in a balanced 3-metric horizontal shelf | `ProfileScreen.tsx`: "342 Matches", "89% Win Rate", "1,450 Rating" |
| **Ref 1 & 2** | Game Board | Physical Depth & Well | Recessed surfaces with 1px subtle borders, deliberate radius hierarchy (Board: 24px, Cell: 10px) | Board feels like an engineered physical game tray, not a generic grid | `GameBoard.tsx` & `GameCell.tsx`: Milled tray chassis with debossed number wells |
| **Ref 1 & 4** | Modal / Sheet | Surface Geometry | 24–28px rounded corners, dark backdrop (75% opacity), crisp top specular hairline | Overlays feel like solid architectural consoles | `HomeScreen.tsx` (Difficulty modal), `GameDialog.tsx` |

---

## 3. COMPONENT INVENTORY & TRANSLATION

### Foundation
- **Background**: Ambient deep slate (`#0B0E14`) providing maximum contrast for floating console docks and milled board surfaces.
- **Surface**: Recessed game well (`#111622`), elevated console (`#161D2A`), and card highlight (`#1E2638`).
- **Border**: Restrained 1px hairlines (`#242F45` on raised cards, `rgba(255,255,255,0.12)` for top specular highlights).
- **Radius Scale**: Micro `4px`, Control `10px`, Surface `18px`, Hero `24px`, Board `28px`, Pill `9999px`.
- **Typography Scale**: Display `38px` (Caller numeral), Screen Title `22px`, Section Header `16px`, Button Label `15px`, Body `13px`, Caption `11px`, Micro `10px`.

### Navigation
- **Bottom Console Dock**: Floating `#111620` capsule with 28px radius, containing:
  - Active: High-contrast white rounded pill (`#FFFFFF`) with dark bold icon and label (`#0B0E14`).
  - Inactive: Outline icons (`#64748B`), 44pt touch target.

### Buttons & Actions
- **Primary Hero**: Wide rectangular-pill button (height 54px), radiant emerald (`#10B981`) or pure white (`#FFFFFF`), with dark bold text and nested circular icon badge.
- **Secondary / Mode Action**: Elevated card button (`#161D2A`) with 1px border, left icon badge, title, and right chevron.
- **Micro Action**: Status pills and difficulty selectors with active/inactive states.

### Gameplay Components
- **The Board Object**: A milled 5×5 tray chassis (`#121724`) with 28px corner radius and 1px metallic rim.
- **The 5×5 Cells**: 10px corner radius, debossed well backgrounds, clear tabular numbers:
  - *Uncalled*: `#182030` well with subtle border.
  - *Called (Available to Daub)*: Radiant emerald border with soft green glow pulse.
  - *Marked (Daubed)*: Deep sapphire wax seal (`#142542`) with circular optical pip (`#60A5FA`).
  - *Winning Line*: Crown gold illumination (`#F59E0B`) with specular amber glint.
- **Caller HUD**: Broadcast caller sphere with 3D ivory-to-slate lighting, paired with the horizontal timeline ribbon of recent calls.

---

## 4. SCREEN HIERARCHY MAPPING (ELIMINATING "EVERYTHING LOOKS THE SAME")

| Screen | Compositional Archetype | Hero Element | Background / Accent |
| :--- | :--- | :--- | :--- |
| **Home** | Immersive Game Hub | 5×5 Table Preview & "PLAY RANKED" Hero Button | Dark velvet space, radiant emerald focus |
| **Gameplay** | Focused Tangible Board | Milled 5×5 Board Object & Broadcast Caller Sphere | Zero chrome distraction, instant thumb daub feedback |
| **Leaderboard** | Competitive Podium & Ranks | Top 3 Podium Cluster with Star Badges (`★ 5.0`) | Trophy gold accents, segmented period pills |
| **Profile** | Player Identity & Progression | 3-Metric KPI Shelf & Two-Tone Rank Progress Bar | Sapphire progression, detailed achievement badges |
| **Settings** | Functional System Console | Grouped setting rows with clean toggle pills | Restrained monochrome slate, zero decorative bloat |
| **Results** | Celebratory Game Verdict | Radial victory crown, rating delta badge, replay action | Solar gold fanfare or honorable finish telemetry |

---

## 5. DESIGN TOKEN TRACEABILITY SPECIFICATION

Every token in `src/design/tokens.ts` is explicitly traced back to the reference observations:
- `COLORS.floatingDock`: Directly from Ref 3 floating dock background (`#111620`).
- `COLORS.activeTabBg`: Directly from Ref 3 white active pill capsule (`#FFFFFF`).
- `COLORS.activeTabText`: Directly from Ref 3 dark text on white pill (`#0B0E14`).
- `COLORS.kpiCardBg`: Directly from Ref 4 3-metric KPI cards (`#161D2A`).
- `COLORS.timelineActiveBg`: Directly from Ref 2 timeline inverted active day (`#FFFFFF`).
- `COLORS.gradientProgress`: Directly from Ref 3 two-tone sunset-to-mint gradient.
- `RADIUS.dock`: 28px (Ref 3).
- `RADIUS.hero`: 24px (Ref 1 & Ref 3).
- `RADIUS.control`: 10px (Ref 1 & Ref 2).
- `RADIUS.pill`: 9999px (Ref 1, 2, 3, 4).

This document serves as the single source of truth for the reference-driven UI implementation.
