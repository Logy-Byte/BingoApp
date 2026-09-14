/**
 * Main Application Root
 * Android Bingo App - Complete Storyboard Implementation
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  BackHandler,
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
  StoreItem,
} from './src/domain/types';
import {
  generate5x5Board,
  generate5x5NumberPool,
  evaluate5x5Wins,
} from './src/domain/engine/gridGameEngine';
import { RobotOpponent } from './src/domain/engine/robotOpponent';
import { AntiCheatValidator } from './src/domain/multiplayer/antiCheatValidator';
import { SoundEngine } from './src/audio/soundEngine';
import { COLORS } from './src/design/tokens';
import { ThemeProvider, useTheme } from './src/design/theme';
import { useMultiplayerRoom } from './src/domain/state/useMultiplayerRoom';
import { supabase } from './src/lib/supabase';

import { BottomNavBar } from './src/components/navigation/BottomNavBar';
import { SplashScreen } from './src/screens/SplashScreen';
import { SignInScreen } from './src/screens/SignInScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { RoomSelectionScreen } from './src/screens/RoomSelectionScreen';
import { PreGameScreen } from './src/screens/PreGameScreen';
import { ShopScreen } from './src/screens/ShopScreen';
import { LeaderboardScreen } from './src/screens/LeaderboardScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { CreateRoomScreen } from './src/screens/CreateRoomScreen';
import { JoinRoomScreen } from './src/screens/JoinRoomScreen';
import { LobbyScreen } from './src/screens/LobbyScreen';
import { GameplayScreen } from './src/screens/GameplayScreen';
import { ResultsScreen } from './src/screens/ResultsScreen';
import { DailyPuzzleScreen } from './src/screens/DailyPuzzleScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { DailyBonusModal } from './src/components/common/DailyBonusModal';

function MainApp() {
  const { theme, isDark } = useTheme();

  // Navigation State
  const [currentTab, setCurrentTab] = useState<TabDestination>('PLAY');
  const [screenState, setScreenState] = useState<ScreenState>('SPLASH');
  const [gameMode, setGameMode] = useState<GameModeType>('LOCAL');

  // Player Profile State (Real local player identity with coins & gems)
  const [player, setPlayer] = useState<Player>({
    id: `player-${Math.floor(Math.random() * 9000 + 1000)}`,
    name: 'Jiyer Kame',
    avatar: 'JK',
    isHost: false,
    isReady: false,
    score: 0,
    linesCompleted: 0,
    hasWon: false,
    rating: 1450,
    tier: 'Platinum',
    coins: 50380,
    gems: 1000,
  });

  // Selected Room & Multi-card state
  const [selectedRoom, setSelectedRoom] = useState<PublicRoom | null>(null);
  const [purchasedCardsCount, setPurchasedCardsCount] = useState<number>(1);
  const [showDailyBonusModal, setShowDailyBonusModal] = useState<boolean>(false);

  // Active Boards (Single or Multi-card)
  const [board, setBoard] = useState<Board5x5 | null>(null);
  const [additionalBoards, setAdditionalBoards] = useState<Board5x5[]>([]);
  const [numberPool, setNumberPool] = useState<number[]>([]);
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [linesCompletedCount, setLinesCompletedCount] = useState(0);
  const [completedPatternIds, setCompletedPatternIds] = useState<string[]>([]);
  const [lastCompletedPatternName, setLastCompletedPatternName] = useState<string | undefined>();
  const [isGameActive, setIsGameActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [claimFeedback, setClaimFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [matchStartTime, setMatchStartTime] = useState<number>(Date.now());
  const [matchDuration, setMatchDuration] = useState<number>(0);

  // AI Robot Opponent State
  const robotRef = useRef<RobotOpponent | null>(null);
  const [robotLines, setRobotLines] = useState<number>(0);

  const callerIntervalRef = useRef<any>(null);

  // Authoritative Realtime Multiplayer Room Controller
  const multiplayer = useMultiplayerRoom({
    player,
    onNavigateToScreen: (screen) => setScreenState(screen),
  });

  // Supabase Auth State Listener
  useEffect(() => {
    const fetchProfile = async (userId: string, email: string | undefined) => {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
      if (data && !error) {
        setPlayer((prev) => ({
          ...prev,
          id: data.id,
          name: data.name,
          coins: data.coins,
          gems: data.gems,
          rating: data.rating,
          tier: data.tier,
        }));
      } else {
        // Fallback for new accounts before trigger completes
        setPlayer((prev) => ({ 
          ...prev, 
          id: userId, 
          name: email?.split('@')[0] || 'Player' 
        }));
      }
    };

    supabase.auth.getSession().then(({ data: { session } }: { data: { session: any } }) => {
      if (session?.user) {
        fetchProfile(session.user.id, session.user.email);
        if (screenState === 'SPLASH' || screenState === 'SIGN_IN') {
          setScreenState('TAB_NAV');
        }
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      if (session?.user) {
        fetchProfile(session.user.id, session.user.email);
        setScreenState('TAB_NAV');
      } else {
        setScreenState('SIGN_IN');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Android Back Button Lifecycle
  useEffect(() => {
    const onBackPress = () => {
      if (screenState === 'GAMEPLAY') {
        const shouldQuit = window.confirm
          ? window.confirm('Are you sure you want to quit the current match?')
          : true;
        if (shouldQuit) {
          if (gameMode === 'FRIEND') {
            multiplayer.leaveRoom();
          } else {
            setIsGameActive(false);
            if (callerIntervalRef.current) clearInterval(callerIntervalRef.current);
            setScreenState('TAB_NAV');
          }
        }
        return true;
      }

      if (
        screenState === 'CREATE_ROOM' ||
        screenState === 'JOIN_ROOM' ||
        screenState === 'DAILY_PUZZLE' ||
        screenState === 'SETTINGS' ||
        screenState === 'RESULTS' ||
        screenState === 'ROOM_SELECTION' ||
        screenState === 'PRE_GAME'
      ) {
        if (gameMode === 'FRIEND') {
          multiplayer.leaveRoom();
        }
        setScreenState('TAB_NAV');
        return true;
      }

      if (screenState === 'LOBBY') {
        if (gameMode === 'FRIEND') {
          multiplayer.leaveRoom();
        }
        setScreenState('TAB_NAV');
        return true;
      }

      if (screenState === 'TAB_NAV') {
        if (currentTab !== 'PLAY') {
          setCurrentTab('PLAY');
          return true;
        }
        return false;
      }

      return false;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => subscription.remove();
  }, [screenState, currentTab, gameMode, multiplayer]);

  // Setup game boards and pools for Local / Solo / Multi-card
  const initGame = useCallback((mode: GameModeType, cardCount: number = 1, customSeed?: string) => {
    const seed = customSeed || `game-${Date.now()}`;
    const primaryBoard = generate5x5Board(`b-${player.id}-1`, seed, false);

    const extraBoards: Board5x5[] = [];
    for (let i = 2; i <= cardCount; i++) {
      extraBoards.push(generate5x5Board(`b-${player.id}-${i}`, `${seed}-${i}`, false));
    }

    const pool = generate5x5NumberPool();

    setGameMode(mode);
    setBoard(primaryBoard);
    setAdditionalBoards(extraBoards);
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

  // Launchers
  const handlePlayRanked = () => initGame('RANKED', 1);

  const handlePlayRobot = (difficulty: RobotDifficulty) => {
    const seed = `game-robot-${Date.now()}`;
    const primaryBoard = generate5x5Board(`b-${player.id}`, seed, false);
    const pool = generate5x5NumberPool();

    setGameMode('ROBOT');
    setBoard(primaryBoard);
    setAdditionalBoards([]);
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

  const handleLocalPlay = () => initGame('LOCAL', 1);

  const handleDailyPuzzle = () => setScreenState('DAILY_PUZZLE');

  const handleStartDaily = (seed: string) => initGame('DAILY', 1, seed);

  const handlePlayFriend = () => {
    setGameMode('FRIEND');
    setScreenState('CREATE_ROOM');
  };

  const handleCreateRoom = (name: string, privacy: RoomPrivacy, password?: string) => {
    setGameMode('FRIEND');
    multiplayer.createRoom(name, privacy, password);
  };

  const handleJoinRoom = (roomId: string, password?: string) => {
    setGameMode('FRIEND');
    multiplayer.joinRoom(roomId, password);
  };

  const handleSelectRoom = (room: PublicRoom, ticketCount?: number) => {
    setSelectedRoom(room);
    if (ticketCount) {
      setPurchasedCardsCount(ticketCount);
    }
    setScreenState('PRE_GAME');
  };

  const handleBuyTickets = (cardCount: number) => {
    setPurchasedCardsCount(cardCount);
    initGame('LOCAL', cardCount);
  };

  const handleClaimDailyBonus = () => {
    setPlayer((prev) => ({
      ...prev,
      coins: prev.coins + 500,
      gems: prev.gems + 10,
    }));
    setShowDailyBonusModal(false);
  };

  const handleBuyStoreItem = (item: StoreItem) => {
    if (item.category === 'COINS') {
      const addedCoins = item.id === 'c1' ? 500 : item.id === 'c2' ? 2500 : 10000;
      setPlayer((prev) => ({ ...prev, coins: prev.coins + addedCoins }));
    } else if (item.category === 'GEMS') {
      const addedGems = item.id === 'g1' ? 50 : 250;
      setPlayer((prev) => ({ ...prev, gems: prev.gems + addedGems }));
    } else if (item.costInGems && player.gems >= item.costInGems) {
      setPlayer((prev) => ({ ...prev, gems: prev.gems - item.costInGems! }));
    }
  };

  // Solo Cell Press Handler
  const handleCellPress = useCallback(
    (cell: GridCell5x5, boardIndex: number = 0) => {
      const targetBoard = boardIndex === 0 ? board : additionalBoards[boardIndex - 1];
      if (!targetBoard || !isGameActive) return;
      if (cell.state === 'MARKED' || cell.state === 'COMPLETED') return;

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

      const newMatrix = targetBoard.matrix.map((row) =>
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
        ...targetBoard,
        matrix: newMatrix,
      };

      if (boardIndex === 0) setBoard(updatedBoard);
      else {
        setAdditionalBoards((prev) => {
          const next = [...prev];
          next[boardIndex - 1] = updatedBoard;
          return next;
        });
      }

      SoundEngine.playDaub();

      const winResult = evaluate5x5Wins(updatedBoard, completedPatternIds);
      if (winResult.newlyCompletedPatterns.length > 0) {
        SoundEngine.playLineCompleted();
        const newPatternIds = winResult.newlyCompletedPatterns.map((p) => p.id);
        const lastPattern = winResult.newlyCompletedPatterns[winResult.newlyCompletedPatterns.length - 1];

        setCompletedPatternIds((prev) => [...prev, ...newPatternIds]);
        setLinesCompletedCount((prev) => prev + winResult.newlyCompletedPatterns.length);
        setLastCompletedPatternName(lastPattern.name);
        setScore((prev) => prev + winResult.newlyCompletedPatterns.length * 500);

        winResult.winningCoords.forEach(({ row, col }) => {
          updatedBoard.matrix[row][col].isWinningCell = true;
          updatedBoard.matrix[row][col].state = 'COMPLETED';
        });

        setTimeout(() => setLastCompletedPatternName(undefined), 2500);
      }
    },
    [board, additionalBoards, isGameActive, drawnNumbers, completedPatternIds]
  );

  // Solo Claim Bingo
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

    SoundEngine.playWinFanfare();
    setIsGameActive(false);
    setMatchDuration(Math.floor((Date.now() - matchStartTime) / 1000));
    if (callerIntervalRef.current) clearInterval(callerIntervalRef.current);

    setPlayer((prev) => ({
      ...prev,
      coins: prev.coins + 1500,
      score: prev.score + score + 1000,
    }));

    setScreenState('RESULTS');
  }, [board, isGameActive, linesCompletedCount, score, matchStartTime]);

  // Automated Solo Ball Caller Loop
  useEffect(() => {
    if (gameMode !== 'FRIEND' && screenState === 'GAMEPLAY' && isGameActive && !isPaused) {
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
  }, [gameMode, screenState, isGameActive, isPaused, matchStartTime]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bgCanvas }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <View style={[styles.container, { backgroundColor: theme.bgCanvas }]}>
        {screenState === 'SPLASH' && (
          <SplashScreen onFinish={() => setScreenState('SIGN_IN')} />
        )}

        {screenState === 'SIGN_IN' && (
          <SignInScreen
            currentName={player.name}
            onLogin={(name, userId) => {
              setPlayer((prev) => ({ ...prev, name, id: userId || prev.id }));
              setScreenState('TAB_NAV');
            }}
          />
        )}

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
                onJoinRoom={(roomId) => handleJoinRoom(roomId)}
                onCreateRoomDirect={handlePlayFriend}
                onOpenSettings={() => setScreenState('SETTINGS')}
                onOpenRoomSelection={() => setScreenState('ROOM_SELECTION')}
                onOpenDailyBonusModal={() => setShowDailyBonusModal(true)}
              />
            )}

            {currentTab === 'LEADERBOARD' && <LeaderboardScreen />}

            {currentTab === 'PROFILE' && (
              <ProfileScreen
                playerName={player.name}
                onUpdateName={(name) => setPlayer((prev) => ({ ...prev, name }))}
                onOpenSettings={() => setScreenState('SETTINGS')}
              />
            )}

            {currentTab === 'SHOP' && (
              <ShopScreen
                coins={player.coins}
                gems={player.gems}
                onBuyItem={handleBuyStoreItem}
              />
            )}

            <BottomNavBar currentTab={currentTab} onSelectTab={setCurrentTab} />
          </>
        )}

        {screenState === 'ROOM_SELECTION' && (
          <RoomSelectionScreen
            coins={player.coins}
            gems={player.gems}
            onSelectRoom={handleSelectRoom}
            onBack={() => setScreenState('TAB_NAV')}
          />
        )}

        {screenState === 'PRE_GAME' && selectedRoom && (
          <PreGameScreen
            room={selectedRoom}
            onBuyTickets={handleBuyTickets}
            onBack={() => setScreenState('ROOM_SELECTION')}
          />
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
            errorMessage={multiplayer.joinError}
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

        {screenState === 'LOBBY' && gameMode === 'FRIEND' && multiplayer.room ? (
          <LobbyScreen
            room={multiplayer.room}
            player={player}
            players={multiplayer.players}
            countdownSeconds={multiplayer.countdownSeconds}
            onStartMatch={multiplayer.startMatch}
            onLeaveLobby={multiplayer.leaveRoom}
            onToggleReady={multiplayer.toggleReady}
            onLaunchRobotMatch={() => {
              multiplayer.leaveRoom();
              handlePlayRobot('MEDIUM');
            }}
          />
        ) : null}

        {screenState === 'GAMEPLAY' && (
          board ? (
            <GameplayScreen
              board={board}
              additionalBoards={additionalBoards}
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
          ) : null
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
            onPlayAgain={() => initGame(gameMode, purchasedCardsCount)}
            onReturnHome={() => setScreenState('TAB_NAV')}
          />
        )}

        {/* Daily Bonus Modal Overlay */}
        <DailyBonusModal
          visible={showDailyBonusModal}
          onClaim={handleClaimDailyBonus}
          onClose={() => setShowDailyBonusModal(false)}
        />
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
