# QUALITY ASSURANCE & TEST PLAN: BINGO MOBILE GAME
**Scope:** Unit, Integration, Component, Interaction, Accessibility & Anti-Cheat  
**Version:** 3.0.0  
**Status:** Approved Master Test Plan  

---

## 1. Test Architecture & Automated Coverage

Automated testing is powered by **Jest** and **React Native Testing Library**, covering 5 primary test suites:

### Suite 1: 5×5 Grid Game Engine (`gridGameEngine.test.ts`)
- Board generation: strictly 25 unique numbers between 1 and 25.
- Deterministic board generation via custom seeds.
- Free space anchor initialization at `(2,2)`.
- Win evaluation: all 5 horizontal rows, 5 vertical columns, 2 primary diagonals, and compounding scores.

### Suite 2: Multiplayer & Room Manager (`multiplayer.test.ts`)
- 6-character room code generation and uniqueness.
- Room creation with default parameters and custom passcodes.
- Join room success and capacity clamping (max 2 players).
- Error handling: Non-existent room code, full room, already started match, incorrect password.
- State transitions: `WAITING` → `READY` → `ACTIVE`.

### Suite 3: Anti-Cheat Win Validator (`bingoEngine.test.ts`)
- Verification that daubing an uncalled number is blocked.
- Verification that claiming Bingo with legitimate called numbers succeeds.
- Rejection of counterfeit board IDs or fabricated pattern IDs.
- Premature claim rejection when incomplete rows are submitted.

### Suite 4: Custom SVG Icon System (`iconSystem.test.tsx`)
- Rendering of `HomeIcon`, `PlayIcon`, `LeaderboardIcon`, `ProfileIcon`.
- Correct propagation of `variant="filled"` and `variant="outline"`.
- Continuous Bézier path definitions and optical centering.

### Suite 5: Root Application Integration (`App.test.tsx`)
- Root render with `<ThemeProvider>` and `<SafeAreaProvider>`.
- Initial navigation state verification (Home screen loaded with bottom nav).

---

## 2. Interactive & Black-Box Test Scenarios

| Test ID | Scenario | Expected Behavior |
| :--- | :--- | :--- |
| **BB-01** | Quick Play / Ranked Match | Tap "PLAY RANKED" on Home -> Game begins, board is generated, caller starts drawing balls every 3.5s. |
| **BB-02** | Room Creation Flow | Tap "Host Room" -> Enter room name -> Tap "Host Match" -> Room Lobby displays 6-char code with Copy button. |
| **BB-03** | Join Room Flow | Tap "Join Room" -> Input invalid code -> Displays "Room not found". Input valid code -> Enters lobby. |
| **BB-04** | Dual Theme Toggling | Tap Sun/Moon toggle in header -> Instantly toggles between Light Mode (#F7F7F7) and Dark Mode (#282828). |
| **BB-05** | Daub Mechanics | Tap called number -> Cell daubs with Gentle Olive seal and chime. Tap uncalled number -> Cell shakes, error sound plays. |
| **BB-06** | Claim Bingo | Complete 5 in a row -> "CLAIM BINGO" pulses -> Tap button -> Win fanfare plays, Results screen displays. |
| **BB-07** | Match Replay Flow | On Results screen, tap "PLAY AGAIN" -> Next match starts immediately without unnecessary interstitial screens. |
| **BB-08** | Android Back Button | Hardware back button confirms quit in match; navigates back to Home from nested sub-screens. |
