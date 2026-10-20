/* "Deep Field" — the site's ambient bed. A composition on top of Sfx, not
   another synth. Ported from prototype/xsin-studio/ambient.js (approved design
   draft, v2 "lighter / further"); see docs/sound.md.

   Slow (50 BPM), no percussion, no transients. Four chords of two bars each
   loop every 38.4 s over a continuous drone, so the seam is never audible: pads
   overlap while the sub bed and the air keep running. Bells are seeded per loop,
   which makes each pass repeat while the texture underneath drifts.

   Mixing intent: near layers (pads, bells) keep some dry signal; the noise field
   is routed to the reverb only, so the "air" sits behind everything. */

import { Sfx, type Destination } from './sfx';

export interface AmbientConfig {
  bpm: number;
  beatsPerChord: number;
  chords: readonly (readonly number[])[];
  penta: readonly number[];
  /** Master level after the fade-in. */
  level: number;
  fadeIn: number;
  fadeOut: number;
}

export const AMBIENT: AmbientConfig = {
  bpm: 50,
  beatsPerChord: 8,
  chords: [
    [146.83, 220.0, 329.63], // D3  A3  E4  — Dm(add9), no third
    [116.54, 174.61, 261.63], // Bb2 F3  C4  — Bb(add9)
    [98.0, 146.83, 220.0], // G2  D3  A3  — Gm, open fifth
    [110.0, 164.81, 293.66] // A2  E3  D4  — A7sus4, unresolved
  ],
  penta: [293.66, 349.23, 392.0, 440.0, 523.25], // D minor pentatonic, from D4
  level: 0.3,
  fadeIn: 3.2,
  fadeOut: 1.4
};

/** One chord lasts two bars: 9.6 s at 50 BPM. */
export function chordSeconds(config: AmbientConfig = AMBIENT): number {
  return (config.beatsPerChord * 60) / config.bpm;
}

/** The full harmonic loop: 38.4 s at the defaults. */
export function loopSeconds(config: AmbientConfig = AMBIENT): number {
  return chordSeconds(config) * config.chords.length;
}

/** Deterministic PRNG so a loop repeats instead of re-rolling every pass. */
export function seededRandom(seed: number): () => number {
  let a = seed | 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export class AmbientBgm {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private dry: GainNode | null = null;
  private hallIn: GainNode | null = null;
  private bellDry: GainNode | null = null;
  private persistent: AudioScheduledSourceNode[] = [];
  private timer = 0;
  private teardownTimer = 0;
  private nextChord = 0;
  private chordIndex = 0;
  private on = false;
  private manualOff = false;

  static get supported(): boolean {
    if (typeof window === 'undefined') return false;
    return Boolean(window.AudioContext ?? (window as unknown as { webkitAudioContext?: unknown }).webkitAudioContext);
  }

  /** True while the bed is playing (not merely faded out). */
  get isOn(): boolean {
    return this.on;
  }

  /** True once the visitor switched sound off by hand in this page view. */
  get hasManualOff(): boolean {
    return this.manualOff;
  }

  async enable(): Promise<boolean> {
    if (this.on) return true;
    if (!AmbientBgm.supported) return false;

    window.clearTimeout(this.teardownTimer);
    this.teardownTimer = 0;
    if (!this.ctx && !this.build()) return false;

    /* Resume without blocking the UI: a context that stays suspended (no
       gesture yet) must not hold back the toggle's visual state. */
    this.ctx?.resume().catch(() => {});

    this.on = true;
    this.manualOff = false;

    const now = this.ctx!.currentTime;
    const gain = this.master!.gain;
    gain.cancelScheduledValues(now);
    gain.setValueAtTime(Math.max(gain.value, 0.0001), now);
    gain.linearRampToValueAtTime(AMBIENT.level, now + AMBIENT.fadeIn);

    this.nextChord = now + 0.2;
    this.chordIndex = 0;
    this.startClock();
    return true;
  }

  disable(): void {
    if (!this.ctx || !this.on) return;
    this.on = false;
    this.manualOff = true;

    const now = this.ctx.currentTime;
    const gain = this.master!.gain;
    gain.cancelScheduledValues(now);
    gain.setValueAtTime(Math.max(gain.value, 0.0001), now);
    gain.linearRampToValueAtTime(0.0001, now + AMBIENT.fadeOut);

    this.stopClock();
    window.clearTimeout(this.teardownTimer);
    this.teardownTimer = window.setTimeout(() => this.teardown(), (AMBIENT.fadeOut + 0.2) * 1000);
  }

  async toggle(): Promise<boolean> {
    if (this.on) this.disable();
    else await this.enable();
    return this.on;
  }

  suspend(): void {
    if (this.ctx && this.ctx.state === 'running') this.ctx.suspend().catch(() => {});
  }

  resume(): void {
    if (this.ctx && this.on && this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
  }

  /** Release everything; safe to call repeatedly (React unmount, PWA reload). */
  dispose(): void {
    if (typeof window !== 'undefined') window.clearTimeout(this.teardownTimer);
    this.teardownTimer = 0;
    this.on = false;
    this.teardown();
  }

  /* --- graph -------------------------------------------------------- */

  private build(): boolean {
    const ctx = Sfx.createContext();
    if (!ctx) return false;
    this.ctx = ctx;

    const { master } = Sfx.out(ctx, { level: AMBIENT.level, threshold: -28, ratio: 2 });
    this.master = master;

    const dry = ctx.createGain();
    dry.gain.value = 0.75;
    dry.connect(master);
    this.dry = dry;

    /* A long, damped tail is what pushes the whole bed back. */
    const hall = Sfx.reverb(ctx, { seconds: 4.8, decay: 3.4, wet: 0.68, damping: 2400 });
    hall.output.connect(master);
    this.hallIn = hall.input;

    const bellDry = ctx.createGain();
    bellDry.gain.value = 0.35;
    bellDry.connect(dry);
    this.bellDry = bellDry;

    const bed = Sfx.drone(ctx, {
      voices: [
        { freq: 36.71, gain: 0.5, type: 'sine', detune: 3 },
        { freq: 55.0, gain: 0.32, type: 'triangle', detune: -4 },
        { freq: 73.42, gain: 0.12, type: 'sine', detune: 6 }
      ],
      level: 0.16,
      filter: 140,
      lfoRate: 0.028,
      lfoDepth: 0.04,
      dests: [dry, hall.input]
    });
    this.persistent.push(bed.lfo, ...bed.oscillators);

    /* Air goes to the reverb only: fully wet, so it reads as distance. */
    const air = Sfx.noiseField(ctx, {
      level: 0.06,
      center: 620,
      sweep: 260,
      sweepRate: 0.011,
      q: 0.7,
      seconds: 7,
      dests: [hall.input]
    });
    this.persistent.push(air.source, air.lfo);

    return true;
  }

  /* --- scheduling --------------------------------------------------- */

  private startClock(): void {
    this.stopClock();
    this.timer = window.setInterval(() => this.schedule(), 200);
    this.schedule();
  }

  private stopClock(): void {
    if (typeof window !== 'undefined') window.clearInterval(this.timer);
    this.timer = 0;
  }

  private schedule(): void {
    if (!this.ctx || !this.on) return;
    const horizon = this.ctx.currentTime + 1.2;
    let guard = 0;
    while (this.nextChord < horizon && guard < 4) {
      this.chord(this.nextChord, this.chordIndex);
      this.nextChord += chordSeconds();
      this.chordIndex += 1;
      guard += 1;
    }
  }

  private chord(time: number, index: number): void {
    if (!this.ctx) return;
    const notes = AMBIENT.chords[index % AMBIENT.chords.length] ?? AMBIENT.chords[0]!;
    const dur = chordSeconds();
    const dests: Destination[] = [this.dry!, this.hallIn!];

    notes.forEach((freq, voice) => {
      Sfx.pad(this.ctx!, {
        freq,
        detune: (voice - 1) * 4,
        gain: voice === 0 ? 0.044 : 0.032,
        attack: 3.4,
        hold: dur - 3.7,
        release: 4.4,
        when: time,
        filter: 1050,
        dests
      });
    });

    /* One or two bells per chord; the seed repeats every loop. */
    const loop = Math.floor(index / AMBIENT.chords.length);
    const rand = seededRandom(loop * 7919 + index * 131 + 17);
    const hits = rand() < 0.55 ? 2 : 1;
    for (let h = 0; h < hits; h += 1) {
      const at = time + 1.6 + rand() * (dur - 3.4);
      const freq = AMBIENT.penta[Math.floor(rand() * AMBIENT.penta.length)] ?? AMBIENT.penta[0]!;
      Sfx.pluck(this.ctx!, {
        freq,
        gain: 0.026 + rand() * 0.014,
        when: at,
        decayTime: 6.5,
        pan: rand() * 1.2 - 0.6,
        dests: [this.bellDry!, this.hallIn!]
      });
    }
  }

  private teardown(): void {
    this.stopClock();
    this.persistent.forEach((node) => {
      try {
        node.stop();
      } catch {
        /* already stopped */
      }
    });
    this.persistent = [];

    if (this.ctx) {
      try {
        this.ctx.close().catch(() => {});
      } catch {
        /* already closed */
      }
    }

    this.ctx = null;
    this.master = null;
    this.dry = null;
    this.hallIn = null;
    this.bellDry = null;
  }
}
