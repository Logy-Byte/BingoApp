# BINGO TEST PLAN & QUALITY VERIFICATION SPECIFICATION
**Version:** 4.0.0  
**Classification:** Core Shared Artifact (`docs/bingo/TEST_PLAN.md`)

---

## 1. Test Levels & Strategy

1. **Unit Tests (`__tests__/`)**:
   - Board generation randomness and seed determinism.
   - 13 winning pattern evaluations.
   - Anti-cheat validator edge cases (tampered board IDs, uncalled numbers, skipped calls).
   - Monotonic sequence numbering and message de-duplication in transport layer.
2. **Integration Tests**:
   - Complete 2-client room lifecycle (Create &rarr; Join &rarr; Ready &rarr; Start &rarr; Play &rarr; Win &rarr; Rematch).
   - Simultaneous Bingo claim tie-breaker resolution.
   - Forfeit and unexpected disconnect recovery.
3. **Black-Box Scenario Tests**:
   - Scenario 1: Clean 2-player match.
   - Scenario 2: Malformed or expired room code.
   - Scenario 3: Double-click "Start Match" prevention.
   - Scenario 4: Premature Bingo claim rejection.
   - Scenario 5: Reconnecting mid-match without data loss.

---

## 2. Automated Test Matrix

| Suite | File | Focus Areas |
| :--- | :--- | :--- |
| **Multiplayer Transport** | `__tests__/transport.test.ts` | Message serialization, sequence ordering, broadcast delivery. |
| **Authoritative Room** | `__tests__/authoritativeRoomServer.test.ts` | Ready check logic, start game transactions, ball timeline, tie breaks. |
| **State Machine** | `__tests__/gameStateMachine.test.ts` | Valid state transitions and illegal transition rejection. |
| **Anti-Cheat Multi-Pattern** | `__tests__/antiCheatValidator.test.ts` | Multi-line claims, timestamp validation, false claims. |
| **Existing Suites** | `__tests__/*.test.ts(x)` | Regression testing across all 39 legacy tests. |
