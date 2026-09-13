/**
 * DailyBonusModal
 * Apple HIG-Grade Daily Bonus Modal Sheet
 * Concentric geometry, specular highlights, zero raw emojis (100% SVG vector).
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  COLORS,
  RADIUS,
  SPACING,
  TYPOGRAPHY,
  calcConcentricRadius,
  TOUCH_TARGET,
  SPRING_CONFIGS,
} from '../../design/tokens';
import { useTheme } from '../../design/theme';
import {
  CloseIcon,
  IconCoinStack,
  IconGemstone,
  IconSparkles,
} from '../icons/CustomIcons';

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
  const [isBtnPressed, setIsBtnPressed] = useState(false);

  const cardRadius = RADIUS.hero; // 24px
  const outerArtRadius = 48;
  const innerArtRadius = calcConcentricRadius(outerArtRadius, 8, 20);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.modalCard,
                {
                  backgroundColor: theme.bgCard,
                  borderColor: COLORS.winterHazel,
                  borderRadius: cardRadius,
                },
              ]}
              accessibilityRole="dialog"
              accessibilityLabel="Daily Login Bonus Reward"
            >
              {/* Top Specular Edge Highlight */}
              <View style={styles.modalBevel} />

              <TouchableOpacity
                onPress={onClose}
                style={styles.closeBtn}
                hitSlop={TOUCH_TARGET.hitSlop}
                accessibilityRole="button"
                accessibilityLabel="Close daily bonus dialog"
              >
                <CloseIcon size={18} color={theme.textMuted} />
              </TouchableOpacity>

              <Text style={[styles.kickerText, { color: COLORS.winterHazel }]}>
                DAILY LOGIN REWARD
              </Text>
              <Text style={[styles.title, { color: theme.textPrimary }]}>
                Daily Bonus Stash
              </Text>

              {/* Concentric Vector Currency Showcase (Zero Emojis) */}
              <View
                style={[
                  styles.artBoxOuter,
                  {
                    width: outerArtRadius * 2,
                    height: outerArtRadius * 2,
                    borderRadius: outerArtRadius,
                    backgroundColor: theme.bgRecessed,
                    borderColor: theme.borderSubtle,
                  },
                ]}
              >
                <View
                  style={[
                    styles.artBoxInner,
                    {
                      borderRadius: innerArtRadius,
                      backgroundColor: 'rgba(245, 158, 11, 0.15)',
                      borderColor: COLORS.goldPrimary,
                    },
                  ]}
                >
                  <View style={styles.iconCluster}>
                    <IconCoinStack size={32} color={COLORS.goldPrimary} />
                    <View style={styles.sparkleBadge}>
                      <IconSparkles size={16} color={COLORS.winterHazel} />
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.rewardsBreakdownRow}>
                <View style={[styles.rewardChip, { backgroundColor: 'rgba(245, 158, 11, 0.15)' }]}>
                  <IconCoinStack size={14} color="#D97706" />
                  <Text style={styles.rewardChipText}>500 Coins</Text>
                </View>
                <View style={[styles.rewardChip, { backgroundColor: 'rgba(59, 130, 246, 0.15)' }]}>
                  <IconGemstone size={14} color="#2563EB" />
                  <Text style={[styles.rewardChipText, { color: '#2563EB' }]}>10 Gems</Text>
                </View>
              </View>

              <Text style={[styles.rewardDesc, { color: theme.textSecondary }]}>
                Claim your continuous login allowance to stake at higher-tier bingo tables.
              </Text>

              <TouchableOpacity
                style={[
                  styles.claimBtn,
                  {
                    backgroundColor: COLORS.playEmerald,
                    transform: [{ scale: isBtnPressed ? SPRING_CONFIGS.cardPress.scaleDown : 1 }],
                  },
                ]}
                activeOpacity={0.88}
                onPressIn={() => setIsBtnPressed(true)}
                onPressOut={() => setIsBtnPressed(false)}
                onPress={onClaim}
                accessibilityRole="button"
                accessibilityLabel="Claim 500 coins and 10 gems"
              >
                <View style={styles.btnBevel} />
                <Text style={styles.claimBtnText}>Claim Bonus</Text>
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
    padding: SPACING.lg,
  },
  modalCard: {
    width: '100%',
    maxWidth: 320,
    padding: SPACING.xl,
    alignItems: 'center',
    borderWidth: 1,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
  },
  modalBevel: {
    position: 'absolute',
    top: 0,
    left: 12,
    right: 12,
    height: 1,
    backgroundColor: COLORS.borderSpecularStrong,
  },
  closeBtn: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    padding: 6,
    zIndex: 10,
  },
  kickerText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    fontFamily: TYPOGRAPHY.fontFamily,
    marginBottom: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: SPACING.md,
    fontFamily: TYPOGRAPHY.fontFamily,
    textAlign: 'center',
  },
  artBoxOuter: {
    padding: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  artBoxInner: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  iconCluster: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sparkleBadge: {
    position: 'absolute',
    top: -8,
    right: -10,
  },
  rewardsBreakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  rewardChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.pill,
    gap: 4,
  },
  rewardChipText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#D97706',
    fontFamily: TYPOGRAPHY.monoFamily,
  },
  rewardDesc: {
    fontSize: 12,
    lineHeight: 17,
    fontFamily: TYPOGRAPHY.fontFamily,
    textAlign: 'center',
    marginBottom: SPACING.lg,
    maxWidth: 260,
  },
  claimBtn: {
    width: '100%',
    height: Math.max(46, TOUCH_TARGET.minSize),
    borderRadius: RADIUS.control,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: COLORS.playEmerald,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  btnBevel: {
    position: 'absolute',
    top: 0,
    left: 4,
    right: 4,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
  },
  claimBtnText: {
    color: '#0B0E14',
    fontSize: 15,
    fontWeight: '900',
    fontFamily: TYPOGRAPHY.fontFamily,
    letterSpacing: 0.3,
  },
});
