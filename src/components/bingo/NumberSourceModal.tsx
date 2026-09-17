import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../design/tokens';
import { useTheme } from '../../design/theme';
import { RobotIcon, EditPencilIcon, CloseIcon, CheckIcon, RefreshIcon } from '../icons/CustomIcons';
import { ManualNumberEditor } from './ManualNumberEditor';
import { generate25Numbers } from '../../domain/services/numberSourceService';

interface NumberSourceModalProps {
  visible: boolean;
  gameModeTitle: string;
  onConfirmNumbers: (numbers: number[], source: 'manual' | 'ai') => void;
  onClose: () => void;
}

export const NumberSourceModal: React.FC<NumberSourceModalProps> = ({
  visible,
  gameModeTitle,
  onConfirmNumbers,
  onClose,
}) => {
  const { theme } = useTheme();
  const [viewState, setViewState] = useState<'SELECT' | 'MANUAL_EDIT' | 'AI_PREVIEW'>('SELECT');
  const [aiNumbers, setAiNumbers] = useState<number[]>(() => generate25Numbers());

  const handleRegenerateAi = () => {
    setAiNumbers(generate25Numbers());
  };

  const handleUseAiNumbers = () => {
    onConfirmNumbers(aiNumbers, 'ai');
    setViewState('SELECT');
  };

  const handleManualConfirm = (numbers: number[]) => {
    onConfirmNumbers(numbers, 'manual');
    setViewState('SELECT');
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View
          style={[
            styles.modalCard,
            {
              backgroundColor: theme.bgCard,
              borderColor: 'rgba(255, 122, 0, 0.2)',
            },
          ]}
        >
          {viewState === 'SELECT' && (
            <View>
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <View style={styles.headerTextContainer}>
                  <Text style={[styles.heading, { color: theme.textPrimary }]}>Number Source</Text>
                  <Text style={[styles.subheading, { color: theme.textSecondary }]}>
                    {gameModeTitle} • Choose how your 25 numbers are generated
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={onClose}
                  style={[styles.closeBtn, { backgroundColor: theme.bgRecessed }]}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  accessibilityRole="button"
                >
                  <CloseIcon size={16} color={theme.textPrimary} />
                </TouchableOpacity>
              </View>

              {/* Selection Options */}
              <View style={styles.optionList}>
                {/* 1. Choose My Numbers */}
                <TouchableOpacity
                  style={[
                    styles.optionCard,
                    { backgroundColor: theme.bgRecessed, borderColor: theme.borderSubtle },
                  ]}
                  onPress={() => setViewState('MANUAL_EDIT')}
                  activeOpacity={0.8}
                >
                  <View style={[styles.iconBox, { backgroundColor: 'rgba(255, 122, 0, 0.12)' }]}>
                    <EditPencilIcon size={24} color={COLORS.primaryOrange} />
                  </View>
                  <View style={styles.optionContent}>
                    <Text style={[styles.optionTitle, { color: theme.textPrimary }]}>
                      Choose My Numbers
                    </Text>
                    <Text style={[styles.optionDesc, { color: theme.textSecondary }]}>
                      Pick or customize your own 25 numbers before entering the match.
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* 2. Let AI Choose */}
                <TouchableOpacity
                  style={[
                    styles.optionCard,
                    styles.optionCardPrimary,
                    {
                      backgroundColor: theme.isDark ? 'rgba(255, 122, 0, 0.14)' : '#FFF7EF',
                      borderColor: COLORS.primaryOrange,
                    },
                  ]}
                  onPress={() => {
                    handleRegenerateAi();
                    setViewState('AI_PREVIEW');
                  }}
                  activeOpacity={0.8}
                >
                  <View style={[styles.iconBox, { backgroundColor: COLORS.primaryOrange }]}>
                    <RobotIcon size={24} color="#FFFFFF" />
                  </View>
                  <View style={styles.optionContent}>
                    <View style={styles.badgeRow}>
                      <Text style={[styles.optionTitle, { color: theme.textPrimary }]}>
                        Let AI Choose
                      </Text>
                      <View style={[styles.instantBadge, { backgroundColor: COLORS.primaryOrange }]}>
                        <Text style={styles.instantBadgeText}>INSTANT</Text>
                      </View>
                    </View>
                    <Text style={[styles.optionDesc, { color: theme.textSecondary }]}>
                      AI automatically generates a balanced, unbiased set of 25 numbers.
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {viewState === 'AI_PREVIEW' && (
            <View>
              <View style={styles.modalHeader}>
                <View style={styles.headerTextContainer}>
                  <Text style={[styles.heading, { color: theme.textPrimary }]}>AI Generated Numbers</Text>
                  <Text style={[styles.subheading, { color: theme.textSecondary }]}>
                    25 unique numbers generated for this match
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => setViewState('SELECT')}
                  style={[styles.closeBtn, { backgroundColor: theme.bgRecessed }]}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  accessibilityRole="button"
                >
                  <CloseIcon size={16} color={theme.textPrimary} />
                </TouchableOpacity>
              </View>

              {/* Number Preview Chips */}
              <View style={styles.chipsContainer}>
                {aiNumbers.map((n, i) => (
                  <View
                    key={i}
                    style={[
                      styles.chip,
                      { backgroundColor: theme.bgRecessed, borderColor: theme.borderSubtle },
                    ]}
                  >
                    <Text style={[styles.chipText, { color: theme.textPrimary }]}>
                      {n < 10 ? `0${n}` : n}
                    </Text>
                  </View>
                ))}
              </View>

              {/* AI Actions */}
              <View style={styles.previewActions}>
                <TouchableOpacity
                  style={[styles.regenBtn, { backgroundColor: theme.bgRecessed, borderColor: theme.borderSubtle }]}
                  onPress={handleRegenerateAi}
                  activeOpacity={0.8}
                >
                  <RefreshIcon size={16} color={theme.textPrimary} />
                  <Text style={[styles.regenBtnText, { color: theme.textPrimary }]}>Regenerate</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.useBtn, { backgroundColor: COLORS.primaryOrange }]}
                  onPress={handleUseAiNumbers}
                  activeOpacity={0.88}
                >
                  <CheckIcon size={16} color="#FFFFFF" />
                  <Text style={styles.useBtnText}>Use These Numbers</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {viewState === 'MANUAL_EDIT' && (
            <View style={{ maxHeight: '85vh', minHeight: 460 }}>
              <ManualNumberEditor
                onConfirm={handleManualConfirm}
                onCancel={() => setViewState('SELECT')}
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.md,
  },
  modalCard: {
    width: '100%',
    maxWidth: 400,
    borderRadius: RADIUS.hero,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.md + 4,
    borderWidth: 1.5,
    shadowColor: COLORS.primaryOrange,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  headerTextContainer: {
    flex: 1,
    paddingRight: SPACING.xs,
  },
  heading: {
    fontFamily: TYPOGRAPHY.brandFamily,
    fontSize: 19,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  subheading: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    marginTop: 3,
    lineHeight: 16,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionList: {
    gap: SPACING.sm,
    marginTop: SPACING.xs,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: RADIUS.surface,
    borderWidth: 1.5,
    gap: SPACING.md,
  },
  optionCardPrimary: {
    borderWidth: 2,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.control,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionContent: {
    flex: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  instantBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: RADIUS.pill,
  },
  instantBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
  },
  optionDesc: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    justifyContent: 'center',
    marginVertical: SPACING.md,
  },
  chip: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.control,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.monoFamily,
  },
  previewActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.sm,
  },
  regenBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: RADIUS.control,
    borderWidth: 1,
  },
  regenBtnText: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  useBtn: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: RADIUS.control,
    shadowColor: COLORS.primaryOrange,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  useBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});
