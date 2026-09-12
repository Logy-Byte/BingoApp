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
    };

    this.rooms.set(roomId, room);
    return room;
  }

  public joinRoom(
    roomId: string,
    player: Player,
    password?: string
  ): { success: boolean; error?: string; room?: PublicRoom } {
    const cleanId = roomId.trim().toUpperCase();
    const room = this.rooms.get(cleanId);

    if (!room) {
      return { success: false, error: 'Room not found. Please verify the 6-character room code.' };
    }

    if (room.playerCount >= room.maxPlayers) {
      return { success: false, error: 'Room is already full.' };
    }

    if (room.status !== 'WAITING') {
      return { success: false, error: 'Match in this room is already in progress or concluded.' };
    }

    if (room.privacy === 'password') {
      if (!password || hashPassword(password.trim()) !== room.passwordHash) {
        return { success: false, error: 'Incorrect room password.' };
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
