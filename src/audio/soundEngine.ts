/**
 * Audio Synthesis & Spoken Voice Caller Engine
 * Generates tactile retro chimes and spoken number callouts ("One", "Twenty-four", etc.)
 * with zero heavy audio bundle dependencies.
 */

export class SoundEngine {
  private static ctx: any = null;
  private static isMuted: boolean = false;
  private static voiceCallerEnabled: boolean = true;
  private static volume: number = 0.5;

  private static getContext(): any {
    if (typeof globalThis === 'undefined') return null;
    const AudioCtx =
      (globalThis as any).AudioContext || (globalThis as any).webkitAudioContext;
    if (!AudioCtx) return null;
    if (!this.ctx) {
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

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
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880.0, ctx.currentTime + 0.05); // A5
      gain.gain.setValueAtTime(0.3 * this.volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {}
  }

  static playBallDrawn() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(329.63, ctx.currentTime); // E4
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.09); // E5
      gain.gain.setValueAtTime(0.25 * this.volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.09);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {}
  }

  static playLineCompleted() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const chords = [523.25, 659.25, 783.99, 1046.5]; // C major arpeggio
      chords.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        const start = ctx.currentTime + idx * 0.06;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.3 * this.volume, start);
        gain.gain.exponentialRampToValueAtTime(0.01, start + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.18);
      });
    } catch {}
  }

  static playWinFanfare() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const notes = [440, 554.37, 659.25, 880, 1108.73];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        const start = ctx.currentTime + idx * 0.1;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.25 * this.volume, start);
        gain.gain.exponentialRampToValueAtTime(0.01, start + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.3);
      });
    } catch {}
  }

  static playError() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      gain.gain.setValueAtTime(0.2 * this.volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {}
  }

  /**
   * Spoken speech callout for 1-25.
   * e.g., "Twenty one", "Four"
   */
  static speakNumber(numberVal: number) {
    if (this.isMuted || !this.voiceCallerEnabled) return;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(`${numberVal}`);
        utterance.rate = 1.05;
        utterance.pitch = 1.0;
        utterance.volume = this.volume;
        window.speechSynthesis.speak(utterance);
      } catch {}
    }
  }
}
