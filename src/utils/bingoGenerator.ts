import {
  BingoCard,
  BingoCell,
  BingoColumnLetter,
  BINGO_COLUMN_RANGES,
  BINGO_LETTERS,
} from '../types/bingo';

/**
 * Deterministic pseudo-random number generator (Mulberry32)
 * Useful for anti-cheat verification, synchronized multiplayer seeds, and reproducible cards.
 */
export function createRNG(seedValue: number | string): () => number {
  let s = typeof seedValue === 'number' ? seedValue : hashString(seedValue);
  return function () {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * 32-bit FNV-1a string hash to convert string seed to integer
 */
export function hashString(str: string): number {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/**
 * Fisher-Yates shuffle with optional deterministic RNG
 */
function shuffleArray<T>(array: T[], rng: () => number = Math.random): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

/**
 * Generates an array of 5 unique random numbers within the min/max bounds for a column
 */
function getColumnNumbers(
  min: number,
  max: number,
  rng: () => number = Math.random
): number[] {
  const pool: number[] = [];
  for (let n = min; n <= max; n++) {
    pool.push(n);
  }
  const shuffled = shuffleArray(pool, rng);
  return shuffled.slice(0, 5);
}

/**
 * Generates a valid standard 5x5 Bingo Card
 * - Center cell (row 2, col 2) is always FREE space (number = 0, isFreeSpace = true, isDaubed = true)
 * - Columns strictly respect B: 1-15, I: 16-30, N: 31-45, G: 46-60, O: 61-75
 * - All numbers within a column are distinct
 */
export function generateBingoCard(
  cardId: string = `card-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
  seed?: string
): BingoCard {
  const effectiveSeed = seed || `${cardId}-${Date.now()}`;
  const rng = createRNG(effectiveSeed);

  // Generate 5 distinct numbers for each column B, I, N, G, O
  const columnData: Record<BingoColumnLetter, number[]> = {
    B: getColumnNumbers(BINGO_COLUMN_RANGES.B.min, BINGO_COLUMN_RANGES.B.max, rng),
    I: getColumnNumbers(BINGO_COLUMN_RANGES.I.min, BINGO_COLUMN_RANGES.I.max, rng),
    N: getColumnNumbers(BINGO_COLUMN_RANGES.N.min, BINGO_COLUMN_RANGES.N.max, rng),
    G: getColumnNumbers(BINGO_COLUMN_RANGES.G.min, BINGO_COLUMN_RANGES.G.max, rng),
    O: getColumnNumbers(BINGO_COLUMN_RANGES.O.min, BINGO_COLUMN_RANGES.O.max, rng),
  };

  // Build 5x5 matrix
  const matrix: BingoCell[][] = [];

  for (let row = 0; row < 5; row++) {
    const rowCells: BingoCell[] = [];

    for (let col = 0; col < 5; col++) {
      const letter = BINGO_LETTERS[col];
      const isCenterFree = row === 2 && col === 2;
      const cellNumber = isCenterFree ? 0 : columnData[letter][row];

      rowCells.push({
        id: `${cardId}-cell-${row}-${col}`,
        row,
        col,
        letter,
        number: cellNumber,
        isFreeSpace: isCenterFree,
        isDaubed: isCenterFree, // Center free space is pre-daubed
        daubTimestamp: isCenterFree ? 0 : undefined,
        isWinningCell: false,
      });
    }

    matrix.push(rowCells);
  }

  return {
    id: cardId,
    serialNumber: `BNG-${Math.abs(hashString(effectiveSeed)) % 1000000}`.padStart(10, '0'),
    seed: effectiveSeed,
    matrix,
    isWinner: false,
    winningPatterns: [],
  };
}

/**
 * Returns the corresponding B-I-N-G-O letter for a given number (1 - 75)
 */
export function getLetterForNumber(num: number): BingoColumnLetter {
  if (num >= 1 && num <= 15) return 'B';
  if (num >= 16 && num <= 30) return 'I';
  if (num >= 31 && num <= 45) return 'N';
  if (num >= 46 && num <= 60) return 'G';
  if (num >= 61 && num <= 75) return 'O';
  throw new Error(`Invalid bingo number: ${num}. Must be between 1 and 75.`);
}

/**
 * Generates a full shuffled draw deck of 75 balls
 */
export function generateDrawDeck(seed?: string): number[] {
  const rng = seed ? createRNG(seed) : Math.random;
  const numbers: number[] = Array.from({ length: 75 }, (_, i) => i + 1);
  return shuffleArray(numbers, rng);
}
