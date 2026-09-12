# Research Report: Premium Mobile Game UX, Architecture & Security
**Prepared for: 5×5 Multiplayer Number Game (React Native Android)**

## 1. Executive Summary & Design Space
Modern mobile number & grid games (such as *Supercell* titles, *Wordle*, and high-end digital board games like *Wingspan* and *Hive*) succeed by feeling physical, tactile, and responsive. Generic SaaS styling, muted enterprise cards, or overwhelming casino neon degrade player immersion.

Our target aesthetic is **"Competitive Modern Game"**:
- Deep slate-navy surfaces with crisp jewel-toned accenting (Emerald Green `#10B981`, Amber Gold `#F59E0B`, Indigo `#6366F1`, Sky Cyan `#38BDF8`).
- Tactile physicality: subtle border highlights, inner shadows, and dynamic responsive states.
- Visual anchor navigation with distinct active states.

---

## 2. Navigation & Information Architecture
- **Three-Destination Bottom Bar**:
  - **PLAY (Hero Anchor)**: Slightly elevated/centered or highlighted, indicating action.
  - **LEADERBOARD**: Competitive standing, top-3 podium, and personal rank tracking.
  - **PROFILE**: Identity, stats (Win Rate, Streak, Games Played), and achievements.
- **Home / Play Screen Scan Order**:
  1. Header (Avatar, Name, Tier Badge, Settings/Audio toggle).
  2. Full-width Primary CTA: **PLAY RANKED** (Highest visual weight, glowing gradient).
  3. Secondary Split: **ME VS ROBOT** | **PLAY A FRIEND** (Balanced medium buttons).
  4. Daily/Local Split: **DAILY PUZZLES** | **LOCAL PLAY** (Compact game modes).
  5. Social Presence: **ONLINE PLAYERS** (Live count telemetry).
  6. Compact Game Lobby: **AVAILABLE ROOMS** (Clear status badges, join CTA, empty state).

---

## 3. Game Board & Number Generation
- **Board Dimensions**: Fixed 5×5 grid with exactly 25 cells.
- **Domain**: Numbers 1 through 25. Each number appears exactly once per board.
- **Shuffle Integrity**:
  - Fisher-Yates shuffle using deterministic Linear Congruential PRNG for seeded challenges and server authoritative replication.
  - Avoid `Math.random() - 0.5` which produces non-uniform distribution.
- **Line Completion**:
  - 5 Horizontal Rows, 5 Vertical Columns, 2 Diagonals, and 4 Corners.
  - Instant line highlight, animated strikethrough glow, audio fanfare, and non-destructive marking.

---

## 4. Mobile Performance & Android Touch Targets
- **Target Target Rule**: Android Accessibility Guidelines require minimum **48dp × 48dp** interactive touch targets.
- **Performance Targets**:
  - Sub-300ms cold launch to Home screen.
  - 60 FPS sustained rendering during ball calls and cell daubing.
  - Zero heavy asset bloat: Synthesized Web Audio API + SpeechSynthesis / TTS.

---

## 5. Security & Threat Modeling (OWASP MASVS)
- **Zero-Trust Client**: Client can only submit candidate marks or win claims; server/authoritative engine must independently verify:
  - Has the number actually been called in this session?
  - Does the claimed coordinate match the player's seeded board?
  - Does the line form a legitimate winning pattern?
- **Room Enumeration Defense**: Unpredictable 6-character alphanumeric room codes (e.g., `K9X2P7`) omitting ambiguous characters (`0, O, 1, I`).
