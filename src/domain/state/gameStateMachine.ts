/**
 * Deterministic Game State Machine
 * Formally governs room, match, and claim lifecycles with strict transition guards.
 * Eliminates contradictory states and guarantees recoverable failure modes.
 */

export type GameState =
  | 'IDLE'
  | 'CREATING_ROOM'
  | 'JOINING_ROOM'
  | 'ROOM_LOBBY'
  | 'READY_CHECK'
  | 'STARTING'
  | 'PLAYING'
  | 'CLAIM_PENDING'
  | 'CLAIM_VERIFYING'
  | 'WINNER_DECLARED'
  | 'GAME_COMPLETE'
  | 'REMATCH_LOBBY'
  | 'CONNECTION_LOST'
  | 'RECONNECTING'
  | 'DESYNCHRONIZED';

export type GameEvent =
  | { type: 'START_CREATE_ROOM' }
  | { type: 'ROOM_CREATED'; roomId: string }
  | { type: 'START_JOIN_ROOM' }
  | { type: 'JOIN_SUCCESS'; roomId: string }
  | { type: 'JOIN_FAILED'; error: string }
  | { type: 'PLAYER_JOINED'; playerId: string }
  | { type: 'PLAYER_LEFT'; playerId: string }
  | { type: 'TOGGLE_READY'; playerId: string; isReady: boolean }
  | { type: 'ALL_PLAYERS_READY' }
  | { type: 'PLAYERS_NOT_READY' }
  | { type: 'START_COUNTDOWN'; seconds: number }
  | { type: 'MATCH_STARTED' }
  | { type: 'NUMBER_CALLED'; number: number }
  | { type: 'SUBMIT_CLAIM'; playerId: string }
  | { type: 'CLAIM_VERIFIED'; winnerId: string; winnerName: string }
  | { type: 'CLAIM_REJECTED'; reason: string }
  | { type: 'MATCH_FORFEITED'; winnerId: string }
  | { type: 'GAME_OVER' }
  | { type: 'REQUEST_REMATCH' }
  | { type: 'REMATCH_CONFIRMED' }
  | { type: 'CONNECTION_DROPPED' }
  | { type: 'RECONNECT_ATTEMPT' }
  | { type: 'RECONNECTED' }
  | { type: 'DESYNC_DETECTED' }
  | { type: 'STATE_RECONCILED' }
  | { type: 'LEAVE_ROOM' };

export interface StateMachineContext {
  roomId?: string;
  playerId?: string;
  isHost: boolean;
  playerCount: number;
  allReady: boolean;
  activeTurn?: string;
  winnerId?: string;
  lastError?: string;
}

export class GameStateMachine {
  private currentState: GameState = 'IDLE';
  private previousState: GameState = 'IDLE';
  private listeners: Set<(state: GameState, prev: GameState, event: GameEvent) => void> = new Set();

  constructor(initialState: GameState = 'IDLE') {
    this.currentState = initialState;
    this.previousState = initialState;
  }

  public getState(): GameState {
    return this.currentState;
  }

  public getPreviousState(): GameState {
    return this.previousState;
  }

  /**
   * Deterministic state transition validator.
   */
  public canTransition(event: GameEvent): boolean {
    const s = this.currentState;

    switch (event.type) {
      case 'START_CREATE_ROOM':
        return s === 'IDLE';
      case 'ROOM_CREATED':
        return s === 'CREATING_ROOM' || s === 'IDLE';
      case 'START_JOIN_ROOM':
        return s === 'IDLE';
      case 'JOIN_SUCCESS':
        return s === 'JOINING_ROOM' || s === 'IDLE';
      case 'JOIN_FAILED':
        return s === 'JOINING_ROOM';
      case 'PLAYER_JOINED':
      case 'PLAYER_LEFT':
        return s === 'ROOM_LOBBY' || s === 'READY_CHECK' || s === 'REMATCH_LOBBY';
      case 'TOGGLE_READY':
        return s === 'ROOM_LOBBY' || s === 'READY_CHECK' || s === 'REMATCH_LOBBY';
      case 'ALL_PLAYERS_READY':
        return s === 'ROOM_LOBBY' || s === 'REMATCH_LOBBY';
      case 'PLAYERS_NOT_READY':
        return s === 'READY_CHECK';
      case 'START_COUNTDOWN':
        return s === 'READY_CHECK' || s === 'ROOM_LOBBY';
      case 'MATCH_STARTED':
        return s === 'STARTING';
      case 'NUMBER_CALLED':
        return s === 'PLAYING' || s === 'CLAIM_PENDING';
      case 'SUBMIT_CLAIM':
        return s === 'PLAYING';
      case 'CLAIM_VERIFIED':
        return s === 'CLAIM_VERIFYING' || s === 'CLAIM_PENDING' || s === 'PLAYING';
      case 'CLAIM_REJECTED':
        return s === 'CLAIM_VERIFYING' || s === 'CLAIM_PENDING';
      case 'MATCH_FORFEITED':
        return s === 'PLAYING' || s === 'STARTING' || s === 'CLAIM_PENDING' || s === 'CLAIM_VERIFYING';
      case 'GAME_OVER':
        return s === 'WINNER_DECLARED';
      case 'REQUEST_REMATCH':
        return s === 'GAME_COMPLETE' || s === 'WINNER_DECLARED';
      case 'REMATCH_CONFIRMED':
        return s === 'REMATCH_LOBBY' || s === 'GAME_COMPLETE' || s === 'WINNER_DECLARED';
      case 'CONNECTION_DROPPED':
        return s !== 'IDLE' && s !== 'CONNECTION_LOST';
      case 'RECONNECT_ATTEMPT':
        return s === 'CONNECTION_LOST';
      case 'RECONNECTED':
        return s === 'RECONNECTING' || s === 'CONNECTION_LOST';
      case 'DESYNC_DETECTED':
        return s === 'PLAYING';
      case 'STATE_RECONCILED':
        return s === 'DESYNCHRONIZED';
      case 'LEAVE_ROOM':
        return true; // Any state can leave and return to IDLE
      default:
        return false;
    }
  }

  /**
   * Dispatches an event and executes the transition if valid.
   */
  public transition(event: GameEvent): { success: boolean; newState: GameState; error?: string } {
    if (!this.canTransition(event)) {
      const err = `Invalid transition: Event '${event.type}' cannot be processed from state '${this.currentState}'.`;
      return { success: false, newState: this.currentState, error: err };
    }

    const prev = this.currentState;
    let next: GameState = this.currentState;

    switch (event.type) {
      case 'START_CREATE_ROOM':
        next = 'CREATING_ROOM';
        break;
      case 'ROOM_CREATED':
      case 'JOIN_SUCCESS':
        next = 'ROOM_LOBBY';
        break;
      case 'JOIN_FAILED':
        next = 'IDLE';
        break;
      case 'ALL_PLAYERS_READY':
        next = 'READY_CHECK';
        break;
      case 'PLAYERS_NOT_READY':
        next = 'ROOM_LOBBY';
        break;
      case 'START_COUNTDOWN':
        next = 'STARTING';
        break;
      case 'MATCH_STARTED':
        next = 'PLAYING';
        break;
      case 'SUBMIT_CLAIM':
        next = 'CLAIM_VERIFYING';
        break;
      case 'CLAIM_VERIFIED':
      case 'MATCH_FORFEITED':
        next = 'WINNER_DECLARED';
        break;
      case 'CLAIM_REJECTED':
        next = 'PLAYING';
        break;
      case 'GAME_OVER':
        next = 'GAME_COMPLETE';
        break;
      case 'REQUEST_REMATCH':
      case 'REMATCH_CONFIRMED':
        next = 'REMATCH_LOBBY';
        break;
      case 'CONNECTION_DROPPED':
        next = 'CONNECTION_LOST';
        break;
      case 'RECONNECT_ATTEMPT':
        next = 'RECONNECTING';
        break;
      case 'RECONNECTED':
        next = this.previousState !== 'CONNECTION_LOST' ? this.previousState : 'PLAYING';
        break;
      case 'DESYNC_DETECTED':
        next = 'DESYNCHRONIZED';
        break;
      case 'STATE_RECONCILED':
        next = 'PLAYING';
        break;
      case 'LEAVE_ROOM':
        next = 'IDLE';
        break;
      default:
        break;
    }

    this.previousState = prev;
    this.currentState = next;

    this.listeners.forEach((listener) => {
      try {
        listener(this.currentState, prev, event);
      } catch (e) {
        console.error('State machine listener error:', e);
      }
    });

    return { success: true, newState: this.currentState };
  }

  public subscribe(listener: (state: GameState, prev: GameState, event: GameEvent) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public reset(toState: GameState = 'IDLE') {
    this.previousState = this.currentState;
    this.currentState = toState;
  }
}
