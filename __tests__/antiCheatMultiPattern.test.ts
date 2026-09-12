import { AntiCheatValidator } from '../src/domain/multiplayer/antiCheatValidator';
import { generate5x5Board } from '../src/domain/engine/gridGameEngine';

describe('AntiCheatValidator Multi-Pattern & Timestamp Verification Suite', () => {
  const seed = 'test-anticheat-seed';
  const playerId = 'player-99';

  test('validates single line claim successfully when numbers and marks match', () => {
    const board = generate5x5Board('b-1', seed, false);
    const row0Cells = board.matrix[0];
    const row0Vals = row0Cells.map((c) => c.value);

    // Mark row 0
    row0Cells.forEach((c) => {
      c.state = 'MARKED';
    });

    const result = AntiCheatValidator.validateClaim(
      { playerId, boardId: board.id, patternId: 'ROW_0' },
      board,
      row0Vals
    );

    expect(result.isValid).toBe(true);
    expect(result.lineCount).toBe(1);
    expect(result.validatedPatterns?.[0].id).toBe('ROW_0');
  });

  test('rejects claim when any cell in pattern was uncalled', () => {
    const board = generate5x5Board('b-1', seed, false);
    const row0Cells = board.matrix[0];
    const row0Vals = row0Cells.map((c) => c.value);

    // Omit the last number from drawn history
    const incompleteCalls = row0Vals.slice(0, 4);

    row0Cells.forEach((c) => {
      c.state = 'MARKED';
    });

    const result = AntiCheatValidator.validateClaim(
      { playerId, boardId: board.id, patternId: 'ROW_0' },
      board,
      incompleteCalls
    );

    expect(result.isValid).toBe(false);
    expect(result.reason).toContain('has not been called');
  });

  test('rejects claim when any cell in pattern was unmarked by player', () => {
    const board = generate5x5Board('b-1', seed, false);
    const row0Cells = board.matrix[0];
    const row0Vals = row0Cells.map((c) => c.value);

    // Leave first cell DEFAULT (unmarked)
    row0Cells[0].state = 'DEFAULT';
    row0Cells.slice(1).forEach((c) => {
      c.state = 'MARKED';
    });

    const result = AntiCheatValidator.validateClaim(
      { playerId, boardId: board.id, patternId: 'ROW_0' },
      board,
      row0Vals
    );

    expect(result.isValid).toBe(false);
    expect(result.reason).toContain('has not been marked');
  });

  test('evaluates and accepts multi-pattern claims without explicit patternId', () => {
    const board = generate5x5Board('b-1', seed, false);
    const row0Vals = board.matrix[0].map((c) => c.value);
    const row1Vals = board.matrix[1].map((c) => c.value);
    const allCalled = [...row0Vals, ...row1Vals];

    // Mark both row 0 and row 1
    board.matrix[0].forEach((c) => (c.state = 'MARKED'));
    board.matrix[1].forEach((c) => (c.state = 'MARKED'));

    const result = AntiCheatValidator.validateClaim(
      { playerId, boardId: board.id },
      board,
      allCalled
    );

    expect(result.isValid).toBe(true);
    expect(result.lineCount).toBe(2);
    expect(result.validatedPatterns?.map((p) => p.id)).toEqual(
      expect.arrayContaining(['ROW_0', 'ROW_1'])
    );
  });

  test('rejects tampered board ID', () => {
    const board = generate5x5Board('b-legit', seed, false);
    const result = AntiCheatValidator.validateClaim(
      { playerId, boardId: 'b-spoofed', patternId: 'ROW_0' },
      board,
      [1, 2, 3, 4, 5]
    );

    expect(result.isValid).toBe(false);
    expect(result.reason).toBe('Board ID mismatch.');
  });
});
