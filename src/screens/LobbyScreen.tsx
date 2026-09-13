import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { RouteHeader } from '../components/common/RouteHeader';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../design/tokens';
import { PublicRoom, Player } from '../domain/types';
import { ProfileIcon, CheckIcon, CopyIcon, CloseIcon } from '../components/icons/CustomIcons';
import { useTheme } from '../design/theme';

interface LobbyScreenProps {
  room: PublicRoom;
  player: Player;
  players?: Player[];
  countdownSeconds?: number | null;
  onStartMatch: () => void;
  onLeaveLobby: () => void;
  onToggleReady?: (isReady: boolean) => void;
  onLaunchRobotMatch?: () => void;
}

export const LobbyScreen: React.FC<LobbyScreenProps> = ({
  room,
  player,
  players = [],
  countdownSeconds = null,
  onStartMatch,
  onLeaveLobby,
  onToggleReady,
  onLaunchRobotMatch,
}) => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [extraPlayers, setExtraPlayers] = useState<Player[]>([]);
  const isHost = room.hostId === player.id;

  // Use players array if provided, fallback to host + player + extraPlayers
  const basePlayers = players.length > 0 ? players : [
    {
      ...player,
      isHost: isHost,
      isReady: isHost ? true : player.isReady,
    },
  ];

  const playerList = [...basePlayers, ...extraPlayers];

  const nonHostPlayers = playerList.filter((p) => !p.isHost);
  const allNonHostReady = nonHostPlayers.length > 0 && nonHostPlayers.every((p) => p.isReady);
  const isReadyToStart = (playerList.length >= 2 && allNonHostReady) || countdownSeconds !== null;
  const isSelfReady = playerList.find((p) => p.id === player.id)?.isReady || isHost;

  const handleAddBot = () => {
    const botChallenger: Player = {
      id: `bot-challenger-${Date.now()}`,
      name: 'CyberAce_Bot (AI)',
      avatar: 'CA',
      coins: 2400,
      gems: 50,
      rating: 1510,
      tier: 'Master',
      score: 0,
      linesCompleted: 0,
      hasWon: false,
      isReady: true,
      isHost: false,
    };
    setExtraPlayers((prev) => [...prev, botChallenger]);
  };

  const handleHostStart = () => {
    if (extraPlayers.length > 0 || playerList.length < 2) {
      if (onLaunchRobotMatch) {
        onLaunchRobotMatch();
      } else {
        handleAddBot();
        setTimeout(() => onStartMatch(), 350);
      }
    } else {
      onStartMatch();
    }
  };

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
        {/* COUNTDOWN BANNER */}
        {countdownSeconds !== null && (
          <View
            style={[
              styles.countdownBanner,
              {
                backgroundColor: COLORS.gentleOlive,
                borderColor: '#B8C665',
              },
            ]}
          >
            <Text style={[styles.countdownText, { color: COLORS.lunarShadow }]}>
              Match starting in {countdownSeconds}...
            </Text>
          </View>
        )}

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
                style={[
                  styles.copyBtn,
                  {
                    backgroundColor: copied ? theme.accentOlive : theme.bgRecessed,
                    borderColor: theme.borderSubtle,
                  },
                ]}
                onPress={handleCopyCode}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel="Copy room code"
              >
                <CopyIcon size={14} color={copied ? COLORS.lunarShadow : theme.textPrimary} />
                <Text
                  style={[
                    styles.copyBtnText,
                    { color: copied ? COLORS.lunarShadow : theme.textPrimary },
                  ]}
                >
                  {copied ? 'Copied!' : 'Copy code'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* PLAYERS SLOTS */}
          <View style={styles.slotsContainer}>
            <Text style={[styles.sectionLabel, { color: theme.textMuted }]}>
              Connected players ({playerList.length}/{room.maxPlayers})
            </Text>

            {/* Render Registered Players */}
            {playerList.map((p) => {
              const isPlayerHost = p.id === room.hostId || p.isHost;
              const isReady = isPlayerHost || p.isReady;

              return (
                <View
                  key={p.id}
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
                      {
                        backgroundColor: isPlayerHost
                          ? theme.accentHazelTint
                          : theme.accentOliveTint,
                      },
                    ]}
                  >
                    <ProfileIcon
                      size={18}
                      color={isPlayerHost ? COLORS.winterHazel : COLORS.gentleOlive}
                    />
                  </View>
                  <View style={styles.playerInfo}>
                    <Text style={[styles.playerName, { color: theme.textPrimary }]}>
                      {p.name} {isPlayerHost ? '(Host)' : ''} {p.id === player.id ? '(You)' : ''}
                    </Text>
                    <Text style={[styles.playerStatus, { color: theme.textSecondary }]}>
                      {isReady ? 'Ready' : 'Not ready'} • {p.rating || 1450} MMR
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.readyBadge,
                      {
                        backgroundColor: isReady
                          ? theme.accentOliveTint
                          : theme.bgSubtle,
                      },
                    ]}
                  >
                    {isReady ? (
                      <CheckIcon size={14} color={COLORS.lunarShadow} />
                    ) : (
                      <CloseIcon size={14} color={theme.textMuted} />
                    )}
                    <Text
                      style={[
                        styles.readyText,
                        { color: isReady ? COLORS.lunarShadow : theme.textMuted },
                      ]}
                    >
                      {isReady ? 'Ready' : 'Waiting'}
                    </Text>
                  </View>
                </View>
              );
            })}

            {/* Empty Slot Placeholder if < maxPlayers */}
            {playerList.length < room.maxPlayers && (
              <View
                style={[
                  styles.slotRow,
                  styles.slotWaiting,
                  {
                    backgroundColor: theme.bgRecessed,
                    borderColor: theme.borderSubtle,
                  },
                ]}
              >
                <View style={[styles.playerAvatar, { backgroundColor: theme.bgSubtle }]}>
                  <ProfileIcon size={18} color={theme.textMuted} />
                </View>
                <View style={styles.playerInfo}>
                  <Text style={[styles.playerName, { color: theme.textMuted }]}>
                    Awaiting challenger
                  </Text>
                  <Text style={[styles.playerStatus, { color: theme.textMuted }]}>
                    Share room code to invite
                  </Text>
                </View>
                <View style={styles.waitingBadge}>
                  <View style={styles.waitingDot} />
                  <Text style={[styles.waitingText, { color: theme.textMuted }]}>Open</Text>
                </View>
              </View>
            )}
          </View>

          {/* ACTION BUTTONS */}
          <View style={styles.actionGroup}>
            {isHost ? (
              <View style={{ gap: 8, width: '100%' }}>
                {playerList.length < 2 && (
                  <TouchableOpacity
                    style={[
                      styles.addBotBtn,
                      {
                        backgroundColor: theme.accentOliveTint,
                        borderColor: COLORS.gentleOlive,
                      },
                    ]}
                    onPress={handleAddBot}
                    activeOpacity={0.8}
                    accessibilityRole="button"
                    accessibilityLabel="Add Bot Opponent"
                  >
                    <Text style={[styles.addBotBtnText, { color: COLORS.lunarShadow }]}>
                      + Add AI Bot Challenger
                    </Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={[
                    styles.startMatchBtn,
                    {
                      backgroundColor: COLORS.gentleOlive,
                      borderColor: '#D7E28E',
                    },
                  ]}
                  disabled={countdownSeconds !== null}
                  onPress={handleHostStart}
                  activeOpacity={0.88}
                  accessibilityRole="button"
                  accessibilityLabel="Launch Match"
                >
                  <Text
                    style={[
                      styles.startMatchBtnText,
                      { color: COLORS.lunarShadow },
                    ]}
                  >
                    {countdownSeconds !== null
                      ? `Starting match in ${countdownSeconds}...`
                      : isReadyToStart
                      ? 'Start match ↗'
                      : 'Launch Match with AI Opponent ↗'}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.guestControls}>
                <TouchableOpacity
                  style={[
                    styles.readyToggleBtn,
                    {
                      backgroundColor: isSelfReady ? COLORS.gentleOlive : theme.bgRecessed,
                      borderColor: isSelfReady ? COLORS.gentleOlive : theme.borderSubtle,
                    },
                  ]}
                  onPress={() => onToggleReady && onToggleReady(!isSelfReady)}
                  activeOpacity={0.85}
                  accessibilityRole="button"
                  accessibilityLabel="Toggle Ready Status"
                >
                  <Text
                    style={[
                      styles.readyToggleBtnText,
                      { color: isSelfReady ? COLORS.lunarShadow : theme.textPrimary },
                    ]}
                  >
                    {isSelfReady ? '✓ Ready to Play' : 'Tap When Ready'}
                  </Text>
                </TouchableOpacity>

                <Text style={[styles.guestHint, { color: theme.textSecondary }]}>
                  {isSelfReady
                    ? 'Ready! Waiting for host to launch the match...'
                    : 'Tap the button above when you are ready to play.'}
                </Text>
              </View>
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
    padding: SPACING.lg,
  },
  countdownBanner: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    marginBottom: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countdownText: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  card: {
    padding: SPACING.lg,
    borderRadius: RADIUS.hero,
    borderWidth: 1,
    gap: SPACING.lg,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  arenaBadge: {
    alignItems: 'center',
    gap: SPACING.xs,
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
    gap: 6,
    paddingHorizontal: 10,
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
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.5,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  slotsContainer: {
    gap: SPACING.sm,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 4,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  slotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    gap: SPACING.md,
  },
  slotWaiting: {
    borderStyle: 'dashed',
    opacity: 0.75,
  },
  playerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  playerStatus: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
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
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  waitingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  waitingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#A0A0A0',
  },
  waitingText: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  actionGroup: {
    marginTop: SPACING.xs,
  },
  addBotBtn: {
    paddingVertical: 12,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  addBotBtnText: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.2,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  startMatchBtn: {
    paddingVertical: 14,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  startMatchBtnText: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.2,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  guestControls: {
    gap: SPACING.sm,
    alignItems: 'center',
  },
  readyToggleBtn: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  readyToggleBtnText: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.2,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  guestHint: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});
