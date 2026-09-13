import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { SettingsScreen } from '../src/screens/SettingsScreen';
import { SettingsRow } from '../src/components/common/SettingsRow';
import { ThemeProvider } from '../src/design/theme';
import { SoundEngine } from '../src/audio/soundEngine';

describe('Settings Architecture & Mobile Row Ergonomics', () => {
  beforeEach(() => {
    SoundEngine.setMuted(false);
    SoundEngine.setVoiceEnabled(true);
    SoundEngine.setVolume(0.5);
  });

  it('SettingsRow renders Title and Supporting description correctly', () => {
    let component: any;
    act(() => {
      component = renderer.create(
        <ThemeProvider>
          <SettingsRow
            title="Sound Effects"
            description="Tactile dauber pop, ball call chime, victory fanfare"
          />
        </ThemeProvider>
      );
    });

    const root = component.root;
    const textNodes = root.findAllByType('Text');
    const texts = textNodes.map((n: any) => n.props.children);

    expect(texts).toContain('Sound Effects');
    expect(texts).toContain('Tactile dauber pop, ball call chime, victory fanfare');
  });

  it('SettingsScreen renders standard mobile section headers and rows', () => {
    const onBackMock = jest.fn();
    let component: any;
    act(() => {
      component = renderer.create(
        <ThemeProvider>
          <SettingsScreen onBack={onBackMock} />
        </ThemeProvider>
      );
    });

    const root = component.root;
    const textNodes = root.findAllByType('Text');
    const texts = textNodes.map((n: any) => n.props.children);

    // Section headers
    expect(texts).toContain('Appearance & Theme');
    expect(texts).toContain('Audio & Tactile');
    expect(texts).toContain('Design Architecture');
    expect(texts).toContain('Account & Sovereignty');

    // Clean mobile rows present
    expect(texts).toContain('Sound Effects');
    expect(texts).toContain('Voice Speech Caller');
    expect(texts).toContain('Master Volume');
    expect(texts).toContain('Icon Specimen Sheet & QA');
  });

  it('Audio controls trigger mute and voice caller state changes', () => {
    const onBackMock = jest.fn();
    let component: any;
    act(() => {
      component = renderer.create(
        <ThemeProvider>
          <SettingsScreen onBack={onBackMock} />
        </ThemeProvider>
      );
    });

    const root = component.root;
    const soundToggle = root.findByProps({ accessibilityLabel: 'Sound effects toggle' });
    expect(SoundEngine.isAudioMuted()).toBe(false);

    act(() => {
      soundToggle.props.onPress();
    });
    expect(SoundEngine.isAudioMuted()).toBe(true);

    const voiceToggle = root.findByProps({ accessibilityLabel: 'Voice caller toggle' });
    expect(SoundEngine.isVoiceEnabled()).toBe(true);

    act(() => {
      voiceToggle.props.onPress();
    });
    expect(SoundEngine.isVoiceEnabled()).toBe(false);
  });

  it('Master volume adjusts low, med, high levels', () => {
    const onBackMock = jest.fn();
    let component: any;
    act(() => {
      component = renderer.create(
        <ThemeProvider>
          <SettingsScreen onBack={onBackMock} />
        </ThemeProvider>
      );
    });

    const root = component.root;
    const highBtn = root.findByProps({ accessibilityLabel: 'Set volume high' });
    act(() => {
      highBtn.props.onPress();
    });
    expect(SoundEngine.getVolume()).toBe(1.0);

    const lowBtn = root.findByProps({ accessibilityLabel: 'Set volume low' });
    act(() => {
      lowBtn.props.onPress();
    });
    expect(SoundEngine.getVolume()).toBe(0.25);
  });

  it('Two-step account deletion requires confirmation before irreversible wipe', () => {
    const onBackMock = jest.fn();
    let component: any;
    act(() => {
      component = renderer.create(
        <ThemeProvider>
          <SettingsScreen onBack={onBackMock} />
        </ThemeProvider>
      );
    });

    const root = component.root;

    // Trigger row is present
    const deleteRow = root.findByProps({
      accessibilityLabel:
        'Delete Account & Reset Data, Permanently erase match history, MMR, and achievements',
    });
    expect(deleteRow).toBeTruthy();

    // Tap to show confirmation
    act(() => {
      deleteRow.props.onPress();
    });

    const confirmBtn = root.findByProps({ accessibilityLabel: 'Permanently Delete Account' });
    expect(confirmBtn).toBeTruthy();

    // Confirm wipe
    act(() => {
      confirmBtn.props.onPress();
    });

    const textNodes = root.findAllByType('Text');
    const texts = textNodes.map((n: any) => n.props.children);
    expect(texts).toContain(
      'Account data, match records, and progression have been completely deleted.'
    );
  });
});
