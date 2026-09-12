# BINGO ARCHITECTURAL DECISION RECORDS (ADR)
**Version:** 4.0.0  
**Classification:** Core Shared Artifact (`docs/bingo/DECISIONS.md`)

---

## ADR-001: Hybrid Authoritative Transport (`BroadcastChannel` + Storage Events)
- **Status:** Accepted
- **Context:** Multiplayer requires synchronization between multiple clients (e.g. 2 tabs or windows open side-by-side or cross-session) without introducing complex third-party cloud vendor requirements or external backend servers during local development.
- **Decision:** Implement a zero-dependency `BroadcastChannel` transport layer with `localStorage` event sync fallback. The host client executes the authoritative room server; guest clients connect as peers and receive authoritative snapshots.
- **Consequences:** Near-instantaneous (<5ms) cross-client communication, zero bundle bloat, completely reproducible in automated tests and local browser environments.

---

## ADR-002: Monotonic Sequence Numbering & Idempotent Actions
- **Status:** Accepted
- **Context:** Network latency, rapid user clicks, or duplicate event dispatches can cause race conditions (e.g. double match starts, out-of-order ball calls).
- **Decision:** Every broadcast event carries an integer sequence number (`msgSeq`) and action idempotency key. Clients reject packets with stale or duplicate sequence IDs.
- **Consequences:** Complete immunity to double-click starts and duplicate claim race conditions.

---

## ADR-003: Strict 5-Color Reference Palette Enforcement
- **Status:** Accepted
- **Context:** Preserving visual continuity and preventing generic AI-template appearance.
- **Decision:** Retain only the 5 authored colors: Lunar Shadow (`#282828`), Clean White (`#FFFFFF`), Gray Whisper (`#F7F7F7`), Gentle Olive (`#CBD77E`), Winter Hazel (`#E6CA9A`).
- **Consequences:** Distinctive, luxurious brand feel aligned with the original design assets.
