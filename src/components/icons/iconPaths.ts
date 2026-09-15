import { IconDefinition, IconName } from './types';

/**
 * MASTER GEOMETRIC DICTIONARY — 24×24 PRIMARY CONSTRUCTION GRID
 * Built strictly according to the reference design language:
 * - 2.0px optical stroke default
 * - Consistent rounded linecaps and linejoins
 * - Soft continuous Bézier transitions
 * - Balanced negative space & optical centering
 */
export const ICON_DEFINITIONS: Record<IconName, IconDefinition> = {
  // ==========================================
  // 1. NAVIGATION
  // ==========================================
  home: {
    family: 'navigation',
    viewBox: '0 0 24 24',
    paths: [
      // Outer house contour with curved roof apex, eaves, and rounded base corners
      {
        d: 'M12 3.6 L3.8 10.5 C3.3 10.9 3 11.5 3 12.2 V18.5 C3 19.9 4.1 21 5.5 21 H18.5 C19.9 21 21 19.9 21 18.5 V12.2 C21 11.5 20.7 10.9 20.2 10.5 L12 3.6 Z',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      // Arched center doorway
      {
        d: 'M9.5 21 V14.5 C9.5 13.1 10.6 12 12 12 C13.4 12 14.5 13.1 14.5 14.5 V21',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    ],
    filledPaths: [
      // Solid house with integrated arched doorway negative aperture (Reference Image 1)
      {
        d: 'M12 3.5 C11.5 3.5 11 3.8 10.7 4.1 L3.5 10.2 C3.2 10.5 3 10.9 3 11.4 V18.5 C3 19.9 4.1 21 5.5 21 H9 V15 C9 13.3 10.3 12 12 12 C13.7 12 15 13.3 15 15 V21 H18.5 C19.9 21 21 19.9 21 18.5 V11.4 C21 10.9 20.8 10.5 20.5 10.2 L13.3 4.1 C13 3.8 12.5 3.5 12 3.5 Z',
      },
    ],
  },

  play: {
    family: 'navigation',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M7.5 4.8 C7.5 3.8 8.6 3.2 9.5 3.8 L19.2 10.4 C20 10.9 20 12.1 19.2 12.6 L9.5 19.2 C8.6 19.8 7.5 19.2 7.5 18.2 Z',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    ],
    filledPaths: [
      {
        d: 'M7.5 4.8 C7.5 3.8 8.6 3.2 9.5 3.8 L19.2 10.4 C20 10.9 20 12.1 19.2 12.6 L9.5 19.2 C8.6 19.8 7.5 19.2 7.5 18.2 Z',
      },
    ],
  },

  leaderboard: {
    family: 'navigation',
    viewBox: '0 0 24 24',
    paths: [
      // Left Rank 2 Bar (Height 9, rounded top)
      {
        d: 'M5 20 V12 C5 11.2 5.7 10.5 6.5 10.5 C7.3 10.5 8 11.2 8 12 V20',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      // Center Rank 1 Bar (Height 15, rounded top)
      {
        d: 'M10.5 20 V6 C10.5 5.2 11.2 4.5 12 4.5 C12.8 4.5 13.5 5.2 13.5 6 V20',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      // Right Rank 3 Bar (Height 6, rounded top)
      {
        d: 'M16 20 V15 C16 14.2 16.7 13.5 17.5 13.5 C18.3 13.5 19 14.2 19 15 V20',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      // Podium Baseline Shelf with rounded terminals
      {
        d: 'M3 20.5 H21',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
    ],
    filledPaths: [
      {
        d: 'M5 20 V12 C5 11.2 5.7 10.5 6.5 10.5 C7.3 10.5 8 11.2 8 12 V20 H5 Z M10.5 20 V6 C10.5 5.2 11.2 4.5 12 4.5 C12.8 4.5 13.5 5.2 13.5 6 V20 H10.5 Z M16 20 V15 C16 14.2 16.7 13.5 17.5 13.5 C18.3 13.5 19 14.2 19 15 V20 H16 Z M3 20.5 H21',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
    ],
  },

  profile: {
    family: 'navigation',
    viewBox: '0 0 24 24',
    circles: [
      {
        cx: 12,
        cy: 7.5,
        r: 4,
        strokeWidth: 2,
      },
    ],
    paths: [
      {
        d: 'M4.5 20.5 C4.5 16.2 7.8 13.5 12 13.5 C16.2 13.5 19.5 16.2 19.5 20.5',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
    ],
    filledPaths: [
      {
        d: 'M12 3.5 C9.8 3.5 8 5.3 8 7.5 C8 9.7 9.8 11.5 12 11.5 C14.2 11.5 16 9.7 16 7.5 C16 5.3 14.2 3.5 12 3.5 Z M4.5 20.5 C4.5 16.2 7.8 13.5 12 13.5 C16.2 13.5 19.5 16.2 19.5 20.5 Z',
      },
    ],
  },

  // ==========================================
  // 2. GAMEPLAY & BRAND IDENTITY
  // ==========================================
  bingo: {
    // ORIGINAL LUXURY 5-POINT MATRIX STAR & EMBLEM
    family: 'gameplay',
    viewBox: '0 0 24 24',
    paths: [
      // 4-lobed continuous organic star-diamond outer shell
      {
        d: 'M12 2.5 C13.5 2.5 14.8 6.5 16 7.8 C17.2 9 21.2 10.3 21.2 12 C21.2 13.7 17.2 15 16 16.2 C14.8 17.5 13.5 21.5 12 21.5 C10.5 21.5 9.2 17.5 8 16.2 C6.8 15 2.8 13.7 2.8 12 C2.8 10.3 6.8 9 8 7.8 C9.2 6.5 10.5 2.5 12 2.5 Z',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      // Central 5x5 matrix nexus alignment dot
      {
        d: 'M12 10.5 A1.5 1.5 0 1 1 12 13.5 A1.5 1.5 0 1 1 12 10.5 Z',
      },
    ],
    filledPaths: [
      {
        d: 'M12 2.5 C13.5 2.5 14.8 6.5 16 7.8 C17.2 9 21.2 10.3 21.2 12 C21.2 13.7 17.2 15 16 16.2 C14.8 17.5 13.5 21.5 12 21.5 C10.5 21.5 9.2 17.5 8 16.2 C6.8 15 2.8 13.7 2.8 12 C2.8 10.3 6.8 9 8 7.8 C9.2 6.5 10.5 2.5 12 2.5 Z',
      },
    ],
  },

  number: {
    family: 'gameplay',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M9 3.5 V20.5 M15 3.5 V20.5 M3.5 9 H20.5 M3.5 15 H20.5',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
    ],
  },

  mark: {
    // Daub stamp with optical seal core
    family: 'gameplay',
    viewBox: '0 0 24 24',
    circles: [
      {
        cx: 12,
        cy: 12,
        r: 9,
        strokeWidth: 2,
      },
    ],
    paths: [
      {
        d: 'M8.5 12 L11 14.5 L15.5 9.5',
        strokeWidth: 2.2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    ],
    filledPaths: [
      {
        d: 'M12 3 A9 9 0 1 1 12 21 A9 9 0 1 1 12 3 Z',
      },
    ],
  },

  unmark: {
    family: 'gameplay',
    viewBox: '0 0 24 24',
    circles: [
      {
        cx: 12,
        cy: 12,
        r: 9,
        strokeWidth: 2,
      },
    ],
    paths: [
      {
        d: 'M8 8 L16 16',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
    ],
  },

  next: {
    family: 'gameplay',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M6 5 L14 12 L6 19 M17 5 V19',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    ],
  },

  previous: {
    family: 'gameplay',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M18 5 L10 12 L18 19 M7 5 V19',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    ],
  },

  shuffle: {
    family: 'gameplay',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M4 7 H8 C9.5 7 10.8 8.1 11.5 9.3 L12.5 11.2 C13.2 12.4 14.5 13.5 16 13.5 H20 M16 10 L20 13.5 L16 17 M4 17 H8 C9.5 17 10.8 15.9 11.5 14.7 L12.5 12.8 C13.2 11.6 14.5 10.5 16 10.5 H20 M16 7 L20 10.5 L16 14',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    ],
  },

  pause: {
    family: 'gameplay',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M8 5.5 V18.5 M16 5.5 V18.5',
        strokeWidth: 3,
        strokeLinecap: 'round',
      },
    ],
  },

  resume: {
    family: 'gameplay',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M12 4 A8 8 0 1 1 5 8.5 M5 4 V9 H10',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    ],
  },

  finish: {
    family: 'gameplay',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M5 3.5 V21.5 M5 4.5 H17.5 C18.8 4.5 19.5 5.5 18.8 6.5 L17.5 8.5 L18.8 10.5 C19.5 11.5 18.8 12.5 17.5 12.5 H5',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    ],
  },

  winner: {
    family: 'gameplay',
    viewBox: '0 0 24 24',
    paths: [
      // Left laurel branch
      {
        d: 'M6 7.5 C4.8 11 5.8 15.5 9 18.2 C10 19 11 19.5 12 20',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
      // Right laurel branch
      {
        d: 'M18 7.5 C19.2 11 18.2 15.5 15 18.2 C14 19 13 19.5 12 20',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
      // Center star crest
      {
        d: 'M12 4 L13 6.8 L16 7.2 L13.8 9.2 L14.5 12 L12 10.5 L9.5 12 L10.2 9.2 L8 7.2 L11 6.8 Z',
        strokeWidth: 1.5,
        strokeLinejoin: 'round',
      },
    ],
  },

  // ==========================================
  // 3. GAME MODES
  // ==========================================
  solo: {
    family: 'modes',
    viewBox: '0 0 24 24',
    paths: [
      // Antenna
      {
        d: 'M12 2 V5 M9.5 2 H14.5',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
      // Rounded robot head
      {
        d: 'M5 9 C5 7.3 6.3 6 8 6 H16 C17.7 6 19 7.3 19 9 V17 C19 18.7 17.7 20 16 20 H8 C6.3 20 5 18.7 5 17 Z',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      // Mouth track
      {
        d: 'M9 16 H15',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
    ],
    circles: [
      { cx: 9, cy: 11.5, r: 1.5, fill: 'currentColor' },
      { cx: 15, cy: 11.5, r: 1.5, fill: 'currentColor' },
    ],
  },

  ranked: {
    // High-energy chamfered lightning bolt
    family: 'modes',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M13 2 L4.5 13 H11.5 L10 22 L19.5 10 H13 Z',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    ],
    filledPaths: [
      {
        d: 'M13 2 L4.5 13 H11.5 L10 22 L19.5 10 H13 Z',
      },
    ],
  },

  multiplayer: {
    family: 'modes',
    viewBox: '0 0 24 24',
    circles: [
      { cx: 9, cy: 8, r: 3.5, strokeWidth: 2 },
    ],
    paths: [
      // Front player torso
      {
        d: 'M2 19.5 C2 16.2 5.1 14 9 14 C12.9 14 16 16.2 16 19.5',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
      // Second player back contour
      {
        d: 'M16 5.5 C17.5 6.2 18.5 7.8 18.5 9.5 C18.5 11.2 17.5 12.8 16 13.5 M19 19.5 C19 17.3 17.5 15.6 15 14.8',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
    ],
  },

  daily: {
    family: 'modes',
    viewBox: '0 0 24 24',
    paths: [
      // Calendar body
      {
        d: 'M4 8 C4 6.3 5.3 5 7 5 H17 C18.7 5 20 6.3 20 8 V18 C20 19.7 18.7 21 17 21 H7 C5.3 21 4 19.7 4 18 Z',
        strokeWidth: 2,
        strokeLinejoin: 'round',
      },
      // Ring hooks & separator
      {
        d: 'M8 2.5 V5.5 M16 2.5 V5.5 M4 10 H20',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
      // Daily calendar star
      {
        d: 'M12 13 L12.6 14.5 L14.2 14.7 L13 15.8 L13.4 17.4 L12 16.5 L10.6 17.4 L11 15.8 L9.8 14.7 L11.4 14.5 Z',
      },
    ],
  },

  private_room: {
    family: 'modes',
    viewBox: '0 0 24 24',
    paths: [
      // Room house silhouette
      {
        d: 'M3 10.5 L12 3.5 L21 10.5 V19 C21 20.1 20.1 21 19 21 H5 C3.9 21 3 20.1 3 19 Z',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      // Arched keyhole doorway
      {
        d: 'M9.5 21 V14 C9.5 12.9 10.6 12 12 12 C13.4 12 14.5 12.9 14.5 14 V21',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
    ],
  },

  join_room: {
    family: 'modes',
    viewBox: '0 0 24 24',
    paths: [
      // Room portal
      {
        d: 'M14 3.5 H6 C4.9 3.5 4 4.4 4 5.5 V18.5 C4 19.6 4.9 20.5 6 20.5 H14',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
      // Entering forward arrow
      {
        d: 'M10 12 H21 M17 8 L21 12 L17 16',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    ],
  },

  create_room: {
    family: 'modes',
    viewBox: '0 0 24 24',
    paths: [
      // Room base chassis
      {
        d: 'M3 10.5 L12 3.5 L21 10.5 V19 C21 20.1 20.1 21 19 21 H5 C3.9 21 3 20.1 3 19 Z',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      // Plus symbol
      {
        d: 'M12 11 V17 M9 14 H15',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
    ],
  },

  // ==========================================
  // 4. PLAYER & PROGRESSION
  // ==========================================
  avatar: {
    family: 'player',
    viewBox: '0 0 24 24',
    circles: [
      { cx: 12, cy: 12, r: 9.5, strokeWidth: 2 },
      { cx: 12, cy: 8.5, r: 3, strokeWidth: 2 },
    ],
    paths: [
      {
        d: 'M6 18.5 C6 15.5 8.7 13.5 12 13.5 C15.3 13.5 18 15.5 18 18.5',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
    ],
  },

  level: {
    family: 'player',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M5 17 L12 12 L19 17 M5 11 L12 6 L19 11',
        strokeWidth: 2.2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    ],
  },

  rank: {
    // Royal 5-pointed star with rounded vertices
    family: 'player',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M12 2.5 L14.8 8.2 L21 9 L16.5 13.4 L17.7 19.5 L12 16.5 L6.3 19.5 L7.5 13.4 L3 9 L9.2 8.2 Z',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    ],
    filledPaths: [
      {
        d: 'M12 2.5 L14.8 8.2 L21 9 L16.5 13.4 L17.7 19.5 L12 16.5 L6.3 19.5 L7.5 13.4 L3 9 L9.2 8.2 Z',
      },
    ],
  },

  trophy: {
    family: 'player',
    viewBox: '0 0 24 24',
    paths: [
      // Cup body with flared rim
      {
        d: 'M6 4 H18 V9 C18 12.3 15.3 15 12 15 C8.7 15 6 12.3 6 9 Z',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      // Left handle
      {
        d: 'M6 6 H4 C2.9 6 2 6.9 2 8 C2 10.2 3.8 12 6 12',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
      // Right handle
      {
        d: 'M18 6 H20 C21.1 6 22 6.9 22 8 C22 10.2 20.2 12 18 12',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
      // Stem and pedestal
      {
        d: 'M12 15 V19 M7.5 21 H16.5',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
    ],
  },

  streak: {
    // Fluid organic twin-flame
    family: 'player',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M12 2.5 C10.2 5 7.5 7.8 7.5 11.5 C7.5 14.8 9.5 17.5 12 17.5 C14.5 17.5 16.5 14.8 16.5 11.5 C16.5 7.8 13.8 5 12 2.5 Z',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      // Inner flame core
      {
        d: 'M12 8 C11.2 9.5 10 11 10 12.8 C10 14.2 10.9 15 12 15 C13.1 15 14 14.2 14 12.8 C14 11 12.8 9.5 12 8 Z',
      },
    ],
    filledPaths: [
      {
        d: 'M12 2.5 C10.2 5 7.5 7.8 7.5 11.5 C7.5 14.8 9.5 17.5 12 17.5 C14.5 17.5 16.5 14.8 16.5 11.5 C16.5 7.8 13.8 5 12 2.5 Z',
      },
    ],
  },

  achievement: {
    family: 'player',
    viewBox: '0 0 24 24',
    circles: [
      { cx: 12, cy: 9, r: 5.5, strokeWidth: 2 },
    ],
    paths: [
      // Ribbon banners
      {
        d: 'M8.5 13.5 L6 21.5 L12 18.5 L18 21.5 L15.5 13.5',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    ],
  },

  history: {
    family: 'player',
    viewBox: '0 0 24 24',
    circles: [
      { cx: 12, cy: 12, r: 9, strokeWidth: 2 },
    ],
    paths: [
      {
        d: 'M12 7 V12 L15.5 14.5',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    ],
  },

  statistics: {
    family: 'player',
    viewBox: '0 0 24 24',
    paths: [
      // 3 bars
      {
        d: 'M6 20 V14 M12 20 V10 M18 20 V6',
        strokeWidth: 2.5,
        strokeLinecap: 'round',
      },
      // Trend wave line
      {
        d: 'M3 12 L8 8 L13 11 L21 3',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    ],
  },

  // ==========================================
  // 5. UTILITY & CONTROLS
  // ==========================================
  search: {
    family: 'utility',
    viewBox: '0 0 24 24',
    circles: [
      { cx: 10.5, cy: 10.5, r: 6.5, strokeWidth: 2 },
    ],
    paths: [
      {
        d: 'M15.5 15.5 L20.5 20.5',
        strokeWidth: 2.2,
        strokeLinecap: 'round',
      },
    ],
  },

  settings: {
    family: 'utility',
    viewBox: '0 0 24 24',
    circles: [
      { cx: 12, cy: 12, r: 3.2, strokeWidth: 2 },
    ],
    paths: [
      {
        d: 'M19.4 15 A1.65 1.65 0 0 0 19.7 16.8 L19.8 16.9 A2 2 0 0 1 17 19.7 L16.9 19.6 A1.65 1.65 0 0 0 15 19.4 A1.65 1.65 0 0 0 14 20.9 V21 A2 2 0 0 1 10 21 V20.9 A1.65 1.65 0 0 0 9 19.4 A1.65 1.65 0 0 0 7.2 19.7 L7.1 19.8 A2 2 0 0 1 4.3 17 L4.4 16.9 A1.65 1.65 0 0 0 4.6 15 A1.65 1.65 0 0 0 3.1 14 H3 A2 2 0 0 1 3 10 H3.1 A1.65 1.65 0 0 0 4.6 9 A1.65 1.65 0 0 0 4.3 7.2 L4.2 7.1 A2 2 0 0 1 7 4.3 L7.1 4.4 A1.65 1.65 0 0 0 9 4.6 A1.65 1.65 0 0 0 10 3.1 V3 A2 2 0 0 1 14 3 V3.1 A1.65 1.65 0 0 0 15 4.6 A1.65 1.65 0 0 0 16.8 4.3 L16.9 4.2 A2 2 0 0 1 19.7 7 L19.6 7.1 A1.65 1.65 0 0 0 19.4 9 A1.65 1.65 0 0 0 20.9 10 H21 A2 2 0 0 1 21 14 H20.9 A1.65 1.65 0 0 0 19.4 15 Z',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    ],
  },

  notifications: {
    family: 'utility',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M18 16 H6 C6.8 15.2 7.5 14 7.5 12 V9 C7.5 6.5 9.5 4.5 12 4.5 C14.5 4.5 16.5 6.5 16.5 9 V12 C16.5 14 17.2 15.2 18 16 Z',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      {
        d: 'M10 19 C10 20.1 10.9 21 12 21 C13.1 21 14 20.1 14 19',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
      {
        d: 'M12 2.5 V4.5',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
    ],
  },

  sound: {
    family: 'utility',
    viewBox: '0 0 24 24',
    paths: [
      // Crisp Speaker cone & horn
      {
        d: 'M11 5 L6 9 H3 C2.4 9 2 9.4 2 10 V14 C2 14.6 2.4 15 3 15 H6 L11 19 V5 Z',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      // Inner sound wave arc
      {
        d: 'M15.5 8.5 C16.8 9.8 16.8 14.2 15.5 15.5',
        strokeWidth: 2.2,
        strokeLinecap: 'round',
      },
      // Outer sound wave arc
      {
        d: 'M19 6 C21.5 8.5 21.5 15.5 19 18',
        strokeWidth: 2.2,
        strokeLinecap: 'round',
      },
    ],
  },

  mute: {
    family: 'utility',
    viewBox: '0 0 24 24',
    paths: [
      // Crisp Speaker cone & horn
      {
        d: 'M11 5 L6 9 H3 C2.4 9 2 9.4 2 10 V14 C2 14.6 2.4 15 3 15 H6 L11 19 V5 Z',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      // Mute cross diagonal
      {
        d: 'M22 9 L16 15 M16 9 L22 15',
        strokeWidth: 2.2,
        strokeLinecap: 'round',
      },
    ],
  },

  vibration: {
    family: 'utility',
    viewBox: '0 0 24 24',
    paths: [
      // Phone silhouette
      {
        d: 'M7.5 4 C7.5 2.9 8.4 2 9.5 2 H14.5 C15.6 2 16.5 2.9 16.5 4 V20 C16.5 21.1 15.6 22 14.5 22 H9.5 C8.4 22 7.5 21.1 7.5 20 Z',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      // Left and right pulse waves
      {
        d: 'M3.5 8 Q1.8 12 3.5 16 M20.5 8 Q22.2 12 20.5 16',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
    ],
  },

  speech: {
    family: 'utility',
    viewBox: '0 0 24 24',
    paths: [
      // Mic capsule
      {
        d: 'M9 5 C9 3.3 10.3 2 12 2 C13.7 2 15 3.3 15 5 V11 C15 12.7 13.7 14 12 14 C10.3 14 9 12.7 9 11 Z',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      // Cradle
      {
        d: 'M5.5 10 C5.5 13.6 8.4 16.5 12 16.5 C15.6 16.5 18.5 13.6 18.5 10',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
      // Stem & base
      {
        d: 'M12 16.5 V21 M8.5 21 H15.5',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
    ],
  },

  information: {
    family: 'utility',
    viewBox: '0 0 24 24',
    circles: [
      { cx: 12, cy: 12, r: 9, strokeWidth: 2 },
    ],
    paths: [
      {
        d: 'M12 8 V8.5 M12 11.5 V16',
        strokeWidth: 2.2,
        strokeLinecap: 'round',
      },
    ],
  },

  help: {
    family: 'utility',
    viewBox: '0 0 24 24',
    circles: [
      { cx: 12, cy: 12, r: 9, strokeWidth: 2 },
    ],
    paths: [
      {
        d: 'M9.5 9 C9.5 7.6 10.6 6.5 12 6.5 C13.4 6.5 14.5 7.6 14.5 9 C14.5 10.8 12 11.2 12 13.2 M12 16 V16.5',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
    ],
  },

  close: {
    family: 'utility',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M18 6 L6 18 M6 6 L18 18',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
    ],
  },

  back: {
    family: 'utility',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M15 19 L8 12 L15 5',
        strokeWidth: 2.2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    ],
  },

  chevron: {
    family: 'utility',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M15 19 L8 12 L15 5',
        strokeWidth: 2.2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    ],
  },

  more: {
    family: 'utility',
    viewBox: '0 0 24 24',
    circles: [
      { cx: 6, cy: 12, r: 1.8, fill: 'currentColor' },
      { cx: 12, cy: 12, r: 1.8, fill: 'currentColor' },
      { cx: 18, cy: 12, r: 1.8, fill: 'currentColor' },
    ],
  },

  copy: {
    family: 'utility',
    viewBox: '0 0 24 24',
    paths: [
      // Front card
      {
        d: 'M9 8 H18 C19.1 8 20 8.9 20 10 V19 C20 20.1 19.1 21 18 21 H9 C7.9 21 7 20.1 7 19 V10 C7 8.9 7.9 8 9 8 Z',
        strokeWidth: 2,
        strokeLinejoin: 'round',
      },
      // Back card
      {
        d: 'M5 16 H4 C2.9 16 2 15.1 2 14 V4 C2 2.9 2.9 2 4 2 H14 C15.1 2 16 2.9 16 4 V5',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
    ],
  },

  share: {
    family: 'utility',
    viewBox: '0 0 24 24',
    circles: [
      { cx: 18, cy: 5, r: 2.8, strokeWidth: 2 },
      { cx: 6, cy: 12, r: 2.8, strokeWidth: 2 },
      { cx: 18, cy: 19, r: 2.8, strokeWidth: 2 },
    ],
    paths: [
      {
        d: 'M8.6 13.5 L15.4 17.5 M15.4 6.5 L8.6 10.5',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
    ],
  },

  // ==========================================
  // 6. STATE & FEEDBACK
  // ==========================================
  success: {
    family: 'state',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M4.5 12.5 L9.5 17.5 L19.5 6.5',
        strokeWidth: 2.5,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    ],
  },

  warning: {
    family: 'state',
    viewBox: '0 0 24 24',
    paths: [
      // Soft rounded triangle
      {
        d: 'M10.3 3.8 C11.1 2.5 12.9 2.5 13.7 3.8 L22.2 18.2 C23 19.6 22 21.5 20.4 21.5 H3.6 C2 21.5 1 19.6 1.8 18.2 Z',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      // Exclamation pip
      {
        d: 'M12 9 V13.5 M12 17.2 V17.5',
        strokeWidth: 2.2,
        strokeLinecap: 'round',
      },
    ],
  },

  error: {
    family: 'state',
    viewBox: '0 0 24 24',
    circles: [
      { cx: 12, cy: 12, r: 9.5, strokeWidth: 2 },
    ],
    paths: [
      {
        d: 'M15 9 L9 15 M9 9 L15 15',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
    ],
  },

  locked: {
    family: 'state',
    viewBox: '0 0 24 24',
    paths: [
      // Padlock shackle in locked posture
      {
        d: 'M6.5 10 V7 C6.5 3.9 8.9 1.5 12 1.5 C15.1 1.5 17.5 3.9 17.5 7 V10',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
      // Lock body
      {
        d: 'M5 10 H19 C20.1 10 21 10.9 21 12 V20 C21 21.1 20.1 22 19 22 H5 C3.9 22 3 21.1 3 20 V12 C3 10.9 3.9 10 5 10 Z',
        strokeWidth: 2,
        strokeLinejoin: 'round',
      },
      // Keyhole
      {
        d: 'M12 14.5 V17.5',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
    ],
    circles: [
      { cx: 12, cy: 14.5, r: 1.2, fill: 'currentColor' },
    ],
  },

  unlocked: {
    family: 'state',
    viewBox: '0 0 24 24',
    paths: [
      // Shackle open posture
      {
        d: 'M6.5 10 V7 C6.5 3.9 8.9 1.5 12 1.5 C14.9 1.5 17.3 3.8 17.5 6.6',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
      // Lock body
      {
        d: 'M5 10 H19 C20.1 10 21 10.9 21 12 V20 C21 21.1 20.1 22 19 22 H5 C3.9 22 3 21.1 3 20 V12 C3 10.9 3.9 10 5 10 Z',
        strokeWidth: 2,
        strokeLinejoin: 'round',
      },
    ],
    circles: [
      { cx: 12, cy: 15, r: 1.2, fill: 'currentColor' },
    ],
  },

  loading: {
    family: 'state',
    viewBox: '0 0 24 24',
    paths: [
      // Smooth 270-degree spinner arc
      {
        d: 'M12 3 A9 9 0 1 1 3 12',
        strokeWidth: 2.5,
        strokeLinecap: 'round',
      },
    ],
  },

  refresh: {
    family: 'state',
    viewBox: '0 0 24 24',
    paths: [
      // Dual clockwise arrows
      {
        d: 'M21.5 4.5 V9.5 H16.5 M2.5 19.5 V14.5 H7.5',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      {
        d: 'M4.5 9 A9 9 0 0 1 19.5 7 L21.5 9.5 M2.5 14.5 L4.5 17 A9 9 0 0 0 19.5 15',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
    ],
  },

  sun: {
    family: 'utility',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M12 2 V4 M12 20 V22 M4.93 4.93 L6.34 6.34 M17.66 17.66 L19.07 19.07 M2 12 H4 M20 12 H22 M4.93 19.07 L6.34 17.66 M17.66 6.34 L19.07 4.93',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
    ],
    circles: [
      { cx: 12, cy: 12, r: 4.5, strokeWidth: 2 },
    ],
    filledPaths: [
      {
        d: 'M12 2 V4 M12 20 V22 M4.93 4.93 L6.34 6.34 M17.66 17.66 L19.07 19.07 M2 12 H4 M20 12 H22 M4.93 19.07 L6.34 17.66 M17.66 6.34 L19.07 4.93',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
    ],
  },

  moon: {
    family: 'utility',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M21 12.79 A9 9 0 1 1 11.21 3 A7 7 0 0 0 21 12.79 Z',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    ],
    filledPaths: [
      {
        d: 'M21 12.79 A9 9 0 1 1 11.21 3 A7 7 0 0 0 21 12.79 Z',
      },
    ],
  },

  heart: {
    family: 'utility',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M12 21.35 L10.55 20.03 C5.4 15.36 2 12.28 2 8.5 C2 5.42 4.42 3 7.5 3 C9.24 3 10.91 3.81 12 5.09 C13.09 3.81 14.76 3 16.5 3 C19.58 3 22 5.42 22 8.5 C22 12.28 18.6 15.36 13.45 20.04 L12 21.35 Z',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    ],
    filledPaths: [
      {
        d: 'M12 21.35 L10.55 20.03 C5.4 15.36 2 12.28 2 8.5 C2 5.42 4.42 3 7.5 3 C9.24 3 10.91 3.81 12 5.09 C13.09 3.81 14.76 3 16.5 3 C19.58 3 22 5.42 22 8.5 C22 12.28 18.6 15.36 13.45 20.04 L12 21.35 Z',
      },
    ],
  },

  ticket: {
    family: 'gameplay',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M3 7 C3 5.9 3.9 5 5 5 H19 C20.1 5 21 5.9 21 7 C19.9 7 19 7.9 19 9 C19 10.1 19.9 11 21 11 C21 12.1 21 13 21 13 C19.9 13 19 13.9 19 15 C19 16.1 19.9 17 21 17 C21 18.1 20.1 19 19 19 H5 C3.9 19 3 18.1 3 17 C4.1 17 5 16.1 5 15 C5 13.9 4.1 13 3 13 V11 C4.1 11 5 10.1 5 9 C5 7.9 4.1 7 3 7 Z',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      {
        d: 'M12 8 V16',
        strokeWidth: 1.5,
        strokeLinecap: 'round',
      },
    ],
    filledPaths: [
      {
        d: 'M3 7 C3 5.9 3.9 5 5 5 H19 C20.1 5 21 5.9 21 7 C19.9 7 19 7.9 19 9 C19 10.1 19.9 11 21 11 V13 C19.9 13 19 13.9 19 15 C19 16.1 19.9 17 21 17 C21 18.1 20.1 19 19 19 H5 C3.9 19 3 18.1 3 17 C4.1 17 5 16.1 5 15 C5 13.9 4.1 13 3 13 V11 C4.1 11 5 10.1 5 9 C5 7.9 4.1 7 3 7 Z',
      },
    ],
  },

  coin_stack: {
    family: 'gameplay',
    viewBox: '0 0 24 24',
    paths: [
      // Top coin ellipse
      {
        d: 'M12 3 C16.4 3 20 4.1 20 5.5 C20 6.9 16.4 8 12 8 C7.6 8 4 6.9 4 5.5 C4 4.1 7.6 3 12 3 Z',
        strokeWidth: 1.8,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      // Middle coin curve
      {
        d: 'M4 9.5 C4 10.9 7.6 12 12 12 C16.4 12 20 10.9 20 9.5',
        strokeWidth: 1.8,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      // Third coin curve
      {
        d: 'M4 13.5 C4 14.9 7.6 16 12 16 C16.4 16 20 14.9 20 13.5',
        strokeWidth: 1.8,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      // Base coin curve
      {
        d: 'M4 17.5 C4 18.9 7.6 20 12 20 C16.4 20 20 18.9 20 17.5',
        strokeWidth: 1.8,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      // Left and right pillars
      {
        d: 'M4 5.5 V17.5 M20 5.5 V17.5',
        strokeWidth: 1.8,
        strokeLinecap: 'round',
      },
    ],
    filledPaths: [
      {
        d: 'M12 3 C16.4 3 20 4.1 20 5.5 V17.5 C20 18.9 16.4 20 12 20 C7.6 20 4 18.9 4 17.5 V5.5 C4 4.1 7.6 3 12 3 Z',
      },
    ],
  },

  gemstone: {
    family: 'gameplay',
    viewBox: '0 0 24 24',
    paths: [
      // Outer perimeter
      {
        d: 'M6 3 H18 L22 9 L12 21 L2 9 L6 3 Z',
        strokeWidth: 1.8,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      // Inner facet girdle
      {
        d: 'M2 9 H22',
        strokeWidth: 1.6,
        strokeLinecap: 'round',
      },
      // Table to girdle facets
      {
        d: 'M6 3 L9 9 L12 21 M18 3 L15 9 L12 21 M9 9 L12 3 L15 9',
        strokeWidth: 1.5,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    ],
    filledPaths: [
      {
        d: 'M6 3 H18 L22 9 L12 21 L2 9 L6 3 Z',
      },
    ],
  },

  lightning: {
    family: 'gameplay',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M13 2 L4 13 H11 L9 22 L20 10 H13 L15 2 Z',
        strokeWidth: 1.8,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    ],
    filledPaths: [
      {
        d: 'M13 2 L4 13 H11 L9 22 L20 10 H13 L15 2 Z',
      },
    ],
  },

  daub_star: {
    family: 'gameplay',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M12 2 L14.4 7.6 L20.5 8.2 L15.8 12.3 L17.2 18.2 L12 15.1 L6.8 18.2 L8.2 12.3 L3.5 8.2 L9.6 7.6 Z',
        strokeWidth: 1.8,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    ],
    filledPaths: [
      {
        d: 'M12 2 L14.4 7.6 L20.5 8.2 L15.8 12.3 L17.2 18.2 L12 15.1 L6.8 18.2 L8.2 12.3 L3.5 8.2 L9.6 7.6 Z',
      },
    ],
  },

  wifi_off: {
    family: 'state',
    viewBox: '0 0 24 24',
    paths: [
      // Diagonal cancel slash
      {
        d: 'M2 2 L22 22',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
      // Waves broken by slash
      {
        d: 'M8.5 16.5 A4 4 0 0 1 12 15 A4 4 0 0 1 15.5 16.5',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
      {
        d: 'M5 12.5 A9 9 0 0 1 12 10 A9 9 0 0 1 17 11.5',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
      {
        d: 'M1.5 8.5 A14 14 0 0 1 12 5 A14 14 0 0 1 20 7.5',
        strokeWidth: 2,
        strokeLinecap: 'round',
      },
      {
        d: 'M12 20 H12.01',
        strokeWidth: 2.5,
        strokeLinecap: 'round',
      },
    ],
  },

  target: {
    family: 'gameplay',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M12 3 A9 9 0 1 0 21 12 A9 9 0 0 0 12 3 Z',
        strokeWidth: 1.8,
        strokeLinecap: 'round',
      },
      {
        d: 'M12 8 A4 4 0 1 0 16 12 A4 4 0 0 0 12 8 Z',
        strokeWidth: 1.8,
        strokeLinecap: 'round',
      },
      {
        d: 'M12 2 V5 M12 19 V22 M2 12 H5 M19 12 H22',
        strokeWidth: 1.8,
        strokeLinecap: 'round',
      },
    ],
    filledPaths: [
      {
        d: 'M12 2 C6.5 2 2 6.5 2 12 C2 17.5 6.5 22 12 22 C17.5 22 22 17.5 22 12 C22 6.5 17.5 2 12 2 Z M12 16 C9.8 16 8 14.2 8 12 C8 9.8 9.8 8 12 8 C14.2 8 16 9.8 16 12 C16 14.2 14.2 16 12 16 Z',
      },
    ],
  },

  shield: {
    family: 'utility',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M12 2 L20 5.5 V11 C20 16.5 16.5 21 12 22 C7.5 21 4 16.5 4 11 V5.5 Z',
        strokeWidth: 1.8,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      {
        d: 'M12 7 V16 M9 11 H15',
        strokeWidth: 1.5,
        strokeLinecap: 'round',
      },
    ],
    filledPaths: [
      {
        d: 'M12 2 L20 5.5 V11 C20 16.5 16.5 21 12 22 C7.5 21 4 16.5 4 11 V5.5 Z',
      },
    ],
  },

  fire: {
    family: 'gameplay',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M12 22 C16.5 22 19 18 19 13.5 C19 9 14.5 5 13.5 2 C12 6 9 8 7 11 C5 14 5 17 6.5 19.5 C8 21.5 10 22 12 22 Z',
        strokeWidth: 1.8,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      {
        d: 'M12 22 C14 22 15 20 15 18 C15 15.5 13 14 12 12 C11 14 9.5 15.5 9.5 18 C9.5 20 10.5 22 12 22 Z',
        strokeWidth: 1.5,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    ],
    filledPaths: [
      {
        d: 'M12 22 C16.5 22 19 18 19 13.5 C19 9 14.5 5 13.5 2 C12 6 9 8 7 11 C5 14 5 17 6.5 19.5 C8 21.5 10 22 12 22 Z',
      },
    ],
  },

  sparkles: {
    family: 'gameplay',
    viewBox: '0 0 24 24',
    paths: [
      // Primary 4-point star
      {
        d: 'M12 3 C12 7.5 8.5 11 4 11 C8.5 11 12 14.5 12 19 C12 14.5 15.5 11 20 11 C15.5 11 12 7.5 12 3 Z',
        strokeWidth: 1.8,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      // Small offset star
      {
        d: 'M19 3 C19 4.8 17.8 6 16 6 C17.8 6 19 7.2 19 9 C19 7.2 20.2 6 22 6 C20.2 6 19 4.8 19 3 Z',
        strokeWidth: 1.5,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    ],
    filledPaths: [
      {
        d: 'M12 3 C12 7.5 8.5 11 4 11 C8.5 11 12 14.5 12 19 C12 14.5 15.5 11 20 11 C15.5 11 12 7.5 12 3 Z M19 3 C19 4.8 17.8 6 16 6 C17.8 6 19 7.2 19 9 C19 7.2 20.2 6 22 6 C20.2 6 19 4.8 19 3 Z',
      },
    ],
  },
};
