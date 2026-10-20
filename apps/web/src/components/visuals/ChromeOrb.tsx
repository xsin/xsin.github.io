import { useEffect, useLayoutEffect, useRef } from 'react';
import { GLStage, HERO_GL_SIZING } from '@/lib/visuals/glStage';
import { HERO_FRAG } from '@/lib/visuals/shaders';
import { useCanvasEffect } from '@/lib/visuals/runtime';

export interface ChromeOrbProps {
  /** 0…1, from the hero FLOW slider (the prototype divides the 0–100 input by 100). */
  flow: number;
  /** 0…1, from the hero CHROME slider. */
  chrome: number;
  theme: 'dark' | 'light';
  className?: string;
}

/**
 * Hero chrome orb (WebGL). Renders the prototype's `#orbCanvas` over the CSS
 * `.orb-fallback`; when WebGL or shader setup fails, `body.no-webgl` is set and the CSS
 * gradient sphere takes over.
 *
 * `className` is accepted for API parity but cannot wrap the canvas: `#orbCanvas` is
 * absolutely positioned against `.stage-core`, so an extra wrapper element would move it.
 *
 * Mount order: `useCanvasEffect` is declared first, so in a commit it runs before this
 * component's own layout effect that pushes `flow`/`chrome`/`theme` onto the new stage.
 */
export function ChromeOrb({ flow, chrome, theme }: ChromeOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<GLStage | null>(null);

  useCanvasEffect(
    canvasRef,
    (canvas) => {
      const stage = new GLStage(canvas, HERO_FRAG, {
        ...HERO_GL_SIZING,
        hero: true,
        speed: 1
      });
      stageRef.current = stage.ok ? stage : null;
      return () => {
        const wasActive = stageRef.current === stage;
        stage.destroy();
        if (wasActive) stageRef.current = null;
      };
    },
    []
  );

  // Push slider/theme changes onto the live stage (also covers the very first stage).
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.setFlow(flow);
    stage.setChrome(chrome);
    stage.setTheme(theme === 'light' ? 1 : 0);
  }, [flow, chrome, theme]);

  // First paint can happen before the hero grid has its final size; make sure the drawing
  // buffer follows the CSS box. ResizeObserver covers later changes.
  useEffect(() => {
    const id = window.requestAnimationFrame(() => stageRef.current?.resize());
    return () => window.cancelAnimationFrame(id);
  }, []);

  return <canvas ref={canvasRef} id="orbCanvas" aria-hidden="true" />;
}
