# BINGO MULTIPLAYER SYSTEM ARCHITECTURE
**Version:** 4.0.0  
**Classification:** Core Shared Artifact (`docs/bingo/ARCHITECTURE.md`)

---

## 1. Architectural Overview

The system employs a **Server-Authoritative Decoupled Architecture** built for high reliability, zero-cheat gameplay, and low-latency synchronization across clients.

```
┌─────────────────────────────────────────────────────────────┐
│                       PRESENTATION LAYER                    │
│   HomeScreen · LobbyScreen · GameplayScreen · ResultsScreen │
└──────────────────────────────┬──────────────────────────────┘
                               │ Dispatches User Actions
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    REACT HOOK / CONTROLLER                  │
│                    useMultiplayerRoom()                     │
│      Translates user intent into network & domain events     │
└──────────────────────────────┬──────────────────────────────┘
                               │
               ┌───────────────┴───────────────┐
               ▼                               ▼
┌─────────────────────────────┐ ┌─────────────────────────────┐
│   DOMAIN GAME ENGINE        │ │   NETWORK TRANSPORT LAYER   │
│ - 5×5 Matrix Generator      │ │ - BroadcastChannel Transport│
│ - PRNG (Fisher-Yates)       │ │ - Storage Fallback Sync     │
│ - 13 Winning Patterns       │ │ - Heartbeat & Auto-Reconnect│
│ - AntiCheatValidator        │ │ - Sequence & De-duplication │
└─────────────────────────────┘ └──────────────┬──────────────┘
                                               │
                                               ▼
                                ┌─────────────────────────────┐
                                │ AUTHORITATIVE ROOM SERVER   │
                                │ - Host Authority Lifecycle  │
                                │ - Seed & Board Assignment   │
                                │ - Ball Caller Timeline      │
                                │ - Tie-Breaker Resolution    │
                                │ - Snapshot Synchronization  │
                                └─────────────────────────────┘
```

---

## 2. Layers & Responsibilities

### 2.1 Presentation Layer
- Renders screens using the 5-color design tokens.
- Never decides whether a player has won or if a number is valid.
- Derives all UI representations strictly from the authoritative state snapshot.

### 2.2 Controller / Hook Layer (`useMultiplayerRoom.ts`)
- Manages subscriptions to transport events.
- Handles local optimistic state with rollback on authoritative rejection.
- Exposes single canonical sources of truth: `room`, `players`, `currentCall`, `drawnNumbers`, `myBoard`, `opponentLines`, `gamePhase`.

### 2.3 Domain Game Engine
- Pure mathematical functions with no UI or network side-effects.
- Generates 5×5 boards deterministically using linear congruential PRNG.
- Evaluates completed lines across 13 patterns without component coupling.

### 2.4 Authoritative Room Server (`authoritativeRoomServer.ts`)
- The host peer or central server holds the authoritative token.
- Validates room membership, ready statuses, and starts.
- Broadcasts sequence-numbered ball calls every 3.5s.
- Verifies win claims against server-side call history.
- Resolves concurrent claims deterministically.

### 2.5 Transport Layer (`transport.ts`)
- Utilizes `BroadcastChannel` with fallback to `localStorage` event synchronization.
- Enables multi-tab, multi-window, and cross-session real-time multiplayer with zero cloud configuration.
- Guarantees message idempotency using monotonically increasing message sequence numbers (`msgId`).
