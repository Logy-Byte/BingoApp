# BINGO MULTIPLAYER GAME — PRODUCT REQUIREMENTS DOCUMENT (PRD)
**Version:** 4.0.0 (Production Master)  
**Status:** Approved for Implementation  
**Classification:** Core Shared Artifact (`docs/bingo/PRD.md`)  
**Product Team:** Principal Product Designer, Principal Systems Architect, Mobile Game UX Lead, Security Engineer

---

## 1. Executive Summary & Vision
Transform the 5×5 number game into a tactile, high-craft, server-authoritative multiplayer title. The experience delivers frictionless entry (Create Room &rarr; Share Code &rarr; Join Room &rarr; Ready &rarr; Start &rarr; Play &rarr; Claim &rarr; Rematch) without confusing setup, ads, or predatory mechanics.

---

## 2. Core Game Model & Principles
1. **Server-Authoritative Trust**: The client is never authoritative for winner status, valid numbers, turn ownership, game phase, or board validation.
2. **Deterministic Rules**: 5×5 matrix (25 cells) with numbers 1–25, 13 distinct winning patterns (5 rows, 5 columns, 2 diagonals, 4 corners), and unambiguous win conditions.
3. **Calm Aesthetic Discipline**: Grounded in the authored 5-color palette (Lunar Shadow `#282828`, Clean White `#FFFFFF`, Gray Whisper `#F7F7F7`, Gentle Olive `#CBD77E`, Winter Hazel `#E6CA9A`) and Sora geometric typography.
4. **Touch & Motion Ergonomics**: Minimum 44×44pt touch targets, immediate tactile response (`scale(0.97)` on press), purposeful animations, and full reduced-motion support.

---

## 3. End-to-End User Flows

### 3.1 Room Creation Flow
1. Host enters room name (default: "Arena #[Code]") and chooses privacy (Open or Password).
2. Authoritative room manager generates unique 6-character room code (from entropy pool `ABCDEFGHJKLMNPQRSTUVWXYZ23456789`, excluding ambiguous `0`, `O`, `1`, `I`).
3. Host receives room snapshot, enters lobby, and gets clear one-tap copyable room code and share actions.

### 3.2 Room Joining Flow
1. Guest navigates to "Join Room".
2. Guest inputs 6-character room code and display name.
3. System performs progressive validation:
   - Sanitization: trims whitespace, strips `#` and `-`, converts to uppercase.
   - Format validation: ensures exactly 6 alphanumeric characters.
   - Room existence check: returns human-readable error if room is not found.
   - Capacity check: rejects join if room is full (max 2 for 1v1 duel).
   - Match status check: rejects join if match has already started.
4. On success, Guest transitions into the active Lobby.

### 3.3 Lobby & Ready State
1. Both players see live connected player slots, player names, MMR ratings, and ready badges.
2. Guest toggles "Ready" / "Not Ready".
3. "Start Match" button is exclusively visible to Host, and is disabled until:
   ```ts
   canStart = roomExists && hostExists && playerCount >= 2 && allNonHostPlayersReady && status === 'WAITING'
   ```
4. When Host presses "Start Match", button enters immediate pending state, countdown triggers (3..2..1), and game transitions synchronously.

### 3.4 Gameplay & Ball Calling
1. Authoritative caller timeline broadcasts drawn numbers at 3.5-second intervals.
2. Caller HUD announces number with concentric dial illumination and audio tone.
3. Players mark called cells on their 5×5 board.
4. System validates every daub against authoritative call history.
5. Completed lines update live with gentle olive alignment indicators.

### 3.5 Win Claim & Verification
1. When lines &ge; 1, "CLAIM BINGO" button illuminates.
2. Player taps "CLAIM BINGO" &rarr; sends claim request to authoritative validator.
3. Authoritative validator verifies:
   - Board ID matches registered player board.
   - Claimed pattern coordinates exist and are marked.
   - All numbers in claimed pattern were legitimately called.
   - Game phase is active.
4. If valid: Game freezes immediately, winner is broadcast, and results screen appears.
5. If invalid: Informative feedback is displayed; match continues without corruption.

### 3.6 Rematch Flow
1. From Results screen, any player can tap "Rematch".
2. Room returns both connected players to the Lobby stage.
3. Previous game result remains immutable; new match seed is generated for the upcoming game.

### 3.7 Disconnect & Reconnect
1. If a client drops connection or reloads the tab, a subtle reconnecting indicator appears.
2. Client queries authoritative room snapshot via stored session/room code.
3. Authoritative state restores board cells, marks, drawn numbers history, and active phase.

---

## 4. Acceptance Phase Gates
- **Gate A (Research)**: Competitive benchmarks, React patterns, and Apple HIG synthesized.
- **Gate B (PRD)**: All user flows, state transitions, and validation rules specified.
- **Gate C (Design)**: Visual continuity preserved; hierarchy optimized for touch.
- **Gate D (Implementation)**: Type-safe, lint-free, server-authoritative logic.
- **Gate E (Testing)**: Unit, integration, and stress tests pass with 100% coverage of critical paths.
- **Gate F (Release)**: Zero P0/P1 defects, accessibility verified, smooth 60fps performance.
