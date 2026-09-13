import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle, View, StyleProp } from 'react-native';
import { COLORS, RADIUS, SPACING, TOUCH_TARGET, TYPOGRAPHY } from '../../design/tokens';
import { InlineLoader } from './InlineLoader';
import { useTheme } from '../../design/theme';

export interface GameButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'outline' | 'danger' | 'pill';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export const GameButton: React.FC<GameButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  style,
  testID,
}) => {
  const { theme, isDark } = useTheme();

  const getBgColor = () => {
    if (disabled) return theme.bgRecessed;
    switch (variant) {
      case 'pill':
        return COLORS.cleanWhite;
      case 'secondary':
        return theme.bgCard;
      case 'success':
      case 'primary':
        return COLORS.gentleOlive;
      case 'danger':
        return COLORS.dangerRed;
      case 'outline':
        return 'transparent';
      default:
        return COLORS.gentleOlive;
    }
  };

  const getTextColor = () => {
    if (disabled) return theme.textMuted;
    if (variant === 'primary' || variant === 'success') return COLORS.lunarShadow;
    if (variant === 'pill') return COLORS.lunarShadow;
    if (variant === 'outline') return theme.textPrimary;
    if (variant === 'danger') return '#FFFFFF';
    return theme.textPrimary;
  };

  const getDimensions = () => {
    const isPill = variant === 'pill';
    switch (size) {
      case 'sm':
        return {
          paddingVertical: SPACING.sm, // 8px
          paddingHorizontal: SPACING.md, // 12px
          minHeight: 36,
          borderRadius: isPill ? RADIUS.pill : RADIUS.compact,
        };
      case 'lg':
        return {
          paddingVertical: SPACING.lg, // 16px
          paddingHorizontal: SPACING.xl, // 20px
          minHeight: 52,
          borderRadius: isPill ? RADIUS.pill : RADIUS.control,
        };
      case 'md':
      default:
        return {
          paddingVertical: SPACING.md, // 12px
          paddingHorizontal: SPACING.lg, // 16px
          minHeight: TOUCH_TARGET.minSize, // 44px
          borderRadius: isPill ? RADIUS.pill : RADIUS.control,
        };
    }
  };

  const dim = getDimensions();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled || loading}
      testID={testID}
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
              ? theme.borderSubtle
              : variant === 'secondary'
              ? theme.borderSubtle
              : variant === 'pill'
              ? theme.borderSubtle
              : 'transparent',
          borderWidth: variant === 'outline' || variant === 'secondary' || variant === 'pill' ? 1 : 0,
          width: fullWidth ? '100%' : undefined,
        },
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
    >
      {/* Top Specular Bevel for Secondary, Primary, and Pill */}
      {(variant === 'primary' || variant === 'secondary' || variant === 'pill') && !disabled && (
        <View
          style={[
            styles.topBevel,
            {
              backgroundColor: isDark
                ? 'rgba(255, 255, 255, 0.16)'
                : 'rgba(255, 255, 255, 0.4)',
            },
          ]}
        />
      )}

      {loading ? (
        <InlineLoader
          size={size === 'lg' ? 20 : 16}
          color={variant === 'primary' || variant === 'success' || variant === 'pill' ? COLORS.lunarShadow : theme.textPrimary}
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
                fontFamily: TYPOGRAPHY.fontFamily,
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
