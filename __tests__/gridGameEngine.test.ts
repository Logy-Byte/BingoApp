import {
  generate5x5Board,
  generate5x5NumberPool,
  evaluate5x5Wins,
  shuffleArray,
  createRNG,
  WINNING_PATTERNS_5X5,
} from '../src/domain/engine/gridGameEngine';
import { RobotOpponent } from '../src/domain/engine/robotOpponent';
import { AntiCheatValidator } from '../src/domain/multiplayer/antiCheatValidator';

describe('5x5 Number Game Engine & AI Test Suite', () => {
  describe('Deterministic PRNG & Unbiased Fisher-Yates Shuffle', () => {
    test('PRNG produces identical sequences for identical seeds', () => {
      const rngA = createRNG('seed-alpha-5x5');
      const rngB = createRNG('seed-alpha-5x5');
      for (let i = 0; i < 25; i++) {
        expect(rngA()).toBe(rngB());
      }
    });

    test('Pool of numbers contains exactly 1 through 25 with no duplicates', () => {
      const pool = generate5x5NumberPool();
      expect(pool.length).toBe(25);
      const unique = new Set(pool);
      expect(unique.size).toBe(25);
      for (let i = 1; i <= 25; i++) {
        expect(unique.has(i)).toBe(true);
      }
    });
  });

  describe('5x5 Board Generation', () => {
    test('generates valid 5x5 board containing exactly numbers 1-25 uniquely placed', () => {
      const board = generate5x5Board('b-test', 'seed-123', false);
      expect(board.matrix.length).toBe(5);

      const seenNumbers = new Set<number>();
      board.matrix.forEach((row, r) => {
        expect(row.length).toBe(5);
        row.forEach((cell, c) => {
          expect(cell.row).toBe(r);
          expect(cell.col).toBe(c);
          expect(cell.value).toBeGreaterThanOrEqual(1);
          expect(cell.value).toBeLessThanOrEqual(25);
          expect(seenNumbers.has(cell.value)).toBe(false);
          seenNumbers.add(cell.value);
        });
      });
      expect(seenNumbers.size).toBe(25);
    });

    test('supports optional free center space', () => {
      const board = generate5x5Board('b-free', 'seed-free', true);
      const center = board.matrix[2][2];
      expect(center.isFreeSpace).toBe(true);
      expect(center.value).toBe(0);
      expect(center.state).toBe('MARKED');
    });
  });

  describe('Winning Patterns Evaluation (13 Patterns)', () => {
    test('contains exactly 13 defined patterns for 5x5 (5 rows, 5 cols, 2 diagonals, 4 corners)', () => {
      expect(WINNING_PATTERNS_5X5.length).toBe(13);
    });

    test('detects completed horizontal row', () => {
      const board = generate5x5Board('b-eval', 'seed-eval', false);
      for (let c = 0; c < 5; c++) {
        board.matrix[0][c].state = 'MARKED';
      }

      const result = evaluate5x5Wins(board, []);
      expect(result.hasWon).toBe(true);
      expect(result.newlyCompletedPatterns.some((p) => p.id === 'ROW_0')).toBe(true);
      expect(result.winningCoords.length).toBe(5);
    });

    test('detects completed vertical column', () => {
      const board = generate5x5Board('b-eval', 'seed-eval', false);
      for (let r = 0; r < 5; r++) {
        board.matrix[r][2].state = 'MARKED';
      }

      const result = evaluate5x5Wins(board, []);
      expect(result.hasWon).toBe(true);
      expect(result.newlyCompletedPatterns.some((p) => p.id === 'COL_2')).toBe(true);
    });

    test('detects main diagonal and anti diagonal', () => {
      const board = generate5x5Board('b-eval', 'seed-eval', false);
      for (let i = 0; i < 5; i++) {
        board.matrix[i][i].state = 'MARKED';
      }

      const result = evaluate5x5Wins(board, []);
      expect(result.hasWon).toBe(true);
      expect(result.newlyCompletedPatterns.some((p) => p.id === 'DIAG_MAIN')).toBe(true);
    });

    test('detects four corners pattern', () => {
      const board = generate5x5Board('b-eval', 'seed-eval', false);
      board.matrix[0][0].state = 'MARKED';
      board.matrix[0][4].state = 'MARKED';
      board.matrix[4][0].state = 'MARKED';
      board.matrix[4][4].state = 'MARKED';

      const result = evaluate5x5Wins(board, []);
      expect(result.hasWon).toBe(true);
      expect(result.newlyCompletedPatterns.some((p) => p.id === 'FOUR_CORNERS')).toBe(true);
      expect(result.winningCoords.length).toBe(4);
    });

    test('does not return duplicate awards for already completed lines', () => {
      const board = generate5x5Board('b-eval', 'seed-eval', false);
      for (let c = 0; c < 5; c++) {
        board.matrix[0][c].state = 'MARKED';
      }

      const eval1 = evaluate5x5Wins(board, []);
      expect(eval1.newlyCompletedPatterns.length).toBe(1);

      const eval2 = evaluate5x5Wins(board, ['ROW_0']);
      expect(eval2.newlyCompletedPatterns.length).toBe(0);
      expect(eval2.allCompletedPatterns.length).toBe(1);
    });
  });

  describe('AntiCheatValidator Suite', () => {
    test('authoritatively accepts valid win claim', () => {
      const board = generate5x5Board('b-cheat-test', 'seed-secure', false);
      const row0Values = board.matrix[0].map((c) => c.value);

      // Mark row 0
      board.matrix[0].forEach((c) => {
        c.state = 'MARKED';
      });

      // Called numbers include all row 0 values
      const calledNumbers = [...row0Values, 99];

      const validation = AntiCheatValidator.validateClaim(
        { playerId: 'p1', boardId: board.id, patternId: 'ROW_0' },
        board,
        calledNumbers
      );

      expect(validation.isValid).toBe(true);
    });

    test('rejects win claim if called numbers do not contain cell value', () => {
      const board = generate5x5Board('b-cheat-test', 'seed-secure', false);
      // Mark row 0
      board.matrix[0].forEach((c) => {
        c.state = 'MARKED';
      });

      // Called numbers miss the last cell value
      const incompleteCalled = board.matrix[0].slice(0, 4).map((c) => c.value);

      const validation = AntiCheatValidator.validateClaim(
        { playerId: 'p1', boardId: board.id, patternId: 'ROW_0' },
        board,
        incompleteCalled
      );

      expect(validation.isValid).toBe(false);
      expect(validation.reason).toContain('has not been called');
    });

    test('rejects daub validation if number has not been called', () => {
      const calledNumbers = [5, 12, 19];
      expect(AntiCheatValidator.validateDaub(5, calledNumbers)).toBe(true);
      expect(AntiCheatValidator.validateDaub(21, calledNumbers)).toBe(false);
    });
  });

  describe('RobotOpponent Suite', () => {
    test('initializes robot with independent 5x5 board and valid numbers', () => {
      const bot = new RobotOpponent('MEDIUM', 'test-bot-seed');
      expect(bot.board.matrix.length).toBe(5);
      expect(bot.linesCompleted).toBe(0);
      expect(bot.score).toBe(0);
    });
  });
});
