# PRODUCT REQUIREMENTS DOCUMENT (PRD): BINGO MOBILE GAME
**Document Version:** 3.0.0  
**Target Release:** iOS App Store & Android Google Play  
**Authoring Team:** Principal Product Designer, Principal Mobile UX, Game UX Architect, Security Engineer  
**Status:** Approved for Design Phase Gate Review  

---

## 1. Product Vision & Principles

### A. The Core Vision
Transform the classic 5×5 number game into a fast, tactile, premium mobile title that feels authentic, satisfying, and modern. The app is a **dedicated mobile game**, not a SaaS dashboard and not an ad-stuffed gambling casino clone.

### B. Core Principles
1. **Frictionless Entry**: Returning players reach gameplay in under 3 seconds. First-time players understand how to play without mandatory multi-minute tutorial walls.
2. **Tactile Interaction**: Every touch-down, card daub, and victory event produces instant, crisp visual and acoustic feedback (<=100ms response).
3. **Calm Visual Discipline**: Built with the authored 5-color reference palette (Lunar Shadow `#282828`, Clean White `#FFFFFF`, Gray Whisper `#F7F7F7`, Gentle Olive `#CBD77E`, Winter Hazel `#E6CA9A`) and dual-theme elegance.
4. **Authoritative Trust**: Anti-cheat rules, room state transitions, and win claims are validated against authoritative state.
5. **Universal Accessibility**: Minimum 44×44pt touch bounding boxes, screen reader labels, high-contrast states, and full support for reduced motion.

---

## 2. Competitive & Reference Benchmark Research

### Market Study:
- **Bingo Blitz / Bingo Bash**: Feature heavy progression, daily bonuses, quests, and multiplayer rooms, but suffer from extreme visual clutter, aggressive popups, and slow loading times.
- **Our Differentiation**: High-craft minimalist game feel, instant responsiveness, authentic 5×5 number mechanics (numbers 1–25), zero predatory paywalls, and beautiful architectural layout derived from our reference design system.

### Feature Roadmap:
- **CORE (In Active Scope)**:
  - Quick Play & Ranked 1v1 matchmaking
  - Solo Play vs AI Robot (3 difficulties: Easy, Medium, Hard)
  - Private Room creation with custom rules
  - Join Room via 6-character monospace code
  - 5×5 Tactile Game Board with live caller ball HUD
  - Daily Puzzle challenge with 7-day streak bar chart
  - Competitive Leaderboard with seasonal podium and user rank highlight
  - Player Profile with rating (MMR), win records, and achievement showcase
  - Match Results summary with instant replay flow
  - Full Light / Dark theme engine
- **ENHANCEMENT (Roadmap V2)**:
  - Deep-link room invite sharing (`bingo://join/ROOMID`)
  - Lightweight in-room quick emotes / reactions
  - Expanded pattern catalog (Four Corners, Postage Stamp, Big X)
  - Audio voice pack customizers
- **FUTURE (Roadmap V3)**:
  - Multi-board simultaneous play (2-card, 4-card)
  - Seasonal clubs and community tournaments
  - Spectator mode for high-tier ranked matches

---

## 3. Product Core Loop

```
  ┌──────────────────────────────────────────────────────────┐
  │ 1. OPEN APP (Lobby Stage)                                │
  │    - View Player MMR, Rank Crest, and Today's Streak     │
  └──────────────────────────┬───────────────────────────────┘
                             │
                             ▼
  ┌──────────────────────────────────────────────────────────┐
  │ 2. CHOOSE GAME ACTION                                    │
  │    - Primary Hero: PLAY RANKED (instant queue)           │
  │    - Modes: Solo Robot | Create Room | Join Room | Daily │
  └──────────────────────────┬───────────────────────────────┘
                             │
                             ▼
  ┌──────────────────────────────────────────────────────────┐
  │ 3. ENTER MATCH                                           │
  │    - Room Lobby / 3-second countdown                     │
  │    - Deterministic 5×5 Board Layout Generated            │
  └──────────────────────────┬───────────────────────────────┘
                             │
                             ▼
  ┌──────────────────────────────────────────────────────────┐
  │ 4. PLAY BINGO                                            │
  │    - Concentric Caller sphere announces number           │
  │    - Player searches and daubs matching cell             │
  │    - Anti-cheat validates call legitimacy                │
  │    - Winning line evaluated upon 5 aligned cells         │
  └──────────────────────────┬───────────────────────────────┘
                             │
                             ▼
  ┌──────────────────────────────────────────────────────────┐
  │ 5. VICTORY / RESULTS & REWARDS                           │
  │    - "CLAIM BINGO" tap triggers fanfare & win state      │
  │    - Earn MMR (+25), Score (+500/line), Streak advance   │
  └──────────────────────────┬───────────────────────────────┘
                             │
                             ▼
  ┌──────────────────────────────────────────────────────────┐
  │ 6. IMMEDIATE REPLAY OR RETURN                            │
  │    - "PLAY AGAIN" launches next match immediately        │
  │    - "HOME" returns smoothly to main lobby               │
  └──────────────────────────────────────────────────────────┘
```

---

## 4. Screen-by-Screen Specifications & UX Hierarchy

### A. Home / Game Lobby
- **Role**: Active Game Lobby, not a static dashboard.
- **Visual Hierarchy**:
  1. **Player Stage Bar**: Avatar crest, player name, rank badge, rating (e.g. 1450 MMR), theme toggle (☀️/🌙), audio toggles.
  2. **Intercom Callout Banner**: High-contrast capsule banner with diagonal hatch lines and live tournament/broadcast ticker.
  3. **Lobby Stage Hero**: 28px rounded card featuring live 5×5 board mini preview, scrubber track with Gentle Olive bead thumb, and circular Play button.
  4. **Primary Action**: Prominent high-contrast **"PLAY RANKED"** button with diagonal arrow badge (`↗`).
  5. **Game Mode Shelf**: Distinct cards for **Solo Robot**, **Host Room**, **Daily Puzzle**, and direct **Join Room**.
  6. **Bottom Navigation**: Floating dark dock capsule (`#282828`), with pitched-roof Home icon, Gentle Olive pip, and direct access to Leaderboard and Profile.

### B. Private Room Flow (Create & Host)
- **Creation Surface**:
  - Room name input (max 24 chars, auto-default "Friendly Arena")
  - Room privacy toggle: Open (public) vs Passcode (private)
  - Max player capacity indicator (2–4 players)
  - Fixed 5×5 board rules preview
  - High-contrast **"Host Match"** primary button
- **Room Lobby Waiting Area**:
  - Prominent 6-character room code badge (e.g., `K9X2P7`) with one-tap Copy and Share action.
  - Player presence list with Host badge and Ready status.
  - Start Game button (enabled only for Host when conditions are met).
  - Clear Leave Room button with clean teardown.

### C. Join Room Flow
- **Entry Points**: Direct "Join Room" button on Home lobby and Game Mode shelf.
- **Dedicated Focused Input**:
  - Clean container with 6-character monospace code input `[ _ _ _ _ _ _ ]`.
  - Automatic uppercase normalization (`k9x2p7` → `K9X2P7`).
  - Automatic paste detection and validation.
  - Descriptive, helpful errors:
    - `"Room not found. Please verify the 6-character code."`
    - `"Room is already full."`
    - `"Match in this room is already in progress."`
    - `"Incorrect room password."`

### D. Gameplay Screen (The Living Game Table)
- **Visual Hero**: The 5×5 Bingo Board occupies prime center screen real estate without competing UI clutter.
- **Concentric Caller HUD**:
  - Outer concentric ring with Gentle Olive perimeter progress indicator.
  - Clear, high-contrast 28pt Sora numeral of the currently called number.
  - Recency stream displaying the last 4 called numbers.
  - Audio speech callout ("Number 17") + synthesizer chime.
- **5×5 Game Board & Cells**:
  - 5 rows × 5 columns, containing numbers 1 to 25.
  - Free space at center `(2,2)` marked with custom `BingoIdentityIcon`.
  - Debossed cell geometry with soft corners (`RADIUS.control: 12px`).
  - Instantaneous mechanical compression on touch-down (`scale: 0.96`).
  - Marked cell: Gentle Olive fill (`#CBD77E`), dark numeral, marked seal pip.
  - Winning line cells: Winter Hazel gold glow (`#E6CA9A`) and border highlight.
- **Action HUD**:
  - Claim Bingo button: Elevated primary button that pulses when lines are completed.
  - Pause / Menu button in header with match exit confirmation modal.

### E. Leaderboard Screen
- **Hierarchy**:
  1. Top 3 Podium (Rank 1 Gold, Rank 2 Silver, Rank 3 Bronze) with avatar crests and trophy badges.
  2. Current Player Sticky Row (highlighted with diagonal hatch texture and Gentle Olive accent).
  3. Nearby Ranks & Full Season List with sorting by Global / Friends.

### F. Player Profile Screen
- **Focus**: Player identity and progression, NOT just settings.
- **Components**:
  - Player avatar crest, level banner, and tier progression bar.
  - 3-metric KPI cards: Rating (MMR), Win Rate (%), Total Bingos.
  - 7-day Activity Bar Chart with Gentle Olive pill bars.
  - Achievement badge collection (First Bingo, 10 Wins, 5-Day Streak, etc.).
  - Secondary entry to Settings modal.

### H. Settings Screen Architecture (Clean Mobile Ergonomics)
- **Primary Objective**: Practical, fast-scanning system utility — NOT a decorative icon gallery.
- **Rule of Restraint**:
  - REMOVE all custom circular app-launcher style icon tiles from individual settings rows.
  - Separate brand identity: The app icon (`AppIconVector`) is reserved for app identity, branding, launcher, and about info—never inside functional row items.
- **Standard Row Hierarchy**:
  ```
  ROW
  ┌──────────────────────────────────────────────────┐
  │ Title                                            │
  │ Supporting descriptive subtext                   │
  │                         [Toggle / Value / Chevron]
  └──────────────────────────────────────────────────┘
  ```
- **Semantic Groupings**:
  1. **Appearance & Theme**: Clean segmented pills for Light Mode (Gray Whisper) and Dark Mode (Lunar Shadow).
  2. **Audio & Tactile**: Sound effects toggle, Voice caller toggle, Master volume stepper (`Low`, `Med`, `High`).
  3. **Account & Sovereignty**: Player UID, Clear match records, Irreversible two-step account deletion.
  4. **Specifications & About**: Commercial 5×5 engine specs, version info.


## 5. Security & Trust Architecture

1. **Authoritative Anti-Cheat Verification**:
   - Every cell daub is validated against the authoritative drawn numbers sequence (`AntiCheatValidator.validateDaub`).
   - Every "Claim Bingo" request validates that all coordinates in the winning pattern were legitimately called numbers and marked by the player (`AntiCheatValidator.validateClaim`).
2. **Room Access & Entropy**:
   - Room codes use 6 alphanumeric characters drawn from an unambiguous charset (`ABCDEFGHJKLMNPQRSTUVWXYZ23456789`, omitting 0, O, 1, I), providing $32^6 \approx 1.07 \times 10^9$ combinations to prevent brute-force enumeration.
   - Private rooms require hashed password verification.
3. **State Machine Integrity**:
   - `CREATED` → `WAITING` → `READY` → `STARTING` → `IN_PROGRESS` → `FINISHED` → `CLOSED`.
   - Client flags (`isHost = true`) are never trusted without state manager validation.

---

## 6. Accessibility & Ergonomics Standards

- **Touch Targets**: Minimum 44×44pt on iOS, 48×48dp on Android.
- **Comfortable Thumb Zone**: Primary actions (Play Ranked, Claim Bingo, Cell daubing, Bottom Nav) sit within the lower 60% of the screen.
- **Contrast Ratios**: All primary text meets WCAG AA standards (>=4.5:1 against background).
- **Reduced Motion Support**: When system reduced-motion is enabled, scale springs and rotational animations are replaced with clean instant opacity transitions.
- **Screen Reader Semantics**: Every interactive button and cell defines `accessibilityRole`, `accessibilityLabel`, and `accessibilityState`.

---

## 7. Performance Budgets

- **Frame Rate**: Continuous 60fps on standard mobile hardware.
- **Animation Execution**: All micro-interactions use `transform` and `opacity` properties to prevent costly layout recalculations.
- **Bundle Footprint**: Zero bloated third-party animation runtimes; lightweight custom vector SVG icon family.
- **Startup Time**: Cold launch to interactive lobby in < 1.2 seconds.
