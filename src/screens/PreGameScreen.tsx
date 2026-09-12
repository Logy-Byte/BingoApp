import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../design/tokens';
import { useTheme } from '../design/theme';
import { PublicRoom } from '../domain/types';
import { ChevronIcon } from '../components/icons/CustomIcons';

interface PreGameScreenProps {
  room: PublicRoom;
  onBuyTickets: (cardCount: number) => void;
  onBack: () => void;
}

export const PreGameScreen: React.FC<PreGameScreenProps> = ({
  room,
  onBuyTickets,
  onBack,
}) => {
  const { theme } = useTheme();
  const [cardCount, setCardCount] = useState<number>(1);

  const handleIncrement = () => {
    if (cardCount < 4) setCardCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (cardCount > 1) setCardCount((prev) => prev - 1);
  };

  const totalCost = (room.ticketPrice * cardCount).toFixed(2);

  return (
    <View style={[styles.container, { backgroundColor: theme.bgCanvas }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.bgCard, borderColor: theme.borderSubtle }]}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <ChevronIcon direction="left" size={20} color={theme.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>PRE-GAME</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Hero Banner with Ticket price & Jackpot */}
      <View style={styles.heroBanner}>
        <View style={styles.heroCol}>
          <Text style={styles.heroLabel}>Ticket price</Text>
          <Text style={styles.heroValue}>${room.ticketPrice.toFixed(2)}</Text>
        </View>
        <View style={styles.heroDivider} />
        <View style={styles.heroCol}>
          <Text style={styles.heroLabel}>Grand Jackpot</Text>
          <Text style={styles.heroJackpot}>${room.jackpotAmount.toLocaleString()}</Text>
        </View>
      </View>

      {/* Details Box */}
      <View style={[styles.detailsCard, { backgroundColor: theme.bgCard, borderColor: theme.borderSubtle }]}>
        <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>Room Details</Text>

        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Ticket price</Text>
          <Text style={[styles.detailVal, { color: theme.textPrimary }]}>54 coins / card</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Player count</Text>
          <Text style={[styles.detailVal, { color: theme.textPrimary }]}>{room.playerCount} Players</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Jackpot amount</Text>
          <Text style={[styles.detailVal, { color: COLORS.winterHazel }]}>3,240 coins</Text>
        </View>
      </View>

      {/* Card Count Selector */}
      <View style={[styles.selectorCard, { backgroundColor: theme.bgCard, borderColor: theme.borderSubtle }]}>
        <Text style={[styles.selectorTitle, { color: theme.textPrimary }]}>Select number of cards</Text>

        <View style={styles.counterRow}>
          <TouchableOpacity
            style={[styles.counterBtn, cardCount <= 1 && styles.counterBtnDisabled]}
            onPress={handleDecrement}
            disabled={cardCount <= 1}
          >
            <Text style={styles.counterBtnText}>-</Text>
          </TouchableOpacity>

          <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>{cardCount}</Text>
          </View>

          <TouchableOpacity
            style={[styles.counterBtn, cardCount >= 4 && styles.counterBtnDisabled]}
            onPress={handleIncrement}
            disabled={cardCount >= 4}
          >
            <Text style={styles.counterBtnText}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.totalText, { color: theme.textSecondary }]}>
          Total Price: <Text style={{ fontWeight: '900', color: theme.textPrimary }}>${totalCost}</Text>
        </Text>
      </View>

      {/* Primary Action Trigger */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.buyBtn, { backgroundColor: '#3B82F6' }]}
          onPress={() => onBuyTickets(cardCount)}
          activeOpacity={0.85}
        >
          <Text style={styles.buyBtnText}>Buy Tickets</Text>
        </TouchableOpacity>
      </View>
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
  backBtn: { padding: SPACING.xs },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  heroBanner: {
    backgroundColor: '#1E3A8A',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    margin: SPACING.md,
    borderRadius: RADIUS.hero,
    elevation: 4,
  },
  heroCol: { alignItems: 'center' },
  heroLabel: {
    fontSize: 11,
    color: '#93C5FD',
    fontWeight: '700',
    textTransform: 'uppercase',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  heroValue: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  heroJackpot: {
    fontSize: 20,
    fontWeight: '900',
    color: '#F59E0B',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  heroDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#3B82F6',
  },
  detailsCard: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    padding: SPACING.md,
    borderRadius: RADIUS.surface,
    borderWidth: 1,
    gap: SPACING.xs,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: SPACING.xs,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  detailLabel: {
    fontSize: 13,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  detailVal: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  selectorCard: {
    marginHorizontal: SPACING.md,
    padding: SPACING.lg,
    borderRadius: RADIUS.hero,
    borderWidth: 1,
    alignItems: 'center',
    gap: SPACING.md,
  },
  selectorTitle: {
    fontSize: 15,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.lg,
  },
  counterBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterBtnDisabled: {
    backgroundColor: '#94A3B8',
  },
  counterBtnText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  countBadge: {
    width: 50,
    height: 50,
    borderRadius: RADIUS.surface,
    backgroundColor: 'rgba(59, 130, 246, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#3B82F6',
  },
  countBadgeText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#3B82F6',
  },
  totalText: {
    fontSize: 14,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  footer: {
    marginTop: 'auto',
    padding: SPACING.md,
  },
  buyBtn: {
    height: 52,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  buyBtnText: {
    fontSize: 17,
    fontWeight: '900',
    color: '#FFFFFF',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});
