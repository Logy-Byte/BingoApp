import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../design/tokens';
import { useTheme } from '../design/theme';
import { StoreItem } from '../domain/types';

interface ShopScreenProps {
  coins: number;
  gems: number;
  onBuyItem: (item: StoreItem) => void;
}

const STORE_ITEMS: StoreItem[] = [
  {
    id: 'c1',
    category: 'COINS',
    title: 'Pocket Stack',
    amountText: '500 Coins',
    priceText: '$0.99',
    icon: '🪙',
  },
  {
    id: 'c2',
    category: 'COINS',
    title: 'Golden Sack',
    amountText: '2,500 Coins',
    priceText: '$4.99',
    icon: '💰',
    badgeText: 'POPULAR',
  },
  {
    id: 'c3',
    category: 'COINS',
    title: 'Treasure Chest',
    amountText: '10,000 Coins',
    priceText: '$14.99',
    icon: '👑',
    badgeText: 'BEST VALUE',
  },
  {
    id: 'p1',
    category: 'POWERUPS',
    title: 'Free Daub Pack',
    amountText: '5 Free Daubs',
    priceText: '50 Gems',
    costInGems: 50,
    icon: '⚡',
  },
  {
    id: 'p2',
    category: 'POWERUPS',
    title: 'Instant Bingo',
    amountText: '2 Instants',
    priceText: '120 Gems',
    costInGems: 120,
    icon: '🎯',
    badgeText: 'HOT',
  },
  {
    id: 'p3',
    category: 'POWERUPS',
    title: 'Double Payout',
    amountText: '3 Boosters',
    priceText: '80 Gems',
    costInGems: 80,
    icon: '💎',
  },
  {
    id: 'g1',
    category: 'GEMS',
    title: 'Gem Handful',
    amountText: '50 Gems',
    priceText: '$1.99',
    icon: '💎',
  },
  {
    id: 'g2',
    category: 'GEMS',
    title: 'Gem Pouch',
    amountText: '250 Gems',
    priceText: '$7.99',
    icon: '💎',
    badgeText: 'HOT',
  },
  {
    id: 'a1',
    category: 'AVATARS',
    title: 'Golden King',
    amountText: 'Exclusive Avatar',
    priceText: '500 Gems',
    costInGems: 500,
    icon: '🤴',
  },
];

export const ShopScreen: React.FC<ShopScreenProps> = ({
  coins,
  gems,
  onBuyItem,
}) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'COINS' | 'POWERUPS' | 'GEMS' | 'AVATARS'>('COINS');

  const filteredItems = STORE_ITEMS.filter((item) => item.category === activeTab);

  return (
    <View style={[styles.container, { backgroundColor: theme.bgCanvas }]}>
      {/* Header Bar */}
      <View style={[styles.header, { backgroundColor: theme.bgCard, borderColor: theme.borderSubtle }]}>
        <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>Shop / Store</Text>

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

      {/* Tabs Row */}
      <View style={styles.tabRow}>
        {(['COINS', 'POWERUPS', 'GEMS', 'AVATARS'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabBtn,
              activeTab === tab && styles.tabBtnActive,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab ? styles.tabTextActive : { color: theme.textSecondary },
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Items Grid */}
      <ScrollView contentContainerStyle={styles.gridContainer} showsVerticalScrollIndicator={false}>
        {filteredItems.map((item) => (
          <View
            key={item.id}
            style={[styles.itemCard, { backgroundColor: theme.bgCard, borderColor: theme.borderSubtle }]}
          >
            {item.badgeText && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.badgeText}</Text>
              </View>
            )}

            <Text style={styles.itemIcon}>{item.icon}</Text>
            <Text style={[styles.itemTitle, { color: theme.textPrimary }]}>{item.title}</Text>
            <Text style={[styles.itemAmount, { color: theme.textSecondary }]}>{item.amountText}</Text>

            <TouchableOpacity
              style={[styles.buyBtn, { backgroundColor: COLORS.gentleOlive }]}
              onPress={() => onBuyItem(item)}
              activeOpacity={0.8}
            >
              <Text style={styles.buyBtnText}>{item.priceText}</Text>
            </TouchableOpacity>
          </View>
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
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    gap: SPACING.xs,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    backgroundColor: 'rgba(148, 163, 184, 0.15)',
  },
  tabBtnActive: {
    backgroundColor: '#3B82F6',
  },
  tabText: {
    fontSize: 11,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: SPACING.md,
    justifyContent: 'space-between',
    paddingBottom: 110,
  },
  itemCard: {
    width: '48%',
    borderRadius: RADIUS.hero,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    alignItems: 'center',
    borderWidth: 1,
    position: 'relative',
    elevation: 3,
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: 12,
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.pill,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
  },
  itemIcon: {
    fontSize: 36,
    marginBottom: SPACING.xs,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  itemAmount: {
    fontSize: 12,
    marginBottom: SPACING.md,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  buyBtn: {
    width: '100%',
    height: 38,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyBtnText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#0F172A',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});
