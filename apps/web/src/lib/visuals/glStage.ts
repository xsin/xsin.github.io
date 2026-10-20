/* WebGL host for a single full-screen-triangle shader, ported from the prototype's
   `GLStage` class (prototype/xsin-studio/app.js). Same render path: WebGL 1 context,
   one triangle covering the viewport, `uRes`/`uTime`/`uMouse`/`uScroll`/`uTheme` +
   two hero-only knobs. Differences from the prototype are React-lifecycle plumbing
   (own instance, explicit destroy, StrictMode-safe) plus a static single frame when
   the user prefers reduced motion. */

import { watchReducedMotion, motionIsReduced, clamp } from './runtime';
import { VERTEX_SHADER } from './shaders';

/** Uniforms the hero shader declares; `uFlow`/`uChrome` are ignored by the craft shader. */
type UniformName = 'uRes' | 'uTime' | 'uMouse' | 'uScroll' | 'uTheme' | 'uFlow' | 'uChrome';

/** One code path for both engines: the prototype asks for WebGL 1 (`webgl`) and falls back to
 * the legacy `experimental-webgl` alias, so the union type covers both DOM signatures. */
type GL = WebGLRenderingContext | WebGL2RenderingContext;

export interface GLHostOptions {
  /** Hero canvas: adds `no-webgl` to <body> when GL fails so the CSS `.orb-fallback` shows. */
  hero?: boolean;
  /** Called synchronously when setup fails (after `no-webgl` has been set for the hero). */
  onFail?: () => void;
  resScale?: number;
  dprCap?: number;
  /** Time multiplier applied to `uTime`. */
  speed?: number;
}

export class GLStage {
  readonly canvas: HTMLCanvasElement;
  ok = false;

  private readonly gl: GL | null;
  private readonly opts: Required<Omit<GLHostOptions, 'onFail'>> & Pick<GLHostOptions, 'onFail'>;
  private destroyed = false;
  private raf = 0;
  private visible = true;

  private program: WebGLProgram | null = null;
  private buffer: WebGLBuffer | null = null;
  private uniforms: Partial<Record<UniformName, WebGLUniformLocation | null>> = {};

  private mouse = { x: 0, y: 0 };
  private readonly mouseTarget = { x: 0, y: 0 };

  theme = 0;
  flow = 0.42;
  chrome = 0.62;

  private readonly resizeObserver: ResizeObserver | null;
  private readonly io: IntersectionObserver | null = null;
  private readonly onPointer: (event: PointerEvent) => void;
  private readonly onVisibility: () => void;
  private readonly unwatchMotion: () => void = () => undefined;
  private failNotified = false;

  constructor(canvas: HTMLCanvasElement, fragmentSource: string, options: GLHostOptions = {}) {
    this.canvas = canvas;
    this.opts = {
      hero: options.hero ?? false,
      onFail: options.onFail,
      resScale: options.resScale ?? 0.82,
      dprCap: options.dprCap ?? 1.5,
      speed: options.speed ?? 1
    };

    const attrs: WebGLContextAttributes = {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance'
    };
    this.gl = getGL(canvas, attrs);

    this.resizeObserver = typeof ResizeObserver === 'function' ? new ResizeObserver(() => this.resize()) : null;
    this.onPointer = (event) => {
      this.mouseTarget.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouseTarget.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    this.onVisibility = () => {
      if (document.hidden) this.pause();
      else this.start();
    };

    if (!this.gl) {
      this.fail();
      return;
    }
    try {
      this.init(fragmentSource);
    } catch (error) {
      console.warn('[xsin] WebGL init failed', error);
      this.cleanupGL();
      this.fail();
      return;
    }

    // GL is live: drop a stale fallback flag left by a previous hero instance.
    if (this.opts.hero) document.body.classList.remove('no-webgl');

    this.resizeObserver?.observe(canvas);
    window.addEventListener('pointermove', this.onPointer, { passive: true });
    document.addEventListener('visibilitychange', this.onVisibility);
    if (typeof IntersectionObserver === 'function') {
      this.io = new IntersectionObserver(
        (entries) => {
          this.visible = entries[0]?.isIntersecting ?? true;
        },
        { rootMargin: '120px' }
      );
      this.io.observe(canvas);
    }

    this.unwatchMotion = watchReducedMotion((reduced) => {
      if (reduced) {
        this.pause();
        this.draw(performance.now());
      } else {
        this.start();
      }
    });

    this.resize();
    if (motionIsReduced()) {
      // resize() already drew the single static frame.
      this.draw(performance.now());
    } else {
      this.start();
    }
  }

  private fail(): void {
    this.ok = false;
    if (this.opts.hero) document.body.classList.add('no-webgl');
    if (this.failNotified) return;
    this.failNotified = true;
    this.opts.onFail?.();
  }

  private compile(type: number, source: string): WebGLShader | null {
    const gl = this.gl;
    if (!gl) return null;
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.warn('[xsin] shader compile error', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  private init(fragmentSource: string): void {
    const gl = this.gl;
    if (!gl) return;
    const vs = this.compile(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = this.compile(gl.FRAGMENT_SHADER, fragmentSource);
    if (!vs || !fs) {
      if (vs) gl.deleteShader(vs);
      if (fs) gl.deleteShader(fs);
      this.fail();
      return;
    }
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    // Shaders can be dropped as soon as they are linked.
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('[xsin] shader link error', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      this.fail();
      return;
    }
    this.program = program;
    gl.useProgram(program);

    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(program, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    (['uRes', 'uTime', 'uMouse', 'uScroll', 'uTheme', 'uFlow', 'uChrome'] as const).forEach((name) => {
      this.uniforms[name] = gl.getUniformLocation(program, name);
    });

    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    this.ok = true;
  }

  /** Resizes the drawing buffer to the CSS box × DPR × resolution scale. */
  resize(): void {
    if (!this.ok || this.destroyed) return;
    const rect = this.canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, this.opts.dprCap);
    const width = Math.max(1, Math.round(rect.width * dpr * this.opts.resScale));
    const height = Math.max(1, Math.round(rect.height * dpr * this.opts.resScale));
    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width;
      this.canvas.height = height;
    }
    if (motionIsReduced() || !this.visible || document.hidden) this.draw(performance.now());
  }

  // Setters redraw immediately so slider/theme changes are visible with reduced motion too.
  setTheme(theme: number): void {
    this.theme = theme;
    if (this.raf === 0) this.draw(performance.now());
  }

  setFlow(flow: number): void {
    this.flow = flow;
    if (this.raf === 0) this.draw(performance.now());
  }

  setChrome(chrome: number): void {
    this.chrome = chrome;
    if (this.raf === 0) this.draw(performance.now());
  }

  private start(): void {
    if (this.raf || this.destroyed || !this.ok || motionIsReduced()) return;
    const loop = (now: number) => {
      if (this.destroyed) return;
      this.raf = window.requestAnimationFrame(loop);
      if (!this.visible || document.hidden) return;
      this.draw(now);
    };
    this.raf = window.requestAnimationFrame(loop);
  }

  private pause(): void {
    window.cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  private draw(now: number): void {
    const gl = this.gl;
    if (!this.ok || this.destroyed || !gl || !this.program) return;
    const reduced = motionIsReduced();
    this.mouse.x += (this.mouseTarget.x - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouseTarget.y - this.mouse.y) * 0.05;
    // Reduced motion freezes the clock at a pleasant frame rather than t=0.
    const time = reduced ? 2.4 : now * 0.001 * this.opts.speed;
    const scroll = clamp(window.scrollY / Math.max(1, window.innerHeight), 0, 1);
    const u = this.uniforms;

    gl.useProgram(this.program);
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT);

    if (u.uRes) gl.uniform2f(u.uRes, this.canvas.width, this.canvas.height);
    if (u.uTime) gl.uniform1f(u.uTime, time);
    if (u.uMouse) gl.uniform2f(u.uMouse, this.mouse.x, this.mouse.y);
    if (u.uScroll) gl.uniform1f(u.uScroll, scroll);
    if (u.uTheme) gl.uniform1f(u.uTheme, this.theme);
    if (u.uFlow) gl.uniform1f(u.uFlow, this.flow);
    if (u.uChrome) gl.uniform1f(u.uChrome, this.chrome);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  private cleanupGL(): void {
    const gl = this.gl;
    if (!gl) return;
    if (this.program) gl.deleteProgram(this.program);
    if (this.buffer) gl.deleteBuffer(this.buffer);
    this.program = null;
    this.buffer = null;
    // Keep the context alive on the canvas. StrictMode and HMR re-run the mount effect on the
    // same <canvas>; losing the context here would make getContext() keep returning a dead
    // context and the remounted stage would silently never draw. The context is reclaimed by
    // the browser when the canvas itself is removed.
  }

  destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;
    this.ok = false;
    this.pause();
    this.unwatchMotion();
    this.resizeObserver?.disconnect();
    this.io?.disconnect();
    window.removeEventListener('pointermove', this.onPointer);
    document.removeEventListener('visibilitychange', this.onVisibility);
    this.cleanupGL();
  }
}

/** Creates the prototype's WebGL 1 context pair (`webgl`, then `experimental-webgl`). */
function getGL(canvas: HTMLCanvasElement, attrs: WebGLContextAttributes): GL | null {
  const getContext = canvas.getContext.bind(canvas) as (type: string, options?: WebGLContextAttributes) => GL | null;
  return getContext('webgl', attrs) ?? getContext('experimental-webgl', attrs) ?? null;
}

/** Sizes used by the hero canvas (0.82 render scale, DPR cap 1.5) — exported for docs/tests. */
export const HERO_GL_SIZING = { resScale: 0.82, dprCap: 1.5 } as const;
/** Sizes used by the craft card (0.9 render scale, DPR cap 1.5, 0.8× clock). */
export const MINI_GL_SIZING = { resScale: 0.9, dprCap: 1.5, speed: 0.8 } as const;
