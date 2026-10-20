/* O Muse four-lane waveform — Canvas 2D port of the prototype's `StemViz`
   (prototype/xsin-studio/app.js). Each lane reads its stem's analyser while playing and
   falls back to the same idle sine "breathing" when paused/silent, so the card is never
   blank. A playhead tracks the 64-step loop. */

import { ALL_STEMS, STEM_LANES, rgba, type StemId, type StemSynth } from './stemSynth';
import { createFrameLoop } from './runtime';
import { createCanvasInk, watchInk, type CanvasInk } from './ink';

export class StemViz {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D | null;
  private readonly synth: StemSynth;
  private muted: Record<string, boolean> = {};
  private solo: Record<string, boolean> = {};
  private w = 1;
  private h = 1;
  private t = 0;
  private last = 0;
  private readonly buffers = new Map<StemId, Uint8Array<ArrayBuffer>>();
  private ink: CanvasInk;

  private readonly resizeObserver: ResizeObserver | null;
  private readonly loop: ReturnType<typeof createFrameLoop> | null;
  /** Stops re-sampling the panel colour on theme flips. */
  private readonly unwatchInk: () => void;

  constructor(canvas: HTMLCanvasElement, synth: StemSynth) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.synth = synth;
    this.ink = createCanvasInk(canvas);

    this.resizeObserver = typeof ResizeObserver === 'function' ? new ResizeObserver(() => this.resize()) : null;
    this.resizeObserver?.observe(canvas);

    this.resize();
    this.unwatchInk = watchInk(
      canvas,
      (ink) => {
        this.ink = ink;
      },
      () => this.draw()
    );
    this.last = performance.now();
    this.loop = this.ctx
      ? createFrameLoop(canvas, (now) => {
          const dt = Math.min(0.05, Math.max(0, (now - this.last) / 1000));
          this.last = now;
          this.t += dt;
          this.draw();
        })
      : null;
  }

  /** Reflects the ProductCard M/S buttons onto the drawn lanes (muted lanes dim to 25%). */
  setLanes(muted: Record<string, boolean>, solo: Record<string, boolean>): void {
    this.muted = muted;
    this.solo = solo;
    this.loop?.drawIfStatic();
  }

  private laneGain(id: StemId): number {
    const anySolo = ALL_STEMS.some((stem) => this.solo[stem]);
    const audible = !this.muted[id] && (!anySolo || Boolean(this.solo[id]));
    return audible ? 1 : 0.25;
  }

  private resize(): void {
    const ctx = this.ctx;
    if (!ctx) return;
    const rect = this.canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = Math.max(1, rect.width);
    this.h = Math.max(1, rect.height);
    this.canvas.width = Math.round(this.w * dpr);
    this.canvas.height = Math.round(this.h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.draw();
  }

  draw(): void {
    const ctx = this.ctx;
    if (!ctx) return;
    const { w, h } = this;
    ctx.clearRect(0, 0, w, h);

    const left = Math.max(72, w * 0.2);
    const right = w - Math.max(54, w * 0.09);
    const top = h * 0.19;
    const bottom = h * 0.85;
    const laneH = (bottom - top) / STEM_LANES.length;
    const progress = this.synth.progress;

    ctx.strokeStyle = this.ink.faint(0.045);
    ctx.lineWidth = 1;
    for (let i = 0; i <= 16; i += 1) {
      const x = left + (right - left) * (i / 16);
      ctx.beginPath();
      ctx.moveTo(x, top);
      ctx.lineTo(x, bottom);
      ctx.stroke();
    }

    STEM_LANES.forEach((lane, index) => {
      const cy = top + laneH * (index + 0.5);
      const gain = this.laneGain(lane.id);
      const amp = laneH * 0.29;
      const analyser = this.synth.route(lane.id)?.analyser ?? null;
      let data: Uint8Array<ArrayBuffer> | null = null;

      if (this.synth.isPlaying && analyser) {
        let buffer = this.buffers.get(lane.id);
        if (!buffer || buffer.length !== analyser.fftSize) {
          buffer = new Uint8Array(analyser.fftSize);
          this.buffers.set(lane.id, buffer);
        }
        analyser.getByteTimeDomainData(buffer);
        data = buffer;
      }

      const samples = 96;
      const points: [number, number][] = [];
      for (let s = 0; s < samples; s += 1) {
        let value: number;
        if (data) {
          const idx = Math.floor((s / samples) * data.length);
          value = ((data[idx] ?? 128) - 128) / 128;
        } else {
          value =
            Math.sin(this.t * 1.15 + s * 0.2 + index * 1.7) * 0.2 + Math.sin(this.t * 0.72 + s * 0.06 + index) * 0.12;
        }
        points.push([left + (right - left) * (s / (samples - 1)), cy + value * amp]);
      }

      ctx.save();
      ctx.globalAlpha = gain === 1 ? 1 : 0.55;

      const fill = ctx.createLinearGradient(0, cy - amp, 0, cy + amp);
      fill.addColorStop(0, rgba(lane.color, 0.2));
      fill.addColorStop(1, rgba(lane.color, 0.015));
      ctx.beginPath();
      points.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
      ctx.lineTo(right, cy + amp * 1.2);
      ctx.lineTo(left, cy + amp * 1.2);
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();

      ctx.beginPath();
      points.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
      ctx.strokeStyle = lane.color;
      ctx.lineWidth = 1.35;
      ctx.shadowColor = lane.color;
      ctx.shadowBlur = 9;
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.restore();

      ctx.strokeStyle = this.ink.faint(0.06);
      ctx.beginPath();
      ctx.moveTo(left - 22, top + laneH * index);
      ctx.lineTo(right + 18, top + laneH * index);
      ctx.stroke();
    });

    if (progress > 0) {
      const x = left + (right - left) * progress;
      ctx.strokeStyle = this.ink.neutral(0.28);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, top);
      ctx.lineTo(x, bottom);
      ctx.stroke();
      ctx.fillStyle = '#c8ff3d';
      ctx.shadowColor = '#c8ff3d';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(x, top, 2.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  destroy(): void {
    this.unwatchInk();
    this.loop?.stop();
    this.resizeObserver?.disconnect();
    this.buffers.clear();
  }
}
