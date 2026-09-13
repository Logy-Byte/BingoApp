/**
 * InGameOverlays
 * Apple HIG-Grade In-Game Spring Sheets & Celebratory Overlays
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
  IconCoinStack,
  IconLightning,
  IconSparkles,
  BingoIdentityIcon,
} from '../icons/CustomIcons';

// Next Ball Reward Overlay
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
  const { theme } = useTheme();
  const [isBtnPressed, setIsBtnPressed] = useState(false);

  const cardRadius = RADIUS.hero; // 24px
  const iconRingRadius = 36;
  const iconCoreRadius = calcConcentricRadius(iconRingRadius, 6, 16);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onDismiss}>
      <TouchableWithoutFeedback onPress={onDismiss}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.modalCard,
                {
                  backgroundColor: theme.bgCard,
                  borderColor: theme.borderSubtle,
                  borderRadius: cardRadius,
                },
              ]}
              accessibilityRole="alertdialog"
              accessibilityLabel={`Next Ball Money Multiplier: ${rewardAmount} coins`}
            >
              {/* Top Specular Edge Highlight */}
              <View style={styles.modalBevel} />

              <View
                style={[
                  styles.concentricIconWell,
                  {
                    width: iconRingRadius * 2,
                    height: iconRingRadius * 2,
                    borderRadius: iconRingRadius,
                    backgroundColor: theme.bgRecessed,
                    borderColor: theme.borderSubtle,
                  },
                ]}
              >
                <View
                  style={[
                    styles.concentricIconCore,
                    {
                      borderRadius: iconCoreRadius,
                      backgroundColor: 'rgba(245, 158, 11, 0.15)',
                      borderColor: COLORS.goldPrimary,
                    },
                  ]}
                >
                  <IconCoinStack size={32} color={COLORS.goldPrimary} />
                </View>
              </View>

              <Text style={[styles.modalBadgeText, { color: COLORS.winterHazel }]}>
                NEXT BALL MULTIPLIER
              </Text>
              <Text style={[styles.modalMainValue, { color: COLORS.goldPrimary }]}>
                +{rewardAmount} Coins Bonus
              </Text>
              <Text style={[styles.modalSubtitle, { color: theme.textSecondary }]}>
                Daub the upcoming called number to claim this instant currency reward!
              </Text>

              <TouchableOpacity
                style={[
                  styles.modalActionBtn,
                  {
                    backgroundColor: COLORS.playEmerald,
                    transform: [{ scale: isBtnPressed ? SPRING_CONFIGS.cardPress.scaleDown : 1 }],
                  },
                ]}
                activeOpacity={0.88}
                onPressIn={() => setIsBtnPressed(true)}
                onPressOut={() => setIsBtnPressed(false)}
                onPress={onDismiss}
                accessibilityRole="button"
                accessibilityLabel="Confirm bonus"
              >
                <View style={styles.btnBevel} />
                <Text style={styles.modalActionText}>Ready to Daub</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

// Power Up Used Notification Overlay
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
  const { theme } = useTheme();
  const [isBtnPressed, setIsBtnPressed] = useState(false);

  const cardRadius = RADIUS.hero; // 24px
  const iconRingRadius = 36;
  const iconCoreRadius = calcConcentricRadius(iconRingRadius, 6, 16);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onDismiss}>
      <TouchableWithoutFeedback onPress={onDismiss}>
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
              accessibilityRole="alertdialog"
              accessibilityLabel={`Power-up activated: ${powerUpName}`}
            >
              {/* Top Specular Edge Highlight */}
              <View style={styles.modalBevel} />

              <View
                style={[
                  styles.concentricIconWell,
                  {
                    width: iconRingRadius * 2,
                    height: iconRingRadius * 2,
                    borderRadius: iconRingRadius,
                    backgroundColor: theme.bgRecessed,
                    borderColor: theme.borderSubtle,
                  },
                ]}
              >
                <View
                  style={[
                    styles.concentricIconCore,
                    {
                      borderRadius: iconCoreRadius,
                      backgroundColor: theme.accentHazelTint,
                      borderColor: COLORS.winterHazel,
                    },
                  ]}
                >
                  <IconLightning size={32} color={COLORS.winterHazel} />
                </View>
              </View>

              <Text style={[styles.modalBadgeText, { color: COLORS.gentleOlive }]}>
                POWER-UP ACTIVATED
              </Text>
              <Text style={[styles.modalMainValue, { color: theme.textPrimary }]}>
                {powerUpName}
              </Text>
              <Text style={[styles.modalSubtitle, { color: theme.textSecondary }]}>
                Tactical advantage deployed on your active 5×5 match board.
              </Text>

              <TouchableOpacity
                style={[
                  styles.modalActionBtn,
                  {
                    backgroundColor: COLORS.winterHazel,
                    transform: [{ scale: isBtnPressed ? SPRING_CONFIGS.cardPress.scaleDown : 1 }],
                  },
                ]}
                activeOpacity={0.88}
                onPressIn={() => setIsBtnPressed(true)}
                onPressOut={() => setIsBtnPressed(false)}
                onPress={onDismiss}
                accessibilityRole="button"
                accessibilityLabel="Dismiss power-up notification"
              >
                <View style={styles.btnBevel} />
                <Text style={[styles.modalActionText, { color: COLORS.lunarShadow }]}>
                  Continue Match
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

// Pattern Completed Notification Banner
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
    <View style={styles.bannerAnchor}>
      <View style={styles.bannerSurface}>
        <View style={styles.bannerBevel} />
        <View style={styles.bannerIconWrap}>
          <IconSparkles size={16} color="#0B0E14" />
        </View>
        <View style={styles.bannerTextColumn}>
          <Text style={styles.bannerKicker}>PATTERN COMPLETED!</Text>
          <Text style={styles.bannerName}>{patternName.toUpperCase()}</Text>
        </View>
        <BingoIdentityIcon size={18} color="#0B0E14" variant="filled" />
      </View>
    </View>
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
    shadowOpacity: 0.45,
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
  concentricIconWell: {
    padding: 6,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  concentricIconCore: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  modalBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    fontFamily: TYPOGRAPHY.fontFamily,
    marginBottom: 4,
  },
  modalMainValue: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.2,
    fontFamily: TYPOGRAPHY.fontFamily,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 12,
    lineHeight: 17,
    fontFamily: TYPOGRAPHY.fontFamily,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    maxWidth: 260,
  },
  modalActionBtn: {
    width: '100%',
    height: Math.max(46, TOUCH_TARGET.minSize),
    borderRadius: RADIUS.control,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
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
  modalActionText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0B0E14',
    fontFamily: TYPOGRAPHY.fontFamily,
    letterSpacing: 0.3,
  },
  bannerAnchor: {
    position: 'absolute',
    top: 54,
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 999,
  },
  bannerSurface: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.winterHazel,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm + 2,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: COLORS.winterHazel,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
    position: 'relative',
    overflow: 'hidden',
    gap: SPACING.sm,
  },
  bannerBevel: {
    position: 'absolute',
    top: 0,
    left: 8,
    right: 8,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  bannerIconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerTextColumn: {
    alignItems: 'flex-start',
  },
  bannerKicker: {
    fontSize: 9,
    fontWeight: '900',
    color: 'rgba(11, 14, 20, 0.7)',
    letterSpacing: 0.6,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  bannerName: {
    fontSize: 13,
    fontWeight: '900',
    color: '#0B0E14',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});
