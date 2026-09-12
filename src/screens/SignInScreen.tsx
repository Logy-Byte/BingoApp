import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../design/tokens';
import { useTheme } from '../design/theme';
import { ProfileIcon as UserIcon } from '../components/icons/CustomIcons';

interface SignInScreenProps {
  currentName: string;
  onLogin: (name: string) => void;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({
  currentName,
  onLogin,
}) => {
  const { theme } = useTheme();
  const [username, setUsername] = useState(currentName || 'Jiyer Kame');

  const handleGuestSubmit = () => {
    const finalName = username.trim() || 'Player_Guest';
    onLogin(finalName);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bgCanvas }]}>
      <View style={styles.headerSection}>
        <View style={styles.avatarCircle}>
          <UserIcon size={56} color="#FFFFFF" />
        </View>
        <Text style={[styles.title, { color: theme.textPrimary }]}>Enter name and Login</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.bgCard,
              color: theme.textPrimary,
              borderColor: theme.borderSubtle,
            },
          ]}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter Username"
          placeholderTextColor={theme.textMuted}
          autoCapitalize="words"
        />

        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: COLORS.gentleOlive }]}
          onPress={handleGuestSubmit}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>Continue</Text>
        </TouchableOpacity>

        <View style={styles.dividerRow}>
          <View style={[styles.dividerLine, { backgroundColor: theme.borderSubtle }]} />
          <Text style={[styles.dividerText, { color: theme.textMuted }]}>or sign in with</Text>
          <View style={[styles.dividerLine, { backgroundColor: theme.borderSubtle }]} />
        </View>

        {/* Social Buttons matching storyboard (Google Red, Facebook Blue) */}
        <TouchableOpacity
          style={[styles.socialButton, { backgroundColor: '#EA4335' }]}
          onPress={() => onLogin('Google_User')}
          activeOpacity={0.8}
        >
          <Text style={styles.socialButtonText}>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialButton, { backgroundColor: '#1877F2' }]}
          onPress={() => onLogin('FB_User')}
          activeOpacity={0.8}
        >
          <Text style={styles.socialButtonText}>Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.guestLink}
          onPress={handleGuestSubmit}
        >
          <Text style={[styles.guestLinkText, { color: theme.textSecondary }]}>
            Login with email / Guest
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: SPACING.xl * 1.5,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
    borderWidth: 4,
    borderColor: '#93C5FD',
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  formContainer: {
    width: '100%',
    maxWidth: 340,
    gap: SPACING.md,
  },
  input: {
    height: 52,
    borderRadius: RADIUS.surface,
    borderWidth: 1.5,
    paddingHorizontal: SPACING.md,
    fontSize: 15,
    fontWeight: '600',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  primaryButton: {
    height: 52,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F172A',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.xs,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 12,
    marginHorizontal: SPACING.sm,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  socialButton: {
    height: 48,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  socialButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  guestLink: {
    alignItems: 'center',
    marginTop: SPACING.sm,
    padding: SPACING.xs,
  },
  guestLinkText: {
    fontSize: 13,
    fontWeight: '600',
    textDecorationLine: 'underline',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});
