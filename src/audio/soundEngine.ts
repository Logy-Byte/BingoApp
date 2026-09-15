/**
 * Mobile Native Audio Synthesis & Spoken Voice Caller Engine
 * Uses Tactile Haptic Feedback and Native Text-To-Speech (TTS)
 */

import Tts from 'react-native-tts';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

// Initialize TTS on startup
try {
  Tts.setDefaultRate(0.5); // Slower, more deliberate caller rate
  Tts.setDefaultPitch(1.0);
} catch (e) {
  console.log('TTS init failed:', e);
}

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export class SoundEngine {
  private static isMuted: boolean = false;
  private static voiceCallerEnabled: boolean = true;
  private static volume: number = 0.5; // (Volume not strictly applicable to basic haptics, but maintained for API compat)

  static setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  static isAudioMuted(): boolean {
    return this.isMuted;
  }

  static setVoiceEnabled(enabled: boolean) {
    this.voiceCallerEnabled = enabled;
  }

  static isVoiceEnabled(): boolean {
    return this.voiceCallerEnabled;
  }

  static setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  static getVolume(): number {
    return this.volume;
  }

  static playDaub() {
    if (this.isMuted) return;
    ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
  }

  static playBallDrawn() {
    if (this.isMuted) return;
    ReactNativeHapticFeedback.trigger('impactMedium', hapticOptions);
  }

  static playLineCompleted() {
    if (this.isMuted) return;
    ReactNativeHapticFeedback.trigger('notificationSuccess', hapticOptions);
  }

  static playWinFanfare() {
    if (this.isMuted) return;
    // Trigger a success burst
    ReactNativeHapticFeedback.trigger('notificationSuccess', hapticOptions);
    setTimeout(() => {
      ReactNativeHapticFeedback.trigger('impactHeavy', hapticOptions);
    }, 200);
    setTimeout(() => {
      ReactNativeHapticFeedback.trigger('notificationSuccess', hapticOptions);
    }, 400);
  }

  static playError() {
    if (this.isMuted) return;
    ReactNativeHapticFeedback.trigger('notificationError', hapticOptions);
  }

  /**
   * Spoken speech callout for 1-75.
   * e.g., "Twenty one", "Four"
   */
  static speakNumber(numberVal: number) {
    if (this.isMuted || !this.voiceCallerEnabled) return;
    try {
      Tts.stop();
      Tts.speak(`${numberVal}`);
    } catch (e) {
      console.log('TTS failed to speak:', e);
    }
  }
}
