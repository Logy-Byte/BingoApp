# BINGO STATE MACHINE SPECIFICATION
**Version:** 4.0.0  
**Classification:** Core Shared Artifact (`docs/bingo/STATE_MACHINE.md`)

---

## 1. Room & Game Lifecycle States

```
                ┌────────────────┐
                │      IDLE      │
                └───────┬────────┘
                        │ CREATE_ROOM / JOIN_ROOM
                        ▼
                ┌────────────────┐
                │  ROOM_LOBBY    │◄─────────────────────────┐
                └───────┬────────┘                          │
                        │ ALL_PLAYERS_READY                 │
                        ▼                                   │
                ┌────────────────┐                          │
                │  READY_CHECK   │                          │
                └───────┬────────┘                          │
                        │ START_MATCH                       │
                        ▼                                   │
                ┌────────────────┐                          │
                │    STARTING    │ (3s Countdown)           │
                └───────┬────────┘                          │
                        │ COUNTDOWN_EXPIRED                 │
                        ▼                                   │
                ┌────────────────┐                          │
                │    PLAYING     │ (Authoritative Timeline) │
                └───────┬────────┘                          │
                        │ CLAIM_BINGO                       │
                        ▼                                   │
                ┌────────────────┐                          │
                │ CLAIM_VERIFYING│                          │
                └───────┬────────┘                          │
                        │ VALID_CLAIM                       │
                        ▼                                   │
                ┌────────────────┐                          │
                │WINNER_DECLARED │                          │
                └───────┬────────┘                          │
                        │ RESULTS_SHOWN                     │
                        ▼                                   │
                ┌────────────────┐                          │
                │ GAME_COMPLETE  │                          │
                └───────┬────────┘                          │
                        │ REMATCH                           │
                        └───────────────────────────────────┘
```

---

## 2. Failure & Recovery States

- `CONNECTION_LOST`: Triggered if heartbeat fails for >6 seconds. UI displays subtle floating indicator: "Reconnecting to room...".
- `RECONNECTING`: Client exchanges handshake with room host using cached session tokens.
- `DESYNCHRONIZED`: If client sequence numbers skip or board state diverges, client requests authoritative snapshot (`SYNC_STATE_REQUEST`) and re-renders smoothly.
- `OPPONENT_LEFT`: If opponent leaves lobby or match, host receives status update with forfeit notice.

---

## 3. Transition Invariant Matrix

| From State | Event | To State | Invariant Guards |
| :--- | :--- | :--- | :--- |
| `IDLE` | `CREATE_ROOM` | `ROOM_LOBBY` | Valid host name, unique room ID generated. |
| `IDLE` | `JOIN_ROOM` | `ROOM_LOBBY` | Valid code, room exists, capacity < max, status == WAITING. |
| `ROOM_LOBBY`| `PLAYER_READY` | `READY_CHECK` | Player exists in room, ready state updated. |
| `READY_CHECK`| `START_MATCH` | `STARTING` | Caller is host, playerCount >= 2, all non-host ready. |
| `STARTING` | `COUNTDOWN_EXPIRED` | `PLAYING` | Timer == 0, match seed & boards generated. |
| `PLAYING` | `NUMBER_CALLED` | `PLAYING` | Number in pool, call interval cooldown satisfied. |
| `PLAYING` | `CLAIM_BINGO` | `CLAIM_VERIFYING`| Player completed >= 1 line, match active. |
| `CLAIM_VERIFYING` | `CLAIM_VALID` | `WINNER_DECLARED`| AntiCheatValidator confirms all pattern numbers called. |
| `CLAIM_VERIFYING` | `CLAIM_INVALID` | `PLAYING` | Rejection feedback shown; match continues safely. |
| `WINNER_DECLARED` | `MATCH_END` | `GAME_COMPLETE` | Gameplay frozen, scores finalized. |
| `GAME_COMPLETE` | `REMATCH` | `ROOM_LOBBY` | Players moved to rematch lobby, state reset. |
