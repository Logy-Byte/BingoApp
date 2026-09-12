/**
 * Authoritative Room Server & Game Controller
 * Owns the authoritative match timeline, player registration, board assignment,
 * ball caller ticker, win claim verification, and rematch synchronization.
 * Runs on the host peer (or backend server) and synchronizes with clients via RoomTransport.
 */

import { PublicRoom, Player, Board5x5 } from '../types';
import { RoomTransport, TransportMessage } from './transport';
import {
  generate5x5Board,
  generate5x5NumberPool,
} from '../engine/gridGameEngine';
import { AntiCheatValidator, WinClaimPayload } from './antiCheatValidator';

export interface AuthoritativeRoomSnapshot {
  room: PublicRoom;
  players: Player[];
  status: PublicRoom['status'];
  drawnNumbers: number[];
  currentCall?: number;
  seed: string;
  winner?: { id: string; name: string } | null;
  matchDurationSec: number;
}

export class AuthoritativeRoomServer {
  private room: PublicRoom;
  private transport: RoomTransport;
  private players: Map<string, Player> = new Map();
  private boards: Map<string, Board5x5> = new Map();
  private seed: string;
  private numberPool: number[] = [];
  private drawnNumbers: number[] = [];
  private callerInterval: any = null;
  private matchStartTime = 0;
  private winner: { id: string; name: string } | null = null;
  private unsubscribeTransport: (() => void) | null = null;
  private isDestroyed = false;

  constructor(room: PublicRoom, hostPlayer: Player, transport: RoomTransport) {
    this.room = { ...room };
    this.transport = transport;
    this.seed = `match-${room.id}-${Date.now()}`;

    // Register host
    const host: Player = {
      ...hostPlayer,
      isHost: true,
      isReady: true,
      score: 0,
      linesCompleted: 0,
      hasWon: false,
    };
    this.players.set(host.id, host);

    // Bind transport message listeners
    this.unsubscribeTransport = this.transport.subscribe(this.handleClientMessage);

    // Broadcast room existence
    this.broadcastRoomAnnounce();
  }

  public getSnapshot(): AuthoritativeRoomSnapshot {
    return {
      room: {
        ...this.room,
        playerCount: this.players.size,
      },
      players: Array.from(this.players.values()),
      status: this.room.status,
      drawnNumbers: [...this.drawnNumbers],
      currentCall: this.drawnNumbers[0],
      seed: this.seed,
      winner: this.winner,
      matchDurationSec: this.matchStartTime > 0 ? Math.floor((Date.now() - this.matchStartTime) / 1000) : 0,
    };
  }

  public getPlayerBoard(playerId: string): Board5x5 {
    if (!this.boards.has(playerId)) {
      const board = generate5x5Board(`b-${playerId}`, `${this.seed}-${playerId}`, false);
      this.boards.set(playerId, board);
    }
    return this.boards.get(playerId)!;
  }

  private broadcastRoomAnnounce() {
    this.transport.send('ROOM_ANNOUNCE', this.room.id, this.room.hostId, this.getSnapshot(), this.room.hostName);
  }

  private handleClientMessage = (message: TransportMessage) => {
    if (this.isDestroyed || message.roomId !== this.room.id) return;

    switch (message.type) {
      case 'JOIN_REQUEST':
        this.handleJoinRequest(message);
        break;
      case 'PLAYER_READY_TOGGLE':
        this.handleReadyToggle(message);
        break;
      case 'START_COUNTDOWN':
        this.handleStartMatch(message);
        break;
      case 'OPPONENT_PROGRESS':
        this.handleOpponentProgress(message);
        break;
      case 'CLAIM_BINGO_REQUEST':
        this.handleClaimBingo(message);
        break;
      case 'MATCH_FORFEIT':
        this.handleForfeit(message);
        break;
      case 'REMATCH_REQUEST':
        this.handleRematch(message);
        break;
      case 'SYNC_STATE_REQUEST':
        this.handleSyncRequest(message);
        break;
      case 'HEARTBEAT_PING':
        this.transport.send('HEARTBEAT_PONG', this.room.id, this.room.hostId, { timestamp: Date.now() });
        break;
    }
  };

  private handleJoinRequest(message: TransportMessage<{ player: Player; password?: string }>) {
    const { player, password } = message.payload;

    // Check capacity
    if (this.players.size >= this.room.maxPlayers && !this.players.has(player.id)) {
      this.transport.send('JOIN_RESPONSE', this.room.id, this.room.hostId, {
        success: false,
        targetPlayerId: player.id,
        error: 'Room is already full.',
      });
      return;
    }

    // Check match status
    if (this.room.status !== 'WAITING') {
      this.transport.send('JOIN_RESPONSE', this.room.id, this.room.hostId, {
        success: false,
        targetPlayerId: player.id,
        error: 'Match in this room is already in progress or concluded.',
      });
      return;
    }

    // Check password if required
    if (this.room.privacy === 'password' && this.room.passwordHash) {
      // Basic match validation
      if (!password) {
        this.transport.send('JOIN_RESPONSE', this.room.id, this.room.hostId, {
          success: false,
          targetPlayerId: player.id,
          error: 'Password required to join this room.',
        });
        return;
      }
    }

    // Register player
    const newPlayer: Player = {
      ...player,
      isHost: player.id === this.room.hostId,
      isReady: player.id === this.room.hostId, // Host is ready by default
      score: 0,
      linesCompleted: 0,
      hasWon: false,
    };
    this.players.set(newPlayer.id, newPlayer);
    this.room.playerCount = this.players.size;

    // Generate authoritative board for player
    const board = this.getPlayerBoard(newPlayer.id);

    // Respond with success snapshot
    this.transport.send('JOIN_RESPONSE', this.room.id, this.room.hostId, {
      success: true,
      targetPlayerId: newPlayer.id,
      snapshot: this.getSnapshot(),
      board,
    });

    // Notify all peers of updated lobby
    this.broadcastRoomAnnounce();
  }

  private handleReadyToggle(message: TransportMessage<{ playerId: string; isReady: boolean }>) {
    const { playerId, isReady } = message.payload;
    const p = this.players.get(playerId);
    if (p) {
      p.isReady = isReady;
      this.broadcastRoomAnnounce();
    }
  }

  private handleStartMatch(message: TransportMessage) {
    if (message.senderId !== this.room.hostId) {
      return; // Only host can trigger start
    }

    // Verify all non-host players are ready
    const allReady = Array.from(this.players.values()).every((p) => p.isHost || p.isReady);
    if (!allReady || this.players.size < 2) {
      return;
    }

    // Update room status
    this.room.status = 'ACTIVE';
    this.numberPool = generate5x5NumberPool();
    this.drawnNumbers = [];
    this.winner = null;
    this.matchStartTime = Date.now();

    // Broadcast match starting
    this.transport.send('START_COUNTDOWN', this.room.id, this.room.hostId, {
      seconds: 3,
      snapshot: this.getSnapshot(),
    });

    // After 3 seconds, start ball caller interval
    setTimeout(() => {
      if (this.isDestroyed || this.room.status !== 'ACTIVE') return;

      this.transport.send('MATCH_STARTED', this.room.id, this.room.hostId, {
        snapshot: this.getSnapshot(),
      });

      this.startBallCaller();
    }, 3000);
  }

  private startBallCaller() {
    if (this.callerInterval) clearInterval(this.callerInterval);

    this.callerInterval = setInterval(() => {
      if (this.room.status !== 'ACTIVE' || this.isDestroyed) {
        clearInterval(this.callerInterval);
        return;
      }

      if (this.numberPool.length === 0) {
        clearInterval(this.callerInterval);
        return;
      }

      const nextNumber = this.numberPool.shift()!;
      this.drawnNumbers.unshift(nextNumber);

      this.transport.send('NUMBER_DRAWN', this.room.id, this.room.hostId, {
        number: nextNumber,
        drawnNumbers: [...this.drawnNumbers],
        remaining: this.numberPool.length,
        callOrder: this.drawnNumbers.length,
      });
    }, 3500);
  }

  private handleOpponentProgress(message: TransportMessage<{ linesCompleted: number; score: number }>) {
    const p = this.players.get(message.senderId);
    if (p) {
      p.linesCompleted = message.payload.linesCompleted;
      p.score = message.payload.score;
    }
  }

  private handleClaimBingo(message: TransportMessage<WinClaimPayload>) {
    if (this.room.status !== 'ACTIVE') return;

    const claim = message.payload;
    const playerBoard = this.boards.get(claim.playerId);

    if (!playerBoard) {
      this.transport.send('CLAIM_VERIFICATION_RESULT', this.room.id, this.room.hostId, {
        success: false,
        reason: 'Player board not found in server registry.',
        targetPlayerId: claim.playerId,
      });
      return;
    }

    // Authoritative anti-cheat validation
    const result = AntiCheatValidator.validateClaim(claim, playerBoard, this.drawnNumbers);

    if (result.isValid) {
      // Freeze match immediately
      if (this.callerInterval) clearInterval(this.callerInterval);
      this.room.status = 'RESULT';

      const player = this.players.get(claim.playerId);
      const winnerName = player?.name || 'Player';
      this.winner = { id: claim.playerId, name: winnerName };

      if (player) {
        player.hasWon = true;
      }

      // Broadcast victory
      this.transport.send('WINNER_DECLARED', this.room.id, this.room.hostId, {
        winnerId: claim.playerId,
        winnerName,
        validatedPatterns: result.validatedPatterns,
        matchDurationSec: Math.floor((Date.now() - this.matchStartTime) / 1000),
        snapshot: this.getSnapshot(),
      });
    } else {
      this.transport.send('CLAIM_VERIFICATION_RESULT', this.room.id, this.room.hostId, {
        success: false,
        reason: result.reason || 'Invalid win claim.',
        targetPlayerId: claim.playerId,
      });
    }
  }

  private handleForfeit(message: TransportMessage) {
    if (this.callerInterval) clearInterval(this.callerInterval);
    this.room.status = 'RESULT';

    // Other player wins
    const otherPlayer = Array.from(this.players.values()).find((p) => p.id !== message.senderId);
    if (otherPlayer) {
      this.winner = { id: otherPlayer.id, name: otherPlayer.name };
      otherPlayer.hasWon = true;
    }

    this.transport.send('WINNER_DECLARED', this.room.id, this.room.hostId, {
      winnerId: this.winner?.id || 'none',
      winnerName: this.winner?.name || 'Forfeit',
      forfeitedBy: message.senderId,
      snapshot: this.getSnapshot(),
    });
  }

  private handleRematch(message: TransportMessage) {
    if (this.callerInterval) clearInterval(this.callerInterval);

    // Reset room state
    this.room.status = 'WAITING';
    this.seed = `match-${this.room.id}-${Date.now()}`;
    this.numberPool = [];
    this.drawnNumbers = [];
    this.winner = null;
    this.matchStartTime = 0;
    this.boards.clear();

    // Reset players ready state except host
    this.players.forEach((p) => {
      p.hasWon = false;
      p.linesCompleted = 0;
      p.score = 0;
      p.isReady = p.isHost;
    });

    this.transport.send('REMATCH_CONFIRMED', this.room.id, this.room.hostId, {
      snapshot: this.getSnapshot(),
    });

    this.broadcastRoomAnnounce();
  }

  private handleSyncRequest(message: TransportMessage) {
    this.transport.send('SYNC_STATE_RESPONSE', this.room.id, this.room.hostId, {
      targetPlayerId: message.senderId,
      snapshot: this.getSnapshot(),
    });
  }

  public destroy() {
    this.isDestroyed = true;
    if (this.callerInterval) clearInterval(this.callerInterval);
    if (this.unsubscribeTransport) {
      this.unsubscribeTransport();
      this.unsubscribeTransport = null;
    }
  }
}
