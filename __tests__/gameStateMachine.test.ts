import { GameStateMachine, GameEvent } from '../src/domain/state/gameStateMachine';

describe('GameStateMachine State Transition Suite', () => {
  let sm: GameStateMachine;

  beforeEach(() => {
    sm = new GameStateMachine('IDLE');
  });

  test('executes clean happy path lifecycle: IDLE -> LOBBY -> READY -> START -> PLAY -> WIN -> REMATCH', () => {
    expect(sm.getState()).toBe('IDLE');

    // 1. Create Room
    let res = sm.transition({ type: 'ROOM_CREATED', roomId: 'K9X2P7' });
    expect(res.success).toBe(true);
    expect(sm.getState()).toBe('ROOM_LOBBY');

    // 2. All Players Ready
    res = sm.transition({ type: 'ALL_PLAYERS_READY' });
    expect(res.success).toBe(true);
    expect(sm.getState()).toBe('READY_CHECK');

    // 3. Countdown
    res = sm.transition({ type: 'START_COUNTDOWN', seconds: 3 });
    expect(res.success).toBe(true);
    expect(sm.getState()).toBe('STARTING');

    // 4. Match Started
    res = sm.transition({ type: 'MATCH_STARTED' });
    expect(res.success).toBe(true);
    expect(sm.getState()).toBe('PLAYING');

    // 5. Submit Claim
    res = sm.transition({ type: 'SUBMIT_CLAIM', playerId: 'p-1' });
    expect(res.success).toBe(true);
    expect(sm.getState()).toBe('CLAIM_VERIFYING');

    // 6. Claim Verified
    res = sm.transition({ type: 'CLAIM_VERIFIED', winnerId: 'p-1', winnerName: 'Player One' });
    expect(res.success).toBe(true);
    expect(sm.getState()).toBe('WINNER_DECLARED');

    // 7. Results Concluded
    res = sm.transition({ type: 'GAME_OVER' });
    expect(res.success).toBe(true);
    expect(sm.getState()).toBe('GAME_COMPLETE');

    // 8. Rematch Requested
    res = sm.transition({ type: 'REQUEST_REMATCH' });
    expect(res.success).toBe(true);
    expect(sm.getState()).toBe('REMATCH_LOBBY');
  });

  test('rejects impossible and illegal transitions safely without state corruption', () => {
    // Cannot claim Bingo when in IDLE
    let res = sm.transition({ type: 'SUBMIT_CLAIM', playerId: 'p1' });
    expect(res.success).toBe(false);
    expect(sm.getState()).toBe('IDLE');
    expect(res.error).toContain("cannot be processed from state 'IDLE'");

    // Cannot start match without being in READY_CHECK / LOBBY
    res = sm.transition({ type: 'MATCH_STARTED' });
    expect(res.success).toBe(false);
    expect(sm.getState()).toBe('IDLE');

    // Move to LOBBY
    sm.transition({ type: 'ROOM_CREATED', roomId: 'ABC123' });
    expect(sm.getState()).toBe('ROOM_LOBBY');

    // Cannot claim Bingo while still in LOBBY
    res = sm.transition({ type: 'SUBMIT_CLAIM', playerId: 'p1' });
    expect(res.success).toBe(false);
    expect(sm.getState()).toBe('ROOM_LOBBY');
  });

  test('handles claim rejection safely by returning to PLAYING state', () => {
    sm = new GameStateMachine('PLAYING');

    sm.transition({ type: 'SUBMIT_CLAIM', playerId: 'p-1' });
    expect(sm.getState()).toBe('CLAIM_VERIFYING');

    // False claim rejected
    const res = sm.transition({ type: 'CLAIM_REJECTED', reason: 'Uncalled numbers' });
    expect(res.success).toBe(true);
    expect(sm.getState()).toBe('PLAYING');
  });

  test('handles connection drop and recovery transitions', () => {
    sm = new GameStateMachine('PLAYING');

    // Drop connection
    let res = sm.transition({ type: 'CONNECTION_DROPPED' });
    expect(res.success).toBe(true);
    expect(sm.getState()).toBe('CONNECTION_LOST');

    // Attempt reconnect
    res = sm.transition({ type: 'RECONNECT_ATTEMPT' });
    expect(res.success).toBe(true);
    expect(sm.getState()).toBe('RECONNECTING');

    // Reconnected
    res = sm.transition({ type: 'RECONNECTED' });
    expect(res.success).toBe(true);
    expect(sm.getState()).toBe('PLAYING');
  });
});
