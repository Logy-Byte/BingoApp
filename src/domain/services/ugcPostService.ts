/**
 * UGC Post & Feed Service
 * Apple Guideline 1.2 / Google Play UGC Policy Compliance
 * Production-grade post creation, feed filtering, local hiding,
 * and integration with the moderation engine.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../../lib/supabase';
import { UgcPost, PostStatus } from '../types';
import { globalModerationService } from './moderationService';

const STORAGE_KEYS = {
  POSTS: 'bingo_ugc_posts_feed',
  HIDDEN_POSTS: 'bingo_hidden_posts_',
};

export class UgcPostService {
  /**
   * Create a new UGC Post with pre-publication filtering & consent checks
   */
  public async createPost(
    authorId: string,
    authorName: string,
    rawContent: string
  ): Promise<{ success: boolean; post?: UgcPost; error?: string }> {
    // 1. Check user eligibility (Age Gate & EULA & Ban Status)
    const allowedCheck = await globalModerationService.isUserAllowedToPost(authorId);
    if (!allowedCheck.allowed) {
      return {
        success: false,
        error: allowedCheck.reason || 'You are not eligible to post.',
      };
    }

    // 2. Pre-publication Objectionable Content Filtering
    const filterResult = globalModerationService.filterContent(rawContent);
    if (filterResult.isObjectionable) {
      return {
        success: false,
        error: `Post rejected: ${filterResult.reason || 'Contains prohibited objectionable content.'}`,
      };
    }

    const now = Date.now();
    const newPost: UgcPost = {
      id: `post-${now}-${Math.floor(Math.random() * 9000 + 1000)}`,
      authorId,
      authorName: authorName.trim() || 'Anonymous Player',
      content: filterResult.cleanedContent,
      status: 'PUBLISHED',
      createdAt: now,
      updatedAt: now,
      reportsCount: 0,
    };

    // Save to Local Storage
    try {
      const posts = await this.getLocalPosts();
      posts.unshift(newPost);
      await AsyncStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    } catch {}

    // Save to Supabase
    try {
      await supabase.from('ugc_posts').insert({
        id: newPost.id,
        author_id: newPost.authorId,
        author_name: newPost.authorName,
        content: newPost.content,
        status: newPost.status,
        reports_count: 0,
        created_at: new Date(now).toISOString(),
        updated_at: new Date(now).toISOString(),
      });
    } catch {}

    return { success: true, post: newPost };
  }

  /**
   * Get Feed of Posts for a User
   * Filters out:
   * 1. Posts from users blocked by `userId`
   * 2. Posts hidden locally by `userId`
   * 3. Non-PUBLISHED posts (REMOVED, QUARANTINED, REJECTED)
   */
  public async getFeedPosts(userId: string): Promise<UgcPost[]> {
    const blockedUserIds = await globalModerationService.getBlockedUserIds(userId);
    const hiddenPostIds = await this.getHiddenPostIds(userId);

    let posts: UgcPost[] = [];

    // Fetch from Supabase
    try {
      const { data, error } = await supabase
        .from('ugc_posts')
        .select('*')
        .eq('status', 'PUBLISHED')
        .order('created_at', { ascending: false })
        .limit(50);

      if (data && !error && data.length > 0) {
        posts = data.map((d: any) => ({
          id: d.id,
          authorId: d.author_id,
          authorName: d.author_name,
          content: d.content,
          status: (d.status || 'PUBLISHED') as PostStatus,
          createdAt: new Date(d.created_at).getTime(),
          updatedAt: new Date(d.updated_at).getTime(),
          reportsCount: d.reports_count || 0,
        }));
      }
    } catch {}

    if (posts.length === 0) {
      posts = await this.getLocalPosts();
    }

    // Apply strict moderation filters
    return posts.filter((p) => {
      if (p.status !== 'PUBLISHED') return false;
      if (blockedUserIds.includes(p.authorId)) return false;
      if (hiddenPostIds.includes(p.id)) return false;
      return true;
    });
  }

  /**
   * Hide a post locally from user's feed
   */
  public async hidePostForUser(userId: string, postId: string): Promise<void> {
    const hidden = await this.getHiddenPostIds(userId);
    if (!hidden.includes(postId)) {
      hidden.push(postId);
      await AsyncStorage.setItem(`${STORAGE_KEYS.HIDDEN_POSTS}${userId}`, JSON.stringify(hidden));
    }
  }

  private async getHiddenPostIds(userId: string): Promise<string[]> {
    try {
      const stored = await AsyncStorage.getItem(`${STORAGE_KEYS.HIDDEN_POSTS}${userId}`);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  private async getLocalPosts(): Promise<UgcPost[]> {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.POSTS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}

    // Default seed posts for fresh installation
    const defaultPosts: UgcPost[] = [
      {
        id: 'post-seed-1',
        authorId: 'player-seed-101',
        authorName: 'Bingo Champ',
        content: 'Just hit a 5-line Full House in 12 calls! Who wants to challenge my record?',
        status: 'PUBLISHED',
        createdAt: Date.now() - 1000 * 60 * 45,
        updatedAt: Date.now() - 1000 * 60 * 45,
        reportsCount: 0,
      },
      {
        id: 'post-seed-2',
        authorId: 'player-seed-102',
        authorName: 'Anonymous Player',
        content: 'Ready for 1v1 Arena games. Good luck everyone and play fair!',
        status: 'PUBLISHED',
        createdAt: Date.now() - 1000 * 60 * 180,
        updatedAt: Date.now() - 1000 * 60 * 180,
        reportsCount: 0,
      },
    ];

    await AsyncStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(defaultPosts));
    return defaultPosts;
  }
}

export const globalUgcPostService = new UgcPostService();
