import React from 'react';
import { StyleSheet, View, Text, ViewStyle, StyleProp } from 'react-native';
import { COLORS, RADIUS, TYPOGRAPHY } from '../../design/tokens';
import { useTheme } from '../../design/theme';

export type StatusBadgeVariant =
  | 'human'
  | 'bot'
  | 'waiting'
  | 'online'
  | 'offline'
  | 'matched'
  | 'error'
  | 'closed';

export interface StatusBadgeProps {
  variant: StatusBadgeVariant;
  label?: string;
  pulse?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

interface BadgeConfig {
  defaultLabel: string;
  dotColor: string;
  bgColor: (theme: any) => string;
  textColor: (theme: any) => string;
  borderColor: (theme: any) => string;
}

const BADGE_CONFIGS: Record<StatusBadgeVariant, BadgeConfig> = {
  human: {
    defaultLabel: 'REAL HUMAN',
    dotColor: COLORS.gentleOlive,
    bgColor: (theme) => theme.accentOliveTint,
    textColor: () => COLORS.lunarShadow,
    borderColor: () => COLORS.gentleOlive,
  },
  bot: {
    defaultLabel: 'AI BOT',
    dotColor: COLORS.winterHazel,
    bgColor: (theme) => theme.accentHazelTint,
    textColor: () => '#8A6724',
    borderColor: () => COLORS.winterHazel,
  },
  waiting: {
    defaultLabel: 'IN QUEUE',
    dotColor: '#F59E0B',
    bgColor: () => 'rgba(245, 158, 11, 0.12)',
    textColor: () => '#D97706',
    borderColor: () => 'rgba(245, 158, 11, 0.35)',
  },
  online: {
    defaultLabel: 'LIVE ARENA',
    dotColor: '#10B981',
    bgColor: () => 'rgba(16, 185, 129, 0.12)',
    textColor: () => '#059669',
    borderColor: () => 'rgba(16, 185, 129, 0.35)',
  },
  offline: {
    defaultLabel: 'OFFLINE',
    dotColor: '#6B7280',
    bgColor: (theme) => theme.bgSubtle,
    textColor: (theme) => theme.textMuted,
    borderColor: (theme) => theme.borderSubtle,
  },
  matched: {
    defaultLabel: 'MATCH FOUND',
    dotColor: '#10B981',
    bgColor: (theme) => theme.accentOliveTint,
    textColor: () => COLORS.lunarShadow,
    borderColor: () => COLORS.gentleOlive,
  },
  error: {
    defaultLabel: 'ERROR',
    dotColor: COLORS.dangerRed,
    bgColor: () => 'rgba(239, 68, 68, 0.12)',
    textColor: () => COLORS.dangerRed,
    borderColor: () => 'rgba(239, 68, 68, 0.35)',
  },
  closed: {
    defaultLabel: 'CLOSED',
    dotColor: '#9CA3AF',
    bgColor: () => 'rgba(156, 163, 175, 0.15)',
    textColor: (theme) => theme.textMuted,
    borderColor: (theme) => theme.borderSubtle,
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  variant,
  label,
  pulse = false,
  style,
  testID,
}) => {
  const { theme } = useTheme();
  const config = BADGE_CONFIGS[variant] || BADGE_CONFIGS.online;
  const displayLabel = label || config.defaultLabel;

  return (
    <View
      testID={testID}
      style={[
        styles.badge,
        {
          backgroundColor: config.bgColor(theme),
          borderColor: config.borderColor(theme),
        },
        style,
      ]}
      accessibilityRole="text"
      accessibilityLabel={`Status: ${displayLabel}`}
    >
      <View
        style={[
          styles.dot,
          { backgroundColor: config.dotColor },
          pulse && styles.pulsingDot,
        ]}
      />
      <Text style={[styles.label, { color: config.textColor(theme) }]}>
        {displayLabel}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  pulsingDot: {
    transform: [{ scale: 1.1 }],
  },
  label: {
    fontSize: 9.5,
    fontWeight: '900',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});
