import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../design/tokens';
import { RankedLightningIcon } from '../icons/CustomIcons';
import { useTheme } from '../../design/theme';

interface StreakBarChartProps {
  currentStreak?: number;
  totalWeekWins?: number;
}

/**
 * 7-Day Activity & Streak Bar Chart
 * Directly extracted from Reference Image 2 "Energy saving" vertical bar chart:
 * - Rounded vertical pill bars with varied heights
 * - Active days rendered in Gentle Olive (#CBD77E) with lightning pip
 * - Inactive days rendered in neutral gray
 * - Sora tabular numbers on bottom axis
 */
export const StreakBarChart: React.FC<StreakBarChartProps> = ({
  currentStreak = 6,
  totalWeekWins = 14,
}) => {
  const { theme } = useTheme();

  const days = [
    { label: '21', dayName: 'M', height: 48, active: true, hasLightning: false },
    { label: '22', dayName: 'T', height: 64, active: true, hasLightning: true },
    { label: '23', dayName: 'W', height: 40, active: true, hasLightning: false },
    { label: '24', dayName: 'T', height: 56, active: false, hasLightning: false },
    { label: '25', dayName: 'F', height: 72, active: false, hasLightning: false },
    { label: '26', dayName: 'S', height: 44, active: false, hasLightning: false },
    { label: '27', dayName: 'S', height: 32, active: false, hasLightning: false },
  ];

  return (
    <View
      style={[
        styles.cardContainer,
        {
          backgroundColor: theme.bgCard,
          borderColor: theme.borderSubtle,
        },
      ]}
    >
      {/* Header with Title & Metric */}
      <View style={styles.headerRow}>
        <View>
          <Text style={[styles.headerTitle, { color: theme.textSecondary }]}>
            Weekly Match Activity
          </Text>
          <Text style={[styles.kpiValue, { color: theme.textPrimary }]}>
            {totalWeekWins}{' '}
            <Text style={[styles.kpiUnit, { color: theme.textSecondary }]}>Wins</Text>
          </Text>
        </View>

        <View
          style={[
            styles.streakBadge,
            { backgroundColor: 'transparent', borderColor: theme.borderSubtle },
          ]}
        >
          <RankedLightningIcon size={12} color={COLORS.primaryOrange} />
          <Text style={[styles.streakBadgeText, { color: theme.textPrimary }]}>+ {currentStreak} DAY STREAK</Text>
        </View>
      </View>

      {/* 7 Vertical Pill Bars */}
      <View style={styles.barsRow}>
        {days.map((item, idx) => {
          const barColor = item.active
            ? COLORS.primaryOrange
            : theme.isDark
            ? '#363A42'
            : '#E2E8F0';

          return (
            <View key={`day-${idx}-${item.label}`} style={styles.barColumn}>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barPill,
                    {
                      height: item.height,
                      backgroundColor: barColor,
                    },
                  ]}
                >
                  {item.hasLightning && (
                    <View style={styles.barLightningWrap}>
                      <RankedLightningIcon size={14} color={COLORS.lunarShadow} />
                    </View>
                  )}
                </View>
              </View>

              <Text
                style={[
                  styles.dayLabel,
                  {
                    color: item.active ? theme.textPrimary : theme.textMuted,
                    fontWeight: item.active ? '700' : '500',
                  },
                ]}
              >
                {item.label}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: RADIUS.hero, // 24px
    padding: SPACING.lg, // 16px
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
    marginVertical: SPACING.sm, // 8px
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md, // 12px
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: TYPOGRAPHY.fontFamily,
    letterSpacing: 0.2,
  },
  kpiValue: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
    marginTop: 2,
  },
  kpiUnit: {
    fontSize: 13,
    fontWeight: '500',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
  },
  streakBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.lunarShadow,
    letterSpacing: 0.5,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  barsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 84,
    paddingTop: SPACING.xs,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 6,
  },
  barTrack: {
    height: 72,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  barPill: {
    width: 24,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  barLightningWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayLabel: {
    fontSize: 11,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});
