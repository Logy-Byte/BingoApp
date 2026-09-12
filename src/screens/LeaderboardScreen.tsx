import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LeaderboardEntry } from '../domain/types';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../design/tokens';
import { TrophyIcon, RankIcon } from '../components/icons/CustomIcons';
import { useTheme } from '../design/theme';

type PeriodFilter = 'Today' | 'This Week' | 'All Season';

/**
 * Leaderboard Screen with Reference 3 Podium & Ranking Structure
 * Directly translates Reference 3 podium hierarchy and Reference 2 diagonal hatch active row.
 */
export const LeaderboardScreen: React.FC = () => {
  const { theme } = useTheme();
  const [period, setPeriod] = useState<PeriodFilter>('This Week');

  // Authentic Season Leaderboard Seed (Ref 3 hierarchy)
  const [rankedPlayers] = useState<LeaderboardEntry[]>([
    {
      id: 'p-top-1',
      name: 'Apex_Valkyrie',
      avatar: 'AV',
      rank: 1,
      rating: 2480,
      wins: 142,
      winRate: 88,
      tier: 'Grandmaster',
      isCurrentUser: false,
    },
    {
      id: 'p-top-2',
      name: 'SolarDauber',
      avatar: 'SD',
      rank: 2,
      rating: 2310,
      wins: 118,
      winRate: 82,
      tier: 'Master',
      isCurrentUser: false,
    },
    {
      id: 'p-top-3',
      name: 'Matrix_King',
      avatar: 'MK',
      rank: 3,
      rating: 2195,
      wins: 95,
      winRate: 79,
      tier: 'Diamond',
      isCurrentUser: false,
    },
    {
      id: 'p-top-4',
      name: 'Player_One',
      avatar: 'PO',
      rank: 4,
      rating: 1450,
      wins: 34,
      winRate: 71,
      tier: 'Platinum',
      isCurrentUser: true,
    },
    {
      id: 'p-top-5',
      name: 'CyberDaub',
      avatar: 'CD',
      rank: 5,
      rating: 1380,
      wins: 29,
      winRate: 68,
      tier: 'Platinum',
      isCurrentUser: false,
    },
    {
      id: 'p-top-6',
      name: 'ZenithPulse',
      avatar: 'ZP',
      rank: 6,
      rating: 1240,
      wins: 21,
      winRate: 64,
      tier: 'Gold',
      isCurrentUser: false,
    },
  ]);

  const topThree = rankedPlayers.slice(0, 3);
  const remainingPlayers = rankedPlayers.slice(3);

  return (
    <View style={[styles.container, { backgroundColor: theme.bgCanvas }]}>
      {/* HEADER & FILTER (Ref 3 Filter Tabs) */}
      <View style={[styles.header, { borderBottomColor: theme.borderSubtle }]}>
        <View style={styles.titleRow}>
          <View
            style={[
              styles.trophyIconWrap,
              { backgroundColor: theme.accentHazelTint },
            ]}
          >
            <TrophyIcon size={20} color={COLORS.winterHazel} />
          </View>
          <View>
            <Text style={[styles.screenTitle, { color: theme.textPrimary }]}>
              Season Leaderboards
            </Text>
            <Text style={[styles.screenSubtitle, { color: theme.textSecondary }]}>
              Verified Competitive Standings
            </Text>
          </View>
        </View>

        {/* Reference 3 Segmented Period Filter */}
        <View
          style={[
            styles.filterRow,
            { backgroundColor: theme.dockBg, borderColor: theme.dockBorder },
          ]}
        >
          {(['Today', 'This Week', 'All Season'] as PeriodFilter[]).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.filterTab, period === tab && styles.filterTabActive]}
              onPress={() => setPeriod(tab)}
              hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
              accessibilityRole="tab"
              accessibilityState={{ selected: period === tab }}
            >
              <Text
                style={[
                  styles.filterLabel,
                  period === tab && styles.filterLabelActive,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* REFERENCE 3 TOP 3 PODIUM CLUSTER */}
        {topThree.length >= 3 && (
          <View
            style={[
              styles.podiumContainer,
              {
                backgroundColor: theme.bgCard,
                borderColor: theme.borderSubtle,
              },
            ]}
          >
            <Text style={[styles.podiumHeader, { color: theme.textMuted }]}>
              SEASON PODIUM
            </Text>
            <View style={styles.podiumRow}>
              {/* Rank 2 (Silver - Left) */}
              <View style={[styles.podiumColumn, styles.podiumColSilver]}>
                <View style={[styles.podiumAvatar, styles.avatarSilver]}>
                  <Text style={[styles.avatarInitials, { color: theme.textPrimary }]}>
                    {topThree[1].name.slice(0, 2).toUpperCase()}
                  </Text>
                  <View style={[styles.rankCrownBadge, styles.badgeSilver]}>
                    <Text style={styles.rankCrownText}>2</Text>
                  </View>
                </View>
                <Text style={[styles.podiumName, { color: theme.textPrimary }]} numberOfLines={1}>
                  {topThree[1].name}
                </Text>
                <View
                  style={[
                    styles.ratingPill,
                    { backgroundColor: theme.bgRecessed },
                  ]}
                >
                  <RankIcon size={11} color={COLORS.winterHazel} style={{ marginRight: 3 }} />
                  <Text style={[styles.ratingText, { color: theme.textPrimary }]}>
                    {topThree[1].rating}
                  </Text>
                </View>
              </View>

              {/* Rank 1 (Gold - Center Hero) */}
              <View style={[styles.podiumColumn, styles.podiumColGold]}>
                <View
                  style={[
                    styles.podiumAvatar,
                    styles.avatarGold,
                    { borderColor: COLORS.winterHazel },
                  ]}
                >
                  <Text style={[styles.avatarInitials, { color: COLORS.winterHazel }]}>
                    {topThree[0].name.slice(0, 2).toUpperCase()}
                  </Text>
                  <View
                    style={[
                      styles.rankCrownBadge,
                      styles.badgeGold,
                      { backgroundColor: COLORS.winterHazel },
                    ]}
                  >
                    <Text style={[styles.rankCrownText, { color: COLORS.lunarShadow }]}>1</Text>
                  </View>
                </View>
                <Text
                  style={[styles.podiumName, styles.goldName, { color: COLORS.winterHazel }]}
                  numberOfLines={1}
                >
                  {topThree[0].name}
                </Text>
                <View
                  style={[
                    styles.ratingPill,
                    styles.ratingPillGold,
                    { backgroundColor: theme.accentHazelTint, borderColor: COLORS.winterHazel },
                  ]}
                >
                  <RankIcon size={12} color={COLORS.winterHazel} style={{ marginRight: 3 }} />
                  <Text style={[styles.ratingText, { color: '#8A6724' }]}>
                    {topThree[0].rating}
                  </Text>
                </View>
              </View>

              {/* Rank 3 (Bronze - Right) */}
              <View style={[styles.podiumColumn, styles.podiumColBronze]}>
                <View style={[styles.podiumAvatar, styles.avatarBronze]}>
                  <Text style={[styles.avatarInitials, { color: theme.textPrimary }]}>
                    {topThree[2].name.slice(0, 2).toUpperCase()}
                  </Text>
                  <View style={[styles.rankCrownBadge, styles.badgeBronze]}>
                    <Text style={styles.rankCrownText}>3</Text>
                  </View>
                </View>
                <Text style={[styles.podiumName, { color: theme.textPrimary }]} numberOfLines={1}>
                  {topThree[2].name}
                </Text>
                <View
                  style={[
                    styles.ratingPill,
                    { backgroundColor: theme.bgRecessed },
                  ]}
                >
                  <RankIcon size={11} color={COLORS.winterHazel} style={{ marginRight: 3 }} />
                  <Text style={[styles.ratingText, { color: theme.textPrimary }]}>
                    {topThree[2].rating}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* RANKED LIST ROWS (Ref 3 & Ref 2 Diagonal Hatch Highlight) */}
        <View style={styles.listContainer}>
          <Text style={[styles.listSectionTitle, { color: theme.textMuted }]}>
            CONTINUING RANKINGS
          </Text>
          {remainingPlayers.map((item) => (
            <View
              key={item.id}
              style={[
                styles.listItem,
                {
                  backgroundColor: item.isCurrentUser
                    ? theme.isDark
                      ? '#2A2E24'
                      : '#F2F6DB'
                    : theme.bgCard,
                  borderColor: item.isCurrentUser
                    ? COLORS.gentleOlive
                    : theme.borderSubtle,
                },
              ]}
            >
              {/* If current user, render subtle diagonal hatch stripes (Ref 2 active row) */}
              {item.isCurrentUser && (
                <View style={styles.userRowHatchWrap} pointerEvents="none">
                  {[...Array(10)].map((_, i) => (
                    <View
                      key={`hatch-${i}`}
                      style={[
                        styles.userRowHatchStripe,
                        { left: i * 36 - 20 },
                      ]}
                    />
                  ))}
                </View>
              )}

              <Text
                style={[
                  styles.listRank,
                  {
                    color: item.isCurrentUser ? COLORS.lunarShadow : theme.textMuted,
                  },
                ]}
              >
                {String(item.rank).padStart(2, '0')}
              </Text>

              <View
                style={[
                  styles.listAvatar,
                  {
                    backgroundColor: item.isCurrentUser
                      ? COLORS.gentleOlive
                      : theme.bgRecessed,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.listAvatarInitials,
                    {
                      color: item.isCurrentUser ? COLORS.lunarShadow : theme.textPrimary,
                    },
                  ]}
                >
                  {item.name.slice(0, 2).toUpperCase()}
                </Text>
              </View>

              <View style={styles.listMeta}>
                <Text
                  style={[
                    styles.listName,
                    { color: theme.textPrimary },
                    item.isCurrentUser && styles.currentUserName,
                  ]}
                >
                  {item.name} {item.isCurrentUser && ' (You)'}
                </Text>
                <Text style={[styles.listTier, { color: theme.textSecondary }]}>
                  {item.tier} • {item.wins} Wins
                </Text>
              </View>

              <View
                style={[
                  styles.listScorePill,
                  {
                    backgroundColor: item.isCurrentUser
                      ? 'rgba(203, 215, 126, 0.35)'
                      : theme.bgRecessed,
                  },
                ]}
              >
                <RankIcon size={11} color={COLORS.winterHazel} style={{ marginRight: 3 }} />
                <Text style={[styles.listRating, { color: theme.textPrimary }]}>
                  {item.rating}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
    borderBottomWidth: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  trophyIconWrap: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.2,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  screenSubtitle: {
    fontSize: 11,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  filterRow: {
    flexDirection: 'row',
    borderRadius: RADIUS.dock,
    padding: SPACING.xs,
    borderWidth: 1,
  },
  filterTab: {
    flex: 1,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.pill,
  },
  filterTabActive: {
    backgroundColor: COLORS.cleanWhite,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  filterLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8E94A0',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  filterLabelActive: {
    color: COLORS.lunarShadow,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingBottom: 110,
    gap: SPACING.lg,
  },
  podiumContainer: {
    borderRadius: RADIUS.hero,
    padding: SPACING.lg,
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  podiumHeader: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    textAlign: 'center',
    marginBottom: SPACING.md,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  podiumRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: SPACING.md,
    height: 180,
  },
  podiumColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  podiumColSilver: {
    height: 140,
  },
  podiumColGold: {
    height: 175,
  },
  podiumColBronze: {
    height: 125,
  },
  podiumAvatar: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.pill,
    backgroundColor: '#EAEAEA',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    position: 'relative',
    marginBottom: SPACING.sm,
  },
  avatarGold: {
    width: 60,
    height: 60,
    borderWidth: 2.5,
  },
  avatarSilver: {
    borderColor: '#94A3B8',
  },
  avatarBronze: {
    borderColor: '#B45309',
  },
  avatarInitials: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  rankCrownBadge: {
    position: 'absolute',
    bottom: -6,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeGold: {
    paddingHorizontal: 8,
  },
  badgeSilver: {
    backgroundColor: '#94A3B8',
  },
  badgeBronze: {
    backgroundColor: '#B45309',
  },
  rankCrownText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#FFFFFF',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  podiumName: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  goldName: {
    fontSize: 13,
    fontWeight: '800',
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.pill,
  },
  ratingPillGold: {
    borderWidth: 1,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  listContainer: {
    gap: SPACING.sm,
  },
  listSectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 2,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  listItem: {
    borderRadius: RADIUS.surface,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  userRowHatchWrap: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  userRowHatchStripe: {
    position: 'absolute',
    top: -20,
    bottom: -20,
    width: 12,
    backgroundColor: 'rgba(203, 215, 126, 0.15)',
    transform: [{ rotate: '45deg' }],
  },
  listRank: {
    fontSize: 12,
    fontWeight: '800',
    width: 24,
    fontFamily: TYPOGRAPHY.monoFamily,
  },
  listAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  listAvatarInitials: {
    fontSize: 12,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  listMeta: {
    flex: 1,
    gap: 2,
  },
  listName: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  currentUserName: {
    fontWeight: '800',
  },
  listTier: {
    fontSize: 11,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  listScorePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.pill,
  },
  listRating: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});
