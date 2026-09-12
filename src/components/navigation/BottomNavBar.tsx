import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { TabDestination } from '../../domain/types';
import { COLORS, RADIUS, SHADOWS, TYPOGRAPHY } from '../../design/tokens';
import { HomeIcon, LeaderboardIcon, ProfileIcon } from '../icons/CustomIcons';

interface BottomNavBarProps {
  currentTab: TabDestination;
  onSelectTab: (tab: TabDestination) => void;
}

/**
 * Floating Console Dock with Illuminated Active Pill
 * Directly extracted from Reference 3 and Reference 1.
 * Style is strictly preserved as requested.
 * Home icon updated to match Reference 1 with Gentle Olive accent dot.
 */
export const BottomNavBar: React.FC<BottomNavBarProps> = ({ currentTab, onSelectTab }) => {
  return (
    <View style={styles.dockWrapper} pointerEvents="box-none">
      <View style={styles.consoleDock} accessibilityRole="tablist">
        {/* Top Edge Specular Hairline */}
        <View style={styles.dockTopBevel} />

        {/* 1. HOME / PLAY TAB */}
        <TouchableOpacity
          style={[styles.dockItem, currentTab === 'PLAY' && styles.dockItemActive]}
          onPress={() => onSelectTab('PLAY')}
          activeOpacity={0.85}
          hitSlop={{ top: 8, bottom: 8, left: 6, right: 6 }}
          accessibilityRole="tab"
          accessibilityLabel="Home tab"
          accessibilityState={{ selected: currentTab === 'PLAY' }}
        >
          {currentTab === 'PLAY' ? (
            <View style={styles.activePill}>
              <HomeIcon size={16} color={COLORS.activeTabIcon} variant="filled" state="active" />
              <Text style={styles.activeLabel}>Home</Text>
              {/* Reference 1: Gentle Olive accent dot at top perimeter */}
              <View style={styles.activeDot} />
            </View>
          ) : (
            <View style={styles.inactivePill}>
              <HomeIcon size={19} color={COLORS.inactiveTabIcon} variant="outline" state="idle" />
            </View>
          )}
        </TouchableOpacity>

        {/* 2. LEADERBOARD TAB */}
        <TouchableOpacity
          style={[styles.dockItem, currentTab === 'LEADERBOARD' && styles.dockItemActive]}
          onPress={() => onSelectTab('LEADERBOARD')}
          activeOpacity={0.85}
          hitSlop={{ top: 8, bottom: 8, left: 6, right: 6 }}
          accessibilityRole="tab"
          accessibilityLabel="Leaderboard tab"
          accessibilityState={{ selected: currentTab === 'LEADERBOARD' }}
        >
          {currentTab === 'LEADERBOARD' ? (
            <View style={styles.activePill}>
              <LeaderboardIcon size={16} color={COLORS.activeTabIcon} variant="filled" state="active" />
              <Text style={styles.activeLabel}>Ranks</Text>
            </View>
          ) : (
            <View style={styles.inactivePill}>
              <LeaderboardIcon size={19} color={COLORS.inactiveTabIcon} variant="outline" state="idle" />
            </View>
          )}
        </TouchableOpacity>

        {/* 3. PROFILE TAB */}
        <TouchableOpacity
          style={[styles.dockItem, currentTab === 'PROFILE' && styles.dockItemActive]}
          onPress={() => onSelectTab('PROFILE')}
          activeOpacity={0.85}
          hitSlop={{ top: 8, bottom: 8, left: 6, right: 6 }}
          accessibilityRole="tab"
          accessibilityLabel="Profile tab"
          accessibilityState={{ selected: currentTab === 'PROFILE' }}
        >
          {currentTab === 'PROFILE' ? (
            <View style={styles.activePill}>
              <ProfileIcon size={16} color={COLORS.activeTabIcon} variant="filled" state="active" />
              <Text style={styles.activeLabel}>Profile</Text>
            </View>
          ) : (
            <View style={styles.inactivePill}>
              <ProfileIcon size={19} color={COLORS.inactiveTabIcon} variant="outline" state="idle" />
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dockWrapper: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  consoleDock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.floatingDockBg,
    borderRadius: RADIUS.dock,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: COLORS.floatingDockBorder,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.55,
    shadowRadius: 20,
    elevation: 10,
    position: 'relative',
    overflow: 'hidden',
    gap: 4,
  },
  dockTopBevel: {
    position: 'absolute',
    top: 0,
    left: 12,
    right: 12,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  dockItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dockItemActive: {
    transform: [{ scale: 1 }],
  },
  activePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.activeTabBg,
    borderRadius: RADIUS.pill,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 6,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  activeDot: {
    position: 'absolute',
    top: 4,
    right: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.gentleOlive,
  },
  activeLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.activeTabText,
    letterSpacing: -0.2,
  },
  inactivePill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
