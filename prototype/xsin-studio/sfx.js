/* ============================================================================
   sfx.js — XSin Studio's in-house sound kit.

   Small, dependency-free Web Audio primitives shared by the site's sounds.
   No audio files: every voice is synthesised at runtime. Helpers return the
   nodes they created so callers can schedule, route and release them.

   The production port is a typed module in apps/web/src/lib/audio/sfx.ts.
   ========================================================================== */

(() => {
  'use strict';

  const Sfx = {};

  /** Create an AudioContext, or null where Web Audio is unavailable. */
  Sfx.createContext = function createContext() {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    return Ctx ? new Ctx() : null;
  };

  /** A looping noise buffer. Longer buys less audible repetition. */
  Sfx.noise = function noise(ctx, seconds = 6) {
    const length = Math.floor(ctx.sampleRate * seconds);
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1;
    return buffer;
  };

  /** Stereo impulse response: exponentially decaying noise. */
  Sfx.impulse = function impulse(ctx, seconds = 4, decay = 3) {
    const length = Math.floor(ctx.sampleRate * seconds);
    const buffer = ctx.createBuffer(2, length, ctx.sampleRate);
    for (let channel = 0; channel < 2; channel += 1) {
      const data = buffer.getChannelData(channel);
      for (let i = 0; i < length; i += 1) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
      }
    }
    return buffer;
  };

  /**
   * A convolution send. `damping` rolls off the tail, which is what makes a
   * layer read as distant rather than merely reverberant.
   */
  Sfx.reverb = function reverb(ctx, options = {}) {
    const { seconds = 4.2, decay = 3.2, wet = 0.5, damping = 3200 } = options;
    const input = ctx.createGain();
    const convolver = ctx.createConvolver();
    convolver.buffer = Sfx.impulse(ctx, seconds, decay);
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = damping;
    const output = ctx.createGain();
    output.gain.value = wet;
    input.connect(convolver);
    convolver.connect(lowpass);
    lowpass.connect(output);
    return { input, output, convolver, lowpass };
  };

  /** Stereo position. Returns null where StereoPanner is missing. */
  Sfx.pan = function pan(ctx, value) {
    if (!ctx.createStereoPanner) return null;
    const node = ctx.createStereoPanner();
    node.pan.value = Math.max(-1, Math.min(1, value));
    return node;
  };

  /**
   * Sustained voice: linear attack, hold, linear release. Use for pads and
   * drones that must cross-fade without a click.
   */
  Sfx.pad = function pad(ctx, options) {
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
  };

  /**
   * Struck voice: fast attack and an exponential tail, optionally with an
   * inharmonic partial for a bell rather than a pure tone.
   */
  Sfx.pluck = function pluck(ctx, options) {
    const {
      freq,
      gain = 0.04,
      when = 0,
      decayTime = 6,
      partial = 2.004,
      partialGain = 0.18,
      pan = 0,
      dests = []
    } = options;

    const envelope = ctx.createGain();
    envelope.gain.setValueAtTime(0.0001, when);
    envelope.gain.exponentialRampToValueAtTime(gain, when + 0.02);
    envelope.gain.exponentialRampToValueAtTime(0.0001, when + decayTime);

    const panner = Sfx.pan(ctx, pan);
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

    let overtone = null;
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
    if (overtone) overtone.start(when);
    fundamental.stop(when + decayTime + 0.2);
    if (overtone) overtone.stop(when + decayTime + 0.2);
    return { fundamental, overtone, envelope, panner };
  };

  /**
   * A permanent low bed: a detuned stack through a lowpass, breathing on an
   * LFO. Returns handles so the caller can stop it on teardown.
   */
  Sfx.drone = function drone(ctx, options) {
    const {
      voices = [],
      level = 0.2,
      filter = 150,
      lfoRate = 0.03,
      lfoDepth = 0.05,
      dests = []
    } = options;

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
      osc.type = voice.type || 'sine';
      osc.frequency.value = voice.freq;
      osc.detune.value = voice.detune || 0;
      const gain = ctx.createGain();
      gain.gain.value = voice.gain;
      osc.connect(gain);
      gain.connect(bus);
      osc.start();
      return osc;
    });

    return { bus, lowpass, lfo, oscillators };
  };

  /**
   * Looping noise through a slow-swept bandpass: air, wind, distance. Route it
   * to the reverb only and it sits well behind the mix.
   */
  Sfx.noiseField = function noiseField(ctx, options) {
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
    source.buffer = Sfx.noise(ctx, seconds);
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
  };

  /** Master out: fadeable gain into a gentle compressor into the destination. */
  Sfx.out = function out(ctx, options = {}) {
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
  };

  window.Sfx = Sfx;
})();
