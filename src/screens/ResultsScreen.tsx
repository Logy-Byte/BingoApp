/**
 * ResultsScreen
 * Apple HIG-Grade Match Verdict & Scoreboard Sheet
 * Features animated XP Progress Wheel, itemized Prize Disbursement breakdown,
 * consolation breakdown, concentric geometry, and 100% SVG vector iconography (0 emojis).
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import {
  COLORS,
  RADIUS,
  SPACING,
  TYPOGRAPHY,
  calcConcentricRadius,
  TOUCH_TARGET,
  SPRING_CONFIGS,
} from '../design/tokens';
import {
  IconTrophy,
  IconCoinStack,
  IconGemstone,
  IconFire,
  IconSparkles,
  CloseIcon,
  WinnerIcon,
  ChevronIcon,
} from '../components/icons/CustomIcons';
import { useTheme } from '../design/theme';

interface ResultsScreenProps {
  hasWon: boolean;
  score: number;
  linesCompletedCount: number;
  totalCallsCount: number;
  matchDurationSec: number;
  isRanked?: boolean;
  ratingDelta?: number;
  winnerName?: string;
  isMultiplayer?: boolean;
  onPlayAgain: () => void;
  onReturnHome: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  hasWon,
  score,
  linesCompletedCount,
  totalCallsCount,
  matchDurationSec,
  isRanked = false,
  ratingDelta = 25,
  winnerName,
  isMultiplayer = false,
  onPlayAgain,
  onReturnHome,
}) => {
  const { theme } = useTheme();
  const [isPrimaryPressed, setIsPrimaryPressed] = useState(false);
  const [isSecondaryPressed, setIsSecondaryPressed] = useState(false);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  // Concentric metrics
  const cardRadius = RADIUS.sheet; // 28px
  const cardPadding = SPACING.xl;  // 20px
  const badgeOuterRadius = 40;
  const badgeInnerRadius = calcConcentricRadius(badgeOuterRadius, 6, 20);

  // Economic calculations
  const basePrizeCoins = hasWon ? 2500 : 150;
  const lineBonusCoins = linesCompletedCount * 250;
  const streakBonusCoins = hasWon ? 500 : 0;
  const totalCoinsAwarded = basePrizeCoins + lineBonusCoins + streakBonusCoins;
  const totalGemsAwarded = hasWon ? 25 : 5;
  const xpEarned = hasWon ? 450 : 120;
  const currentTierProgress = hasWon ? 78 : 62; // percentage to next level

  // XP Radial Wheel geometry
  const wheelSize = 64;
  const wheelStroke = 4.5;
  const wheelRadius = (wheelSize - wheelStroke) / 2;
  const wheelCircumference = 2 * Math.PI * wheelRadius;
  const wheelDashoffset = wheelCircumference - (currentTierProgress / 100) * wheelCircumference;

  return (
    <ScrollView
      contentContainerStyle={[styles.scrollContainer, { backgroundColor: theme.bgCanvas }]}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={[
          styles.sheetCard,
          {
            backgroundColor: theme.bgCard,
            borderColor: hasWon ? COLORS.winterHazel : theme.borderSubtle,
            borderRadius: cardRadius,
            padding: cardPadding,
          },
          hasWon && styles.sheetCardWonGlow,
        ]}
      >
        {/* Top Specular Edge Bevel */}
        <View style={styles.topBevel} />

        {/* Concentric Victory/Concluded Sphere Badge */}
        <View
          style={[
            styles.badgeOuterWell,
            {
              width: badgeOuterRadius * 2,
              height: badgeOuterRadius * 2,
              borderRadius: badgeOuterRadius,
              backgroundColor: theme.bgRecessed,
              borderColor: hasWon ? COLORS.winterHazel : theme.borderSubtle,
            },
          ]}
        >
          <View
            style={[
              styles.badgeInnerCore,
              {
                borderRadius: badgeInnerRadius,
                backgroundColor: hasWon ? theme.accentHazelTint : 'rgba(239, 68, 68, 0.14)',
                borderColor: hasWon ? COLORS.winterHazel : COLORS.dangerRed,
              },
            ]}
          >
            {hasWon ? (
              <WinnerIcon size={42} color={COLORS.winterHazel} />
            ) : (
              <CloseIcon size={34} color={COLORS.dangerRed} />
            )}
          </View>
        </View>

        {/* Title and Verdict */}
        <Text
          style={[
            styles.verdictTitle,
            { color: hasWon ? COLORS.winterHazel : theme.textPrimary },
          ]}
        >
          {hasWon ? 'BINGO VICTORY!' : 'MATCH CONCLUDED'}
        </Text>

        <Text style={[styles.verdictSubtitle, { color: theme.textSecondary }]}>
          {hasWon
            ? isMultiplayer && winnerName
              ? `Outstanding round, ${winnerName}! You verified all lines first.`
              : 'All winning patterns verified on authoritative game grid!'
            : isMultiplayer && winnerName
            ? `${winnerName} secured first claim. Consolation XP disbursed.`
            : 'Match draws concluded before all winning patterns were completed.'}
        </Text>

        {/* XP PROGRESS WHEEL SHELF */}
        <View
          style={[
            styles.xpProgressShelf,
            {
              backgroundColor: theme.bgRecessed,
              borderColor: theme.borderSubtle,
              borderRadius: RADIUS.surface,
            },
          ]}
        >
          <View style={styles.radialWheelWrapper}>
            <Svg width={wheelSize} height={wheelSize}>
              <Circle
                cx={wheelSize / 2}
                cy={wheelSize / 2}
                r={wheelRadius}
                stroke={theme.borderSubtle}
                strokeWidth={wheelStroke}
                fill="transparent"
              />
              <Circle
                cx={wheelSize / 2}
                cy={wheelSize / 2}
                r={wheelRadius}
                stroke={hasWon ? COLORS.goldPrimary : COLORS.gentleOlive}
                strokeWidth={wheelStroke}
                strokeDasharray={wheelCircumference}
                strokeDashoffset={wheelDashoffset}
                strokeLinecap="round"
                fill="transparent"
                transform={`rotate(-90 ${wheelSize / 2} ${wheelSize / 2})`}
              />
            </Svg>
            <View style={styles.wheelCenterContent}>
              <IconTrophy size={20} color={hasWon ? COLORS.goldPrimary : COLORS.gentleOlive} />
            </View>
          </View>

          <View style={styles.xpInfoCol}>
            <View style={styles.xpHeaderRow}>
              <Text style={[styles.xpLevelLabel, { color: theme.textPrimary }]}>
                Tier Progression
              </Text>
              <Text style={styles.xpGainText}>+{xpEarned} XP</Text>
            </View>
            <Text style={[styles.xpLevelSub, { color: theme.textSecondary }]}>
              {currentTierProgress}% to Platinum Master
            </Text>
          </View>
        </View>

        {/* ITEMIZED PRIZE DISBURSEMENT TABLE */}
        <View
          style={[
            styles.disbursementTable,
            {
              backgroundColor: theme.bgRecessed,
              borderColor: theme.borderSubtle,
              borderRadius: RADIUS.surface,
            },
          ]}
        >
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderTitle, { color: theme.textMuted }]}>
              {hasWon ? 'PRIZE DISBURSEMENT' : 'CONSOLATION REWARDS'}
            </Text>
            <View style={styles.verifiedTag}>
              <IconSparkles size={11} color={COLORS.winterHazel} />
              <Text style={[styles.verifiedTagText, { color: COLORS.winterHazel }]}>VERIFIED</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <Text style={[styles.rowLabel, { color: theme.textSecondary }]}>Base Placement</Text>
            <View style={styles.rowValGroup}>
              <IconCoinStack size={14} color={COLORS.goldPrimary} />
              <Text style={[styles.rowValText, { color: theme.textPrimary }]}>+{basePrizeCoins.toLocaleString()}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <Text style={[styles.rowLabel, { color: theme.textSecondary }]}>Lines Verified ({linesCompletedCount})</Text>
            <View style={styles.rowValGroup}>
              <IconCoinStack size={14} color={COLORS.goldPrimary} />
              <Text style={[styles.rowValText, { color: theme.textPrimary }]}>+{lineBonusCoins.toLocaleString()}</Text>
            </View>
          </View>

          {streakBonusCoins > 0 && (
            <View style={styles.tableRow}>
              <View style={styles.streakLabelRow}>
                <IconFire size={13} color="#F97316" />
                <Text style={[styles.rowLabel, { color: '#F97316' }]}>Daub Speed Streak</Text>
              </View>
              <View style={styles.rowValGroup}>
                <IconCoinStack size={14} color={COLORS.goldPrimary} />
                <Text style={[styles.rowValText, { color: COLORS.goldPrimary }]}>+{streakBonusCoins}</Text>
              </View>
            </View>
          )}

          <View style={[styles.tableDivider, { backgroundColor: theme.borderSubtle }]} />

          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { color: theme.textPrimary }]}>Total Disbursed</Text>
            <View style={styles.totalPillsRow}>
              <View style={[styles.rewardPill, { backgroundColor: 'rgba(245, 158, 11, 0.15)' }]}>
                <IconCoinStack size={14} color={COLORS.goldPrimary} />
                <Text style={styles.totalCoinVal}>+{totalCoinsAwarded.toLocaleString()}</Text>
              </View>
              <View style={[styles.rewardPill, { backgroundColor: 'rgba(56, 189, 248, 0.15)' }]}>
                <IconGemstone size={14} color={COLORS.infoBlue} />
                <Text style={styles.totalGemVal}>+{totalGemsAwarded}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 4-METRIC STATS GRID */}
        <View style={styles.metricsGrid}>
          <View style={[styles.metricCard, { backgroundColor: theme.bgRecessed, borderColor: theme.borderSubtle }]}>
            <Text style={[styles.metricLabel, { color: theme.textMuted }]}>FINAL SCORE</Text>
            <Text style={[styles.metricValue, { color: theme.textPrimary }]}>{score.toLocaleString()}</Text>
          </View>

          <View style={[styles.metricCard, { backgroundColor: theme.bgRecessed, borderColor: theme.borderSubtle }]}>
            <Text style={[styles.metricLabel, { color: theme.textMuted }]}>LINES</Text>
            <Text style={[styles.metricValue, { color: hasWon ? COLORS.winterHazel : theme.textPrimary }]}>
              {linesCompletedCount} / 5
            </Text>
          </View>

          <View style={[styles.metricCard, { backgroundColor: theme.bgRecessed, borderColor: theme.borderSubtle }]}>
            <Text style={[styles.metricLabel, { color: theme.textMuted }]}>BALLS DRAWN</Text>
            <Text style={[styles.metricValue, { color: theme.textPrimary }]}>{totalCallsCount}</Text>
          </View>

          <View style={[styles.metricCard, { backgroundColor: theme.bgRecessed, borderColor: theme.borderSubtle }]}>
            <Text style={[styles.metricLabel, { color: theme.textMuted }]}>DURATION</Text>
            <Text style={[styles.metricValue, { color: theme.textPrimary }]}>{formatTime(matchDurationSec)}</Text>
          </View>
        </View>

        {/* PRIMARY ACTION TRIGGERS */}
        <View style={styles.actionsGroup}>
          <TouchableOpacity
            style={[
              styles.primaryBtn,
              {
                backgroundColor: hasWon ? COLORS.winterHazel : COLORS.playEmerald,
                transform: [{ scale: isPrimaryPressed ? SPRING_CONFIGS.cardPress.scaleDown : 1 }],
              },
            ]}
            onPressIn={() => setIsPrimaryPressed(true)}
            onPressOut={() => setIsPrimaryPressed(false)}
            onPress={onPlayAgain}
            activeOpacity={0.88}
            accessibilityRole="button"
            accessibilityLabel={isMultiplayer ? 'Rematch opponent' : 'Play again'}
          >
            <View style={styles.btnBevel} />
            <Text style={styles.primaryBtnText}>
              {isMultiplayer ? 'Rematch Opponent' : 'Play Again'}
            </Text>
            <ChevronIcon direction="right" size={16} color="#0B0E14" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.secondaryBtn,
              {
                backgroundColor: theme.bgRecessed,
                borderColor: theme.borderSubtle,
                transform: [{ scale: isSecondaryPressed ? SPRING_CONFIGS.cardPress.scaleDown : 1 }],
              },
            ]}
            onPressIn={() => setIsSecondaryPressed(true)}
            onPressOut={() => setIsSecondaryPressed(false)}
            onPress={onReturnHome}
            activeOpacity={0.88}
            accessibilityRole="button"
            accessibilityLabel="Return to lobby"
          >
            <Text style={[styles.secondaryBtnText, { color: theme.textPrimary }]}>
              Return to Lobby
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.md,
    paddingVertical: SPACING.xl,
  },
  sheetCard: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    borderWidth: 1,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 8,
  },
  sheetCardWonGlow: {
    shadowColor: COLORS.winterHazel,
    shadowOpacity: 0.35,
    shadowRadius: 28,
  },
  topBevel: {
    position: 'absolute',
    top: 0,
    left: 12,
    right: 12,
    height: 1,
    backgroundColor: COLORS.borderSpecularStrong,
  },
  badgeOuterWell: {
    padding: 6,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  badgeInnerCore: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  verdictTitle: {
    fontSize: 22,
    fontWeight: '900',
    fontFamily: TYPOGRAPHY.fontFamily,
    letterSpacing: -0.2,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  verdictSubtitle: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: TYPOGRAPHY.fontFamily,
    textAlign: 'center',
    maxWidth: 320,
    marginBottom: SPACING.lg,
  },
  xpProgressShelf: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: SPACING.md,
    borderWidth: 1,
    marginBottom: SPACING.md,
  },
  radialWheelWrapper: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  wheelCenterContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  xpInfoCol: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  xpHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  xpLevelLabel: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  xpGainText: {
    fontSize: 13,
    fontWeight: '900',
    color: COLORS.gentleOlive,
    fontFamily: TYPOGRAPHY.monoFamily,
  },
  xpLevelSub: {
    fontSize: 11,
    fontWeight: '500',
    fontFamily: TYPOGRAPHY.fontFamily,
    marginTop: 2,
  },
  disbursementTable: {
    width: '100%',
    padding: SPACING.md,
    borderWidth: 1,
    marginBottom: SPACING.md,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  tableHeaderTitle: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  verifiedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(230, 202, 154, 0.12)',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: RADIUS.pill,
  },
  verifiedTagText: {
    fontSize: 9,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.monoFamily,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  rowLabel: {
    fontSize: 12,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  streakLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rowValGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rowValText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.monoFamily,
  },
  tableDivider: {
    height: 1,
    marginVertical: SPACING.xs + 2,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  totalPillsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  rewardPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.pill,
    gap: 4,
  },
  totalCoinVal: {
    fontSize: 12,
    fontWeight: '900',
    color: COLORS.goldPrimary,
    fontFamily: TYPOGRAPHY.monoFamily,
  },
  totalGemVal: {
    fontSize: 12,
    fontWeight: '900',
    color: COLORS.infoBlue,
    fontFamily: TYPOGRAPHY.monoFamily,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
    width: '100%',
    marginBottom: SPACING.lg,
  },
  metricCard: {
    flex: 1,
    minWidth: '46%',
    padding: SPACING.sm,
    borderWidth: 1,
    borderRadius: RADIUS.control,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.6,
    fontFamily: TYPOGRAPHY.fontFamily,
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 15,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.monoFamily,
  },
  actionsGroup: {
    width: '100%',
    gap: SPACING.sm,
  },
  primaryBtn: {
    width: '100%',
    height: Math.max(48, TOUCH_TARGET.minSize),
    borderRadius: RADIUS.control,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  btnBevel: {
    position: 'absolute',
    top: 0,
    left: 4,
    right: 4,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
  },
  primaryBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0B0E14',
    fontFamily: TYPOGRAPHY.fontFamily,
    letterSpacing: 0.2,
  },
  secondaryBtn: {
    width: '100%',
    height: Math.max(44, TOUCH_TARGET.minSize),
    borderRadius: RADIUS.control,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});
