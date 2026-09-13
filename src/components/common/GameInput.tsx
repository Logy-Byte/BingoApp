import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../design/tokens';
import { useTheme } from '../../design/theme';

export interface GameInputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  rightAction?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

export const GameInput: React.FC<GameInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  icon,
  rightAction,
  containerStyle,
  ...restProps
}) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && (
        <Text style={[styles.label, { color: theme.textSecondary }]}>
          {label}
        </Text>
      )}

      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: theme.bgRecessed,
            borderColor: error
              ? COLORS.dangerRed
              : isFocused
              ? COLORS.gentleOlive
              : theme.borderSubtle,
          },
        ]}
      >
        {icon && <View style={styles.iconWrap}>{icon}</View>}

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
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...restProps}
        />

        {rightAction && <View style={styles.actionWrap}>{rightAction}</View>}
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
    marginBottom: SPACING.sm, // 8px
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: TYPOGRAPHY.fontFamily,
    marginBottom: SPACING.xs, // 4px
    letterSpacing: -0.1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: RADIUS.control, // 12px
    borderWidth: 1.5,
    paddingHorizontal: SPACING.md, // 12px
  },
  iconWrap: {
    marginRight: SPACING.sm, // 8px
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    paddingVertical: 0,
  },
  actionWrap: {
    marginLeft: SPACING.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 4,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});
