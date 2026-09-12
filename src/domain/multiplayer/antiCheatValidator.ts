/**
 * Authoritative Anti-Cheat Win Validator (5x5 Number Game)
 * Strictly verifies player win claims against authoritative called numbers,
 * cell coordinates, seeded board layout, and pattern definitions.
 */

import { Board5x5, WinningPattern } from '../types';
import { WINNING_PATTERNS_5X5 } from '../engine/gridGameEngine';

export interface WinClaimPayload {
  playerId: string;
  boardId: string;
  patternId: string;
}

export class AntiCheatValidator {
  /**
   * Strictly validates whether a win claim is legitimate.
   */
  static validateClaim(
    claim: WinClaimPayload,
    playerBoard: Board5x5,
    authoritativeCalledNumbers: number[]
  ): { isValid: boolean; reason?: string } {
    // 1. Board ID integrity
    if (claim.boardId !== playerBoard.id) {
      return { isValid: false, reason: 'Board ID mismatch.' };
    }

    // 2. Pattern existence
    const targetPattern = WINNING_PATTERNS_5X5.find((p) => p.id === claim.patternId);
    if (!targetPattern) {
      return { isValid: false, reason: 'Invalid or unknown winning pattern.' };
    }

    const calledNumbersSet = new Set(authoritativeCalledNumbers);

    // 3. Verify each coordinate in target pattern was actually called
    for (const patternCoord of targetPattern.coords) {
      const boardCell = playerBoard.matrix[patternCoord.row]?.[patternCoord.col];
      if (!boardCell) {
        return { isValid: false, reason: 'Referenced coordinates out of bounds.' };
      }

      // Free space is automatically valid
      if (boardCell.isFreeSpace) {
        continue;
      }

      // Verify number was legitimately drawn by authoritative caller
      if (!calledNumbersSet.has(boardCell.value)) {
        return {
          isValid: false,
          reason: `Cell [${patternCoord.row},${patternCoord.col}] with number ${boardCell.value} has not been called!`,
        };
      }

      // Verify player actually marked the cell
      if (boardCell.state !== 'MARKED' && boardCell.state !== 'COMPLETED') {
        return {
          isValid: false,
          reason: `Cell [${patternCoord.row},${patternCoord.col}] has not been marked.`,
        };
      }
    }

    return { isValid: true };
  }

  /**
   * Validates whether a single cell daub action is permissible.
   */
  static validateDaub(
    cellValue: number,
    authoritativeCalledNumbers: number[]
  ): boolean {
    const calledSet = new Set(authoritativeCalledNumbers);
    return calledSet.has(cellValue);
  }
}
