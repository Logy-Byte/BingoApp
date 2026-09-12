# MASTER DESIGN & ENGINEERING RESEARCH
**Document Version:** 1.0.0  
**Context:** Apple HIG 2026 + Emil Kowalski Interaction Craft + React Native Performance + OWASP MASVS  
**Role:** Principal Product Design & Mobile Engineering Lead  

---

## 1. Apple Human Interface Guidelines (HIG) Synthesis

### 1.1 Navigation & Architecture
- **Rule**: Bottom navigation represents top-level peer destinations, not contextual actions.
- **Application**: The app uses exactly three peer destinations: `PLAY`, `LEADERBOARD`, `PROFILE`. 
- **Tab Transitions**: Switching between tabs must feel immediate and native. No lateral page-slide transitions between top-level destinations (as confirmed by both HIG and Emil Kowalski's guidelines).

### 1.2 Touch Ergonomics & Interaction Regions
- **Rule**: Every interactive region must maintain an effective hit target of at least **44×44pt** on iOS (and 48×48dp on Android).
- **Application**: Small visual elements (e.g., close icons, mute toggles, sub-navigation tabs) must use transparent hit-slop or explicit 44pt container sizing so users never suffer tap misses.

### 1.3 Typography Hierarchy & Dynamic Type
- **Rule**: Content legibility dominates. Avoid display fonts for standard copy; support system font scaling cleanly without truncation or clipping.
- **Hierarchy**:
  - Display: Number caller readout (40pt, tabular figures).
  - Large Title / Title: Screen headers (20–24pt, semibold/bold).
  - Subhead / Body: Context labels, player info (14–16pt, regular/medium).
  - Footnote / Caption: Metadata, time elapsed, room codes (11–13pt, medium).

### 1.4 Materials & Spatial Surfaces
- **Rule**: Differentiate functional chrome from content surfaces. Avoid universal glassmorphism or blur indiscriminately applied across every card.
- **Application**:
  - **Content Surface**: Flat, deep obsidian `#101214` to minimize battery draw and ocular fatigue.
  - **Functional Chrome**: Lightly separated bottom bar and top header `#17191C` with subtle 1px hairline border.
  - **Game Surface**: Elevated tactile board container `#141618` with structured cell contrast.
  - **Elevated Transient Surfaces**: Modals and sheets (`#1D2023`) with restrained elevation.

### 1.5 Feedback & Causal Relationships
- **Rule**: Input must produce an immediate, causal response. Visual feedback cannot rely solely on color; it must combine geometry, contrast, and subtle physical scale.

---

## 2. Emil Kowalski Design Engineering Discipline

### 2.1 Restraint as a Core Philosophy
- **Rule**: Motion must explain state, clarify spatial relationships, or acknowledge critical user input. Never animate because an animation tool is available.
- **Rejection criteria**: Delete looping ambient animations, pulsing icons, per-frame list re-renders, and slow cosmetic transitions.

### 2.2 Micro-Interactions & Input Latency
- **Rule**: Touch feedback must happen at the native UI thread level immediately on touch-down (scale: `0.97`–`0.98`), with zero artificial delay before state resolution.
- **Transitions**:
  - Micro-acknowledgement: 100–140ms ease-out.
  - Sheet/Modal reveal: 180–240ms with physical damping.
  - Tab switch: Instantaneous visual swap.

### 2.3 Reduced Motion Standard
- **Rule**: For users with `prefers-reduced-motion` enabled, strip all spatial translations, bounces, and scales; retain clean opacity fades and instant state flips.

---

## 3. React Native & Expo Performance Architecture

### 3.1 UI Runtime & Thread Segregation
- **Rule**: Frame-by-frame animations must not run on the React JavaScript thread via `setState`.
- **Lists & Virtualization**: Maintain stable component identity and keys for FlatList items; avoid creating inline lambdas in render paths.

### 3.2 Asset & Memory Discipline
- **Rule**: Lightweight vector/SVG assets rendered cleanly; no multi-megabyte uncompressed textures or unnecessary native bridge calls.

---

## 4. Mobile Security Baseline (OWASP MASVS)

### 4.1 MASVS-STORAGE & PRIVACY
- Sensitive user tokens, player progression, and session states must be validated and sanitized before local caching; no private keys or master secrets hardcoded into the client bundle.

### 4.2 MASVS-AUTH & NETWORK
- Authoritative room state, score calculation, and win claims must be verified by validation engines (e.g. `AntiCheatValidator`), preventing client-side spoofing of drawn numbers.

### 4.3 MASVS-RESILIENCE & RECOVERY
- Deterministic state restoration when the app is interrupted or backgrounded.
