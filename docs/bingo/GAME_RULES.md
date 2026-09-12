# BINGO GAME RULES & DETERMINISTIC SPECIFICATION
**Version:** 4.0.0  
**Classification:** Core Shared Artifact (`docs/bingo/GAME_RULES.md`)

---

## 1. Board & Number Rules

1. **Board Structure**: A fixed 5×5 grid of 25 cells.
2. **Number Space**: Numbers strictly 1 to 25.
   - Each number 1–25 appears exactly once on each player's board.
   - No duplicate values on the same board.
3. **Number Pool & Drawing**:
   - Total pool of 25 balls (1 to 25).
   - Authoritative randomized draw via Fisher-Yates shuffle seeded with match seed.
   - No ball can be drawn twice in a match.
   - Balls drawn at 3.5s intervals (or manual host trigger in custom modes).

---

## 2. Winning Patterns (13 Recognized Patterns)

1. **5 Rows**:
   - Row 0: `(0,0), (0,1), (0,2), (0,3), (0,4)`
   - Row 1: `(1,0), (1,1), (1,2), (1,3), (1,4)`
   - Row 2: `(2,0), (2,1), (2,2), (2,3), (2,4)`
   - Row 3: `(3,0), (3,1), (3,2), (3,3), (3,4)`
   - Row 4: `(4,0), (4,1), (4,2), (4,3), (4,4)`
2. **5 Columns**:
   - Col 0: `(0,0), (1,0), (2,0), (3,0), (4,0)`
   - Col 1: `(0,1), (1,1), (2,1), (3,1), (4,1)`
   - Col 2: `(0,2), (1,2), (2,2), (3,2), (4,2)`
   - Col 3: `(0,3), (1,3), (2,3), (3,3), (4,3)`
   - Col 4: `(0,4), (1,4), (2,4), (3,4), (4,4)`
3. **2 Diagonals**:
   - Main Diagonal: `(0,0), (1,1), (2,2), (3,3), (4,4)`
   - Anti Diagonal: `(0,4), (1,3), (2,2), (3,1), (4,0)`
4. **1 Four Corners**:
   - Four Corners: `(0,0), (0,4), (4,0), (4,4)`

---

## 3. Daub & Marking Mechanics

- A cell is markable **if and only if** its value has been announced in the authoritative `drawnNumbers` history.
- Marking an uncalled number is rejected by the domain layer and plays error acoustic feedback.
- Completed patterns earn +500 points each and trigger visual alignment cues.

---

## 4. Claim Resolution & Tie Breaking

- **Claim Eligibility**: Player must have at least 1 completed verified line/pattern.
- **Simultaneous Claims**:
  - If two players submit claims on the same ball call or within 500ms, the authoritative server inspects authoritative call arrival timestamps.
  - The claim with the earlier server-recorded timestamp is awarded primary victory.
  - If identical millisecond timestamp, the player with higher total completed lines takes precedence.
