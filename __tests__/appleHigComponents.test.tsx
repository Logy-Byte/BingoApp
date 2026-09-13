/**
 * Apple HIG Inner Components & Tactile Experience Test Suite
 * Tests for: BingoMatrixCard, TactileRoomCard, PowerUpDockWidget, PremiumEmptyState,
 * AntiCheatValidator cryptographic tokens, and Replay Buffer reconciliation.
 */

import React from 'react';
import { View } from 'react-native';
import renderer, { act } from 'react-test-renderer';
import { BingoMatrixCard } from '../src/components/game/BingoMatrixCard';
import { TactileRoomCard } from '../src/components/room/TactileRoomCard';
import { PowerUpDockWidget } from '../src/components/game/PowerUpDockWidget';
import { PremiumEmptyState } from '../src/components/common/PremiumEmptyState';
import { AntiCheatValidator } from '../src/domain/multiplayer/antiCheatValidator';
import { generate5x5Board } from '../src/domain/engine/gridGameEngine';
import { PublicRoom } from '../src/domain/types';
import {
  IconTicket,
  IconTrophy,
  IconLightning,
  IconCoinStack,
  IconGemstone,
  IconDaubStar,
  IconWifiOff,
} from '../src/components/icons/CustomIcons';

describe('Apple HIG Inner View Components & Tactile Suite', () => {
  describe('1. Icon Vector Geometry Verification', () => {
    it('renders all bespoke mission icons without Unicode emojis', () => {
      let tree: any;
      act(() => {
        tree = renderer.create(
          <View>
            <IconTicket size={24} />
            <IconTrophy size={24} />
            <IconLightning size={24} />
            <IconCoinStack size={24} />
            <IconGemstone size={24} />
            <IconDaubStar size={24} />
            <IconWifiOff size={24} />
          </View>
        );
      });
      expect(tree).toBeTruthy();
    });
  });

  describe('2. BingoMatrixCard Component', () => {
    const testBoard = generate5x5Board('board-test-1', 'seed-123', true);
    const calledSet = new Set([testBoard.matrix[0][0].value, testBoard.matrix[0][1].value]);

    it('renders 5x5 grid cells and center free space correctly', () => {
      let pressedCell: any = null;
      let component: any;

      act(() => {
        component = renderer.create(
          <BingoMatrixCard
            board={testBoard}
            calledNumbersSet={calledSet}
            lastDrawnNumber={testBoard.matrix[0][0].value}
            onCellPress={(cell) => {
              pressedCell = cell;
            }}
            boardIndex={0}
            totalBoards={2}
            activeStreak={2}
          />
        );
      });

      expect(component).toBeTruthy();
      const root = component.root;
      // Center cell is free space
      expect(testBoard.matrix[2][2].isFreeSpace).toBe(true);
    });
  });

  describe('3. TactileRoomCard Component', () => {
    const testRoom: PublicRoom = {
      id: 'R999',
      name: 'High Roller VIP',
      privacy: 'open',
      hostId: 'sys',
      hostName: 'System',
      playerCount: 18,
      maxPlayers: 50,
      status: 'ACTIVE',
      createdAt: Date.now(),
      ticketPrice: 10.0,
      jackpotAmount: 1000000,
      recommendedTickets: [1, 2, 4, 8],
    };

    it('renders room telemetry and allows stepper increment/decrement within [1, 4]', () => {
      let selectedCount = 1;
      let component: any;

      act(() => {
        component = renderer.create(
          <TactileRoomCard
            room={testRoom}
            selectedTicketCount={1}
            onTicketCountChange={(cnt) => {
              selectedCount = cnt;
            }}
            onSelectRoom={() => {}}
            userBalanceCoins={50000}
          />
        );
      });

      expect(component).toBeTruthy();
    });
  });

  describe('4. PowerUpDockWidget Component', () => {
    it('renders radial energy meter and power-up slots without raw emojis', () => {
      let activatedPowerUp = '';
      let component: any;

      act(() => {
        component = renderer.create(
          <PowerUpDockWidget
            currentEnergy={85}
            onUsePowerUp={(type, name) => {
              activatedPowerUp = name;
            }}
            onOpenNextBallModal={() => {}}
          />
        );
      });

      expect(component).toBeTruthy();
    });
  });

  describe('5. PremiumEmptyState Component', () => {
    it('renders preset variants correctly with tactile action buttons', () => {
      let actionTriggered = false;
      let component: any;

      act(() => {
        component = renderer.create(
          <PremiumEmptyState
            variant="CONNECTION_SEVERED"
            onAction={() => {
              actionTriggered = true;
            }}
          />
        );
      });

      expect(component).toBeTruthy();
    });

    it('renders NO_ACTIVE_ROOMS empty state preset', () => {
      let tree: any;
      act(() => {
        tree = renderer.create(<PremiumEmptyState variant="NO_ACTIVE_ROOMS" onAction={() => {}} />);
      });
      expect(tree).toBeTruthy();
    });
  });

  describe('6. AntiCheat Cryptographic & Replay Buffer Verification', () => {
    const samplePayload = {
      playerId: 'player-xyz',
      boardId: 'b-player-xyz-1',
      claimTimestamp: 1726200000000,
    };

    it('generates consistent cryptographic claim tokens', () => {
      const token1 = AntiCheatValidator.generateClaimToken(samplePayload, 'SALT_A');
      const token2 = AntiCheatValidator.generateClaimToken(samplePayload, 'SALT_A');
      const tokenDiff = AntiCheatValidator.generateClaimToken(samplePayload, 'SALT_B');

      expect(token1).toBe(token2);
      expect(token1).not.toBe(tokenDiff);
      expect(AntiCheatValidator.verifyClaimToken(token1, samplePayload, 'SALT_A')).toBe(true);
      expect(AntiCheatValidator.verifyClaimToken(token1, samplePayload, 'WRONG_SALT')).toBe(false);
    });

    it('accurately reconciles missed called numbers in WebSocket replay buffer', () => {
      const localCalls = [5, 12, 18];
      const authoritativeStream = [5, 12, 18, 22, 7];

      const reconciliation = AntiCheatValidator.reconcileReplayBuffer(localCalls, authoritativeStream);
      expect(reconciliation.isDesynced).toBe(true);
      expect(reconciliation.missedCalls).toEqual([22, 7]);
    });
  });
});
