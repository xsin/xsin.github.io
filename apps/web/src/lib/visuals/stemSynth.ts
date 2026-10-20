/* O Muse demo loop — local Web Audio synthesis, ported from the prototype's `StemSynth`
   (prototype/xsin-studio/app.js). Four stems (vocals / drums / bass / other) are synthesised
   on device from oscillators and a noise buffer through a look-ahead scheduler; each stem has
   its own gain + analyser so the canvas can draw a live waveform. Mute/solo resolve to the
   same effective gain rule as the prototype: audible = !muted && (!anySolo || solo). */

export const STEM_LANES = [
  { id: 'vocals', color: '#7af3ff' },
  { id: 'drums', color: '#c8ff3d' },
  { id: 'bass', color: '#5b7cfa' },
  { id: 'other', color: '#a78bfa' }
] as const;

export type StemId = (typeof STEM_LANES)[number]['id'];

export const ALL_STEMS: readonly StemId[] = STEM_LANES.map((lane) => lane.id);

const CHORDS = [
  { root: 33, notes: [57, 60, 64, 67] },
  { root: 29, notes: [53, 57, 60, 64] },
  { root: 36, notes: [55, 60, 64, 67] },
  { root: 31, notes: [55, 59, 62, 64] }
] as const;

const MELODY: readonly Record<number, number>[] = [
  { 0: 69, 3: 72, 6: 76, 10: 74, 14: 72 },
  { 0: 69, 4: 72, 7: 76, 11: 77, 14: 72 },
  { 0: 67, 3: 71, 6: 76, 10: 79, 14: 76 },
  { 0: 74, 3: 71, 7: 67, 10: 74, 14: 76 }
];

const StepPattern = {
  bass: new Set([0, 3, 6, 8, 11, 14]),
  kick: new Set([0, 4, 8, 12]),
  snare: new Set([4, 12])
} as const;

const freq = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

/** Minimal AudioContext surface we touch (also covers Safari's `webkitAudioContext`). */
type AudioContextCtor = new () => AudioContext;

export interface StemRoute {
  gain: GainNode;
  analyser: AnalyserNode;
}

export class StemSynth {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private readonly routes = new Map<StemId, StemRoute>();
  private delaySend: GainNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;

  private playing = false;
  private step = 0;
  private nextTime = 0;
  private loopStart = 0;
  private timer = 0;

  readonly bpm = 92;
  readonly stepDur = 60 / 92 / 4;
  muted: Record<StemId, boolean> = { vocals: false, drums: false, bass: false, other: false };
  solo: Record<StemId, boolean> = { vocals: false, drums: false, bass: false, other: false };

  get isPlaying(): boolean {
    return this.playing;
  }

  get audioTime(): number {
    return this.ctx?.currentTime ?? 0;
  }

  route(id: StemId): StemRoute | undefined {
    return this.routes.get(id);
  }

  async init(): Promise<boolean> {
    if (this.ctx) return true;
    const Ctor = (window.AudioContext ??
      (window as unknown as { webkitAudioContext?: AudioContextCtor }).webkitAudioContext) as AudioContextCtor | undefined;
    if (!Ctor) return false;

    const ctx = new Ctor();
    this.ctx = ctx;
    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.value = -20;
    compressor.knee.value = 18;
    compressor.ratio.value = 3;
    compressor.attack.value = 0.004;
    compressor.release.value = 0.25;
    compressor.connect(ctx.destination);
    this.compressor = compressor;

    const master = ctx.createGain();
    master.gain.value = 0.55;
    master.connect(compressor);
    this.master = master;

    for (const lane of STEM_LANES) {
      const gain = ctx.createGain();
      gain.gain.value = 0.9;
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.82;
      gain.connect(analyser);
      analyser.connect(master);
      this.routes.set(lane.id, { gain, analyser });
    }

    this.noiseBuffer = this.makeNoise(ctx);

    const delay = ctx.createDelay(1.0);
    delay.delayTime.value = this.stepDur * 3;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.26;
    const damp = ctx.createBiquadFilter();
    damp.type = 'lowpass';
    damp.frequency.value = 2400;
    const send = ctx.createGain();
    send.gain.value = 0.38;
    send.connect(delay);
    delay.connect(damp);
    damp.connect(feedback);
    feedback.connect(delay);
    const vocals = this.routes.get('vocals');
    if (vocals) damp.connect(vocals.gain);
    this.delaySend = send;

    return true;
  }

  private makeNoise(ctx: AudioContext): AudioBuffer {
    const length = Math.floor(ctx.sampleRate * 1.5);
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1;
    return buffer;
  }

  async toggle(): Promise<boolean> {
    if (!this.ctx && !(await this.init())) throw new Error('Web Audio is unavailable');
    const ctx = this.ctx;
    if (!ctx) throw new Error('Web Audio is unavailable');
    if (this.playing) {
      this.pause();
    } else {
      await ctx.resume();
      this.play();
    }
    return this.playing;
  }

  play(): void {
    const ctx = this.ctx;
    const master = this.master;
    if (!ctx || !master) return;
    const now = ctx.currentTime;
    this.playing = true;
    this.step = 0;
    this.nextTime = now + 0.08;
    this.loopStart = this.nextTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(0.55, now + 0.14);
    window.clearInterval(this.timer);
    this.timer = window.setInterval(() => this.schedule(), 25);
  }

  pause(): void {
    this.playing = false;
    window.clearInterval(this.timer);
    this.timer = 0;
    const ctx = this.ctx;
    const master = this.master;
    if (ctx && master) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.04);
    }
  }

  /** Releases the AudioContext. Play while unmounted never schedules again because the
   * interval is cleared first, and every already-scheduled note is short-lived. */
  async dispose(): Promise<void> {
    this.pause();
    const ctx = this.ctx;
    this.ctx = null;
    this.master = null;
    this.compressor = null;
    this.delaySend = null;
    this.noiseBuffer = null;
    this.routes.clear();
    if (ctx && ctx.state !== 'closed') {
      try {
        await ctx.close();
      } catch {
        /* already closing */
      }
    }
  }

  private schedule(): void {
    const ctx = this.ctx;
    if (!ctx || !this.playing) return;
    const horizon = ctx.currentTime + 0.14;
    let guard = 0;
    while (this.nextTime < horizon && guard < 16) {
      this.scheduleStep(this.step, this.nextTime);
      this.nextTime += this.stepDur;
      this.step = (this.step + 1) % 64;
      guard += 1;
    }
  }

  private scheduleStep(step: number, time: number): void {
    const bar = Math.floor(step / 16) % 4;
    const s = step % 16;
    const chord = CHORDS[bar];
    if (!chord) return;

    if (s === 0) this.pad(chord.notes, time, this.stepDur * 16 * 0.96);
    if (StepPattern.bass.has(s)) this.bass(chord.root, time, this.stepDur * 1.6);
    if (StepPattern.kick.has(s)) this.kick(time);
    if (StepPattern.snare.has(s)) this.snare(time);
    if (s % 2 === 0) this.hat(time, s % 4 === 0 ? 0.032 : 0.018);
    const note = MELODY[bar]?.[s];
    if (note) this.lead(note, time, this.stepDur * 2.2);
  }

  private stem(id: StemId): GainNode | undefined {
    return this.routes.get(id)?.gain;
  }

  private pad(notes: readonly number[], time: number, duration: number): void {
    const ctx = this.ctx;
    const out = this.stem('other');
    if (!ctx || !out) return;
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.value = 0.7;
    filter.frequency.setValueAtTime(620, time);
    filter.frequency.linearRampToValueAtTime(1450, time + 0.9);
    gain.connect(filter);
    filter.connect(out);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.035, time + 0.4);
    gain.gain.setValueAtTime(0.035, time + duration * 0.6);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    notes.forEach((midi, index) => {
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.value = freq(midi);
      osc.detune.value = index % 2 === 0 ? -7 : 7;
      const voice = ctx.createGain();
      voice.gain.value = 0.5;
      osc.connect(voice);
      voice.connect(gain);
      osc.start(time);
      osc.stop(time + duration + 0.05);
    });
  }

  private bass(midi: number, time: number, duration: number): void {
    const ctx = this.ctx;
    const out = this.stem('bass');
    if (!ctx || !out) return;
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.value = freq(midi);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.145, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 340;
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(out);
    osc.start(time);
    osc.stop(time + duration + 0.02);
  }

  private kick(time: number): void {
    const ctx = this.ctx;
    const out = this.stem('drums');
    if (!ctx || !out) return;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, time);
    osc.frequency.exponentialRampToValueAtTime(45, time + 0.16);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.46, time + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.28);
    osc.connect(gain);
    gain.connect(out);
    osc.start(time);
    osc.stop(time + 0.3);
  }

  private snare(time: number): void {
    this.noiseHit(time, 1400, 0.075, 0.16, 0.005, 0.18);
  }

  private hat(time: number, level: number): void {
    this.noiseHit(time, 7600, level, 0.035, 0.003, 0.05);
  }

  private noiseHit(time: number, cutoff: number, peak: number, decay: number, attack: number, stopAfter: number): void {
    const ctx = this.ctx;
    const out = this.stem('drums');
    const noiseBuffer = this.noiseBuffer;
    if (!ctx || !out || !noiseBuffer) return;
    const source = ctx.createBufferSource();
    source.buffer = noiseBuffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = cutoff;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(peak, time + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + decay);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(out);
    source.start(time);
    source.stop(time + stopAfter);
  }

  private lead(midi: number, time: number, duration: number): void {
    const ctx = this.ctx;
    const out = this.stem('vocals');
    if (!ctx || !out) return;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.045, time + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    gain.connect(out);
    if (this.delaySend) gain.connect(this.delaySend);

    const oscA = ctx.createOscillator();
    oscA.type = 'sine';
    oscA.frequency.value = freq(midi);
    const oscB = ctx.createOscillator();
    oscB.type = 'triangle';
    oscB.frequency.value = freq(midi);
    oscB.detune.value = 6;
    oscA.connect(gain);
    oscB.connect(gain);
    oscA.start(time);
    oscB.start(time);
    oscA.stop(time + duration + 0.02);
    oscB.stop(time + duration + 0.02);
  }

  /** Applies mute/solo state without the prototype's toggle indirection. */
  setLanes(muted: Partial<Record<string, boolean>>, solo: Partial<Record<string, boolean>>): void {
    for (const id of ALL_STEMS) {
      this.muted[id] = Boolean(muted[id]);
      this.solo[id] = Boolean(solo[id]);
    }
    this.updateGains();
  }

  private updateGains(): void {
    const ctx = this.ctx;
    if (!ctx) return;
    const anySolo = ALL_STEMS.some((id) => this.solo[id]);
    for (const id of ALL_STEMS) {
      const route = this.routes.get(id);
      if (!route) continue;
      const audible = !this.muted[id] && (!anySolo || this.solo[id]);
      route.gain.gain.setTargetAtTime(audible ? 0.9 : 0, ctx.currentTime, 0.04);
    }
  }

  /** Position inside the 64-step loop, 0…1 (0 while paused, like the prototype). */
  get progress(): number {
    const ctx = this.ctx;
    if (!this.playing || !ctx) return 0;
    const loop = this.stepDur * 64;
    const elapsed = ctx.currentTime - this.loopStart;
    return (((elapsed % loop) + loop) % loop) / loop;
  }
}

export function rgba(hex: string, alpha: number): string {
  const value = parseInt(hex.slice(1), 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}
