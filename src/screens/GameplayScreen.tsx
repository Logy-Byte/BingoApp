import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Board5x5, GridCell5x5 } from '../domain/types';
import { GameBoard } from '../components/game/GameBoard';
import { CallerHUD } from '../components/game/CallerHUD';
import { GameButton } from '../components/common/GameButton';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../design/tokens';
import {
  CheckIcon,
  CloseIcon,
  ChevronIcon,
  PauseIcon,
  ResumeIcon,
  BingoIdentityIcon,
} from '../components/icons/CustomIcons';
import { useTheme } from '../design/theme';

interface GameplayScreenProps {
  board: Board5x5;
  drawnNumbers: number[];
  score: number;
  linesCompletedCount: number;
  isGameActive: boolean;
  isPaused: boolean;
  onCellPress: (cell: GridCell5x5) => void;
  onClaimBingo: () => void;
  onTogglePause?: () => void;
  onLeaveGame: () => void;
  lastCompletedPatternName?: string;
  claimFeedback?: { success: boolean; message: string } | null;
  opponentLines?: number;
  opponentName?: string;
}

export const GameplayScreen: React.FC<GameplayScreenProps> = ({
  board,
  drawnNumbers,
  score,
  linesCompletedCount,
  isGameActive,
  isPaused,
  onCellPress,
  onClaimBingo,
  onTogglePause,
  onLeaveGame,
  lastCompletedPatternName,
  claimFeedback,
  opponentLines,
  opponentName,
}) => {
  const { theme } = useTheme();
  const currentCall = drawnNumbers[0];
  const recentCalls = drawnNumbers.slice(1, 6);
  const calledNumbersSet = new Set(drawnNumbers);

  // Line progress percentage (0 to 100%)
  const progressPercent = Math.min(Math.round((linesCompletedCount / 5) * 100), 100);

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: theme.bgCanvas }]}
      showsVerticalScrollIndicator={false}
    >
      {/* TOP MATCH HUD (Ref 2 floating top island principles) */}
      <View
        style={[
          styles.hudBar,
          {
            backgroundColor: theme.bgCard,
            borderColor: theme.borderSubtle,
          },
        ]}
      >
        <TouchableOpacity
          onPress={onLeaveGame}
          style={[
            styles.exitBtn,
            {
              backgroundColor: theme.bgRecessed,
              borderColor: theme.borderSubtle,
            },
          ]}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel="Quit match"
        >
          <ChevronIcon direction="left" size={16} color={theme.textPrimary} />
          <Text style={[styles.exitText, { color: theme.textPrimary }]}>Forfeit</Text>
        </TouchableOpacity>

        <View style={styles.hudScores}>
          <View
            style={[
              styles.statBox,
              {
                backgroundColor: theme.bgRecessed,
                borderColor: theme.borderSubtle,
              },
            ]}
          >
            <Text style={[styles.statLabel, { color: theme.textMuted }]}>SCORE</Text>
            <Text style={[styles.statValue, { color: theme.textPrimary }]}>
              {score.toLocaleString()}
            </Text>
          </View>
          <View
            style={[
              styles.statBox,
              styles.linesBox,
              {
                backgroundColor: theme.accentOliveTint,
                borderColor: COLORS.gentleOlive,
              },
            ]}
          >
            <Text style={[styles.statLabel, { color: COLORS.lunarShadow }]}>MY LINES</Text>
            <Text style={[styles.linesValue, { color: COLORS.lunarShadow }]}>
              {linesCompletedCount} / 5
            </Text>
          </View>
          {opponentName && opponentLines !== undefined && (
            <View
              style={[
                styles.statBox,
                styles.opponentBox,
                {
                  backgroundColor: theme.accentHazelTint,
                  borderColor: COLORS.winterHazel,
                },
              ]}
            >
              <Text style={[styles.statLabel, { color: '#8A6724' }]}>
                {opponentName.toUpperCase()}
              </Text>
              <Text style={[styles.opponentLinesValue, { color: '#8A6724' }]}>
                {opponentLines} / 5
              </Text>
            </View>
          )}
        </View>

        {onTogglePause && (
          <TouchableOpacity
            onPress={onTogglePause}
            style={[
              styles.pauseBtn,
              {
                backgroundColor: theme.bgRecessed,
                borderColor: theme.borderSubtle,
              },
            ]}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityRole="button"
            accessibilityLabel={isPaused ? 'Resume game' : 'Pause game'}
          >
            {isPaused ? (
              <ResumeIcon size={14} color={COLORS.gentleOlive} />
            ) : (
              <PauseIcon size={14} color={theme.textPrimary} />
            )}
            <Text style={[styles.pauseText, { color: theme.textPrimary }]}>
              {isPaused ? 'Resume' : 'Pause'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* VICTORY ALIGNMENT PROGRESS TRACK */}
      <View
        style={[
          styles.progressContainer,
          {
            backgroundColor: theme.bgCard,
            borderColor: theme.borderSubtle,
          },
        ]}
      >
        <View style={styles.progressHeaderRow}>
          <Text style={[styles.progressLabel, { color: theme.textMuted }]}>
            VICTORY ALIGNMENT TRACK
          </Text>
          <Text style={[styles.progressPercent, { color: COLORS.gentleOlive }]}>
            {progressPercent}%
          </Text>
        </View>
        <View
          style={[
            styles.progressTrack,
            { backgroundColor: theme.isDark ? '#363A42' : '#ECECEC' },
          ]}
        >
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.max(progressPercent, 4)}%`,
                backgroundColor:
                  linesCompletedCount >= 5
                    ? COLORS.winterHazel
                    : linesCompletedCount > 0
                    ? COLORS.gentleOlive
                    : theme.borderSubtle,
              },
            ]}
          />
        </View>
      </View>

      {/* LIVE BROADCAST CALLER SPHERE */}
      <CallerHUD
        currentCall={currentCall}
        totalCalls={drawnNumbers.length}
        maxCalls={25}
        recentCalls={recentCalls}
      />

      {/* LINE COMPLETION BANNER */}
      {lastCompletedPatternName && (
        <View
          style={[
            styles.completionBanner,
            {
              backgroundColor: theme.accentHazelTint,
              borderColor: COLORS.winterHazel,
            },
          ]}
        >
          <View style={styles.bannerRow}>
            <CheckIcon size={16} color={COLORS.winterHazel} />
            <Text style={[styles.completionTitle, { color: '#8A6724' }]}>
              Line Complete!
            </Text>
          </View>
          <Text style={[styles.completionDesc, { color: theme.textPrimary }]}>
            {lastCompletedPatternName.toUpperCase()} (+500 PTS)
          </Text>
        </View>
      )}

      {/* CLAIM FEEDBACK BANNER */}
      {claimFeedback && (
        <View
          style={[
            styles.feedbackBanner,
            claimFeedback.success
              ? { backgroundColor: theme.accentOliveTint, borderColor: COLORS.gentleOlive }
              : { backgroundColor: 'rgba(239, 68, 68, 0.12)', borderColor: '#EF4444' },
          ]}
        >
          {claimFeedback.success ? (
            <CheckIcon size={16} color={COLORS.lunarShadow} />
          ) : (
            <CloseIcon size={16} color="#EF4444" />
          )}
          <Text
            style={[
              styles.feedbackText,
              { color: claimFeedback.success ? COLORS.lunarShadow : '#DC2626' },
            ]}
          >
            {claimFeedback.message}
          </Text>
        </View>
      )}

      {/* PAUSE OVERLAY */}
      {isPaused && (
        <View
          style={[
            styles.pauseOverlay,
            {
              backgroundColor: theme.bgCard,
              borderColor: theme.borderSubtle,
            },
          ]}
        >
          <Text style={[styles.pauseHeading, { color: theme.textPrimary }]}>
            Match Paused
          </Text>
          <Text style={[styles.pauseSub, { color: theme.textSecondary }]}>
            Ball caller timer paused.
          </Text>
          <GameButton
            title="Resume Match"
            variant="primary"
            size="md"
            onPress={onTogglePause!}
            style={styles.resumeBtn}
          />
        </View>
      )}

      {/* 5x5 GAME BOARD */}
      <GameBoard
        board={board}
        calledNumbersSet={calledNumbersSet}
        onCellPress={onCellPress}
      />

      {/* CLAIM BINGO BUTTON (High-Contrast Gentle Olive Action) */}
      <View style={styles.claimSection}>
        <TouchableOpacity
          style={[
            styles.claimActionBtn,
            linesCompletedCount >= 5 && styles.claimActionBtnReady,
            {
              backgroundColor:
                linesCompletedCount >= 5
                  ? COLORS.winterHazel
                  : linesCompletedCount > 0
                  ? COLORS.gentleOlive
                  : theme.isDark
                  ? '#2B2F36'
                  : '#E2E2E2',
              borderColor:
                linesCompletedCount >= 5
                  ? COLORS.winterHazel
                  : linesCompletedCount > 0
                  ? COLORS.gentleOlive
                  : theme.borderSubtle,
            },
          ]}
          onPress={onClaimBingo}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel={`Claim Bingo, ${linesCompletedCount} of 5 lines completed`}
        >
          <View style={styles.claimBtnRow}>
            <BingoIdentityIcon
              size={20}
              color={linesCompletedCount > 0 ? COLORS.lunarShadow : theme.textMuted}
              variant="filled"
            />
            <Text
              style={[
                styles.claimBtnText,
                {
                  color: linesCompletedCount > 0 ? COLORS.lunarShadow : theme.textMuted,
                },
              ]}
            >
              {linesCompletedCount >= 5
                ? 'VICTORY! CLAIM 5-LINE BINGO'
                : linesCompletedCount > 0
                ? `CLAIM BINGO (${linesCompletedCount} LINES)`
                : 'COMPLETE A LINE TO CLAIM'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.lg,
    paddingBottom: 40,
  },
  hudBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm, // 8px
    paddingHorizontal: SPACING.md, // 12px
    borderRadius: RADIUS.hero, // 24px
    borderWidth: 1,
    marginBottom: SPACING.xs,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  exitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
  },
  exitText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  hudScores: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  statBox: {
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: RADIUS.control,
    borderWidth: 1,
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  statValue: {
    fontSize: 13,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.monoFamily,
  },
  linesBox: {
    borderWidth: 1.5,
  },
  linesValue: {
    fontSize: 13,
    fontWeight: '900',
    fontFamily: TYPOGRAPHY.monoFamily,
  },
  opponentBox: {
    borderWidth: 1.5,
  },
  opponentLinesValue: {
    fontSize: 13,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.monoFamily,
  },
  pauseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
  },
  pauseText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  progressContainer: {
    borderRadius: RADIUS.control, // 12px
    paddingHorizontal: SPACING.md, // 12px
    paddingVertical: SPACING.sm, // 8px
    borderWidth: 1,
    marginVertical: SPACING.xs, // 4px
  },
  progressHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  progressPercent: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.monoFamily,
  },
  progressTrack: {
    height: 6,
    borderRadius: RADIUS.pill,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: RADIUS.pill,
  },
  completionBanner: {
    borderRadius: RADIUS.control, // 12px
    paddingVertical: SPACING.sm, // 8px
    paddingHorizontal: SPACING.lg, // 16px
    borderWidth: 1,
    marginVertical: SPACING.xs, // 4px
    alignItems: 'center',
  },
  bannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs, // 4px
  },
  completionTitle: {
    fontSize: 13,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  completionDesc: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  feedbackBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.xs, // 4px
    paddingVertical: SPACING.sm, // 8px
    borderRadius: RADIUS.control, // 12px
    marginVertical: SPACING.xs, // 4px
    borderWidth: 1,
  },
  feedbackText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  pauseOverlay: {
    borderRadius: RADIUS.surface, // 16px
    padding: SPACING.lg, // 16px
    alignItems: 'center',
    marginVertical: SPACING.md, // 12px
    borderWidth: 1,
  },
  pauseHeading: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: SPACING.xs, // 4px
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  pauseSub: {
    fontSize: 12,
    marginBottom: SPACING.md, // 12px
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  resumeBtn: {
    minWidth: 140,
  },
  claimSection: {
    marginTop: SPACING.sm,
  },
  claimActionBtn: {
    borderRadius: RADIUS.sheet, // 28px
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  claimActionBtnReady: {
    shadowColor: COLORS.winterHazel,
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 6,
  },
  claimBtnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  claimBtnText: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});
