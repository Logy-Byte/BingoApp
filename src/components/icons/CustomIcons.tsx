import React from 'react';
import { ViewStyle } from 'react-native';
import { Icon } from './Icon';
import { AnimatedIcon } from './AnimatedIcon';
import { BaseIconProps, IconName, IconState, IconVariant } from './types';
import { ICON_COLORS, ICON_SIZES } from '../../design/tokens';

export interface IconProps extends BaseIconProps {
  interactive?: boolean;
  onPress?: () => void;
  triggerAnimation?: boolean;
  direction?: 'left' | 'right' | 'up' | 'down';
  muted?: boolean;
  active?: boolean;
  connected?: boolean;
}

// Re-export core primitives and definitions
export { Icon } from './Icon';
export { AnimatedIcon } from './AnimatedIcon';
export { AppIconVector } from './AppIconVector';
export { IconSpecimenSheet } from './IconSpecimenSheet';
export * from './types';
export { ICON_DEFINITIONS } from './iconPaths';

/**
 * Backward compatibility helper for legacy SvgIcon usages
 */
export const SvgIcon: React.FC<{
  size?: number;
  viewBox?: string;
  paths?: any[];
  circles?: any[];
  style?: ViewStyle;
}> = ({ size = 24, style }) => {
  return <Icon name="bingo" size={size} style={style} />;
};

// ============================================================================
// 1. PRIMARY NAVIGATION & BRAND ICONS
// ============================================================================
export const HomeIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.md,
  color = ICON_COLORS.primary,
  variant,
  state = 'idle',
  interactive,
  onPress,
  style,
  accessibilityLabel = 'Home',
}) => (
  <AnimatedIcon
    name="home"
    size={size}
    color={color}
    variant={variant}
    state={state}
    interactive={interactive}
    onPress={onPress}
    style={style}
    accessibilityLabel={accessibilityLabel}
    accessibilityRole="image"
  />
);

export const PlayIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.md,
  color = ICON_COLORS.primary,
  variant,
  state = 'idle',
  interactive,
  onPress,
  style,
  accessibilityLabel = 'Play',
}) => (
  <AnimatedIcon
    name="play"
    size={size}
    color={color}
    variant={variant}
    state={state}
    interactive={interactive}
    onPress={onPress}
    style={style}
    accessibilityLabel={accessibilityLabel}
    accessibilityRole={interactive ? 'button' : 'image'}
  />
);

export const LeaderboardIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.md,
  color = ICON_COLORS.primary,
  variant,
  state = 'idle',
  interactive,
  onPress,
  style,
  accessibilityLabel = 'Leaderboard',
}) => (
  <AnimatedIcon
    name="leaderboard"
    size={size}
    color={color}
    variant={variant}
    state={state}
    interactive={interactive}
    onPress={onPress}
    style={style}
    accessibilityLabel={accessibilityLabel}
    accessibilityRole={interactive ? 'button' : 'image'}
  />
);

export const ProfileIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.md,
  color = ICON_COLORS.primary,
  variant,
  state = 'idle',
  interactive,
  onPress,
  style,
  accessibilityLabel = 'Profile',
}) => (
  <AnimatedIcon
    name="profile"
    size={size}
    color={color}
    variant={variant}
    state={state}
    interactive={interactive}
    onPress={onPress}
    style={style}
    accessibilityLabel={accessibilityLabel}
    accessibilityRole={interactive ? 'button' : 'image'}
  />
);

// ============================================================================
// 2. ORIGINAL BINGO IDENTITY & GAMEPLAY ICONS
// ============================================================================
export const BingoIdentityIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.md,
  color = ICON_COLORS.gold,
  variant,
  state = 'idle',
  style,
  accessibilityLabel = 'Bingo Emblem',
}) => (
  <AnimatedIcon
    name="bingo"
    size={size}
    color={color}
    variant={variant}
    state={state}
    style={style}
    accessibilityLabel={accessibilityLabel}
  />
);

export const BingoIcon = BingoIdentityIcon;

export const MarkIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.md,
  color = ICON_COLORS.playEmerald,
  variant,
  state = 'idle',
  style,
}) => (
  <AnimatedIcon
    name="mark"
    size={size}
    color={color}
    variant={variant}
    state={state}
    style={style}
    accessibilityLabel="Mark daub seal"
  />
);

export const UnmarkIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.md,
  color = ICON_COLORS.muted,
  style,
}) => (
  <AnimatedIcon
    name="unmark"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="Unmark cell"
  />
);

export const PauseIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.md,
  color = ICON_COLORS.primary,
  style,
  onPress,
  interactive,
}) => (
  <AnimatedIcon
    name="pause"
    size={size}
    color={color}
    interactive={interactive}
    onPress={onPress}
    style={style}
    accessibilityLabel="Pause match"
  />
);

export const ResumeIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.md,
  color = ICON_COLORS.playEmerald,
  style,
  onPress,
  interactive,
}) => (
  <AnimatedIcon
    name="resume"
    size={size}
    color={color}
    interactive={interactive}
    onPress={onPress}
    style={style}
    accessibilityLabel="Resume match"
  />
);

export const ShuffleIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.md,
  color = ICON_COLORS.primary,
  style,
}) => (
  <AnimatedIcon
    name="shuffle"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="Shuffle"
  />
);

export const PreviousIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.md,
  color = ICON_COLORS.primary,
  style,
}) => (
  <AnimatedIcon
    name="previous"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="Previous"
  />
);

export const NextIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.md,
  color = ICON_COLORS.primary,
  style,
}) => (
  <AnimatedIcon
    name="next"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="Next"
  />
);

export const FinishIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.md,
  color = ICON_COLORS.gold,
  style,
}) => (
  <AnimatedIcon
    name="finish"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="Match finish"
  />
);

export const WinnerIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.md,
  color = ICON_COLORS.gold,
  style,
}) => (
  <AnimatedIcon
    name="winner"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="Victory winner"
  />
);

export const NumberGridIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.md,
  color = ICON_COLORS.primary,
  style,
}) => (
  <AnimatedIcon
    name="number"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="Number matrix"
  />
);

// ============================================================================
// 3. NAVIGATION & STRUCTURAL ICONS
// ============================================================================
export const ChevronIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.sm,
  color = ICON_COLORS.primary,
  direction = 'left',
  style,
}) => (
  <Icon
    name="chevron"
    size={size}
    color={color}
    direction={direction}
    style={style}
    accessibilityLabel={`Chevron ${direction}`}
  />
);

export const BackIcon: React.FC<IconProps> = (props) => (
  <ChevronIcon direction="left" {...props} />
);

export const ArrowRightIcon: React.FC<IconProps> = (props) => (
  <ChevronIcon direction="right" {...props} />
);

export const CloseIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.sm,
  color = ICON_COLORS.primary,
  style,
  onPress,
  interactive,
}) => (
  <AnimatedIcon
    name="close"
    size={size}
    color={color}
    interactive={interactive}
    onPress={onPress}
    style={style}
    accessibilityLabel="Close"
  />
);

export const SettingsIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.sm,
  color = ICON_COLORS.primary,
  state = 'idle',
  style,
  onPress,
  interactive,
  triggerAnimation,
}) => (
  <AnimatedIcon
    name="settings"
    size={size}
    color={color}
    state={state}
    interactive={interactive}
    onPress={onPress}
    style={style}
    triggerAnimation={triggerAnimation}
    accessibilityLabel="Settings"
  />
);

// ============================================================================
// 4. GAME MODES & EXPERIENCE IDENTITIES
// ============================================================================
export const RobotIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.md,
  color = ICON_COLORS.playEmerald,
  style,
}) => (
  <AnimatedIcon
    name="solo"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="Solo AI Robot"
  />
);

export const SoloIcon = RobotIcon;

export const FriendIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.md,
  color = ICON_COLORS.gold,
  style,
}) => (
  <AnimatedIcon
    name="private_room"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="Private Room with Friend"
  />
);

export const PuzzleIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.md,
  color = ICON_COLORS.playEmerald,
  style,
}) => (
  <AnimatedIcon
    name="daily"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="Daily Puzzle Challenge"
  />
);

export const LocalIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.md,
  color = ICON_COLORS.info,
  style,
}) => (
  <AnimatedIcon
    name="shuffle"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="Local Practice Match"
  />
);

export const RoomIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.md,
  color = ICON_COLORS.primary,
  style,
}) => (
  <AnimatedIcon
    name="private_room"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="Room"
  />
);

export const UsersIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.md,
  color = ICON_COLORS.primary,
  style,
}) => (
  <AnimatedIcon
    name="multiplayer"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="Multiplayer Players"
  />
);

export const MultiplayerIcon = UsersIcon;

export const RankedLightningIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.md,
  color = ICON_COLORS.gold,
  variant = 'filled',
  style,
}) => (
  <AnimatedIcon
    name="ranked"
    size={size}
    color={color}
    variant={variant}
    style={style}
    accessibilityLabel="Ranked Competitive Lightning"
  />
);

export const DailyIcon = PuzzleIcon;
export const PrivateRoomIcon = RoomIcon;

export const JoinRoomIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.md,
  color = ICON_COLORS.primary,
  style,
}) => (
  <AnimatedIcon
    name="join_room"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="Join Room"
  />
);

export const CreateRoomIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.md,
  color = ICON_COLORS.primary,
  style,
}) => (
  <AnimatedIcon
    name="create_room"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="Create Room"
  />
);

// ============================================================================
// 5. PLAYER, TROPHY, RANK & STREAK
// ============================================================================
export const TrophyIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.md,
  color = ICON_COLORS.gold,
  style,
}) => (
  <AnimatedIcon
    name="trophy"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="Trophy"
  />
);

export const CrownIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.md,
  color = ICON_COLORS.gold,
  style,
}) => (
  <AnimatedIcon
    name="winner"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="Crown"
  />
);

export const RankIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.sm,
  color = ICON_COLORS.gold,
  style,
}) => (
  <AnimatedIcon
    name="rank"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="Rank Star"
  />
);

export const StreakIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.md,
  color = ICON_COLORS.gold,
  style,
}) => (
  <AnimatedIcon
    name="streak"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="Win Streak Flame"
  />
);

export const AchievementIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.sm,
  color = ICON_COLORS.gold,
  style,
}) => (
  <AnimatedIcon
    name="achievement"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="Achievement Medal"
  />
);

export const LevelIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.sm,
  color = ICON_COLORS.gold,
  style,
}) => (
  <AnimatedIcon
    name="level"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="Level Tier"
  />
);

export const HistoryIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.sm,
  color = ICON_COLORS.primary,
  style,
}) => (
  <AnimatedIcon
    name="history"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="Match History"
  />
);

export const StatisticsIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.sm,
  color = ICON_COLORS.primary,
  style,
}) => (
  <AnimatedIcon
    name="statistics"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="Player Statistics"
  />
);

export const CalendarIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.md,
  color = ICON_COLORS.primary,
  style,
}) => (
  <AnimatedIcon
    name="daily"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="Calendar Date"
  />
);

// ============================================================================
// 6. UTILITY, AUDIO, SENSORS & SYSTEM
// ============================================================================
export const VolumeIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.md,
  color = ICON_COLORS.primary,
  muted = false,
  style,
  interactive,
  onPress,
}) => (
  <AnimatedIcon
    name={muted ? 'mute' : 'sound'}
    size={size}
    color={muted ? ICON_COLORS.muted : color}
    interactive={interactive}
    onPress={onPress}
    style={style}
    accessibilityLabel={muted ? 'Sound muted' : 'Sound enabled'}
  />
);

export const MuteIcon: React.FC<IconProps> = (props) => (
  <VolumeIcon muted={true} {...props} />
);

export const SpeechIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.md,
  color = ICON_COLORS.primary,
  active = true,
  style,
  interactive,
  onPress,
}) => (
  <AnimatedIcon
    name="speech"
    size={size}
    color={active ? color : ICON_COLORS.muted}
    interactive={interactive}
    onPress={onPress}
    style={style}
    accessibilityLabel={active ? 'Speech caller active' : 'Speech caller muted'}
  />
);

export const VibrationIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.sm,
  color = ICON_COLORS.primary,
  style,
}) => (
  <AnimatedIcon
    name="vibration"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="Haptic Vibration"
  />
);

export const LockIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.sm,
  color = ICON_COLORS.muted,
  style,
}) => (
  <AnimatedIcon
    name="locked"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="Locked"
  />
);

export const UnlockIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.sm,
  color = ICON_COLORS.muted,
  style,
}) => (
  <AnimatedIcon
    name="unlocked"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="Unlocked"
  />
);

export const RefreshIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.sm,
  color = ICON_COLORS.primary,
  style,
  interactive,
  onPress,
  triggerAnimation,
}) => (
  <AnimatedIcon
    name="refresh"
    size={size}
    color={color}
    interactive={interactive}
    onPress={onPress}
    style={style}
    triggerAnimation={triggerAnimation}
    accessibilityLabel="Refresh"
  />
);

export const ShareIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.sm,
  color = ICON_COLORS.primary,
  style,
}) => (
  <AnimatedIcon
    name="share"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="Share"
  />
);

export const CopyIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.sm,
  color = ICON_COLORS.primary,
  style,
}) => (
  <AnimatedIcon
    name="copy"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="Copy to clipboard"
  />
);

export const CheckIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.sm,
  color = ICON_COLORS.playEmerald,
  style,
}) => (
  <AnimatedIcon
    name="success"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="Success verified"
  />
);

export const WarningIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.sm,
  color = ICON_COLORS.warning,
  style,
}) => (
  <AnimatedIcon
    name="warning"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="Warning"
  />
);

export const ErrorIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.sm,
  color = ICON_COLORS.danger,
  style,
}) => (
  <AnimatedIcon
    name="error"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="Error"
  />
);

export const SearchIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.sm,
  color = ICON_COLORS.primary,
  style,
}) => (
  <AnimatedIcon
    name="search"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="Search"
  />
);

export const NotificationsIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.sm,
  color = ICON_COLORS.primary,
  style,
}) => (
  <AnimatedIcon
    name="notifications"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="Notifications"
  />
);

export const InfoIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.sm,
  color = ICON_COLORS.primary,
  style,
}) => (
  <AnimatedIcon
    name="information"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="Information"
  />
);

export const HelpIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.sm,
  color = ICON_COLORS.primary,
  style,
}) => (
  <AnimatedIcon
    name="help"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="Help"
  />
);

export const MoreIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.sm,
  color = ICON_COLORS.primary,
  style,
}) => (
  <AnimatedIcon
    name="more"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="More options"
  />
);

export const LoadingIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.md,
  color = ICON_COLORS.primary,
  style,
}) => (
  <AnimatedIcon
    name="loading"
    size={size}
    color={color}
    style={style}
    accessibilityLabel="Loading"
  />
);

export const TimerIcon: React.FC<IconProps> = (props) => (
  <HistoryIcon {...props} />
);

export const ConnectionIcon: React.FC<IconProps> = ({
  size = ICON_SIZES.sm,
  connected = true,
  color,
  style,
}) => (
  <AnimatedIcon
    name={connected ? 'success' : 'error'}
    size={size}
    color={color || (connected ? ICON_COLORS.playEmerald : ICON_COLORS.danger)}
    style={style}
    accessibilityLabel={connected ? 'Connected' : 'Disconnected'}
  />
);

export const DisconnectIcon: React.FC<IconProps> = (props) => (
  <ConnectionIcon connected={false} color={ICON_COLORS.danger} {...props} />
);
