import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { supabase } from '../lib/supabase';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../design/tokens';
import { useTheme } from '../design/theme';
import { AppIconVector } from '../components/icons/AppIconVector';
import { GameButton } from '../components/common/GameButton';
import { GameInput } from '../components/common/GameInput';
import { ProfileIcon as UserIcon, GoogleIcon, FacebookIcon } from '../components/icons/CustomIcons';

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
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    setLoading(false);

    if (error) Alert.alert('Sign In Failed', error.message);
    else if (data.user) {
      // In a full implementation, we'd fetch the user's name from the profiles table here
      onLogin(data.user.email?.split('@')[0] || 'Player', data.user.id);
    }
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    setLoading(false);

    if (error) Alert.alert('Sign Up Failed', error.message);
    else if (data.user) {
      Alert.alert('Success', 'Please check your email for the login link!');
    }
  }

  async function handleGuestSubmit() {
    setLoading(true);
    const { data, error } = await supabase.auth.signInAnonymously();
    setLoading(false);

    if (error) Alert.alert('Guest Login Failed', error.message);
    else if (data.user) {
      onLogin('Guest Player', data.user.id);
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.bgCanvas }]}>
      {/* Brand Identity & Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.logoWrap}>
          <AppIconVector size={80} />
        </View>
        <Text style={[styles.title, { color: theme.textPrimary }]}>Bingo Clash Pro</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Sign in to save your coins, gems, and stats
        </Text>
      </View>

      <View style={styles.formContainer}>
        <GameInput
          label="EMAIL ADDRESS"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          autoCapitalize="none"
          keyboardType="email-address"
          icon={<UserIcon size={18} color={theme.textMuted} />}
        />
        
        <View style={{ height: 12 }} />

        <GameInput
          label="PASSWORD"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
          autoCapitalize="none"
        />

        <View style={{ flexDirection: 'row', gap: 12, marginTop: SPACING.md }}>
          <View style={{ flex: 1 }}>
            <GameButton
              title="Sign In"
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
