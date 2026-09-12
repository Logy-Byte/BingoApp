import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { GameButton } from '../components/common/GameButton';
import { GameCard } from '../components/common/GameCard';
import { RouteHeader } from '../components/common/RouteHeader';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../design/tokens';
import { LockIcon, JoinRoomIcon } from '../components/icons/CustomIcons';
import { useTheme } from '../design/theme';

interface JoinRoomScreenProps {
  onJoin: (roomId: string, password?: string) => void;
  onBack: () => void;
  initialRoomId?: string;
  errorMessage?: string;
}

export const JoinRoomScreen: React.FC<JoinRoomScreenProps> = ({
  onJoin,
  onBack,
  initialRoomId = '',
  errorMessage,
}) => {
  const { theme } = useTheme();
  const [roomId, setRoomId] = useState(initialRoomId);
  const [password, setPassword] = useState('');
  const [isJoining, setIsJoining] = useState(false);

  const handleJoin = () => {
    if (!roomId.trim()) return;
    setIsJoining(true);
    setTimeout(() => {
      onJoin(roomId.trim().toUpperCase(), password.trim());
      setIsJoining(false);
    }, 250);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bgCanvas }]}>
      <RouteHeader title="Join room" onBack={onBack} />

      <View style={styles.contentWrap}>
        <GameCard
          style={[
            styles.card,
            {
              backgroundColor: theme.bgCard,
              borderColor: theme.borderSubtle,
            },
          ]}
        >
          <Text style={[styles.cardDesc, { color: theme.textSecondary }]}>
            Enter the 6-character room code provided by the host.
          </Text>

          {errorMessage && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          )}

          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>Room code</Text>
            <TextInput
              style={[
                styles.codeInput,
                {
                  backgroundColor: theme.bgRecessed,
                  borderColor: theme.accentOlive,
                  color: theme.textPrimary,
                },
              ]}
              placeholder="e.g. K9X2P7"
              placeholderTextColor={theme.textMuted}
              value={roomId}
              onChangeText={(txt) => setRoomId(txt.toUpperCase())}
              autoCapitalize="characters"
              maxLength={6}
            />
          </View>

          <View style={styles.fieldGroup}>
            <View style={styles.passLabelRow}>
              <LockIcon size={14} color={theme.textSecondary} />
              <Text style={[styles.label, { color: theme.textSecondary }]}>Passcode (if private)</Text>
            </View>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.bgRecessed,
                  borderColor: theme.borderSubtle,
                  color: theme.textPrimary,
                },
              ]}
              placeholder="Passcode"
              placeholderTextColor={theme.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              maxLength={12}
            />
          </View>

          <GameButton
            title="Join room"
            icon={<JoinRoomIcon size={18} color={theme.textDark} />}
            variant="primary"
            size="lg"
            loading={isJoining}
            disabled={roomId.trim().length < 6}
            onPress={handleJoin}
            style={styles.joinBtn}
          />
        </GameCard>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
  },
  contentWrap: {
    padding: SPACING.lg, // 16px
  },
  card: {
    padding: SPACING.lg, // 16px
    backgroundColor: COLORS.surfaceDeep,
    borderColor: COLORS.floatingDockBorder,
  },
  cardDesc: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg, // 16px
    lineHeight: 18,
  },
  errorBox: {
    backgroundColor: 'rgba(215, 100, 100, 0.12)',
    borderWidth: 1,
    borderColor: COLORS.dangerRed,
    borderRadius: RADIUS.control, // 12px
    padding: SPACING.sm, // 8px
    marginBottom: SPACING.md, // 12px
  },
  errorText: {
    color: COLORS.dangerRed,
    fontSize: 12,
    fontWeight: '600',
  },
  fieldGroup: {
    marginBottom: SPACING.md, // 12px
  },
  passLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs, // 4px
    marginBottom: SPACING.xs, // 4px
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs, // 4px
  },
  codeInput: {
    backgroundColor: COLORS.surfaceRaised,
    borderWidth: 1.5,
    borderColor: COLORS.playEmerald,
    borderRadius: RADIUS.control, // 12px
    paddingHorizontal: SPACING.md, // 12px
    paddingVertical: SPACING.md, // 12px
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 4,
    textAlign: 'center',
    fontFamily: TYPOGRAPHY.monoFamily,
  },
  input: {
    backgroundColor: COLORS.surfaceRaised,
    borderWidth: 1,
    borderColor: COLORS.floatingDockBorder,
    borderRadius: RADIUS.control, // 12px
    paddingHorizontal: SPACING.lg, // 16px
    paddingVertical: SPACING.md, // 12px
    color: COLORS.textPrimary,
    fontSize: 14,
  },
  joinBtn: {
    marginTop: SPACING.md, // 12px
  },
});
