import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { PlayerProfile } from '../domain/types';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../src/design/tokens';
import { CheckIcon, TrophyIcon, Icon, IconName, RankIcon, EditPencilIcon } from '../components/icons/CustomIcons';
import { StreakBarChart } from '../components/common/StreakBarChart';
import { useTheme } from '../design/theme';

type ProfileSection = 'Overview' | 'Achievements' | 'Match History';

interface ProfileScreenProps {
  playerName?: string;
  onUpdateName?: (name: string) => void;
  onOpenSettings?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  playerName = 'Player_One',
  onUpdateName,
}) => {
  const { theme, isDark } = useTheme();
  const [activeSection, setActiveSection] = useState<ProfileSection>('Overview');
  const [selectedAchievementId, setSelectedAchievementId] = useState<string | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(playerName);

  const handleSaveName = () => {
    const trimmed = nameInput.trim();
    if (trimmed) {
      onUpdateName?.(trimmed);
      setIsEditingName(false);
    }
  };

  // Authentic local player identity state
  const profile: PlayerProfile = {
    id: 'player-local',
    name: playerName,
    avatar: playerName.slice(0, 2).toUpperCase(),
    tier: 'Platinum',
    rating: 1450,
    gamesPlayed: 48,
    wins: 34,
    winRate: 71,
    bestStreak: 6,
    currentStreak: 2,
    achievements: [
      { id: 'a1', title: 'First Victory', description: 'Win your first 5×5 Bingo match', unlocked: true, icon: 'trophy' },
      { id: 'a2', title: 'Triple Threat', description: 'Complete 3 lines in a single match', unlocked: true, icon: 'ranked' },
      { id: 'a3', title: 'Corner Master', description: 'Complete the four corners pattern', unlocked: false, icon: 'bingo' },
      { id: 'a4', title: 'Grandmaster Clash', description: 'Defeat the Grandmaster Robot AI', unlocked: false, icon: 'winner' },
    ],
    recentMatches: [
      { id: 'm1', date: 'Today, 14:20', mode: 'RANKED', result: 'WIN', score: 2500, lines: 3, ratingDelta: 25 },
      { id: 'm2', date: 'Yesterday, 19:45', mode: 'ROBOT', result: 'WIN', score: 2000, lines: 2, ratingDelta: 0 },
      { id: 'm3', date: 'Sep 10, 11:10', mode: 'DAILY', result: 'WIN', score: 1850, lines: 3, ratingDelta: 0 },
    ],
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: theme.bgCanvas }]}
      showsVerticalScrollIndicator={false}
    >
      {/* PLAYER CREST (Clean, High-Craft, De-cluttered with Editable Name) */}
      <View
        style={[
          styles.crestCard,
          {
            backgroundColor: theme.bgCard,
            borderColor: theme.borderSubtle,
          },
        ]}
      >
        <View
          style={[
            styles.avatarWrap,
            {
              backgroundColor: theme.bgRecessed,
              borderColor: COLORS.winterHazel,
            },
          ]}
        >
          <Text style={[styles.avatarInitials, { color: theme.textPrimary }]}>
            {profile.name.slice(0, 2).toUpperCase()}
          </Text>
          <View style={styles.onlineBadge} />
        </View>

        <View style={styles.identityDetails}>
          {isEditingName ? (
            <View style={styles.editNameRow}>
              <TextInput
                style={[
                  styles.nameInput,
                  {
                    color: theme.textPrimary,
                    backgroundColor: theme.bgRecessed,
                    borderColor: COLORS.winterHazel,
                  },
                ]}
                value={nameInput}
                onChangeText={setNameInput}
                autoFocus
                maxLength={18}
              />
              <TouchableOpacity
                style={[styles.saveBtn, { backgroundColor: COLORS.gentleOlive }]}
                onPress={handleSaveName}
                accessibilityRole="button"
                accessibilityLabel="Save player name"
              >
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.cancelBtn, { borderColor: theme.borderSubtle }]}
                onPress={() => {
                  setNameInput(playerName);
                  setIsEditingName(false);
                }}
                accessibilityRole="button"
                accessibilityLabel="Cancel name edit"
              >
                <Text style={[styles.cancelBtnText, { color: theme.textMuted }]}>✕</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.nameHeaderRow}>
              <Text style={[styles.playerName, { color: theme.textPrimary }]}>{profile.name}</Text>
              <TouchableOpacity
                style={[
                  styles.editPencilBtn,
                  { backgroundColor: theme.bgRecessed, borderColor: theme.borderSubtle },
                ]}
                onPress={() => {
                  setNameInput(profile.name);
                  setIsEditingName(true);
                }}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel="Edit player profile name"
              >
                <EditPencilIcon size={13} color={COLORS.winterHazel} />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.ratingRow}>
            <RankIcon size={13} color={COLORS.winterHazel} style={{ marginRight: 4 }} />
            <Text style={[styles.ratingValue, { color: theme.textPrimary }]}>
              {profile.rating.toLocaleString()}
            </Text>
            <Text style={[styles.ratingLabel, { color: theme.textMuted }]}>COMPETITIVE RATING</Text>
          </View>
        </View>
      </View>

      {/* 3-METRIC STATS KPI SHELF */}
      <View style={styles.kpiRow}>
        <View
          style={[
            styles.kpiCard,
            {
              backgroundColor: theme.bgCard,
              borderColor: theme.borderSubtle,
            },
          ]}
        >
          <Text style={[styles.kpiValue, { color: theme.textPrimary }]}>
            {profile.wins}
          </Text>
          <Text style={[styles.kpiLabel, { color: theme.textMuted }]}>TOTAL WINS</Text>
        </View>
        <View
          style={[
            styles.kpiCard,
            styles.kpiCardHighlight,
            {
              backgroundColor: theme.bgCard,
              borderColor: COLORS.gentleOlive,
            },
          ]}
        >
          <Text style={[styles.kpiValue, { color: COLORS.gentleOlive }]}>
            {profile.winRate}%
          </Text>
          <Text style={[styles.kpiLabel, { color: theme.textMuted }]}>WIN RATE</Text>
        </View>
        <View
          style={[
            styles.kpiCard,
            {
              backgroundColor: theme.bgCard,
              borderColor: theme.borderSubtle,
            },
          ]}
        >
          <Text style={[styles.kpiValue, { color: COLORS.winterHazel }]}>
            {profile.gamesPlayed}
          </Text>
          <Text style={[styles.kpiLabel, { color: theme.textMuted }]}>MATCHES</Text>
        </View>
      </View>

      {/* SEGMENTED SECTION PILL FILTER */}
      <View
        style={[
          styles.sectionTabRow,
          {
            backgroundColor: theme.dockBg,
            borderColor: theme.dockBorder,
          },
        ]}
      >
        {(['Overview', 'Achievements', 'Match History'] as ProfileSection[]).map((sec) => {
          const isActive = activeSection === sec;
          return (
            <TouchableOpacity
              key={sec}
              style={[styles.sectionTab, isActive && styles.sectionTabActive]}
              onPress={() => setActiveSection(sec)}
              activeOpacity={0.8}
              hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
            >
              <Text
                style={[
                  styles.sectionTabLabel,
                  isActive && styles.sectionTabLabelActive,
                ]}
              >
                {sec}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* TAB CONTENT: OVERVIEW */}
      {activeSection === 'Overview' && (
        <View style={styles.tabContent}>
          {/* 7-Day Activity Bar Chart */}
          <StreakBarChart currentStreak={profile.bestStreak} totalWeekWins={profile.wins} />

          {/* Season Progression Track */}
          <View
            style={[
              styles.infoCard,
              {
                backgroundColor: theme.bgCard,
                borderColor: theme.borderSubtle,
              },
            ]}
          >
            <View style={styles.cardHeaderRow}>
              <Text style={[styles.cardHeader, { color: theme.textPrimary }]}>
                Season Progression
              </Text>
              <Text style={[styles.progressPercent, { color: COLORS.gentleOlive }]}>
                72.5%
              </Text>
            </View>
            <View
              style={[
                styles.progressTrack,
                { backgroundColor: isDark ? '#363A42' : '#ECECEC' },
              ]}
            >
              <View
                style={[
                  styles.progressBar,
                  { width: '72.5%', backgroundColor: COLORS.gentleOlive },
                ]}
              />
            </View>
            <View style={styles.progressLabels}>
              <Text style={[styles.progressSubtext, { color: theme.textSecondary }]}>
                Rank Tier Progress
              </Text>
              <Text style={[styles.progressSubtext, { color: theme.textMuted }]}>
                1,450 / 2,000 XP
              </Text>
            </View>
          </View>

          {/* Career Statistics */}
          <View
            style={[
              styles.infoCard,
              {
                backgroundColor: theme.bgCard,
                borderColor: theme.borderSubtle,
              },
            ]}
          >
            <Text style={[styles.cardHeader, { color: theme.textPrimary, marginBottom: 12 }]}>
              Career Statistics
            </Text>

            <View style={styles.statRow}>
              <View style={styles.statRowLeft}>
                <View
                  style={[
                    styles.statIconSphere,
                    { backgroundColor: theme.accentOliveTint },
                  ]}
                >
                  <TrophyIcon size={16} color={COLORS.lunarShadow} />
                </View>
                <View>
                  <Text style={[styles.statRowTitle, { color: theme.textPrimary }]}>
                    Matches Won
                  </Text>
                  <Text style={[styles.statRowSub, { color: theme.textMuted }]}>
                    Competitive 5×5 victories
                  </Text>
                </View>
              </View>
              <Text style={[styles.statRowValue, { color: theme.textPrimary }]}>
                {profile.wins}
              </Text>
            </View>

            <View style={styles.statRow}>
              <View style={styles.statRowLeft}>
                <View
                  style={[
                    styles.statIconSphere,
                    { backgroundColor: theme.accentHazelTint },
                  ]}
                >
                  <TrophyIcon size={16} color={COLORS.winterHazel} />
                </View>
                <View>
                  <Text style={[styles.statRowTitle, { color: theme.textPrimary }]}>
                    Best Winning Streak
                  </Text>
                  <Text style={[styles.statRowSub, { color: theme.textMuted }]}>
                    Consecutive victories
                  </Text>
                </View>
              </View>
              <Text style={[styles.statRowValue, { color: COLORS.winterHazel }]}>
                {profile.bestStreak}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* TAB CONTENT: ACHIEVEMENTS */}
      {activeSection === 'Achievements' && (
        <View style={styles.tabContent}>
          {profile.achievements.map((ach) => {
            const isSelected = selectedAchievementId === ach.id;
            return (
              <TouchableOpacity
                key={ach.id}
                style={[
                  styles.achievementCard,
                  {
                    backgroundColor: isSelected ? theme.bgRecessed : theme.bgCard,
                    borderColor: ach.unlocked
                      ? COLORS.gentleOlive
                      : isSelected
                      ? COLORS.winterHazel
                      : theme.borderSubtle,
                    borderWidth: isSelected || ach.unlocked ? 1.5 : 1,
                  },
                ]}
                onPress={() => setSelectedAchievementId(ach.id)}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.achievementIconWrap,
                    {
                      backgroundColor: ach.unlocked
                        ? theme.accentOliveTint
                        : theme.bgRecessed,
                    },
                  ]}
                >
                  <Icon
                    name={ach.icon as IconName}
                    size={20}
                    color={ach.unlocked ? COLORS.lunarShadow : theme.textMuted}
                  />
                </View>
                <View style={styles.achievementMeta}>
                  <Text style={[styles.achievementTitle, { color: theme.textPrimary }]}>
                    {ach.title}
                  </Text>
                  <Text style={[styles.achievementDesc, { color: theme.textSecondary }]}>
                    {ach.description}
                  </Text>
                </View>
                {ach.unlocked ? (
                  <View
                    style={[
                      styles.unlockedBadge,
                      { backgroundColor: theme.accentOliveTint },
                    ]}
                  >
                    <CheckIcon size={12} color={COLORS.lunarShadow} />
                    <Text style={[styles.unlockedText, { color: COLORS.lunarShadow }]}>
                      DONE
                    </Text>
                  </View>
                ) : (
                  <View
                    style={[
                      styles.lockedBadge,
                      { backgroundColor: theme.bgSubtle },
                    ]}
                  >
                    <Text style={[styles.lockedText, { color: theme.textMuted }]}>
                      LOCKED
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* TAB CONTENT: MATCH HISTORY */}
      {activeSection === 'Match History' && (
        <View style={styles.tabContent}>
          {profile.recentMatches.map((m) => (
            <View
              key={m.id}
              style={[
                styles.historyCard,
                {
                  backgroundColor: theme.bgCard,
                  borderColor: theme.borderSubtle,
                },
              ]}
            >
              <View style={styles.historyLeft}>
                <View
                  style={[
                    styles.resultBadge,
                    { backgroundColor: theme.accentOliveTint },
                  ]}
                >
                  <Text style={[styles.resultBadgeText, { color: COLORS.lunarShadow }]}>
                    {m.result}
                  </Text>
                </View>
                <View>
                  <Text style={[styles.historyMode, { color: theme.textPrimary }]}>
                    {m.mode} • {m.lines} Lines
                  </Text>
                  <Text style={[styles.historyDate, { color: theme.textSecondary }]}>
                    {m.date}
                  </Text>
                </View>
              </View>

              <View style={styles.historyRight}>
                <Text style={[styles.historyScore, { color: theme.textPrimary }]}>
                  {m.score.toLocaleString()} PTS
                </Text>
                {m.ratingDelta !== 0 && (
                  <Text style={[styles.ratingDelta, { color: COLORS.gentleOlive }]}>
                    +{m.ratingDelta} MMR
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.lg,
    paddingBottom: 110,
  },
  crestCard: {
    borderRadius: RADIUS.sheet, // 28px
    padding: SPACING.lg, // 16px
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md, // 12px
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  avatarWrap: {
    width: 52,
    height: 52,
    borderRadius: RADIUS.pill,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginRight: SPACING.md,
  },
  avatarInitials: {
    fontSize: 18,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.gentleOlive,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  identityDetails: {
    flex: 1,
    gap: 4,
  },
  nameHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  playerName: {
    fontSize: 19,
    fontWeight: '800',
    letterSpacing: -0.3,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  editPencilBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  nameInput: {
    flex: 1,
    height: 34,
    borderRadius: RADIUS.compact,
    borderWidth: 1.5,
    paddingHorizontal: 8,
    fontSize: 14,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  saveBtn: {
    paddingHorizontal: 10,
    height: 34,
    borderRadius: RADIUS.compact,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: {
    fontSize: 12,
    fontWeight: '900',
    color: COLORS.lunarShadow,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  cancelBtn: {
    width: 34,
    height: 34,
    borderRadius: RADIUS.compact,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingValue: {
    fontSize: 13,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.monoFamily,
    marginRight: 4,
  },
  ratingLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  kpiRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  kpiCard: {
    flex: 1,
    borderRadius: RADIUS.surface, // 16px
    paddingVertical: SPACING.md, // 12px
    paddingHorizontal: SPACING.sm, // 8px
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  kpiCardHighlight: {
    borderWidth: 1.5,
  },
  kpiValue: {
    fontSize: 21,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
    marginBottom: 2,
  },
  kpiLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  sectionTabRow: {
    flexDirection: 'row',
    borderRadius: RADIUS.dock, // 28px
    padding: SPACING.xs, // 4px
    borderWidth: 1,
    marginBottom: SPACING.md, // 12px
    gap: SPACING.xs, // 4px
  },
  sectionTab: {
    flex: 1,
    paddingVertical: SPACING.sm, // 8px
    paddingHorizontal: SPACING.sm, // 8px
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.pill,
  },
  sectionTabActive: {
    backgroundColor: COLORS.cleanWhite, // Illuminated white capsule
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTabLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8E94A0',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  sectionTabLabelActive: {
    color: COLORS.lunarShadow, // Bold dark ink
    fontWeight: '800',
    letterSpacing: -0.2,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  tabContent: {
    gap: SPACING.sm, // 8px
  },
  infoCard: {
    borderRadius: RADIUS.hero, // 24px
    padding: SPACING.lg, // 16px
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  cardHeader: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.2,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  progressTrack: {
    height: 7,
    borderRadius: RADIUS.pill,
    overflow: 'hidden',
    marginVertical: SPACING.xs,
  },
  progressBar: {
    height: '100%',
    borderRadius: RADIUS.pill,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  progressSubtext: {
    fontSize: 11,
    fontWeight: '500',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  statRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  statIconSphere: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statRowTitle: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  statRowSub: {
    fontSize: 11,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  statRowValue: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  achievementCard: {
    borderRadius: RADIUS.surface, // 16px
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    gap: SPACING.md,
  },
  achievementIconWrap: {
    width: 42,
    height: 42,
    borderRadius: RADIUS.control,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementMeta: {
    flex: 1,
    gap: 2,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  achievementDesc: {
    fontSize: 11,
    lineHeight: 15,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  unlockedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.pill,
  },
  unlockedText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  lockedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.pill,
  },
  lockedText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  historyCard: {
    borderRadius: RADIUS.surface, // 16px
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  resultBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.compact,
  },
  resultBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  historyMode: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  historyDate: {
    fontSize: 11,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  historyRight: {
    alignItems: 'flex-end',
    gap: 2,
  },
  historyScore: {
    fontSize: 13,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.monoFamily,
  },
  ratingDelta: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});
