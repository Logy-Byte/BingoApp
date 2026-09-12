# BINGO VALIDATION MATRIX
**Version:** 4.0.0  
**Classification:** Core Shared Artifact (`docs/bingo/VALIDATION_MATRIX.md`)

---

## 1. Input Validation Rules

| Input Target | Constraint | Client Rule | Server Rule | Human Error Message |
| :--- | :--- | :--- | :--- | :--- |
| **Room Code** | 6 characters, alphanumeric | Sanitize: strip `#`, `-`, spaces, uppercase. | Reject if not found or malformed. | "That room could not be found. Check the code and try again." |
| **Player Name** | 2 to 16 characters | Trim whitespace. | Reject empty/whitespace-only or >16 chars. | "Please enter a display name between 2 and 16 characters." |
| **Room Password** | Optional, max 32 chars | Hash on client for transport privacy. | Compare against stored room password hash. | "Incorrect room password. Please try again." |
| **Cell Daub** | Number 1 to 25 | Require number in drawn numbers set. | Verify cell value matches drawn history. | "Number [X] has not been called yet!" |
| **Bingo Claim** | Pattern ID & coordinates | Require linesCompletedCount >= 1. | Strictly verify pattern completeness & calls. | "That claim could not be verified yet. Your card does not currently match a winning pattern." |

---

## 2. State Transition Guards

| Trigger Action | Required Pre-condition | Rejection Behavior |
| :--- | :--- | :--- |
| **Start Match** | `playerCount >= 2 && allNonHostReady && isHost && status == 'WAITING'` | Disable button visually; server ignores duplicate or unauthorized start packets. |
| **Call Number** | `isHost && gamePhase == 'PLAYING' && cooldownElapsed && poolRemaining > 0` | Silent drop or cooldown throttle. |
| **Daub Cell** | `gamePhase == 'PLAYING' && cellValue in calledNumbers` | Play error sound, display subtle toast, prevent cell state change. |
| **Claim Bingo** | `gamePhase == 'PLAYING' && lines >= 1` | Immediate client feedback; server rejection returns clear reason without crash. |
| **Rematch** | `gamePhase == 'GAME_COMPLETE'` | Return to lobby; regenerate board seeds. |
