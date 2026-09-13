import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../design/tokens';
import {
  IconLightning,
  IconTicket,
  IconCoinStack,
  RobotIcon,
  FriendIcon,
  PuzzleIcon,
  ChevronIcon,
  BingoIdentityIcon,
} from '../icons/CustomIcons';
import { useTheme } from '../../design/theme';

interface LobbyGalleryProps {
  onPlayRanked: () => void;
  onOpenDailyBonusModal?: () => void;
  onOpenRoomSelection?: () => void;
  onSoloPress: () => void;
  onFriendPress: () => void;
  onDailyPress: () => void;
  onlineCount?: number | null;
}

/**
 * LobbyGallery: Clean Rectangular Gallery of Game Modes & Actions
 * Replaces the stacked elongated pill banners with a structured gallery of
 * premium rectangular cards and 2-column gallery boxes.
 */
export const LobbyGallery: React.FC<LobbyGalleryProps> = ({
  onPlayRanked,
  onOpenDailyBonusModal,
  onOpenRoomSelection,
  onSoloPress,
  onFriendPress,
  onDailyPress,
  onlineCount = 1240,
}) => {
  const { theme, isDark } = useTheme();

  return (
    <View style={styles.container}>
      {/* 1. FEATURED HERO RECTANGLE BOX: RANKED ARENA */}
      <TouchableOpacity
        style={[
          styles.heroCard,
          {
            backgroundColor: theme.bgCard,
            borderColor: COLORS.gentleOlive,
          },
        ]}
        onPress={onPlayRanked}
        activeOpacity={0.88}
        accessibilityRole="button"
        accessibilityLabel="Play Ranked Match, 5x5 Matrix, ±25 MMR"
      >
        {/* Top Specular Edge */}
        <View style={styles.specularBevel} />

        <View style={styles.heroHeaderRow}>
          <View style={styles.heroBadgeRow}>
            <View style={[styles.liveDot, { backgroundColor: COLORS.gentleOlive }]} />
            <Text style={[styles.heroBadgeText, { color: COLORS.gentleOlive }]}>
              ACTIVE SEASON 4
            </Text>
          </View>
          <View
            style={[
              styles.playerCountPill,
              { backgroundColor: theme.bgRecessed, borderColor: theme.borderSubtle },
            ]}
          >
            <Text style={[styles.playerCountText, { color: theme.textSecondary }]}>
              {onlineCount ? `${onlineCount.toLocaleString()} in Queue` : 'Live Queue'}
            </Text>
          </View>
        </View>

        <View style={styles.heroContentRow}>
          <View style={styles.heroTextGroup}>
            <Text style={[styles.heroTitle, { color: theme.textPrimary }]}>
              Play Ranked Match
            </Text>
            <Text style={[styles.heroSubtitle, { color: theme.textSecondary }]}>
              5×5 Matrix • ±25 MMR Rating • Live 1v1 Matchmaking
            </Text>
          </View>

          <View
            style={[
              styles.heroActionBtn,
              { backgroundColor: COLORS.gentleOlive },
            ]}
          >
            <Text style={styles.heroArrow}>↗</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* 2. GALLERY GRID SECTION HEADER */}
      <View style={styles.sectionHeaderRow}>
        <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>
          EXPERIENCE GALLERY
        </Text>
      </View>

      {/* 3. RECTANGULAR GALLERY GRID (Row 1: Live Blitz + Daily Bonus) */}
      <View style={styles.galleryGridRow}>
        {/* Box 1: Live Blitz Matchmaking */}
        <TouchableOpacity
          style={[
            styles.galleryBox,
            {
              backgroundColor: theme.bgCard,
              borderColor: theme.borderSubtle,
            },
          ]}
          onPress={onPlayRanked}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="Live Blitz Instant Match"
        >
          <View style={styles.boxTopRow}>
            <View
              style={[
                styles.boxIconSphere,
                { backgroundColor: theme.accentOliveTint },
              ]}
            >
              <IconLightning size={18} color={COLORS.lunarShadow} />
            </View>
            <View
              style={[
                styles.boxTagPill,
                { backgroundColor: theme.accentOliveTint },
              ]}
            >
              <Text style={[styles.boxTagText, { color: COLORS.lunarShadow }]}>
                Instant
              </Text>
            </View>
          </View>
          <Text style={[styles.boxTitle, { color: theme.textPrimary }]}>
            Live Blitz
          </Text>
          <Text style={[styles.boxDesc, { color: theme.textSecondary }]}>
            Fast 1v1 Table • Zero Wait
          </Text>
        </TouchableOpacity>

        {/* Box 2: Daily Bonus Reward Box */}
        <TouchableOpacity
          style={[
            styles.galleryBox,
            {
              backgroundColor: theme.bgCard,
              borderColor: theme.borderSubtle,
            },
          ]}
          onPress={onOpenDailyBonusModal}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="Daily Bonus, Claim 500 Coins and 10 Gems"
        >
          <View style={styles.boxTopRow}>
            <View
              style={[
                styles.boxIconSphere,
                { backgroundColor: theme.accentHazelTint },
              ]}
            >
              <IconCoinStack size={18} color={COLORS.winterHazel} />
            </View>
            <View
              style={[
                styles.boxActionPill,
                { backgroundColor: COLORS.winterHazel },
              ]}
            >
              <Text style={styles.boxActionPillText}>Collect</Text>
            </View>
          </View>
          <Text style={[styles.boxTitle, { color: theme.textPrimary }]}>
            Daily Bonus
          </Text>
          <Text style={[styles.boxDesc, { color: theme.textSecondary }]}>
            +500 Coins • +10 Gems
          </Text>
        </TouchableOpacity>
      </View>

      {/* 4. RECTANGULAR GALLERY GRID (Row 2: Bingo Rooms & Tickets + Solo Practice) */}
      <View style={styles.galleryGridRow}>
        {/* Box 3: Select Bingo Room & Tickets */}
        <TouchableOpacity
          style={[
            styles.galleryBox,
            {
              backgroundColor: theme.bgCard,
              borderColor: theme.borderSubtle,
            },
          ]}
          onPress={onOpenRoomSelection}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="Select Bingo Room and Tickets"
        >
          <View style={styles.boxTopRow}>
            <View
              style={[
                styles.boxIconSphere,
                { backgroundColor: theme.bgRecessed },
              ]}
            >
              <IconTicket size={18} color={theme.textPrimary} />
            </View>
            <View
              style={[
                styles.boxTagPill,
                { backgroundColor: theme.bgRecessed, borderColor: theme.borderSubtle },
              ]}
            >
              <Text style={[styles.boxTagText, { color: theme.textSecondary }]}>
                Staking
              </Text>
            </View>
          </View>
          <Text style={[styles.boxTitle, { color: theme.textPrimary }]}>
            Bingo Rooms
          </Text>
          <Text style={[styles.boxDesc, { color: theme.textSecondary }]}>
            1–4 Cards • Jackpots
          </Text>
        </TouchableOpacity>

        {/* Box 4: Solo Practice AI Robot */}
        <TouchableOpacity
          style={[
            styles.galleryBox,
            {
              backgroundColor: theme.bgCard,
              borderColor: theme.borderSubtle,
            },
          ]}
          onPress={onSoloPress}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="Solo practice against AI Robot"
        >
          <View style={styles.boxTopRow}>
            <View
              style={[
                styles.boxIconSphere,
                { backgroundColor: theme.accentOliveTint },
              ]}
            >
              <RobotIcon size={18} color={COLORS.lunarShadow} />
            </View>
            <View
              style={[
                styles.boxTagPill,
                { backgroundColor: theme.accentOliveTint },
              ]}
            >
              <Text style={[styles.boxTagText, { color: COLORS.lunarShadow }]}>
                Offline
              </Text>
            </View>
          </View>
          <Text style={[styles.boxTitle, { color: theme.textPrimary }]}>
            Solo Practice
          </Text>
          <Text style={[styles.boxDesc, { color: theme.textSecondary }]}>
            AI Robot • 3 Levels
          </Text>
        </TouchableOpacity>
      </View>

      {/* 5. RECTANGULAR GALLERY GRID (Row 3: Private Room + Daily Puzzle) */}
      <View style={styles.galleryGridRow}>
        {/* Box 5: Private Friendly Room */}
        <TouchableOpacity
          style={[
            styles.galleryBox,
            {
              backgroundColor: theme.bgCard,
              borderColor: theme.borderSubtle,
            },
          ]}
          onPress={onFriendPress}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="Create or join private room"
        >
          <View style={styles.boxTopRow}>
            <View
              style={[
                styles.boxIconSphere,
                { backgroundColor: theme.accentHazelTint },
              ]}
            >
              <FriendIcon size={18} color={COLORS.winterHazel} />
            </View>
            <View
              style={[
                styles.boxTagPill,
                { backgroundColor: theme.accentHazelTint },
              ]}
            >
              <Text style={[styles.boxTagText, { color: '#8A6724' }]}>Social</Text>
            </View>
          </View>
          <Text style={[styles.boxTitle, { color: theme.textPrimary }]}>
            Private Room
          </Text>
          <Text style={[styles.boxDesc, { color: theme.textSecondary }]}>
            Passcode Protected
          </Text>
        </TouchableOpacity>

        {/* Box 6: Daily Puzzle Challenge */}
        <TouchableOpacity
          style={[
            styles.galleryBox,
            {
              backgroundColor: theme.bgCard,
              borderColor: theme.borderSubtle,
            },
          ]}
          onPress={onDailyPress}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="Daily Seed Puzzle Challenge"
        >
          <View style={styles.boxTopRow}>
            <View
              style={[
                styles.boxIconSphere,
                { backgroundColor: theme.bgRecessed },
              ]}
            >
              <PuzzleIcon size={18} color={COLORS.winterHazel} />
            </View>
            <View
              style={[
                styles.boxTagPill,
                { backgroundColor: theme.bgRecessed, borderColor: theme.borderSubtle },
              ]}
            >
              <Text style={[styles.boxTagText, { color: theme.textSecondary }]}>
                Streak
              </Text>
            </View>
          </View>
          <Text style={[styles.boxTitle, { color: theme.textPrimary }]}>
            Daily Puzzle
          </Text>
          <Text style={[styles.boxDesc, { color: theme.textSecondary }]}>
            Global Seed Board
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
  heroCard: {
    borderRadius: RADIUS.control + 4, // 16px rectangular card
    padding: SPACING.md + 2, // 14px
    borderWidth: 1.5,
    borderBottomWidth: 4,
    borderBottomColor: '#A4B456',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  specularBevel: {
    position: 'absolute',
    top: 0,
    left: 8,
    right: 8,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
  },
  heroHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  heroBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  heroBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  playerCountPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.compact,
    borderWidth: 1,
  },
  playerCountText: {
    fontSize: 10,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  heroContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroTextGroup: {
    flex: 1,
    paddingRight: SPACING.md,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: -0.3,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  heroSubtitle: {
    fontSize: 11,
    marginTop: 2,
    fontWeight: '500',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  heroActionBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#8C9A3C',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  heroArrow: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.lunarShadow,
    marginTop: -2,
    marginLeft: 1,
  },
  sectionHeaderRow: {
    marginTop: SPACING.xs,
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.2,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  galleryGridRow: {
    flexDirection: 'row',
    gap: SPACING.md, // 12px
  },
  galleryBox: {
    flex: 1,
    borderRadius: RADIUS.control + 2, // 14px rectangular box
    padding: SPACING.md, // 12px
    borderWidth: 1.5,
    borderBottomWidth: 4,
    borderBottomColor: '#CBD5E1',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    minHeight: 108,
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  },
  boxTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  boxIconSphere: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  boxTagPill: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: RADIUS.compact,
    borderWidth: 0.5,
  },
  boxTagText: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  boxActionPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.compact,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxActionPillText: {
    fontSize: 10,
    fontWeight: '900',
    color: COLORS.lunarShadow,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  boxTitle: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: -0.2,
    fontFamily: TYPOGRAPHY.fontFamily,
    marginTop: 4,
  },
  boxDesc: {
    fontSize: 11,
    marginTop: 1,
    fontWeight: '500',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});
