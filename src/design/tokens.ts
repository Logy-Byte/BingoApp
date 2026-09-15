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
  // Orange + White Core Game Palette
  primaryOrange: '#FF7A00',   // Primary Action Orange
  secondaryOrange: '#FF9A3D', // Secondary Orange Accent
  cleanWhite: '#FFFFFF',      // Background / Card Surface
  softOrange: '#FFF7EF',      // Soft Background Tint
  lunarShadow: '#171717',     // Dark Charcoal Text / Strong Element
  grayWhisper: '#FFF7EF',     // BG Color 2
  gentleOlive: '#FF7A00',     // Mapped to Orange for backward compatibility
  winterHazel: '#FF9A3D',     // Mapped to Secondary Orange

  // Ambient Game Environment & Base Planes
  bgDark: '#171717',          // Deep backdrop
  tableFelt: '#1E1E1E',       // Table staging plane
  surfaceDeep: '#242424',     // Recessed board well & modal base
  surfaceRaised: '#FFFFFF',   // Elevated card surface
  surfaceHighlight: '#FFF0E0',// Bevel light catching edge

  // Metallic & Architectural Rim Edges
  borderSubtle: '#FFE0C4',    // Hairline separation
  borderStrong: '#FFC58D',    // Frame edges
  borderGold: '#FF9A3D',      // Winter Hazel highlight
  borderSpecular: 'rgba(255, 122, 0, 0.10)',       // 1px micro-border
  borderSpecularStrong: 'rgba(255, 122, 0, 0.20)', // Specular glint highlight
  glassHighlight: 'rgba(255, 255, 255, 0.40)',     // Top edge illumination

  // Signature Floating Console Dock
  floatingDockBg: '#FFFFFF',     // Clean White capsule dock
  floatingDockBorder: '#FFE0C4', // Refined dock border
  activeTabBg: '#FF7A00',        // High-contrast primary orange pill capsule
  activeTabText: '#FFFFFF',      // Clean white text on active pill
  activeTabIcon: '#FFFFFF',      // Clean white icon on active pill
  inactiveTabIcon: '#737373',    // Muted slate icon on inactive tab

  // Timeline Ribbon & Active Indicator
  timelineBg: '#FFF7EF',         // Ribbon container
  timelineBorder: '#FFE0C4',     // Hairline border
  timelineActiveBg: '#FF7A00',   // Inverted circular badge for active call
  timelineActiveText: '#FFFFFF', // High-contrast numeral

  // 3-Metric KPI Shelf
  kpiCardBg: '#FFFFFF',
  kpiCardBorder: '#FFE0C4',

  // Two-Tone Energy Gradients & Progress
  gradientSunset: '#FF7A00',     // Primary Orange
  gradientMint: '#22C55E',       // Success Green
  progressTrack: '#FEEAD6',

  // Podium & Ranking Accents
  podiumGold: '#FF7A00',
  podiumSilver: '#9CA3AF',
  podiumBronze: '#D97706',
  starRatingBg: 'rgba(255, 122, 0, 0.15)',
  starRatingText: '#FF7A00',

  // Primary Action & Play Energy (Primary Orange)
  playEmerald: '#FF7A00',        // Primary match trigger & ready indicators
  playEmeraldPressed: '#E06900',
  playEmeraldGlow: 'rgba(255, 122, 0, 0.25)',
  playEmeraldSubtle: 'rgba(255, 122, 0, 0.12)',

  // Crown Victory & Alignment Vector (Orange / Gold)
  goldPrimary: '#FF7A00',       // Winning line illumination & trophy ranks
  goldDeep: '#C25E00',          // Shadowed bevel of gold elements
  goldLight: '#FFC58D',         // Specular glint on gold numerals
  goldGlow: 'rgba(255, 122, 0, 0.32)',
  goldBg: 'rgba(255, 122, 0, 0.12)',

  // Authentic Stamped Daub Seal (Orange Pip & Tint)
  daubWell: 'rgba(255, 122, 0, 0.15)', // Pressed stamped cell background
  daubBorder: '#FF7A00',                // Crisp orange boundary
  daubPip: '#FF7A00',                   // Central optical wax seal pip
  daubGlow: 'rgba(255, 122, 0, 0.25)',

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
    "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontFamily:
    "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  // Monospaced tabular numerals for game numbers and timers
  monoFamily:
    "'JetBrains Mono', 'Inter', -apple-system, monospace",
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

/**
 * Concentric Corner Geometry Helper (Apple HIG Rule)
 * R_inner = max(R_outer - Padding, minRadius)
 */
export function calcConcentricRadius(outerRadius: number, padding: number, minRadius: number = 4): number {
  return Math.max(outerRadius - padding, minRadius);
}

/**
 * Emil Kowalski Standard Spring Physics Tokens
 */
export const SPRING_CONFIGS = {
  // Card Press & Cell Touch
  cardPress: {
    tension: 340,
    friction: 28,
    mass: 0.8,
    scaleDown: 0.97,
  },
  // Broadcast Ball Drop Entrance
  ballDrop: {
    tension: 220,
    friction: 18,
    damping: 0.82,
  },
  // iOS Spring Modal / Sheet Presentation
  sheetModal: {
    damping: 0.85,
    initialVelocity: 4,
    stiffness: 300,
  },
  // Radial Meter & Progress Charge
  radialEnergy: {
    tension: 180,
    friction: 12,
  },
  // Micro haptic spring feedback
  hapticFeedback: {
    tension: 400,
    friction: 30,
    mass: 0.5,
  },
};

/**
 * Layered Apple HIG Glass Surface Materials
 */
export const SURFACE_MATERIALS = {
  primaryGlass: {
    backgroundColor: 'rgba(35, 38, 43, 0.82)',
    borderColor: COLORS.borderSpecular,
    borderWidth: 1,
  },
  elevatedCard: {
    backgroundColor: COLORS.surfaceRaised,
    borderColor: COLORS.borderSpecular,
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 4,
  },
  activeSelected: {
    backgroundColor: COLORS.daubWell,
    borderColor: COLORS.daubBorder,
    borderWidth: 1,
    shadowColor: COLORS.daubBorder,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 6,
  },
  dockCapsule: {
    backgroundColor: COLORS.floatingDockBg,
    borderColor: COLORS.floatingDockBorder,
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.55,
    shadowRadius: 20,
    elevation: 10,
  },
};


