# REGRESSION & EDGE-CASE TEST SUITE: BINGO MOBILE GAME
**Scope:** Edge Cases, Boundary Conditions, State Machine Faults & Regressions  
**Version:** 3.0.0  
**Status:** Active Quality Gate  

---

## 1. Regression Test Matrix

| Category | Test Case | Edge Condition Tested | Expected Result |
| :--- | :--- | :--- | :--- |
| **Grid Engine** | Board Number Uniqueness | Matrix contains 25 numbers; verify no duplicates exist in 1–25 range. | `Set(allNumbers).size === 25` strictly true. |
| **Grid Engine** | Diagonal Win Detection | All 5 cells along main diagonal marked. | `evaluate5x5Wins` detects `MAIN_DIAGONAL`. |
| **Multiplayer** | Duplicate Join Rejection | Player already inside attempts to join same room. | Clean handling, no duplicate player entries. |
| **Multiplayer** | Room Code Case-Insensitivity | User inputs `k9x2p7` instead of `K9X2P7`. | Automatically capitalized, room joined successfully. |
| **Multiplayer** | Room Expiration / Teardown | Host leaves room. | Room status marked `FINISHED` or cleaned up; guest returned to lobby. |
| **Gameplay** | Fast Double-Tap on Cell | Player taps same cell twice in < 50ms. | Only first tap registers; no duplicate score or audio trigger. |
| **Gameplay** | Match Pause State | Player pauses match. | Caller timer suspended; numbers stop drawing until resumed. |
| **Theme Engine** | Dynamic Switching Mid-Match | Player switches Light/Dark theme during active match. | Board state, score, timer, and caller sequence are fully preserved without re-mount reset. |
| **Accessibility**| Screen Reader Announcements | TalkBack / VoiceOver focuses on cell. | Announces: `"Cell 17, Called, Marked"` with accessibility role `"button"`. |
