# BINGO PERFORMANCE & OPTIMIZATION SPECIFICATION
**Version:** 4.0.0  
**Classification:** Core Shared Artifact (`docs/bingo/PERFORMANCE_PLAN.md`)

---

## 1. Performance Budgets

| Metric | Target Budget | Enforcement Mechanism |
| :--- | :--- | :--- |
| **Initial JS Bundle (Gzipped)** | < 350 KB | Webpack optimization, tree shaking, zero heavy third-party UI libs. |
| **Touch Response Latency** | <= 16 ms (1 frame) | Direct touch handling with immediate visual state feedback. |
| **Ball Calling Ticker Jitter** | < 20 ms variance | Drift-corrected timestamp scheduler. |
| **Frame Rate** | Sustained 60 FPS | Hardware-accelerated transforms and opacity for all animated elements. |
| **Board Cell Re-render** | 0 extraneous renders | Pure React memoization per `GameCell` keyed by cell coordinates. |

---

## 2. Animation Performance Rules (Emil Kowalski Guidelines)
- Never use `transition: all`. Specify explicit properties (`transform`, `opacity`, `background-color`).
- Keep press transitions fast (&le;120ms) with `cubic-bezier(0.2, 0.8, 0.2, 1)`.
- Respect `prefers-reduced-motion`: disable pulsing glow animations and scale zooms when user requests reduced motion.
