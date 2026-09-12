/**
 * Bingo Domain Models & Core Types
 */

export type BingoColumnLetter = 'B' | 'I' | 'N' | 'G' | 'O';

export interface BingoColumnRange {
  letter: BingoColumnLetter;
  min: number;
  max: number;
}

export const BINGO_COLUMN_RANGES: Record<BingoColumnLetter, { min: number; max: number }> = {
  B: { min: 1, max: 15 },
  I: { min: 16, max: 30 },
  N: { min: 31, max: 45 },
  G: { min: 46, max: 60 },
  O: { min: 61, max: 75 },
};

export const BINGO_LETTERS: readonly BingoColumnLetter[] = ['B', 'I', 'N', 'G', 'O'] as const;

export interface BingoCell {
  id: string;             // Unique identifier e.g. "card-1-cell-2-2"
  row: number;            // 0-4
  col: number;            // 0-4
  letter: BingoColumnLetter;
  number: number;         // 0 for FREE space
  isFreeSpace: boolean;
  isDaubed: boolean;
  daubTimestamp?: number;
  isWinningCell?: boolean; // Highlight cells that form a win
}

export interface BingoCard {
  id: string;
  serialNumber: string;
  seed: string;
  matrix: BingoCell[][];  // 5x5 grid [row][col]
  isWinner: boolean;
  winningPatterns: WinPatternType[];
}

export type WinPatternType =
  | 'HORIZONTAL_LINE'
  | 'VERTICAL_LINE'
  | 'MAIN_DIAGONAL'
  | 'ANTI_DIAGONAL'
  | 'FOUR_CORNERS'
  | 'X_PATTERN'
  | 'POSTAGE_STAMP'
  | 'BLACKOUT';

export interface WinEvaluationResult {
  hasWon: boolean;
  patterns: WinPatternType[];
  winningCellCoords: Array<{ row: number; col: number }>;
}

export interface DrawnBall {
  letter: BingoColumnLetter;
  number: number;
  drawnAt: number;
  callOrder: number;
}

export type GameMode = 'SOLO_AI' | 'MULTIPLAYER_LIVE' | 'PRACTICE';
export type DauberStyle = 'CLASSIC_RED' | 'NEON_CYAN' | 'GOLDEN_STAR' | 'AMETHYST_GEM';
export type CardCount = 1 | 2 | 4;

export interface GameStats {
  score: number;
  daubAccuracy: number;
  totalDaubs: number;
  correctDaubs: number;
  bingoCount: number;
  timeElapsedSeconds: number;
}
