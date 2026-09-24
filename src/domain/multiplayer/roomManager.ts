import { PublicRoom, RoomPrivacy, Player } from '../types';
import { supabase } from '../../lib/supabase';
import { globalModerationService } from '../services/moderationService';

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
  | 'OWN_ROOM'
  | 'ROOM_CLOSED'
  | 'ROOM_EXPIRED'
  | 'NOT_AUTHENTICATED'
  | 'SERVER_ERROR';

export function getHumanErrorMessage(code: GameErrorCode): string {
  switch (code) {
    case 'NETWORK_UNAVAILABLE':
      return 'Unable to connect. Please check your network and try again.';
    case 'ROOM_NOT_FOUND':
      return 'Room not found. Check the code and try again.';
    case 'ROOM_FULL':
      return 'This room is full.';
    case 'ROOM_STARTED':
      return 'Match in this room is already in progress or concluded.';
    case 'INVALID_ROOM_CODE':
      return 'Please enter a valid room code.';
    case 'UNAUTHORIZED':
      return 'Incorrect room password.';
    case 'SESSION_EXPIRED':
      return 'This room session has expired.';
    case 'GAME_STATE_CONFLICT':
      return 'Game state conflict detected. Re-synchronizing room...';
    case 'ALREADY_JOINED':
      return 'You are already in this room.';
    case 'HOST_DISCONNECTED':
      return 'The room host has disconnected.';
    case 'OWN_ROOM':
      return 'You already own this room.';
    case 'ROOM_CLOSED':
      return 'This room has been closed.';
    case 'ROOM_EXPIRED':
      return 'This room has expired.';
    case 'NOT_AUTHENTICATED':
      return 'Please log in to join a room.';
    case 'SERVER_ERROR':
    default:
      return 'Unable to join the room. Please try again.';
  }
}

/**
 * Validates room code formatting before server lookup:
 * - Empty check
 * - Length check (5 to 6 characters, e.g. AB7K2)
 * - Alphanumeric character validation
 */
export function validateRoomCodeFormat(code: string): { valid: boolean; error?: string } {
  const trimmed = (code || '').trim();
  if (!trimmed) {
    return { valid: false, error: 'Enter a room code.' };
  }
  const clean = trimmed.replace(/[#\s\-]/g, '').toUpperCase();
  // Check invalid characters
  if (!/^[A-Z0-9]+$/.test(clean)) {
    return { valid: false, error: 'Room code contains invalid characters.' };
  }
  if (clean.length < 5) {
    return { valid: false, error: 'Enter a valid room code.' };
  }
  return { valid: true };
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
  constructor() {}

  public async getAvailablePublicRooms(): Promise<PublicRoom[]> {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('privacy', 'open')
      .eq('status', 'WAITING')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching public rooms:', error);
      return [];
    }

    return (data || []).map((row) => ({
      id: row.id,
      name: row.name,
      privacy: row.privacy as RoomPrivacy,
      passwordHash: row.password_hash,
      hostId: row.host_id,
      hostName: row.host_name,
      playerCount: row.player_count,
      maxPlayers: row.max_players,
      status: row.status as any,
      createdAt: new Date(row.created_at).getTime(),
      ticketPrice: row.ticket_price,
      jackpotAmount: row.jackpot_amount,
      recommendedTickets: [1, 2, 4, 8],
    }));
  }

  public async createRoom(
    name: string,
    host: Player,
    privacy: RoomPrivacy = 'open',
    password?: string
  ): Promise<PublicRoom> {
    const rawName = name.trim() || 'Custom Arena';

    // Content Safety & Moderation Filter
    const filterRes = globalModerationService.filterContent(rawName);
    if (filterRes.isObjectionable) {
      throw new Error(`Room name rejected by safety filter: ${filterRes.reason || 'Prohibited content'}`);
    }

    const roomId = generateRoomId();
    const passwordHashStr = password && password.trim().length > 0 ? hashPassword(password.trim()) : null;

    const insertPayload = {
        id: roomId,
        name: rawName,
        privacy: privacy,
        password_hash: passwordHashStr,
        host_id: host.id,
        host_name: host.name,
        player_count: 1,
        max_players: 2,
        status: 'WAITING',
        ticket_price: 2.0,
        jackpot_amount: 50000,
      };
    console.log('[RoomManager] Creating room with payload:', insertPayload);

    const { data, error } = await supabase
      .from('rooms')
      .insert(insertPayload)
      .select()
      .maybeSingle();

    if (error) {
      console.error('[RoomManager] Error creating room in Supabase:', error);
      throw new Error(error.message);
    }

    if (!data) {
      console.error('[RoomManager] Insert returned no data. Room may not have been created. Check RLS policies.');
      throw new Error('Room creation failed - no data returned. Please check your Supabase RLS policies.');
    }

    console.log('[RoomManager] Room created successfully:', data);

    return {
      id: data.id,
      name: data.name,
      privacy: data.privacy as RoomPrivacy,
      passwordHash: data.password_hash || undefined,
      hostId: data.host_id,
      hostName: data.host_name,
      playerCount: data.player_count,
      maxPlayers: data.max_players,
      status: data.status as any,
      createdAt: new Date(data.created_at).getTime(),
      ticketPrice: data.ticket_price,
      jackpotAmount: data.jackpot_amount,
      recommendedTickets: [1, 2, 4, 8],
    };
  }

  public async joinRoom(
    roomId: string,
    player: Player,
    password?: string
  ): Promise<{ success: boolean; error?: string; errorCode?: GameErrorCode; room?: PublicRoom }> {
    const cleanId = sanitizeRoomCode(roomId);
    if (!cleanId || cleanId.length < 6) {
      return {
        success: false,
        error: getHumanErrorMessage('INVALID_ROOM_CODE'),
        errorCode: 'INVALID_ROOM_CODE',
      };
    }

    console.log('[RoomManager] Looking up room:', cleanId);
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('id', cleanId)
      .maybeSingle();

    if (error) {
      console.error('[RoomManager] Error looking up room:', error);
      return {
        success: false,
        error: getHumanErrorMessage('ROOM_NOT_FOUND'),
        errorCode: 'ROOM_NOT_FOUND',
      };
    }

    if (!data) {
      console.warn('[RoomManager] Room not found in database:', cleanId);
      return {
        success: false,
        error: getHumanErrorMessage('ROOM_NOT_FOUND'),
        errorCode: 'ROOM_NOT_FOUND',
      };
    }

    const room: PublicRoom = {
      id: data.id,
      name: data.name,
      privacy: data.privacy as RoomPrivacy,
      passwordHash: data.password_hash || undefined,
      hostId: data.host_id,
      hostName: data.host_name,
      playerCount: data.player_count,
      maxPlayers: data.max_players,
      status: data.status as any,
      createdAt: new Date(data.created_at).getTime(),
      ticketPrice: data.ticket_price,
      jackpotAmount: data.jackpot_amount,
      recommendedTickets: [1, 2, 4, 8],
    };

    if (player.id === room.hostId) {
      return {
        success: false,
        error: getHumanErrorMessage('OWN_ROOM'),
        errorCode: 'OWN_ROOM',
      };
    }

    if (room.playerCount >= room.maxPlayers) {
      return {
        success: false,
        error: getHumanErrorMessage('ROOM_FULL'),
        errorCode: 'ROOM_FULL',
      };
    }

    if (room.status === 'CLOSED') {
      return {
        success: false,
        error: getHumanErrorMessage('ROOM_CLOSED'),
        errorCode: 'ROOM_CLOSED',
      };
    }

    if (room.status === 'EXPIRED') {
      return {
        success: false,
        error: getHumanErrorMessage('ROOM_EXPIRED'),
        errorCode: 'ROOM_EXPIRED',
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

    // Increment player count in Supabase optimistically
    await supabase.from('rooms').update({ player_count: room.playerCount + 1 }).eq('id', room.id);
    room.playerCount += 1;
    if (room.playerCount === room.maxPlayers) {
      room.status = 'READY';
      await supabase.from('rooms').update({ status: 'READY' }).eq('id', room.id);
    }

    return { success: true, room };
  }

  public async updateRoomStatus(roomId: string, status: string) {
    await supabase.from('rooms').update({ status }).eq('id', roomId);
  }

  public async getLiveOnlinePlayerCount(): Promise<number | null> {
    // Ideally query presence from Supabase, but return a fallback or null for now
    return null;
  }
}

export const globalRoomManager = new RoomManager();
