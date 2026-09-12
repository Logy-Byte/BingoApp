import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../design/tokens';
import { useTheme } from '../../design/theme';
import { CloseIcon } from '../icons/CustomIcons';

interface DailyBonusModalProps {
  visible: boolean;
  onClaim: () => void;
  onClose: () => void;
}

export const DailyBonusModal: React.FC<DailyBonusModalProps> = ({
  visible,
  onClaim,
  onClose,
}) => {
  const { theme } = useTheme();

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.backdrop}>
        <View style={[styles.modalCard, { backgroundColor: theme.bgCard, borderColor: theme.borderSubtle }]}>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <CloseIcon size={18} color={theme.textMuted} />
          </TouchableOpacity>

          <Text style={[styles.title, { color: theme.textPrimary }]}>Daily Bonus Pop-Up</Text>

          {/* Treasure chest artwork representation */}
          <View style={styles.artBox}>
            <Text style={styles.chestEmoji}>💰🎁🪙</Text>
          </View>

          <Text style={[styles.rewardText, { color: theme.textSecondary }]}>
            You got <Text style={styles.highlight}>500 coins</Text> & <Text style={styles.highlightGems}>10 gems!</Text>
          </Text>

          <TouchableOpacity
            style={[styles.claimBtn, { backgroundColor: '#F59E0B' }]}
            onPress={onClaim}
            activeOpacity={0.85}
          >
            <Text style={styles.claimBtnText}>Claim Bonus</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  modalCard: {
    width: '100%',
    maxWidth: 320,
    borderRadius: RADIUS.hero,
    padding: SPACING.xl,
    alignItems: 'center',
    borderWidth: 1.5,
    elevation: 8,
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: SPACING.md,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  artBox: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
    borderWidth: 2,
    borderColor: '#F59E0B',
  },
  chestEmoji: {
    fontSize: 38,
  },
  rewardText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  highlight: {
    fontWeight: '900',
    color: '#D97706',
  },
  highlightGems: {
    fontWeight: '900',
    color: '#2563EB',
  },
  claimBtn: {
    width: '100%',
    height: 48,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  claimBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});
