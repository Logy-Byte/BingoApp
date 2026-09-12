# Performance & Optimization Plan
*(React Native Android Hardware Baseline)*

## 1. Targets
- **Startup Time**: Cold launch to Home screen in <300ms.
- **Frame Rate**: Sustained 60 FPS across board rendering and number animations.
- **Touch Responsiveness**: <16ms response latency on cell daubs.
- **Asset Overhead**: 0 MB extra audio bundle size (native synthesis via Web Audio API + SpeechSynthesis / TTS).

## 2. Profiling & Optimization Rules
- `React.memo` with custom coordinate/value comparators on all 25 `GameCell` components to avoid re-rendering entire grid on single cell daubs.
- Pre-allocated 5x5 board state matrices with immutable updates.
- Virtualized lists for available rooms and leaderboard rows when exceeding viewport dimensions.
