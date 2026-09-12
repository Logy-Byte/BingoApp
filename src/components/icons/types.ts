import { ViewStyle } from 'react-native';

export type IconFamily =
  | 'navigation'
  | 'gameplay'
  | 'modes'
  | 'player'
  | 'utility'
  | 'state';

export type IconVariant = 'outline' | 'filled' | 'duotone';

export type IconState =
  | 'idle'
  | 'pressed'
  | 'active'
  | 'selected'
  | 'disabled'
  | 'success'
  | 'attention';

export type IconName =
  // Navigation
  | 'home'
  | 'play'
  | 'leaderboard'
  | 'profile'
  // Gameplay
  | 'bingo'
  | 'number'
  | 'mark'
  | 'unmark'
  | 'next'
  | 'previous'
  | 'shuffle'
  | 'pause'
  | 'resume'
  | 'finish'
  | 'winner'
  // Game Modes
  | 'solo'
  | 'ranked'
  | 'multiplayer'
  | 'daily'
  | 'private_room'
  | 'join_room'
  | 'create_room'
  // Player
  | 'avatar'
  | 'level'
  | 'rank'
  | 'trophy'
  | 'streak'
  | 'achievement'
  | 'history'
  | 'statistics'
  // Utility
  | 'search'
  | 'settings'
  | 'notifications'
  | 'sound'
  | 'mute'
  | 'vibration'
  | 'speech'
  | 'information'
  | 'help'
  | 'close'
  | 'back'
  | 'chevron'
  | 'more'
  | 'copy'
  | 'share'
  | 'sun'
  | 'moon'
  | 'heart'
  // State
  | 'success'
  | 'warning'
  | 'error'
  | 'locked'
  | 'unlocked'
  | 'loading'
  | 'refresh';

export interface SvgElementPath {
  d: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: 'round' | 'butt' | 'square';
  strokeLinejoin?: 'round' | 'miter' | 'bevel';
  fillRule?: 'nonzero' | 'evenodd';
  opacity?: number;
}

export interface SvgElementCircle {
  cx: number;
  cy: number;
  r: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
}

export interface SvgElementRect {
  x: number;
  y: number;
  width: number;
  height: number;
  rx?: number;
  ry?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
}

export interface IconDefinition {
  family: IconFamily;
  viewBox?: string;
  paths?: SvgElementPath[];
  circles?: SvgElementCircle[];
  rects?: SvgElementRect[];
  filledPaths?: SvgElementPath[];
  duotoneSecondary?: {
    paths?: SvgElementPath[];
    circles?: SvgElementCircle[];
    rects?: SvgElementRect[];
  };
}

export interface BaseIconProps {
  size?: number;
  color?: string;
  secondaryColor?: string;
  strokeWidth?: number;
  variant?: IconVariant;
  state?: IconState;
  animated?: boolean;
  style?: ViewStyle;
  accessibilityLabel?: string;
  accessibilityRole?: 'image' | 'button' | 'tab';
  direction?: 'left' | 'right' | 'up' | 'down'; // for chevrons
}
