import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Board5x5, GridCell5x5, PowerUpType } from '../domain/types';
import { GameBoard } from '../components/game/GameBoard';
import { CallerHUD } from '../components/game/CallerHUD';
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
import { NextBallModal, PowerUpUsedModal, PatternCompletedBanner } from '../components/game/InGameOverlays';

interface GameplayScreenProps {
  board: Board5x5;
  additionalBoards?: Board5x5[];
  drawnNumbers: number[];
  score: number;
  linesCompletedCount: number;
  isGameActive: boolean;
  isPaused: boolean;
  onCellPress: (cell: GridCell5x5, boardIndex?: number) => void;
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
  additionalBoards = [],
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
  const [activeBoardIdx, setActiveBoardIdx] = useState<number>(0);
  const [usedPowerUp, setUsedPowerUp] = useState<string | null>(null);
  const [showNextBallModal, setShowNextBallModal] = useState<boolean>(false);

  const allBoards = [board, ...additionalBoards];
  const currentBoard = allBoards[activeBoardIdx] || board;

  const currentCall = drawnNumbers[0];
  const recentCalls = drawnNumbers.slice(1, 6);
  const calledNumbersSet = new Set(drawnNumbers);

  const progressPercent = Math.min(Math.round((linesCompletedCount / 5) * 100), 100);

  const handleUsePowerUp = (type: PowerUpType, name: string) => {
    setUsedPowerUp(name);
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: theme.bgCanvas }]}
      showsVerticalScrollIndicator={false}
    >
      {/* TOP MATCH HUD */}
      <View style={[styles.hudBar, { backgroundColor: theme.bgCard, borderColor: theme.borderSubtle }]}>
        <TouchableOpacity onPress={onLeaveGame} style={[styles.exitBtn, { backgroundColor: theme.bgRecessed, borderColor: theme.borderSubtle }]}>
          <ChevronIcon direction="left" size={16} color={theme.textPrimary} />
          <Text style={[styles.exitText, { color: theme.textPrimary }]}>Forfeit</Text>
        </TouchableOpacity>

        <View style={styles.hudScores}>
          <View style={[styles.statBox, { backgroundColor: theme.bgRecessed, borderColor: theme.borderSubtle }]}>
            <Text style={[styles.statLabel, { color: theme.textMuted }]}>SCORE</Text>
            <Text style={[styles.statValue, { color: theme.textPrimary }]}>{score.toLocaleString()}</Text>
          </View>

          <View style={[styles.statBox, styles.linesBox, { backgroundColor: theme.accentOliveTint, borderColor: COLORS.gentleOlive }]}>
            <Text style={[styles.statLabel, { color: COLORS.lunarShadow }]}>MY LINES</Text>
            <Text style={[styles.linesValue, { color: COLORS.lunarShadow }]}>{linesCompletedCount} / 5</Text>
          </View>

          {opponentName && opponentLines !== undefined && (
            <View style={[styles.statBox, styles.opponentBox, { backgroundColor: theme.accentHazelTint, borderColor: COLORS.winterHazel }]}>
              <Text style={[styles.statLabel, { color: '#8A6724' }]}>{opponentName.toUpperCase()}</Text>
              <Text style={[styles.opponentLinesValue, { color: '#8A6724' }]}>{opponentLines} / 5</Text>
            </View>
          )}
        </View>

        {onTogglePause && (
          <TouchableOpacity onPress={onTogglePause} style={[styles.pauseBtn, { backgroundColor: theme.bgRecessed, borderColor: theme.borderSubtle }]}>
            {isPaused ? <ResumeIcon size={14} color={COLORS.gentleOlive} /> : <PauseIcon size={14} color={theme.textPrimary} />}
            <Text style={[styles.pauseText, { color: theme.textPrimary }]}>{isPaused ? 'Resume' : 'Pause'}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* MULTI-CARD SELECTOR TABS (If user bought > 1 card matching storyboard multi-card flow) */}
      {allBoards.length > 1 && (
        <View style={styles.cardTabsRow}>
          {allBoards.map((_, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.cardTab,
                activeBoardIdx === idx && styles.cardTabActive,
              ]}
              onPress={() => setActiveBoardIdx(idx)}
            >
              <Text style={[styles.cardTabText, activeBoardIdx === idx && styles.cardTabTextActive]}>
                Card {idx + 1}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* LIVE BROADCAST CALLER SPHERE */}
      <CallerHUD
        currentCall={currentCall}
        totalCalls={drawnNumbers.length}
        maxCalls={25}
        recentCalls={recentCalls}
      />

      {/* PATTERN COMPLETED BANNER OVERLAY */}
      <PatternCompletedBanner
        visible={!!lastCompletedPatternName}
        patternName={lastCompletedPatternName || ''}
      />

      {/* POWER UP USED MODAL */}
      <PowerUpUsedModal
        visible={!!usedPowerUp}
        powerUpName={usedPowerUp || ''}
        onDismiss={() => setUsedPowerUp(null)}
      />

      {/* NEXT BALL MONEY MODAL */}
      <NextBallModal
        visible={showNextBallModal}
        rewardAmount={70}
        onDismiss={() => setShowNextBallModal(false)}
      />

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
          {claimFeedback.success ? <CheckIcon size={16} color={COLORS.lunarShadow} /> : <CloseIcon size={16} color="#EF4444" />}
          <Text style={[styles.feedbackText, { color: claimFeedback.success ? COLORS.lunarShadow : '#DC2626' }]}>
            {claimFeedback.message}
          </Text>
        </View>
      )}

      {/* 5x5 GAME BOARD */}
      <GameBoard
        board={currentBoard}
        calledNumbersSet={calledNumbersSet}
        onCellPress={(cell) => onCellPress(cell, activeBoardIdx)}
      />

      {/* CENTRAL ENERGETIC BINGO BUTTON matching storyboard central caller */}
      <View style={styles.centerBingoRow}>
        <TouchableOpacity
          style={[
            styles.giantBingoBtn,
            linesCompletedCount > 0 && styles.giantBingoBtnGlow,
          ]}
          onPress={onClaimBingo}
          activeOpacity={0.8}
        >
          <Text style={styles.giantBingoText}>BINGO!</Text>
        </TouchableOpacity>
      </View>

      {/* POWER-UP BAR (Bottom of game screen from storyboard) */}
      <View style={[styles.powerUpBar, { backgroundColor: theme.bgCard, borderColor: theme.borderSubtle }]}>
        <Text style={[styles.powerUpLabel, { color: theme.textMuted }]}>POWER-UPS</Text>
        <View style={styles.powerUpRow}>
          <TouchableOpacity
            style={styles.powerBtn}
            onPress={() => handleUsePowerUp('FREE_DAUB', 'Free Daub')}
          >
            <Text style={styles.powerIcon}>⚡</Text>
            <Text style={styles.powerText}>Free Daub</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.powerBtn}
            onPress={() => handleUsePowerUp('INSTANT_BINGO', 'Instant Bingo')}
          >
            <Text style={styles.powerIcon}>🎯</Text>
            <Text style={styles.powerText}>Instant</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.powerBtn}
            onPress={() => handleUsePowerUp('DOUBLE_PAYOUT', 'Double Payout')}
          >
            <Text style={styles.powerIcon}>💎</Text>
            <Text style={styles.powerText}>2x Payout</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.powerBtn}
            onPress={() => setShowNextBallModal(true)}
          >
            <Text style={styles.powerIcon}>💰</Text>
            <Text style={styles.powerText}>Next Ball</Text>
          </TouchableOpacity>
        </View>
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
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.hero,
    borderWidth: 1,
    marginBottom: SPACING.xs,
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
  linesBox: { borderWidth: 1.5 },
  linesValue: { fontSize: 13, fontWeight: '900', fontFamily: TYPOGRAPHY.monoFamily },
  opponentBox: { borderWidth: 1.5 },
  opponentLinesValue: { fontSize: 13, fontWeight: '800', fontFamily: TYPOGRAPHY.monoFamily },
  pauseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
  },
  pauseText: { fontSize: 12, fontWeight: '700', fontFamily: TYPOGRAPHY.fontFamily },
  cardTabsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.xs,
    marginVertical: SPACING.xs,
  },
  cardTab: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: RADIUS.pill,
    backgroundColor: '#334155',
  },
  cardTabActive: {
    backgroundColor: '#3B82F6',
  },
  cardTabText: {
    color: '#94A3B8',
    fontWeight: '800',
    fontSize: 12,
  },
  cardTabTextActive: {
    color: '#FFFFFF',
  },
  feedbackBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.xs,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.control,
    marginVertical: SPACING.xs,
    borderWidth: 1,
  },
  feedbackText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  centerBingoRow: {
    alignItems: 'center',
    marginVertical: SPACING.md,
  },
  giantBingoBtn: {
    width: '100%',
    height: 54,
    backgroundColor: '#F59E0B',
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FCD34D',
    elevation: 4,
  },
  giantBingoBtnGlow: {
    backgroundColor: '#10B981',
    borderColor: '#6EE7B7',
    elevation: 8,
  },
  giantBingoText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 2,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  powerUpBar: {
    borderRadius: RADIUS.surface,
    padding: SPACING.md,
    borderWidth: 1,
    marginTop: SPACING.xs,
  },
  powerUpLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: SPACING.xs,
  },
  powerUpRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  powerBtn: {
    alignItems: 'center',
    padding: SPACING.xs,
  },
  powerIcon: {
    fontSize: 24,
    marginBottom: 2,
  },
  powerText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
  },
});
