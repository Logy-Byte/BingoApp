import { PublicRoom, RoomPrivacy, Player } from '../types';

export function generateRoomId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // omit ambiguous 0, O, 1, I
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function hashPassword(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    hash = (hash << 5) - hash + password.charCodeAt(i);
    hash |= 0;
  }
  return `hash_${Math.abs(hash).toString(16)}`;
}

export type GameErrorCode =
  | 'NETWORK_UNAVAILABLE'
  | 'ROOM_NOT_FOUND'
  | 'ROOM_FULL'
  | 'ROOM_STARTED'
  | 'INVALID_ROOM_CODE'
  | 'UNAUTHORIZED'
  | 'SESSION_EXPIRED'
  | 'GAME_STATE_CONFLICT'
  | 'ALREADY_JOINED'
  | 'HOST_DISCONNECTED'
  | 'SERVER_ERROR';

export function getHumanErrorMessage(code: GameErrorCode): string {
  switch (code) {
    case 'NETWORK_UNAVAILABLE':
      return 'Network connection unavailable. Please check your internet connection.';
    case 'ROOM_NOT_FOUND':
      return 'Room not found. Please verify the 6-character room code.';
    case 'ROOM_FULL':
      return 'Room is already full.';
    case 'ROOM_STARTED':
      return 'Match in this room is already in progress or concluded.';
    case 'INVALID_ROOM_CODE':
      return 'Invalid room code format. Room codes consist of 6 alphanumeric characters.';
    case 'UNAUTHORIZED':
      return 'Incorrect room password.';
    case 'SESSION_EXPIRED':
      return 'Your game session has expired. Please return to the lobby.';
    case 'GAME_STATE_CONFLICT':
      return 'Game state conflict detected. Re-synchronizing board...';
    case 'ALREADY_JOINED':
      return 'You are already connected to this room.';
    case 'HOST_DISCONNECTED':
      return 'The room host has disconnected from the match.';
    case 'SERVER_ERROR':
    default:
      return 'A server communication error occurred. Please try again.';
  }
}

/**
 * Normalizes user-entered room codes:
 * - Trims whitespace
 * - Strips leading hashes '#' or dashes '-'
 * - Eliminates spaces
 * - Converts to uppercase
 */
export function sanitizeRoomCode(input: string): string {
  if (!input) return '';
  return input
    .replace(/[#\s\-]/g, '')
    .trim()
    .toUpperCase()
    .slice(0, 6);
}

export class RoomManager {
  private rooms: Map<string, PublicRoom> = new Map();

  // No fake mock rooms - starts strictly empty or real
  constructor() {}

  public getAvailablePublicRooms(): PublicRoom[] {
    return Array.from(this.rooms.values()).filter(
      (r) => r.privacy === 'open' && r.status === 'WAITING'
    );
  }

  public createRoom(
    name: string,
    host: Player,
    privacy: RoomPrivacy = 'open',
    password?: string
  ): PublicRoom {
    const roomId = generateRoomId();
    const room: PublicRoom = {
      id: roomId,
      name: name.trim() || 'Custom Arena',
      privacy,
      passwordHash: password && password.trim().length > 0 ? hashPassword(password.trim()) : undefined,
      hostId: host.id,
      hostName: host.name,
      playerCount: 1,
      maxPlayers: 2,
      status: 'WAITING',
      createdAt: Date.now(),
      ticketPrice: 2.0,
      jackpotAmount: 50000,
      recommendedTickets: [1, 2, 4, 8],
    };

    this.rooms.set(roomId, room);
    return room;
  }

  public joinRoom(
    roomId: string,
    player: Player,
    password?: string
  ): { success: boolean; error?: string; errorCode?: GameErrorCode; room?: PublicRoom } {
    const cleanId = sanitizeRoomCode(roomId);
    if (!cleanId || cleanId.length < 6) {
      return {
        success: false,
        error: getHumanErrorMessage('INVALID_ROOM_CODE'),
        errorCode: 'INVALID_ROOM_CODE',
      };
    }

    const room = this.rooms.get(cleanId);

    if (!room) {
      return {
        success: false,
        error: getHumanErrorMessage('ROOM_NOT_FOUND'),
        errorCode: 'ROOM_NOT_FOUND',
      };
    }

    if (room.playerCount >= room.maxPlayers) {
      return {
        success: false,
        error: getHumanErrorMessage('ROOM_FULL'),
        errorCode: 'ROOM_FULL',
      };
    }

    if (room.status !== 'WAITING') {
      return {
        success: false,
        error: getHumanErrorMessage('ROOM_STARTED'),
        errorCode: 'ROOM_STARTED',
      };
    }

    if (room.privacy === 'password') {
      if (!password || hashPassword(password.trim()) !== room.passwordHash) {
        return {
          success: false,
          error: getHumanErrorMessage('UNAUTHORIZED'),
          errorCode: 'UNAUTHORIZED',
        };
      }
    }

    room.playerCount += 1;
    if (room.playerCount === room.maxPlayers) {
      room.status = 'READY';
    }

    return { success: true, room };
  }

  /**
   * Returns null if no live backend telemetry is connected.
   * Never fakes or fabricates online player counts.
   */
  public getLiveOnlinePlayerCount(): number | null {
    // In local standalone mode without backend server socket, return null
    return null;
  }
}

export const globalRoomManager = new RoomManager();
