/* AI Bobby routing diagram — Canvas 2D port of the prototype's `RoutingField` class
   (prototype/xsin-studio/app.js). Four model pools on the left feed the local gateway in
   the middle, which fans out to four clients on the right. Pointer hover dims everything
   except the hovered node's routes. Same colours, spacing and timings as the prototype. */

import { clamp, createFrameLoop } from './runtime';
import { createCanvasInk, watchInk, type CanvasInk } from './ink';

interface Node {
  x: number;
  y: number;
  label: string;
  color: string;
}

interface Particle {
  src: number;
  dst: number;
  t: number;
  speed: number;
}

interface BezierControl {
  x: number;
  y: number;
}

type Point = BezierControl;

type Hover = { type: 'source' | 'client'; index: number } | null;

const SOURCE_META = [
  { label: 'OPENCODE', color: '#7af3ff' },
  { label: 'NVIDIA', color: '#76b900' },
  { label: 'WORKBUDDY', color: '#5b7cfa' },
  { label: 'WORKBUDDY AI', color: '#a78bfa' }
] as const;

const CLIENT_META = ['CODEX', 'CLAUDE CODE', 'DSH', 'WORKBUDDY'] as const;

function cubicPoint(p0: Point, c1: Point, c2: Point, p1: Point, t: number) {
  const u = 1 - t;
  return {
    x: u * u * u * p0.x + 3 * u * u * t * c1.x + 3 * u * t * t * c2.x + t * t * t * p1.x,
    y: u * u * u * p0.y + 3 * u * u * t * c1.y + 3 * u * t * t * c2.y + t * t * t * p1.y
  };
}

export class RoutingField {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D | null;
  private w = 1;
  private h = 1;
  private t = 0;
  private last = 0;
  private particles: Particle[] = [];
  private spawnTimer = 0;
  private hover: Hover = null;
  private readonly pointer = { x: -999, y: -999 };
  private sources: Node[] = [];
  private clients: Node[] = [];
  private gateway = { x: 0, y: 0 };
  /** Panel-aware ink: white on dark panels (prototype), near-black on bright ones. */
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
      this.detectHover();
    };
    this.onLeave = () => {
      this.pointer.x = -999;
      this.pointer.y = -999;
      this.hover = null;
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
          const dt = clamp((now - this.last) / 1000, 0, 0.05);
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
    this.layout();
    // Draw straight away: the first frame is visible even under reduced motion or off-screen.
    this.draw();
  }

  private layout(): void {
    const { w, h } = this;
    this.sources = SOURCE_META.map((meta, index) => ({ x: w * 0.09, y: h * (0.2 + index * 0.2), ...meta }));
    this.gateway = { x: w * 0.5, y: h * 0.5 };
    this.clients = CLIENT_META.map((label, index) => ({
      x: w * 0.91,
      y: h * [0.22, 0.4, 0.6, 0.78][index]!,
      label,
      color: '#ffffff'
    }));
  }

  private routeControls(src: Point, dst: Point): [BezierControl, BezierControl] {
    if (dst === this.gateway) {
      return [
        { x: src.x + (dst.x - src.x) * 0.55, y: src.y },
        { x: dst.x - (dst.x - src.x) * 0.3, y: dst.y }
      ];
    }
    return [
      { x: src.x + (dst.x - src.x) * 0.3, y: src.y },
      { x: src.x + (dst.x - src.x) * 0.62, y: dst.y }
    ];
  }

  private detectHover(): void {
    const near = (node: Node, radius = 30) => Math.hypot(this.pointer.x - node.x, this.pointer.y - node.y) < radius;
    const before = this.hover;
    // Widened to satisfy TS's closure narrowing rules inside forEach.
    const slot: { hover: Hover } = { hover: null };
    this.sources.forEach((node, index) => {
      if (near(node)) slot.hover = { type: 'source', index };
    });
    this.clients.forEach((node, index) => {
      if (near(node, 34)) slot.hover = { type: 'client', index };
    });
    this.hover = slot.hover;
    const changed =
      (before?.type ?? null) !== (slot.hover?.type ?? null) || (before?.index ?? -1) !== (slot.hover?.index ?? -1);
    if (changed) this.loop?.drawIfStatic();
  }

  private update(dt: number): void {
    this.spawnTimer += dt;
    const maxParticles = 34;
    if (this.spawnTimer > 0.12 && this.particles.length < maxParticles) {
      this.spawnTimer = 0;
      const src = Math.floor(Math.random() * this.sources.length);
      const dst = Math.floor(Math.random() * this.clients.length);
      this.particles.push({ src, dst, t: 0, speed: 0.22 + Math.random() * 0.16 });
    }
    for (const particle of this.particles) particle.t += particle.speed * dt;
    this.particles = this.particles.filter((particle) => particle.t < 1.06);
  }

  draw(): void {
    const ctx = this.ctx;
    if (!ctx) return;
    const { w, h } = this;
    ctx.clearRect(0, 0, w, h);

    const ink = this.ink;
    ctx.strokeStyle = ink.faint(0.035);
    ctx.lineWidth = 1;
    for (let x = 0; x <= w; x += 48) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y <= h; y += 48) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    this.drawRoutes();
    this.drawParticles();
    this.drawGateway();
    this.drawNodes();
  }

  private drawRoutes(): void {
    const ctx = this.ctx;
    if (!ctx) return;
    this.sources.forEach((src, sourceIndex) => {
      this.clients.forEach((client, clientIndex) => {
        const active =
          !this.hover ||
          (this.hover.type === 'source' && this.hover.index === sourceIndex) ||
          (this.hover.type === 'client' && this.hover.index === clientIndex);
        const [a0, a1] = this.routeControls(src, this.gateway);
        const [b0, b1] = this.routeControls(this.gateway, client);
        ctx.save();
        ctx.strokeStyle = active ? this.ink.accent(src.color) : this.ink.faint(0.055);
        ctx.globalAlpha = active ? 0.2 : 0.5;
        ctx.lineWidth = active ? 1.2 : 0.7;
        ctx.setLineDash(active ? [2, 5] : [1, 7]);
        ctx.beginPath();
        ctx.moveTo(src.x, src.y);
        ctx.bezierCurveTo(a0.x, a0.y, a1.x, a1.y, this.gateway.x, this.gateway.y);
        ctx.bezierCurveTo(b0.x, b0.y, b1.x, b1.y, client.x, client.y);
        ctx.stroke();
        ctx.restore();
      });
    });
  }

  private drawParticles(): void {
    const ctx = this.ctx;
    if (!ctx) return;
    for (const particle of this.particles) {
      const src = this.sources[particle.src];
      const client = this.clients[particle.dst];
      if (!src || !client) continue;
      const [a0, a1] = this.routeControls(src, this.gateway);
      const [b0, b1] = this.routeControls(this.gateway, client);
      const sample = (t: number) =>
        t < 0.5
          ? cubicPoint(src, a0, a1, this.gateway, t / 0.5)
          : cubicPoint(this.gateway, b0, b1, client, (t - 0.5) / 0.5);
      const t = particle.t;
      const pos = sample(t);
      const tail = sample(Math.max(0, t - 0.035));

      const fade = t < 0.08 ? t / 0.08 : t > 0.92 ? (1 - t) / 0.08 : 1;
      ctx.save();
      ctx.globalAlpha = clamp(fade, 0, 1);
      const color = this.ink.accent(src.color);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.2;
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(tail.x, tail.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  private drawGateway(): void {
    const ctx = this.ctx;
    if (!ctx) return;
    const g = this.gateway;
    const pulse = 0.5 + 0.5 * Math.sin(this.t * 2.2);

    ctx.save();
    ctx.translate(g.x, g.y);
    ctx.rotate(this.t * 0.18);
    ctx.strokeStyle = 'rgba(122,243,255,0.26)';
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 6]);
    ctx.beginPath();
    ctx.arc(0, 0, 34, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.strokeStyle = `rgba(91,124,250,${0.28 + pulse * 0.24})`;
    ctx.beginPath();
    for (let i = 0; i < 6; i += 1) {
      const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle) * 21;
      const y = Math.sin(angle) * 21;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.fillStyle = '#e9fbff';
    ctx.shadowColor = '#7af3ff';
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(g.x, g.y, 3.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    const ink = this.ink;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '8px "JetBrains Mono", monospace';
    ctx.fillStyle = ink.neutral(0.58);
    ctx.fillText('AI BOBBY', g.x, g.y - 48);
    ctx.fillStyle = ink.dark ? 'rgba(122,243,255,0.7)' : 'rgb(20,120,134)';
    ctx.fillText('GATEWAY / 46890', g.x, g.y + 52);
  }

  private drawNodes(): void {
    const ctx = this.ctx;
    if (!ctx) return;
    const ink = this.ink;
    ctx.textBaseline = 'middle';
    ctx.font = '8px "JetBrains Mono", monospace';

    this.sources.forEach((node, index) => {
      const active = !this.hover || (this.hover.type === 'source' && this.hover.index === index);
      const color = ink.accent(node.color);
      ctx.save();
      ctx.globalAlpha = active ? 1 : 0.35;
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(node.x, node.y, 3.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = color;
      ctx.globalAlpha = active ? 0.32 : 0.14;
      ctx.beginPath();
      ctx.arc(node.x, node.y, 10 + Math.sin(this.t * 1.6 + index) * 1.5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = active ? 1 : 0.35;
      ctx.fillStyle = ink.neutral(0.68);
      ctx.textAlign = 'left';
      ctx.fillText(node.label, node.x + 16, node.y);
      ctx.restore();
    });

    this.clients.forEach((node, index) => {
      const active = !this.hover || (this.hover.type === 'client' && this.hover.index === index);
      ctx.save();
      ctx.globalAlpha = active ? 1 : 0.35;
      ctx.strokeStyle = ink.neutral(0.55);
      ctx.lineWidth = 1;
      ctx.strokeRect(node.x - 3, node.y - 3, 6, 6);
      ctx.fillStyle = ink.faint(0.06);
      ctx.fillRect(node.x - 3, node.y - 3, 6, 6);
      ctx.fillStyle = ink.neutral(0.52);
      ctx.textAlign = 'right';
      ctx.fillText(node.label, node.x - 14, node.y);
      ctx.restore();
    });
  }

  destroy(): void {
    this.unwatchInk();
    this.loop?.stop();
    this.resizeObserver?.disconnect();
    this.canvas.removeEventListener('pointermove', this.onMove);
    this.canvas.removeEventListener('pointerleave', this.onLeave);
  }
}
