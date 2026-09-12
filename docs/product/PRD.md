# MASTER PRODUCT REQUIREMENTS DOCUMENT (PRD)
**Project:** React Native Bingo — Apple-Inspired & Emil Kowalski Interaction Craft  
**Version:** 2.0.0  
**Status:** Approved for Design Exploration & Engineering Architecture  

---

## 1. Product Vision & Principles
Build a mobile Bingo experience that feels calm, tactile, fast, and purpose-built.
- **Personality**: Grounded in the game itself — sharp number recognition, satisfying tactile daubing, clean spatial board presence.
- **Tone**: Focused, premium, responsive. Zero casino clutter, zero generic SaaS dashboard styling, zero gratuitous glassmorphism.

---

## 2. Navigation & Screen Hierarchy

### Primary Destinations (Bottom Bar)
1. **Play (`PLAY`)**: Primary entry point. Hosts ranked matchmaking, AI robot opponent, play with friends, daily puzzle, and live public rooms.
2. **Leaderboard (`LEADERBOARD`)**: Competitive standing, tier ratings, season/weekly rankings, and player position.
3. **Profile (`PROFILE`)**: Player identity, verified match stats, achievements, preferences, audio toggles, and account status.

### Interaction Rules
- Peer destinations: Tab switching is instantaneous and direct. No animated horizontal page sliding between tabs.
- Touch target: Minimum 44×44pt on all interactive elements.

---

## 3. Game Experience Specification (5×5 Grid)

### Board Domain & Geometry
- **Format**: Fixed 5×5 grid (exactly 25 cells).
- **Number Space**: Unique numbers from **1 to 25** exclusively.
- **Free Space**: Center cell `(2,2)` acts as the traditional starting anchor.
- **Winning Patterns**: 5 horizontal rows, 5 vertical columns, 2 primary diagonals (total 12 winning lines). Multiple simultaneous lines compound score.

### Interaction Model
- **Tap down**: Immediate micro-compression (`scale: 0.98`), providing instantaneous mechanical feedback on touch-down.
- **Commit**: Instant state change. Daub stamp rendered with contrasting geometry, clear border, and subtle audio/haptic click.
- **Accessibility**: Cells announce number value, mark state, and call state clearly to screen readers.
- **Input Independence**: Animation must never block the next tap. No delayed async blocking.

### Game State Matrix
| State | Visual Manifestation | Audio / Feedback |
| :--- | :--- | :--- |
| **Default / Uncalled** | Dark neutral surface `#1A1D20`, subtle border `#272B2F`, white text. | Silent |
| **Called / Active** | Warm amber glow `rgba(213, 163, 58, 0.12)`, amber border `#D5A33A`. | Tactile call sound + optional voice |
| **Marked / Daubed** | Forest green daub background `#1A291E`, green border `#5FA56D`, geometric checkmark. | Crisp daub tap chime |
| **Winning Line Cell** | Warm gold background `#2E2718`, bright gold border `#E6B84F`, corner highlight pin. | Harmonic chord resolution |
| **Invalid Action** | Transient shake (120ms) or subtle red border flash. | Low warning detent |

---

## 4. Multi-Agent Review Decisions (`DECISIONS.md`)
- **Decision 1 (Navigation)**: Keep bottom navigation strictly as 3 top-level tabs. Sub-flows (Gameplay, Room Lobby, Daily Puzzle, Settings) push modally or swap stack deterministically with explicit back handler.
- **Decision 2 (Visual Aesthetic)**: Reject generic neon and purple gradients. Adopt a tailored palette: Deep Obsidian `#101214`, Warm Amber `#D5A33A`, Forest Green `#5FA56D`, and crisp tabular typography.
- **Decision 3 (Animation Discipline)**: Motion budget strictly capped to 100–180ms for interactions. Reduced motion support strictly enforced.

---

## 5. Security & Verification Requirements (OWASP MASVS)
1. **Server/Engine Authority**: Any win or line completion must be validated against drawn sequence via `AntiCheatValidator`.
2. **Storage**: Local preferences, player stats, and history stored with schema validation.
3. **Resilience**: Match session handles background interruptions gracefully.
