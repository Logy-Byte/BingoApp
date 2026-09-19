/**
 * Premium 5x5 Grid Game Engine Types & Models
 * Strictly 5x5 board (25 cells), numbers 1-25, 3-tab navigation,
 * deterministic daily puzzles, AI robot, and anti-cheat validation.
 */

export type TabDestination = 'PLAY' | 'LEADERBOARD' | 'PROFILE' | 'SHOP';

export type ScreenState = 
  | 'SPLASH'
  | 'SIGN_IN'
  | 'REGISTER'
  | 'TAB_NAV'
  | 'ROOM_SELECTION'
  | 'PRE_GAME'
  | 'MATCHMAKING'
  | 'LOBBY'
  | 'GAMEPLAY'
  | 'RESULTS'
  | 'ROOMS'
  | 'CREATE_ROOM'
  | 'JOIN_ROOM'
  | 'DAILY_PUZZLE'
  | 'SETTINGS'
  | 'SHOP'
  | 'DELETE_ACCOUNT';

export type GameModeType = 'RANKED' | 'ROBOT' | 'FRIEND' | 'DAILY' | 'LOCAL';

export type RobotDifficulty = 'EASY' | 'MEDIUM' | 'HARD';

export type MatchmakingStatus =
  | 'IDLE'
  | 'SEARCHING'
  | 'WAITING_FOR_PLAYER'
  | 'MATCH_FOUND'
  | 'GAME_STARTING'
  | 'DISCONNECTED'
  | 'CLOSED'
  | 'EXPIRED'
  | 'CANCELLED'
  | 'ERROR';

export interface MatchmakingTicket {
  ticketId: string;
  userId: string;
  playerId?: string;
  playerName: string;
  playerRating: number;
  playerAvatar?: string;
  playerTier?: string;
  tier?: string;
  gameMode?: GameModeType;
  status: MatchmakingStatus;
  createdAt: number;
  expiresAt?: number;
  matchedRoomId?: string;
  matchedOpponent?: Player;
}

export type CellState = 'DEFAULT' | 'CALLED' | 'MARKED' | 'COMPLETED' | 'INVALID' | 'DISABLED';

export interface GridCell5x5 {
  id: string;             // e.g. "cell-r1-c2"
  row: number;            // 0 to 4
  col: number;            // 0 to 4
  value: number;          // Strictly 1 to 25
  isFreeSpace: boolean;
  state: CellState;
  daubTimestamp?: number;
  isWinningCell?: boolean;
}

export interface Board5x5 {
  id: string;
  seed: string;
  matrix: GridCell5x5[][];
  completedLineIds: string[];
  cardIndex?: number;
}

export type PatternType = 
  | 'ROW'
  | 'COLUMN'
  | 'MAIN_DIAGONAL'
  | 'ANTI_DIAGONAL'
  | 'FOUR_CORNERS';

export interface WinningPattern {
  id: string;
  name: string;
  type: PatternType;
  coords: Array<{ row: number; col: number }>;
}

export interface WinEvaluationResult {
  hasWon: boolean;
  newlyCompletedPatterns: WinningPattern[];
  allCompletedPatterns: WinningPattern[];
  winningCoords: Array<{ row: number; col: number }>;
}

export interface DrawnNumber {
  value: number;          // 1 to 25
  calledAt: number;
  callOrder: number;
}

// Power-Up Types
export type PowerUpType = 'FREE_DAUB' | 'INSTANT_BINGO' | 'DOUBLE_PAYOUT' | 'EXTRA_TIME';

export interface PowerUp {
  id: PowerUpType;
  name: string;
  icon: string;
  count: number;
  costCoins: number;
  description: string;
}

// Store Items
export interface StoreItem {
  id: string;
  category: 'COINS' | 'GEMS' | 'POWERUPS' | 'AVATARS';
  title: string;
  amountText: string;
  priceText: string;
  costInGems?: number;
  icon: string;
  badgeText?: string;
}

// Room & Multiplayer Types
export type RoomPrivacy = 'open' | 'password';
export type MatchStatus = 
  | 'WAITING'
  | 'READY'
  | 'STARTING'
  | 'ACTIVE'
  | 'VALIDATING'
  | 'RESULT'
  | 'FINISHED'
  | 'CLOSED'
  | 'EXPIRED';

export interface Player {
  id: string;
  name: string;
  avatar: string;
  isHost: boolean;
  isReady: boolean;
  score: number;
  linesCompleted: number;
  hasWon: boolean;
  rating: number;         // e.g. 1450 MMR
  tier: string;           // "Bronze", "Silver", "Gold", "Diamond"
  coins: number;
  gems: number;
}

export interface PublicRoom {
  id: string;             // 6-character room code (e.g. "K9X2P7")
  name: string;
  privacy: RoomPrivacy;
  passwordHash?: string;
  hostId: string;
  hostName: string;
  playerCount: number;
  maxPlayers: number;
  status: MatchStatus;
  createdAt: number;
  ticketPrice: number;
  jackpotAmount: number;
  recommendedTickets: number[];
}

// Daily Puzzle
export interface DailyPuzzle {
  id: string;             // e.g. "2026-09-12"
  dayNumber: number;
  seed: string;
  targetCalls: number;    // e.g. Complete 3 lines in 15 calls
  isCompleted: boolean;
  highScore?: number;
}

// Leaderboard Entry
export interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  avatar: string;
  tier: string;
  rating: number;
  wins: number;
  winRate: number;
  isCurrentUser?: boolean;
}

// Profile Progression
export interface PlayerProfile {
  id: string;
  name: string;
  avatar: string;
  tier: string;
  rating: number;
  gamesPlayed: number;
  wins: number;
  winRate: number;
  bestStreak: number;
  currentStreak: number;
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    unlocked: boolean;
    icon: string;
  }>;
  recentMatches: Array<{
    id: string;
    mode: GameModeType;
    result: 'WIN' | 'LOSS';
    score: number;
    lines: number;
    ratingDelta: number;
    date: string;
  }>;
}

