# Threat Modeling & Security Architecture
*(OWASP MASVS Verification - Mobile Application Security)*

## 1. Zero-Trust Client Threat Model
- **Threat**: Client sends fraudulent win claim claiming numbers that have not been drawn or marked.
  - **Mitigation**: `AntiCheatValidator.validateClaim()` executes authoritative verification:
    1. Validates board seed and verifies that each cell number belongs to the player's initial board.
    2. Validates that every referenced cell number exists in `authoritativeCalledHistory`.
    3. Validates that claimed winning coordinates form a legitimate geometric winning pattern.
- **Threat**: Client marks uncalled cells to fast-forward line completions.
  - **Mitigation**: Cell daub action checks `calledNumbersSet`. Any unauthorized daub is rejected immediately on the authoritative layer.

## 2. Room Enumeration Defense
- **Threat**: Brute-forcing sequential or predictable room IDs.
  - **Mitigation**: Cryptographically random 6-character room IDs (`generateRoomId()`) generated from a 32-character alphabet omitting visually ambiguous characters (`0, O, 1, I`).
  - Total ID space = $32^6 \approx 1.07 \times 10^9$ unique codes.

## 3. Storage & Session Integrity
- Storing player session credentials and MMR ratings in sanitized client-side storage abstractions without plain text leakages.
- Server-authoritative rating adjustments (+25 MMR for verified win, -15 MMR for loss).
