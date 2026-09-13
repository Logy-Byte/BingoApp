import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  COLORS,
  RADIUS,
  SPACING,
  TYPOGRAPHY,
  calcConcentricRadius,
  TOUCH_TARGET,
} from '../design/tokens';
import { useTheme } from '../design/theme';
import { StoreItem } from '../domain/types';
import {
  IconCoinStack,
  IconGemstone,
  IconLightning,
  IconTarget,
  IconSparkles,
  BingoIdentityIcon,
} from '../components/icons/CustomIcons';

interface ShopScreenProps {
  coins: number;
  gems: number;
  onBuyItem: (item: StoreItem) => void;
}

const STORE_ITEMS: (StoreItem & { bonusTag?: string; tierType?: 'standard' | 'popular' | 'best_value' })[] = [
  {
    id: 'c1',
    category: 'COINS',
    title: 'Pocket Stack',
    amountText: '500 Coins',
    priceText: '$0.99',
    icon: 'coin_stack',
    bonusTag: 'Starter Kit',
    tierType: 'standard',
  },
  {
    id: 'c2',
    category: 'COINS',
    title: 'Golden Vault',
    amountText: '2,500 Coins',
    priceText: '$4.99',
    icon: 'coin_stack',
    badgeText: 'POPULAR',
    bonusTag: '+250 Bonus Coins',
    tierType: 'popular',
  },
  {
    id: 'c3',
    category: 'COINS',
    title: 'Royal Stash',
    amountText: '10,000 Coins',
    priceText: '$14.99',
    icon: 'coin_stack',
    badgeText: 'BEST VALUE',
    bonusTag: '+2,500 Bonus Coins',
    tierType: 'best_value',
  },
  {
    id: 'p1',
    category: 'POWERUPS',
    title: 'Free Daub Pack',
    amountText: '5 Free Daubs',
    priceText: '50 Gems',
    costInGems: 50,
    icon: 'lightning',
    bonusTag: 'Single Match Use',
    tierType: 'standard',
  },
  {
    id: 'p2',
    category: 'POWERUPS',
    title: 'Instant Line',
    amountText: '2 Instants',
    priceText: '120 Gems',
    costInGems: 120,
    icon: 'target',
    badgeText: 'HOT',
    bonusTag: 'Direct Win Assist',
    tierType: 'popular',
  },
  {
    id: 'p3',
    category: 'POWERUPS',
    title: 'Double Payout',
    amountText: '3 Boosters',
    priceText: '80 Gems',
    costInGems: 80,
    icon: 'sparkles',
    bonusTag: '2× XP & Coins',
    tierType: 'best_value',
  },
  {
    id: 'g1',
    category: 'GEMS',
    title: 'Gem Handful',
    amountText: '50 Gems',
    priceText: '$1.99',
    icon: 'gemstone',
    bonusTag: 'Instant Deposit',
    tierType: 'standard',
  },
  {
    id: 'g2',
    category: 'GEMS',
    title: 'Gem Pouch',
    amountText: '250 Gems',
    priceText: '$7.99',
    icon: 'gemstone',
    badgeText: 'HOT',
    bonusTag: '+50 Bonus Gems',
    tierType: 'popular',
  },
  {
    id: 'a1',
    category: 'AVATARS',
    title: 'Crown Master',
    amountText: 'Exclusive Crest',
    priceText: '500 Gems',
    costInGems: 500,
    icon: 'avatar',
    badgeText: 'EXCLUSIVE',
    bonusTag: 'Permanent Unlock',
    tierType: 'best_value',
  },
];

export const ShopScreen: React.FC<ShopScreenProps> = ({
  coins,
  gems,
  onBuyItem,
}) => {
  const { theme, isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<'COINS' | 'POWERUPS' | 'GEMS' | 'AVATARS'>('COINS');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const filteredItems = STORE_ITEMS.filter((item) => item.category === activeTab);

  const renderItemVector = (item: StoreItem) => {
    switch (item.icon) {
      case 'lightning':
        return <IconLightning size={32} color={COLORS.winterHazel} />;
      case 'target':
        return <IconTarget size={32} color={COLORS.playEmerald} />;
      case 'sparkles':
        return <IconSparkles size={32} color={COLORS.goldPrimary} />;
      case 'gemstone':
        return <IconGemstone size={32} color="#38BDF8" />;
      case 'avatar':
        return <BingoIdentityIcon size={32} color={COLORS.winterHazel} variant="filled" />;
      case 'coin_stack':
      default:
        return <IconCoinStack size={32} color={COLORS.goldPrimary} />;
    }
  };

  const cardRadius = RADIUS.hero; // 24px
  const iconRingRadius = 30;
  const iconCoreRadius = calcConcentricRadius(iconRingRadius, 6, 12);

  return (
    <View style={[styles.container, { backgroundColor: theme.bgCanvas }]}>
      {/* Top Header Bar strictly preserving balances & navigation */}
      <View style={[styles.header, { backgroundColor: theme.bgCard, borderBottomColor: theme.borderSubtle }]}>
        <View>
          <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>Store & Vault</Text>
          <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
            Instant Digital Delivery
          </Text>
        </View>

        <View style={styles.currencyGroup}>
          <View
            style={[
              styles.currencyPill,
              {
                backgroundColor: isDark ? 'rgba(245, 158, 11, 0.12)' : '#FEF3C7',
                borderColor: 'rgba(245, 158, 11, 0.3)',
              },
            ]}
          >
            <IconCoinStack size={14} color="#D97706" />
            <Text style={[styles.currencyText, { color: '#B45309' }]}>{coins.toLocaleString()}</Text>
          </View>
          <View
            style={[
              styles.currencyPill,
              {
                backgroundColor: isDark ? 'rgba(56, 189, 248, 0.12)' : '#E0F2FE',
                borderColor: 'rgba(56, 189, 248, 0.3)',
              },
            ]}
          >
            <IconGemstone size={14} color="#0284C7" />
            <Text style={[styles.currencyText, { color: '#0369A1' }]}>{gems.toLocaleString()}</Text>
          </View>
        </View>
      </View>

      {/* Tactile Category Tabs */}
      <View style={styles.tabRow}>
        {(['COINS', 'POWERUPS', 'GEMS', 'AVATARS'] as const).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabBtn,
                isActive && styles.tabBtnActive,
                {
                  backgroundColor: isActive ? COLORS.cleanWhite : theme.bgCard,
                  borderColor: isActive ? COLORS.gentleOlive : theme.borderSubtle,
                },
              ]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.8}
              hitSlop={TOUCH_TARGET.hitSlop}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color: isActive ? COLORS.lunarShadow : theme.textSecondary,
                    fontWeight: isActive ? '800' : '600',
                  },
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Items Grid */}
      <ScrollView contentContainerStyle={styles.gridContainer} showsVerticalScrollIndicator={false}>
        {filteredItems.map((item) => {
          const isSelected = selectedItemId === item.id;
          const isBestValue = item.tierType === 'best_value';
          const isPopular = item.tierType === 'popular';

          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.itemCard,
                {
                  backgroundColor: theme.bgCard,
                  borderColor: isBestValue
                    ? COLORS.winterHazel
                    : isPopular
                    ? '#F59E0B'
                    : isSelected
                    ? COLORS.gentleOlive
                    : theme.borderSubtle,
                  borderRadius: cardRadius,
                  borderWidth: isBestValue || isSelected ? 1.8 : 1,
                },
              ]}
              onPress={() => setSelectedItemId(item.id)}
              activeOpacity={0.9}
            >
              {/* Specular Bevel Line */}
              <View style={styles.itemBevel} />

              {/* Tag Badge */}
              {item.badgeText && (
                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor: isBestValue
                        ? COLORS.winterHazel
                        : isPopular
                        ? '#F59E0B'
                        : COLORS.gentleOlive,
                    },
                  ]}
                >
                  <Text style={styles.badgeText}>{item.badgeText}</Text>
                </View>
              )}

              {/* Concentric Icon Well with Ambient Halo */}
              <View
                style={[
                  styles.iconOuterWell,
                  {
                    width: iconRingRadius * 2,
                    height: iconRingRadius * 2,
                    borderRadius: iconRingRadius,
                    backgroundColor: theme.bgRecessed,
                    borderColor: isBestValue
                      ? 'rgba(230, 202, 154, 0.4)'
                      : theme.borderSubtle,
                  },
                ]}
              >
                <View
                  style={[
                    styles.iconInnerCore,
                    {
                      borderRadius: iconCoreRadius,
                      backgroundColor: isDark ? '#222733' : '#F1F5F9',
                    },
                  ]}
                >
                  {renderItemVector(item)}
                </View>
              </View>

              {/* Title & Quantities */}
              <Text style={[styles.itemTitle, { color: theme.textPrimary }]}>{item.title}</Text>
              <Text style={[styles.itemAmount, { color: theme.textSecondary }]}>{item.amountText}</Text>
              {item.bonusTag && (
                <View style={[styles.bonusTagWrap, { backgroundColor: theme.bgRecessed }]}>
                  <Text style={[styles.bonusTagText, { color: COLORS.winterHazel }]}>
                    {item.bonusTag}
                  </Text>
                </View>
              )}

              {/* Tactile Buy Button */}
              <TouchableOpacity
                style={[
                  styles.buyBtn,
                  {
                    backgroundColor: isBestValue ? COLORS.winterHazel : COLORS.playEmerald,
                  },
                ]}
                onPress={() => onBuyItem(item)}
                activeOpacity={0.82}
                accessibilityRole="button"
                accessibilityLabel={`Purchase ${item.title} for ${item.priceText}`}
              >
                <View style={styles.btnBevel} />
                <Text
                  style={[
                    styles.buyBtnText,
                    {
                      color: isBestValue ? COLORS.lunarShadow : '#FFFFFF',
                    },
                  ]}
                >
                  {item.priceText}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          );
        })}
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
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '800',
    letterSpacing: -0.3,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  headerSubtitle: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 1,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  currencyGroup: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  currencyPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    gap: 5,
  },
  currencyText: {
    fontSize: 12,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.monoFamily,
  },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    gap: SPACING.xs,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.pill,
    borderWidth: 1,
  },
  tabBtnActive: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 11,
    fontFamily: TYPOGRAPHY.fontFamily,
    letterSpacing: 0.6,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: SPACING.md,
    gap: SPACING.md,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  itemCard: {
    width: '47.5%',
    padding: SPACING.md,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  itemBevel: {
    position: 'absolute',
    top: 0,
    left: 8,
    right: 8,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: RADIUS.pill,
  },
  badgeText: {
    fontSize: 8,
    fontWeight: '900',
    color: COLORS.lunarShadow,
    letterSpacing: 0.5,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  iconOuterWell: {
    padding: 5,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.sm,
  },
  iconInnerCore: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 2,
    textAlign: 'center',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  itemAmount: {
    fontSize: 12,
    marginBottom: 4,
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  bonusTagWrap: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.pill,
    marginBottom: SPACING.sm,
  },
  bonusTagText: {
    fontSize: 9,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  buyBtn: {
    width: '100%',
    height: Math.max(38, TOUCH_TARGET.minSize - 4),
    borderRadius: RADIUS.control,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
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
    fontSize: 13,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
    letterSpacing: -0.2,
  },
});
