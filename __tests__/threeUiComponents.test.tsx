import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';
import { StatusBadge } from '../src/components/shared/StatusBadge';
import { IconButton } from '../src/components/shared/IconButton';
import { PasswordField } from '../src/components/auth/PasswordField';
import { PlayerHeader } from '../src/components/bingo/PlayerHeader';
import { RandomPlayerCard } from '../src/components/bingo/RandomPlayerCard';
import { RobotPracticeCard } from '../src/components/bingo/RobotPracticeCard';
import { DailyPuzzleCard } from '../src/components/bingo/DailyPuzzleCard';
import { MatchmakingState } from '../src/components/bingo/MatchmakingState';
import { Player } from '../src/domain/types';

describe('Rebuilt ThreeUI-Pattern Components Unit Tests', () => {
  const dummyPlayer: Player = {
    id: 'user-p1',
    name: 'PlayerOne',
    avatar: 'P1',
    isHost: false,
    isReady: true,
    score: 100,
    linesCompleted: 0,
    hasWon: false,
    rating: 1500,
    tier: 'Gold',
    coins: 100,
    gems: 10,
  };

  const dummyOpponent: Player = {
    id: 'user-p2',
    name: 'SpeedyBingo',
    avatar: 'SB',
    isHost: true,
    isReady: true,
    score: 95,
    linesCompleted: 0,
    hasWon: false,
    rating: 1480,
    tier: 'Gold',
    coins: 100,
    gems: 10,
  };

  describe('StatusBadge', () => {
    it('renders human variant with label', () => {
      let renderer: ReactTestRenderer.ReactTestRenderer;
      act(() => {
        renderer = ReactTestRenderer.create(
          <StatusBadge variant="human" label="REAL HUMAN" pulse />
        );
      });
      const root = renderer!.root;
      const text = root.findAll((node) => node.props.children === 'REAL HUMAN');
      expect(text.length).toBeGreaterThan(0);
    });

    it('renders bot and waiting variants', () => {
      let renderer: ReactTestRenderer.ReactTestRenderer;
      act(() => {
        renderer = ReactTestRenderer.create(
          <StatusBadge variant="bot" label="BOT SOLO" />
        );
      });
      expect(renderer!.root.findAll((node) => node.props.children === 'BOT SOLO').length).toBeGreaterThan(0);

      act(() => {
        renderer = ReactTestRenderer.create(
          <StatusBadge variant="waiting" label="LOOKING..." />
        );
      });
      expect(renderer!.root.findAll((node) => node.props.children === 'LOOKING...').length).toBeGreaterThan(0);
    });
  });

  describe('IconButton', () => {
    it('handles press event when enabled', () => {
      const onPressMock = jest.fn();
      let renderer: ReactTestRenderer.ReactTestRenderer;
      act(() => {
        renderer = ReactTestRenderer.create(
          <IconButton icon="🔊" accessibilityLabel="Toggle Sound" onPress={onPressMock} />
        );
      });
      const touchable = renderer!.root.findByProps({ accessibilityLabel: 'Toggle Sound' });
      act(() => {
        touchable.props.onPress();
      });
      expect(onPressMock).toHaveBeenCalledTimes(1);
    });

    it('does not fire press event when disabled', () => {
      const onPressMock = jest.fn();
      let renderer: ReactTestRenderer.ReactTestRenderer;
      act(() => {
        renderer = ReactTestRenderer.create(
          <IconButton icon="🔊" accessibilityLabel="Disabled Sound" disabled onPress={onPressMock} />
        );
      });
      const touchable = renderer!.root.findByProps({ accessibilityLabel: 'Disabled Sound' });
      expect(touchable.props.disabled).toBe(true);
    });

    it('renders loading indicator when loading is true', () => {
      let renderer: ReactTestRenderer.ReactTestRenderer;
      act(() => {
        renderer = ReactTestRenderer.create(
          <IconButton icon="🔄" accessibilityLabel="Loading" loading />
        );
      });
      const indicator = renderer!.root.findByProps({ testID: 'icon-button-loading' });
      expect(indicator).toBeTruthy();
    });
  });

  describe('PasswordField', () => {
    it('toggles password visibility with the eye icon without layout shift', () => {
      const onChangeMock = jest.fn();
      let renderer: ReactTestRenderer.ReactTestRenderer;
      act(() => {
        renderer = ReactTestRenderer.create(
          <PasswordField
            value="secret123"
            onChangeText={onChangeMock}
            placeholder="Enter password"
          />
        );
      });

      const input = renderer!.root.findByProps({ testID: 'password-text-input' });
      expect(input.props.secureTextEntry).toBe(true);

      const toggleBtn = renderer!.root.findByProps({ accessibilityLabel: 'Show password' });
      expect(toggleBtn.props.accessibilityState.selected).toBe(false);

      act(() => {
        toggleBtn.props.onPress();
      });

      const updatedInput = renderer!.root.findByProps({ testID: 'password-text-input' });
      expect(updatedInput.props.secureTextEntry).toBe(false);

      const activeToggleBtn = renderer!.root.findByProps({ accessibilityLabel: 'Hide password' });
      expect(activeToggleBtn.props.accessibilityState.selected).toBe(true);
    });

    it('displays error message when provided', () => {
      let renderer: ReactTestRenderer.ReactTestRenderer;
      act(() => {
        renderer = ReactTestRenderer.create(
          <PasswordField
            value=""
            onChangeText={jest.fn()}
            error="Password is too short"
          />
        );
      });
      const errorText = renderer!.root.findAll((node) => node.props.children === 'Password is too short');
      expect(errorText.length).toBeGreaterThan(0);
    });
  });

  describe('PlayerHeader', () => {
    it('renders user details, points, and triggers sound/theme controls', () => {
      const onSoundMock = jest.fn();
      let renderer: ReactTestRenderer.ReactTestRenderer;
      act(() => {
        renderer = ReactTestRenderer.create(
          <PlayerHeader
            playerName="ProBingoGamer"
            rating={2450}
            soundEnabled={true}
            onToggleSound={onSoundMock}
          />
        );
      });

      expect(renderer!.root.findAll((node) => node.props.children === 'ProBingoGamer').length).toBeGreaterThan(0);
      expect(renderer!.root.findAll((node) => node.props.children === '2,450').length).toBeGreaterThan(0);
      expect(renderer!.root.findAll((node) => node.props.children === 'PTS').length).toBeGreaterThan(0);

      const soundBtn = renderer!.root.findByProps({ accessibilityLabel: 'Mute game sound' });
      act(() => {
        soundBtn.props.onPress();
      });
      expect(onSoundMock).toHaveBeenCalledTimes(1);

      const themeBtn = renderer!.root.findByProps({ accessibilityLabel: 'Switch to Dark theme' });
      expect(themeBtn).toBeTruthy();
    });
  });

  describe('RandomPlayerCard', () => {
    it('renders IDLE state and calls onFindPlayer', () => {
      const onFindPlayerMock = jest.fn();
      let renderer: ReactTestRenderer.ReactTestRenderer;
      act(() => {
        renderer = ReactTestRenderer.create(
          <RandomPlayerCard
            state="IDLE"
            onFindPlayer={onFindPlayerMock}
          />
        );
      });

      expect(renderer!.root.findAll((node) => node.props.children === 'Random Player').length).toBeGreaterThan(0);

      const findBtn = renderer!.root.findByProps({ accessibilityLabel: 'Play Random Player, Real Human 1v1 Matchmaking' });
      act(() => {
        findBtn.props.onPress();
      });
      expect(onFindPlayerMock).toHaveBeenCalledTimes(1);
    });

    it('renders SEARCHING state with cancel button', () => {
      const onCancelMock = jest.fn();
      let renderer: ReactTestRenderer.ReactTestRenderer;
      act(() => {
        renderer = ReactTestRenderer.create(
          <RandomPlayerCard
            state="SEARCHING"
            onCancel={onCancelMock}
          />
        );
      });

      expect(renderer!.root.findAll((node) => node.props.children === 'QUEUE ACTIVE').length).toBeGreaterThan(0);

      const cancelBtn = renderer!.root.findByProps({ accessibilityLabel: 'Cancel Matchmaking Search' });
      act(() => {
        cancelBtn.props.onPress();
      });
      expect(onCancelMock).toHaveBeenCalledTimes(1);
    });

    it('renders MATCH_FOUND state with opponent name and VS indicator', () => {
      let renderer: ReactTestRenderer.ReactTestRenderer;
      act(() => {
        renderer = ReactTestRenderer.create(
          <RandomPlayerCard
            state="MATCH_FOUND"
            opponent={dummyOpponent}
            room={{ id: 'room-101', code: 'R101', hostId: 'user-p2', players: [dummyPlayer, dummyOpponent], isGameStarted: false, maxPlayers: 2, createdAt: Date.now() } as any}
          />
        );
      });

      expect(renderer!.root.findAll((node) => node.props.children === 'OPPONENT FOUND').length).toBeGreaterThan(0);
      expect(renderer!.root.findAll((node) => node.props.children === 'SpeedyBingo').length).toBeGreaterThan(0);
      expect(renderer!.root.findAll((node) => node.props.children === 'VS').length).toBeGreaterThan(0);
    });

    it('renders DISCONNECTED state with return button', () => {
      const onReturnMock = jest.fn();
      let renderer: ReactTestRenderer.ReactTestRenderer;
      act(() => {
        renderer = ReactTestRenderer.create(
          <RandomPlayerCard
            state="DISCONNECTED"
            onReturnLobby={onReturnMock}
          />
        );
      });

      expect(renderer!.root.findAll((node) => node.props.children === 'ROOM CLOSED').length).toBeGreaterThan(0);

      const cancelBtn = renderer!.root.findByProps({ accessibilityLabel: 'Return to Lobby' });
      act(() => {
        cancelBtn.props.onPress();
      });
      expect(onReturnMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('RobotPracticeCard', () => {
    it('renders bot practice card and triggers onPress', () => {
      const onPressMock = jest.fn();
      let renderer: ReactTestRenderer.ReactTestRenderer;
      act(() => {
        renderer = ReactTestRenderer.create(
          <RobotPracticeCard onPress={onPressMock} />
        );
      });

      expect(renderer!.root.findAll((node) => node.props.children === 'Robot / Solo Practice').length).toBeGreaterThan(0);

      const practiceBtn = renderer!.root.findByProps({
        accessibilityLabel: 'Solo practice against AI Robot',
      });
      act(() => {
        practiceBtn.props.onPress();
      });
      expect(onPressMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('DailyPuzzleCard', () => {
    it('renders daily puzzle with streak and triggers onPress', () => {
      const onPressMock = jest.fn();
      let renderer: ReactTestRenderer.ReactTestRenderer;
      act(() => {
        renderer = ReactTestRenderer.create(
          <DailyPuzzleCard streakCount={7} onPress={onPressMock} />
        );
      });

      expect(renderer!.root.findAll((node) => node.props.children === 'Daily Puzzle').length).toBeGreaterThan(0);
      expect(renderer!.root.findAll((node) => node.props.children === '🔥 7D STREAK').length).toBeGreaterThan(0);

      const puzzleBtn = renderer!.root.findByProps({
        accessibilityLabel: 'Daily Seed Puzzle Challenge',
      });
      act(() => {
        puzzleBtn.props.onPress();
      });
      expect(onPressMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('MatchmakingState', () => {
    it('renders WAITING state with cancel button', () => {
      const onCancelMock = jest.fn();
      let renderer: ReactTestRenderer.ReactTestRenderer;
      act(() => {
        renderer = ReactTestRenderer.create(
          <MatchmakingState
            state="WAITING_FOR_PLAYER"
            player={dummyPlayer}
            message="Waiting for an arena challenger..."
            onCancel={onCancelMock}
          />
        );
      });

      expect(renderer!.root.findAll((node) => node.props.children === 'ARENA MATCHMAKING').length).toBeGreaterThan(0);

      const cancelBtn = renderer!.root.findByProps({ accessibilityLabel: 'Cancel Matchmaking Search' });
      act(() => {
        cancelBtn.props.onPress();
      });
      expect(onCancelMock).toHaveBeenCalledTimes(1);
    });

    it('renders DISCONNECTED state and triggers back button', () => {
      const onBackMock = jest.fn();
      let renderer: ReactTestRenderer.ReactTestRenderer;
      act(() => {
        renderer = ReactTestRenderer.create(
          <MatchmakingState
            state="DISCONNECTED"
            player={dummyPlayer}
            message="Opponent disconnected. Room closed."
            onBack={onBackMock}
          />
        );
      });

      expect(renderer!.root.findAll((node) => node.props.children === 'Room Closed').length).toBeGreaterThan(0);

      const backBtn = renderer!.root.findByProps({ accessibilityLabel: 'Return to Lobby' });
      act(() => {
        backBtn.props.onPress();
      });
      expect(onBackMock).toHaveBeenCalledTimes(1);
    });
  });
});
