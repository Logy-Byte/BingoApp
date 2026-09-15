import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../design/tokens';
import { useTheme } from '../../design/theme';
import { CreateRoomIcon } from '../icons/CustomIcons';

export interface CreateRoomCardProps {
  onCreate: () => void;
  loading?: boolean;
  disabled?: boolean;
  testID?: string;
}

export const CreateRoomCard: React.FC<CreateRoomCardProps> = ({
  onCreate,
  loading = false,
  disabled = false,
  testID = 'create-room-card',
}) => {
  const { theme } = useTheme();

  return (
    <View
      testID={testID}
      style={[
        styles.card,
        {
          backgroundColor: theme.bgCard,
          borderColor: theme.borderSubtle,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={[styles.iconPill, { backgroundColor: theme.accentOliveTint }]}>
          <CreateRoomIcon size={16} color={COLORS.lunarShadow} />
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.title, { color: theme.textPrimary }]}>
            CREATE ROOM
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Host a private match & get a shareable code
          </Text>
        </View>
      </View>

      <TouchableOpacity
        testID="create-room-button"
        style={[
          styles.button,
          {
            backgroundColor: COLORS.gentleOlive,
            borderColor: '#B8C665',
            opacity: disabled || loading ? 0.6 : 1,
          },
        ]}
        onPress={onCreate}
        disabled={disabled || loading}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel="Create Room"
      >
        {loading ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator size="small" color={COLORS.lunarShadow} />
            <Text style={[styles.buttonText, { color: COLORS.lunarShadow }]}>
              CREATING ROOM...
            </Text>
          </View>
        ) : (
          <Text style={[styles.buttonText, { color: COLORS.lunarShadow }]}>
            Create Room
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: RADIUS.control + 4,
    padding: SPACING.md + 2,
    borderWidth: 1.5,
    borderBottomWidth: 3,
    gap: SPACING.md,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  iconPill: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 11,
    marginTop: 2,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  button: {
    height: 44,
    borderRadius: RADIUS.control,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
    letterSpacing: 0.5,
  },
});
