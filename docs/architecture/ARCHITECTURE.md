# Architecture & System Design Document

### 1. Architectural Layers
```
┌────────────────────────────────────────────────────────┐
│                   Presentation Layer                   │
│  (Screens: Home, CreateRoom, JoinRoom, Lobby, Game,    │
│            Results, Settings)                          │
├────────────────────────────────────────────────────────┤
│                 UI Components & Design                 │
│  (GameCard, GameCell, CallerHUD, StandingsTray,        │
│   Design Tokens, Emil Kowalski Motion Choreography)    │
├────────────────────────────────────────────────────────┤
│                   Audio & Synthesizer                  │
│  (Web Audio Oscillators + SpeechSynthesis Caller Engine│
├────────────────────────────────────────────────────────┤
│                  Domain & Multiplayer                  │
│  (GridGameEngine, Seeded PRNG, RoomManager,            │
│   MatchStateMachine, AntiCheatValidator, Transport)    │
└────────────────────────────────────────────────────────┘
```

### 2. The `GridGameEngine`
The engine exposes a clean functional API:
- `generateGridBoard(config, seed)`: Generates consistent rows x cols matrix.
- `generateDrawDeck(config, seed)`: Generates full drawing pool.
- `evaluateGridWins(card, calledSymbols, winRules)`: Pure function returning active lines, winning status, and highlighted coordinate vectors.

### 3. Authoritative Multiplayer Boundary
- Client actions (`join`, `ready`, `daub`, `claim`) are dispatched to the `RoomManager`.
- Claims are evaluated by `AntiCheatValidator`:
  1. Have all claimed cells been drawn by the authoritative caller?
  2. Does the pattern match the game rule?
  3. Was the claim registered within valid match timing?
- Only valid claims transition the state machine from `WIN_CLAIM` to `RESULT`.
