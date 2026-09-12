import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle, View, StyleProp } from 'react-native';
import { COLORS, RADIUS, SPACING, TOUCH_TARGET } from '../../design/tokens';
import { InlineLoader } from './InlineLoader';

interface GameButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const GameButton: React.FC<GameButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  style,
}) => {
  const getBgColor = () => {
    if (disabled) return COLORS.surfaceDeep;
    switch (variant) {
      case 'secondary':
        return COLORS.surfaceRaised;
      case 'success':
        return COLORS.playEmerald;
      case 'danger':
        return COLORS.dangerRed;
      case 'outline':
        return 'transparent';
      case 'primary':
      default:
        return COLORS.playEmerald;
    }
  };

  const getTextColor = () => {
    if (disabled) return COLORS.textMuted;
    if (variant === 'primary' || variant === 'success') return COLORS.textDark;
    if (variant === 'outline') return COLORS.textPrimary;
    if (variant === 'danger') return '#FFFFFF';
    return COLORS.textPrimary;
  };

  const getDimensions = () => {
    switch (size) {
      case 'sm':
        return {
          paddingVertical: SPACING.sm, // 8px
          paddingHorizontal: SPACING.md, // 12px
          minHeight: 36,
          borderRadius: RADIUS.compact,
        };
      case 'lg':
        return {
          paddingVertical: SPACING.lg, // 16px
          paddingHorizontal: SPACING.xl, // 20px
          minHeight: 52,
          borderRadius: RADIUS.control,
        };
      case 'md':
      default:
        return {
          paddingVertical: SPACING.md, // 12px
          paddingHorizontal: SPACING.lg, // 16px
          minHeight: TOUCH_TARGET.minSize, // 44px
          borderRadius: RADIUS.control,
        };
    }
  };

  const dim = getDimensions();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.buttonBase,
        {
          paddingVertical: dim.paddingVertical,
          paddingHorizontal: dim.paddingHorizontal,
          minHeight: dim.minHeight,
          borderRadius: dim.borderRadius,
          backgroundColor: getBgColor(),
          borderColor:
            variant === 'outline'
              ? COLORS.borderStrong
              : variant === 'secondary'
              ? COLORS.floatingDockBorder
              : 'transparent',
          borderWidth: variant === 'outline' || variant === 'secondary' ? 1 : 0,
        },
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
    >
      {/* Top Specular Bevel for Secondary and Primary */}
      {(variant === 'primary' || variant === 'secondary') && !disabled && (
        <View style={styles.topBevel} />
      )}

      {loading ? (
        <InlineLoader
          size={size === 'lg' ? 20 : 16}
          color={variant === 'primary' || variant === 'success' ? COLORS.textDark : COLORS.textPrimary}
        />
      ) : (
        <View style={styles.contentRow}>
          {icon && <View style={styles.iconWrap}>{icon}</View>}
          <Text
            style={[
              styles.textBase,
              {
                fontSize: size === 'lg' ? 15 : size === 'sm' ? 12 : 13,
                color: getTextColor(),
                letterSpacing: -0.2,
              },
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonBase: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relative',
    overflow: 'hidden',
  },
  topBevel: {
    position: 'absolute',
    top: 0,
    left: 8,
    right: 8,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm, // 8px
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBase: {
    fontWeight: '700',
  },
});
