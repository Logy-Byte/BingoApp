/**
 * Enterprise Bingo Core Architecture
 * Central Barrel Exports
 */

// Design System & Tokens
export * from './design/tokens';
export * from './design/theme';

// Core Types & Models
export * from './domain/types';

// Game Engines & Anti-Cheat
export * from './domain/engine/gridGameEngine';
export * from './domain/engine/robotOpponent';
export * from './domain/multiplayer/antiCheatValidator';

// Services & Transports
export * from './domain/multiplayer/transport';
export * from './domain/multiplayer/roomManager';
export * from './domain/multiplayer/authoritativeRoomServer';
export * from './domain/multiplayer/matchmakingService';
export * from './domain/state/gameStateMachine';
export * from './domain/state/useMultiplayerRoom';
export * from './audio/soundEngine';
export * from './lib/supabase';

// UI Primitives & Icons
export * from './components/icons';
export * from './components/shared/IconButton';
export * from './components/shared/StatusBadge';
export * from './components/common/GameButton';
export * from './components/navigation/BottomNavBar';

// Feature Components & Screens
export * from './components/rooms/RoomPage';
export * from './components/bingo/RandomPlayerCard';
export * from './components/bingo/RobotPracticeCard';
export * from './components/bingo/DailyPuzzleCard';
export * from './components/bingo/PlayerHeader';
export * from './components/lobby/LobbyGallery';

export * from './screens/HomeScreen';
export * from './screens/GameplayScreen';
export * from './screens/MatchmakingScreen';
export * from './screens/SignInScreen';
export * from './screens/DailyPuzzleScreen';
export * from './screens/SettingsScreen';
export * from './screens/ProfileScreen';
export * from './screens/LeaderboardScreen';
