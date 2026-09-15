import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../design/tokens';
import { useTheme } from '../../design/theme';
import { MultiplayerIcon, UsersIcon, RobotIcon, ChevronIcon } from '../icons/CustomIcons';

export type GameModeId = 'ONLINE' | 'FRIENDS' | 'AI';

interface GameModeCardProps {
  id: GameModeId;
  title: string;
  tagline: string;
  badge?: string;
  onPress: () => void;
  style?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
}

export const GameModeCard: React.FC<GameModeCardProps> = ({
  id,
  title,
  tagline,
  badge,
  onPress,
  style,
  testID,
  accessibilityLabel,
}) => {
  const { theme } = useTheme();

  const getIcon = () => {
    switch (id) {
      case 'ONLINE':
        return <MultiplayerIcon size={28} color={COLORS.primaryOrange} />;
      case 'FRIENDS':
        return <UsersIcon size={28} color={COLORS.primaryOrange} />;
      case 'AI':
        return <RobotIcon size={28} color={COLORS.primaryOrange} />;
    }
  };

  const isPrimary = id === 'ONLINE';

  return (
    <TouchableOpacity
      testID={testID}
      style={[
        styles.card,
        {
          backgroundColor: theme.bgCard,
          borderColor: isPrimary ? COLORS.primaryOrange : theme.borderSubtle,
        },
        isPrimary && styles.primaryHighlight,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.88}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || `${title}: ${tagline}`}
    >
      <View style={styles.contentRow}>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: isPrimary
                ? 'rgba(255, 122, 0, 0.12)'
                : theme.bgRecessed,
              borderColor: isPrimary ? COLORS.primaryOrange : theme.borderSubtle,
            },
          ]}
        >
          {getIcon()}
        </View>

        <View style={styles.textContainer}>
          <View style={styles.titleRow}>
            <Text style={[styles.title, { color: theme.textPrimary }]}>
              {title}
            </Text>
            {badge && (
              <View style={[styles.badge, { backgroundColor: COLORS.primaryOrange }]}>
                <Text style={styles.badgeText}>{badge}</Text>
              </View>
            )}
          </View>
          <Text style={[styles.tagline, { color: theme.textSecondary }]}>
            {tagline}
          </Text>
        </View>

        <View
          style={[
            styles.arrowButton,
            {
              backgroundColor: isPrimary ? COLORS.primaryOrange : theme.bgRecessed,
              borderColor: isPrimary ? COLORS.primaryOrange : theme.borderSubtle,
            },
          ]}
        >
          <ChevronIcon
            size={16}
            direction="right"
            color={isPrimary ? '#FFFFFF' : theme.textPrimary}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: RADIUS.surface,
    padding: SPACING.lg,
    borderWidth: 1.5,
    marginVertical: SPACING.xs,
    shadowColor: COLORS.primaryOrange,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  primaryHighlight: {
    borderWidth: 2,
    borderBottomWidth: 4,
    borderBottomColor: '#E06900',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: RADIUS.control,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginRight: SPACING.md,
  },
  textContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginBottom: 4,
  },
  title: {
    fontFamily: TYPOGRAPHY.brandFamily,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  badge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: RADIUS.pill,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  tagline: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 13,
    lineHeight: 18,
  },
  arrowButton: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginLeft: SPACING.sm,
  },
});
