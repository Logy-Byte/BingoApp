import { MatchmakingService } from '../src/domain/multiplayer/matchmakingService';
import { Player, MatchmakingStatus } from '../src/domain/types';

describe('MatchmakingService Unit & Concurrency Suite', () => {
  let service: MatchmakingService;

  const playerA: Player = {
    id: 'user-alpha-111',
    name: 'Alpha Commander',
    avatar: 'AC',
    isHost: false,
    isReady: false,
    score: 0,
    linesCompleted: 0,
    hasWon: false,
    rating: 1550,
    tier: 'Diamond',
    coins: 5000,
    gems: 100,
  };

  const playerB: Player = {
    id: 'user-bravo-222',
    name: 'Bravo Striker',
    avatar: 'BS',
    isHost: false,
    isReady: false,
    score: 0,
    linesCompleted: 0,
    hasWon: false,
    rating: 1480,
    tier: 'Platinum',
    coins: 3000,
    gems: 50,
  };

  beforeEach(() => {
    service = MatchmakingService.getInstance();
  });

  afterEach(async () => {
    await service.cancelMatchmaking();
  });

  test('creates authoritative ticket with searching and waiting status', async () => {
    const statuses: MatchmakingStatus[] = [];

    const ticket = await service.requestRandomMatch(playerA, 'RANKED', {
      onStatusChange: (status) => statuses.push(status),
      onOpponentFound: jest.fn(),
    });

    expect(ticket).not.toBeNull();
    expect(ticket!.userId).toBe(playerA.id);
    expect(ticket!.ticketId).toContain(playerA.id);
    expect(ticket!.expiresAt).toBeGreaterThan(Date.now());
    expect(statuses).toContain('SEARCHING');
  });

  test('cancellation cleanly marks ticket CANCELLED and resets search state', async () => {
    const statuses: MatchmakingStatus[] = [];

    await service.requestRandomMatch(playerA, 'RANKED', {
      onStatusChange: (status) => statuses.push(status),
      onOpponentFound: jest.fn(),
    });

    await service.cancelMatchmaking();

    expect(service.getCurrentTicket()).toBeNull();
    expect(statuses).toContain('CANCELLED');
  });

  test('rejects self-matching if incoming ticket has same userId', async () => {
    let opponentFound = false;

    await service.requestRandomMatch(playerA, 'RANKED', {
      onStatusChange: jest.fn(),
      onOpponentFound: () => {
        opponentFound = true;
      },
    });

    // Simulate incoming ticket from self
    const duplicateTicket = {
      ticketId: 'ticket-self-999',
      userId: playerA.id,
      playerName: playerA.name,
      playerAvatar: playerA.avatar,
      playerRating: playerA.rating,
      playerTier: playerA.tier,
      gameMode: 'RANKED' as const,
      status: 'SEARCHING' as const,
      createdAt: Date.now(),
      expiresAt: Date.now() + 60000,
    };

    (service as any).handleIncomingTicket(duplicateTicket);

    expect(opponentFound).toBe(false);
  });

  test('deterministically pairs two compatible players and triggers onOpponentFound', async () => {
    let matchedOpponent: Player | null = null;
    let sessionId: string | null = null;

    await service.requestRandomMatch(playerA, 'RANKED', {
      onStatusChange: jest.fn(),
      onOpponentFound: (opponent, session) => {
        matchedOpponent = opponent;
        sessionId = session;
      },
    });

    // Simulate incoming ticket from Player B (user-bravo-222)
    // Note: user-alpha-111 < user-bravo-222, so Player A is the designated Host/Room Creator
    const ticketB = {
      ticketId: 'ticket-bravo-001',
      userId: playerB.id,
      playerName: playerB.name,
      playerAvatar: playerB.avatar,
      playerRating: playerB.rating,
      playerTier: playerB.tier,
      gameMode: 'RANKED' as const,
      status: 'WAITING_FOR_PLAYER' as const,
      createdAt: Date.now(),
      expiresAt: Date.now() + 60000,
    };

    (service as any).handleIncomingTicket(ticketB);

    expect(matchedOpponent).not.toBeNull();
    expect((matchedOpponent as any)?.name).toBe('Bravo Striker');
    expect((matchedOpponent as any)?.id).toBe(playerB.id);
    expect(sessionId).toContain('match-user-user-');
  });
});
