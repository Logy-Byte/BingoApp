# BINGO ACCEPTANCE CRITERIA & VERIFICATION CHECKLIST
**Version:** 4.0.0  
**Classification:** Core Shared Artifact (`docs/bingo/ACCEPTANCE_CRITERIA.md`)

---

## Acceptance Criteria Checklist

### 1. Product & Multiplayer Functionality
- [x] Host can create an open or password-protected room with a 6-character code.
- [x] Code is sanitized, copyable, and easy to share verbally (no ambiguous characters like 0/O/1/I).
- [x] Guest can join room using code and display name; errors are human-friendly.
- [x] Lobby displays live connected players and real-time ready indicators.
- [x] "Start Match" is locked until all required players are ready.
- [x] 3-second countdown initiates match transition synchronously across clients.
- [x] Ball caller operates on an authoritative timeline with 3.5s cadence.
- [x] Daubs are validated against authoritative drawn numbers; invalid daubs rejected.
- [x] Completed lines update live with gentle olive alignment progress cues.
- [x] "CLAIM BINGO" initiates server-authoritative win verification.
- [x] False claims are rejected gracefully without corrupting match state.
- [x] Simultaneous claims are adjudicated deterministically.
- [x] Match end freezes the game, displays results, and enables rematch.
- [x] Rematch returns both connected players to the lobby with fresh boards.

### 2. Engineering & Quality
- [x] Code strictly type-checked and compiles with zero TypeScript errors.
- [x] Webpack production build succeeds without warnings.
- [x] Automated Jest unit and integration tests pass with 100% coverage of critical paths.
- [x] Zero P0/P1 defects remaining.
