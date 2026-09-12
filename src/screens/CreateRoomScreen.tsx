import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { RouteHeader } from '../components/common/RouteHeader';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../design/tokens';
import { RoomPrivacy } from '../domain/types';
import { LockIcon, UnlockIcon, CreateRoomIcon } from '../components/icons/CustomIcons';
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
      onCreateRoom(roomName || 'Invitational Match', privacy, password);
      setIsSubmitting(false);
    }, 200);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bgCanvas }]}>
      <RouteHeader title="Host Match" onBack={onBack} />

      <View style={styles.contentWrap}>
        <View
          style={[
            styles.formCard,
            {
              backgroundColor: theme.bgCard,
              borderColor: theme.borderSubtle,
            },
          ]}
        >
          {/* ROOM NAME */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>Room name</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.bgRecessed,
                  borderColor: theme.borderSubtle,
                  color: theme.textPrimary,
                },
              ]}
              placeholder="e.g. Friendly Arena"
              placeholderTextColor={theme.textMuted}
              value={roomName}
              onChangeText={setRoomName}
              maxLength={24}
            />
          </View>

          {/* BOARD RULES INFO */}
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
              Game specifications
            </Text>
            <Text style={[styles.rulesLockedText, { color: theme.textSecondary }]}>
              • 5×5 grid (25 cells)
            </Text>
            <Text style={[styles.rulesLockedText, { color: theme.textSecondary }]}>
              • Numbers 1 through 25
            </Text>
            <Text style={[styles.rulesLockedText, { color: theme.textSecondary }]}>
              • 2 player capacity
            </Text>
          </View>

          {/* PRIVACY TOGGLE */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>Access control</Text>
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
                  Public
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
            <View style={styles.fieldGroup}>
              <Text style={[styles.label, { color: theme.textSecondary }]}>4-digit passcode</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.bgRecessed,
                    borderColor: theme.borderSubtle,
                    color: theme.textPrimary,
                  },
                ]}
                placeholder="e.g. 1234"
                placeholderTextColor={theme.textMuted}
                value={password}
                onChangeText={setPassword}
                keyboardType="numeric"
                maxLength={4}
                secureTextEntry
              />
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.createSubmitBtn,
              {
                backgroundColor: COLORS.gentleOlive,
                borderColor: '#D7E28E',
              },
            ]}
            onPress={handleCreate}
            disabled={isSubmitting}
            activeOpacity={0.88}
            accessibilityRole="button"
            accessibilityLabel="Create Room"
          >
            <Text style={styles.createSubmitBtnText}>CREATE ROOM ↗</Text>
          </TouchableOpacity>
        </View>
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
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  fieldGroup: {
    gap: SPACING.xs, // 4px
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  input: {
    borderRadius: RADIUS.control, // 12px
    paddingVertical: SPACING.md, // 12px
    paddingHorizontal: SPACING.md, // 12px
    fontSize: 14,
    borderWidth: 1,
    fontFamily: TYPOGRAPHY.fontFamily,
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
  createSubmitBtn: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: RADIUS.sheet, // 28px
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    shadowColor: COLORS.gentleOlive,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    marginTop: SPACING.xs,
  },
  createSubmitBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.lunarShadow,
    letterSpacing: 0.5,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});
