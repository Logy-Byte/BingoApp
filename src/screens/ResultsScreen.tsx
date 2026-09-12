import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../design/tokens';
import { TrophyIcon, CloseIcon, WinnerIcon } from '../components/icons/CustomIcons';
import { useTheme } from '../design/theme';

interface ResultsScreenProps {
  hasWon: boolean;
  score: number;
  linesCompletedCount: number;
  totalCallsCount: number;
  matchDurationSec: number;
  isRanked?: boolean;
  ratingDelta?: number;
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
  onPlayAgain,
  onReturnHome,
}) => {
  const { theme } = useTheme();

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bgCanvas }]}>
      <View
        style={[
          styles.resultCard,
          {
            backgroundColor: theme.bgCard,
            borderColor: hasWon ? COLORS.winterHazel : theme.borderSubtle,
          },
          hasWon && styles.resultCardWon,
        ]}
      >
        {/* Top Specular Hairline */}
        <View style={styles.topBevel} />

        {/* Victory/Concluded Sphere Badge */}
        <View
          style={[
            styles.badgeWrap,
            hasWon
              ? { backgroundColor: theme.accentHazelTint, borderColor: COLORS.winterHazel }
              : { backgroundColor: 'rgba(239, 68, 68, 0.15)', borderColor: '#EF4444' },
          ]}
        >
          {hasWon ? (
            <WinnerIcon size={38} color={COLORS.winterHazel} />
          ) : (
            <CloseIcon size={34} color="#EF4444" />
          )}
        </View>

        <Text
          style={[
            styles.resultTitle,
            { color: hasWon ? COLORS.winterHazel : theme.textPrimary },
          ]}
        >
          {hasWon ? 'BINGO VICTORY' : 'MATCH COMPLETE'}
        </Text>

        <Text style={[styles.resultSubtitle, { color: theme.textSecondary }]}>
          {hasWon
            ? 'Verified by authoritative game engine. Winning line achieved!'
            : 'Line completion not secured before drawn balls concluded.'}
        </Text>

        {/* RANK IMPACT IF RANKED */}
        {isRanked && (
          <View
            style={[
              styles.ratingImpactBox,
              hasWon
                ? { backgroundColor: theme.accentOliveTint, borderColor: COLORS.gentleOlive }
                : { backgroundColor: 'rgba(239, 68, 68, 0.15)', borderColor: '#EF4444' },
            ]}
          >
            <Text
              style={[
                styles.ratingText,
                { color: hasWon ? COLORS.lunarShadow : '#DC2626' },
              ]}
            >
              Ranked Rating: {hasWon ? `+${ratingDelta} PTS` : `-${Math.abs(ratingDelta)} PTS`}
            </Text>
          </View>
        )}

        {/* STATS MATRIX */}
        <View style={styles.statsGrid}>
          <View
            style={[
              styles.statBox,
              {
                backgroundColor: theme.bgRecessed,
                borderColor: theme.borderSubtle,
              },
            ]}
          >
            <Text style={[styles.statLabel, { color: theme.textMuted }]}>FINAL SCORE</Text>
            <Text style={[styles.statValue, { color: theme.textPrimary }]}>
              {score.toLocaleString()}
            </Text>
          </View>

          <View
            style={[
              styles.statBox,
              hasWon && {
                borderColor: COLORS.winterHazel,
                backgroundColor: theme.accentHazelTint,
              },
              !hasWon && {
                backgroundColor: theme.bgRecessed,
                borderColor: theme.borderSubtle,
              },
            ]}
          >
            <Text
              style={[
                styles.statLabel,
                { color: hasWon ? '#8A6724' : theme.textMuted },
              ]}
            >
              LINES COMPLETED
            </Text>
            <Text
              style={[
                styles.statValue,
                { color: hasWon ? '#8A6724' : COLORS.gentleOlive },
              ]}
            >
              {linesCompletedCount} / 5
            </Text>
          </View>

          <View
            style={[
              styles.statBox,
              {
                backgroundColor: theme.bgRecessed,
                borderColor: theme.borderSubtle,
              },
            ]}
          >
            <Text style={[styles.statLabel, { color: theme.textMuted }]}>BALLS DRAWN</Text>
            <Text style={[styles.statValue, { color: theme.textPrimary }]}>
              {totalCallsCount} / 25
            </Text>
          </View>

          <View
            style={[
              styles.statBox,
              {
                backgroundColor: theme.bgRecessed,
                borderColor: theme.borderSubtle,
              },
            ]}
          >
            <Text style={[styles.statLabel, { color: theme.textMuted }]}>MATCH TIME</Text>
            <Text style={[styles.statValue, { color: theme.textPrimary }]}>
              {formatTime(matchDurationSec)}
            </Text>
          </View>
        </View>

        {/* ACTION BUTTONS */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={[
              styles.actionBtn,
              {
                backgroundColor: COLORS.gentleOlive,
                borderColor: '#D7E28E',
              },
            ]}
            onPress={onPlayAgain}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Play Again"
          >
            <Text style={styles.primaryActionText}>PLAY AGAIN ↗</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionBtn,
              {
                backgroundColor: theme.bgRecessed,
                borderColor: theme.borderSubtle,
              },
            ]}
            onPress={onReturnHome}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Return to Lobby"
          >
            <Text style={[styles.secondaryActionText, { color: theme.textPrimary }]}>
              RETURN TO HOME
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg, // 16px
  },
  resultCard: {
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    padding: SPACING.xl, // 20px
    borderRadius: RADIUS.hero, // 24px
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
    position: 'relative',
    overflow: 'hidden',
  },
  topBevel: {
    position: 'absolute',
    top: 0,
    left: 16,
    right: 16,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  resultCardWon: {
    borderWidth: 2,
    shadowColor: COLORS.winterHazel,
  },
  badgeWrap: {
    width: 72,
    height: 72,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md, // 12px
    borderWidth: 2,
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 0.5,
    textAlign: 'center',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  resultSubtitle: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: SPACING.xs, // 4px
    marginBottom: SPACING.md, // 12px
    lineHeight: 18,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  ratingImpactBox: {
    paddingHorizontal: SPACING.lg, // 16px
    paddingVertical: SPACING.sm, // 8px
    borderRadius: RADIUS.pill,
    marginBottom: SPACING.md, // 12px
    borderWidth: 1,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm, // 8px
    width: '100%',
    marginBottom: SPACING.xl, // 20px
  },
  statBox: {
    flex: 1,
    minWidth: '45%',
    borderRadius: RADIUS.surface, // 16px
    padding: SPACING.md, // 12px
    alignItems: 'center',
    borderWidth: 1,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 2,
    fontFamily: TYPOGRAPHY.monoFamily,
  },
  actions: {
    width: '100%',
    gap: SPACING.sm, // 8px
  },
  actionBtn: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: RADIUS.sheet, // 28px
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  primaryActionText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.lunarShadow,
    letterSpacing: 0.5,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  secondaryActionText: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});
