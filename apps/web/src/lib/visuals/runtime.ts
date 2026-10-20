/* Browser plumbing shared by the visual components: reduced-motion tracking, a
   DPR-aware canvas sizer, and a visibility-gated rAF loop. The behaviour mirrors
   the prototype (ResizeObserver + IntersectionObserver + devicePixelRatio, paused
   when off-screen, tab hidden, or the user asked for reduced motion) without the
   module-level globals the prototype relied on. */

import { useLayoutEffect, type RefObject } from 'react';

export const clamp = (value: number, min: number, max: number): number => Math.max(min, Math.min(max, value));

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

/** True when the OS asks for less motion or the app's own `html.reduce-motion` switch is on. */
export const motionIsReduced = (): boolean =>
  prefersReducedMotion() || (typeof document !== 'undefined' && document.documentElement.classList.contains('reduce-motion'));

/**
 * Tracks the reduced-motion state and calls `onChange` when it flips — including live
 * changes to the media query and to the app's `html.reduce-motion` class (the
 * prototype's motion toggle).
 */
export function watchReducedMotion(onChange: (reduced: boolean) => void): () => void {
  const mql = typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  const root = document.documentElement;
  let last = motionIsReduced();

  const emit = () => {
    const now = motionIsReduced();
    if (now === last) return;
    last = now;
    onChange(now);
  };

  mql?.addEventListener('change', emit);
  const observer = new MutationObserver(emit);
  observer.observe(root, { attributes: true, attributeFilter: ['class'] });

  return () => {
    mql?.removeEventListener('change', emit);
    observer.disconnect();
  };
}

/** Sizes a 2D canvas to its CSS box at the capped device pixel ratio. Returns CSS-pixel dimensions. */
export function sizeCanvas(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  dprCap = 2
): { w: number; h: number; dpr: number } {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
  const w = Math.max(1, rect.width);
  const h = Math.max(1, rect.height);
  const width = Math.round(w * dpr);
  const height = Math.round(h * dpr);
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { w, h, dpr };
}

export interface FrameLoop {
  /** True while motion is reduced, i.e. no rAF frames are being produced. */
  isStatic: () => boolean;
  /** Draw immediately if the loop is static (a no-op while it is animating). */
  drawIfStatic: () => void;
  /** Force a draw without waiting for rAF (static frames). */
  drawOnce: () => void;
  /** Stop for good: cancels the pending frame and disconnects every observer. */
  stop: () => void;
}

/**
 * rAF loop with prototype semantics: `frame` runs only while the canvas is on screen,
 * the tab is visible and motion is allowed. With reduced motion the loop is never
 * started and a single static frame is drawn instead. Returns its own teardown.
 */
export function createFrameLoop(
  canvas: HTMLCanvasElement,
  frame: (now: number) => void,
  opts: { rootMargin?: string } = {}
): FrameLoop {
  let raf = 0;
  let stopped = false;
  let visible = true;

  const tick = (now: number) => {
    if (stopped) return;
    raf = window.requestAnimationFrame(tick);
    if (motionIsReduced() || !visible || document.hidden) return;
    frame(now);
  };

  const start = () => {
    if (stopped || raf) return;
    raf = window.requestAnimationFrame(tick);
  };

  const pause = () => {
    window.cancelAnimationFrame(raf);
    raf = 0;
  };

  const io =
    typeof IntersectionObserver === 'function'
      ? new IntersectionObserver(
          (entries) => {
            visible = entries[0]?.isIntersecting ?? true;
          },
          { rootMargin: opts.rootMargin ?? '100px' }
        )
      : null;
  io?.observe(canvas);

  const onVisibility = () => {
    if (document.hidden) pause();
    else start();
  };
  document.addEventListener('visibilitychange', onVisibility);

  const unwatch = watchReducedMotion((reduced) => {
    if (reduced) {
      pause();
      frame(performance.now());
    } else {
      start();
    }
  });

  if (motionIsReduced()) frame(performance.now());
  else start();

  return {
    drawOnce: () => frame(performance.now()),
    isStatic: () => motionIsReduced(),
    drawIfStatic: () => {
      if (motionIsReduced()) frame(performance.now());
    },
    stop: () => {
      stopped = true;
      pause();
      io?.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      unwatch();
    }
  };
}

type Setup = (canvas: HTMLCanvasElement) => (() => void) | void;

/**
 * Runs `setup` once the canvas ref is attached. A layout effect, so the first frame is
 * drawn before paint. StrictMode-safe: every mount creates its own instance from
 * scratch and the returned cleanup tears it down completely (RAF, observers, listeners,
 * GL objects), so the double mount → unmount → mount cycle leaves exactly one live
 * instance bound to the live canvas.
 */
export function useCanvasEffect(canvasRef: RefObject<HTMLCanvasElement | null>, setup: Setup, deps: unknown[] = []): void {
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cleanup = setup(canvas);
    return () => cleanup?.();
    // The caller owns the dependency list; setup is re-run only when it asks for it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
