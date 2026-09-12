# Test Plan & Verification Matrix
## Premium 5×5 Multiplayer Number Game

### 1. Automated Test Coverage
- **Engine Integrity (`gridGameEngine.test.ts`)**:
  - Deterministic PRNG seed reproducibility test.
  - Pool generator verifying exactly 25 numbers (1–25) with zero duplicates.
  - 5×5 board generator verifying unique 1–25 distribution.
  - 13 distinct winning pattern evaluations (5 rows, 5 columns, 2 diagonals, 4 corners).
  - Duplicate line award prevention.
- **Multiplayer & Anti-Cheat (`multiplayer.test.ts`)**:
  - 6-character cryptographic room code randomness.
  - Host assignment and room creation.
  - Password-protected room enforcement.
  - Room capacity limits.
  - Server-authoritative win claim validation against uncalled numbers.
  - Daub authorization verification.
- **Robot AI Engine**:
  - Board independence, reaction timing, and line evaluation.

### 2. Manual & Device QA Test Matrix
| Feature / Screen | Test Case | Target Behavior | Result |
|---|---|---|---|
| **Navigation** | Tap bottom tabs | Switches between PLAY, LEADERBOARD, PROFILE smoothly | PASS |
| **Home Screen** | Visual hierarchy | Hero PLAY RANKED leads, followed by Robot/Friend, Daily/Local, Telemetry | PASS |
| **Ranked Mode** | Match launch | Generates 5x5 board, begins caller cadence, updates rating (+25 MMR) on win | PASS |
| **Robot Mode** | Bot difficulty selection | Bot plays independently with simulated latency; reports lines | PASS |
| **Friend Mode** | Create/Join room | 6-char room code generates and accepts joins; checks password if private | PASS |
| **Daily Puzzle** | Date-seeded puzzle | Reproducible daily board with streak incrementation | PASS |
| **Audio & Speech** | Number draw | Calls number verbally ("Twenty one", etc.) and plays tactile chime | PASS |
| **Accessibility** | Touch targets | Bounding box on all cells & buttons >= 48dp | PASS |
