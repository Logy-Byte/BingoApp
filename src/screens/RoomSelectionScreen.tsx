/**
 * RoomSelectionScreen
 * Apple HIG-Grade Staking Room Discovery Screen
 * Features TactileRoomCards with integrated ticket selectors,
 * zero emojis (100% SVG vector currency), and PremiumEmptyState fallback.
 */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../design/tokens';
import { useTheme } from '../design/theme';
import { PublicRoom } from '../domain/types';
import {
  ChevronIcon,
  IconCoinStack,
  IconGemstone,
  IconSparkles,
} from '../components/icons/CustomIcons';
import { TactileRoomCard } from '../components/room/TactileRoomCard';
import { PremiumEmptyState } from '../components/common/PremiumEmptyState';
import { globalRoomManager } from '../domain/multiplayer/roomManager';

interface RoomSelectionScreenProps {
  coins: number;
  gems: number;
  onSelectRoom: (room: PublicRoom, ticketCount?: number) => void;
  onBack: () => void;
}

export const RoomSelectionScreen: React.FC<RoomSelectionScreenProps> = ({
  coins,
  gems,
  onSelectRoom,
  onBack,
}) => {
  const { theme } = useTheme();
  const [rooms, setRooms] = useState<PublicRoom[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const publicRooms = await globalRoomManager.getAvailablePublicRooms();
        if (mounted) {
          setRooms(publicRooms);
        }
      } catch (e) {
        console.error('Failed to fetch rooms', e);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };
    
    fetchRooms();
    return () => { mounted = false; };
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.bgCanvas }]}>
      {/* Top Header Bar strictly preserving navigation height & layout */}
      <View style={[styles.header, { backgroundColor: theme.bgCard, borderColor: theme.borderSubtle }]}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} accessibilityRole="button" accessibilityLabel="Go back">
          <ChevronIcon direction="left" size={20} color={theme.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>Bingo Rooms</Text>

        {/* 100% Vector Currency Status Badges */}
        <View style={styles.currencyGroup}>
          <View style={[styles.currencyPill, { backgroundColor: 'rgba(245, 158, 11, 0.15)' }]}>
            <IconCoinStack size={14} color="#D97706" />
            <Text style={[styles.currencyText, { color: '#D97706' }]}>{coins.toLocaleString()}</Text>
          </View>
          <View style={[styles.currencyPill, { backgroundColor: 'rgba(59, 130, 246, 0.15)' }]}>
            <IconGemstone size={14} color="#2563EB" />
            <Text style={[styles.currencyText, { color: '#2563EB' }]}>{gems.toLocaleString()}</Text>
          </View>
        </View>
      </View>

      {/* Featured Jackpot Banner with Specular Rim */}
      <View style={[styles.infoBanner, { backgroundColor: theme.accentOliveTint, borderColor: COLORS.gentleOlive }]}>
        <View style={styles.bannerBevel} />
        <View style={styles.infoCol}>
          <Text style={styles.infoLabel}>STANDARD ENTRY</Text>
          <Text style={styles.infoValue}>$2.00</Text>
        </View>
        <View style={styles.infoDivider} />
        <View style={styles.infoCol}>
          <View style={styles.jackpotTitleRow}>
            <IconSparkles size={13} color="#8A6724" />
            <Text style={styles.infoLabel}>GRAND JACKPOT</Text>
          </View>
          <Text style={styles.infoValueGold}>$1,000,000</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollList} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeaderRow}>
          <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>
            AVAILABLE TABLES ({rooms.length})
          </Text>
          <Text style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>
            Instant seat allocation
          </Text>
        </View>

        {loading ? (
          <View style={{ padding: 40, alignItems: 'center' }}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={{ marginTop: 12, color: theme.textSecondary, fontFamily: TYPOGRAPHY.fontFamily }}>
              Finding active rooms...
            </Text>
          </View>
        ) : rooms.length === 0 ? (
          <PremiumEmptyState
            variant="NO_ACTIVE_ROOMS"
            onAction={onBack}
            actionLabel="Return to Play"
          />
        ) : (
          rooms.map((room) => (
            <TactileRoomCard
              key={room.id}
              room={room}
              userBalanceCoins={coins}
              onSelectRoom={(r, count) => onSelectRoom(r, count)}
            />
          ))
        )}
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
  currencyText: {
    fontSize: 12,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.monoFamily,
  },
  infoBanner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: SPACING.md,
    padding: SPACING.md,
    borderRadius: RADIUS.surface,
    borderWidth: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  bannerBevel: {
    position: 'absolute',
    top: 0,
    left: 8,
    right: 8,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  infoCol: {
    alignItems: 'center',
  },
  jackpotTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#475569',
    textTransform: 'uppercase',
    fontFamily: TYPOGRAPHY.fontFamily,
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
    fontFamily: TYPOGRAPHY.monoFamily,
  },
  infoValueGold: {
    fontSize: 18,
    fontWeight: '900',
    color: '#8A6724',
    fontFamily: TYPOGRAPHY.monoFamily,
  },
  infoDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
  },
  scrollList: {
    paddingHorizontal: SPACING.md,
    paddingBottom: 40,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    marginTop: SPACING.xs,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  sectionSubtitle: {
    fontSize: 11,
    fontWeight: '500',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});
