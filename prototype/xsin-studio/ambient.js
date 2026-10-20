/* ============================================================================
   ambient.js — "Deep Field", the site's ambient bed.

   A composition on top of sfx.js, not another synth. Slow (50 BPM), no
   percussion, no transients. Four chords of two bars each loop every 38.4 s
   over a continuous drone, so the seam is never audible: pads overlap while
   the sub bed and the air keep running. Bells are seeded per loop, which makes
   each pass repeat while the texture underneath drifts.

   Mixing intent: near layers (pads, bells) keep some dry signal; the noise
   field is routed to the reverb only, so the "air" sits behind everything.
   ========================================================================== */

(() => {
  'use strict';

  const BGM = {
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

  const CHORD_SECONDS = (BGM.beatsPerChord * 60) / BGM.bpm; // 9.6 s
  const LOOP_SECONDS = CHORD_SECONDS * BGM.chords.length; // 38.4 s

  function seededRandom(seed) {
    let a = seed | 0;
    return () => {
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  class AmbientSound {
    constructor() {
      this.ctx = null;
      this.master = null;
      this.dry = null;
      this.hallIn = null;
      this.bellDry = null;
      this.persistent = [];
      this.timer = 0;
      this.teardownTimer = 0;
      this.nextChord = 0;
      this.chordIndex = 0;
      this.on = false;
      this.manualOff = false;
    }

    static get supported() {
      return Boolean(window.Sfx && (window.AudioContext || window.webkitAudioContext));
    }

    async enable() {
      if (this.on) return true;
      if (!AmbientSound.supported) return false;
      window.clearTimeout(this.teardownTimer);
      this.teardownTimer = 0;
      if (!this.ctx && !this.build()) return false;

      /* Resume without blocking the UI: a context that stays suspended (no
         gesture yet) must not hold back the toggle's visual state. */
      this.ctx.resume().catch(() => {});
      this.on = true;
      this.manualOff = false;

      const now = this.ctx.currentTime;
      const gain = this.master.gain;
      gain.cancelScheduledValues(now);
      gain.setValueAtTime(Math.max(gain.value, 0.0001), now);
      gain.linearRampToValueAtTime(BGM.level, now + BGM.fadeIn);

      this.nextChord = now + 0.2;
      this.chordIndex = 0;
      this.startClock();
      return true;
    }

    disable() {
      if (!this.ctx || !this.on) return;
      this.on = false;
      this.manualOff = true;
      const now = this.ctx.currentTime;
      const gain = this.master.gain;
      gain.cancelScheduledValues(now);
      gain.setValueAtTime(Math.max(gain.value, 0.0001), now);
      gain.linearRampToValueAtTime(0.0001, now + BGM.fadeOut);
      this.stopClock();
      window.clearTimeout(this.teardownTimer);
      this.teardownTimer = window.setTimeout(() => this.teardown(), (BGM.fadeOut + 0.2) * 1000);
    }

    async toggle() {
      if (this.on) this.disable();
      else await this.enable();
      return this.on;
    }

    suspend() {
      if (this.ctx && this.ctx.state === 'running') this.ctx.suspend().catch(() => {});
    }

    resume() {
      if (this.ctx && this.on && this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
    }

    /* --- graph -------------------------------------------------------- */

    build() {
      const ctx = Sfx.createContext();
      if (!ctx) return false;
      this.ctx = ctx;

      const { master } = Sfx.out(ctx, { level: BGM.level, threshold: -28, ratio: 2 });
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

    startClock() {
      this.stopClock();
      this.timer = window.setInterval(() => this.schedule(), 200);
      this.schedule();
    }

    stopClock() {
      window.clearInterval(this.timer);
      this.timer = 0;
    }

    schedule() {
      if (!this.ctx || !this.on) return;
      const horizon = this.ctx.currentTime + 1.2;
      let guard = 0;
      while (this.nextChord < horizon && guard < 4) {
        this.chord(this.nextChord, this.chordIndex);
        this.nextChord += CHORD_SECONDS;
        this.chordIndex += 1;
        guard += 1;
      }
    }

    chord(time, index) {
      const notes = BGM.chords[index % BGM.chords.length];
      const dur = CHORD_SECONDS;

      notes.forEach((freq, voice) => {
        Sfx.pad(this.ctx, {
          freq,
          detune: (voice - 1) * 4,
          gain: voice === 0 ? 0.044 : 0.032,
          attack: 3.4,
          hold: dur - 3.7,
          release: 4.4,
          when: time,
          filter: 1050,
          dests: [this.dry, this.hallIn]
        });
      });

      /* One or two bells per chord; the seed repeats every loop. */
      const loop = Math.floor(index / BGM.chords.length);
      const rand = seededRandom(loop * 7919 + index * 131 + 17);
      const hits = rand() < 0.55 ? 2 : 1;
      for (let h = 0; h < hits; h += 1) {
        const at = time + 1.6 + rand() * (dur - 3.4);
        const freq = BGM.penta[Math.floor(rand() * BGM.penta.length)];
        Sfx.pluck(this.ctx, {
          freq,
          gain: 0.026 + rand() * 0.014,
          when: at,
          decayTime: 6.5,
          pan: rand() * 1.2 - 0.6,
          dests: [this.bellDry, this.hallIn]
        });
      }
    }

    teardown() {
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
          this.ctx.close();
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

    get loopSeconds() {
      return LOOP_SECONDS;
    }
  }

  window.AmbientSound = AmbientSound;
  window.AmbientSound.config = BGM;
})();
