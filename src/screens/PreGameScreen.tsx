/**
 * PreGameScreen
 * Apple HIG-Grade Staking Configuration & Ticket Purchase Screen
 * Concentric geometry, tactile stepper, zero raw emojis (100% SVG vector).
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  COLORS,
  RADIUS,
  SPACING,
  TYPOGRAPHY,
  calcConcentricRadius,
  TOUCH_TARGET,
  SPRING_CONFIGS,
} from '../design/tokens';
import { useTheme } from '../design/theme';
import { PublicRoom } from '../domain/types';
import {
  ChevronIcon,
  IconTicket,
  IconCoinStack,
  IconSparkles,
  IconShield,
  BingoIdentityIcon,
} from '../components/icons/CustomIcons';

interface PreGameScreenProps {
  room: PublicRoom;
  userBalanceCoins: number;
  onBuyTickets: (cardCount: number) => void;
  onBack: () => void;
}

export const PreGameScreen: React.FC<PreGameScreenProps> = ({
  room,
  userBalanceCoins,
  onBuyTickets,
  onBack,
}) => {
  const { theme } = useTheme();
  const [cardCount, setCardCount] = useState<number>(1);
  const [isBuyPressed, setIsBuyPressed] = useState(false);

  const handleIncrement = () => {
    if (cardCount < 4) setCardCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (cardCount > 1) setCardCount((prev) => prev - 1);
  };

  const totalCost = room.ticketPrice * cardCount;
  const canAfford = userBalanceCoins >= totalCost;
  const totalJackpotCoins = room.jackpotAmount;

  // Concentric metrics
  const cardRadius = RADIUS.hero; // 24px
  const innerWellRadius = calcConcentricRadius(cardRadius, SPACING.md, 12);

  return (
    <View style={[styles.container, { backgroundColor: theme.bgCanvas }]}>
      {/* Top Header Bar strictly preserving navigation */}
      <View style={[styles.header, { backgroundColor: theme.bgCard, borderColor: theme.borderSubtle }]}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn} accessibilityRole="button" accessibilityLabel="Back">
          <ChevronIcon direction="left" size={20} color={theme.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>MATCH STAKING</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero Spec Sheet Banner */}
        <View
          style={[
            styles.heroBanner,
            {
              backgroundColor: theme.accentOliveTint,
              borderColor: COLORS.gentleOlive,
              borderRadius: cardRadius,
            },
          ]}
        >
          <View style={styles.bannerBevel} />
          <View style={styles.heroCol}>
            <Text style={styles.heroLabel}>ENTRY TICKET</Text>
            <View style={styles.valRow}>
              <IconTicket size={18} color="#0F172A" />
              <Text style={styles.heroValue}>${room.ticketPrice.toFixed(2)}</Text>
            </View>
          </View>
          <View style={styles.heroDivider} />
          <View style={styles.heroCol}>
            <View style={styles.jackpotRow}>
              <IconSparkles size={14} color="#8A6724" />
              <Text style={styles.heroLabel}>GRAND JACKPOT</Text>
            </View>
            <View style={styles.valRow}>
              <IconCoinStack size={18} color="#8A6724" />
              <Text style={styles.heroJackpot}>${totalJackpotCoins.toLocaleString()}</Text>
            </View>
          </View>
        </View>

        {/* Room Specification Details Card */}
        <View
          style={[
            styles.detailsCard,
            {
              backgroundColor: theme.bgCard,
              borderColor: theme.borderSubtle,
              borderRadius: cardRadius,
            },
          ]}
        >
          <View style={styles.cardHeaderRow}>
            <BingoIdentityIcon size={18} color={COLORS.winterHazel} variant="filled" />
            <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>
              {room.name} Arena Specs
            </Text>
          </View>

          <View style={[styles.detailRow, { borderBottomColor: theme.borderSubtle }]}>
            <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Active Table Density</Text>
            <Text style={[styles.detailVal, { color: theme.textPrimary }]}>
              {room.playerCount} Players (Max {room.maxPlayers})
            </Text>
          </View>

          <View style={[styles.detailRow, { borderBottomColor: theme.borderSubtle }]}>
            <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Multi-Card Matrix View</Text>
            <Text style={[styles.detailVal, { color: COLORS.gentleOlive }]}>
              Synchronized 5×5 Grids
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Fair Play Engine</Text>
            <View style={styles.fairPlayTag}>
              <IconShield size={12} color={COLORS.playEmerald} />
              <Text style={[styles.fairPlayText, { color: COLORS.playEmerald }]}>Authoritative Anti-Cheat</Text>
            </View>
          </View>
        </View>

        {/* Tactile Card Count Stepper Selector */}
        <View
          style={[
            styles.selectorCard,
            {
              backgroundColor: theme.bgCard,
              borderColor: theme.borderSubtle,
              borderRadius: cardRadius,
            },
          ]}
        >
          <Text style={[styles.selectorTitle, { color: theme.textPrimary }]}>
            Select Number of Match Cards
          </Text>
          <Text style={[styles.selectorSubtitle, { color: theme.textSecondary }]}>
            Play up to 4 synchronized boards simultaneously
          </Text>

          <View style={styles.counterRow}>
            <TouchableOpacity
              style={[
                styles.counterBtn,
                {
                  backgroundColor: theme.bgRecessed,
                  borderColor: theme.borderSubtle,
                  borderRadius: innerWellRadius,
                },
                cardCount <= 1 && styles.counterBtnDisabled,
              ]}
              onPress={handleDecrement}
              disabled={cardCount <= 1}
              hitSlop={TOUCH_TARGET.hitSlop}
              accessibilityRole="button"
              accessibilityLabel="Decrease cards"
            >
              <Text style={[styles.counterBtnText, { color: cardCount <= 1 ? theme.textMuted : theme.textPrimary }]}>
                −
              </Text>
            </TouchableOpacity>

            <View
              style={[
                styles.countBadge,
                {
                  backgroundColor: theme.accentHazelTint,
                  borderColor: COLORS.winterHazel,
                  borderRadius: innerWellRadius,
                },
              ]}
            >
              <IconTicket size={20} color={COLORS.winterHazel} style={{ marginRight: 6 }} />
              <Text style={[styles.countBadgeText, { color: '#8A6724' }]}>
                {cardCount} {cardCount > 1 ? 'Cards' : 'Card'}
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.counterBtn,
                {
                  backgroundColor: theme.bgRecessed,
                  borderColor: theme.borderSubtle,
                  borderRadius: innerWellRadius,
                },
                cardCount >= 4 && styles.counterBtnDisabled,
              ]}
              onPress={handleIncrement}
              disabled={cardCount >= 4}
              hitSlop={TOUCH_TARGET.hitSlop}
              accessibilityRole="button"
              accessibilityLabel="Increase cards"
            >
              <Text style={[styles.counterBtnText, { color: cardCount >= 4 ? theme.textMuted : theme.textPrimary }]}>
                +
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.totalContainer, { backgroundColor: theme.bgRecessed, borderRadius: RADIUS.control }]}>
            <Text style={[styles.totalLabel, { color: theme.textSecondary }]}>Total Staking Cost:</Text>
            <View style={styles.totalValueGroup}>
              <IconCoinStack size={18} color={COLORS.goldPrimary} />
              <Text style={[styles.totalCostText, { color: theme.textPrimary }]}>${totalCost}</Text>
            </View>
          </View>
        </View>

        {/* Primary Action Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.buyBtn,
              {
                backgroundColor: canAfford ? COLORS.playEmerald : '#334155',
                transform: [{ scale: isBuyPressed ? SPRING_CONFIGS.cardPress.scaleDown : 1 }],
              },
            ]}
            onPressIn={() => setIsBuyPressed(true)}
            onPressOut={() => setIsBuyPressed(false)}
            onPress={() => {
              if (canAfford) onBuyTickets(cardCount);
            }}
            disabled={!canAfford}
            activeOpacity={0.88}
            accessibilityRole="button"
            accessibilityLabel={canAfford ? `Stake $${totalCost.toFixed(2)}` : 'Insufficient Funds'}
          >
            <View style={styles.btnBevel} />
            <Text style={[styles.buyBtnText, { color: canAfford ? '#0B0E14' : '#94A3B8' }]}>
              {canAfford ? `Stake $${totalCost.toFixed(2)}` : 'Insufficient Funds'}
            </Text>
            <ChevronIcon direction="right" size={16} color={canAfford ? "#0B0E14" : "#94A3B8"} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 122, 0, 0.2)',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.8,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: 40,
  },
  heroBanner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: SPACING.lg,
    borderWidth: 1,
    marginBottom: SPACING.md,
    position: 'relative',
    overflow: 'hidden',
  },
  bannerBevel: {
    position: 'absolute',
    top: 0,
    left: 8,
    right: 8,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
  },
  heroCol: {
    alignItems: 'center',
  },
  heroDivider: {
    width: 1,
    height: 38,
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
  },
  heroLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#475569',
    letterSpacing: 0.6,
    fontFamily: TYPOGRAPHY.fontFamily,
    marginBottom: 2,
  },
  jackpotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  valRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  heroValue: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
    fontFamily: TYPOGRAPHY.monoFamily,
  },
  heroJackpot: {
    fontSize: 20,
    fontWeight: '900',
    color: '#8A6724',
    fontFamily: TYPOGRAPHY.monoFamily,
  },
  detailsCard: {
    padding: SPACING.md,
    borderWidth: 1,
    marginBottom: SPACING.md,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: SPACING.sm,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
  },
  detailLabel: {
    fontSize: 12,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  detailVal: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.monoFamily,
  },
  fairPlayTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  fairPlayText: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  selectorCard: {
    padding: SPACING.lg,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  selectorTitle: {
    fontSize: 15,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  selectorSubtitle: {
    fontSize: 12,
    marginTop: 2,
    marginBottom: SPACING.md,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.md,
    width: '100%',
    marginVertical: SPACING.sm,
  },
  counterBtn: {
    width: 52,
    height: 52,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterBtnDisabled: {
    opacity: 0.35,
  },
  counterBtnText: {
    fontSize: 26,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.monoFamily,
  },
  countBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: 52,
    borderWidth: 1.5,
  },
  countBadgeText: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginTop: SPACING.md,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  totalValueGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  totalCostText: {
    fontSize: 18,
    fontWeight: '900',
    fontFamily: TYPOGRAPHY.monoFamily,
  },
  footer: {
    width: '100%',
  },
  buyBtn: {
    width: '100%',
    height: Math.max(50, TOUCH_TARGET.minSize),
    borderRadius: RADIUS.control,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
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
  buyBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0B0E14',
    fontFamily: TYPOGRAPHY.fontFamily,
    letterSpacing: 0.3,
  },
});
