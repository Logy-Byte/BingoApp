import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../design/tokens';
import { useTheme } from '../../design/theme';
import { RobotIcon, ChevronIcon } from '../icons/CustomIcons';
import { StatusBadge } from '../shared/StatusBadge';

export interface RobotPracticeCardProps {
  onPress: () => void;
  disabled?: boolean;
  selectedDifficulty?: 'EASY' | 'MEDIUM' | 'HARD';
  testID?: string;
}

export const RobotPracticeCard: React.FC<RobotPracticeCardProps> = ({
  onPress,
  disabled = false,
  selectedDifficulty = 'MEDIUM',
  testID,
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      testID={testID}
      style={[
        styles.card,
        {
          backgroundColor: theme.bgCard,
          borderColor: theme.borderSubtle,
        },
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.82}
      accessibilityRole="button"
      accessibilityLabel="Solo practice against AI Robot"
    >
      {/* Top Status Layer */}
      <View style={styles.topRow}>
        <View style={styles.iconSphere}>
          <RobotIcon size={18} color={COLORS.lunarShadow} />
        </View>
        <StatusBadge variant="bot" label="OFFLINE AI" />
      </View>

      {/* Middle Content Layer */}
      <View style={styles.contentLayer}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>
          Robot / Solo Practice
        </Text>
        <Text style={[styles.desc, { color: theme.textSecondary }]}>
          3 Difficulty Levels • Instant offline play
        </Text>
      </View>

      {/* Action Footer */}
      <View style={styles.footerRow}>
        <View style={styles.tagPill}>
          <Text style={styles.tagText}>{selectedDifficulty}</Text>
        </View>
        <View style={styles.playHint}>
          <Text style={[styles.playHintText, { color: COLORS.gentleOlive }]}>PLAY</Text>
          <ChevronIcon size={14} color={COLORS.gentleOlive} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: RADIUS.surface,
    padding: SPACING.md,
    borderWidth: 1.5,
    borderBottomWidth: 4,
    borderBottomColor: '#CBD5E1',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    minHeight: 140,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  iconSphere: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(203, 215, 126, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentLayer: {
    gap: 3,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: -0.2,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  desc: {
    fontSize: 11,
    fontWeight: '500',
    fontFamily: TYPOGRAPHY.fontFamily,
    lineHeight: 15,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.xs,
  },
  tagPill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.compact,
    backgroundColor: 'rgba(230, 202, 154, 0.25)',
  },
  tagText: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.6,
    color: '#8A6724',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  playHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  playHintText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});
