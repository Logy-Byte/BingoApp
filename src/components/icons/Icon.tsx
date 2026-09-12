import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { BaseIconProps, IconName, IconState, IconVariant } from './types';
import { ICON_DEFINITIONS } from './iconPaths';
import { ICON_COLORS, ICON_SIZES } from '../../design/tokens';

export interface IconProps extends BaseIconProps {
  name: IconName;
}

/**
 * Resolve semantic color based on token, state, and explicit color props
 */
export function resolveIconColor(
  explicitColor?: string,
  state: IconState = 'idle',
  variant: IconVariant = 'outline'
): string {
  if (explicitColor) return explicitColor;

  if (state === 'disabled') return ICON_COLORS.disabled;
  if (state === 'success') return ICON_COLORS.playEmerald;
  if (state === 'attention') return ICON_COLORS.gold;
  if (state === 'active' || state === 'selected') {
    return variant === 'filled' ? ICON_COLORS.active : ICON_COLORS.playEmerald;
  }

  return ICON_COLORS.primary;
}

/**
 * Universal SVG Icon Primitive
 * Mobile-first, crisp vector rendering across iOS, Android, and Web
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size = ICON_SIZES.md,
  color,
  secondaryColor,
  strokeWidth = 2,
  variant = 'outline',
  state = 'idle',
  direction,
  style,
  accessibilityLabel,
  accessibilityRole = 'image',
}) => {
  const definition = ICON_DEFINITIONS[name];
  if (!definition) {
    console.warn(`[IconSystem] Icon "${name}" not found in definition dictionary.`);
    return null;
  }

  const primaryColor = resolveIconColor(color, state, variant);
  const secColor =
    secondaryColor ||
    (variant === 'duotone' ? `${primaryColor}40` : primaryColor);

  const isFilled = variant === 'filled' || state === 'active' || state === 'selected';
  const hasFilledDefinition = isFilled && definition.filledPaths && definition.filledPaths.length > 0;

  // Handle chevron directional rotation
  let rotationTransform = '';
  if (name === 'chevron' && direction) {
    switch (direction) {
      case 'right':
        rotationTransform = 'rotate(180deg)';
        break;
      case 'up':
        rotationTransform = 'rotate(90deg)';
        break;
      case 'down':
        rotationTransform = 'rotate(270deg)';
        break;
      case 'left':
      default:
        rotationTransform = 'rotate(0deg)';
        break;
    }
  }

  const pathsToRender = hasFilledDefinition ? definition.filledPaths! : definition.paths || [];

  const svgContent = (
    <svg
      width={size}
      height={size}
      viewBox={definition.viewBox || '0 0 24 24'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        display: 'block',
        transform: rotationTransform || undefined,
        transformOrigin: 'center',
        transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      aria-hidden={!accessibilityLabel}
    >
      {/* Rectangles */}
      {definition.rects?.map((rect, idx) => (
        <rect
          key={`r-${idx}`}
          x={rect.x}
          y={rect.y}
          width={rect.width}
          height={rect.height}
          rx={rect.rx}
          ry={rect.ry}
          fill={
            rect.fill === 'currentColor'
              ? primaryColor
              : rect.fill || (hasFilledDefinition ? primaryColor : 'none')
          }
          stroke={rect.stroke || (hasFilledDefinition ? 'none' : primaryColor)}
          strokeWidth={rect.strokeWidth || strokeWidth}
          opacity={rect.opacity ?? 1}
        />
      ))}

      {/* Circles */}
      {definition.circles?.map((c, idx) => (
        <circle
          key={`c-${idx}`}
          cx={c.cx}
          cy={c.cy}
          r={c.r}
          fill={
            c.fill === 'currentColor'
              ? primaryColor
              : c.fill || (hasFilledDefinition ? primaryColor : 'none')
          }
          stroke={c.stroke || (hasFilledDefinition ? 'none' : primaryColor)}
          strokeWidth={c.strokeWidth || strokeWidth}
          opacity={c.opacity ?? 1}
        />
      ))}

      {/* Paths */}
      {pathsToRender.map((p, idx) => {
        const itemFill = hasFilledDefinition
          ? primaryColor
          : p.fill === 'currentColor'
          ? primaryColor
          : p.fill || 'none';

        const itemStroke = hasFilledDefinition
          ? p.stroke || 'none'
          : p.stroke || primaryColor;

        return (
          <path
            key={`p-${idx}`}
            d={p.d}
            fill={itemFill}
            stroke={itemStroke}
            strokeWidth={p.strokeWidth || strokeWidth}
            strokeLinecap={p.strokeLinecap || 'round'}
            strokeLinejoin={p.strokeLinejoin || 'round'}
            fillRule={p.fillRule || 'nonzero'}
            opacity={p.opacity ?? 1}
          />
        );
      })}
    </svg>
  );

  return (
    <View
      style={[
        styles.iconContainer,
        {
          width: size,
          height: size,
          opacity: state === 'disabled' ? 0.38 : 1,
        },
        style,
      ]}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
    >
      {svgContent as any}
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
