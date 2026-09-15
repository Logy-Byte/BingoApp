import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../design/tokens';
import { useTheme } from '../../design/theme';
import { CopyIcon, CheckIcon } from '../icons/CustomIcons';

export interface CopyRoomCodeButtonProps {
  code: string;
  testID?: string;
}

export const CopyRoomCodeButton: React.FC<CopyRoomCodeButtonProps> = ({
  code,
  testID = 'copy-code-button',
}) => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const timeoutRef = React.useRef<any>(null);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code);
    }
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <TouchableOpacity
      testID={testID}
      style={[
        styles.button,
        {
          backgroundColor: copied ? theme.accentOlive : theme.bgRecessed,
          borderColor: copied ? '#B8C665' : theme.borderSubtle,
        },
      ]}
      onPress={handleCopy}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={`Copy room code ${code}`}
    >
      <View style={styles.content}>
        {copied ? (
          <CheckIcon size={14} color={COLORS.lunarShadow} />
        ) : (
          <CopyIcon size={14} color={theme.textPrimary} />
        )}
        <Text
          style={[
            styles.text,
            {
              color: copied ? COLORS.lunarShadow : theme.textPrimary,
            },
          ]}
        >
          {copied ? 'Copied' : 'Copy Code'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
    letterSpacing: 0.4,
  },
});
