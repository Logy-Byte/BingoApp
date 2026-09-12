import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../../design/tokens';
import { LockIcon } from '../icons/CustomIcons';

interface RoomCodeBadgeProps {
  roomId: string;
  isPrivate?: boolean;
}

export const RoomCodeBadge: React.FC<RoomCodeBadgeProps> = ({ roomId, isPrivate = false }) => {
  return (
    <View style={styles.badge}>
      <View style={styles.topBevel} />
      <Text style={styles.label}>ROOM IDENTIFIER</Text>
      <View style={styles.row}>
        <Text style={styles.code}>#{roomId}</Text>
        {isPrivate && <LockIcon size={14} color={COLORS.goldPrimary} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: COLORS.surfaceRaised,
    paddingVertical: SPACING.sm, // 8px
    paddingHorizontal: SPACING.md, // 12px
    borderRadius: RADIUS.compact, // 8px
    borderWidth: 1,
    borderColor: COLORS.floatingDockBorder,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  topBevel: {
    position: 'absolute',
    top: 0,
    left: 8,
    right: 8,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
  },
  label: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 0.8,
    marginBottom: SPACING.xs, // 4px
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs, // 4px
  },
  code: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.goldPrimary,
    letterSpacing: 2,
  },
});
