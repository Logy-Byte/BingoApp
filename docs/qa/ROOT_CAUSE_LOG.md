# Root-Cause Log & Defect Tracking
## Premium 5×5 Multiplayer Number Game

### Issue RC-01: Legacy Topology Configuration Typings in Multiplayer Test Suite
- **Symptom**: `npm test` failed in `multiplayer.test.ts` with `TypeError: Cannot read properties of undefined (reading '5')`.
- **Root Cause**: Tests were importing deprecated `DEFAULT_CONFIGS[5]` and `generateGridBoard(..., 3, ...)` from the legacy engine when the entire engine was refactored strictly to a fixed 5x5 board (`generate5x5Board`).
- **Remediation**: Refactored `__tests__/multiplayer.test.ts` to use `generate5x5Board` and `AntiCheatValidator.validateClaim` with numbers 1–25.
- **Verification**: All 32 unit tests pass across 4 suites (`npm test`).

### Issue RC-02: GameCard Shadow Token Mismatch
- **Symptom**: `tsc --noEmit` flagged `Property 'glow' does not exist on type SHADOWS`.
- **Root Cause**: `src/design/tokens.ts` defined `glowPrimary` and `glowEmerald`, whereas `src/components/common/GameCard.tsx` referenced deprecated `glow`.
- **Remediation**: Updated `GameCard.tsx` highlight styling to explicitly use `...SHADOWS.glowPrimary`.
- **Verification**: TypeScript compiler check passes with zero errors (`npx tsc --noEmit`).

### Issue RC-03: StatusBar Cross-Platform Web Typing
- **Symptom**: `StatusBar` component in `App.tsx` failed compilation because `backgroundColor` is Android-only and not accepted by React Native Web's strict typings.
- **Root Cause**: Passing `backgroundColor={COLORS.bgDark}` on `<StatusBar>` directly in web-targeted TSX.
- **Remediation**: Changed to standard `<StatusBar barStyle="light-content" />` with `SafeAreaView` wrapping the background.
- **Verification**: Zero TypeScript errors; webpack compiles successfully into `dist/`.
