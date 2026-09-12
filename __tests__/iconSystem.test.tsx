import React from 'react';
import { ICON_DEFINITIONS } from '../src/components/icons/iconPaths';
import { resolveIconColor } from '../src/components/icons/Icon';
import { ICON_COLORS, ICON_SIZES } from '../src/design/tokens';
import { IconName, IconFamily } from '../src/components/icons/types';

describe('Global Premium Animated Icon System', () => {
  const allIconNames = Object.keys(ICON_DEFINITIONS) as IconName[];

  test('contains all mandated icon definitions on 24x24 grid', () => {
    expect(allIconNames.length).toBeGreaterThanOrEqual(40);

    // Required Families
    const requiredIcons: IconName[] = [
      // Navigation
      'play', 'leaderboard', 'profile',
      // Gameplay
      'bingo', 'number', 'mark', 'unmark', 'next', 'previous', 'shuffle', 'pause', 'resume', 'finish', 'winner',
      // Game Modes
      'solo', 'ranked', 'multiplayer', 'daily', 'private_room', 'join_room', 'create_room',
      // Player
      'avatar', 'level', 'rank', 'trophy', 'streak', 'achievement', 'history', 'statistics',
      // Utility
      'search', 'settings', 'notifications', 'sound', 'mute', 'vibration', 'speech', 'information', 'help', 'close', 'back', 'more',
      // State
      'success', 'warning', 'error', 'locked', 'unlocked', 'loading', 'refresh',
    ];

    requiredIcons.forEach((name) => {
      expect(ICON_DEFINITIONS[name]).toBeDefined();
      expect(ICON_DEFINITIONS[name].viewBox).toBe('0 0 24 24');
    });
  });

  test('all icons belong to valid semantic families', () => {
    const validFamilies: IconFamily[] = [
      'navigation',
      'gameplay',
      'modes',
      'player',
      'utility',
      'state',
    ];

    allIconNames.forEach((name) => {
      const def = ICON_DEFINITIONS[name];
      expect(validFamilies).toContain(def.family);
      // Ensure every icon has at least one path, circle, or rect
      const hasGeometry =
        (def.paths && def.paths.length > 0) ||
        (def.circles && def.circles.length > 0) ||
        (def.rects && def.rects.length > 0) ||
        (def.filledPaths && def.filledPaths.length > 0);
      expect(hasGeometry).toBe(true);
    });
  });

  test('original Bingo Identity mark is geometrically defined', () => {
    const bingoDef = ICON_DEFINITIONS['bingo'];
    expect(bingoDef).toBeDefined();
    expect(bingoDef.family).toBe('gameplay');
    expect(bingoDef.paths).toBeDefined();
    expect(bingoDef.paths!.length).toBeGreaterThanOrEqual(2); // Outer star + central nexus dot
    expect(bingoDef.filledPaths).toBeDefined();
  });

  test('semantic color resolver handles all standard icon states', () => {
    expect(resolveIconColor(undefined, 'idle', 'outline')).toBe(ICON_COLORS.primary);
    expect(resolveIconColor(undefined, 'disabled', 'outline')).toBe(ICON_COLORS.disabled);
    expect(resolveIconColor(undefined, 'success', 'outline')).toBe(ICON_COLORS.playEmerald);
    expect(resolveIconColor(undefined, 'attention', 'outline')).toBe(ICON_COLORS.gold);
    expect(resolveIconColor(undefined, 'active', 'filled')).toBe(ICON_COLORS.active);
    expect(resolveIconColor(undefined, 'active', 'outline')).toBe(ICON_COLORS.playEmerald);
    expect(resolveIconColor('#FF0000', 'idle', 'outline')).toBe('#FF0000');
  });

  test('standard icon sizes conform to 4px spacing grid', () => {
    expect(ICON_SIZES.compact).toBe(16);
    expect(ICON_SIZES.sm).toBe(20);
    expect(ICON_SIZES.md).toBe(24);
    expect(ICON_SIZES.lg).toBe(28);
    expect(ICON_SIZES.xl).toBe(32);
    expect(ICON_SIZES.xxl).toBe(40);
    expect(ICON_SIZES.hero).toBe(48);
  });
});
