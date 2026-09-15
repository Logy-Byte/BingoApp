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
import { Player, RobotDifficulty } from '../domain/types';
import { globalRoomManager } from '../domain/multiplayer/roomManager';
import { SoundEngine } from '../audio/soundEngine';
import { PlayerHeader } from '../components/bingo/PlayerHeader';
import { LobbyGallery } from '../components/lobby/LobbyGallery';
import {
  CloseIcon,
  UsersIcon,
} from '../components/icons/CustomIcons';
import { useTheme } from '../design/theme';

interface HomeScreenProps {
  player: Player;
  onPlayRanked?: () => void;
  onPlayRandomPlayer?: () => void;
  onPlayRandomHuman?: () => void;
  onPlayRobot: (difficulty: RobotDifficulty) => void;
  onPlayFriend?: () => void;
  onDailyPuzzle: () => void;
  onLocalPlay?: () => void;
  onJoinRoom?: (roomId: string) => void;
  onCreateRoomDirect?: () => void;
  onOpenSettings?: () => void;
  onOpenRoomSelection?: () => void;
  onOpenDailyBonusModal?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  player,
  onPlayRanked,
  onPlayRandomPlayer,
  onPlayRandomHuman,
  onPlayRobot,
  onPlayFriend,
  onDailyPuzzle,
  onLocalPlay,
  onJoinRoom,
  onCreateRoomDirect,
  onOpenSettings,
  onOpenRoomSelection,
  onOpenDailyBonusModal,
}) => {
  const { theme } = useTheme();
  const [onlineCount, setOnlineCount] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showRobotModal, setShowRobotModal] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(!SoundEngine.isAudioMuted());
  const [voiceEnabled, setVoiceEnabled] = useState(SoundEngine.isVoiceEnabled());

  const handleRandomPlayerAction = () => {
    if (onPlayRandomPlayer) {
      onPlayRandomPlayer();
    } else if (onPlayRandomHuman) {
      onPlayRandomHuman();
    } else if (onPlayRanked) {
      onPlayRanked();
    }
  };

  const loadLobbyData = () => {
    setOnlineCount(globalRoomManager.getLiveOnlinePlayerCount());
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
      {/* 1. THREEUI REBUILT PLAYER HEADER (Floating Control Surface with unified IconButton and Presence Pip) */}
      <PlayerHeader
        playerName={player.name}
        tier={player.tier}
        rating={player.rating}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onOpenSettings={onOpenSettings}
      />

      {/* 2. LOBBY EXPERIENCE GALLERY */}
      <LobbyGallery
        onPlayRandomPlayer={handleRandomPlayerAction}
        onSoloPress={() => setShowRobotModal(true)}
        onDailyPress={onDailyPuzzle}
        onlineCount={onlineCount}
      />

      {/* 3. PRIVATE BINGO ROOMS (CREATE & JOIN) */}
      {(onPlayFriend || onCreateRoomDirect) && (
        <TouchableOpacity
          testID="lobby-private-rooms-card"
          style={[
            styles.privateRoomCard,
            {
              backgroundColor: theme.bgCard,
              borderColor: theme.borderSubtle,
            },
          ]}
          onPress={onPlayFriend || onCreateRoomDirect}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="Create or Join Private Bingo Room"
        >
          <View style={styles.privateRoomLeft}>
            <View style={[styles.privateRoomIconBox, { backgroundColor: theme.accentOliveTint }]}>
              <UsersIcon size={18} color={COLORS.lunarShadow} />
            </View>
            <View>
              <Text style={[styles.privateRoomTitle, { color: theme.textPrimary }]}>
                Bingo Rooms
              </Text>
              <Text style={[styles.privateRoomSub, { color: theme.textSecondary }]}>
                Create or join a private 1v1 match
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.openRoomBtn,
              {
                backgroundColor: theme.accentOliveTint,
                borderColor: COLORS.gentleOlive,
              },
            ]}
          >
            <Text style={[styles.openRoomBtnText, { color: COLORS.lunarShadow }]}>
              ENTER ↗
            </Text>
          </View>
        </TouchableOpacity>
      )}
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
    width: '100%',
    alignSelf: 'center',
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
  privateRoomCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    borderRadius: RADIUS.control + 4,
    borderWidth: 1.5,
    marginVertical: SPACING.xs,
  },
  privateRoomLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    flex: 1,
  },
  privateRoomIconBox: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  privateRoomTitle: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  privateRoomSub: {
    fontSize: 11,
    fontWeight: '500',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  openRoomBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
  },
  openRoomBtnText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});
