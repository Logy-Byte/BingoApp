import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../design/tokens';
import { useTheme } from '../../design/theme';
import { UgcPost } from '../../domain/types';
import { WarningIcon, CloseIcon } from '../icons/CustomIcons';

interface CommunityFeedCardProps {
  post: UgcPost;
  currentUserId: string;
  onReportPost: (post: UgcPost) => void;
  onBlockUser: (authorId: string, authorName: string) => void;
  onHidePost: (postId: string) => void;
}

/**
 * CommunityFeedCard
 * Individual User-Generated Content Post component.
 * Displays content alongside Report, Block User, and Hide actions.
 */
export const CommunityFeedCard: React.FC<CommunityFeedCardProps> = ({
  post,
  currentUserId,
  onReportPost,
  onBlockUser,
  onHidePost,
}) => {
  const { theme } = useTheme();
  const [showMenu, setShowMenu] = useState(false);

  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const isSelf = post.authorId === currentUserId;

  const handleConfirmBlock = () => {
    Alert.alert(
      'Block User',
      `Are you sure you want to block ${post.authorName}? Posts from this user will be hidden immediately.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Block User',
          style: 'destructive',
          onPress: () => onBlockUser(post.authorId, post.authorName),
        },
      ]
    );
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.bgCard,
          borderColor: theme.borderSubtle,
        },
      ]}
    >
      {/* Header Row: Author Avatar Initials, Name, Time, Menu Toggle */}
      <View style={styles.headerRow}>
        <View
          style={[
            styles.avatarBadge,
            {
              backgroundColor: theme.bgRecessed,
              borderColor: COLORS.winterHazel,
            },
          ]}
        >
          <Text style={[styles.avatarText, { color: theme.textPrimary }]}>
            {post.authorName.slice(0, 2).toUpperCase()}
          </Text>
        </View>

        <View style={styles.authorMeta}>
          <Text style={[styles.authorName, { color: theme.textPrimary }]}>
            {post.authorName}
          </Text>
          <Text style={[styles.timeAgo, { color: theme.textMuted }]}>
            {formatTimeAgo(post.createdAt)}
          </Text>
        </View>

        {!isSelf && (
          <TouchableOpacity
            style={[styles.menuToggle, { backgroundColor: theme.bgRecessed }]}
            onPress={() => setShowMenu(!showMenu)}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Post options"
          >
            <Text style={[styles.menuDots, { color: theme.textSecondary }]}>•••</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Post Content */}
      <Text style={[styles.contentBody, { color: theme.textPrimary }]}>
        {post.content}
      </Text>

      {/* Safety Actions Expandable Drawer */}
      {showMenu && !isSelf && (
        <View
          style={[
            styles.actionDrawer,
            {
              backgroundColor: theme.bgRecessed,
              borderColor: theme.borderSubtle,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => {
              setShowMenu(false);
              onReportPost(post);
            }}
            accessibilityRole="button"
            accessibilityLabel="Report post"
          >
            <WarningIcon size={14} color={COLORS.dangerRed} />
            <Text style={[styles.actionLabel, { color: COLORS.dangerRed }]}>
              Report Post
            </Text>
          </TouchableOpacity>

          <View style={[styles.actionDivider, { backgroundColor: theme.borderSubtle }]} />

          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => {
              setShowMenu(false);
              handleConfirmBlock();
            }}
            accessibilityRole="button"
            accessibilityLabel="Block user"
          >
            <CloseIcon size={14} color={theme.textSecondary} />
            <Text style={[styles.actionLabel, { color: theme.textSecondary }]}>
              Block User
            </Text>
          </TouchableOpacity>

          <View style={[styles.actionDivider, { backgroundColor: theme.borderSubtle }]} />

          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => {
              setShowMenu(false);
              onHidePost(post.id);
            }}
            accessibilityRole="button"
            accessibilityLabel="Hide post"
          >
            <Text style={[styles.actionLabel, { color: theme.textMuted }]}>
              Hide from Feed
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: RADIUS.surface,
    borderWidth: 1,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  avatarBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  avatarText: {
    fontSize: 13,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  authorMeta: {
    flex: 1,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  timeAgo: {
    fontSize: 11,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  menuToggle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuDots: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: -1,
  },
  contentBody: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  actionDrawer: {
    marginTop: SPACING.sm,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    paddingVertical: 4,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    paddingHorizontal: SPACING.md,
    paddingVertical: 8,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  actionDivider: {
    height: 1,
  },
});
