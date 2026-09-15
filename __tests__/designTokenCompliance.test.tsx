import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { GameButton } from '../src/components/common/GameButton';
import { GameInput } from '../src/components/common/GameInput';
import { calcConcentricRadius, SPACING, RADIUS, TOUCH_TARGET } from '../src/design/tokens';
import { ThemeProvider } from '../src/design/theme';

describe('Design Token Compliance & Component Primitives', () => {
  describe('1. Concentric Geometry Token Mathematics', () => {
    it('correctly calculates inner concentric radius from outer radius and padding', () => {
      // outer 24, padding 16 -> inner 8
      expect(calcConcentricRadius(24, 16, 4)).toBe(8);
      // outer 28, padding 20 -> inner 8
      expect(calcConcentricRadius(28, 20, 4)).toBe(8);
      // outer 16, padding 16 -> clamped to minRadius 4
      expect(calcConcentricRadius(16, 16, 4)).toBe(4);
      // outer 12, padding 16 -> clamped to minRadius 4
      expect(calcConcentricRadius(12, 16, 4)).toBe(4);
    });

    it('enforces 4px/8px modular grid spacing values', () => {
      expect(SPACING.xs).toBe(4);
      expect(SPACING.sm).toBe(8);
      expect(SPACING.md).toBe(12);
      expect(SPACING.lg).toBe(16);
      expect(SPACING.xl).toBe(20);
      expect(SPACING.xxl).toBe(24);
      expect(SPACING.xxxl).toBe(32);
    });

    it('enforces Apple HIG 44pt minimum touch target', () => {
      expect(TOUCH_TARGET.minSize).toBe(44);
    });
  });

  describe('2. GameButton Primitive Behavior', () => {
    it('renders primary variant with title and handles press', () => {
      const onPressMock = jest.fn();
      let component: any;
      act(() => {
        component = renderer.create(
          <ThemeProvider>
            <GameButton title="Start Match" onPress={onPressMock} variant="primary" />
          </ThemeProvider>
        );
      });

      const root = component.root;
      const btn = root.findByProps({ accessibilityRole: 'button' });
      act(() => {
        btn.props.onPress();
      });
      expect(onPressMock).toHaveBeenCalledTimes(1);
    });

    it('renders pill variant mirroring navigation active pill capsule', () => {
      let component: any;
      act(() => {
        component = renderer.create(
          <ThemeProvider>
            <GameButton title="Capsule Active" onPress={() => {}} variant="pill" />
          </ThemeProvider>
        );
      });

      const root = component.root;
      const textNode = root.findByProps({ children: 'Capsule Active' });
      expect(textNode).toBeTruthy();
    });

    it('disables interaction when loading or disabled flag is true', () => {
      const onPressMock = jest.fn();
      let component: any;
      act(() => {
        component = renderer.create(
          <ThemeProvider>
            <GameButton title="Loading Action" onPress={onPressMock} loading={true} />
          </ThemeProvider>
        );
      });

      const root = component.root;
      const btn = root.findByProps({ accessibilityRole: 'button' });
      expect(btn.props.accessibilityState.disabled).toBe(true);
    });
  });

  describe('3. GameInput Primitive Behavior', () => {
    it('renders label, input text, and handles change events', () => {
      const onChangeMock = jest.fn();
      let component: any;
      act(() => {
        component = renderer.create(
          <ThemeProvider>
            <GameInput
              label="TEST FIELD"
              value="Current Input"
              onChangeText={onChangeMock}
              placeholder="Type here"
            />
          </ThemeProvider>
        );
      });

      const root = component.root;
      const textInput = root.findByProps({ value: 'Current Input' });
      expect(textInput).toBeTruthy();

      act(() => {
        textInput.props.onChangeText('New Input');
      });
      expect(onChangeMock).toHaveBeenCalledWith('New Input');
    });

    it('displays error message when error prop is provided', () => {
      let component: any;
      act(() => {
        component = renderer.create(
          <ThemeProvider>
            <GameInput
              label="CODE"
              value=""
              onChangeText={() => {}}
              error="Room code is invalid"
            />
          </ThemeProvider>
        );
      });

      const root = component.root;
      const textNodes = root.findAllByType('Text');
      const texts = textNodes.map((n: any) => n.props.children);
      expect(texts).toContain('Room code is invalid');
    });
  });

  describe('4. LobbyGallery Rectangular Box Gallery Architecture', () => {
    it('renders rectangular hero card and gallery boxes with proper callbacks', () => {
      const onPlayRanked = jest.fn();
      const onOpenBonus = jest.fn();
      const onOpenRooms = jest.fn();
      const onSolo = jest.fn();
      const onFriend = jest.fn();
      const onDaily = jest.fn();

      // Lazy load LobbyGallery
      const { LobbyGallery } = require('../src/components/lobby/LobbyGallery');

      let component: any;
      act(() => {
        component = renderer.create(
          <ThemeProvider>
            <LobbyGallery
              onPlayRanked={onPlayRanked}
              onOpenDailyBonusModal={onOpenBonus}
              onOpenRoomSelection={onOpenRooms}
              onSoloPress={onSolo}
              onFriendPress={onFriend}
              onDailyPress={onDaily}
              onlineCount={1450}
            />
          </ThemeProvider>
        );
      });

      const root = component.root;
      const textNodes = root.findAllByType('Text');
      const texts = textNodes.map((n: any) => n.props.children);

      // Verifies rectangular gallery boxes strictly containing the 3 playable options
      expect(texts).toContain('Random Player');
      expect(texts).toContain('Robot / Solo Practice');
      expect(texts).toContain('Daily Puzzle');
      expect(texts).not.toContain('Live Blitz');
      expect(texts).not.toContain('Bingo Rooms');
      expect(texts).not.toContain('Private Room');

      // Test interaction with Hero Random Player card
      const heroCard = root.findByProps({ accessibilityLabel: 'Play Random Player, Real Human 1v1 Matchmaking' });
      act(() => {
        heroCard.props.onPress();
      });
      expect(onPlayRanked).toHaveBeenCalledTimes(1);

      // Test interaction with Solo Practice
      const soloBox = root.findByProps({ accessibilityLabel: 'Solo practice against AI Robot' });
      act(() => {
        soloBox.props.onPress();
      });
      expect(onSolo).toHaveBeenCalledTimes(1);

      // Test interaction with Daily Puzzle
      const puzzleBox = root.findByProps({ accessibilityLabel: 'Daily Seed Puzzle Challenge' });
      act(() => {
        puzzleBox.props.onPress();
      });
      expect(onDaily).toHaveBeenCalledTimes(1);
    });
  });
});
