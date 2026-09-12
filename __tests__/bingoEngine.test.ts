import {
  generateBingoCard,
  getLetterForNumber,
  generateDrawDeck,
  createRNG,
} from '../src/utils/bingoGenerator';
import { evaluateCardWins } from '../src/utils/winChecker';
import { BingoCard } from '../src/types/bingo';

describe('bingoGenerator Engine', () => {
  test('generates valid 5x5 card with correct B-I-N-G-O column number distribution', () => {
    const card = generateBingoCard('test-card-1', 'seed-12345');

    expect(card.matrix.length).toBe(5);
    card.matrix.forEach((row, rowIndex) => {
      expect(row.length).toBe(5);

      // B: 1-15
      expect(row[0].number).toBeGreaterThanOrEqual(1);
      expect(row[0].number).toBeLessThanOrEqual(15);
      expect(row[0].letter).toBe('B');

      // I: 16-30
      expect(row[1].number).toBeGreaterThanOrEqual(16);
      expect(row[1].number).toBeLessThanOrEqual(30);
      expect(row[1].letter).toBe('I');

      // N: 31-45 (except center free space)
      if (rowIndex === 2) {
        expect(row[2].isFreeSpace).toBe(true);
        expect(row[2].number).toBe(0);
        expect(row[2].isDaubed).toBe(true);
      } else {
        expect(row[2].number).toBeGreaterThanOrEqual(31);
        expect(row[2].number).toBeLessThanOrEqual(45);
      }
      expect(row[2].letter).toBe('N');

      // G: 46-60
      expect(row[3].number).toBeGreaterThanOrEqual(46);
      expect(row[3].number).toBeLessThanOrEqual(60);
      expect(row[3].letter).toBe('G');

      // O: 61-75
      expect(row[4].number).toBeGreaterThanOrEqual(61);
      expect(row[4].number).toBeLessThanOrEqual(75);
      expect(row[4].letter).toBe('O');
    });
  });

  test('deterministic RNG generates identical cards with identical seed', () => {
    const cardA = generateBingoCard('test-a', 'reproducible-seed-999');
    const cardB = generateBingoCard('test-b', 'reproducible-seed-999');

    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        expect(cardA.matrix[r][c].number).toBe(cardB.matrix[r][c].number);
      }
    }
  });

  test('correctly maps numbers to letters', () => {
    expect(getLetterForNumber(1)).toBe('B');
    expect(getLetterForNumber(15)).toBe('B');
    expect(getLetterForNumber(16)).toBe('I');
    expect(getLetterForNumber(30)).toBe('I');
    expect(getLetterForNumber(31)).toBe('N');
    expect(getLetterForNumber(45)).toBe('N');
    expect(getLetterForNumber(46)).toBe('G');
    expect(getLetterForNumber(60)).toBe('G');
    expect(getLetterForNumber(61)).toBe('O');
    expect(getLetterForNumber(75)).toBe('O');
  });

  test('generates full draw deck of 75 unique numbers', () => {
    const deck = generateDrawDeck('deck-seed');
    expect(deck.length).toBe(75);
    const unique = new Set(deck);
    expect(unique.size).toBe(75);
  });
});

describe('winChecker Engine', () => {
  const getCleanCard = (): BingoCard => generateBingoCard('win-test', 'seed-win');

  test('detects horizontal line win', () => {
    const card = getCleanCard();
    // Daub row 0 completely
    for (let c = 0; c < 5; c++) {
      card.matrix[0][c].isDaubed = true;
    }

    const evalResult = evaluateCardWins(card);
    expect(evalResult.hasWon).toBe(true);
    expect(evalResult.patterns).toContain('HORIZONTAL_LINE');
    expect(evalResult.winningCellCoords).toHaveLength(5);
  });

  test('detects vertical line win', () => {
    const card = getCleanCard();
    // Daub column 3 completely
    for (let r = 0; r < 5; r++) {
      card.matrix[r][3].isDaubed = true;
    }

    const evalResult = evaluateCardWins(card);
    expect(evalResult.hasWon).toBe(true);
    expect(evalResult.patterns).toContain('VERTICAL_LINE');
  });

  test('detects main diagonal and anti-diagonal wins', () => {
    const card = getCleanCard();
    // Daub main diagonal
    for (let i = 0; i < 5; i++) {
      card.matrix[i][i].isDaubed = true;
    }

    let evalResult = evaluateCardWins(card);
    expect(evalResult.hasWon).toBe(true);
    expect(evalResult.patterns).toContain('MAIN_DIAGONAL');

    // Also daub anti-diagonal to trigger X_PATTERN
    for (let i = 0; i < 5; i++) {
      card.matrix[i][4 - i].isDaubed = true;
    }

    evalResult = evaluateCardWins(card);
    expect(evalResult.patterns).toContain('MAIN_DIAGONAL');
    expect(evalResult.patterns).toContain('ANTI_DIAGONAL');
    expect(evalResult.patterns).toContain('X_PATTERN');
  });

  test('detects four corners win', () => {
    const card = getCleanCard();
    card.matrix[0][0].isDaubed = true;
    card.matrix[0][4].isDaubed = true;
    card.matrix[4][0].isDaubed = true;
    card.matrix[4][4].isDaubed = true;

    const evalResult = evaluateCardWins(card);
    expect(evalResult.hasWon).toBe(true);
    expect(evalResult.patterns).toContain('FOUR_CORNERS');
  });

  test('detects postage stamp win', () => {
    const card = getCleanCard();
    // Top-Right 2x2
    card.matrix[0][3].isDaubed = true;
    card.matrix[0][4].isDaubed = true;
    card.matrix[1][3].isDaubed = true;
    card.matrix[1][4].isDaubed = true;

    const evalResult = evaluateCardWins(card);
    expect(evalResult.hasWon).toBe(true);
    expect(evalResult.patterns).toContain('POSTAGE_STAMP');
  });

  test('detects blackout win', () => {
    const card = getCleanCard();
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        card.matrix[r][c].isDaubed = true;
      }
    }

    const evalResult = evaluateCardWins(card);
    expect(evalResult.hasWon).toBe(true);
    expect(evalResult.patterns).toContain('BLACKOUT');
  });
});
