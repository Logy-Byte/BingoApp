import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../design/tokens';
import { RankIcon, SunIcon, MoonIcon, VolumeIcon } from '../icons/CustomIcons';
import { useTheme } from '../../design/theme';

interface PlayerStageBarProps {
  playerName: string;
  tier?: string;
  rating: number;
  soundEnabled?: boolean;
  voiceEnabled?: boolean;
  onToggleSound?: () => void;
  onToggleVoice?: () => void;
  onOpenSettings?: () => void;
}

export const PlayerStageBar: React.FC<PlayerStageBarProps> = ({
  playerName,
  rating,
  soundEnabled = true,
  onToggleSound,
}) => {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <View style={styles.container}>
      {/* Player Identity Badge (Clean, Minimalist, Luxury) */}
      <View style={styles.playerIdentity}>
        <View
          style={[
            styles.avatarSphere,
            {
              backgroundColor: theme.bgCard,
              borderColor: COLORS.winterHazel, // #E6CA9A
            },
          ]}
        >
          <Text style={[styles.avatarInitials, { color: theme.textPrimary }]}>
            {playerName.slice(0, 2).toUpperCase()}
          </Text>
          <View style={styles.onlinePip} />
        </View>

        <View style={styles.identityTextGroup}>
          <Text style={[styles.playerName, { color: theme.textPrimary }]}>
            {playerName}
          </Text>
          <View style={styles.ratingRow}>
            <RankIcon size={12} color={COLORS.winterHazel} style={{ marginRight: 4 }} />
            <Text style={[styles.ratingValue, { color: theme.textPrimary }]}>
              {rating.toLocaleString()}
            </Text>
            <Text style={[styles.ratingLabel, { color: theme.textMuted }]}>POINTS</Text>
          </View>
        </View>
      </View>

      {/* Sleek Theme Toggle & Game Sound Button */}
      <View style={styles.quickControls}>
        <TouchableOpacity
          style={[
            styles.controlBtn,
            styles.soundBtn,
            {
              backgroundColor: theme.bgCard,
              borderColor: soundEnabled ? COLORS.gentleOlive : theme.borderSubtle,
            },
          ]}
          onPress={onToggleSound}
          activeOpacity={0.75}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel={soundEnabled ? 'Mute game sound' : 'Enable game sound'}
        >
          <VolumeIcon
            size={18}
            color={soundEnabled ? COLORS.gentleOlive : theme.textMuted}
            muted={!soundEnabled}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.controlBtn,
            styles.themeBtn,
            {
              backgroundColor: theme.bgCard,
              borderColor: theme.borderSubtle,
            },
          ]}
          onPress={toggleTheme}
          activeOpacity={0.75}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel={`Switch to ${isDark ? 'Light' : 'Dark'} theme`}
        >
          {isDark ? (
            <SunIcon size={18} color={COLORS.winterHazel} />
          ) : (
            <MoonIcon size={18} color={COLORS.lunarShadow} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm, // 8px
    marginBottom: SPACING.sm, // 8px
  },
  playerIdentity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md, // 12px
  },
  avatarSphere: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.pill,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarInitials: {
    fontSize: 15,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
    letterSpacing: -0.5,
  },
  onlinePip: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 11,
    height: 11,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.gentleOlive, // #CBD77E
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  identityTextGroup: {
    gap: 2,
  },
  playerName: {
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.3,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingValue: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.monoFamily,
    marginRight: 4,
  },
  ratingLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  quickControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  controlBtn: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  soundBtn: {
    marginRight: 2,
  },
  themeBtn: {},
});
