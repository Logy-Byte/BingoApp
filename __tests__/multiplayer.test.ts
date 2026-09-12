import { RoomManager, generateRoomId, hashPassword } from '../src/domain/multiplayer/roomManager';
import { AntiCheatValidator } from '../src/domain/multiplayer/antiCheatValidator';
import { generate5x5Board } from '../src/domain/engine/gridGameEngine';
import { Player } from '../src/domain/types';

describe('Multiplayer & Anti-Cheat Validation Test Suite', () => {
  describe('RoomManager Lifecycle', () => {
    let roomManager: RoomManager;
    const testPlayer: Player = {
      id: 'host-1',
      name: 'Commander',
      avatar: 'CM',
      isHost: true,
      isReady: true,
      score: 0,
      linesCompleted: 0,
      hasWon: false,
      rating: 1500,
      tier: 'Diamond',
    };

    beforeEach(() => {
      roomManager = new RoomManager();
    });

    test('generates 6-character room codes with alphanumeric entropy', () => {
      const code = generateRoomId();
      expect(code.length).toBe(6);
      expect(/^[A-Z0-9]{6}$/.test(code)).toBe(true);
    });

    test('creates open room with valid host assignment', () => {
      const room = roomManager.createRoom('Alpha Arena', testPlayer, 'open');

      expect(room.id.length).toBe(6);
      expect(room.hostId).toBe('host-1');
      expect(room.playerCount).toBe(1);
      expect(room.privacy).toBe('open');
      expect(room.status).toBe('WAITING');
    });

    test('creates and enforces password-protected rooms', () => {
      const room = roomManager.createRoom(
        'Secret Room',
        testPlayer,
        'password',
        'TopSecretPass'
      );

      expect(room.privacy).toBe('password');
      expect(room.passwordHash).toBeDefined();

      // Joining with wrong password must fail
      const joinWrong = roomManager.joinRoom(
        room.id,
        { ...testPlayer, id: 'p-2', name: 'Infiltrator' },
        'WrongPass'
      );
      expect(joinWrong.success).toBe(false);
      expect(joinWrong.error).toContain('Incorrect room password');

      // Joining with correct password must succeed
      const joinCorrect = roomManager.joinRoom(
        room.id,
        { ...testPlayer, id: 'p-3', name: 'Ally' },
        'TopSecretPass'
      );
      expect(joinCorrect.success).toBe(true);
      expect(joinCorrect.room?.playerCount).toBe(2);
    });

    test('prevents joining full rooms beyond capacity', () => {
      const room = roomManager.createRoom('Duel', testPlayer, 'open'); // Max 2 players

      roomManager.joinRoom(room.id, { ...testPlayer, id: 'p2', name: 'P2' });
      const joinThird = roomManager.joinRoom(room.id, { ...testPlayer, id: 'p3', name: 'P3' });

      expect(joinThird.success).toBe(false);
      expect(joinThird.error).toContain('full');
    });

    test('online player telemetry returns null when standalone without fake numbers', () => {
      const count = roomManager.getLiveOnlinePlayerCount();
      expect(count).toBeNull();
    });
  });

  describe('AntiCheatValidator 5x5 Authoritative Verification', () => {
    test('rejects claims where cell was not drawn by authoritative caller', () => {
      const board = generate5x5Board('b-anti-cheat', 'seed-test', false);
      const calledNumbers = [99]; // unrelated number not on card or in 1-25

      const claim = {
        playerId: 'p1',
        boardId: board.id,
        patternId: 'ROW_0',
      };

      const result = AntiCheatValidator.validateClaim(claim, board, calledNumbers);
      expect(result.isValid).toBe(false);
      expect(result.reason).toContain('has not been called');
    });

    test('accepts valid claim when all pattern cells match called history and are marked', () => {
      const board = generate5x5Board('b-valid-cheat', 'seed-test', false);
      const row0Numbers = board.matrix[0].map((c) => c.value);

      board.matrix[0].forEach((c) => {
        c.state = 'MARKED';
      });

      const claim = {
        playerId: 'p1',
        boardId: board.id,
        patternId: 'ROW_0',
      };

      const result = AntiCheatValidator.validateClaim(claim, board, row0Numbers);
      expect(result.isValid).toBe(true);
    });
  });
});
