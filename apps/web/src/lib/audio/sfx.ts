/* The studio's in-house sound kit: small Web Audio primitives shared by the
   site's synthesised audio. No audio files — every voice is generated at
   runtime. Ported from prototype/xsin-studio/sfx.js (approved design draft);
   see docs/sound.md for the sound design and mixing intent.

   Helpers return the nodes they created so callers can schedule, route and
   release them. Nothing here knows about chords, loops or the page. */

/** Minimal AudioContext constructor surface (also covers Safari's `webkitAudioContext`). */
type AudioContextCtor = new () => AudioContext;

/** Where a voice sends its signal: a bus gain, a reverb input, both, … */
export type Destination = AudioNode;

export interface ReverbOptions {
  /** Impulse length in seconds. */
  seconds?: number;
  /** Higher decays faster; 3–3.5 reads as a large, soft room. */
  decay?: number;
  /** Output gain of the wet signal. */
  wet?: number;
  /** Lowpass on the tail. Darker tails read as distance. */
  damping?: number;
}

export interface Reverb {
  input: GainNode;
  output: GainNode;
  convolver: ConvolverNode;
  lowpass: BiquadFilterNode;
}

export interface PadOptions {
  freq: number;
  type?: OscillatorType;
  detune?: number;
  gain?: number;
  attack?: number;
  hold?: number;
  release?: number;
  when?: number;
  filter?: number;
  filterQ?: number;
  dests?: readonly Destination[];
}

export interface PadVoice {
  osc: OscillatorNode;
  envelope: GainNode;
  lowpass: BiquadFilterNode;
  stopAt: number;
}

export interface PluckOptions {
  freq: number;
  gain?: number;
  when?: number;
  decayTime?: number;
  /** Inharmonic partial ratio; 0 disables the overtone. */
  partial?: number;
  partialGain?: number;
  pan?: number;
  dests?: readonly Destination[];
}

export interface PluckVoice {
  fundamental: OscillatorNode;
  overtone: OscillatorNode | null;
  envelope: GainNode;
  panner: StereoPannerNode | null;
}

export interface DroneVoice {
  freq: number;
  gain: number;
  type?: OscillatorType;
  detune?: number;
}

export interface DroneOptions {
  voices?: readonly DroneVoice[];
  level?: number;
  filter?: number;
  lfoRate?: number;
  lfoDepth?: number;
  dests?: readonly Destination[];
}

export interface Drone {
  bus: GainNode;
  lowpass: BiquadFilterNode;
  lfo: OscillatorNode;
  oscillators: OscillatorNode[];
}

export interface NoiseFieldOptions {
  level?: number;
  center?: number;
  sweep?: number;
  sweepRate?: number;
  q?: number;
  seconds?: number;
  dests?: readonly Destination[];
}

export interface NoiseField {
  source: AudioBufferSourceNode;
  band: BiquadFilterNode;
  gain: GainNode;
  lfo: OscillatorNode;
}

export interface OutOptions {
  level?: number;
  threshold?: number;
  ratio?: number;
}

export interface Out {
  master: GainNode;
  compressor: DynamicsCompressorNode;
}

/** Create an AudioContext, or null where Web Audio is unavailable. */
function createContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const Ctor = (window.AudioContext ??
    (window as unknown as { webkitAudioContext?: AudioContextCtor }).webkitAudioContext) as
    | AudioContextCtor
    | undefined;
  return Ctor ? new Ctor() : null;
}

/** A looping noise buffer. Longer buys less audible repetition. */
function noise(ctx: AudioContext, seconds = 6): AudioBuffer {
  const length = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1;
  return buffer;
}

/** Stereo impulse response: exponentially decaying noise. */
function impulse(ctx: AudioContext, seconds = 4, decay = 3): AudioBuffer {
  const length = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(2, length, ctx.sampleRate);
  for (let channel = 0; channel < 2; channel += 1) {
    const data = buffer.getChannelData(channel);
    for (let i = 0; i < length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    }
  }
  return buffer;
}

/**
 * A convolution send. `damping` rolls off the tail, which is what makes a
 * layer read as distant rather than merely reverberant.
 */
function reverb(ctx: AudioContext, options: ReverbOptions = {}): Reverb {
  const { seconds = 4.2, decay = 3.2, wet = 0.5, damping = 3200 } = options;

  const input = ctx.createGain();
  const convolver = ctx.createConvolver();
  convolver.buffer = impulse(ctx, seconds, decay);

  const lowpass = ctx.createBiquadFilter();
  lowpass.type = 'lowpass';
  lowpass.frequency.value = damping;

  const output = ctx.createGain();
  output.gain.value = wet;

  input.connect(convolver);
  convolver.connect(lowpass);
  lowpass.connect(output);
  return { input, output, convolver, lowpass };
}

/** Stereo position. Returns null where StereoPanner is missing. */
function pan(ctx: AudioContext, value: number): StereoPannerNode | null {
  if (typeof ctx.createStereoPanner !== 'function') return null;
  const node = ctx.createStereoPanner();
  node.pan.value = Math.max(-1, Math.min(1, value));
  return node;
}

/**
 * Sustained voice: linear attack, hold, linear release. Use for pads that must
 * cross-fade without a click.
 */
function pad(ctx: AudioContext, options: PadOptions): PadVoice {
  const {
    freq,
    type = 'triangle',
    detune = 0,
    gain = 0.05,
    attack = 3,
    hold = 6,
    release = 4,
    when = 0,
    filter = 1200,
    filterQ = 0.4,
    dests = []
  } = options;

  const osc = ctx.createOscillator();
  osc.type = type;
  osc.frequency.value = freq;
  osc.detune.value = detune;

  const lowpass = ctx.createBiquadFilter();
  lowpass.type = 'lowpass';
  lowpass.frequency.value = filter;
  lowpass.Q.value = filterQ;

  const envelope = ctx.createGain();
  envelope.gain.value = 0.0001;
  osc.connect(lowpass);
  lowpass.connect(envelope);
  dests.forEach((dest) => envelope.connect(dest));

  const stopAt = when + attack + hold + release;
  envelope.gain.setValueAtTime(0.0001, when);
  envelope.gain.linearRampToValueAtTime(gain, when + attack);
  envelope.gain.setValueAtTime(gain, when + attack + hold);
  envelope.gain.linearRampToValueAtTime(0.0001, stopAt);

  osc.start(when);
  osc.stop(stopAt + 0.05);
  return { osc, envelope, lowpass, stopAt };
}

/**
 * Struck voice: fast attack and an exponential tail, optionally with an
 * inharmonic partial for a bell rather than a pure tone.
 */
function pluck(ctx: AudioContext, options: PluckOptions): PluckVoice {
  const {
    freq,
    gain = 0.04,
    when = 0,
    decayTime = 6,
    partial = 2.004,
    partialGain = 0.18,
    pan: position = 0,
    dests = []
  } = options;

  const envelope = ctx.createGain();
  envelope.gain.setValueAtTime(0.0001, when);
  envelope.gain.exponentialRampToValueAtTime(gain, when + 0.02);
  envelope.gain.exponentialRampToValueAtTime(0.0001, when + decayTime);

  const panner = pan(ctx, position);
  if (panner) {
    envelope.connect(panner);
    dests.forEach((dest) => panner.connect(dest));
  } else {
    dests.forEach((dest) => envelope.connect(dest));
  }

  const fundamental = ctx.createOscillator();
  fundamental.type = 'sine';
  fundamental.frequency.value = freq;
  fundamental.connect(envelope);

  let overtone: OscillatorNode | null = null;
  if (partial) {
    overtone = ctx.createOscillator();
    overtone.type = 'sine';
    overtone.frequency.value = freq * partial;
    const overtoneGain = ctx.createGain();
    overtoneGain.gain.value = partialGain;
    overtone.connect(overtoneGain);
    overtoneGain.connect(envelope);
  }

  fundamental.start(when);
  overtone?.start(when);
  fundamental.stop(when + decayTime + 0.2);
  overtone?.stop(when + decayTime + 0.2);
  return { fundamental, overtone, envelope, panner };
}

/**
 * A permanent low bed: a detuned stack through a lowpass, breathing on an LFO.
 * Returns handles so the caller can stop it on teardown.
 */
function drone(ctx: AudioContext, options: DroneOptions = {}): Drone {
  const { voices = [], level = 0.2, filter = 150, lfoRate = 0.03, lfoDepth = 0.05, dests = [] } = options;

  const bus = ctx.createGain();
  bus.gain.value = level;

  const lowpass = ctx.createBiquadFilter();
  lowpass.type = 'lowpass';
  lowpass.frequency.value = filter;
  lowpass.Q.value = 0.5;

  bus.connect(lowpass);
  dests.forEach((dest) => lowpass.connect(dest));

  const lfo = ctx.createOscillator();
  lfo.frequency.value = lfoRate;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = lfoDepth;
  lfo.connect(lfoGain);
  lfoGain.connect(bus.gain);
  lfo.start();

  const oscillators = voices.map((voice) => {
    const osc = ctx.createOscillator();
    osc.type = voice.type ?? 'sine';
    osc.frequency.value = voice.freq;
    osc.detune.value = voice.detune ?? 0;
    const gain = ctx.createGain();
    gain.gain.value = voice.gain;
    osc.connect(gain);
    gain.connect(bus);
    osc.start();
    return osc;
  });

  return { bus, lowpass, lfo, oscillators };
}

/**
 * Looping noise through a slow-swept bandpass: air, wind, distance. Route it to
 * the reverb only and it sits well behind the mix.
 */
function noiseField(ctx: AudioContext, options: NoiseFieldOptions = {}): NoiseField {
  const {
    level = 0.02,
    center = 700,
    sweep = 300,
    sweepRate = 0.015,
    q = 0.8,
    seconds = 6,
    dests = []
  } = options;

  const source = ctx.createBufferSource();
  source.buffer = noise(ctx, seconds);
  source.loop = true;

  const band = ctx.createBiquadFilter();
  band.type = 'bandpass';
  band.frequency.value = center;
  band.Q.value = q;

  const gain = ctx.createGain();
  gain.gain.value = level;

  source.connect(band);
  band.connect(gain);
  dests.forEach((dest) => gain.connect(dest));
  source.start();

  const lfo = ctx.createOscillator();
  lfo.frequency.value = sweepRate;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = sweep;
  lfo.connect(lfoGain);
  lfoGain.connect(band.frequency);
  lfo.start();

  return { source, band, gain, lfo };
}

/** Master out: fadeable gain into a gentle compressor into the destination. */
function out(ctx: AudioContext, options: OutOptions = {}): Out {
  const { level = 0.3, threshold = -26, ratio = 2 } = options;

  const master = ctx.createGain();
  master.gain.value = 0.0001;

  const compressor = ctx.createDynamicsCompressor();
  compressor.threshold.value = threshold;
  compressor.knee.value = 20;
  compressor.ratio.value = ratio;
  compressor.attack.value = 0.01;
  compressor.release.value = 0.5;

  master.connect(compressor);
  compressor.connect(ctx.destination);
  return { master, compressor };
}

export const Sfx = {
  createContext,
  noise,
  impulse,
  reverb,
  pan,
  pad,
  pluck,
  drone,
  noiseField,
  out
} as const;
