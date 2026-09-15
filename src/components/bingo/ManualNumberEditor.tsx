import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../design/tokens';
import { useTheme } from '../../design/theme';
import { CheckIcon, CloseIcon, RefreshIcon } from '../icons/CustomIcons';
import {
  validate25NumberSet,
  generate25Numbers,
} from '../../domain/services/numberSourceService';

interface ManualNumberEditorProps {
  initialNumbers?: number[];
  onConfirm: (numbers: number[]) => void;
  onCancel: () => void;
}

export const ManualNumberEditor: React.FC<ManualNumberEditorProps> = ({
  initialNumbers,
  onConfirm,
  onCancel,
}) => {
  const { theme } = useTheme();

  // 25 slots initialized either from props or empty slots (represented as empty strings or numbers)
  const [slotValues, setSlotValues] = useState<string[]>(() => {
    if (initialNumbers && initialNumbers.length === 25) {
      return initialNumbers.map((n) => String(n));
    }
    // Default 1 to 25 ordered numbers as an editable starting template
    return Array.from({ length: 25 }, (_, i) => String(i + 1));
  });

  const parsedNumbers = slotValues.map((v) => parseInt(v.trim(), 10)).filter((n) => !isNaN(n));
  const validation = validate25NumberSet(parsedNumbers);

  const handleSlotChange = (index: number, val: string) => {
    // Only accept numeric digits
    const clean = val.replace(/[^0-9]/g, '');
    const next = [...slotValues];
    next[index] = clean;
    setSlotValues(next);
  };

  const handleClear = () => {
    setSlotValues(Array.from({ length: 25 }, () => ''));
  };

  const handleAutoFill = () => {
    setSlotValues(Array.from({ length: 25 }, (_, i) => String(i + 1)));
  };

  const handleRandomize = () => {
    const randomSet = generate25Numbers();
    setSlotValues(randomSet.map((n) => String(n)));
  };

  const handleConfirm = () => {
    if (validation.valid) {
      onConfirm(parsedNumbers);
    }
  };

  // Find duplicates to highlight slots visually
  const numberCounts = new Map<number, number>();
  parsedNumbers.forEach((n) => {
    numberCounts.set(n, (numberCounts.get(n) || 0) + 1);
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.bgCanvas }]}>
      {/* Header bar */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: theme.textPrimary }]}>Choose Your 25</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Customize your unique 5×5 board sequence
          </Text>
        </View>

        <View
          style={[
            styles.countPill,
            {
              backgroundColor: validation.valid ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255, 122, 0, 0.15)',
              borderColor: validation.valid ? COLORS.success : COLORS.primaryOrange,
            },
          ]}
        >
          <Text
            style={[
              styles.countText,
              { color: validation.valid ? COLORS.success : COLORS.primaryOrange },
            ]}
          >
            {parsedNumbers.length} / 25
          </Text>
        </View>
      </View>

      {/* Quick Action Toolbar */}
      <View style={styles.toolbar}>
        <TouchableOpacity
          style={[styles.toolBtn, { backgroundColor: theme.bgCard, borderColor: theme.borderSubtle }]}
          onPress={handleRandomize}
          activeOpacity={0.8}
        >
          <RefreshIcon size={14} color={COLORS.primaryOrange} />
          <Text style={[styles.toolBtnText, { color: theme.textPrimary }]}>Randomize</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toolBtn, { backgroundColor: theme.bgCard, borderColor: theme.borderSubtle }]}
          onPress={handleAutoFill}
          activeOpacity={0.8}
        >
          <Text style={[styles.toolBtnText, { color: theme.textPrimary }]}>1 to 25</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toolBtn, { backgroundColor: theme.bgCard, borderColor: theme.borderSubtle }]}
          onPress={handleClear}
          activeOpacity={0.8}
        >
          <CloseIcon size={14} color={theme.textMuted} />
          <Text style={[styles.toolBtnText, { color: theme.textMuted }]}>Clear</Text>
        </TouchableOpacity>
      </View>

      {/* 5x5 Grid Input */}
      <ScrollView contentContainerStyle={styles.gridContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {slotValues.map((val, idx) => {
            const num = parseInt(val, 10);
            const isDuplicate = !isNaN(num) && (numberCounts.get(num) || 0) > 1;
            const isOutOfRange = !isNaN(num) && (num < 1 || num > 25);
            const hasError = isDuplicate || isOutOfRange;

            return (
              <View key={idx} style={styles.cellWrapper}>
                <TextInput
                  style={[
                    styles.cellInput,
                    {
                      backgroundColor: theme.bgCard,
                      borderColor: hasError
                        ? COLORS.error
                        : val.length > 0
                        ? COLORS.primaryOrange
                        : theme.borderSubtle,
                      color: hasError ? COLORS.error : theme.textPrimary,
                    },
                    hasError && styles.errorInput,
                  ]}
                  value={val}
                  onChangeText={(text) => handleSlotChange(idx, text)}
                  keyboardType="number-pad"
                  maxLength={2}
                  placeholder={`#${idx + 1}`}
                  placeholderTextColor={theme.textMuted}
                  textAlign="center"
                  selectTextOnFocus
                />
              </View>
            );
          })}
        </View>

        {/* Validation Errors Box */}
        {!validation.valid && validation.errors.length > 0 && (
          <View style={[styles.errorBox, { backgroundColor: 'rgba(239, 68, 68, 0.08)' }]}>
            <Text style={styles.errorHeader}>Configuration Notice:</Text>
            {validation.errors.map((err, i) => (
              <Text key={i} style={styles.errorText}>
                • {err}
              </Text>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Bottom Action Footer */}
      <View style={[styles.footer, { backgroundColor: theme.bgCard, borderColor: theme.borderSubtle }]}>
        <TouchableOpacity
          style={[styles.cancelBtn, { borderColor: theme.borderSubtle }]}
          onPress={onCancel}
          activeOpacity={0.8}
        >
          <Text style={[styles.cancelBtnText, { color: theme.textSecondary }]}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.confirmBtn,
            {
              backgroundColor: validation.valid ? COLORS.primaryOrange : '#D1D5DB',
              opacity: validation.valid ? 1 : 0.6,
            },
          ]}
          disabled={!validation.valid}
          onPress={handleConfirm}
          activeOpacity={0.88}
        >
          <CheckIcon size={16} color="#FFFFFF" />
          <Text style={styles.confirmBtnText}>Confirm Numbers</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.md,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    gap: SPACING.xs,
  },
  title: {
    fontFamily: TYPOGRAPHY.brandFamily,
    fontSize: 18,
    fontWeight: '800',
  },
  subtitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 11,
    marginTop: 2,
  },
  countPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  countText: {
    fontSize: 11,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.monoFamily,
  },
  toolbar: {
    flexDirection: 'row',
    gap: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  toolBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: RADIUS.control,
    borderWidth: 1,
  },
  toolBtnText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  gridContainer: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 8,
    columnGap: 6,
    width: '100%',
    maxWidth: 380,
  },
  cellWrapper: {
    width: '18%',
    aspectRatio: 1,
    maxWidth: 58,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellInput: {
    width: '100%',
    height: '100%',
    borderRadius: RADIUS.control,
    borderWidth: 1.5,
    fontSize: 18,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.monoFamily,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
    padding: 0,
    margin: 0,
  },
  errorInput: {
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
  },
  errorBox: {
    marginTop: SPACING.md,
    padding: SPACING.md,
    borderRadius: RADIUS.control,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  errorHeader: {
    color: COLORS.error,
    fontWeight: '800',
    fontSize: 12,
    marginBottom: 4,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    lineHeight: 16,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: SPACING.sm,
    gap: SPACING.md,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
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
  confirmBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});
