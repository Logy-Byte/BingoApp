import { RoomTransport } from '../src/domain/multiplayer/transport';

describe('RoomTransport Realtime Broadcast Suite', () => {
  let transportA: RoomTransport;
  let transportB: RoomTransport;
  const roomId = 'TEST99';

  beforeEach(() => {
    transportA = new RoomTransport(roomId);
    transportB = new RoomTransport(roomId);
  });

  afterEach(() => {
    transportA.close();
    transportB.close();
  });

  test('dispatches messages with monotonic sequence numbers and timestamps', () => {
    const msg1 = transportA.send('PLAYER_READY_TOGGLE', roomId, 'p1', { isReady: true });
    const msg2 = transportA.send('PLAYER_READY_TOGGLE', roomId, 'p1', { isReady: false });

    expect(msg1.msgSeq).toBe(1);
    expect(msg2.msgSeq).toBe(2);
    expect(msg1.timestamp).toBeLessThanOrEqual(msg2.timestamp);
    expect(msg1.roomId).toBe(roomId);
  });

  test('subscribes and receives dispatched messages across transport instances', (done) => {
    transportB.subscribe((message) => {
      if (message.type === 'START_COUNTDOWN') {
        expect(message.payload.seconds).toBe(3);
        expect(message.senderId).toBe('host-123');
        done();
      }
    });

    transportA.send('START_COUNTDOWN', roomId, 'host-123', { seconds: 3 });
  });

  test('deduplicates identical message IDs automatically', () => {
    const received: any[] = [];
    transportB.subscribe((m) => received.push(m));

    const message = transportA.send('NUMBER_DRAWN', roomId, 'host-1', { number: 17 });

    // Manually trigger duplicate incoming
    (transportB as any).handleIncomingMessage(message);
    (transportB as any).handleIncomingMessage(message);

    // Should only be processed once
    expect(received.length).toBe(1);
  });
});
