import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { supabase } from '../lib/supabase';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY, TOUCH_TARGET } from '../design/tokens';
import { useTheme } from '../design/theme';
import { AppIconVector } from '../components/icons/AppIconVector';
import { GameButton } from '../components/common/GameButton';
import { GameInput } from '../components/common/GameInput';
import { PasswordField } from '../components/auth/PasswordField';
import { ProfileIcon as UserIcon, UsersIcon } from '../components/icons/CustomIcons';

interface SignInScreenProps {
  currentName: string;
  onLogin: (name: string, userId?: string) => void;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({
  currentName,
  onLogin,
}) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [serverError, setServerError] = useState<string | undefined>();
  const [successMessage, setSuccessMessage] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    let isValid = true;
    setEmailError(undefined);
    setPasswordError(undefined);
    setServerError(undefined);
    setSuccessMessage(undefined);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setEmailError('Enter your email.');
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        setEmailError('Enter a valid email address.');
        isValid = false;
      }
    }

    if (!password) {
      setPasswordError('Enter your password.');
      isValid = false;
    }

    return isValid;
  };

  async function signInWithEmail() {
    if (loading) return;
    if (!validateForm()) return;

    setLoading(true);
    setServerError(undefined);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password,
    });
    setLoading(false);

    if (error) {
      setServerError('Email or password is incorrect.');
    } else if (data?.user) {
      onLogin(data.user.email?.split('@')[0] || 'Player', data.user.id);
    }
  }

  async function signUpWithEmail() {
    if (loading) return;
    if (!validateForm()) return;

    setLoading(true);
    setServerError(undefined);

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password,
    });
    setLoading(false);

    if (error) {
      setServerError('Something went wrong. Please try again.');
    } else if (data?.user) {
      setSuccessMessage('Please check your email for the login confirmation link!');
    }
  }

  async function handleGuestSubmit() {
    if (loading) return;
    setLoading(true);
    setServerError(undefined);

    const { data, error } = await supabase.auth.signInAnonymously();
    setLoading(false);

    if (error) {
      console.log('Anonymous sign-in not enabled, falling back to local guest session.');
      const localGuestId = `guest-${Math.random().toString(36).substring(2, 10)}`;
      onLogin('Guest Player', localGuestId);
    } else if (data?.user) {
      onLogin('Guest Player', data.user.id);
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.bgCanvas }]}>
      {/* Brand Identity & Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.logoWrap}>
          <Image
            source={require('../assets/app_icon.png')}
            style={styles.logoImage}
            resizeMode="contain"
            accessibilityLabel="Bingo Adventure Compass Icon"
          />
        </View>
        <Text style={[styles.title, { color: theme.textPrimary }]}>Bingo Adventure</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Sign in to save your streaks, XP, and stats
        </Text>
      </View>

      <View style={styles.formContainer}>
        {/* Server error banner */}
        {serverError ? (
          <View style={[styles.messageBanner, { backgroundColor: 'rgba(239, 68, 68, 0.12)', borderColor: COLORS.dangerRed }]}>
            <Text style={[styles.messageText, { color: COLORS.dangerRed }]}>{serverError}</Text>
          </View>
        ) : null}

        {/* Success message banner */}
        {successMessage ? (
          <View style={[styles.messageBanner, { backgroundColor: theme.accentOliveTint, borderColor: COLORS.gentleOlive }]}>
            <Text style={[styles.messageText, { color: COLORS.lunarShadow }]}>{successMessage}</Text>
          </View>
        ) : null}

        <GameInput
          label="EMAIL ADDRESS"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (emailError) setEmailError(undefined);
            if (serverError) setServerError(undefined);
          }}
          placeholder="Enter your email"
          autoCapitalize="none"
          keyboardType="email-address"
          error={emailError}
          icon={<UserIcon size={18} color={theme.textMuted} />}
        />

        <View style={{ height: 12 }} />

        <PasswordField
          label="PASSWORD"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (passwordError) setPasswordError(undefined);
            if (serverError) setServerError(undefined);
          }}
          placeholder="Enter your password"
          error={passwordError}
          disabled={loading}
        />

        <View style={{ flexDirection: 'row', gap: 12, marginTop: SPACING.md }}>
          <View style={{ flex: 1 }}>
            <GameButton
              title={loading ? 'Signing In…' : 'Sign In'}
              onPress={signInWithEmail}
              variant="primary"
              size="lg"
              fullWidth
              disabled={loading}
            />
          </View>
          <View style={{ flex: 1 }}>
            <GameButton
              title="Sign Up"
              onPress={signUpWithEmail}
              variant="secondary"
              size="lg"
              fullWidth
              disabled={loading}
            />
          </View>
        </View>

        <View style={styles.dividerRow}>
          <View style={[styles.dividerLine, { backgroundColor: theme.borderSubtle }]} />
          <Text style={[styles.dividerText, { color: theme.textMuted }]}>or</Text>
          <View style={[styles.dividerLine, { backgroundColor: theme.borderSubtle }]} />
        </View>

        <TouchableOpacity
          style={styles.guestLink}
          onPress={handleGuestSubmit}
          disabled={loading}
          accessibilityRole="button"
          accessibilityLabel="Quick guest play"
        >
          {loading ? (
            <ActivityIndicator size="small" color={theme.textPrimary} />
          ) : (
            <Text style={[styles.guestLinkText, { color: theme.textSecondary }]}>
              Continue as Anonymous Guest • Instant Play
            </Text>
          )}
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
  logoImage: {
    width: 96,
    height: 96,
    borderRadius: 24,
    shadowColor: COLORS.primaryOrange,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 6,
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
  eyeBtn: {
    padding: SPACING.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageBanner: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: RADIUS.compact,
    borderWidth: 1,
    marginBottom: SPACING.sm,
  },
  messageText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: TYPOGRAPHY.fontFamily,
    textAlign: 'center',
  },
  qaContainer: {
    marginTop: SPACING.xl,
    padding: SPACING.md,
    borderRadius: RADIUS.control,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  qaHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  qaHeaderText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  qaSubtitle: {
    fontSize: 11,
    marginBottom: SPACING.sm,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  qaButtonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  qaBtn: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: RADIUS.compact,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qaBtnText: {
    fontSize: 11,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});

