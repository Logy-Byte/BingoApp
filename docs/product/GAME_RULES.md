# Official Game Rules & Mechanics Specification
## Premium 5×5 Multiplayer Number Game

### 1. Board & Cell Architecture
- **Grid Layout**: 5 rows × 5 columns = **25 cells**.
- **Values**: Exactly the integers **1 through 25**, uniquely placed with zero duplicates.
- **Center Cell**: In standard 5×5 play, cell `(row: 2, col: 2)` can be configured as a standard called number or FREE space based on game mode. For competitive ranked, all 25 numbers are placed.
- **Cell States**:
  - `DEFAULT`: Uncalled, unselected number cell.
  - `CALLED`: Number has been drawn by caller but not yet daubed by player.
  - `MARKED`: Validly daubed by player after being called.
  - `COMPLETED`: Cell is part of one or more finished winning lines.
  - `INVALID`: Feedback state when a player attempts to tap an uncalled number.
  - `DISABLED`: Cell interaction paused during validation or game-over.

### 2. Number Generation & Caller System
- **Number Pool**: Numbers 1 to 25.
- **Sequence Generation**: Fisher-Yates unbiased shuffle.
- **Caller Cadence**: Draws 1 number every 3.5 seconds (or manual call in local play).
- **Audio Announcement**: Spoken number callout (e.g. "Twenty-one", "Five") combined with synthesized notification chime.
- **Call History**: Prominently displays the current number and a scrollable tray of recent draws.

### 3. Daub Interaction Rules
- A player may only mark a cell whose number has already been called.
- Tapping an uncalled number triggers an invalid feedback vibration/sound and brief warning banner ("Number not yet called!").
- Tapping a called number instantly transitions the cell to `MARKED`, accompanied by audio and haptic feedback.

### 4. Winning Patterns
The game supports 13 distinct winning patterns:
1. **Horizontal Rows (5)**: Rows 0, 1, 2, 3, 4.
2. **Vertical Columns (5)**: Columns 0, 1, 2, 3, 4.
3. **Main Diagonal (1)**: Coordinates `(0,0), (1,1), (2,2), (3,3), (4,4)`.
4. **Anti Diagonal (1)**: Coordinates `(0,4), (1,3), (2,2), (3,1), (4,0)`.
5. **Four Corners (1)**: Coordinates `(0,0), (0,4), (4,0), (4,4)`.

### 5. Line Completion & Win Trigger
- As soon as all cells in a pattern are marked, the line is locked as `COMPLETED`.
- The game immediately plays line completion fanfare, highlights the coordinates, and updates the score.
- **Win Claim**: In ranked and room multiplayer, completing target lines (e.g., 5 lines or Full House) enables the **CLAIM BINGO** button. The server/engine validates the claim against authoritative history.
