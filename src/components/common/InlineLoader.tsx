import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../design/tokens';

interface InlineLoaderProps {
  size?: number;
  color?: string;
  style?: ViewStyle;
}

export const InlineLoader: React.FC<InlineLoaderProps> = ({
  size = 18,
  color = COLORS.textPrimary,
  style,
}) => {
  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: 'block',
          animation: 'inlineSpin 0.75s linear infinite',
        }}
      >
        <style>{`
          @keyframes inlineSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke={color}
          strokeWidth="2.5"
          strokeOpacity="0.25"
        />
        <path
          d="M12 3a9 9 0 019 9"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
