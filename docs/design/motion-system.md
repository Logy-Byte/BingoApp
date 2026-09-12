# MOTION SYSTEM & EMIL KOWALSKI PRINCIPLES

This document formalizes the motion design language for the Bingo application. Every animation must serve a communicative and tactile purpose. Unmotivated, sluggish, or purely decorative animations are forbidden.

---

## 1. Motion Categories

### 1. Physical (Direct Manipulation)
- **Target**: Bingo cells, primary action triggers, dock tabs.
- **Duration**: `90ms` to `120ms`.
- **Curve**: Sharp ease-out / instant spring.
- **Behavior**: Instant compression on touch-down (`scale: 0.94`, `translateY: 1.5px`); snappy release settling without overshoot or bounce.
- **Meaning**: "You have made physical contact with a mechanical element."

### 2. Spatial (Context & Navigation)
- **Target**: Screen swaps, sheets, modal overlays.
- **Duration**: `180ms` to `220ms`.
- **Curve**: `cubic-bezier(0.16, 1, 0.3, 1)` (Apple standard decelerate).
- **Behavior**: Directional, continuous, fully interruptible.
- **Meaning**: "You are moving between adjacent functional spaces."

### 3. State (Telemetry & Progress)
- **Target**: Caller number draw updates, completed lines counter, timer countdown.
- **Duration**: `150ms`.
- **Curve**: Ease-in-out.
- **Behavior**: Number roll / opacity crossfade; caller beacon pulses once on new draw.
- **Meaning**: "The game state has progressed."

### 4. Reward (Winning & Achievement)
- **Target**: Bingo victory claim, full-line completion.
- **Duration**: `320ms`.
- **Curve**: Expressive spring with slight resonance.
- **Behavior**: Golden line sweep along the winning 5-cell vector; celebratory tactile sound burst.
- **Meaning**: "You have triumphed."

---

## 2. Reduce-Motion Guarantee

When `accessibilitySettings.reduceMotion === true` or the OS reports `prefers-reduced-motion`:
- All transforms (`scale`, `translateY`, `rotate`) are strictly clamped to `0` or `1.0`.
- Duration is collapsed to `0ms` or instant opacity swap (`50ms`).
- Interaction remains 100% responsive and accessible.

---

## 3. Performance Safeguards

1. Only animate GPU-accelerated properties: `transform` and `opacity`.
2. Never animate `width`, `height`, `margin`, or `padding` to avoid browser/native layout reflows.
3. Component state updates during high-frequency caller ticks use memoized callbacks to prevent board re-render cascades.
