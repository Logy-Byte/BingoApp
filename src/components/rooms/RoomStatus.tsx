import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../design/tokens';
import { useTheme } from '../../design/theme';
import { RoomPageState } from '../../domain/state/useMultiplayerRoom';

export interface RoomStatusProps {
  state: RoomPageState;
  playerCount?: number;
  maxPlayers?: number;
  testID?: string;
}

export const RoomStatus: React.FC<RoomStatusProps> = ({
  state,
  playerCount = 1,
  maxPlayers = 2,
  testID = 'room-status',
}) => {
  const { theme } = useTheme();

  const getStatusConfig = () => {
    switch (state) {
      case 'CREATING':
        return {
          label: 'CREATING ROOM',
          sub: 'Setting up private arena session...',
          badgeBg: theme.accentHazelTint,
          textColor: '#8A6724',
          dotColor: '#F59E0B',
        };
      case 'WAITING':
        return {
          label: 'WAITING FOR OPPONENT',
          sub: `${playerCount} / ${maxPlayers} players connected`,
          badgeBg: theme.accentOliveTint,
          textColor: COLORS.lunarShadow,
          dotColor: COLORS.gentleOlive,
        };
      case 'JOINING':
        return {
          label: 'CONNECTING',
          sub: 'Validating room code with match host...',
          badgeBg: theme.accentHazelTint,
          textColor: '#8A6724',
          dotColor: '#F59E0B',
        };
      case 'ROOM_READY':
        return {
          label: 'ROOM READY',
          sub: 'Both players connected • 2 / 2 PLAYERS',
          badgeBg: 'rgba(16, 185, 129, 0.15)',
          textColor: '#059669',
          dotColor: '#10B981',
        };
      case 'STARTING':
        return {
          label: 'STARTING MATCH',
          sub: 'Synchronizing authoritative boards...',
          badgeBg: 'rgba(16, 185, 129, 0.2)',
          textColor: '#059669',
          dotColor: '#10B981',
        };
      case 'CLOSED':
        return {
          label: 'ROOM CLOSED',
          sub: 'This room is no longer available.',
          badgeBg: 'rgba(239, 68, 68, 0.12)',
          textColor: COLORS.dangerRed,
          dotColor: COLORS.dangerRed,
        };
      case 'EXPIRED':
        return {
          label: 'ROOM EXPIRED',
          sub: 'The room waiting period has timed out.',
          badgeBg: 'rgba(239, 68, 68, 0.12)',
          textColor: COLORS.dangerRed,
          dotColor: COLORS.dangerRed,
        };
      case 'ERROR':
        return {
          label: 'ERROR',
          sub: 'Unable to complete room action.',
          badgeBg: 'rgba(239, 68, 68, 0.12)',
          textColor: COLORS.dangerRed,
          dotColor: COLORS.dangerRed,
        };
      case 'IDLE':
      default:
        return {
          label: 'PRIVATE ROOMS',
          sub: 'Create or join a 1v1 private match',
          badgeBg: theme.bgSubtle,
          textColor: theme.textSecondary,
          dotColor: theme.textMuted,
        };
    }
  };

  const config = getStatusConfig();

  return (
    <View testID={testID} style={styles.container}>
      <View style={[styles.badge, { backgroundColor: config.badgeBg }]}>
        <View style={[styles.dot, { backgroundColor: config.dotColor }]} />
        <Text style={[styles.badgeText, { color: config.textColor }]}>
          {config.label}
        </Text>
      </View>
      <Text style={[styles.subText, { color: theme.textSecondary }]}>
        {config.sub}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: SPACING.sm,
    gap: 4,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.pill,
    gap: 6,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
    letterSpacing: 0.8,
  },
  subText: {
    fontSize: 12,
    fontFamily: TYPOGRAPHY.fontFamily,
    textAlign: 'center',
  },
});
