import { AuthoritativeRoomServer } from '../src/domain/multiplayer/authoritativeRoomServer';
import { RoomTransport } from '../src/domain/multiplayer/transport';
import { Player, PublicRoom } from '../src/domain/types';

describe('AuthoritativeRoomServer Controller Suite', () => {
  let hostTransport: RoomTransport;
  let guestTransport: RoomTransport;
  let server: AuthoritativeRoomServer;
  const roomId = 'ROOM99';

  const hostPlayer: Player = {
    id: 'host-1',
    name: 'Host Commander',
    avatar: 'HC',
    isHost: true,
    isReady: true,
    score: 0,
    linesCompleted: 0,
    hasWon: false,
    rating: 1500,
    tier: 'Platinum',
  };

  const guestPlayer: Player = {
    id: 'guest-2',
    name: 'Guest Challenger',
    avatar: 'GC',
    isHost: false,
    isReady: false,
    score: 0,
    linesCompleted: 0,
    hasWon: false,
    rating: 1400,
    tier: 'Gold',
  };

  const roomConfig: PublicRoom = {
    id: roomId,
    name: 'Authoritative Test Arena',
    privacy: 'open',
    hostId: hostPlayer.id,
    hostName: hostPlayer.name,
    playerCount: 1,
    maxPlayers: 2,
    status: 'WAITING',
    createdAt: Date.now(),
  };

  beforeEach(() => {
    hostTransport = new RoomTransport(roomId);
    guestTransport = new RoomTransport(roomId);
    server = new AuthoritativeRoomServer(roomConfig, hostPlayer, hostTransport);
  });

  afterEach(() => {
    server.destroy();
    hostTransport.close();
    guestTransport.close();
  });

  test('initializes with host registered and status WAITING', () => {
    const snapshot = server.getSnapshot();
    expect(snapshot.room.id).toBe(roomId);
    expect(snapshot.players.length).toBe(1);
    expect(snapshot.players[0].id).toBe(hostPlayer.id);
    expect(snapshot.status).toBe('WAITING');
    expect(snapshot.drawnNumbers.length).toBe(0);
  });

  test('handles guest JOIN_REQUEST and registers guest into authoritative room snapshot', (done) => {
    guestTransport.subscribe((msg) => {
      if (msg.type === 'JOIN_RESPONSE' && msg.payload.targetPlayerId === guestPlayer.id) {
        expect(msg.payload.success).toBe(true);
        expect(msg.payload.snapshot.players.length).toBe(2);
        expect(msg.payload.board).toBeDefined();
        expect(msg.payload.board.matrix.length).toBe(5);

        // Verify server snapshot state
        const s = server.getSnapshot();
        expect(s.players.length).toBe(2);
        done();
      }
    });

    guestTransport.send('JOIN_REQUEST', roomId, guestPlayer.id, { player: guestPlayer });
  });

  test('handles ready toggling and updates authoritative player state', (done) => {
    guestTransport.send('JOIN_REQUEST', roomId, guestPlayer.id, { player: guestPlayer });

    setTimeout(() => {
      // Toggle guest ready
      guestTransport.send('PLAYER_READY_TOGGLE', roomId, guestPlayer.id, {
        playerId: guestPlayer.id,
        isReady: true,
      });

      setTimeout(() => {
        const snapshot = server.getSnapshot();
        const p2 = snapshot.players.find((p) => p.id === guestPlayer.id);
        expect(p2?.isReady).toBe(true);
        done();
      }, 50);
    }, 50);
  });

  test('prevents non-host from starting match', () => {
    // Non-host sends start countdown
    guestTransport.send('START_COUNTDOWN', roomId, guestPlayer.id, { seconds: 3 });

    const snapshot = server.getSnapshot();
    expect(snapshot.status).toBe('WAITING');
  });

  test('rejects join if room is full', (done) => {
    // Join guest 1
    guestTransport.send('JOIN_REQUEST', roomId, guestPlayer.id, { player: guestPlayer });

    setTimeout(() => {
      const thirdPlayer: Player = { ...guestPlayer, id: 'p3', name: 'Third' };
      const transport3 = new RoomTransport(roomId);

      transport3.subscribe((msg) => {
        if (msg.type === 'JOIN_RESPONSE' && msg.payload.targetPlayerId === 'p3') {
          expect(msg.payload.success).toBe(false);
          expect(msg.payload.error).toContain('full');
          transport3.close();
          done();
        }
      });

      transport3.send('JOIN_REQUEST', roomId, 'p3', { player: thirdPlayer });
    }, 50);
  });

  test('authoritatively verifies winning claim and freezes game', (done) => {
    // Join guest
    guestTransport.send('JOIN_REQUEST', roomId, guestPlayer.id, { player: guestPlayer });

    setTimeout(() => {
      const board = server.getPlayerBoard(guestPlayer.id);

      // Force row 0 to be completed and called
      const row0Numbers = board.matrix[0].map((c) => c.value);
      (server as any).drawnNumbers = [...row0Numbers];
      (server as any).room.status = 'ACTIVE';

      // Mark row 0
      board.matrix[0].forEach((c) => {
        c.state = 'MARKED';
      });

      guestTransport.subscribe((msg) => {
        if (msg.type === 'WINNER_DECLARED') {
          expect(msg.payload.winnerId).toBe(guestPlayer.id);
          expect(msg.payload.winnerName).toBe(guestPlayer.name);
          expect(server.getSnapshot().status).toBe('RESULT');
          done();
        }
      });

      // Guest submits claim
      guestTransport.send('CLAIM_BINGO_REQUEST', roomId, guestPlayer.id, {
        playerId: guestPlayer.id,
        boardId: board.id,
        patternId: 'ROW_0',
      });
    }, 50);
  });
});
