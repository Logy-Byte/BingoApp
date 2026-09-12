import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { RADIUS, SPACING, TYPOGRAPHY } from '../../design/tokens';

// Next Ball Overlay
interface NextBallModalProps {
  visible: boolean;
  rewardAmount: number;
  onDismiss: () => void;
}

export const NextBallModal: React.FC<NextBallModalProps> = ({
  visible,
  rewardAmount,
  onDismiss,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>NEXT BALL INDICATOR</Text>
          <Text style={styles.moneyText}>NEXT BALL MONEY {rewardAmount}$</Text>
          <Text style={styles.subtitle}>Bonus value for next daubed call!</Text>

          <TouchableOpacity style={styles.okBtn} onPress={onDismiss}>
            <Text style={styles.okBtnText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Power Up Used Overlay
interface PowerUpUsedModalProps {
  visible: boolean;
  powerUpName: string;
  onDismiss: () => void;
}

export const PowerUpUsedModal: React.FC<PowerUpUsedModalProps> = ({
  visible,
  powerUpName,
  onDismiss,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={[styles.card, styles.powerCard]}>
          <View style={styles.iconCircle}>
            <Text style={{ fontSize: 32 }}>⚡</Text>
          </View>
          <Text style={styles.powerTitle}>POWER UP USED</Text>
          <Text style={styles.powerName}>{powerUpName}</Text>

          <TouchableOpacity style={styles.okBtn} onPress={onDismiss}>
            <Text style={styles.okBtnText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Pattern Banner Overlay
interface PatternCompletedBannerProps {
  visible: boolean;
  patternName: string;
}

export const PatternCompletedBanner: React.FC<PatternCompletedBannerProps> = ({
  visible,
  patternName,
}) => {
  if (!visible) return null;

  return (
    <View style={styles.bannerContainer}>
      <View style={styles.bannerCard}>
        <Text style={styles.bannerTitle}>BINGO PATTERN COMPLETED!</Text>
        <Text style={styles.bannerSub}>{patternName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  card: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: '#1E293B',
    borderRadius: RADIUS.hero,
    padding: SPACING.xl,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3B82F6',
    elevation: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '900',
    color: '#93C5FD',
    marginBottom: SPACING.xs,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  moneyText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#F59E0B',
    marginVertical: SPACING.sm,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  subtitle: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  okBtn: {
    width: '100%',
    height: 42,
    backgroundColor: '#3B82F6',
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  okBtnText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 15,
  },
  powerCard: {
    borderColor: '#F59E0B',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
    borderWidth: 2,
    borderColor: '#F59E0B',
  },
  powerTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  powerName: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '700',
    marginBottom: SPACING.lg,
  },
  bannerContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 99,
  },
  bannerCard: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    elevation: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  bannerTitle: {
    color: '#0F172A',
    fontWeight: '900',
    fontSize: 14,
  },
  bannerSub: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12,
  },
});
