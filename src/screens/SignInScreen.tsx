import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../design/tokens';
import { useTheme } from '../design/theme';
import { AppIconVector } from '../components/icons/AppIconVector';
import { GameButton } from '../components/common/GameButton';
import { GameInput } from '../components/common/GameInput';
import { ProfileIcon as UserIcon, GoogleIcon, FacebookIcon } from '../components/icons/CustomIcons';

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
      {/* Brand Identity & Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.logoWrap}>
          <AppIconVector size={80} />
        </View>
        <Text style={[styles.title, { color: theme.textPrimary }]}>Bingo Clash Pro</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Sign in to track seasonal MMR & rankings
        </Text>
      </View>

      <View style={styles.formContainer}>
        <GameInput
          label="PLAYER USERNAME"
          value={username}
          onChangeText={setUsername}
          placeholder="Enter username"
          autoCapitalize="words"
          maxLength={20}
          icon={<UserIcon size={18} color={theme.textMuted} />}
        />

        <GameButton
          title="Continue as Guest"
          onPress={handleGuestSubmit}
          variant="primary"
          size="lg"
          fullWidth
          style={styles.actionBtn}
        />

        <View style={styles.dividerRow}>
          <View style={[styles.dividerLine, { backgroundColor: theme.borderSubtle }]} />
          <Text style={[styles.dividerText, { color: theme.textMuted }]}>or connect with</Text>
          <View style={[styles.dividerLine, { backgroundColor: theme.borderSubtle }]} />
        </View>

        {/* Social Authentication with Authentic Branded Vector Icons */}
        <View style={styles.socialRow}>
          <TouchableOpacity
            style={[
              styles.socialBrandBtn,
              {
                backgroundColor: theme.bgCard,
                borderColor: theme.borderSubtle,
              },
            ]}
            onPress={() => onLogin('Alex (Google)')}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Sign in with Google"
          >
            <GoogleIcon size={20} />
            <Text style={[styles.socialBtnText, { color: theme.textPrimary }]}>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.socialBrandBtn,
              {
                backgroundColor: theme.bgCard,
                borderColor: theme.borderSubtle,
              },
            ]}
            onPress={() => onLogin('Jordan (Facebook)')}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Sign in with Facebook"
          >
            <FacebookIcon size={20} />
            <Text style={[styles.socialBtnText, { color: theme.textPrimary }]}>Facebook</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.guestLink}
          onPress={handleGuestSubmit}
          accessibilityRole="button"
          accessibilityLabel="Quick guest play"
        >
          <Text style={[styles.guestLinkText, { color: theme.textSecondary }]}>
            Skip for now • Instant Play
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
    marginBottom: SPACING.xxl,
  },
  logoWrap: {
    marginBottom: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.4,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  subtitle: {
    fontSize: 13,
    marginTop: 4,
    fontFamily: TYPOGRAPHY.fontFamily,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 340,
  },
  actionBtn: {
    marginTop: SPACING.xs,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 11,
    marginHorizontal: SPACING.sm,
    fontWeight: '600',
    letterSpacing: 0.2,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  socialRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    width: '100%',
  },
  socialBrandBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: RADIUS.control,
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  socialBtnText: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  guestLink: {
    alignItems: 'center',
    marginTop: SPACING.lg,
    padding: SPACING.xs,
  },
  guestLinkText: {
    fontSize: 12,
    fontWeight: '600',
    textDecorationLine: 'underline',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});
