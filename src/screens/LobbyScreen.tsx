import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { GameButton } from '../components/common/GameButton';
import { GameCard } from '../components/common/GameCard';
import { RouteHeader } from '../components/common/RouteHeader';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../design/tokens';
import { PublicRoom, Player } from '../domain/types';
import { ProfileIcon, CheckIcon, CopyIcon, PlayIcon } from '../components/icons/CustomIcons';
import { useTheme } from '../design/theme';

interface LobbyScreenProps {
  room: PublicRoom;
  player: Player;
  onStartMatch: () => void;
  onLeaveLobby: () => void;
}

export const LobbyScreen: React.FC<LobbyScreenProps> = ({
  room,
  player,
  onStartMatch,
  onLeaveLobby,
}) => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const isHost = room.hostId === player.id;
  const isReadyToStart = room.playerCount >= 2;

  const handleCopyCode = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(room.id);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bgCanvas }]}>
      <RouteHeader title="Match Lobby" onBack={onLeaveLobby} />

      <View style={styles.contentWrap}>
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.bgCard,
              borderColor: theme.borderSubtle,
            },
          ]}
        >
          <View style={styles.arenaBadge}>
            <Text style={[styles.arenaTitle, { color: theme.textPrimary }]}>{room.name}</Text>
            <View style={styles.codeContainer}>
              <View
                style={[
                  styles.codeRow,
                  { backgroundColor: theme.accentHazelTint, borderColor: COLORS.winterHazel },
                ]}
              >
                <Text style={[styles.codeLabel, { color: '#8A6724' }]}>Room code:</Text>
                <Text style={[styles.codeVal, { color: '#8A6724' }]}>#{room.id}</Text>
              </View>

              <TouchableOpacity
                style={[styles.copyBtn, { backgroundColor: copied ? theme.accentOlive : theme.bgRecessed, borderColor: theme.borderSubtle }]}
                onPress={handleCopyCode}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel="Copy room code"
              >
                <CopyIcon size={14} color={copied ? COLORS.lunarShadow : theme.textPrimary} />
                <Text style={[styles.copyBtnText, { color: copied ? COLORS.lunarShadow : theme.textPrimary }]}>
                  {copied ? 'Copied!' : 'Copy code'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* PLAYERS SLOTS */}
          <View style={styles.slotsContainer}>
            <Text style={[styles.sectionLabel, { color: theme.textMuted }]}>
              Connected players ({room.playerCount}/{room.maxPlayers})
            </Text>

            {/* Slot 1: Host */}
            <View
              style={[
                styles.slotRow,
                {
                  backgroundColor: theme.bgRecessed,
                  borderColor: theme.borderSubtle,
                },
              ]}
            >
              <View
                style={[
                  styles.playerAvatar,
                  { backgroundColor: theme.accentHazelTint },
                ]}
              >
                <ProfileIcon size={18} color={COLORS.winterHazel} />
              </View>
              <View style={styles.playerInfo}>
                <Text style={[styles.playerName, { color: theme.textPrimary }]}>
                  {room.hostName} (Host)
                </Text>
                <Text style={[styles.playerStatus, { color: theme.textSecondary }]}>
                  Ready • 1450 MMR
                </Text>
              </View>
              <View
                style={[
                  styles.readyBadge,
                  { backgroundColor: theme.accentOliveTint },
                ]}
              >
                <CheckIcon size={14} color={COLORS.lunarShadow} />
                <Text style={[styles.readyText, { color: COLORS.lunarShadow }]}>Ready</Text>
              </View>
            </View>

            {/* Slot 2: Challenger */}
            <View
              style={[
                styles.slotRow,
                {
                  backgroundColor: theme.bgRecessed,
                  borderColor: theme.borderSubtle,
                },
                room.playerCount < 2 && styles.slotWaiting,
              ]}
            >
              <View
                style={[
                  styles.playerAvatar,
                  {
                    backgroundColor:
                      room.playerCount >= 2 ? theme.accentOliveTint : theme.bgSubtle,
                  },
                ]}
              >
                <ProfileIcon
                  size={18}
                  color={room.playerCount >= 2 ? COLORS.gentleOlive : theme.textMuted}
                />
              </View>
              <View style={styles.playerInfo}>
                <Text style={[styles.playerName, { color: theme.textPrimary }]}>
                  {room.playerCount >= 2
                    ? isHost
                      ? 'Challenger'
                      : player.name
                    : 'Awaiting challenger'}
                </Text>
                <Text style={[styles.playerStatus, { color: theme.textMuted }]}>
                  {room.playerCount >= 2 ? 'Connected • Ready' : 'Share room code to invite'}
                </Text>
              </View>
              {room.playerCount >= 2 ? (
                <View
                  style={[
                    styles.readyBadge,
                    { backgroundColor: theme.accentOliveTint },
                  ]}
                >
                  <CheckIcon size={14} color={COLORS.lunarShadow} />
                  <Text style={[styles.readyText, { color: COLORS.lunarShadow }]}>Ready</Text>
                </View>
              ) : (
                <View style={styles.waitingBadge}>
                  <View style={styles.waitingDot} />
                  <Text style={[styles.waitingText, { color: theme.textMuted }]}>Open</Text>
                </View>
              )}
            </View>
          </View>

          {/* ACTION BUTTONS */}
          <View style={styles.actionGroup}>
            {isHost ? (
              <TouchableOpacity
                style={[
                  styles.startMatchBtn,
                  {
                    backgroundColor: isReadyToStart ? COLORS.gentleOlive : theme.bgSubtle,
                    borderColor: isReadyToStart ? '#D7E28E' : theme.borderSubtle,
                  },
                ]}
                disabled={!isReadyToStart}
                onPress={onStartMatch}
                activeOpacity={0.88}
                accessibilityRole="button"
                accessibilityLabel="Launch Match"
              >
                <Text
                  style={[
                    styles.startMatchBtnText,
                    { color: isReadyToStart ? COLORS.lunarShadow : theme.textMuted },
                  ]}
                >
                  {isReadyToStart ? 'Start match ↗' : 'Waiting for opponent...'}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text style={[styles.guestHint, { color: theme.textSecondary }]}>
                Waiting for room host to initiate game...
              </Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrap: {
    padding: SPACING.lg, // 16px
  },
  card: {
    padding: SPACING.lg, // 16px
    borderRadius: RADIUS.hero, // 24px
    borderWidth: 1,
    gap: SPACING.lg, // 16px
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  arenaBadge: {
    alignItems: 'center',
    gap: SPACING.xs, // 4px
  },
  arenaTitle: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.2,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    flexWrap: 'wrap',
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
  },
  copyBtnText: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs, // 4px
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
  },
  codeLabel: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  codeVal: {
    fontSize: 12,
    fontWeight: '900',
    fontFamily: TYPOGRAPHY.monoFamily,
  },
  slotsContainer: {
    gap: SPACING.sm, // 8px
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  slotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md, // 12px
    borderRadius: RADIUS.surface, // 16px
    borderWidth: 1,
    gap: SPACING.md, // 12px
  },
  slotWaiting: {
    borderStyle: 'dashed',
  },
  playerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerInfo: {
    flex: 1,
    gap: 2,
  },
  playerName: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  playerStatus: {
    fontSize: 11,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  readyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.pill,
  },
  readyText: {
    fontSize: 11,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  waitingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  waitingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#8E94A0',
  },
  waitingText: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  actionGroup: {
    marginTop: SPACING.xs,
  },
  startMatchBtn: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: RADIUS.sheet, // 28px
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    shadowColor: COLORS.gentleOlive,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  startMatchBtnText: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.6,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  guestHint: {
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingVertical: SPACING.sm,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});
