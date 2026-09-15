import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';
import { RoomPage } from '../src/components/rooms/RoomPage';
import { CreateRoomCard } from '../src/components/rooms/CreateRoomCard';
import { JoinRoomCard } from '../src/components/rooms/JoinRoomCard';
import { RoomCodeInput } from '../src/components/rooms/RoomCodeInput';
import { CopyRoomCodeButton } from '../src/components/rooms/CopyRoomCodeButton';
import { PlayerSlot } from '../src/components/rooms/PlayerSlot';
import { RoomStatus } from '../src/components/rooms/RoomStatus';
import { validateRoomCodeFormat } from '../src/domain/multiplayer/roomManager';
import { Player, PublicRoom } from '../src/domain/types';

describe('Single-Page Room System Component & Integration Suite', () => {
  const hostPlayer: Player = {
    id: 'host-101',
    name: 'HostMaster',
    avatar: 'HM',
    isHost: true,
    isReady: true,
    score: 0,
    linesCompleted: 0,
    hasWon: false,
    rating: 1550,
    tier: 'Platinum',
    coins: 1000,
    gems: 50,
  };

  const guestPlayer: Player = {
    id: 'guest-202',
    name: 'ChallengerTwo',
    avatar: 'CT',
    isHost: false,
    isReady: false,
    score: 0,
    linesCompleted: 0,
    hasWon: false,
    rating: 1420,
    tier: 'Gold',
    coins: 500,
    gems: 20,
  };

  const activeRoom: PublicRoom = {
    id: 'AB7KQ2',
    name: 'Friendly Arena',
    privacy: 'open',
    hostId: hostPlayer.id,
    hostName: hostPlayer.name,
    playerCount: 1,
    maxPlayers: 2,
    status: 'WAITING',
    createdAt: Date.now(),
    ticketPrice: 2.0,
    jackpotAmount: 50000,
    recommendedTickets: [1, 2, 4, 8],
  };

  describe('Validation: validateRoomCodeFormat', () => {
    it('rejects empty input with clean message', () => {
      const res = validateRoomCodeFormat('');
      expect(res.valid).toBe(false);
      expect(res.error).toBe('Enter a room code.');
    });

    it('rejects short room codes (< 6 chars)', () => {
      const res = validateRoomCodeFormat('AB12');
      expect(res.valid).toBe(false);
      expect(res.error).toBe('Enter a valid room code.');
    });

    it('rejects invalid characters', () => {
      const res = validateRoomCodeFormat('AB@!#$');
      expect(res.valid).toBe(false);
      expect(res.error).toBe('Room code contains invalid characters.');
    });

    it('accepts valid 6-character alphanumeric room codes', () => {
      const res = validateRoomCodeFormat('AB7KQ2');
      expect(res.valid).toBe(true);
      expect(res.error).toBeUndefined();
    });
  });

  describe('CreateRoomCard', () => {
    it('renders with button and fires onCreate', () => {
      const onCreateMock = jest.fn();
      let renderer: ReactTestRenderer.ReactTestRenderer;
      act(() => {
        renderer = ReactTestRenderer.create(
          <CreateRoomCard onCreate={onCreateMock} loading={false} />
        );
      });

      const btn = renderer!.root.findByProps({ testID: 'create-room-button' });
      act(() => {
        btn.props.onPress();
      });
      expect(onCreateMock).toHaveBeenCalledTimes(1);
    });

    it('disables button when loading or disabled', () => {
      const onCreateMock = jest.fn();
      let renderer: ReactTestRenderer.ReactTestRenderer;
      act(() => {
        renderer = ReactTestRenderer.create(
          <CreateRoomCard onCreate={onCreateMock} loading={true} />
        );
      });

      const btn = renderer!.root.findByProps({ testID: 'create-room-button' });
      expect(btn.props.disabled).toBe(true);
    });
  });

  describe('JoinRoomCard', () => {
    it('normalizes room code input and triggers onJoin', () => {
      const onJoinMock = jest.fn();
      const onChangeMock = jest.fn();
      let renderer: ReactTestRenderer.ReactTestRenderer;
      act(() => {
        renderer = ReactTestRenderer.create(
          <JoinRoomCard
            value="AB7KQ2"
            onChange={onChangeMock}
            onJoin={onJoinMock}
            loading={false}
          />
        );
      });

      const btn = renderer!.root.findByProps({ testID: 'join-room-button' });
      act(() => {
        btn.props.onPress();
      });
      expect(onJoinMock).toHaveBeenCalledTimes(1);
    });

    it('displays error message clearly if provided', () => {
      let renderer: ReactTestRenderer.ReactTestRenderer;
      act(() => {
        renderer = ReactTestRenderer.create(
          <JoinRoomCard
            value=""
            onChange={jest.fn()}
            onJoin={jest.fn()}
            error="Room not found."
          />
        );
      });

      const text = renderer!.root.findAll((node) => node.props.children === 'Room not found.');
      expect(text.length).toBeGreaterThan(0);
    });
  });

  describe('CopyRoomCodeButton', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    it('renders and toggles copied state without throwing alerts', () => {
      let renderer: ReactTestRenderer.ReactTestRenderer;
      act(() => {
        renderer = ReactTestRenderer.create(
          <CopyRoomCodeButton code="AB7KQ2" />
        );
      });

      const btn = renderer!.root.findByProps({ testID: 'copy-code-button' });
      act(() => {
        btn.props.onPress();
      });

      const copiedText = renderer!.root.findAll((node) => node.props.children === 'Copied');
      expect(copiedText.length).toBeGreaterThan(0);

      act(() => {
        jest.advanceTimersByTime(2100);
      });
    });
  });

  describe('PlayerSlot', () => {
    it('renders host slot with HOST badge and YOU label', () => {
      let renderer: ReactTestRenderer.ReactTestRenderer;
      act(() => {
        renderer = ReactTestRenderer.create(
          <PlayerSlot player={hostPlayer} isHost={true} isCurrentUser={true} />
        );
      });

      expect(renderer!.root.findAll((node) => node.props.children === 'YOU').length).toBeGreaterThan(0);
      expect(renderer!.root.findAll((node) => node.props.children === 'HOST').length).toBeGreaterThan(0);
      expect(renderer!.root.findAll((node) => node.props.children === 'ONLINE').length).toBeGreaterThan(0);
    });

    it('renders awaiting slot when awaiting player', () => {
      let renderer: ReactTestRenderer.ReactTestRenderer;
      act(() => {
        renderer = ReactTestRenderer.create(
          <PlayerSlot isAwaiting />
        );
      });

      expect(
        renderer!.root.findAll((node) => node.props.children === 'WAITING FOR PLAYER').length
      ).toBeGreaterThan(0);
    });
  });

  describe('Single-Page RoomPage State Machine Integration', () => {
    it('renders IDLE state with both Create Room and Join Room cards on one page', () => {
      let renderer: ReactTestRenderer.ReactTestRenderer;
      act(() => {
        renderer = ReactTestRenderer.create(
          <RoomPage
            player={hostPlayer}
            room={null}
            players={[]}
            pageState="IDLE"
            isHost={false}
            canStart={false}
            countdownSeconds={null}
            onCreateRoom={jest.fn()}
            onJoinRoom={jest.fn()}
            onStartMatch={jest.fn()}
            onExitRoom={jest.fn()}
            onBackToRooms={jest.fn()}
            onBackToLobby={jest.fn()}
          />
        );
      });

      expect(renderer!.root.findByProps({ testID: 'create-room-card' })).toBeDefined();
      expect(renderer!.root.findByProps({ testID: 'join-room-card' })).toBeDefined();
    });

    it('renders WAITING state with room code, 1/2 players, Copy button, and Exit Room button', () => {
      const onExitMock = jest.fn();
      let renderer: ReactTestRenderer.ReactTestRenderer;
      act(() => {
        renderer = ReactTestRenderer.create(
          <RoomPage
            player={hostPlayer}
            room={activeRoom}
            players={[hostPlayer]}
            pageState="WAITING"
            isHost={true}
            canStart={false}
            countdownSeconds={null}
            onCreateRoom={jest.fn()}
            onJoinRoom={jest.fn()}
            onStartMatch={jest.fn()}
            onExitRoom={onExitMock}
            onBackToRooms={jest.fn()}
            onBackToLobby={jest.fn()}
          />
        );
      });

      // Shows code AB7KQ2
      expect(renderer!.root.findAll((node) => node.props.children === 'AB7KQ2').length).toBeGreaterThan(0);
      // Shows copy button
      expect(renderer!.root.findByProps({ testID: 'copy-code-button' })).toBeDefined();
      // Shows exit button and fires onExit
      const exitBtn = renderer!.root.findByProps({ testID: 'exit-room-button' });
      act(() => {
        exitBtn.props.onPress();
      });
      expect(onExitMock).toHaveBeenCalledTimes(1);
    });

    it('renders ROOM_READY state when opponent joins (2/2 players) and displays Start Match for host', () => {
      const onStartMock = jest.fn();
      let renderer: ReactTestRenderer.ReactTestRenderer;
      act(() => {
        renderer = ReactTestRenderer.create(
          <RoomPage
            player={hostPlayer}
            room={{ ...activeRoom, playerCount: 2, status: 'READY' }}
            players={[hostPlayer, guestPlayer]}
            pageState="ROOM_READY"
            isHost={true}
            canStart={true}
            countdownSeconds={null}
            onCreateRoom={jest.fn()}
            onJoinRoom={jest.fn()}
            onStartMatch={onStartMock}
            onExitRoom={jest.fn()}
            onBackToRooms={jest.fn()}
            onBackToLobby={jest.fn()}
          />
        );
      });

      const startBtn = renderer!.root.findByProps({ testID: 'start-room-match-button' });
      act(() => {
        startBtn.props.onPress();
      });
      expect(onStartMock).toHaveBeenCalledTimes(1);
    });

    it('renders CLOSED state with Back to Rooms button', () => {
      const onBackToRoomsMock = jest.fn();
      let renderer: ReactTestRenderer.ReactTestRenderer;
      act(() => {
        renderer = ReactTestRenderer.create(
          <RoomPage
            player={hostPlayer}
            room={null}
            players={[]}
            pageState="CLOSED"
            isHost={false}
            canStart={false}
            countdownSeconds={null}
            errorMessage="This room is closed."
            onCreateRoom={jest.fn()}
            onJoinRoom={jest.fn()}
            onStartMatch={jest.fn()}
            onExitRoom={jest.fn()}
            onBackToRooms={onBackToRoomsMock}
            onBackToLobby={jest.fn()}
          />
        );
      });

      expect(renderer!.root.findAll((node) => node.props.children === 'ROOM CLOSED').length).toBeGreaterThan(0);
      const backBtn = renderer!.root.findByProps({ testID: 'back-to-rooms-button' });
      act(() => {
        backBtn.props.onPress();
      });
      expect(onBackToRoomsMock).toHaveBeenCalledTimes(1);
    });
  });
});
