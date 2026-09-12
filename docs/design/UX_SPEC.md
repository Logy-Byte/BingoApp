# UX Architecture & Interaction Specification
## Premium 5×5 Multiplayer Number Game

### 1. Primary Bottom Navigation (3 Tabs)
The application establishes 3 clear persistent bottom destinations:
1. **PLAY (Anchor)**:
   - Centered and elevated with glowing accent border.
   - Communicates immediacy, competition, and core action.
2. **LEADERBOARD (Competition)**:
   - Displays podium, regional/global rankings, and user rank status.
3. **PROFILE (Identity)**:
   - Player stats, match history, win rate, and progression badges.

---

### 2. Home Screen Layout Structure
```
+-----------------------------------------------------------+
| [Avatar] Player_One (Diamond III)          [🔊 Sound] [⚙️]  |
+-----------------------------------------------------------+
|                                                           |
|  [⚡ PLAY RANKED - Competitive Matchmaking (+25 MMR)]     |  <- Hero CTA
|                                                           |
+-----------------------------------------------------------+
|  [ 🤖 ME VS ROBOT ]       |       [ 👥 PLAY A FRIEND ]    |  <- Secondary
+-----------------------------------------------------------+
|  [ 📅 DAILY PUZZLE (Day 4)|       [ 🎮 LOCAL SOLO PLAY ]  |  <- Daily / Local
+-----------------------------------------------------------+
|  🟢 1,420 PLAYERS ONLINE NOW                              |  <- Social Presence
+-----------------------------------------------------------+
|  AVAILABLE ROOMS                                [🔄 Refresh]|
|  +-----------------------------------------------------+  |
|  | Diamond Showdown (#K9X2P7) • 1/2 Players • Public   |  |
|  | Host: Alex_99   [ JOIN ROOM ]                       |  |
|  +-----------------------------------------------------+  |
|  | Speed Round (#H3W8Q1) • 3/4 Players • Public        |  |
|  | Host: Sarah_K   [ JOIN ROOM ]                       |  |
|  +-----------------------------------------------------+  |
+-----------------------------------------------------------+
|       [ 🏆 LEADERBOARD ]    [ ⚡ PLAY ]    [ 👤 PROFILE ]  |  <- Bottom Nav
+-----------------------------------------------------------+
```

---

### 3. State Continuity & Transitions (Emil Kowalski Motion Principles)
- **Cell Press**: Fast 80ms scale down (`0.94`) with spring release back to `1.0`.
- **Called Ball Arrival**: Subtle vertical translation (`-12px` to `0px`) and opacity fade in 180ms.
- **Line Completion**: Radiant glow pulse across completed coordinates.
- **Invalid Mark Toast**: Non-blocking toast at the top of the board, lasting 1.2s before smooth fade out.
- **Touch Targets**: Minimum `48dp` bounding boxes on all buttons and grid cells.
