import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SoundEngine } from '../audio/soundEngine';
import { GameCard } from '../components/common/GameCard';
import { RouteHeader } from '../components/common/RouteHeader';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../design/tokens';
import {
  VolumeIcon,
  SpeechIcon,
  VibrationIcon,
  BingoIdentityIcon,
  ChevronIcon,
  IconSpecimenSheet,
} from '../components/icons';
import { useTheme, REFERENCE_PALETTE } from '../design/theme';

interface SettingsScreenProps {
  onBack: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack }) => {
  const { theme, mode, setMode } = useTheme();
  const [isMuted, setIsMuted] = useState(SoundEngine.isAudioMuted());
  const [voiceCaller, setVoiceCaller] = useState(SoundEngine.isVoiceEnabled());
  const [volumeLevel, setVolumeLevel] = useState<'low' | 'med' | 'high'>('med');
  const [showSpecimenSheet, setShowSpecimenSheet] = useState(false);

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    SoundEngine.setMuted(next);
  };

  const handleToggleVoice = () => {
    const next = !voiceCaller;
    setVoiceCaller(next);
    SoundEngine.setVoiceEnabled(next);
  };

  const handleChangeVolume = (level: 'low' | 'med' | 'high') => {
    setVolumeLevel(level);
    const vol = level === 'low' ? 0.25 : level === 'med' ? 0.5 : 1.0;
    SoundEngine.setVolume(vol);
    SoundEngine.playDaub();
  };

  return (
    <View style={[styles.screenContainer, { backgroundColor: theme.bgCanvas }]}>
      <RouteHeader title="Settings" onBack={onBack} />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* APPEARANCE & THEME MODE (Reference 3 Spec) */}
        <GameCard
          style={[
            styles.card,
            { backgroundColor: theme.bgCard, borderColor: theme.borderSubtle },
          ]}
        >
          <Text style={[styles.sectionHeader, { color: theme.textPrimary }]}>
            Theme & Appearance
          </Text>
          <Text style={[styles.specimenIntro, { color: theme.textSecondary }]}>
            Reference-driven palette with Sora typography and dual light/dark aesthetics.
          </Text>

          {/* Theme Mode Selector Buttons */}
          <View style={styles.themeToggleRow}>
            <TouchableOpacity
              style={[
                styles.themeModeBtn,
                mode === 'light' && styles.themeModeBtnActive,
                {
                  backgroundColor: mode === 'light' ? COLORS.cleanWhite : theme.bgRecessed,
                  borderColor: mode === 'light' ? COLORS.gentleOlive : theme.borderSubtle,
                },
              ]}
              onPress={() => setMode('light')}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Switch to Light Theme"
            >
              <Text style={styles.themeModeEmoji}>☀️</Text>
              <View>
                <Text style={[styles.themeModeTitle, { color: COLORS.lunarShadow }]}>
                  Light Theme
                </Text>
                <Text style={[styles.themeModeSub, { color: '#6E737B' }]}>
                  Gray Whisper & Clean White
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.themeModeBtn,
                mode === 'dark' && styles.themeModeBtnActive,
                {
                  backgroundColor: mode === 'dark' ? COLORS.lunarShadow : theme.bgRecessed,
                  borderColor: mode === 'dark' ? COLORS.gentleOlive : theme.borderSubtle,
                },
              ]}
              onPress={() => setMode('dark')}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Switch to Dark Theme"
            >
              <Text style={styles.themeModeEmoji}>🌙</Text>
              <View>
                <Text
                  style={[
                    styles.themeModeTitle,
                    { color: mode === 'dark' ? COLORS.cleanWhite : theme.textPrimary },
                  ]}
                >
                  Dark Theme
                </Text>
                <Text style={[styles.themeModeSub, { color: '#A0A5AD' }]}>
                  Lunar Shadow (#282828)
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Palette Color Swatches (Reference Image 3) */}
          <View style={styles.paletteHeaderRow}>
            <Text style={[styles.paletteLabel, { color: theme.textMuted }]}>
              EXTRACTED REFERENCE PALETTE
            </Text>
          </View>
          <View style={styles.paletteRow}>
            {[
              { name: 'Lunar Shadow', hex: REFERENCE_PALETTE.lunarShadow, border: '#444' },
              { name: 'Clean White', hex: REFERENCE_PALETTE.cleanWhite, border: '#CCC' },
              { name: 'Gray Whisper', hex: REFERENCE_PALETTE.grayWhisper, border: '#CCC' },
              { name: 'Gentle Olive', hex: REFERENCE_PALETTE.gentleOlive, border: '#B8C46C' },
              { name: 'Winter Hazel', hex: REFERENCE_PALETTE.winterHazel, border: '#D0B484' },
            ].map((col) => (
              <View key={col.name} style={styles.swatchItem}>
                <View
                  style={[
                    styles.swatchCircle,
                    { backgroundColor: col.hex, borderColor: col.border },
                  ]}
                />
                <Text style={[styles.swatchText, { color: theme.textSecondary }]} numberOfLines={1}>
                  {col.name}
                </Text>
              </View>
            ))}
          </View>
        </GameCard>

        {/* AUDIO & TACTILE */}
        <GameCard
          style={[
            styles.card,
            { backgroundColor: theme.bgCard, borderColor: theme.borderSubtle },
          ]}
        >
          <Text style={[styles.sectionHeader, { color: theme.textPrimary }]}>
            Audio & effects
          </Text>

          <View style={[styles.settingRow, { borderBottomColor: theme.borderSubtle }]}>
            <View style={styles.iconPrefix}>
              <VolumeIcon
                size={20}
                color={isMuted ? theme.textMuted : COLORS.gentleOlive}
                muted={isMuted}
              />
            </View>
            <View style={styles.settingTextGroup}>
              <Text style={[styles.rowTitle, { color: theme.textPrimary }]}>Sound effects</Text>
              <Text style={[styles.rowDesc, { color: theme.textMuted }]}>
                Tactile dauber pop, ball call, victory fanfare
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleToggleMute}
              style={[
                styles.togglePill,
                !isMuted && styles.togglePillActive,
                {
                  backgroundColor: !isMuted ? COLORS.cleanWhite : theme.bgRecessed,
                  borderColor: !isMuted ? COLORS.gentleOlive : theme.borderSubtle,
                },
              ]}
              accessibilityRole="button"
              accessibilityLabel="Sound effects toggle"
            >
              <Text
                style={[
                  styles.toggleText,
                  { color: !isMuted ? COLORS.lunarShadow : theme.textMuted },
                ]}
              >
                {isMuted ? 'Off' : 'On'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.settingRow, { borderBottomColor: theme.borderSubtle }]}>
            <View style={styles.iconPrefix}>
              <SpeechIcon
                size={20}
                color={voiceCaller ? COLORS.gentleOlive : theme.textMuted}
                active={voiceCaller}
              />
            </View>
            <View style={styles.settingTextGroup}>
              <Text style={[styles.rowTitle, { color: theme.textPrimary }]}>
                Voice speech caller
              </Text>
              <Text style={[styles.rowDesc, { color: theme.textMuted }]}>
                Spoken announcements ("Twenty one", "Four")
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleToggleVoice}
              style={[
                styles.togglePill,
                voiceCaller && styles.togglePillActive,
                {
                  backgroundColor: voiceCaller ? COLORS.cleanWhite : theme.bgRecessed,
                  borderColor: voiceCaller ? COLORS.gentleOlive : theme.borderSubtle,
                },
              ]}
              accessibilityRole="button"
              accessibilityLabel="Voice caller toggle"
            >
              <Text
                style={[
                  styles.toggleText,
                  { color: voiceCaller ? COLORS.lunarShadow : theme.textMuted },
                ]}
              >
                {voiceCaller ? 'On' : 'Off'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.settingRow}>
            <View style={styles.iconPrefix}>
              <VibrationIcon size={20} color={COLORS.winterHazel} />
            </View>
            <View style={styles.settingTextGroup}>
              <Text style={[styles.rowTitle, { color: theme.textPrimary }]}>Master volume</Text>
              <Text style={[styles.rowDesc, { color: theme.textMuted }]}>
                Audio output gain & haptic response
              </Text>
            </View>
            <View style={styles.volRow}>
              {(['low', 'med', 'high'] as const).map((lvl) => (
                <TouchableOpacity
                  key={lvl}
                  onPress={() => handleChangeVolume(lvl)}
                  style={[
                    styles.volBtn,
                    volumeLevel === lvl && styles.volBtnActive,
                    {
                      backgroundColor:
                        volumeLevel === lvl ? COLORS.cleanWhite : theme.bgRecessed,
                      borderColor:
                        volumeLevel === lvl ? COLORS.gentleOlive : theme.borderSubtle,
                    },
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel={`Set volume ${lvl}`}
                >
                  <Text
                    style={[
                      styles.volBtnText,
                      {
                        color:
                          volumeLevel === lvl ? COLORS.lunarShadow : theme.textMuted,
                        fontWeight: volumeLevel === lvl ? '800' : '500',
                      },
                    ]}
                  >
                    {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </GameCard>

        {/* DESIGN SYSTEM & ICON SPECIMEN QA */}
        <GameCard
          style={[
            styles.card,
            { backgroundColor: theme.bgCard, borderColor: theme.borderSubtle },
          ]}
        >
          <Text style={[styles.sectionHeader, { color: theme.textPrimary }]}>
            Design System & Icon Architecture
          </Text>
          <Text style={[styles.specimenIntro, { color: theme.textSecondary }]}>
            Original vector SVG icon family with 2.0px optical stroke, continuous Bézier
            transitions, and event-driven micro-interactions.
          </Text>

          <TouchableOpacity
            style={[
              styles.specimenButton,
              {
                backgroundColor: theme.bgRecessed,
                borderColor: COLORS.winterHazel,
              },
            ]}
            onPress={() => setShowSpecimenSheet(true)}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Open Icon Specimen Sheet & 400% Zoom QA"
          >
            <View style={styles.specimenBtnLeft}>
              <View
                style={[
                  styles.specimenIconSphere,
                  { backgroundColor: theme.accentHazelTint },
                ]}
              >
                <BingoIdentityIcon size={18} color={COLORS.winterHazel} variant="filled" />
              </View>
              <View>
                <Text style={[styles.specimenBtnTitle, { color: theme.textPrimary }]}>
                  Open Icon Specimen Sheet & QA
                </Text>
                <Text style={[styles.specimenBtnSub, { color: theme.textMuted }]}>
                  45+ icons • 4 states • 400% Zoom inspector
                </Text>
              </View>
            </View>
            <ChevronIcon direction="right" size={16} color={COLORS.winterHazel} />
          </TouchableOpacity>
        </GameCard>

        {/* SYSTEM INFORMATION */}
        <GameCard
          style={[
            styles.card,
            { backgroundColor: theme.bgCard, borderColor: theme.borderSubtle },
          ]}
        >
          <Text style={[styles.sectionHeader, { color: theme.textPrimary }]}>
            Game information
          </Text>
          <Text style={[styles.infoText, { color: theme.textSecondary }]}>
            Version: 1.0.0 (Commercial 5×5 build)
          </Text>
          <Text style={[styles.infoText, { color: theme.textSecondary }]}>
            Engine: Fixed 5×5 GridGameEngine (Numbers 1–25)
          </Text>
          <Text style={[styles.infoText, { color: theme.textSecondary }]}>
            Design: Reference-Driven System (Sora typography, Gentle Olive & Winter Hazel)
          </Text>
        </GameCard>
      </ScrollView>

      {/* Icon Specimen Modal */}
      <IconSpecimenSheet
        visible={showSpecimenSheet}
        onClose={() => setShowSpecimenSheet(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  container: {
    padding: SPACING.lg, // 16px
    paddingBottom: 110,
    gap: SPACING.md, // 12px
  },
  card: {
    padding: SPACING.lg, // 16px
    borderRadius: RADIUS.hero, // 24px
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: SPACING.xs,
    letterSpacing: -0.2,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  themeToggleRow: {
    gap: SPACING.sm,
    marginVertical: SPACING.sm,
  },
  themeModeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    padding: SPACING.md,
    borderRadius: RADIUS.surface,
    borderWidth: 1,
  },
  themeModeBtnActive: {
    borderWidth: 2,
  },
  themeModeEmoji: {
    fontSize: 22,
  },
  themeModeTitle: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  themeModeSub: {
    fontSize: 11,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  paletteHeaderRow: {
    marginTop: SPACING.sm,
    marginBottom: 4,
  },
  paletteLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  paletteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
  },
  swatchItem: {
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  swatchCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
  },
  swatchText: {
    fontSize: 9,
    fontFamily: TYPOGRAPHY.fontFamily,
    textAlign: 'center',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md, // 12px
    borderBottomWidth: 1,
  },
  settingTextGroup: {
    flex: 1,
    paddingRight: SPACING.md, // 12px
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  rowDesc: {
    fontSize: 11,
    marginTop: 2,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  togglePill: {
    paddingHorizontal: SPACING.lg, // 16px
    paddingVertical: SPACING.sm, // 8px
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    minWidth: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  togglePillActive: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  volRow: {
    flexDirection: 'row',
    gap: SPACING.xs, // 4px
  },
  volBtn: {
    paddingHorizontal: SPACING.md, // 12px
    paddingVertical: SPACING.sm, // 8px
    borderRadius: RADIUS.compact, // 8px
    borderWidth: 1,
  },
  volBtnActive: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 1,
  },
  volBtnText: {
    fontSize: 11,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  infoText: {
    fontSize: 12,
    marginBottom: SPACING.xs,
    lineHeight: 18,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  iconPrefix: {
    marginRight: SPACING.sm,
    width: 28,
    alignItems: 'center',
  },
  specimenIntro: {
    fontSize: 12,
    marginBottom: SPACING.sm,
    lineHeight: 18,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  specimenButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: RADIUS.surface,
    padding: SPACING.md,
    borderWidth: 1,
  },
  specimenBtnLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  specimenIconSphere: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  specimenBtnTitle: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  specimenBtnSub: {
    fontSize: 11,
    marginTop: 2,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});
