# MOTION SYSTEM SPECIFICATION: BINGO MOBILE GAME
**Principles:** Purposeful, Tactile, Fast, Performant (Emil Kowalski Craft)  
**Version:** 3.0.0  
**Status:** Canonical Motion Authority  

---

## 1. Core Motion Principles

1. **Motion Must Have Purpose**:
   - Animations exist to confirm actions, clarify spatial origin, and celebrate game milestones.
   - We never add motion merely to create visual spectacle.
2. **Speed Over Sluggishness**:
   - Micro-interactions complete in under **150ms**. Standard modal transitions complete in **180–240ms**.
   - No interaction or navigation is ever delayed by an animation loop.
3. **Hardware Acceleration via Transforms & Opacity**:
   - Layout-triggering properties (`width`, `height`, `padding`, `margin`) are NEVER animated.
   - All motion utilizes `transform: [{ scale }, { translateY }, { rotate }]` and `opacity`.
4. **Contextual Spatial Origin**:
   - Sheets rise from the bottom edge. Modals emerge with a gentle scale pop from `0.96` to `1.0`.
   - Victory fanfare expands outward from the completed winning line coordinates.
5. **Full Support for Reduced Motion**:
   - When system accessibility detects `prefers-reduced-motion: reduce`, all scale springs, rotations, and parallax effects are replaced with instantaneous opacity fades (50–100ms).

---

## 2. Motion Timing & Easing Budget

| Interaction Type | Duration | Easing / Spring Config | Visual Effect |
| :--- | :--- | :--- | :--- |
| **Touch Down (Cell/Button)** | 80–100ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Instant mechanical compression (`scale: 0.96`) |
| **Touch Release / Settle** | 120–150ms | `spring({ tension: 350, friction: 25 })` | Smooth return to `scale: 1.0` |
| **Cell Daub Seal Stamp** | 140ms | `spring({ tension: 400, friction: 22 })` | Pop from `scale: 0.8` to `1.05` to `1.0` with olive fill |
| **Winning Line Highlight** | 300ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Golden beam expansion along row/col with subtle pulse |
| **Bottom Dock Tab Switch** | 160ms | `cubic-bezier(0.25, 1, 0.5, 1)` | Active white pill slides smoothly; icon transitions to filled |
| **Modal / Dialog Entrance** | 200ms | `cubic-bezier(0.16, 1, 0.3, 1)` | `opacity: 0 → 1`, `scale: 0.96 → 1.0`, `translateY: 12px → 0` |
| **Victory Fanfare** | 450ms | `spring({ tension: 280, friction: 18 })` | Trophy crest ascends with confetti beam; rating count-up |

---

## 3. Cell Physical Material Model

The 5×5 Board Cell acts as a responsive tactile switch:
- **`IDLE`**: Stable debossed state with 1px border.
- **`TOUCH_DOWN`**: 0.96 instant compression, providing physical resistance.
- **`DAUBED`**: Immediate sound click + spring settle, revealing the stamped Gentle Olive seal.
- **`ILLEGAL_TOUCH`**: Micro-shake (120ms horizontal oscillation: `-3px → +3px → 0`) with warning sound if the number has not been called.
