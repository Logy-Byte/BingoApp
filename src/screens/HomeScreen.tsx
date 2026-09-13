import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Modal,
} from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../design/tokens';
import { Player, PublicRoom, RobotDifficulty } from '../domain/types';
import { globalRoomManager } from '../domain/multiplayer/roomManager';
import { SoundEngine } from '../audio/soundEngine';
import { PlayerStageBar } from '../components/lobby/PlayerStageBar';
import { LobbyGallery } from '../components/lobby/LobbyGallery';
import {
  RefreshIcon,
  LockIcon,
  ChevronIcon,
  CloseIcon,
  UsersIcon,
  BingoIdentityIcon,
  IconTicket,
} from '../components/icons/CustomIcons';
import { useTheme } from '../design/theme';

interface HomeScreenProps {
  player: Player;
  onPlayRanked: () => void;
  onPlayRobot: (difficulty: RobotDifficulty) => void;
  onPlayFriend: () => void;
  onDailyPuzzle: () => void;
  onLocalPlay: () => void;
  onJoinRoom: (roomId: string) => void;
  onCreateRoomDirect: () => void;
  onOpenSettings?: () => void;
  onOpenRoomSelection?: () => void;
  onOpenDailyBonusModal?: () => void;
  onOpenShop?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  player,
  onPlayRanked,
  onPlayRobot,
  onPlayFriend,
  onDailyPuzzle,
  onLocalPlay,
  onJoinRoom,
  onCreateRoomDirect,
  onOpenSettings,
  onOpenRoomSelection,
  onOpenDailyBonusModal,
  onOpenShop,
}) => {
  const { theme } = useTheme();
  const [onlineCount, setOnlineCount] = useState<number | null>(null);
  const [availableRooms, setAvailableRooms] = useState<PublicRoom[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showRobotModal, setShowRobotModal] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(!SoundEngine.isAudioMuted());
  const [voiceEnabled, setVoiceEnabled] = useState(SoundEngine.isVoiceEnabled());

  const loadLobbyData = () => {
    setOnlineCount(globalRoomManager.getLiveOnlinePlayerCount());
    setAvailableRooms(globalRoomManager.getAvailablePublicRooms());
  };

  useEffect(() => {
    loadLobbyData();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadLobbyData();
    setTimeout(() => setIsRefreshing(false), 300);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    SoundEngine.setMuted(!next);
  };

  const toggleVoice = () => {
    const next = !voiceEnabled;
    setVoiceEnabled(next);
    SoundEngine.setVoiceEnabled(next);
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: theme.bgCanvas }]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          tintColor={COLORS.gentleOlive}
        />
      }
    >
      {/* 1. PLAYER STAGE BAR (Ref 1 & 2 Floating Header Island with Avatar & Theme Toggle) */}
      <PlayerStageBar
        playerName={player.name}
        tier={player.tier}
        rating={player.rating}
        soundEnabled={soundEnabled}
        voiceEnabled={voiceEnabled}
        onToggleSound={toggleSound}
        onToggleVoice={toggleVoice}
        onOpenSettings={onOpenSettings}
      />

      {/* 2. LOBBY EXPERIENCE GALLERY (Clean Rectangular Boxes & Gallery Grid) */}
      <LobbyGallery
        onPlayRanked={onPlayRanked}
        onOpenDailyBonusModal={onOpenDailyBonusModal}
        onOpenRoomSelection={onOpenRoomSelection}
        onSoloPress={() => setShowRobotModal(true)}
        onFriendPress={onPlayFriend}
        onDailyPress={onDailyPuzzle}
        onlineCount={onlineCount}
      />

      {/* 6. LIVE LOBBIES & ROOMS (Clean Status Chips & Rows - Ref 1 & 2) */}
      <View style={styles.roomsSection}>
        <View style={styles.roomsHeader}>
          <View style={styles.roomsTitleGroup}>
            <Text style={[styles.roomsSectionTitle, { color: theme.textMuted }]}>
              ACTIVE GAME ROOMS
            </Text>
            <View style={[styles.telemetryDot, { backgroundColor: COLORS.gentleOlive }]} />
            <Text style={[styles.telemetryText, { color: theme.textSecondary }]}>
              {onlineCount !== null ? `${onlineCount} Online` : 'Local Network'}
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleRefresh}
            style={styles.refreshControl}
            accessibilityRole="button"
            accessibilityLabel="Refresh rooms"
          >
            <RefreshIcon size={14} color={theme.textSecondary} />
            <Text style={[styles.refreshLabel, { color: theme.textSecondary }]}>Refresh</Text>
          </TouchableOpacity>
        </View>

        {availableRooms.length === 0 ? (
          <View
            style={[
              styles.emptyStateBox,
              {
                backgroundColor: theme.bgCard,
                borderColor: theme.borderSubtle,
              },
            ]}
          >
            <View
              style={[
                styles.emptyIconWrap,
                { backgroundColor: theme.accentOliveTint },
              ]}
            >
              <UsersIcon size={24} color={COLORS.lunarShadow} />
            </View>
            <Text style={[styles.emptyStateTitle, { color: theme.textPrimary }]}>
              No public rooms open
            </Text>
            <Text style={[styles.emptyStateSubtitle, { color: theme.textSecondary }]}>
              Host a private game table for your friends or queue in Ranked.
            </Text>
            <TouchableOpacity
              style={[
                styles.emptyCreateBtn,
                {
                  backgroundColor: COLORS.gentleOlive,
                  borderColor: '#D7E28E',
                },
              ]}
              onPress={onCreateRoomDirect}
              accessibilityRole="button"
              accessibilityLabel="Host room"
            >
              <Text style={styles.emptyCreateBtnText}>Host a Room</Text>
            </TouchableOpacity>
          </View>
        ) : (
          availableRooms.map((room) => (
            <View
              key={room.id}
              style={[
                styles.roomRow,
                {
                  backgroundColor: theme.bgCard,
                  borderColor: theme.borderSubtle,
                },
              ]}
            >
              <View style={styles.roomRowLeft}>
                <View
                  style={[
                    styles.roomIconBadge,
                    { backgroundColor: theme.accentOliveTint },
                  ]}
                >
                  <BingoIdentityIcon size={16} color={COLORS.lunarShadow} />
                </View>
                <View style={styles.roomMeta}>
                  <View style={styles.roomNameGroup}>
                    <Text style={[styles.roomTitle, { color: theme.textPrimary }]}>
                      {room.name}
                    </Text>
                    {room.privacy === 'password' && (
                      <LockIcon size={13} color={theme.textMuted} />
                    )}
                  </View>
                  <Text style={[styles.roomDetails, { color: theme.textSecondary }]}>
                    Room #{room.id} • {room.playerCount}/{room.maxPlayers} Players
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.roomJoinButton,
                  {
                    backgroundColor: theme.accentOliveTint,
                    borderColor: COLORS.gentleOlive,
                  },
                ]}
                onPress={() => onJoinRoom(room.id)}
                accessibilityRole="button"
                accessibilityLabel={`Join room ${room.name}`}
              >
                <Text style={[styles.roomJoinText, { color: COLORS.lunarShadow }]}>Join</Text>
                <ChevronIcon direction="right" size={13} color={COLORS.lunarShadow} />
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>

      {/* ROBOT DIFFICULTY MODAL (24px Rounded Card) */}
      <Modal visible={showRobotModal} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: theme.bgCard,
                borderColor: theme.borderSubtle,
              },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalHeading, { color: theme.textPrimary }]}>
                Select Robot Difficulty
              </Text>
              <TouchableOpacity
                onPress={() => setShowRobotModal(false)}
                style={styles.modalCloseIcon}
                accessibilityRole="button"
                accessibilityLabel="Close difficulty selection"
              >
                <CloseIcon size={18} color={theme.textMuted} />
              </TouchableOpacity>
            </View>

            <Text style={[styles.modalIntro, { color: theme.textSecondary }]}>
              The AI plays on an authentic board with real decision latencies.
            </Text>

            <TouchableOpacity
              style={[
                styles.diffOption,
                {
                  backgroundColor: theme.bgRecessed,
                  borderColor: theme.borderSubtle,
                },
              ]}
              onPress={() => {
                setShowRobotModal(false);
                onPlayRobot('EASY');
              }}
              activeOpacity={0.8}
            >
              <View style={styles.diffHeaderRow}>
                <Text style={[styles.diffName, { color: theme.textPrimary }]}>Apprentice</Text>
                <View
                  style={[
                    styles.diffTagPill,
                    { backgroundColor: theme.accentOliveTint },
                  ]}
                >
                  <Text style={[styles.diffTagText, { color: COLORS.lunarShadow }]}>
                    CASUAL
                  </Text>
                </View>
              </View>
              <Text style={[styles.diffDetail, { color: theme.textSecondary }]}>
                Relaxed tempo • 3–5s reaction time
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.diffOption,
                styles.diffOptionActive,
                {
                  backgroundColor: theme.accentHazelTint,
                  borderColor: COLORS.winterHazel,
                },
              ]}
              onPress={() => {
                setShowRobotModal(false);
                onPlayRobot('MEDIUM');
              }}
              activeOpacity={0.8}
            >
              <View style={styles.diffHeaderRow}>
                <Text style={[styles.diffName, { color: theme.textPrimary }]}>Challenger</Text>
                <View
                  style={[
                    styles.diffTagPill,
                    { backgroundColor: COLORS.winterHazel },
                  ]}
                >
                  <Text style={[styles.diffTagText, { color: COLORS.lunarShadow }]}>
                    RECOMMENDED
                  </Text>
                </View>
              </View>
              <Text style={[styles.diffDetail, { color: theme.textSecondary }]}>
                Balanced human pace • 1.5–2.5s reaction
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.diffOption,
                {
                  backgroundColor: theme.bgRecessed,
                  borderColor: theme.borderSubtle,
                },
              ]}
              onPress={() => {
                setShowRobotModal(false);
                onPlayRobot('HARD');
              }}
              activeOpacity={0.8}
            >
              <View style={styles.diffHeaderRow}>
                <Text style={[styles.diffName, { color: theme.textPrimary }]}>Grandmaster</Text>
                <View
                  style={[
                    styles.diffTagPill,
                    { backgroundColor: 'rgba(239, 68, 68, 0.15)' },
                  ]}
                >
                  <Text style={[styles.diffTagText, { color: '#DC2626' }]}>EXPERT</Text>
                </View>
              </View>
              <Text style={[styles.diffDetail, { color: theme.textSecondary }]}>
                Lightning speed • 0.4–1.0s rapid marks
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.lg,
    paddingBottom: 110,
  },
  roomsSection: {
    marginTop: SPACING.sm, // 8px
  },
  roomsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  roomsTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  roomsSectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  telemetryDot: {
    width: 6,
    height: 6,
    borderRadius: RADIUS.pill,
  },
  telemetryText: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  refreshControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  refreshLabel: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  emptyStateBox: {
    borderRadius: RADIUS.hero, // 24px
    padding: SPACING.xl,
    alignItems: 'center',
    borderWidth: 1,
    marginTop: SPACING.xs,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  emptyIconWrap: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  emptyStateTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  emptyStateSubtitle: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: SPACING.md,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  emptyCreateBtn: {
    borderWidth: 1,
    paddingVertical: SPACING.sm, // 8px
    paddingHorizontal: SPACING.xl, // 20px
    borderRadius: RADIUS.pill,
  },
  emptyCreateBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.lunarShadow,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  roomRow: {
    borderRadius: RADIUS.surface, // 16px
    padding: SPACING.md, // 12px
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm, // 8px
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
  },
  roomRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md, // 12px
    flex: 1,
  },
  roomIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roomMeta: {
    gap: 2,
    flex: 1,
  },
  roomNameGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  roomTitle: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.2,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  roomDetails: {
    fontSize: 11,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  roomJoinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
  },
  roomJoinText: {
    fontSize: 12,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg, // 16px
  },
  modalContent: {
    borderRadius: RADIUS.hero, // 24px
    padding: SPACING.xl, // 20px
    width: '100%',
    maxWidth: 340,
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs, // 4px
  },
  modalHeading: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  modalCloseIcon: {
    padding: SPACING.xs, // 4px
  },
  modalIntro: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: SPACING.md, // 12px
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  diffOption: {
    borderRadius: RADIUS.control, // 12px
    padding: SPACING.md, // 12px
    marginBottom: SPACING.sm, // 8px
    borderWidth: 1,
  },
  diffOptionActive: {
    borderWidth: 1.5,
  },
  diffHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  diffName: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  diffTagPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.pill,
  },
  diffTagText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.6,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  diffDetail: {
    fontSize: 11,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});
