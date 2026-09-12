import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../design/tokens';
import { SettingsIcon, VolumeIcon, SpeechIcon, RankIcon } from '../icons/CustomIcons';
import { useTheme } from '../../design/theme';

interface PlayerStageBarProps {
  playerName: string;
  tier: string;
  rating: number;
  soundEnabled: boolean;
  voiceEnabled: boolean;
  onToggleSound: () => void;
  onToggleVoice: () => void;
  onOpenSettings?: () => void;
}

export const PlayerStageBar: React.FC<PlayerStageBarProps> = ({
  playerName,
  tier,
  rating,
  soundEnabled,
  voiceEnabled,
  onToggleSound,
  onToggleVoice,
  onOpenSettings,
}) => {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <View style={styles.container}>
      {/* Player Identity Badge */}
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
          <View style={styles.nameRow}>
            <Text style={[styles.playerName, { color: theme.textPrimary }]}>
              {playerName}
            </Text>
            <View
              style={[
                styles.tierChip,
                {
                  backgroundColor: theme.accentHazelTint,
                  borderColor: COLORS.winterHazel,
                },
              ]}
            >
              <Text style={styles.tierText}>{tier}</Text>
            </View>
          </View>
          <View style={styles.ratingRow}>
            <RankIcon size={12} color={COLORS.winterHazel} style={{ marginRight: 3 }} />
            <Text style={[styles.ratingValue, { color: theme.textPrimary }]}>
              {rating.toLocaleString()}
            </Text>
            <Text style={[styles.ratingLabel, { color: theme.textMuted }]}>POINTS</Text>
          </View>
        </View>
      </View>

      {/* Quick Audio, Theme & Settings Controls */}
      <View style={styles.quickControls}>
        {/* Theme Toggle Button (Light/Dark mode) */}
        <TouchableOpacity
          style={[
            styles.iconBtn,
            {
              backgroundColor: theme.bgCard,
              borderColor: theme.borderSubtle,
            },
          ]}
          onPress={toggleTheme}
          activeOpacity={0.8}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel={`Switch to ${isDark ? 'Light' : 'Dark'} theme`}
        >
          <Text style={styles.themeIconEmoji}>{isDark ? '☀️' : '🌙'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.iconBtn,
            {
              backgroundColor: theme.bgCard,
              borderColor: theme.borderSubtle,
            },
          ]}
          onPress={onToggleSound}
          activeOpacity={0.8}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel="Toggle sound effects"
        >
          <VolumeIcon
            size={18}
            color={soundEnabled ? COLORS.gentleOlive : theme.textMuted}
            muted={!soundEnabled}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.iconBtn,
            {
              backgroundColor: theme.bgCard,
              borderColor: theme.borderSubtle,
            },
          ]}
          onPress={onToggleVoice}
          activeOpacity={0.8}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel="Toggle voice caller"
        >
          <SpeechIcon
            size={18}
            color={voiceEnabled ? COLORS.gentleOlive : theme.textMuted}
            active={voiceEnabled}
          />
        </TouchableOpacity>

        {onOpenSettings && (
          <TouchableOpacity
            style={[
              styles.iconBtn,
              {
                backgroundColor: theme.bgCard,
                borderColor: theme.borderSubtle,
              },
            ]}
            onPress={onOpenSettings}
            activeOpacity={0.8}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityRole="button"
            accessibilityLabel="Open settings"
          >
            <SettingsIcon size={18} color={theme.textSecondary} />
          </TouchableOpacity>
        )}
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
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm, // 8px
  },
  playerName: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  tierChip: {
    paddingHorizontal: SPACING.sm, // 8px
    paddingVertical: 2,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
  },
  tierText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#8A6724',
    letterSpacing: 0.6,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs, // 4px
  },
  ratingValue: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  ratingLabel: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  quickControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  themeIconEmoji: {
    fontSize: 14,
  },
});
