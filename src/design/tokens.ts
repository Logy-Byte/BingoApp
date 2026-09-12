/**
 * Reference-Driven Design Tokens: "THE BINGO OBJECT & THE FLOATING DOCK"
 * Directly extracted from the 4 provided reference images:
 * - Ref 1: Minimalist luxury product contrast, generous corner radii, subtle borders.
 * - Ref 2: Floating island header, inverted high-contrast timeline ribbon badge.
 * - Ref 3: Floating dark console dock with illuminated white active pill, two-tone gradient progress, podium hierarchy.
 * - Ref 4: 3-metric KPI row, high-contrast actions, tactile card boundaries.
 */

export { REFERENCE_PALETTE, LIGHT_THEME, DARK_THEME, useTheme, ThemeProvider } from './theme';
export type { ThemeMode, ThemeColors } from './theme';

export const COLORS = {
  // Reference 3 Exact Palette
  lunarShadow: '#282828',     // Primary Color
  cleanWhite: '#FFFFFF',      // BG Color 1
  grayWhisper: '#F7F7F7',     // BG Color 2
  gentleOlive: '#CBD77E',     // Accent Color 1
  winterHazel: '#E6CA9A',     // Accent Color 2

  // Ambient Game Environment & Base Planes
  bgDark: '#16181B',          // Deep luxury backdrop
  tableFelt: '#1C1F24',       // Table staging plane
  surfaceDeep: '#23262B',     // Recessed board well & modal base
  surfaceRaised: '#282828',   // Lunar Shadow elevated card surface
  surfaceHighlight: '#32373F',// Bevel light catching edge

  // Metallic & Architectural Rim Edges
  borderSubtle: '#2E333C',    // Hairline separation
  borderStrong: '#3E4552',    // Frame edges
  borderGold: '#E6CA9A',      // Winter Hazel highlight

  // Reference 3: Signature Floating Console Dock
  floatingDockBg: '#282828',     // Lunar Shadow capsule dock
  floatingDockBorder: '#383838', // Refined dock border
  activeTabBg: '#FFFFFF',        // High-contrast clean white pill capsule
  activeTabText: '#282828',      // Lunar Shadow dark text on active pill
  activeTabIcon: '#282828',      // Lunar Shadow dark icon on active pill
  inactiveTabIcon: '#8E94A0',    // Muted slate icon on inactive tab

  // Reference 2: Timeline Ribbon & Active Indicator
  timelineBg: '#111622',         // Dark ribbon container
  timelineBorder: '#232C3E',     // Hairline border
  timelineActiveBg: '#FFFFFF',   // Inverted circular white badge for active call
  timelineActiveText: '#0B0E14', // High-contrast numeral

  // Reference 4: 3-Metric KPI Shelf
  kpiCardBg: '#161E2D',
  kpiCardBorder: '#222B3F',

  // Reference 3: Two-Tone Energy Gradients & Progress
  gradientSunset: '#F97316',     // Coral sunset
  gradientMint: '#10B981',       // Radiant mint
  progressTrack: '#1C2538',

  // Reference 3: Podium & Ranking Accents
  podiumGold: '#F59E0B',
  podiumSilver: '#94A3B8',
  podiumBronze: '#B45309',
  starRatingBg: 'rgba(245, 158, 11, 0.15)',
  starRatingText: '#F59E0B',

  // Primary Action & Play Energy (Radiant Emerald)
  playEmerald: '#10B981',        // Primary match trigger & ready indicators
  playEmeraldPressed: '#059669',
  playEmeraldGlow: 'rgba(16, 185, 129, 0.25)',
  playEmeraldSubtle: 'rgba(16, 185, 129, 0.12)',

  // Crown Victory & Alignment Vector (Solar Gold)
  goldPrimary: '#F59E0B',       // Winning line illumination & trophy ranks
  goldDeep: '#78350F',          // Shadowed bevel of gold elements
  goldLight: '#FDE68A',         // Specular glint on gold numerals
  goldGlow: 'rgba(245, 158, 11, 0.28)',
  goldBg: 'rgba(245, 158, 11, 0.12)',

  // Authentic Stamped Daub Seal (Deep Royal Sapphire & Pip)
  daubWell: '#142542',          // Pressed stamped cell background
  daubBorder: '#3B82F6',        // Crisp blue lacquer boundary
  daubPip: '#60A5FA',           // Central optical wax seal pip
  daubGlow: 'rgba(59, 130, 246, 0.25)',

  // Broadcast Caller Ball (Dimensionally lit sphere colors - Ref 1 & 2)
  ballIvory: '#F8FAFC',         // Specular crown of drawn ball
  ballBody: '#E2E8F0',
  ballShadow: '#94A3B8',

  // Semantic Game Feedback
  dangerRed: '#EF4444',
  dangerRedBg: 'rgba(239, 68, 68, 0.12)',
  warningAmber: '#F59E0B',
  successGreen: '#10B981',
  infoBlue: '#38BDF8',

  // Natural Readable Typography (Never harsh, high game contrast)
  textPrimary: '#F8FAFC',       // Crisp readable white-gold
  textSecondary: '#94A3B8',     // Soft silver tone
  textMuted: '#64748B',         // Subordinate game rules & details
  textGold: '#F59E0B',          // Trophy, high score, and rank text
  textEmerald: '#34D399',       // Active ready & positive status
  textDark: '#0B0E14',          // Deep dark ink on bright button surfaces

  // Physical 5x5 Board Material
  boardSubstrate: '#121724',    // Solid milled tray base
  boardRim: '#27324A',          // Metallic chassis rim
  boardRimHighlight: '#3E4E73',  // Specular light along top perimeter

  // 5x5 Inset Number Well States
  cellDefaultBg: '#182030',     // Uncalled dimensional well
  cellDefaultBorder: '#232D42',
  cellCalledBg: 'rgba(16, 185, 129, 0.14)',
  cellCalledBorder: '#10B981',
  cellMarkedBg: '#13233E',      // Daubed well
  cellMarkedBorder: '#3B82F6',
  cellWinningBg: '#2A1F0C',     // Winning line crown well
  cellWinningBorder: '#F59E0B',
  cellFreeBg: '#1B2438',
  cellFreeBorder: '#10B981',

  // Aliases for backwards compatibility with existing domain calls
  signalMint: '#10B981',
  signalMintGlow: 'rgba(16, 185, 129, 0.20)',
  solarAmber: '#F59E0B',
  solarAmberGlow: 'rgba(245, 158, 11, 0.28)',
  primaryAmber: '#10B981',
  primaryAmberStrong: '#10B981',
  primaryAmberHighlight: '#34D399',
  primaryAmberPressed: '#059669',
  primaryAmberGlow: 'rgba(16, 185, 129, 0.20)',
  boardSurface: '#121724',
};

export const SURFACES = {
  base: '#0B0E14',          // Deep luxury charcoal backdrop
  deep: '#111620',          // Floating dock substrate, modal base, timeline container
  raised: '#161E2D',        // Elevated cards, KPI counter shelf, mode cards, list rows
  highlight: '#222B3F',     // Bevel boundary, focused card borders
  active: '#FFFFFF',        // Illuminated white active capsule
  board: '#121724',         // Milled 5x5 Board tray chassis
};

export const TYPOGRAPHY = {
  brandFamily:
    "'Poppins', 'Sora', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontFamily:
    "'Sora', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  // Monospaced tabular numerals for game numbers and timers
  monoFamily:
    "'Sora', 'Menlo', 'JetBrains Mono', monospace",
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    heavy: '800' as const,
    black: '900' as const,
  },
  sizes: {
    heroNumeral: 40, // Broadcast caller ball numeral
    display: 28,     // Victory verdict & season announcement
    screenTitle: 20, // Screen identity
    stageHeader: 16, // Section headers & modal titles
    actionLabel: 14, // Main button text
    body: 12,        // Rules & descriptions
    caption: 11,     // Subtitle & helper
    micro: 10,       // Pill chips & level markers
  },
};

export const RADIUS = {
  micro: 4,        // Small tags & indicator pips (4px grid)
  compact: 8,      // Small chips & segmented filter tabs
  control: 12,     // Standard buttons, inputs, list rows, 5x5 cells (4px grid)
  surface: 16,     // Mode cards, modal surfaces, dialogs (4px grid)
  hero: 24,        // Dominant hero cards & 5x5 Board tray (4px grid)
  board: 24,       // The 5x5 Bingo Board tray chassis
  dock: 28,        // Floating console dock & top player stage island
  sheet: 28,       // Bottom drawers & sheets
  pill: 9999,      // Full capsules, circular avatars, toggle thumbs

  // Compatibility aliases
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  card: 16,
  navBar: 28,
  full: 9999,
};

export const SPACING = {
  xxs: 2,   // Sub-grid optical hairline / border compensation only
  xs: 4,    // Micro spacing: Pips, badge-to-icon gaps, dock item gap
  sm: 8,    // Tight spacing: Control internal padding, icon-to-label gaps
  md: 12,   // Component internal: Input padding, stat cell spacing
  lg: 16,   // Standard spacing: Card padding, screen margin, dock bottom float
  xl: 20,   // Major component: Modal padding, large card internal spacing
  xxl: 24,  // Section spacing: Distance between header, hero stage, shelves
  xxxl: 32, // Major separation: Distance between dominant modules
  hero: 40, // Hero / Composition spacing: Board stage buffer
  stage: 48,// Max screen composition safe buffer
};

export const TOUCH_TARGET = {
  minSize: 44, // 44pt Apple HIG / 48dp Android touch bound
  hitSlop: { top: 8, bottom: 8, left: 8, right: 8 },
};

export const SHADOWS = {
  subtle: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 3,
  },
  heroAction: {
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  goldReward: {
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 18,
    elevation: 8,
  },
  floating: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.55,
    shadowRadius: 20,
    elevation: 10,
  },
};

export const MOTION = {
  duration: {
    instant: 0,
    micro: 120,   // Tap/press micro-physics
    fast: 160,    // Modal & sheet transition
    normal: 200,  // Controlled screen transition
    emphasis: 320,// Bingo line completed, daub seal stamp
    reward: 480,  // Dramatic victory reveal
    slow: 480,
  },
  scale: {
    press: 0.96,  // Controlled spring compression on touch
  },
};

/**
 * Premium Icon System Semantic Tokens
 * Strictly tokenized modes supporting currentColor & semantic mapping
 */
export const ICON_COLORS = {
  primary: COLORS.textPrimary,       // #F8FAFC
  secondary: COLORS.textSecondary,   // #94A3B8
  muted: COLORS.textMuted,           // #64748B
  disabled: '#475569',
  active: COLORS.activeTabIcon,      // #0B0E14
  playEmerald: COLORS.playEmerald,   // #10B981
  gold: COLORS.goldPrimary,          // #F59E0B
  danger: COLORS.dangerRed,          // #EF4444
  warning: COLORS.warningAmber,      // #F59E0B
  info: COLORS.infoBlue,             // #38BDF8
  white: '#FFFFFF',
  goldGlow: COLORS.goldGlow,
  emeraldGlow: COLORS.playEmeraldGlow,
};

export const ICON_SIZES = {
  micro: 14,
  compact: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
  xxl: 40,
  hero: 48,
};

