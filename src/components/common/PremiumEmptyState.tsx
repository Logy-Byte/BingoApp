/**
 * PremiumEmptyState
 * Apple HIG-grade Empty & Error State Component
 * Strictly vector-driven (zero emojis), concentric geometry, tactile affordances.
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {
  COLORS,
  RADIUS,
  SPACING,
  TYPOGRAPHY,
  calcConcentricRadius,
  TOUCH_TARGET,
  SPRING_CONFIGS,
} from '../../design/tokens';
import { useTheme } from '../../design/theme';
import {
  IconTicket,
  IconWifiOff,
  SearchIcon,
  BingoIdentityIcon,
} from '../icons/CustomIcons';

export type EmptyStateVariant =
  | 'NO_ACTIVE_ROOMS'
  | 'ZERO_TICKETS'
  | 'SEARCH_NO_MATCHES'
  | 'CONNECTION_SEVERED'
  | 'CUSTOM';

export interface PremiumEmptyStateProps {
  variant?: EmptyStateVariant;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  customIcon?: React.ReactNode;
  style?: ViewStyle;
}

export const PremiumEmptyState: React.FC<PremiumEmptyStateProps> = ({
  variant = 'NO_ACTIVE_ROOMS',
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  customIcon,
  style,
}) => {
  const { theme } = useTheme();
  const [isPressed, setIsPressed] = useState(false);

  // Derive preset configuration
  const getPreset = () => {
    switch (variant) {
      case 'NO_ACTIVE_ROOMS':
        return {
          icon: <IconTicket size={40} color={COLORS.winterHazel} />,
          title: title || 'No Active Tables Found',
          description:
            description ||
            'There are currently no public rooms in progress. Create your own arena or challenge our AI robot.',
          actionLabel: actionLabel || 'Create New Room',
        };
      case 'ZERO_TICKETS':
        return {
          icon: <BingoIdentityIcon size={40} color={COLORS.goldPrimary} variant="outline" />,
          title: title || 'Out of Match Tickets',
          description:
            description ||
            'You need at least 1 ticket to stake in this room. Collect daily bonus rewards or purchase cards.',
          actionLabel: actionLabel || 'Claim Daily Reward',
        };
      case 'SEARCH_NO_MATCHES':
        return {
          icon: <SearchIcon size={38} color={theme.textMuted} />,
          title: title || 'No Matching Rooms',
          description:
            description ||
            'No game rooms match your current filter parameters. Try clearing your query.',
          actionLabel: actionLabel || 'Reset Search',
        };
      case 'CONNECTION_SEVERED':
        return {
          icon: <IconWifiOff size={38} color={COLORS.dangerRed} />,
          title: title || 'Connection Severed',
          description:
            description ||
            'Live connection to authoritative game server lost. Reconnecting to sync match stream...',
          actionLabel: actionLabel || 'Reconnect Now',
        };
      case 'CUSTOM':
      default:
        return {
          icon: customIcon || <BingoIdentityIcon size={40} color={COLORS.gentleOlive} />,
          title: title || 'Nothing Here Yet',
          description: description || 'No items or activity to display at this time.',
          actionLabel: actionLabel || 'Refresh',
        };
    }
  };

  const preset = getPreset();
  const cardOuterRadius = RADIUS.hero; // 24px
  const iconRingOuterRadius = 40;       // 40px
  const iconRingPadding = 8;
  const iconRingInnerRadius = calcConcentricRadius(iconRingOuterRadius, iconRingPadding, 16);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.bgCard,
          borderColor: theme.borderSubtle,
          borderRadius: cardOuterRadius,
        },
        style,
      ]}
      accessibilityRole="alert"
    >
      {/* Top 1px Specular Highlight */}
      <View style={styles.topBevel} />

      {/* Concentric Icon Well */}
      <View
        style={[
          styles.iconOuterWell,
          {
            borderRadius: iconRingOuterRadius,
            borderColor: theme.borderSubtle,
            backgroundColor: theme.bgRecessed,
          },
        ]}
      >
        <View
          style={[
            styles.iconInnerCore,
            {
              borderRadius: iconRingInnerRadius,
              backgroundColor: theme.isDark ? '#1F242D' : '#F1F5F9',
              borderColor: COLORS.borderSpecular,
            },
          ]}
        >
          {preset.icon}
        </View>
      </View>

      {/* Typography Hierarchy */}
      <Text style={[styles.title, { color: theme.textPrimary }]}>
        {preset.title}
      </Text>

      <Text style={[styles.description, { color: theme.textSecondary }]}>
        {preset.description}
      </Text>

      {/* Actions */}
      <View style={styles.actionsContainer}>
        {preset.actionLabel && onAction && (
          <TouchableOpacity
            activeOpacity={0.88}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            onPress={onAction}
            style={[
              styles.primaryButton,
              {
                transform: [{ scale: isPressed ? SPRING_CONFIGS.cardPress.scaleDown : 1 }],
              },
            ]}
            hitSlop={TOUCH_TARGET.hitSlop}
            accessibilityRole="button"
            accessibilityLabel={preset.actionLabel}
          >
            <View style={styles.buttonBevel} />
            <Text style={styles.primaryButtonText}>{preset.actionLabel}</Text>
          </TouchableOpacity>
        )}

        {secondaryActionLabel && onSecondaryAction && (
          <TouchableOpacity
            onPress={onSecondaryAction}
            style={[
              styles.secondaryButton,
              {
                borderColor: theme.borderSubtle,
                backgroundColor: theme.bgRecessed,
              },
            ]}
            hitSlop={TOUCH_TARGET.hitSlop}
            accessibilityRole="button"
            accessibilityLabel={secondaryActionLabel}
          >
            <Text style={[styles.secondaryButtonText, { color: theme.textSecondary }]}>
              {secondaryActionLabel}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.xl,
    marginVertical: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 4,
  },
  topBevel: {
    position: 'absolute',
    top: 0,
    left: 12,
    right: 12,
    height: 1,
    backgroundColor: COLORS.borderSpecularStrong,
  },
  iconOuterWell: {
    width: 80,
    height: 80,
    padding: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  iconInnerCore: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
    letterSpacing: -0.2,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: TYPOGRAPHY.fontFamily,
    textAlign: 'center',
    maxWidth: 290,
    marginBottom: SPACING.lg,
  },
  actionsContainer: {
    width: '100%',
    maxWidth: 280,
    gap: SPACING.sm,
    alignItems: 'center',
  },
  primaryButton: {
    width: '100%',
    height: Math.max(46, TOUCH_TARGET.minSize),
    backgroundColor: COLORS.playEmerald,
    borderRadius: RADIUS.control,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: COLORS.playEmerald,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  buttonBevel: {
    position: 'absolute',
    top: 0,
    left: 4,
    right: 4,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0B0E14',
    fontFamily: TYPOGRAPHY.fontFamily,
    letterSpacing: 0.3,
  },
  secondaryButton: {
    width: '100%',
    height: Math.max(42, TOUCH_TARGET.minSize),
    borderRadius: RADIUS.control,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});
