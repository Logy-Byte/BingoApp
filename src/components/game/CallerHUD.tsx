import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../design/tokens';
import { BingoIdentityIcon } from '../icons/CustomIcons';
import { useTheme } from '../../design/theme';

interface CallerHUDProps {
  currentCall?: number;
  totalCalls: number;
  maxCalls?: number;
  recentCalls: number[];
}

/**
 * Caller HUD with Concentric Dial Sphere & Reference 2 Timeline Ribbon
 */
export const CallerHUD: React.FC<CallerHUDProps> = ({
  currentCall,
  totalCalls,
  maxCalls = 25,
  recentCalls,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.hudContainer,
        {
          backgroundColor: theme.bgCard,
          borderColor: theme.borderSubtle,
        },
      ]}
    >
      {/* Top Specular Hairline */}
      <View style={styles.topBevel} />

      {/* Header telemetry ribbon */}
      <View style={styles.telemetryRow}>
        <View style={styles.liveBadge}>
          <BingoIdentityIcon size={12} color={COLORS.gentleOlive} variant="filled" style={{ marginRight: 4 }} />
          <View style={[styles.livePulsePip, { backgroundColor: COLORS.gentleOlive }]} />
          <Text style={[styles.liveBadgeText, { color: theme.textPrimary }]}>
            CALLER BROADCAST
          </Text>
        </View>
        <Text style={[styles.drawCounter, { color: theme.textMuted }]}>
          BALL {String(totalCalls).padStart(2, '0')} / {maxCalls}
        </Text>
      </View>

      {/* Hero Caller Sphere with Reference 2 Concentric Dial Accent */}
      <View style={styles.broadcastBody}>
        {/* Concentric Dial Sphere */}
        <View style={styles.sphereShadowWrap}>
          {/* Outer Concentric Ring with Gentle Olive Perimeter Dot (Ref 2 Climate Dial) */}
          <View
            style={[
              styles.concentricOuterRing,
              { borderColor: theme.borderSubtle },
            ]}
          >
            <View style={styles.perimeterDot} />
            <View
              style={[
                styles.callerSphere,
                {
                  backgroundColor: COLORS.cleanWhite,
                  borderColor: theme.borderSubtle,
                },
              ]}
            >
              <View style={styles.sphereSpecularGlint} />
              <View
                style={[
                  styles.ballCore,
                  { backgroundColor: theme.isDark ? '#F5F5F5' : '#FFFFFF' },
                ]}
              >
                <Text style={styles.sphereNumeral}>
                  {currentCall !== undefined ? String(currentCall).padStart(2, '0') : '--'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Timeline Ribbon (Reference 2 Date Track) */}
        <View style={styles.recentTray}>
          <Text style={[styles.recentTrayLabel, { color: theme.textMuted }]}>
            RECENT DRAWS
          </Text>
          <View
            style={[
              styles.timelineRibbon,
              {
                backgroundColor: theme.bgRecessed,
                borderColor: theme.borderSubtle,
              },
            ]}
          >
            {recentCalls.length === 0 ? (
              <Text style={[styles.awaitingText, { color: theme.textMuted }]}>
                Awaiting first call...
              </Text>
            ) : (
              recentCalls.slice(0, 4).map((num, idx) => {
                const isActive = idx === 0;
                return (
                  <View
                    key={`recent-${idx}-${num}`}
                    style={[
                      styles.timelineChip,
                      isActive && styles.timelineChipActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.timelineChipText,
                        isActive && styles.timelineChipTextActive,
                      ]}
                    >
                      {String(num).padStart(2, '0')}
                    </Text>
                  </View>
                );
              })
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hudContainer: {
    borderRadius: RADIUS.hero, // 24px
    paddingHorizontal: SPACING.lg, // 16px
    paddingVertical: SPACING.md, // 12px
    borderWidth: 1,
    marginVertical: SPACING.xs, // 4px
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  topBevel: {
    position: 'absolute',
    top: 0,
    left: 12,
    right: 12,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  telemetryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs, // 4px
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  livePulsePip: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  liveBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  drawCounter: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.monoFamily,
  },
  broadcastBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.lg, // 16px
    marginTop: 2,
  },
  sphereShadowWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  concentricOuterRing: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  perimeterDot: {
    position: 'absolute',
    top: -3,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.gentleOlive,
  },
  callerSphere: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    position: 'relative',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  sphereSpecularGlint: {
    position: 'absolute',
    top: 4,
    left: 12,
    right: 12,
    height: 12,
    borderRadius: RADIUS.pill,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  ballCore: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sphereNumeral: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.lunarShadow,
    fontFamily: TYPOGRAPHY.monoFamily,
  },
  recentTray: {
    flex: 1,
    gap: 4,
  },
  recentTrayLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  timelineRibbon: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    borderRadius: RADIUS.pill,
    gap: 6,
    borderWidth: 1,
  },
  awaitingText: {
    fontSize: 11,
    fontStyle: 'italic',
    paddingHorizontal: 8,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  timelineChip: {
    flex: 1,
    height: 32,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineChipActive: {
    backgroundColor: COLORS.cleanWhite,
    borderWidth: 1.5,
    borderColor: COLORS.gentleOlive,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  timelineChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8E94A0',
    fontFamily: TYPOGRAPHY.monoFamily,
  },
  timelineChipTextActive: {
    color: COLORS.lunarShadow,
    fontWeight: '800',
  },
});
