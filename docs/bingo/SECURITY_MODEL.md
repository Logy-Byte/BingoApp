# BINGO MULTIPLAYER SECURITY MODEL & THREAT MITIGATION
**Version:** 4.0.0  
**Classification:** Core Shared Artifact (`docs/bingo/SECURITY_MODEL.md`)  
**Standard:** OWASP Game Security Verification Standard (GSVS)

---

## 1. Threat Model & Attack Vectors

| Attack Vector | Threat Level | Attacker Goal | Mitigation Architecture |
| :--- | :--- | :--- | :--- |
| **Room Code Enumeration** | Medium | Brute-force guess active rooms | 6-char alphanumeric code from 32-character ambiguous-free charset (~1.07 billion space). Rate limit join attempts to 5 per 30 seconds. |
| **Client Win Claim Spoofing** | Critical | Fake winning line or claim uncalled cells | Anti-cheat validation runs exclusively on authoritative host/server. Verifies every cell against server's drawn numbers log. |
| **Premature Number Calling** | High | Force ball draws or skip cooldown | Only room host can dispatch call ticks; server enforces minimum 3.0s cooldown between draws. |
| **Replay / Duplicate Actions** | Medium | Resend claim or start packets | Monotonic sequence numbering (`msgSeq`) and idempotency keys per action. Duplicate packets are safely dropped. |
| **Session Hijacking / Identity Spoofing** | High | Impersonate host to terminate room | Host identity tied to cryptographically generated session UUID (`hostId`) assigned at room creation. |
| **XSS & Injection via Player Names** | Medium | Inject scripts into player cards | Names sanitized and strictly bounded (trimmed, min 2 chars, max 16 chars, HTML escaped in presentation). |

---

## 2. Server-Authoritative Boundaries

The client is **UNTRUSTED**. The client may ONLY:
1. Express intent to join/create room.
2. Express intent to toggle ready.
3. Express intent to mark a cell (local tactile prediction, reconciled with server).
4. Express intent to claim Bingo.

The authoritative controller owns:
1. Room membership and permissions.
2. Board generation seeds.
3. Number pool and call timeline.
4. Final win adjudication.
