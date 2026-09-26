import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../design/tokens';
import { useTheme } from '../../design/theme';
import { WarningIcon, CheckIcon } from '../icons/CustomIcons';

interface AgeGateModalProps {
  visible: boolean;
  onConfirmAdult: () => void;
  onCancel: () => void;
}

/**
 * AgeGateModal
 * Adult 18+ Access Control Gate required by Apple & Google Play UGC Policies.
 * Ensures users explicitly confirm adult eligibility before creating user-generated content.
 */
export const AgeGateModal: React.FC<AgeGateModalProps> = ({
  visible,
  onConfirmAdult,
  onCancel,
}) => {
  const { theme } = useTheme();
  const [isChecked, setIsChecked] = useState(false);

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.modalCard,
                {
                  backgroundColor: theme.bgCard,
                  borderColor: COLORS.winterHazel,
                },
              ]}
            >
              {/* Header Icon & Title */}
              <View style={styles.headerRow}>
                <View
                  style={[
                    styles.iconCircle,
                    { backgroundColor: 'rgba(255, 122, 0, 0.15)' },
                  ]}
                >
                  <WarningIcon size={24} color={COLORS.primaryOrange} />
                </View>
                <View style={styles.titleWrap}>
                  <Text style={[styles.title, { color: theme.textPrimary }]}>
                    18+ Adult Access Gate
                  </Text>
                  <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                    User-Generated Content Policy
                  </Text>
                </View>
              </View>

              {/* Description Body */}
              <Text style={[styles.bodyText, { color: theme.textSecondary }]}>
                Bingo App features public multiplayer rooms and player community interactions. In accordance with app store content safety policies, you must confirm that you are at least 18 years of age or older to create or share user content.
              </Text>

              {/* Checkbox Confirmation */}
              <TouchableOpacity
                style={[
                  styles.checkboxRow,
                  {
                    backgroundColor: theme.bgRecessed,
                    borderColor: isChecked ? COLORS.gentleOlive : theme.borderSubtle,
                  },
                ]}
                onPress={() => setIsChecked(!isChecked)}
                activeOpacity={0.8}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: isChecked }}
                accessibilityLabel="I confirm I am 18 years of age or older"
              >
                <View
                  style={[
                    styles.checkboxBox,
                    isChecked && { backgroundColor: COLORS.gentleOlive, borderColor: COLORS.gentleOlive },
                  ]}
                >
                  {isChecked && <CheckIcon size={12} color={COLORS.lunarShadow} />}
                </View>
                <Text style={[styles.checkboxLabel, { color: theme.textPrimary }]}>
                  I confirm I am 18 years of age or older.
                </Text>
              </TouchableOpacity>

              {/* Action Buttons */}
              <View style={styles.btnRow}>
                <TouchableOpacity
                  style={[styles.cancelBtn, { borderColor: theme.borderSubtle }]}
                  onPress={onCancel}
                  activeOpacity={0.8}
                  accessibilityRole="button"
                  accessibilityLabel="Cancel"
                >
                  <Text style={[styles.cancelBtnText, { color: theme.textPrimary }]}>
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.confirmBtn,
                    {
                      backgroundColor: isChecked ? COLORS.gentleOlive : theme.bgRecessed,
                      borderColor: isChecked ? '#B8C665' : theme.borderSubtle,
                      opacity: isChecked ? 1 : 0.5,
                    },
                  ]}
                  disabled={!isChecked}
                  onPress={onConfirmAdult}
                  activeOpacity={0.85}
                  accessibilityRole="button"
                  accessibilityLabel="Verify Age and Continue"
                >
                  <Text
                    style={[
                      styles.confirmBtnText,
                      { color: isChecked ? COLORS.lunarShadow : theme.textMuted },
                    ]}
                  >
                    Confirm (18+)
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
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
    maxWidth: 420,
    borderRadius: RADIUS.surface,
    borderWidth: 1.5,
    padding: SPACING.lg,
    elevation: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrap: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  bodyText: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: TYPOGRAPHY.fontFamily,
    marginBottom: SPACING.md,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#94A3B8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxLabel: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  btnRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  cancelBtn: {
    flex: 1,
    height: 48,
    borderRadius: RADIUS.control,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  confirmBtn: {
    flex: 1.2,
    height: 48,
    borderRadius: RADIUS.control,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmBtnText: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});
