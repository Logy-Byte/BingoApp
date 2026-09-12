import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../design/tokens';
import {
  BingoIdentityIcon,
  PlayIcon,
  PreviousIcon,
  NextIcon,
  ShuffleIcon,
  HeartIcon,
} from '../icons/CustomIcons';
import { useTheme } from '../../design/theme';

interface LobbyStageHeroProps {
  onQuickPlay?: () => void;
}

/**
 * Lobby Stage Hero Card
 * Directly extracted from Reference Image 1 Hero Media Card:
 * - 28px corner radius Clean White (#FFFFFF) / Lunar Shadow (#282828) card
 * - Category/Room pill tag ("Live Board • Room #04")
 * - Sora bold title & subtitle
 * - Mini 5×5 game preview with Gentle Olive stamps
 * - Gentle Olive progress bar with circular bead thumb
 * - Tactile playback control row with circular Gentle Olive Play button
 */
export const LobbyStageHero: React.FC<LobbyStageHeroProps> = ({ onQuickPlay }) => {
  const { theme } = useTheme();

  // Mini 5x5 preview matrix
  const previewGrid = [
    [7, 12, 18, 22, 25],
    [3, 9, 15, 20, 24],
    [1, 8, 'FREE', 17, 23],
    [5, 11, 14, 19, 21],
    [2, 6, 13, 16, 10],
  ];

  const markedSet = new Set(['0-1', '1-2', '2-2', '3-3', '4-4']); // Diagonal preview line

  return (
    <View
      style={[
        styles.heroCard,
        {
          backgroundColor: theme.bgCard,
          borderColor: theme.borderSubtle,
        },
      ]}
    >
      {/* Top Header Row with Category Capsule */}
      <View style={styles.cardHeaderRow}>
        <View
          style={[
            styles.roomPill,
            { backgroundColor: theme.bgSubtle, borderColor: theme.borderSubtle },
          ]}
        >
          <View style={styles.roomDot} />
          <Text style={[styles.roomPillText, { color: theme.textSecondary }]}>
            Ranked Table • 5×5 Matrix
          </Text>
        </View>

        <View style={styles.threeDotsMenu}>
          <View style={[styles.miniMenuDot, { backgroundColor: theme.textMuted }]} />
          <View style={[styles.miniMenuDot, { backgroundColor: theme.textMuted }]} />
          <View style={[styles.miniMenuDot, { backgroundColor: theme.textMuted }]} />
        </View>
      </View>

      {/* Main Content Split: Mini 5x5 Board Artwork + Title Hierarchy */}
      <View style={styles.contentSplit}>
        {/* Left: Thumbnail 5x5 Board Tray */}
        <View
          style={[
            styles.boardThumbnail,
            {
              backgroundColor: theme.bgRecessed,
              borderColor: theme.borderSubtle,
            },
          ]}
        >
          <View style={styles.gridMatrix}>
            {previewGrid.map((row, rIdx) => (
              <View key={`row-${rIdx}`} style={styles.matrixRow}>
                {row.map((val, cIdx) => {
                  const key = `${rIdx}-${cIdx}`;
                  const isMarked = markedSet.has(key);
                  const isCenter = val === 'FREE';

                  return (
                    <View
                      key={key}
                      style={[
                        styles.miniCell,
                        {
                          backgroundColor: isMarked
                            ? COLORS.gentleOlive
                            : isCenter
                            ? COLORS.winterHazel
                            : theme.bgCard,
                          borderColor: isMarked
                            ? COLORS.gentleOlive
                            : isCenter
                            ? COLORS.winterHazel
                            : theme.borderSubtle,
                        },
                      ]}
                    >
                      {isCenter ? (
                        <BingoIdentityIcon size={9} color={COLORS.lunarShadow} />
                      ) : (
                        <Text
                          style={[
                            styles.miniCellText,
                            {
                              color: isMarked ? COLORS.lunarShadow : theme.textSecondary,
                              fontWeight: isMarked ? '800' : '500',
                            },
                          ]}
                        >
                          {val}
                        </Text>
                      )}
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        </View>

        {/* Right: Mode Title & Details */}
        <View style={styles.modeTextGroup}>
          <Text style={[styles.modeTitle, { color: theme.textPrimary }]}>
            Classic 75-Ball Blitz
          </Text>
          <Text style={[styles.modeSubtitle, { color: theme.textSecondary }]}>
            Fast-paced competitive number battle
          </Text>
          <View style={styles.statusBadgeRow}>
            <View
              style={[
                styles.speedBadge,
                { backgroundColor: theme.accentOliveTint },
              ]}
            >
              <Text style={styles.speedBadgeText}>3.0s DRAWS</Text>
            </View>
            <Text style={[styles.speedSubtext, { color: theme.textMuted }]}>
              Single & Ranked
            </Text>
          </View>
        </View>
      </View>

      {/* Progress Track with Gentle Olive Line and Circular Thumb */}
      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressTrack,
            { backgroundColor: theme.isDark ? '#363A42' : '#ECECEC' },
          ]}
        >
          <View style={[styles.progressFill, { backgroundColor: COLORS.gentleOlive }]} />
          <View style={[styles.progressThumb, { backgroundColor: COLORS.gentleOlive }]} />
        </View>
      </View>

      {/* Playback Controls Row (Reference 1) */}
      <View style={styles.controlsRow}>
        <TouchableOpacity
          style={styles.auxControlBtn}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Shuffle Board"
        >
          <ShuffleIcon size={16} color={theme.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.auxControlBtn}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Previous Table"
        >
          <PreviousIcon size={18} color={theme.textPrimary} />
        </TouchableOpacity>

        {/* Hero Circular Play Button in Gentle Olive */}
        <TouchableOpacity
          style={styles.heroPlayButton}
          onPress={onQuickPlay}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="Start Match"
        >
          <PlayIcon size={20} color={COLORS.lunarShadow} variant="filled" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.auxControlBtn}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Next Table"
        >
          <NextIcon size={18} color={theme.textPrimary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.auxControlBtn}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Favorite Mode"
        >
          <HeartIcon size={16} color={theme.textMuted} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heroCard: {
    borderRadius: RADIUS.sheet, // 28px (Reference 1 card radius)
    padding: SPACING.lg, // 16px
    borderWidth: 1,
    marginVertical: SPACING.xs, // 4px
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md, // 12px
  },
  roomPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
  },
  roomDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.gentleOlive,
  },
  roomPillText: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  threeDotsMenu: {
    flexDirection: 'column',
    gap: 2.5,
    padding: 4,
  },
  miniMenuDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
  },
  contentSplit: {
    flexDirection: 'row',
    gap: SPACING.md, // 12px
    alignItems: 'center',
    marginBottom: SPACING.md, // 12px
  },
  boardThumbnail: {
    width: 90,
    height: 90,
    borderRadius: 16, // 16px corner radius (Reference 1 album art)
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridMatrix: {
    gap: 2,
  },
  matrixRow: {
    flexDirection: 'row',
    gap: 2,
  },
  miniCell: {
    width: 14,
    height: 14,
    borderRadius: 3,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniCellText: {
    fontSize: 7,
    fontFamily: TYPOGRAPHY.monoFamily,
  },
  modeTextGroup: {
    flex: 1,
    gap: 3,
  },
  modeTitle: {
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: -0.3,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  modeSubtitle: {
    fontSize: 11,
    fontWeight: '400',
    fontFamily: TYPOGRAPHY.fontFamily,
    lineHeight: 15,
  },
  statusBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  speedBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.compact,
  },
  speedBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.lunarShadow,
    letterSpacing: 0.5,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  speedSubtext: {
    fontSize: 10,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  progressContainer: {
    marginVertical: SPACING.sm, // 8px
    paddingHorizontal: SPACING.xs,
  },
  progressTrack: {
    height: 3,
    borderRadius: 1.5,
    position: 'relative',
    justifyContent: 'center',
  },
  progressFill: {
    width: '45%',
    height: 3,
    borderRadius: 1.5,
  },
  progressThumb: {
    position: 'absolute',
    left: '45%',
    marginLeft: -4,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.sm,
    paddingTop: SPACING.xs,
  },
  auxControlBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroPlayButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.gentleOlive, // #CBD77E (Reference 1 play button)
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.gentleOlive,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
});
