import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { RouteHeader } from '../components/common/RouteHeader';
import { GameButton } from '../components/common/GameButton';
import { GameInput } from '../components/common/GameInput';
import { GameCard } from '../components/common/GameCard';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../design/tokens';
import { RoomPrivacy } from '../domain/types';
import { LockIcon, UnlockIcon } from '../components/icons/CustomIcons';
import { useTheme } from '../design/theme';

interface CreateRoomScreenProps {
  onCreateRoom: (name: string, privacy: RoomPrivacy, password?: string) => void;
  onBack: () => void;
}

export const CreateRoomScreen: React.FC<CreateRoomScreenProps> = ({
  onCreateRoom,
  onBack,
}) => {
  const { theme } = useTheme();
  const [roomName, setRoomName] = useState('');
  const [privacy, setPrivacy] = useState<RoomPrivacy>('open');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onCreateRoom(roomName.trim() || 'Friendly Arena', privacy, password.trim());
      setIsSubmitting(false);
    }, 200);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bgCanvas }]}>
      <RouteHeader title="Create Room" onBack={onBack} />

      <View style={styles.contentWrap}>
        <GameCard
          style={[
            styles.formCard,
            {
              backgroundColor: theme.bgCard,
              borderColor: theme.borderSubtle,
            },
          ]}
        >
          {/* ROOM NAME INPUT */}
          <GameInput
            label="ROOM NAME"
            value={roomName}
            onChangeText={setRoomName}
            placeholder="e.g. Friendly Arena"
            maxLength={24}
          />

          {/* FIXED 5x5 BOARD RULES SPECS */}
          <View
            style={[
              styles.rulesLockedBox,
              {
                backgroundColor: theme.bgRecessed,
                borderColor: theme.borderSubtle,
              },
            ]}
          >
            <Text style={[styles.rulesLockedTitle, { color: theme.textPrimary }]}>
              Match Specifications
            </Text>
            <Text style={[styles.rulesLockedText, { color: theme.textSecondary }]}>
              • 5×5 Grid (25 Cells, Numbers 1–25)
            </Text>
            <Text style={[styles.rulesLockedText, { color: theme.textSecondary }]}>
              • 2–4 Players Supported
            </Text>
            <Text style={[styles.rulesLockedText, { color: theme.textSecondary }]}>
              • Authoritative Anti-Cheat Validation
            </Text>
          </View>

          {/* PRIVACY TOGGLE (Segmented Capsule Pill derived from Dock grammar) */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>ACCESS CONTROL</Text>
            <View
              style={[
                styles.privacySelector,
                { backgroundColor: theme.bgRecessed, borderColor: theme.borderSubtle },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.privacyBtn,
                  privacy === 'open' && styles.privacyBtnActive,
                  privacy === 'open' && { backgroundColor: COLORS.cleanWhite },
                ]}
                onPress={() => setPrivacy('open')}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel="Public Room"
              >
                <UnlockIcon
                  size={14}
                  color={privacy === 'open' ? COLORS.lunarShadow : theme.textMuted}
                />
                <Text
                  style={[
                    styles.privacyBtnText,
                    { color: privacy === 'open' ? COLORS.lunarShadow : theme.textMuted },
                  ]}
                >
                  Public Room
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.privacyBtn,
                  privacy === 'password' && styles.privacyBtnActive,
                  privacy === 'password' && { backgroundColor: COLORS.cleanWhite },
                ]}
                onPress={() => setPrivacy('password')}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel="Password Protected"
              >
                <LockIcon
                  size={14}
                  color={privacy === 'password' ? COLORS.lunarShadow : theme.textMuted}
                />
                <Text
                  style={[
                    styles.privacyBtnText,
                    { color: privacy === 'password' ? COLORS.lunarShadow : theme.textMuted },
                  ]}
                >
                  Passcode
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* PASSWORD INPUT (IF PRIVATE) */}
          {privacy === 'password' && (
            <GameInput
              label="4-DIGIT PASSCODE"
              value={password}
              onChangeText={setPassword}
              placeholder="e.g. 1234"
              keyboardType="numeric"
              maxLength={4}
              secureTextEntry
              icon={<LockIcon size={16} color={theme.textMuted} />}
            />
          )}

          <GameButton
            title="Create & Host Match ↗"
            onPress={handleCreate}
            variant="primary"
            size="lg"
            fullWidth
            loading={isSubmitting}
            style={styles.submitBtn}
          />
        </GameCard>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrap: {
    padding: SPACING.lg, // 16px
  },
  formCard: {
    padding: SPACING.lg, // 16px
    borderRadius: RADIUS.hero, // 24px
    borderWidth: 1,
    gap: SPACING.md, // 12px
    elevation: 2,
  },
  fieldGroup: {
    gap: SPACING.xs, // 4px
    marginBottom: SPACING.xs,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
    letterSpacing: -0.1,
  },
  rulesLockedBox: {
    borderRadius: RADIUS.control, // 12px
    padding: SPACING.md, // 12px
    gap: 4,
    borderWidth: 1,
  },
  rulesLockedTitle: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 2,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  rulesLockedText: {
    fontSize: 11,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  privacySelector: {
    flexDirection: 'row',
    borderRadius: RADIUS.pill,
    padding: 3,
    borderWidth: 1,
    gap: 4,
  },
  privacyBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm, // 8px
    borderRadius: RADIUS.pill,
    gap: 6,
  },
  privacyBtnActive: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  privacyBtnText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  submitBtn: {
    marginTop: SPACING.xs,
  },
});
