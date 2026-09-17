import { supabase } from '../../lib/supabase';
import { Player, LeaderboardEntry } from '../types';

export const leaderboardService = {
  /**
   * Fetch the top 50 players globally, ordered by highest rating.
   */
  async fetchTopPlayers(currentPlayerId: string, period: string = 'All Time'): Promise<LeaderboardEntry[]> {
    try {
      const { data, error } = await supabase
        .rpc('get_leaderboard', { period_filter: period })
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

  /**
   * Record a match result in match_history
   */
  async recordMatchResult(
    playerId: string, 
    hasWon: boolean, 
    mode: string = 'RANKED', 
    score: number = 0, 
    lines: number = 0, 
    ratingDelta: number = 0
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from('match_history')
        .insert({
          player_id: playerId,
          result: hasWon ? 'WIN' : 'LOSS',
          mode,
          score,
          lines,
          rating_delta: ratingDelta
        });
        
      if (error) {
        console.error('Failed to record match result:', error);
      }
    } catch (e) {
      console.error('Record match result exception:', e);
    }
  },

  /**
   * Fetch a full player profile including match history and derived stats
   */
  async getPlayerProfile(playerId: string): Promise<any | null> {
    try {
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', playerId)
        .single();
        
      if (profileError) {
        console.error('Failed to fetch player profile:', profileError);
        return null;
      }

      // Fetch recent match history
      const { data: historyData, error: historyError } = await supabase
        .from('match_history')
        .select('*')
        .eq('player_id', playerId)
        .order('created_at', { ascending: false })
        .limit(50);
        
      if (historyError) {
        console.error('Failed to fetch match history:', historyError);
      }

      return {
        profile: profileData,
        history: historyData || [],
      };
    } catch (e) {
      console.error('Fetch player profile exception:', e);
      return null;
    }
  }
};

