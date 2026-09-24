import { globalModerationService, normalizeText } from '../src/domain/services/moderationService';
import { globalUgcPostService } from '../src/domain/services/ugcPostService';
import { globalRoomManager } from '../src/domain/multiplayer/roomManager';
import { Player } from '../src/domain/types';

describe('UGC Content Safety & Moderation System Test Suite', () => {
  const testUserId = 'test-user-101';
  const abuserUserId = 'abuser-user-999';

  const testPlayer: Player = {
    id: testUserId,
    name: 'Clean Player',
    avatar: 'CP',
    isHost: false,
    isReady: true,
    score: 0,
    linesCompleted: 0,
    hasWon: false,
    rating: 1500,
    tier: 'Platinum',
    coins: 5000,
    gems: 100,
  };

  beforeEach(async () => {
    // Reset test user moderation state
    await globalModerationService.setAgeVerified(testUserId, false);
    await globalModerationService.setTermsAccepted(testUserId, false);
    await globalModerationService.setAgeVerified(abuserUserId, false);
    await globalModerationService.setTermsAccepted(abuserUserId, false);
  });

  describe('1. Text Normalization & Pre-Publication Objectionable Content Filtering', () => {
    test('allows legitimate Bingo-related text', () => {
      const cleanInputs = [
        'Looking for a 1v1 Bingo match!',
        'Friendly Arena - All Welcome',
        'Good game! I completed 5 lines on B-12.',
        'Custom 5x5 Bingo room 102',
      ];

      cleanInputs.forEach((text) => {
        const res = globalModerationService.filterContent(text);
        expect(res.isObjectionable).toBe(false);
        expect(res.cleanedContent).toBe(text);
      });
    });

    test('normalizes obfuscated punctuation, symbols, and spacing', () => {
      expect(normalizeText('F.U.C.K')).toBe('fuck');
      expect(normalizeText('S E X')).toBe('sex');
      expect(normalizeText('B!t.c.h')).toBe('bitch');
    });

    test('detects and rejects explicit sexual content', () => {
      const res = globalModerationService.filterContent('Check out my nude videos!');
      expect(res.isObjectionable).toBe(true);
      expect(res.category).toBe('SEXUAL_CONTENT');
    });

    test('detects and rejects violent threats and harassment', () => {
      const res = globalModerationService.filterContent('I will kill you if you win');
      expect(res.isObjectionable).toBe(true);
      expect(res.category).toBe('THREAT');
    });

    test('detects and rejects hate speech and slurs', () => {
      const res = globalModerationService.filterContent('You are a dirty nigger');
      expect(res.isObjectionable).toBe(true);
      expect(res.category).toBe('HATE_SPEECH');
    });

    test('detects and rejects doxxing and PII exposure', () => {
      const res = globalModerationService.filterContent('Call me at 555-123-4567 or email john@gmail.com');
      expect(res.isObjectionable).toBe(true);
      expect(res.category).toBe('DOXXING');
    });
  });

  describe('2. Adult 18+ Age Gate & Terms Consent Enforcement', () => {
    test('blocks UGC participation before age verification', async () => {
      const allowed = await globalModerationService.isUserAllowedToPost(testUserId);
      expect(allowed.allowed).toBe(false);
      expect(allowed.requiresAgeGate).toBe(true);
    });

    test('blocks UGC participation before EULA terms acceptance', async () => {
      await globalModerationService.setAgeVerified(testUserId, true);
      const allowed = await globalModerationService.isUserAllowedToPost(testUserId);
      expect(allowed.allowed).toBe(false);
      expect(allowed.requiresTerms).toBe(true);
    });

    test('allows UGC creation after age gate and EULA acceptance', async () => {
      await globalModerationService.setAgeVerified(testUserId, true);
      await globalModerationService.setTermsAccepted(testUserId, true, 'v1.0');

      const allowed = await globalModerationService.isUserAllowedToPost(testUserId);
      expect(allowed.allowed).toBe(true);
    });
  });

  describe('3. UGC Post Creation & Feed Filtering', () => {
    test('creates valid post when user is eligible and content is clean', async () => {
      await globalModerationService.setAgeVerified(testUserId, true);
      await globalModerationService.setTermsAccepted(testUserId, true, 'v1.0');

      const res = await globalUgcPostService.createPost(
        testUserId,
        'Clean Player',
        'Excited for the Bingo tournament today!'
      );

      expect(res.success).toBe(true);
      expect(res.post).toBeDefined();
      expect(res.post?.content).toBe('Excited for the Bingo tournament today!');
    });

    test('rejects post containing objectionable content', async () => {
      await globalModerationService.setAgeVerified(testUserId, true);
      await globalModerationService.setTermsAccepted(testUserId, true, 'v1.0');

      const res = await globalUgcPostService.createPost(
        testUserId,
        'Clean Player',
        'Go die you trash'
      );

      expect(res.success).toBe(false);
      expect(res.error).toContain('rejected');
    });
  });

  describe('4. In-App User Blocking & Feed Exclusion', () => {
    test('immediately excludes posts from blocked users', async () => {
      await globalModerationService.setAgeVerified(abuserUserId, true);
      await globalModerationService.setTermsAccepted(abuserUserId, true, 'v1.0');

      // Create post from abuser
      const postRes = await globalUgcPostService.createPost(
        abuserUserId,
        'Abusive User',
        'Harassing message from abusive player'
      );
      expect(postRes.success).toBe(true);

      // Block abuser
      await globalModerationService.blockUser(testUserId, abuserUserId);

      // Fetch feed for testUserId
      const feed = await globalUgcPostService.getFeedPosts(testUserId);
      const containsAbuserPost = feed.some((p) => p.authorId === abuserUserId);
      expect(containsAbuserPost).toBe(false);
    });
  });

  describe('5. Local Post Hiding', () => {
    test('removes hidden post from user feed view', async () => {
      await globalModerationService.setAgeVerified(testUserId, true);
      await globalModerationService.setTermsAccepted(testUserId, true, 'v1.0');

      const postRes = await globalUgcPostService.createPost(
        testUserId,
        'Clean Player',
        'Post to hide locally'
      );
      const postId = postRes.post!.id;

      // Hide post
      await globalUgcPostService.hidePostForUser(testUserId, postId);

      const feed = await globalUgcPostService.getFeedPosts(testUserId);
      const found = feed.some((p) => p.id === postId);
      expect(found).toBe(false);
    });
  });

  describe('6. Report Submission & 24-Hour SLA Tracking', () => {
    test('submits report with 24-hour SLA deadline', async () => {
      const now = Date.now();
      const res = await globalModerationService.submitReport({
        postId: 'post-101',
        reportedUserId: abuserUserId,
        reporterId: testUserId,
        category: 'HARASSMENT',
        description: 'Targeted insult in public match',
      });

      expect(res.success).toBe(true);
      expect(res.report.category).toBe('HARASSMENT');
      expect(res.report.slaDeadline).toBeGreaterThanOrEqual(now + 24 * 60 * 60 * 1000 - 1000);
      expect(res.report.status).toBe('OPEN');
    });

    test('prevents duplicate report spam from same reporter for same post', async () => {
      await globalModerationService.submitReport({
        postId: 'post-dup-1',
        reportedUserId: abuserUserId,
        reporterId: testUserId,
        category: 'SPAM',
      });

      const second = await globalModerationService.submitReport({
        postId: 'post-dup-1',
        reportedUserId: abuserUserId,
        reporterId: testUserId,
        category: 'SPAM',
      });

      expect(second.success).toBe(true);
      expect(second.message).toContain('already reported');
    });
  });

  describe('7. Moderation Queue & User Suspension / Ejection', () => {
    test('resolves report and ejects/bans offending user', async () => {
      const reportRes = await globalModerationService.submitReport({
        postId: 'post-severe-1',
        reportedUserId: abuserUserId,
        reporterId: testUserId,
        category: 'MINOR_SAFETY',
      });

      // Moderator ejects user
      await globalModerationService.resolveReport(
        reportRes.report.id,
        'admin-mod-1',
        'EJECT_USER',
        'Severe minor safety violation'
      );

      // Verify abuser is banned
      const allowed = await globalModerationService.isUserAllowedToPost(abuserUserId);
      expect(allowed.allowed).toBe(false);
      expect(allowed.reason).toContain('suspended');
    });
  });

  describe('8. Server-Side Content Filter Enforcement on Room Creation', () => {
    test('rejects room creation with objectionable room name', async () => {
      await expect(
        globalRoomManager.createRoom('Fuck This Room', testPlayer, 'open')
      ).rejects.toThrow('Room name rejected');
    });
  });
});
