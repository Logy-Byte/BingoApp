import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../design/tokens';
import { RobotIcon, FriendIcon, PuzzleIcon, LocalIcon } from '../icons/CustomIcons';
import { useTheme } from '../../design/theme';

interface GameModeShelfProps {
  onSoloPress: () => void;
  onFriendPress: () => void;
  onDailyPress: () => void;
  onLocalPress: () => void;
}

/**
 * Heterogeneous Game Mode Shelf
 * Extracted from Reference Images 1, 2 & 4:
 * - 24px rounded tactile cards
 * - Dual theme support (Clean White / Lunar Shadow)
 * - Gentle Olive (#CBD77E) and Winter Hazel (#E6CA9A) badges
 * - Sora typography
 */
export const GameModeShelf: React.FC<GameModeShelfProps> = ({
  onSoloPress,
  onFriendPress,
  onDailyPress,
  onLocalPress,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.shelfHeader, { color: theme.textMuted }]}>GAME MODES</Text>

      {/* Row 1: Core Experiences with tailored identities */}
      <View style={styles.modeRow}>
        {/* Solo Practice Mode */}
        <TouchableOpacity
          style={[
            styles.modeTile,
            {
              backgroundColor: theme.bgCard,
              borderColor: theme.borderSubtle,
            },
          ]}
          onPress={onSoloPress}
          activeOpacity={0.84}
          accessibilityRole="button"
          accessibilityLabel="Solo practice against AI"
        >
          <View
            style={[
              styles.tileIconCircle,
              { backgroundColor: theme.accentOliveTint },
            ]}
          >
            <RobotIcon size={20} color={COLORS.lunarShadow} />
          </View>
          <View style={styles.tileInfo}>
            <View style={styles.tagRow}>
              <View
                style={[
                  styles.modeTagPill,
                  { backgroundColor: theme.accentOliveTint },
                ]}
              >
                <Text style={[styles.modeTagText, { color: COLORS.lunarShadow }]}>
                  OFFLINE
                </Text>
              </View>
            </View>
            <Text style={[styles.tileTitle, { color: theme.textPrimary }]}>
              Solo Practice
            </Text>
            <Text style={[styles.tileDesc, { color: theme.textSecondary }]}>
              AI Robot • 3 Levels
            </Text>
          </View>
        </TouchableOpacity>

        {/* Private Room / Play a Friend Mode */}
        <TouchableOpacity
          style={[
            styles.modeTile,
            {
              backgroundColor: theme.bgCard,
              borderColor: theme.borderSubtle,
            },
          ]}
          onPress={onFriendPress}
          activeOpacity={0.84}
          accessibilityRole="button"
          accessibilityLabel="Play with friends in private room"
        >
          <View
            style={[
              styles.tileIconCircle,
              { backgroundColor: theme.accentHazelTint },
            ]}
          >
            <FriendIcon size={20} color={COLORS.winterHazel} />
          </View>
          <View style={styles.tileInfo}>
            <View style={styles.tagRow}>
              <View
                style={[
                  styles.modeTagPill,
                  { backgroundColor: theme.accentHazelTint },
                ]}
              >
                <Text style={[styles.modeTagText, { color: '#8A6724' }]}>SOCIAL</Text>
              </View>
            </View>
            <Text style={[styles.tileTitle, { color: theme.textPrimary }]}>
              Private Room
            </Text>
            <Text style={[styles.tileDesc, { color: theme.textSecondary }]}>
              Passcode Protected
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Row 2: Event & Calibration Modes */}
      <View style={styles.modeRow}>
        {/* Daily Challenge */}
        <TouchableOpacity
          style={[
            styles.modeTile,
            {
              backgroundColor: theme.bgCard,
              borderColor: theme.borderSubtle,
            },
          ]}
          onPress={onDailyPress}
          activeOpacity={0.84}
          accessibilityRole="button"
          accessibilityLabel="Daily seed challenge"
        >
          <View style={styles.dailyHeaderRow}>
            <View
              style={[
                styles.dailyIconWrap,
                { backgroundColor: theme.accentHazelTint },
              ]}
            >
              <PuzzleIcon size={16} color={COLORS.winterHazel} />
            </View>
            <View
              style={[
                styles.modeTagPill,
                { backgroundColor: theme.accentHazelTint },
              ]}
            >
              <Text style={[styles.modeTagText, { color: '#8A6724' }]}>24H SEED</Text>
            </View>
          </View>
          <Text style={[styles.tileTitle, { color: theme.textPrimary }]}>
            Daily Challenge
          </Text>
          <Text style={[styles.tileDesc, { color: theme.textSecondary }]}>
            Global Seed Board
          </Text>
        </TouchableOpacity>

        {/* Local Bench */}
        <TouchableOpacity
          style={[
            styles.modeTile,
            {
              backgroundColor: theme.bgCard,
              borderColor: theme.borderSubtle,
            },
          ]}
          onPress={onLocalPress}
          activeOpacity={0.84}
          accessibilityRole="button"
          accessibilityLabel="Local benchmark match"
        >
          <View style={styles.dailyHeaderRow}>
            <View
              style={[
                styles.dailyIconWrap,
                { backgroundColor: theme.bgSubtle },
              ]}
            >
              <LocalIcon size={16} color={theme.textSecondary} />
            </View>
            <View
              style={[
                styles.modeTagPill,
                { backgroundColor: theme.bgSubtle },
              ]}
            >
              <Text style={[styles.modeTagText, { color: theme.textMuted }]}>
                CASUAL
              </Text>
            </View>
          </View>
          <Text style={[styles.tileTitle, { color: theme.textPrimary }]}>
            Local Match
          </Text>
          <Text style={[styles.tileDesc, { color: theme.textSecondary }]}>
            Zero Latency Play
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.sm, // 8px
    gap: SPACING.sm, // 8px
  },
  shelfHeader: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    fontFamily: TYPOGRAPHY.fontFamily,
    marginBottom: 2,
  },
  modeRow: {
    flexDirection: 'row',
    gap: SPACING.md, // 12px
  },
  modeTile: {
    flex: 1,
    borderRadius: RADIUS.hero, // 24px
    padding: SPACING.md, // 12px
    borderWidth: 1,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  tileIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xs, // 4px
  },
  tileInfo: {
    gap: 3,
  },
  tagRow: {
    marginBottom: 2,
  },
  modeTagPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: RADIUS.pill,
  },
  modeTagText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.6,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  tileTitle: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.2,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  tileDesc: {
    fontSize: 11,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  dailyHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm, // 8px
  },
  dailyIconWrap: {
    width: 30,
    height: 30,
    borderRadius: RADIUS.compact, // 8px
    alignItems: 'center',
    justifyContent: 'center',
  },
});
