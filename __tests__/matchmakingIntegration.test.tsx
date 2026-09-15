import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';
import App from '../App';
import { ThemeProvider } from '../src/design/theme';
import { MatchmakingScreen } from '../src/screens/MatchmakingScreen';
import { HomeScreen } from '../src/screens/HomeScreen';
import { SignInScreen } from '../src/screens/SignInScreen';
import { globalMatchmakingService } from '../src/domain/multiplayer/matchmakingService';

describe('End-to-End Component Flow & Navigation Suite', () => {
  const mockPlayer = {
    id: 'user-qa-1',
    name: 'Alpha Commander',
    avatar: 'AC',
    isHost: false,
    isReady: false,
    score: 0,
    linesCompleted: 0,
    hasWon: false,
    rating: 1550,
    tier: 'Platinum',
    coins: 5000,
    gems: 100,
  };

  const mockOpponent = {
    id: 'user-qa-2',
    name: 'Bravo Striker',
    avatar: 'BS',
    isHost: true,
    isReady: true,
    score: 0,
    linesCompleted: 0,
    hasWon: false,
    rating: 1510,
    tier: 'Platinum',
    coins: 3500,
    gems: 75,
  };

  test('SignInScreen renders QA Demo Login profiles for Player A and Player B', () => {
    const onLoginMock = jest.fn();
    let rootRenderer: any;

    act(() => {
      rootRenderer = ReactTestRenderer.create(
        <ThemeProvider>
          <SignInScreen currentName="Player" onLogin={onLoginMock} />
        </ThemeProvider>
      );
    });

    const root = rootRenderer.root;
    const textNodes = root.findAllByType('Text');
    const texts = textNodes.map((n: any) => n.props.children);

    expect(texts).toContain('QA DEMO MULTIPLAYER PROFILES');
    expect(texts).toContain('QA Player A (Alpha)');
    expect(texts).toContain('QA Player B (Bravo)');

    // Click QA Player A button
    const btnA = root.findByProps({ accessibilityLabel: 'Login as QA Player A' });
    act(() => {
      btnA.props.onPress();
    });

    expect(onLoginMock).toHaveBeenCalledWith('Alpha Commander', 'qa-user-alpha-001');
  });

  test('MatchmakingScreen renders waiting state, queue timer, and Cancel action (no fake bot)', () => {
    const onCancelMock = jest.fn();
    let rootRenderer: any;

    act(() => {
      rootRenderer = ReactTestRenderer.create(
        <ThemeProvider>
          <MatchmakingScreen
            player={mockPlayer}
            status="WAITING_FOR_PLAYER"
            onCancel={onCancelMock}
          />
        </ThemeProvider>
      );
    });

    const root = rootRenderer.root;
    const textNodes = root.findAllByType('Text');
    const texts = textNodes.map((n: any) => n.props.children);

    expect(texts).toContain('Random Matchmaking');
    expect(texts).toContain('Waiting for an opponent…');
    expect(texts).toContain('Looking for another online player. You will never be paired with a robot.');
    expect(texts).toContain('Cancel Search');
    expect(texts).toContain('In Queue');

    // Click Cancel Search
    const cancelBtn = root.findByProps({ accessibilityLabel: 'Cancel Matchmaking Search' });
    act(() => {
      cancelBtn.props.onPress();
    });

    expect(onCancelMock).toHaveBeenCalled();
    act(() => {
      rootRenderer.unmount();
    });
  });


  test('MatchmakingScreen renders MATCH_FOUND with opponent card and 3s countdown', () => {
    let rootRenderer: any;

    act(() => {
      rootRenderer = ReactTestRenderer.create(
        <ThemeProvider>
          <MatchmakingScreen
            player={mockPlayer}
            opponent={mockOpponent}
            status="MATCH_FOUND"
            countdownSeconds={3}
            onCancel={jest.fn()}
          />
        </ThemeProvider>
      );
    });

    const root = rootRenderer.root;
    const textNodes = root.findAllByType('Text');
    const texts = textNodes.map((n: any) => n.props.children);

    expect(texts).toContain('MATCH FOUND!');
    expect(texts).toContain('Game starting in 3s');
    expect(texts).toContain('Alpha Commander');
    expect(texts).toContain('Bravo Striker');
    expect(texts).toContain('1550 MMR');
    expect(texts).toContain('1510 MMR');
  });

  test('HomeScreen triggers onPlayRandomHuman when clicking Play Ranked Match', () => {
    const onPlayRankedMock = jest.fn();
    const onPlayRandomHumanMock = jest.fn();
    let rootRenderer: any;

    act(() => {
      rootRenderer = ReactTestRenderer.create(
        <ThemeProvider>
          <HomeScreen
            player={mockPlayer}
            onPlayRanked={onPlayRankedMock}
            onPlayRandomHuman={onPlayRandomHumanMock}
            onPlayRobot={jest.fn()}
            onPlayFriend={jest.fn()}
            onDailyPuzzle={jest.fn()}
            onLocalPlay={jest.fn()}
            onJoinRoom={jest.fn()}
            onCreateRoomDirect={jest.fn()}
          />
        </ThemeProvider>
      );
    });

    const root = rootRenderer.root;
    const heroBtn = root.findByProps({ accessibilityLabel: 'Play Random Player, Real Human 1v1 Matchmaking' });

    act(() => {
      heroBtn.props.onPress();
    });

    expect(onPlayRandomHumanMock).toHaveBeenCalled();
  });
});
