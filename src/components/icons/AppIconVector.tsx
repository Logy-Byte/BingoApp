import React from 'react';
import { View, ViewStyle } from 'react-native';

interface AppIconVectorProps {
  size?: number;
  style?: ViewStyle;
}

/**
 * App Store & Launcher Icon Specification (Section 22)
 * Designed separately from in-app navigation icons:
 * - 512×512 Master Canvas (unmasked for iOS & Android system masking)
 * - Single iconic silhouette: The authentic 5-point Bingo Star-Matrix Crest
 * - High-contrast separation: Deep obsidian stage with solar-gold illumination
 */
export const AppIconVector: React.FC<AppIconVectorProps> = ({ size = 128, style }) => {
  return (
    <View style={[{ width: size, height: size }, style]}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        <defs>
          {/* Radial Stage Lighting */}
          <radialGradient
            id="appIconBgGlow"
            cx="50%"
            cy="45%"
            r="65%"
            fx="50%"
            fy="40%"
          >
            <stop offset="0%" stopColor="#1E283C" />
            <stop offset="60%" stopColor="#101520" />
            <stop offset="100%" stopColor="#0B0E14" />
          </radialGradient>

          {/* Gold Radiant Crest Gradient */}
          <linearGradient id="goldCrestGrad" x1="120" y1="90" x2="390" y2="420" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="45%" stopColor="#F59E0B" />
            <stop offset="85%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          {/* Emerald Game Core Pulse */}
          <radialGradient id="emeraldCoreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="60%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#047857" />
          </radialGradient>

          {/* Specular Edge Filter */}
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="16" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Base Slate Backdrop (Unmasked for platform adaptation) */}
        <rect width="512" height="512" fill="url(#appIconBgGlow)" />

        {/* 2. Concentric Ambient Alignment Rings */}
        <circle cx="256" cy="256" r="190" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" strokeDasharray="6 8" />
        <circle cx="256" cy="256" r="140" stroke="rgba(245, 158, 11, 0.12)" strokeWidth="1.5" />

        {/* 3. Ambient Gold Glow */}
        <circle cx="256" cy="256" r="90" fill="#F59E0B" opacity="0.15" filter="url(#softGlow)" />

        {/* 4. The Master Bingo Star-Matrix Emblem */}
        <path
          d="M256 64 C288 64 316 148 342 174 C368 200 448 228 448 256 C448 284 368 312 342 338 C316 364 288 448 256 448 C224 448 196 364 170 338 C144 312 64 284 64 256 C64 228 144 200 170 174 C196 148 224 64 256 64 Z"
          fill="url(#goldCrestGrad)"
          stroke="#FDE68A"
          strokeWidth="6"
          strokeLinejoin="round"
        />

        {/* 5. Inset 5×5 Constellation Geometry */}
        <circle cx="256" cy="256" r="36" fill="url(#emeraldCoreGlow)" stroke="#FFFFFF" strokeWidth="4" />
        <circle cx="256" cy="256" r="14" fill="#FFFFFF" />

        {/* 6. Four Cardinal Orbital Pips (5×5 Matrix Alignment) */}
        <circle cx="256" cy="148" r="10" fill="#FDE68A" />
        <circle cx="364" cy="256" r="10" fill="#FDE68A" />
        <circle cx="256" cy="364" r="10" fill="#FDE68A" />
        <circle cx="148" cy="256" r="10" fill="#FDE68A" />

        {/* 7. Subtle Corner Rim Hairline */}
        <rect x="16" y="16" width="480" height="480" rx="36" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="2" fill="none" />
      </svg>
    </View>
  );
};
