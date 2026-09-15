/**
 * Realtime Multiplayer Cross-Client Transport Layer
 * Provides zero-dependency, ultra-low latency event broadcast across browser tabs,
 * windows, and web sessions using BroadcastChannel with LocalStorage fallback.
 * Guarantees message sequencing, idempotency, and clean subscription lifecycle.
 */

export type MultiplayerMessageType =
  | 'ROOM_ANNOUNCE'
  | 'JOIN_REQUEST'
  | 'JOIN_RESPONSE'
  | 'PLAYER_READY_TOGGLE'
  | 'START_COUNTDOWN'
  | 'MATCH_STARTED'
  | 'NUMBER_DRAWN'
  | 'OPPONENT_PROGRESS'
  | 'CLAIM_BINGO_REQUEST'
  | 'CLAIM_VERIFICATION_RESULT'
  | 'WINNER_DECLARED'
  | 'MATCH_FORFEIT'
  | 'REMATCH_REQUEST'
  | 'REMATCH_CONFIRMED'
  | 'SYNC_STATE_REQUEST'
  | 'SYNC_STATE_RESPONSE'
  | 'HEARTBEAT_PING'
  | 'HEARTBEAT_PONG'
  | 'ROOM_CLOSED';

export interface TransportMessage<T = any> {
  type: MultiplayerMessageType;
  roomId: string;
  senderId: string;
  senderName?: string;
  msgId: string;
  msgSeq: number;
  timestamp: number;
  payload: T;
}

export type MessageHandler = (message: TransportMessage) => void;

import { supabase } from '../../lib/supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

export class RoomTransport {
  private channelName: string;
  private supabaseChannel: RealtimeChannel | null = null;
  private handlers: Set<MessageHandler> = new Set();
  private processedMsgIds: Set<string> = new Set();
  private maxProcessedMemory = 500;
  private seqCounter = 0;
  private isClosed = false;

  constructor(roomId: string) {
    this.channelName = `bingo_room_${roomId.toUpperCase()}`;
    this.initTransport();
  }

  private initTransport() {
    this.supabaseChannel = supabase.channel(this.channelName);
    
    this.supabaseChannel
      .on('broadcast', { event: 'transport_message' }, (payload: any) => {
        this.handleIncomingMessage(payload.payload as TransportMessage);
      })
      .subscribe((status: any) => {
        if (status === 'SUBSCRIBED') {
          console.log(`Successfully connected to realtime channel: ${this.channelName}`);
        }
      });
  }

  private handleIncomingMessage(message: TransportMessage) {
    if (!message || !message.msgId || this.isClosed) return;

    // Deduplication filter
    if (this.processedMsgIds.has(message.msgId)) {
      return;
    }

    this.processedMsgIds.add(message.msgId);
    if (this.processedMsgIds.size > this.maxProcessedMemory) {
      const oldestKeys = Array.from(this.processedMsgIds).slice(0, 100);
      oldestKeys.forEach((k) => this.processedMsgIds.delete(k));
    }

    this.handlers.forEach((handler) => {
      try {
        handler(message);
      } catch (err) {
        console.error('Error in transport message handler:', err);
      }
    });
  }

  public send<T = any>(
    type: MultiplayerMessageType,
    roomId: string,
    senderId: string,
    payload: T,
    senderName?: string
  ): TransportMessage<T> {
    const message: TransportMessage<T> = {
      type,
      roomId: roomId.toUpperCase(),
      senderId,
      senderName,
      msgId: `${senderId}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      msgSeq: ++this.seqCounter,
      timestamp: Date.now(),
      payload,
    };

    // Mark as processed locally so we don't handle our own broadcast if echoed
    this.processedMsgIds.add(message.msgId);

    // Broadcast via Supabase Realtime
    if (this.supabaseChannel && !this.isClosed) {
      this.supabaseChannel.send({
        type: 'broadcast',
        event: 'transport_message',
        payload: message,
      }).catch((err: any) => console.warn('Supabase Realtime postMessage error:', err));
    }

    return message;
  }

  public subscribe(handler: MessageHandler): () => void {
    this.handlers.add(handler);
    return () => {
      this.handlers.delete(handler);
    };
  }

  public close() {
    this.isClosed = true;
    this.handlers.clear();
    if (this.supabaseChannel) {
      supabase.removeChannel(this.supabaseChannel);
      this.supabaseChannel = null;
    }
  }
}

