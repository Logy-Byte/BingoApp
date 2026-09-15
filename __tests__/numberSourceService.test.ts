import {
  validate25NumberSet,
  createPlayerSequence,
  generate25Numbers,
  getNextPresentationDelay,
} from '../src/domain/services/numberSourceService';

describe('Number Source System & Pacing Service', () => {
  describe('validate25NumberSet', () => {
    test('validates a correct set of 25 unique numbers between 1 and 25', () => {
      const validNumbers = Array.from({ length: 25 }, (_, i) => i + 1);
      const res = validate25NumberSet(validNumbers);
      expect(res.valid).toBe(true);
      expect(res.errors).toHaveLength(0);
    });

    test('rejects arrays with less or more than 25 numbers', () => {
      const tooFew = [1, 2, 3, 4, 5];
      const res = validate25NumberSet(tooFew);
      expect(res.valid).toBe(false);
      expect(res.errors[0]).toContain('Must contain exactly 25 numbers');
    });

    test('detects duplicate numbers', () => {
      const withDuplicates = Array.from({ length: 25 }, (_, i) => i + 1);
      withDuplicates[24] = 1; // Duplicate of 1
      const res = validate25NumberSet(withDuplicates);
      expect(res.valid).toBe(false);
      expect(res.errors.some((e) => e.includes('Duplicate numbers found'))).toBe(true);
    });

    test('detects out-of-range numbers', () => {
      const withOutOfRange = Array.from({ length: 25 }, (_, i) => i + 1);
      withOutOfRange[0] = 0;
      withOutOfRange[1] = 26;
      const res = validate25NumberSet(withOutOfRange);
      expect(res.valid).toBe(false);
      expect(res.errors.some((e) => e.includes('outside valid range'))).toBe(true);
    });
  });

  describe('createPlayerSequence (Fisher-Yates Unbiased Shuffle)', () => {
    const baseNumbers = Array.from({ length: 25 }, (_, i) => i + 1);

    test('does not mutate the original number array', () => {
      const copy = [...baseNumbers];
      createPlayerSequence(copy, 'seed-1');
      expect(copy).toEqual(baseNumbers);
    });

    test('generates different sequences for different seeds', () => {
      const seqA = createPlayerSequence(baseNumbers, 'player-A-seed-xyz');
      const seqB = createPlayerSequence(baseNumbers, 'player-B-seed-abc');

      expect(seqA).toHaveLength(25);
      expect(seqB).toHaveLength(25);
      // Both must contain all 25 numbers
      expect([...seqA].sort((a, b) => a - b)).toEqual(baseNumbers);
      expect([...seqB].sort((a, b) => a - b)).toEqual(baseNumbers);
      // But ordering should differ
      expect(seqA).not.toEqual(seqB);
    });

    test('generates identical deterministic sequence when the same seed is provided', () => {
      const seq1 = createPlayerSequence(baseNumbers, 'seed-determ-42');
      const seq2 = createPlayerSequence(baseNumbers, 'seed-determ-42');
      expect(seq1).toEqual(seq2);
    });
  });

  describe('generate25Numbers', () => {
    test('generates exactly 25 unique numbers 1-25', () => {
      const numbers = generate25Numbers();
      expect(numbers).toHaveLength(25);
      const unique = new Set(numbers);
      expect(unique.size).toBe(25);
      numbers.forEach((n) => {
        expect(n).toBeGreaterThanOrEqual(1);
        expect(n).toBeLessThanOrEqual(25);
      });
    });
  });

  describe('getNextPresentationDelay', () => {
    test('respects min and max presentation timing bounds', () => {
      for (let i = 0; i < 20; i++) {
        const delay = getNextPresentationDelay(2400, 1800, 3200);
        expect(delay).toBeGreaterThanOrEqual(1800);
        expect(delay).toBeLessThanOrEqual(3200);
      }
    });
  });
});
