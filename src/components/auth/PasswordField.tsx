import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY, TOUCH_TARGET } from '../../design/tokens';
import { useTheme } from '../../design/theme';
import { EyeIcon, EyeSlashIcon } from '../icons/CustomIcons';

export interface PasswordFieldProps extends Omit<TextInputProps, 'secureTextEntry' | 'style'> {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  testID?: string;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  label = 'PASSWORD',
  value,
  onChangeText,
  placeholder = 'Enter your password',
  error,
  containerStyle,
  disabled = false,
  testID,
  ...restProps
}) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.wrapper, containerStyle]} testID={testID}>
      {label && (
        <Text style={[styles.label, { color: theme.textSecondary }]}>
          {label}
        </Text>
      )}

      <View
        style={[
          styles.fieldContainer,
          {
            backgroundColor: theme.bgRecessed,
            borderColor: error
              ? COLORS.dangerRed
              : isFocused
              ? COLORS.gentleOlive
              : theme.borderSubtle,
            opacity: disabled ? 0.6 : 1,
          },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            {
              color: theme.textPrimary,
              fontFamily: TYPOGRAPHY.fontFamily,
            },
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.textMuted}
          secureTextEntry={!isVisible}
          testID={testID ? `${testID}-input` : 'password-text-input'}
          editable={!disabled}
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          accessibilityRole="none"
          accessibilityLabel={label}
          {...restProps}
        />

        {/* Eye Toggle Control: Strictly fixed width & height to prevent layout shift */}
        <TouchableOpacity
          style={styles.eyeBtn}
          onPress={() => setIsVisible((prev) => !prev)}
          hitSlop={TOUCH_TARGET.hitSlop}
          disabled={disabled}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={isVisible ? 'Hide password' : 'Show password'}
          accessibilityState={{ selected: isVisible }}
        >
          {isVisible ? (
            <EyeSlashIcon size={18} color={theme.textSecondary} />
          ) : (
            <EyeIcon size={18} color={theme.textSecondary} />
          )}
        </TouchableOpacity>
      </View>

      {error ? (
        <Text style={[styles.errorText, { color: COLORS.dangerRed }]}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: SPACING.sm,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    fontFamily: TYPOGRAPHY.fontFamily,
    marginBottom: SPACING.xs,
    textTransform: 'uppercase',
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: RADIUS.control,
    borderWidth: 1.5,
    paddingLeft: SPACING.md,
    paddingRight: SPACING.xs,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    paddingVertical: 0,
    height: '100%',
  },
  eyeBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});
