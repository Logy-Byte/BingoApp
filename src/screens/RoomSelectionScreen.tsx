import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../design/tokens';
import { useTheme } from '../design/theme';
import { PublicRoom } from '../domain/types';
import { ChevronIcon, LockIcon, BingoIdentityIcon } from '../components/icons/CustomIcons';

interface RoomSelectionScreenProps {
  coins: number;
  gems: number;
  onSelectRoom: (room: PublicRoom) => void;
  onBack: () => void;
}

const DEFAULT_ROOMS: PublicRoom[] = [
  {
    id: 'R101',
    name: 'Namen 1',
    privacy: 'open',
    hostId: 'system',
    hostName: 'System',
    playerCount: 14,
    maxPlayers: 50,
    status: 'ACTIVE',
    createdAt: Date.now(),
    ticketPrice: 2.00,
    jackpotAmount: 235000,
    recommendedTickets: [1, 2, 4, 8],
  },
  {
    id: 'R102',
    name: 'Namen 2',
    privacy: 'open',
    hostId: 'system',
    hostName: 'System',
    playerCount: 22,
    maxPlayers: 50,
    status: 'ACTIVE',
    createdAt: Date.now(),
    ticketPrice: 3.00,
    jackpotAmount: 150000,
    recommendedTickets: [1, 2, 4, 8],
  },
  {
    id: 'R103',
    name: 'Namen 3',
    privacy: 'open',
    hostId: 'system',
    hostName: 'System',
    playerCount: 8,
    maxPlayers: 50,
    status: 'WAITING',
    createdAt: Date.now(),
    ticketPrice: 5.00,
    jackpotAmount: 500000,
    recommendedTickets: [1, 2, 4, 8],
  },
  {
    id: 'R104',
    name: 'Namen 4',
    privacy: 'open',
    hostId: 'system',
    hostName: 'System',
    playerCount: 35,
    maxPlayers: 50,
    status: 'ACTIVE',
    createdAt: Date.now(),
    ticketPrice: 1.00,
    jackpotAmount: 75000,
    recommendedTickets: [1, 2, 4, 8],
  },
  {
    id: 'R105',
    name: 'Namen 5',
    privacy: 'open',
    hostId: 'system',
    hostName: 'System',
    playerCount: 40,
    maxPlayers: 50,
    status: 'ACTIVE',
    createdAt: Date.now(),
    ticketPrice: 10.00,
    jackpotAmount: 1000000,
    recommendedTickets: [1, 2, 4, 8],
  },
];

export const RoomSelectionScreen: React.FC<RoomSelectionScreenProps> = ({
  coins,
  gems,
  onSelectRoom,
  onBack,
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.bgCanvas }]}>
      {/* Top Header Bar matching Storyboard */}
      <View style={[styles.header, { backgroundColor: theme.bgCard, borderColor: theme.borderSubtle }]}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ChevronIcon direction="left" size={20} color={theme.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>Bingo Room</Text>

        <View style={styles.currencyGroup}>
          <View style={[styles.currencyPill, { backgroundColor: 'rgba(245, 158, 11, 0.15)' }]}>
            <Text style={styles.coinIcon}>🪙</Text>
            <Text style={[styles.currencyText, { color: '#D97706' }]}>{coins.toLocaleString()}</Text>
          </View>
          <View style={[styles.currencyPill, { backgroundColor: 'rgba(59, 130, 246, 0.15)' }]}>
            <Text style={styles.gemIcon}>💎</Text>
            <Text style={[styles.currencyText, { color: '#2563EB' }]}>{gems.toLocaleString()}</Text>
          </View>
        </View>
      </View>

      {/* Featured Banner Info */}
      <View style={[styles.infoBanner, { backgroundColor: theme.accentOliveTint, borderColor: COLORS.gentleOlive }]}>
        <View style={styles.infoCol}>
          <Text style={styles.infoLabel}>Ticket price</Text>
          <Text style={styles.infoValue}>$2.00</Text>
        </View>
        <View style={styles.infoDivider} />
        <View style={styles.infoCol}>
          <Text style={styles.infoLabel}>Grand Jackpot</Text>
          <Text style={styles.infoValueGold}>$235,000</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollList} showsVerticalScrollIndicator={false}>
        <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>AVAILABLE ROOMS</Text>

        {DEFAULT_ROOMS.map((room) => (
          <TouchableOpacity
            key={room.id}
            style={[styles.roomCard, { backgroundColor: theme.bgCard, borderColor: theme.borderSubtle }]}
            onPress={() => onSelectRoom(room)}
            activeOpacity={0.85}
          >
            <View style={styles.cardHeader}>
              <View style={styles.roomIdentity}>
                <View style={styles.roomIcon}>
                  <BingoIdentityIcon size={18} color="#FFFFFF" />
                </View>
                <View>
                  <Text style={[styles.roomName, { color: theme.textPrimary }]}>{room.name}</Text>
                  <Text style={[styles.roomSubtitle, { color: theme.textSecondary }]}>
                    {room.playerCount} Players • Jackpot ${room.jackpotAmount.toLocaleString()}
                  </Text>
                </View>
              </View>

              <View style={styles.priceBadge}>
                <Text style={styles.priceBadgeText}>${room.ticketPrice.toFixed(2)}</Text>
              </View>
            </View>

            {/* Ticket Selector Pills (1, 2, 4, 8 Tickets) matching storyboard */}
            <View style={styles.ticketPillsRow}>
              {room.recommendedTickets.map((tCount, idx) => (
                <View
                  key={tCount}
                  style={[
                    styles.ticketPill,
                    { backgroundColor: idx % 2 === 0 ? '#F59E0B' : '#EF4444' },
                  ]}
                >
                  <Text style={styles.ticketPillText}>{tCount} Ticket{tCount > 1 ? 's' : ''}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))}
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
  backButton: {
    padding: SPACING.xs,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  currencyGroup: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  currencyPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.pill,
    gap: 4,
  },
  coinIcon: { fontSize: 12 },
  gemIcon: { fontSize: 12 },
  currencyText: {
    fontSize: 12,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  infoBanner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: SPACING.md,
    padding: SPACING.md,
    borderRadius: RADIUS.surface,
    borderWidth: 1,
  },
  infoCol: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
    textTransform: 'uppercase',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  infoValueGold: {
    fontSize: 18,
    fontWeight: '900',
    color: '#B45309',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  infoDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#CBD5E1',
  },
  scrollList: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xl * 2,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: SPACING.sm,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  roomCard: {
    borderRadius: RADIUS.hero,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roomIdentity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  roomIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roomName: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  roomSubtitle: {
    fontSize: 12,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  priceBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.pill,
  },
  priceBadgeText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 13,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  ticketPillsRow: {
    flexDirection: 'row',
    gap: SPACING.xs,
    marginTop: SPACING.md,
  },
  ticketPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.pill,
  },
  ticketPillText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});
