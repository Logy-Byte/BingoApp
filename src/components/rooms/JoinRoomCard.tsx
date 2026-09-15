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
import { RoomCodeInput } from './RoomCodeInput';
import { JoinRoomIcon } from '../icons/CustomIcons';

export interface JoinRoomCardProps {
  value: string;
  onChange: (code: string) => void;
  onJoin: () => void;
  loading?: boolean;
  disabled?: boolean;
  error?: string;
  testID?: string;
}

export const JoinRoomCard: React.FC<JoinRoomCardProps> = ({
  value,
  onChange,
  onJoin,
  loading = false,
  disabled = false,
  error,
  testID = 'join-room-card',
}) => {
  const { theme } = useTheme();

  return (
    <View
      testID={testID}
      style={[
        styles.card,
        {
          backgroundColor: theme.bgCard,
          borderColor: error ? COLORS.dangerRed : theme.borderSubtle,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={[styles.iconPill, { backgroundColor: theme.accentHazelTint }]}>
          <JoinRoomIcon size={16} color="#8A6724" />
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.title, { color: theme.textPrimary }]}>
            JOIN ROOM
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Enter the 6-character room code from your host
          </Text>
        </View>
      </View>

      <RoomCodeInput
        value={value}
        onChangeText={onChange}
        disabled={loading || disabled}
      />

      {error ? (
        <View
          style={[
            styles.errorBanner,
            {
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              borderColor: COLORS.dangerRed,
            },
          ]}
        >
          <Text style={[styles.errorText, { color: COLORS.dangerRed }]}>
            {error}
          </Text>
        </View>
      ) : null}

      <TouchableOpacity
        testID="join-room-button"
        style={[
          styles.button,
          {
            backgroundColor: theme.accentHazelTint,
            borderColor: COLORS.winterHazel,
            opacity: disabled || loading || !value.trim() ? 0.6 : 1,
          },
        ]}
        onPress={onJoin}
        disabled={disabled || loading || !value.trim()}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel="Join Room"
      >
        {loading ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator size="small" color="#8A6724" />
            <Text style={[styles.buttonText, { color: '#8A6724' }]}>
              JOINING ROOM...
            </Text>
          </View>
        ) : (
          <Text style={[styles.buttonText, { color: '#8A6724' }]}>
            Join Room
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
    gap: SPACING.sm,
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
  errorBanner: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
  },
  errorText: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
    textAlign: 'center',
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
