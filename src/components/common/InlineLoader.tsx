import React from 'react';
import { View, StyleSheet, ViewStyle, ActivityIndicator } from 'react-native';
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
      <ActivityIndicator size={size > 20 ? 'large' : 'small'} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
