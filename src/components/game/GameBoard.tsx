import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Board5x5, GridCell5x5 } from '../../domain/types';
import { GameCell } from './GameCell';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../design/tokens';
import { useTheme } from '../../design/theme';

interface GameBoardProps {
  board: Board5x5;
  calledNumbersSet: Set<number>;
  onCellPress: (cell: GridCell5x5) => void;
  maxWidth?: number;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  board,
  calledNumbersSet,
  onCellPress,
  maxWidth = 360,
}) => {
  const { theme } = useTheme();
  const size = 5;
  const availableWidth = Math.min(maxWidth, 400) - SPACING.md * 2;
  const cellSize = Math.floor((availableWidth - (size - 1) * SPACING.xs) / size);

  return (
    <View
      style={[
        styles.boardTray,
        {
          backgroundColor: theme.bgCard,
          borderColor: theme.borderSubtle,
        },
      ]}
    >
      {/* Top Specular Rim Reflection */}
      <View style={styles.topRimReflection} />

      {/* Board Brand & Matrix Banner */}
      <View style={styles.boardHeader}>
        <View
          style={[
            styles.brandPill,
            { backgroundColor: theme.accentHazelTint, borderColor: COLORS.winterHazel },
          ]}
        >
          <Text style={[styles.brandText, { color: '#8A6724' }]}>5×5 BINGO TABLE</Text>
        </View>
        <Text style={[styles.matrixInfo, { color: theme.textMuted }]}>
          NUMBERS 1–25 • TAP TO DAUB
        </Text>
      </View>

      {/* 5x5 Matrix Layout */}
      <View style={styles.gridContainer}>
        {board.matrix.map((row, rIdx) => (
          <View key={`r-${rIdx}`} style={styles.gridRow}>
            {row.map((cell) => {
              const isCalled = calledNumbersSet.has(cell.value);
              return (
                <GameCell
                  key={cell.id}
                  cell={cell}
                  isCalled={isCalled}
                  cellSize={cellSize}
                  onPress={onCellPress}
                />
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boardTray: {
    borderRadius: RADIUS.sheet, // 28px
    padding: SPACING.md, // 12px
    borderWidth: 1,
    alignItems: 'center',
    marginVertical: SPACING.sm, // 8px
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },
  topRimReflection: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  boardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: SPACING.xs, // 4px
    marginBottom: SPACING.sm, // 8px
  },
  brandPill: {
    paddingHorizontal: SPACING.sm, // 8px
    paddingVertical: 2,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
  },
  brandText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  matrixInfo: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  gridContainer: {
    alignItems: 'center',
    gap: SPACING.xs, // 4px
  },
  gridRow: {
    flexDirection: 'row',
    gap: SPACING.xs, // 4px
  },
});
