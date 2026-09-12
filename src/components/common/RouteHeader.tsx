import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { COLORS, RADIUS, SPACING, TOUCH_TARGET } from '../../design/tokens';
import { ChevronIcon } from '../icons/CustomIcons';

import { useTheme } from '../../design/theme';

interface RouteHeaderProps {
  title: string;
  onBack: () => void;
  rightElement?: React.ReactNode;
  subtitle?: string;
  style?: ViewStyle;
}

export const RouteHeader: React.FC<RouteHeaderProps> = ({
  title,
  onBack,
  rightElement,
  subtitle,
  style,
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        onPress={onBack}
        style={[
          styles.backButton,
          {
            backgroundColor: theme.bgCard,
            borderColor: theme.borderSubtle,
          },
        ]}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel="Navigate Back"
      >
        <ChevronIcon direction="left" size={20} color={theme.textPrimary} />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={[styles.titleText, { color: theme.textPrimary }]} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={[styles.subtitleText, { color: theme.textMuted }]} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      <View style={styles.rightContainer}>
        {rightElement ? rightElement : <View style={styles.placeholder} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg, // 16px
    paddingVertical: SPACING.sm, // 8px
    minHeight: 56,
  },
  backButton: {
    width: TOUCH_TARGET.minSize, // 44px
    height: TOUCH_TARGET.minSize, // 44px
    borderRadius: RADIUS.pill, // Circular icon button
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surfaceRaised,
    borderWidth: 1,
    borderColor: COLORS.floatingDockBorder,
  },
  titleContainer: {
    flex: 1,
    paddingHorizontal: SPACING.md, // 12px
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: -0.2,
  },
  subtitleText: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.textMuted,
    marginTop: SPACING.xxs, // 2px
  },
  rightContainer: {
    minWidth: TOUCH_TARGET.minSize,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  placeholder: {
    width: TOUCH_TARGET.minSize,
  },
});
