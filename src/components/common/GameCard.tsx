import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { COLORS, RADIUS, SHADOWS, SPACING } from '../../design/tokens';

interface GameCardProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  highlight?: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({ children, style, highlight = false }) => {
  return (
    <View
      style={[
        styles.card,
        highlight && styles.highlight,
        style,
      ]}
    >
      <View style={styles.topBevel} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surfaceRaised,
    borderRadius: RADIUS.surface,
    borderWidth: 1,
    borderColor: COLORS.floatingDockBorder,
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
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
  },
  highlight: {
    borderColor: COLORS.playEmerald,
  },
});

