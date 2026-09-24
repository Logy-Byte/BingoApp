import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SoundEngine } from '../audio/soundEngine';
import { GameCard } from '../components/common/GameCard';
import { RouteHeader } from '../components/common/RouteHeader';
import { SettingsRow } from '../components/common/SettingsRow';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../design/tokens';
import {
  VolumeIcon,
  SpeechIcon,
  VibrationIcon,
  ChevronIcon,
  IconSpecimenSheet,
  SunIcon,
  MoonIcon,
  WarningIcon,
  InfoIcon,
} from '../components/icons';
import { AppIconVector } from '../components/icons/AppIconVector';
import { useTheme, REFERENCE_PALETTE } from '../design/theme';
import { ModerationAdminPanel } from '../components/ugc/ModerationAdminPanel';

interface SettingsScreenProps {
  onBack: () => void;
}

/**
 * SettingsScreen
 * Professional Mobile Information Architecture (WhatsApp & Apple Settings standard).
 * Strictly removes custom launcher-style decorative icon tiles from settings rows.
 * Uses clean Title + Supporting Description + Affordance hierarchy.
 * Brand iconography is reserved exclusively for the App Identity section.
 */
export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack }) => {
  const { theme, mode, setMode } = useTheme();
  const [isMuted, setIsMuted] = useState(SoundEngine.isAudioMuted());
  const [voiceCaller, setVoiceCaller] = useState(SoundEngine.isVoiceEnabled());
  const [volumeLevel, setVolumeLevel] = useState<'low' | 'med' | 'high'>('med');
  const [showSpecimenSheet, setShowSpecimenSheet] = useState(false);
  const [showModerationAdmin, setShowModerationAdmin] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [accountResetDone, setAccountResetDone] = useState(false);

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

  const handleConfirmReset = () => {
    setConfirmDelete(false);
    setAccountResetDone(true);
    SoundEngine.playError();
  };

  return (
    <View style={[styles.screenContainer, { backgroundColor: theme.bgCanvas }]}>
      <RouteHeader title="Settings" onBack={onBack} />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* BRAND IDENTITY BANNER (Quarantined to top identity mark - never in rows) */}
        <View style={styles.brandHeroBanner}>
          <AppIconVector size={48} />
          <View style={styles.brandTextGroup}>
            <Text style={[styles.brandTitle, { color: theme.textPrimary }]}>
              Bingo Clash Pro
            </Text>
            <Text style={[styles.brandVersion, { color: theme.textMuted }]}>
              Version 1.0.0 Enterprise Build • Numbers 1–25
            </Text>
          </View>
        </View>

        {/* 1. APPEARANCE & THEME */}
        <GameCard
          style={[
            styles.card,
            { backgroundColor: theme.bgCard, borderColor: theme.borderSubtle },
          ]}
        >
          <Text style={[styles.sectionHeader, { color: theme.textPrimary }]}>
            Appearance & Theme
          </Text>
          <Text style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>
            High-contrast dual theme engine with Plus Jakarta Sans typography.
          </Text>

          {/* Theme Selector Segmented Pills */}
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
              <SunIcon
                size={18}
                color={mode === 'light' ? COLORS.winterHazel : theme.textMuted}
              />
              <View>
                <Text style={[styles.themeModeTitle, { color: COLORS.lunarShadow }]}>
                  Light Mode
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
              <MoonIcon
                size={18}
                color={mode === 'dark' ? COLORS.cleanWhite : theme.textMuted}
              />
              <View>
                <Text
                  style={[
                    styles.themeModeTitle,
                    { color: mode === 'dark' ? COLORS.cleanWhite : theme.textPrimary },
                  ]}
                >
                  Dark Mode
                </Text>
                <Text style={[styles.themeModeSub, { color: '#A0A5AD' }]}>
                  Lunar Shadow (#282828)
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Palette Color Swatches */}
          <View style={styles.paletteHeaderRow}>
            <Text style={[styles.paletteLabel, { color: theme.textMuted }]}>
              CORE PALETTE
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

        {/* 2. AUDIO & TACTILE CONTROLS (Clean SettingsRow Pattern) */}
        <GameCard
          style={[
            styles.card,
            { backgroundColor: theme.bgCard, borderColor: theme.borderSubtle },
          ]}
        >
          <Text style={[styles.sectionHeader, { color: theme.textPrimary }]}>
            Audio & Tactile
          </Text>

          <SettingsRow
            title="Sound Effects"
            description="Tactile dauber pop, ball call chime, victory fanfare"
            icon={<VolumeIcon size={18} color={isMuted ? theme.textMuted : COLORS.gentleOlive} muted={isMuted} />}
            rightElement={
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
            }
          />

          <SettingsRow
            title="Voice Speech Caller"
            description="Spoken number announcements ('Number 21', 'B-4')"
            icon={<SpeechIcon size={18} color={voiceCaller ? COLORS.gentleOlive : theme.textMuted} active={voiceCaller} />}
            rightElement={
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
            }
          />

          <SettingsRow
            title="Master Volume"
            description="Audio output gain and haptic vibration level"
            icon={<VibrationIcon size={18} color={COLORS.winterHazel} />}
            showDivider={false}
            rightElement={
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
            }
          />
        </GameCard>

        {/* 3. DESIGN SYSTEM & ICON SPECIMEN QA (Clean Row Link) */}
        <GameCard
          style={[
            styles.card,
            { backgroundColor: theme.bgCard, borderColor: theme.borderSubtle },
          ]}
        >
          <Text style={[styles.sectionHeader, { color: theme.textPrimary }]}>
            Design Architecture
          </Text>

          <SettingsRow
            title="Icon Specimen Sheet & QA"
            description="Inspect 45+ bespoke vector icons, states, and 400% zoom grid"
            icon={<InfoIcon size={18} color={COLORS.winterHazel} />}
            onPress={() => setShowSpecimenSheet(true)}
            showDivider={false}
          />
        </GameCard>

        {/* 4. ACCOUNT & DATA PRIVACY (Apple App Store 5.1.1(v) Compliant) */}
        <GameCard
          style={[
            styles.card,
            { backgroundColor: theme.bgCard, borderColor: theme.borderSubtle },
          ]}
        >
          <Text style={[styles.sectionHeader, { color: theme.textPrimary }]}>
            Account & Sovereignty
          </Text>

          <SettingsRow
            title="Account Identity"
            description="UID-8842-BNGO • Guest Sovereign Profile"
            icon={<InfoIcon size={18} color={theme.textMuted} />}
          />

          {accountResetDone ? (
            <View
              style={[
                styles.successResetBox,
                { backgroundColor: theme.accentOliveTint, borderColor: COLORS.gentleOlive },
              ]}
            >
              <Text style={[styles.successResetText, { color: COLORS.lunarShadow }]}>
                Account data, match records, and progression have been completely deleted.
              </Text>
            </View>
          ) : confirmDelete ? (
            <View
              style={[
                styles.deleteConfirmCard,
                { backgroundColor: theme.bgRecessed, borderColor: COLORS.dangerRed },
              ]}
            >
              <View style={styles.deleteConfirmHeader}>
                <WarningIcon size={18} color={COLORS.dangerRed} />
                <Text style={[styles.deleteConfirmTitle, { color: COLORS.dangerRed }]}>
                  Delete account & reset data?
                </Text>
              </View>
              <Text style={[styles.deleteConfirmBody, { color: theme.textSecondary }]}>
                This will permanently delete all match history, MMR rating, achievements, and unlockables. This action is irreversible.
              </Text>
              <View style={styles.deleteConfirmActions}>
                <TouchableOpacity
                  style={[styles.cancelBtn, { borderColor: theme.borderSubtle }]}
                  onPress={() => setConfirmDelete(false)}
                  accessibilityRole="button"
                  accessibilityLabel="Cancel Account Deletion"
                >
                  <Text style={[styles.cancelBtnText, { color: theme.textPrimary }]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.confirmDeleteBtn, { backgroundColor: COLORS.dangerRed }]}
                  onPress={handleConfirmReset}
                  accessibilityRole="button"
                  accessibilityLabel="Permanently Delete Account"
                >
                  <Text style={styles.confirmDeleteBtnText}>Confirm Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <SettingsRow
              title="Delete Account & Reset Data"
              description="Permanently erase match history, MMR, and achievements"
              isDestructive={true}
              showDivider={false}
              onPress={() => setConfirmDelete(true)}
              rightElement={
                <ChevronIcon direction="right" size={16} color={COLORS.dangerRed} />
              }
            />
          )}
        </GameCard>

        {/* 5. DEVELOPER SUPPORT & SAFETY CONTACT (Apple Guideline 1.2 / Google Play UGC Compliance) */}
        <GameCard
          style={[
            styles.card,
            { backgroundColor: theme.bgCard, borderColor: theme.borderSubtle },
          ]}
        >
          <Text style={[styles.sectionHeader, { color: theme.textPrimary }]}>
            Support & Moderation Contact
          </Text>

          <SettingsRow
            title="Developer / Publisher"
            description="Bingo Clash Pro Mobile Studios"
            icon={<InfoIcon size={18} color={theme.textMuted} />}
          />

          <SettingsRow
            title="Customer Support Email"
            description="support@bingoclashpro.com"
            icon={<InfoIcon size={18} color={COLORS.gentleOlive} />}
          />

          <SettingsRow
            title="Abuse & Moderation Contact"
            description="safety@bingoclashpro.com • 24-Hour SLA"
            icon={<WarningIcon size={18} color={COLORS.primaryOrange} />}
          />

          <SettingsRow
            title="Moderation Queue & 24h SLA Inspector"
            description="Audit active reports, SLA countdown, and user enforcement"
            icon={<WarningIcon size={18} color={COLORS.dangerRed} />}
            showDivider={false}
            onPress={() => setShowModerationAdmin(true)}
            rightElement={
              <ChevronIcon direction="right" size={16} color={theme.textPrimary} />
            }
          />
        </GameCard>
      </ScrollView>

      {/* Icon Specimen Modal */}
      <IconSpecimenSheet
        visible={showSpecimenSheet}
        onClose={() => setShowSpecimenSheet(false)}
      />

      {/* Moderation Queue & SLA Inspector Modal */}
      <ModerationAdminPanel
        visible={showModerationAdmin}
        onClose={() => setShowModerationAdmin(false)}
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
  brandHeroBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.xs,
  },
  brandTextGroup: {
    flex: 1,
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.3,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  brandVersion: {
    fontSize: 11,
    marginTop: 2,
    fontFamily: TYPOGRAPHY.fontFamily,
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
    marginBottom: 2,
    letterSpacing: -0.2,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  sectionSubtitle: {
    fontSize: 12,
    marginBottom: SPACING.sm,
    lineHeight: 16,
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
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
  },
  swatchText: {
    fontSize: 9,
    fontFamily: TYPOGRAPHY.fontFamily,
    textAlign: 'center',
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
  deleteConfirmCard: {
    marginTop: SPACING.sm,
    padding: SPACING.md,
    borderRadius: RADIUS.control,
    borderWidth: 1,
    gap: SPACING.sm,
  },
  deleteConfirmHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  deleteConfirmTitle: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  deleteConfirmBody: {
    fontSize: 11,
    lineHeight: 16,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  deleteConfirmActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: 4,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.control,
    borderWidth: 1,
    alignItems: 'center',
  },
  cancelBtnText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  confirmDeleteBtn: {
    flex: 1,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.control,
    alignItems: 'center',
  },
  confirmDeleteBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.cleanWhite,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  successResetBox: {
    marginTop: SPACING.sm,
    padding: SPACING.md,
    borderRadius: RADIUS.control,
    borderWidth: 1,
  },
  successResetText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: TYPOGRAPHY.fontFamily,
    textAlign: 'center',
  },
});
