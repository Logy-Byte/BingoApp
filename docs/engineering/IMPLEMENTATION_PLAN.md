# IMPLEMENTATION PLAN: APPLE HIG + EMIL KOWALSKI CRAFT + GAME PERSONALITY

**Phase 7 & 8 Deliverable**  
**Lead:** Principal Mobile Engineer  

---

## 1. Objectives & Scope
Refine and elevate the React Native Bingo codebase to meet the highest standard of mobile craft:
- **Apple Product Discipline**: 44×44pt touch regions, purposeful typography, restrained materials, accessible feedback.
- **Emil Kowalski Interaction Craft**: Tactile direct manipulation, micro-compression on press-down, zero unmotivated motion, interruptible state transitions, reduced motion support.
- **Bingo Tactile Personality**: Distinctive 5×5 game tile geometry, instant daubing, high visual hierarchy.
- **OWASP MASVS Security**: Authoritative validation, sanitized storage, resilient state.

---

## 2. Vertical Slices & Tasks

### Slice 1: Design Tokens & Typography Foundation
- Update `src/design/tokens.ts`:
  - Font family hierarchy starting with Apple system fonts (`-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display'`).
  - Explicit touch target tokens: `TOUCH_TARGET = { minSize: 44, androidMin: 48 }`.
  - Motion tokens: `micro: 120ms`, `standard: 200ms`, `curve: cubic-bezier(0.2, 0, 0, 1)`.

### Slice 2: Tactile Game Board & GameCell Polish
- Update `src/components/game/GameCell.tsx`:
  - Add active press micro-compression (`scale: 0.98`) on touch-down.
  - Distinct geometric differentiation for all cell states (Uncalled, Called, Marked, Winning, Free).
  - Guarantee 44×44pt minimum effective hit region with hitSlop and container min-dimensions.
  - Complete accessible role, state, and label.
- Update `src/components/game/GameBoard.tsx`:
  - Consistent spacing, accessible grid role.

### Slice 3: Navigation & Bottom Bar Ergonomics
- Update `src/components/navigation/BottomNavBar.tsx`:
  - Ensure all 3 tab buttons have 44×44pt touch regions.
  - Immediate native tab transitions with clean contrast.

### Slice 4: Screens & HUD Touch Target Audit
- Update `src/screens/GameplayScreen.tsx` & `src/screens/HomeScreen.tsx`:
  - Ensure all header buttons, quit actions, pause toggles, sound switches, and modal close buttons have minimum 44×44pt touch target frames.

### Slice 5: Quality Assurance & Verification
- Run Jest test suite `npm test`.
- Verify zero regressions across all 4 suites (32 tests).
