# COMPONENT ANATOMY & GEOMETRY SPECIFICATION

This document outlines the precise structural, geometric, and physical hierarchy of all core components under the **"Bingo Object"** design philosophy.

---

## 1. The Hero: `BingoBoard` (The Physical Game Object)

The Bingo Board is not a standard React Native card. It is treated as a solid, milled architectural plate that sits in the play space.

```text
┌────────────────────────────────────────────────────────┐
│ B I N G O   O B J E C T   F R A M E   (Radius: 24px)   │
│ Border: 1.5px #242A33 (Top highlight: #323B47)         │
│ Background: #13161A (Milled composite substrate)       │
│                                                        │
│  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐                │
│  │ 07 │  │ 14 │  │ 22 │  │ 03 │  │ 19 │  Row 0         │
│  └────┘  └────┘  └────┘  └────┘  └────┘                │
│  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐                │
│  │ 12 │  │ 05 │  │ 18 │  │ 25 │  │ 08 │  Row 1         │
│  └────┘  └────┘  └────┘  └────┘  └────┘                │
│  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐                │
│  │ 02 │  │ 17 │  │ 21 │  │ 11 │  │ 04 │  Row 2         │
│  └────┘  └────┘  └────┘  └────┘  └────┘                │
│  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐                │
│  │ 24 │  │ 09 │  │ 16 │  │ 01 │  │ 15 │  Row 3         │
│  └────┘  └────┘  └────┘  └────┘  └────┘                │
│  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐                │
│  │ 13 │  │ 20 │  │ 10 │  │ 23 │  │ 06 │  Row 4         │
│  └────┘  └────┘  └────┘  └────┘  └────┘                │
└────────────────────────────────────────────────────────┘
```

- **Outer Radius**: `24px` (`tokens.radius.board`).
- **Inner Padding**: `12px`.
- **Cell Spacing (Gap)**: `8px`.
- **Material**: Multi-layered background with subtle top-rim highlight and bottom ambient drop.

---

## 2. The Cell: `BingoCell` (The Interactive Inset Well)

Each cell represents an individual inset well engineered to feel physical under the player's thumb.

### Anatomy & States:
1. **Rest (Uncalled)**:
   - Surface: `#181C22`
   - Inset Rim: `1px solid #242A33`
   - Number: `#8E9AA8`, Tabular Monospace, font size 20pt, bold.
   - Depth: Subtle interior inset sensation.

2. **Touch-Down (Press Compression)**:
   - Scale: `0.94`
   - Offset: `translateY(1.5px)`
   - Border: `#3B82F6` micro-tint
   - Audio: 120ms high-frequency mechanical tick.

3. **Active Caller Target (Drawn Number on Board)**:
   - Border: `1.5px solid #00E5A3`
   - Glow: Inset beacon wash `#00E5A315`
   - Number: `#00E5A3` with crisp high-contrast readability.

4. **Marked (Daubed)**:
   - Physical Daub Stamp: Concentric seal `#16293D` filling the well.
   - Core Indicator: Circular cyan/sapphire pip `#38BDF8`.
   - Number: `#F0F6FC`, visually debossed beneath the stamp.
   - Verified Badge: Inset micro-lock showing authoritative engine confirmation.

5. **Winning Alignment Line**:
   - Surface: Radiant Solar `#261C08`
   - Border: `2px solid #F59E0B`
   - Pip: Golden crown star
   - Number: `#FDE68A`

---

## 3. The Signal: `CallerBeacon` (Spatial Game Signal)

Replaces the generic "Current Number: XX" text card with an unboxed, floating telemetry beacon:

```text
       [ GAME PROGRESS 14 / 25 ]
            ┌─────────────┐
            │             │
            │     17      │   ← 48pt Monospace Tabular
            │             │
            └─────────────┘
          CURRENT CALL BEACON
  [ 04 ]  [ 19 ]  [ 08 ]  [ 22 ]  ← Recency History Ribbon
```

- **Hero Numeral**: 48pt tabular font with tight optical kerning.
- **Progress Gauge**: Precision hairline perimeter indicator.
- **Recency Ribbon**: Horizontal timeline ribbon showing the previous 4 drawn numbers with graduated opacity (`0.8`, `0.6`, `0.4`, `0.2`).

---

## 4. Leaderboard: `EditorialRankView`

Replaces the generic gold/silver/bronze 3-box podium with an editorial high-density ranking table:
- Monospaced numerical rank index (`01`, `02`, `03` ... `99`).
- Player identity with high-contrast typography, win rate percentiles, and match points.
- Delta trend indicator (`▲ +2`, `▼ -1`, `• 0`).
- Pinned player status anchor at the base for immediate personal orientation.

---

## 5. Navigation: `PrecisionDock`

Replaces floating bubbly nav pills with an architectural bottom dock:
- Anchored to bottom safe area.
- 44×44pt guaranteed interactive hit targets.
- 1.75px optical stroke icons with subtle active micro-dot.
- Hairline top edge `#1E232B`.
