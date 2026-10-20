/* Craft "signal constellation" — Canvas 2D port of the prototype's `ParticleField`
   (prototype/xsin-studio/app.js). Nodes drift, link when closer than 120px, and are gently
   pushed away by the pointer, which is itself ringed by a breathing dashed circle. */

import { clamp, createFrameLoop } from './runtime';
import { createCanvasInk, watchInk, type CanvasInk } from './ink';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: string;
}

export class ParticleField {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D | null;
  private w = 1;
  private h = 1;
  private t = 0;
  private last = 0;
  private nodes: Node[] = [];
  private readonly pointer = { x: -999, y: -999 };
  private ink: CanvasInk;

  private readonly resizeObserver: ResizeObserver | null;
  private readonly loop: ReturnType<typeof createFrameLoop> | null;
  private readonly onMove: (event: PointerEvent) => void;
  private readonly onLeave: () => void;
  /** Stops re-sampling the panel colour on theme flips. */
  private readonly unwatchInk: () => void;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.ink = createCanvasInk(canvas);

    this.onMove = (event) => {
      const rect = this.canvas.getBoundingClientRect();
      this.pointer.x = event.clientX - rect.left;
      this.pointer.y = event.clientY - rect.top;
    };
    this.onLeave = () => {
      this.pointer.x = -999;
      this.pointer.y = -999;
      this.loop?.drawIfStatic();
    };
    canvas.addEventListener('pointermove', this.onMove);
    canvas.addEventListener('pointerleave', this.onLeave);

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
          this.update(dt);
          this.draw();
        })
      : null;
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
    this.build();
    this.draw();
  }

  private build(): void {
    const count = clamp(Math.floor((this.w * this.h) / 2200), 55, 110);
    this.nodes = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * this.w,
      y: Math.random() * this.h,
      vx: (Math.random() - 0.5) * 18,
      vy: (Math.random() - 0.5) * 18,
      r: 0.8 + Math.random() * 1.2,
      hue: i % 3 === 0 ? '#7af3ff' : i % 3 === 1 ? '#c8ff3d' : '#a78bfa'
    }));
  }

  private update(dt: number): void {
    const pointerActive = this.pointer.x > 0 && this.pointer.y > 0;
    for (const node of this.nodes) {
      if (pointerActive) {
        const dx = this.pointer.x - node.x;
        const dy = this.pointer.y - node.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 170 && dist > 1) {
          node.vx += (dx / dist) * 26 * dt;
          node.vy += (dy / dist) * 26 * dt;
        }
      }
      node.vx *= 0.994;
      node.vy *= 0.994;
      node.x += node.vx * dt;
      node.y += node.vy * dt;
      if (node.x < -20) node.x = this.w + 20;
      if (node.x > this.w + 20) node.x = -20;
      if (node.y < -20) node.y = this.h + 20;
      if (node.y > this.h + 20) node.y = -20;
    }
  }

  draw(): void {
    const ctx = this.ctx;
    if (!ctx) return;
    ctx.clearRect(0, 0, this.w, this.h);

    for (let i = 0; i < this.nodes.length; i += 1) {
      const a = this.nodes[i];
      if (!a) continue;
      for (let j = i + 1; j < this.nodes.length; j += 1) {
        const b = this.nodes[j];
        if (!b) continue;
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 120) {
          ctx.strokeStyle = `rgba(200,255,61,${(1 - dist / 120) * 0.28})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    for (const node of this.nodes) {
      ctx.fillStyle = node.hue;
      ctx.globalAlpha = 0.72;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    if (this.pointer.x > 0 && this.pointer.y > 0) {
      ctx.strokeStyle = this.ink.dark ? 'rgba(122,243,255,0.34)' : 'rgba(20,120,134,0.5)';
      ctx.setLineDash([2, 5]);
      ctx.beginPath();
      ctx.arc(this.pointer.x, this.pointer.y, 34 + Math.sin(this.t * 2) * 4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  destroy(): void {
    this.unwatchInk();
    this.loop?.stop();
    this.resizeObserver?.disconnect();
    this.canvas.removeEventListener('pointermove', this.onMove);
    this.canvas.removeEventListener('pointerleave', this.onLeave);
    this.nodes = [];
  }
}
