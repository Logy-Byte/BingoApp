import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { COLORS, RADIUS, SHADOWS, SPACING } from '../../design/tokens';
import { useTheme } from '../../design/theme';

interface GameCardProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  highlight?: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({ children, style, highlight = false }) => {
  const { theme, isDark } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.bgCard,
          borderColor: highlight ? theme.accentOlive : theme.borderSubtle,
        },
        style,
      ]}
    >
      <View
        style={[
          styles.topBevel,
          {
            backgroundColor: isDark
              ? 'rgba(255, 255, 255, 0.08)'
              : 'rgba(255, 255, 255, 0.6)',
          },
        ]}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: RADIUS.surface,
    borderWidth: 1,
    padding: SPACING.lg, // 16px
    position: 'relative',
    overflow: 'hidden',
    ...SHADOWS.subtle,
  },
  topBevel: {
    position: 'absolute',
    top: 0,
    left: 12,
    right: 12,
    height: 1,
  },
  highlight: {
    borderColor: COLORS.gentleOlive,
  },
});

