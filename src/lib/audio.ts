"use client";

class AudioSynthManager {
  private ctx: AudioContext | null = null;
  private carrier1: OscillatorNode | null = null;
  private carrier2: OscillatorNode | null = null;
  private lfo: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private masterGain: GainNode | null = null;
  private isSynthRunning: boolean = false;
  private isUnmuted: boolean = false;
  private wasUnmutedByUser: boolean = false;

  constructor() {
    // SSR Safe
  }

  private init() {
    if (typeof window === "undefined" || this.ctx) return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();

      // Create Audio Nodes
      this.carrier1 = this.ctx.createOscillator();
      this.carrier2 = this.ctx.createOscillator();
      this.lfo = this.ctx.createOscillator();
      this.lfoGain = this.ctx.createGain();
      this.filter = this.ctx.createBiquadFilter();
      this.masterGain = this.ctx.createGain();

      // 1. Low-Frequency Triangle Carrier (A2 - 110Hz)
      this.carrier1.type = "triangle";
      this.carrier1.frequency.setValueAtTime(110, this.ctx.currentTime);

      // 2. Harmonic Sine Carrier (E3 - 165Hz, perfect fifth above for smooth warmth)
      this.carrier2.type = "sine";
      this.carrier2.frequency.setValueAtTime(165, this.ctx.currentTime);

      // 3. Low Frequency Oscillator (LFO) for breathing cutoff modulation
      this.lfo.type = "sine";
      this.lfo.frequency.setValueAtTime(0.08, this.ctx.currentTime);

      // 4. LFO Gain (scales modulation to +/- 120Hz)
      this.lfoGain.gain.setValueAtTime(120, this.ctx.currentTime);

      // 5. Resonance Lowpass Filter (breathes with LFO)
      this.filter.type = "lowpass";
      this.filter.frequency.setValueAtTime(320, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(1.8, this.ctx.currentTime);

      // 6. Master Volume Gain Control (Starts fully muted)
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);

      // Connections
      this.lfo.connect(this.lfoGain);
      this.lfoGain.connect(this.filter.frequency);

      this.carrier1.connect(this.filter);
      this.carrier2.connect(this.filter);

      this.filter.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);

      // Start sound generation loops
      this.carrier1.start();
      this.carrier2.start();
      this.lfo.start();
      this.isSynthRunning = true;
    } catch (e) {
      console.warn("Web Audio API not supported or blocked: ", e);
    }
  }

  public toggleMute(unmute: boolean, isUserAction: boolean = false) {
    if (isUserAction) {
      this.wasUnmutedByUser = unmute;
    }
    this.isUnmuted = unmute;
    
    if (typeof window === "undefined") return;
    if (!this.ctx) this.init();

    if (this.ctx) {
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }

      const targetVolume = unmute ? 0.08 : 0;
      const fadeTime = unmute ? 2.0 : 0.4;
      const now = this.ctx.currentTime;

      if (this.masterGain) {
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.linearRampToValueAtTime(targetVolume, now + fadeTime);
      }
    }
  }

  public getWasUnmutedByUser(): boolean {
    return this.wasUnmutedByUser;
  }

  public isMuted(): boolean {
    return !this.isUnmuted;
  }

  // Plays a soft pluck on hover/clicks
  public playPluck(frequency: number, type: OscillatorType = "sine", duration = 0.12, volume = 0.03) {
    if (typeof window === "undefined" || !this.isUnmuted || !this.ctx) return;
    
    try {
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      const pluckFilter = this.ctx.createBiquadFilter();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, now);

      pluckFilter.type = "lowpass";
      pluckFilter.frequency.setValueAtTime(800, now);
      pluckFilter.frequency.exponentialRampToValueAtTime(150, now + duration);

      gainNode.gain.setValueAtTime(volume, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(pluckFilter);
      pluckFilter.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc.start();
      osc.stop(now + duration);
    } catch (e) {
      // Slient fail if audio context gets blocked
    }
  }

  public playHover() {
    // D6 pitch at 1174Hz, very brief soft sine pluck
    this.playPluck(1174, "sine", 0.08, 0.02);
  }

  public playClick() {
    // A5 pitch at 880Hz, slightly longer triangle pluck
    this.playPluck(880, "triangle", 0.18, 0.035);
  }
}

// Export single shared instance for cohesive sound effects across navbar, buttons, and hero
export const audioManager = new AudioSynthManager();
