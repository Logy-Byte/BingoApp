/**
 * Main Application Root
 * Premium 5x5 Multiplayer Number Game (React Native Android)
 * Product + UX + UI + Game Engine + Security + Performance
 * Features:
 * - Fixed 5x5 board (numbers 1-25)
 * - 3-tab Floating Bottom Navigation (Play, Leaderboard, Profile)
 * - Home Hierarchy: Play ranked hero, Me vs robot, Play a friend, Daily puzzles, Online Telemetry
 * - Local AI Robot opponent with 3 difficulties
 * - Authoritative Anti-Cheat validation
 * - Spoken Audio caller and tactile sound synthesis
 * - Android BackHandler integration across modal, nested routes, and match exit confirmation
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  BackHandler,
  Alert,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  Board5x5,
  GridCell5x5,
  Player,
  PublicRoom,
  RobotDifficulty,
  TabDestination,
  ScreenState,
  GameModeType,
  RoomPrivacy,
} from './src/domain/types';
import {
  generate5x5Board,
  generate5x5NumberPool,
  evaluate5x5Wins,
} from './src/domain/engine/gridGameEngine';
import { RobotOpponent } from './src/domain/engine/robotOpponent';
import { globalRoomManager } from './src/domain/multiplayer/roomManager';
import { AntiCheatValidator } from './src/domain/multiplayer/antiCheatValidator';
import { SoundEngine } from './src/audio/soundEngine';
import { COLORS } from './src/design/tokens';
import { ThemeProvider, useTheme } from './src/design/theme';

import { BottomNavBar } from './src/components/navigation/BottomNavBar';
import { HomeScreen } from './src/screens/HomeScreen';
import { LeaderboardScreen } from './src/screens/LeaderboardScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { CreateRoomScreen } from './src/screens/CreateRoomScreen';
import { JoinRoomScreen } from './src/screens/JoinRoomScreen';
import { LobbyScreen } from './src/screens/LobbyScreen';
import { GameplayScreen } from './src/screens/GameplayScreen';
import { ResultsScreen } from './src/screens/ResultsScreen';
import { DailyPuzzleScreen } from './src/screens/DailyPuzzleScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';

function MainApp() {
  const { theme, isDark } = useTheme();
  // Navigation State
  const [currentTab, setCurrentTab] = useState<TabDestination>('PLAY');
  const [screenState, setScreenState] = useState<ScreenState>('TAB_NAV');
  const [gameMode, setGameMode] = useState<GameModeType>('LOCAL');

  // Player Profile State (Real local player identity)
  const [player, setPlayer] = useState<Player>({
    id: `player-${Math.floor(Math.random() * 9000 + 1000)}`,
    name: 'Player_One',
    avatar: 'PO',
    isHost: false,
    isReady: false,
    score: 0,
    linesCompleted: 0,
    hasWon: false,
    rating: 1450,
    tier: 'Platinum',
  });

  // Active Game State
  const [activeRoom, setActiveRoom] = useState<PublicRoom | null>(null);
  const [board, setBoard] = useState<Board5x5 | null>(null);
  const [numberPool, setNumberPool] = useState<number[]>([]);
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [linesCompletedCount, setLinesCompletedCount] = useState(0);
  const [completedPatternIds, setCompletedPatternIds] = useState<string[]>([]);
  const [lastCompletedPatternName, setLastCompletedPatternName] = useState<string | undefined>();
  const [isGameActive, setIsGameActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [joinError, setJoinError] = useState<string | undefined>();
  const [claimFeedback, setClaimFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [matchStartTime, setMatchStartTime] = useState<number>(Date.now());
  const [matchDuration, setMatchDuration] = useState<number>(0);

  // AI Robot Opponent State
  const robotRef = useRef<RobotOpponent | null>(null);
  const [robotLines, setRobotLines] = useState<number>(0);

  const callerIntervalRef = useRef<any>(null);

  // Android Back Button Lifecycle
  useEffect(() => {
    const onBackPress = () => {
      if (screenState === 'GAMEPLAY') {
        // Confirmation dialog for leaving match in progress
        const shouldQuit = window.confirm
          ? window.confirm('Are you sure you want to quit the current match?')
          : true;
        if (shouldQuit) {
          setIsGameActive(false);
          if (callerIntervalRef.current) clearInterval(callerIntervalRef.current);
          setScreenState('TAB_NAV');
        }
        return true;
      }

      if (
        screenState === 'CREATE_ROOM' ||
        screenState === 'JOIN_ROOM' ||
        screenState === 'DAILY_PUZZLE' ||
        screenState === 'SETTINGS' ||
        screenState === 'RESULTS'
      ) {
        setScreenState('TAB_NAV');
        return true;
      }

      if (screenState === 'LOBBY') {
        setActiveRoom(null);
        setScreenState('TAB_NAV');
        return true;
      }

      if (screenState === 'TAB_NAV') {
        if (currentTab !== 'PLAY') {
          setCurrentTab('PLAY');
          return true;
        }
        // At root play tab, allow default Android back
        return false;
      }

      return false;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => subscription.remove();
  }, [screenState, currentTab]);

  // Setup game board and pools
  const initGame = useCallback((mode: GameModeType, customSeed?: string) => {
    const seed = customSeed || `game-${Date.now()}`;
    const newBoard = generate5x5Board(`b-${player.id}`, seed, false);
    const pool = generate5x5NumberPool();

    setGameMode(mode);
    setBoard(newBoard);
    setNumberPool(pool);
    setDrawnNumbers([]);
    setScore(0);
    setLinesCompletedCount(0);
    setCompletedPatternIds([]);
    setLastCompletedPatternName(undefined);
    setClaimFeedback(null);
    setIsGameActive(true);
    setIsPaused(false);
    setMatchStartTime(Date.now());

    if (mode === 'ROBOT') {
      robotRef.current = new RobotOpponent('MEDIUM', `robot-${seed}`);
      setRobotLines(0);
    } else {
      robotRef.current = null;
    }

    setScreenState('GAMEPLAY');
  }, [player.id]);

  // Mode Launchers
  const handlePlayRanked = () => {
    initGame('RANKED');
  };

  const handlePlayRobot = (difficulty: RobotDifficulty) => {
    const seed = `game-robot-${Date.now()}`;
    const newBoard = generate5x5Board(`b-${player.id}`, seed, false);
    const pool = generate5x5NumberPool();

    setGameMode('ROBOT');
    setBoard(newBoard);
    setNumberPool(pool);
    setDrawnNumbers([]);
    setScore(0);
    setLinesCompletedCount(0);
    setCompletedPatternIds([]);
    setLastCompletedPatternName(undefined);
    setClaimFeedback(null);
    setIsGameActive(true);
    setIsPaused(false);
    setMatchStartTime(Date.now());

    robotRef.current = new RobotOpponent(difficulty, `robot-${seed}`);
    setRobotLines(0);
    setScreenState('GAMEPLAY');
  };

  const handleLocalPlay = () => {
    initGame('LOCAL');
  };

  const handleDailyPuzzle = () => {
    setScreenState('DAILY_PUZZLE');
  };

  const handleStartDaily = (seed: string) => {
    initGame('DAILY', seed);
  };

  const handlePlayFriend = () => {
    setScreenState('CREATE_ROOM');
  };

  const handleCreateRoom = (name: string, privacy: RoomPrivacy, password?: string) => {
    const room = globalRoomManager.createRoom(name, player, privacy, password);
    setActiveRoom(room);
    setScreenState('LOBBY');
  };

  const handleJoinRoom = (roomId: string, password?: string) => {
    setJoinError(undefined);
    const res = globalRoomManager.joinRoom(roomId, player, password);
    if (res.success && res.room) {
      setActiveRoom(res.room);
      setScreenState('LOBBY');
    } else {
      setJoinError(res.error || 'Failed to join room.');
      SoundEngine.playError();
    }
  };

  const handleStartMatch = () => {
    initGame('FRIEND');
  };

  // Cell Press Handler with Anti-Cheat Check
  const handleCellPress = useCallback(
    (cell: GridCell5x5) => {
      if (!board || !isGameActive) return;
      if (cell.state === 'MARKED' || cell.state === 'COMPLETED') return;

      // Authoritative Anti-Cheat validation
      const isLegitCalled = AntiCheatValidator.validateDaub(cell.value, drawnNumbers);
      if (!isLegitCalled) {
        SoundEngine.playError();
        setClaimFeedback({
          success: false,
          message: `Number ${cell.value} has not been called yet!`,
        });
        setTimeout(() => setClaimFeedback(null), 1400);
        return;
      }

      // Mark cell
      const newMatrix = board.matrix.map((row) =>
        row.map((c) => {
          if (c.id === cell.id) {
            return {
              ...c,
              state: 'MARKED' as const,
              daubTimestamp: Date.now(),
            };
          }
          return c;
        })
      );

      const updatedBoard: Board5x5 = {
        ...board,
        matrix: newMatrix,
      };

      SoundEngine.playDaub();

      // Check winning lines
      const winResult = evaluate5x5Wins(updatedBoard, completedPatternIds);
      if (winResult.newlyCompletedPatterns.length > 0) {
        SoundEngine.playLineCompleted();
        const newPatternIds = winResult.newlyCompletedPatterns.map((p) => p.id);
        const lastPattern = winResult.newlyCompletedPatterns[winResult.newlyCompletedPatterns.length - 1];

        setCompletedPatternIds((prev) => [...prev, ...newPatternIds]);
        setLinesCompletedCount((prev) => prev + winResult.newlyCompletedPatterns.length);
        setLastCompletedPatternName(lastPattern.name);
        setScore((prev) => prev + winResult.newlyCompletedPatterns.length * 500);

        // Highlight winning cells
        winResult.winningCoords.forEach(({ row, col }) => {
          updatedBoard.matrix[row][col].isWinningCell = true;
          updatedBoard.matrix[row][col].state = 'COMPLETED';
        });

        setTimeout(() => setLastCompletedPatternName(undefined), 2500);
      }

      setBoard(updatedBoard);
    },
    [board, isGameActive, drawnNumbers, completedPatternIds]
  );

  // Claim Bingo
  const handleClaimBingo = useCallback(() => {
    if (!board || !isGameActive) return;

    if (linesCompletedCount === 0) {
      SoundEngine.playError();
      setClaimFeedback({
        success: false,
        message: 'No completed lines to claim yet!',
      });
      return;
    }

    // Authoritative verification of claim
    const firstPatternId = completedPatternIds[0] || 'ROW_0';
    const validation = AntiCheatValidator.validateClaim(
      { playerId: player.id, boardId: board.id, patternId: firstPatternId },
      board,
      drawnNumbers
    );

    if (validation.isValid) {
      SoundEngine.playWinFanfare();
      setIsGameActive(false);
      setMatchDuration(Math.floor((Date.now() - matchStartTime) / 1000));
      if (callerIntervalRef.current) clearInterval(callerIntervalRef.current);

      if (gameMode === 'RANKED') {
        setPlayer((prev) => ({
          ...prev,
          rating: prev.rating + 25,
          score: prev.score + score + 1000,
        }));
      }

      setScreenState('RESULTS');
    } else {
      SoundEngine.playError();
      setClaimFeedback({
        success: false,
        message: validation.reason || 'Invalid win claim.',
      });
    }
  }, [board, isGameActive, linesCompletedCount, completedPatternIds, player.id, drawnNumbers, matchStartTime, gameMode, score]);

  // Automated Ball Caller Loop
  useEffect(() => {
    if (screenState === 'GAMEPLAY' && isGameActive && !isPaused) {
      callerIntervalRef.current = setInterval(() => {
        setNumberPool((prevPool) => {
          if (prevPool.length === 0) {
            if (callerIntervalRef.current) clearInterval(callerIntervalRef.current);
            return prevPool;
          }

          const nextNumber = prevPool[0];
          const remaining = prevPool.slice(1);

          setDrawnNumbers((prevCalls) => [nextNumber, ...prevCalls]);
          SoundEngine.playBallDrawn();
          SoundEngine.speakNumber(nextNumber);

          // Trigger AI Robot response if in Robot mode
          if (robotRef.current) {
            robotRef.current.onNumberCalled(nextNumber, (_r, _c, robotLinesCount) => {
              setRobotLines(robotLinesCount);
              if (robotLinesCount >= 3) {
                if (callerIntervalRef.current) clearInterval(callerIntervalRef.current);
                setIsGameActive(false);
                setMatchDuration(Math.floor((Date.now() - matchStartTime) / 1000));
                setScreenState('RESULTS');
              }
            });
          }

          return remaining;
        });
      }, 3500);
    } else {
      if (callerIntervalRef.current) {
        clearInterval(callerIntervalRef.current);
      }
    }

    return () => {
      if (callerIntervalRef.current) {
        clearInterval(callerIntervalRef.current);
      }
    };
  }, [screenState, isGameActive, isPaused, matchStartTime]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bgCanvas }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={theme.bgCanvas} />
      <View style={[styles.container, { backgroundColor: theme.bgCanvas }]}>
          {screenState === 'TAB_NAV' && (
            <>
              {currentTab === 'PLAY' && (
                <HomeScreen
                  player={player}
                  onPlayRanked={handlePlayRanked}
                  onPlayRobot={handlePlayRobot}
                  onPlayFriend={handlePlayFriend}
                  onDailyPuzzle={handleDailyPuzzle}
                  onLocalPlay={handleLocalPlay}
                  onJoinRoom={(roomId) => {
                    handleJoinRoom(roomId);
                  }}
                  onCreateRoomDirect={handlePlayFriend}
                  onOpenSettings={() => setScreenState('SETTINGS')}
                />
              )}
              {currentTab === 'LEADERBOARD' && <LeaderboardScreen />}
              {currentTab === 'PROFILE' && (
                <ProfileScreen onOpenSettings={() => setScreenState('SETTINGS')} />
              )}

              <BottomNavBar currentTab={currentTab} onSelectTab={setCurrentTab} />
            </>
          )}

          {screenState === 'CREATE_ROOM' && (
            <CreateRoomScreen
              onCreateRoom={handleCreateRoom}
              onBack={() => setScreenState('TAB_NAV')}
            />
          )}

          {screenState === 'JOIN_ROOM' && (
            <JoinRoomScreen
              onJoin={handleJoinRoom}
              onBack={() => setScreenState('TAB_NAV')}
              errorMessage={joinError}
            />
          )}

          {screenState === 'DAILY_PUZZLE' && (
            <DailyPuzzleScreen
              onStartDaily={handleStartDaily}
              onBack={() => setScreenState('TAB_NAV')}
            />
          )}

          {screenState === 'SETTINGS' && (
            <SettingsScreen onBack={() => setScreenState('TAB_NAV')} />
          )}

          {screenState === 'LOBBY' && activeRoom && (
            <LobbyScreen
              room={activeRoom}
              player={player}
              onStartMatch={handleStartMatch}
              onLeaveLobby={() => {
                setActiveRoom(null);
                setScreenState('TAB_NAV');
              }}
            />
          )}

          {screenState === 'GAMEPLAY' && board && (
            <GameplayScreen
              board={board}
              drawnNumbers={drawnNumbers}
              score={score}
              linesCompletedCount={linesCompletedCount}
              isGameActive={isGameActive}
              isPaused={isPaused}
              onCellPress={handleCellPress}
              onClaimBingo={handleClaimBingo}
              onTogglePause={() => setIsPaused(!isPaused)}
              onLeaveGame={() => {
                setIsGameActive(false);
                setScreenState('TAB_NAV');
              }}
              lastCompletedPatternName={lastCompletedPatternName}
              claimFeedback={claimFeedback}
              opponentLines={gameMode === 'ROBOT' ? robotLines : undefined}
              opponentName={gameMode === 'ROBOT' ? 'Robot AI' : undefined}
            />
          )}

          {screenState === 'RESULTS' && (
            <ResultsScreen
              hasWon={linesCompletedCount > 0}
              score={score}
              linesCompletedCount={linesCompletedCount}
              totalCallsCount={drawnNumbers.length}
              matchDurationSec={matchDuration}
              isRanked={gameMode === 'RANKED'}
              ratingDelta={25}
              onPlayAgain={() => initGame(gameMode)}
              onReturnHome={() => setScreenState('TAB_NAV')}
            />
          )}
        </View>
      </SafeAreaView>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <MainApp />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
});
