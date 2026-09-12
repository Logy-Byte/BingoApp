import { BingoCard, WinEvaluationResult, WinPatternType } from '../types/bingo';

interface Coord {
  row: number;
  col: number;
}

/**
 * Pure evaluation engine to test any 5x5 card matrix against classic and custom Bingo win rules.
 */
export function evaluateCardWins(card: BingoCard): WinEvaluationResult {
  const matrix = card.matrix;
  const detectedPatterns: WinPatternType[] = [];
  const winningCoordsMap = new Map<string, Coord>();

  const addCoords = (coords: Coord[]) => {
    for (const c of coords) {
      winningCoordsMap.set(`${c.row},${c.col}`, c);
    }
  };

  // Helper to check if a cell is daubed or free space
  const isCellMarked = (r: number, c: number): boolean => {
    return matrix[r][c].isDaubed || matrix[r][c].isFreeSpace;
  };

  // 1. Check Horizontal Lines (5 rows)
  for (let r = 0; r < 5; r++) {
    let rowWon = true;
    const coords: Coord[] = [];
    for (let c = 0; c < 5; c++) {
      coords.push({ row: r, col: c });
      if (!isCellMarked(r, c)) {
        rowWon = false;
        break;
      }
    }
    if (rowWon) {
      detectedPatterns.push('HORIZONTAL_LINE');
      addCoords(coords);
    }
  }

  // 2. Check Vertical Lines (5 columns)
  for (let c = 0; c < 5; c++) {
    let colWon = true;
    const coords: Coord[] = [];
    for (let r = 0; r < 5; r++) {
      coords.push({ row: r, col: c });
      if (!isCellMarked(r, c)) {
        colWon = false;
        break;
      }
    }
    if (colWon) {
      detectedPatterns.push('VERTICAL_LINE');
      addCoords(coords);
    }
  }

  // 3. Check Main Diagonal (Top-Left to Bottom-Right: [0,0], [1,1], [2,2], [3,3], [4,4])
  let mainDiagWon = true;
  const mainDiagCoords: Coord[] = [];
  for (let i = 0; i < 5; i++) {
    mainDiagCoords.push({ row: i, col: i });
    if (!isCellMarked(i, i)) {
      mainDiagWon = false;
      break;
    }
  }
  if (mainDiagWon) {
    detectedPatterns.push('MAIN_DIAGONAL');
    addCoords(mainDiagCoords);
  }

  // 4. Check Anti-Diagonal (Top-Right to Bottom-Left: [0,4], [1,3], [2,2], [3,1], [4,0])
  let antiDiagWon = true;
  const antiDiagCoords: Coord[] = [];
  for (let i = 0; i < 5; i++) {
    antiDiagCoords.push({ row: i, col: 4 - i });
    if (!isCellMarked(i, 4 - i)) {
      antiDiagWon = false;
      break;
    }
  }
  if (antiDiagWon) {
    detectedPatterns.push('ANTI_DIAGONAL');
    addCoords(antiDiagCoords);
  }

  // 5. Check Four Corners: [0,0], [0,4], [4,0], [4,4]
  const cornerCoords: Coord[] = [
    { row: 0, col: 0 },
    { row: 0, col: 4 },
    { row: 4, col: 0 },
    { row: 4, col: 4 },
  ];
  const cornersWon = cornerCoords.every(c => isCellMarked(c.row, c.col));
  if (cornersWon) {
    detectedPatterns.push('FOUR_CORNERS');
    addCoords(cornerCoords);
  }

  // 6. Check X-Pattern (Both main diagonal and anti-diagonal marked simultaneously)
  if (mainDiagWon && antiDiagWon) {
    detectedPatterns.push('X_PATTERN');
  }

  // 7. Check Postage Stamp (Any 2x2 corner block complete: top-left, top-right, bottom-left, bottom-right)
  const postageStampCorners: Coord[][] = [
    // Top-Left 2x2
    [{ row: 0, col: 0 }, { row: 0, col: 1 }, { row: 1, col: 0 }, { row: 1, col: 1 }],
    // Top-Right 2x2
    [{ row: 0, col: 3 }, { row: 0, col: 4 }, { row: 1, col: 3 }, { row: 1, col: 4 }],
    // Bottom-Left 2x2
    [{ row: 3, col: 0 }, { row: 3, col: 1 }, { row: 4, col: 0 }, { row: 4, col: 1 }],
    // Bottom-Right 2x2
    [{ row: 3, col: 3 }, { row: 3, col: 4 }, { row: 4, col: 3 }, { row: 4, col: 4 }],
  ];

  for (const stamp of postageStampCorners) {
    if (stamp.every(c => isCellMarked(c.row, c.col))) {
      detectedPatterns.push('POSTAGE_STAMP');
      addCoords(stamp);
      break;
    }
  }

  // 8. Check Blackout (Every single cell on the 5x5 grid is marked)
  let blackoutWon = true;
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      if (!isCellMarked(r, c)) {
        blackoutWon = false;
        break;
      }
    }
    if (!blackoutWon) break;
  }
  if (blackoutWon) {
    detectedPatterns.push('BLACKOUT');
  }

  return {
    hasWon: detectedPatterns.length > 0,
    patterns: detectedPatterns,
    winningCellCoords: Array.from(winningCoordsMap.values()),
  };
}
