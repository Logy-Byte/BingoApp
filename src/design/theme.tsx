import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

export type ThemeMode = 'light' | 'dark';

export const REFERENCE_PALETTE = {
  lunarShadow: '#282828', // Primary dark container & surface
  cleanWhite: '#FFFFFF',  // Primary card surface & contrast
  grayWhisper: '#F7F7F7', // Canvas backdrop in light mode
  gentleOlive: '#CBD77E', // Accent 1: radiant game action
  winterHazel: '#E6CA9A', // Accent 2: warm luxury trophy/badge
};

export interface ThemeColors {
  isDark: boolean;
  mode: ThemeMode;
  bgCanvas: string;
  bgCard: string;
  bgCardElevated: string;
  bgSubtle: string;
  bgRecessed: string;
  borderSubtle: string;
  borderStrong: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;
  accentOlive: string;
  accentOliveTint: string;
  accentHazel: string;
  accentHazelTint: string;
  dockBg: string;
  dockBorder: string;
  activePillBg: string;
  activePillText: string;
  activePillIcon: string;
  inactiveIcon: string;
  daubWell: string;
  daubBorder: string;
  daubPip: string;
  cardShadow: string;
}

export const LIGHT_THEME: ThemeColors = {
  isDark: false,
  mode: 'light',
  bgCanvas: REFERENCE_PALETTE.grayWhisper,   // #F7F7F7
  bgCard: REFERENCE_PALETTE.cleanWhite,      // #FFFFFF
  bgCardElevated: '#FFFFFF',
  bgSubtle: '#F0F0F0',
  bgRecessed: '#EFEFEF',
  borderSubtle: '#EAEAEA',
  borderStrong: '#DCDCDC',
  textPrimary: REFERENCE_PALETTE.lunarShadow, // #282828
  textSecondary: '#6E737B',
  textMuted: '#9AA0A8',
  textInverse: '#FFFFFF',
  accentOlive: REFERENCE_PALETTE.gentleOlive, // #CBD77E
  accentOliveTint: 'rgba(203, 215, 126, 0.24)',
  accentHazel: REFERENCE_PALETTE.winterHazel, // #E6CA9A
  accentHazelTint: 'rgba(230, 202, 154, 0.24)',
  dockBg: REFERENCE_PALETTE.lunarShadow,     // #282828 Floating Console Dock
  dockBorder: '#383838',
  activePillBg: REFERENCE_PALETTE.cleanWhite, // #FFFFFF
  activePillText: REFERENCE_PALETTE.lunarShadow, // #282828
  activePillIcon: REFERENCE_PALETTE.lunarShadow, // #282828
  inactiveIcon: '#8E94A0',
  daubWell: 'rgba(203, 215, 126, 0.18)',
  daubBorder: REFERENCE_PALETTE.gentleOlive,
  daubPip: REFERENCE_PALETTE.gentleOlive,
  cardShadow: 'rgba(0, 0, 0, 0.04)',
};

export const DARK_THEME: ThemeColors = {
  isDark: true,
  mode: 'dark',
  bgCanvas: '#16181B',                      // Deep architectural dark plane
  bgCard: REFERENCE_PALETTE.lunarShadow,    // #282828
  bgCardElevated: '#32363C',
  bgSubtle: '#222529',
  bgRecessed: '#1D2024',
  borderSubtle: '#383C44',
  borderStrong: '#4A505B',
  textPrimary: REFERENCE_PALETTE.cleanWhite, // #FFFFFF
  textSecondary: '#A0A5AD',
  textMuted: '#6C727D',
  textInverse: REFERENCE_PALETTE.lunarShadow,
  accentOlive: REFERENCE_PALETTE.gentleOlive, // #CBD77E
  accentOliveTint: 'rgba(203, 215, 126, 0.18)',
  accentHazel: REFERENCE_PALETTE.winterHazel, // #E6CA9A
  accentHazelTint: 'rgba(230, 202, 154, 0.18)',
  dockBg: '#1A1C1F',                        // Deep dock substrate
  dockBorder: '#2E3238',
  activePillBg: REFERENCE_PALETTE.cleanWhite, // #FFFFFF
  activePillText: REFERENCE_PALETTE.lunarShadow, // #282828
  activePillIcon: REFERENCE_PALETTE.lunarShadow, // #282828
  inactiveIcon: '#7B818C',
  daubWell: 'rgba(203, 215, 126, 0.14)',
  daubBorder: REFERENCE_PALETTE.gentleOlive,
  daubPip: REFERENCE_PALETTE.gentleOlive,
  cardShadow: 'rgba(0, 0, 0, 0.35)',
};

interface ThemeContextType {
  theme: ThemeColors;
  mode: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: LIGHT_THEME,
  mode: 'light',
  isDark: false,
  toggleTheme: () => {},
  setMode: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to Light theme (Reference 1 & 3 showcase light mode as dominant baseline)
  const [mode, setMode] = useState<ThemeMode>('light');

  const theme = useMemo(() => {
    return mode === 'dark' ? DARK_THEME : LIGHT_THEME;
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        mode,
        isDark: mode === 'dark',
        toggleTheme,
        setMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
