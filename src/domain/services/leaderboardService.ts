import { supabase } from '../../lib/supabase';
import { Player, LeaderboardEntry } from '../types';

export const leaderboardService = {
  /**
   * Fetch the top 50 players globally, ordered by highest rating.
   */
  async fetchTopPlayers(currentPlayerId: string): Promise<LeaderboardEntry[]> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('rating', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error fetching leaderboard:', error);
        return [];
      }

      if (!data) return [];

      return data.map((row: any, index: number) => ({
        id: row.id,
        name: row.name,
        avatar: row.avatar || row.name?.substring(0, 2).toUpperCase() || 'PL',
        rank: index + 1,
        rating: row.rating,
        wins: row.wins || 0,
        winRate: row.win_rate || 0,
        tier: row.tier || 'Bronze',
        isCurrentUser: row.id === currentPlayerId,
      }));
    } catch (e) {
      console.error('Leaderboard exception:', e);
      return [];
    }
  },

  /**
   * Update the current player's stats in the database
   */
  async upsertPlayer(player: Player): Promise<void> {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          rating: player.rating,
          tier: player.tier,
        })
        .eq('id', player.id);

      if (error) {
        console.error('Failed to update player leaderboard stats:', error);
      }
    } catch (e) {
      console.error('Update player exception:', e);
    }
  },
};

