import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../design/tokens';
import { useTheme } from '../../design/theme';
import { ReportCategory } from '../../domain/types';
import { globalModerationService } from '../../domain/services/moderationService';
import { WarningIcon, CheckIcon, CloseIcon } from '../icons/CustomIcons';

interface ReportModalProps {
  visible: boolean;
  postId: string;
  reportedUserId: string;
  reporterId: string;
  contentSnapshot?: string;
  onClose: () => void;
  onReportSubmitted: (message: string) => void;
}

const CATEGORIES: Array<{ key: ReportCategory; label: string }> = [
  { key: 'HARASSMENT', label: 'Harassment or Bullying' },
  { key: 'THREAT', label: 'Threat or Violence' },
  { key: 'HATE_SPEECH', label: 'Hate Speech or Discrimination' },
  { key: 'SEXUAL_CONTENT', label: 'Explicit Sexual Content' },
  { key: 'MINOR_SAFETY', label: 'Sexual Exploitation / Minor Safety' },
  { key: 'SELF_HARM', label: 'Self-Harm Encouragement' },
  { key: 'SPAM', label: 'Spam, Scam, or Malicious Links' },
  { key: 'DOXXING', label: 'Personal Information / Doxxing' },
  { key: 'ILLEGAL', label: 'Illegal Activity' },
  { key: 'OTHER', label: 'Other Policy Violation' },
];

export const ReportModal: React.FC<ReportModalProps> = ({
  visible,
  postId,
  reportedUserId,
  reporterId,
  contentSnapshot,
  onClose,
  onReportSubmitted,
}) => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<ReportCategory>('HARASSMENT');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!visible) return null;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await globalModerationService.submitReport({
        postId,
        reportedUserId,
        reporterId,
        category: selectedCategory,
        description: description.trim(),
        contentSnapshot,
      });

      onReportSubmitted(res.message);
      onClose();
    } catch {
      onReportSubmitted('Failed to submit report. Please try again.');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.modalCard,
                {
                  backgroundColor: theme.bgCard,
                  borderColor: theme.borderSubtle,
                },
              ]}
            >
              {/* Header */}
              <View style={styles.headerRow}>
                <View
                  style={[
                    styles.iconCircle,
                    { backgroundColor: 'rgba(239, 68, 68, 0.15)' },
                  ]}
                >
                  <WarningIcon size={20} color={COLORS.dangerRed} />
                </View>
                <View style={styles.titleWrap}>
                  <Text style={[styles.title, { color: theme.textPrimary }]}>
                    Report Content
                  </Text>
                  <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                    Help us maintain a safe community
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={onClose}
                  style={styles.closeBtn}
                  accessibilityRole="button"
                  accessibilityLabel="Close report modal"
                >
                  <CloseIcon size={18} color={theme.textPrimary} />
                </TouchableOpacity>
              </View>

              {/* Category Picker */}
              <Text style={[styles.sectionLabel, { color: theme.textMuted }]}>
                SELECT A REASON
              </Text>

              <ScrollView style={styles.categoryList} showsVerticalScrollIndicator>
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.key;
                  return (
                    <TouchableOpacity
                      key={cat.key}
                      style={[
                        styles.catOption,
                        {
                          backgroundColor: isSelected ? 'rgba(255, 122, 0, 0.12)' : theme.bgRecessed,
                          borderColor: isSelected ? COLORS.primaryOrange : theme.borderSubtle,
                        },
                      ]}
                      onPress={() => setSelectedCategory(cat.key)}
                      activeOpacity={0.8}
                      accessibilityRole="radio"
                      accessibilityState={{ checked: isSelected }}
                      accessibilityLabel={cat.label}
                    >
                      <Text
                        style={[
                          styles.catOptionText,
                          {
                            color: isSelected ? COLORS.primaryOrange : theme.textPrimary,
                            fontWeight: isSelected ? '800' : '600',
                          },
                        ]}
                      >
                        {cat.label}
                      </Text>
                      {isSelected && <CheckIcon size={14} color={COLORS.primaryOrange} />}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {/* Optional Description */}
              <Text style={[styles.sectionLabel, { color: theme.textMuted }]}>
                ADDITIONAL DETAILS (OPTIONAL)
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.bgRecessed,
                    borderColor: theme.borderSubtle,
                    color: theme.textPrimary,
                  },
                ]}
                placeholder="Describe why this content violates community guidelines..."
                placeholderTextColor={theme.textMuted}
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={3}
                maxLength={300}
              />

              {/* Submit Button */}
              <TouchableOpacity
                style={[
                  styles.submitBtn,
                  {
                    backgroundColor: COLORS.dangerRed,
                    opacity: isSubmitting ? 0.7 : 1,
                  },
                ]}
                disabled={isSubmitting}
                onPress={handleSubmit}
                activeOpacity={0.85}
                accessibilityRole="button"
                accessibilityLabel="Submit Report"
              >
                {isSubmitting ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={styles.submitBtnText}>Submit Report</Text>
                )}
              </TouchableOpacity>
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
    maxHeight: '88%',
    borderRadius: RADIUS.surface,
    borderWidth: 1.5,
    padding: SPACING.lg,
    elevation: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrap: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  subtitle: {
    fontSize: 11,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  closeBtn: {
    padding: 6,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    fontFamily: TYPOGRAPHY.fontFamily,
    marginBottom: 6,
    marginTop: SPACING.xs,
  },
  categoryList: {
    maxHeight: 180,
    marginBottom: SPACING.md,
  },
  catOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: 10,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    marginBottom: 6,
  },
  catOptionText: {
    fontSize: 13,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  input: {
    borderRadius: RADIUS.card,
    borderWidth: 1,
    padding: SPACING.sm,
    fontSize: 13,
    fontFamily: TYPOGRAPHY.fontFamily,
    minHeight: 64,
    textAlignVertical: 'top',
    marginBottom: SPACING.lg,
  },
  submitBtn: {
    height: 48,
    borderRadius: RADIUS.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});
