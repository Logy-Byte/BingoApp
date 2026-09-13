# COMPREHENSIVE QA TEST PLAN
**QA Lead & SDET**  
**Status:** Active

---

## 1. Test Levels & Strategy
1. **Unit Testing**:
   - Board generation algorithms (rows, columns, number pool 1–25, determinism).
   - Win evaluation (5 horizontal, 5 vertical, 2 diagonal lines).
   - Anti-cheat validator (daub verification, claim verification).
   - Primitive components (`GameButton`, `SettingsRow`, `GameInput`).
2. **Integration Testing**:
   - Room manager & authoritative server state transitions (`CREATED` → `LOBBY` → `STARTING` → `IN_PROGRESS` → `FINISHED`).
   - Sound engine mute/unmute and volume changes.
   - Theme switching (Light / Dark mode persistence and token propagation).
3. **White-Box Testing**:
   - Pure state machine transitions in `gameStateMachine.ts`.
   - Robot AI difficulty daub timing and decision branches.
4. **Black-Box Testing**:
   - End-to-end user flows: Splash → Sign-In → Home → Mode Selection → Gameplay → Daubing → Claim Bingo → Results → Play Again.
5. **Visual & Accessibility QA**:
   - Touch targets >= 44pt.
   - Contrast ratio >= 4.5:1.
   - Screen reader labels and roles.
   - Reduced motion behavior.
