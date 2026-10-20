import { useEffect, useRef, type JSX } from 'react';
import { GLStage, MINI_GL_SIZING } from '@/lib/visuals/glStage';
import { MINI_FRAG } from '@/lib/visuals/shaders';
import { useCanvasEffect } from '@/lib/visuals/runtime';

export interface MiniChromeProps {
  className?: string;
}

/**
 * Craft "liquid chrome" card (WebGL). Renders the prototype's `#miniShader` inside
 * `.experiment-stage`; pointer position feeds `uMouse`, so the field warps under the cursor.
 *
 * Same remount contract as ChromeOrb: tearing a WebGL canvas down releases its context, and
 * the node keeps returning that lost context, so the key bumps to give any re-mount a fresh
 * <canvas> (StrictMode-safe; also matters if Craft is ever unmounted and mounted again).
 */
export function MiniChrome({ className }: MiniChromeProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<GLStage | null>(null);

  useCanvasEffect(
    canvasRef,
    (canvas) => {
      const stage = new GLStage(canvas, MINI_FRAG, MINI_GL_SIZING);
      stageRef.current = stage;
      return () => {
        stage.destroy();
        if (stageRef.current === stage) stageRef.current = null;
      };
    },
    []
  );

  useEffect(() => {
    const id = window.requestAnimationFrame(() => stageRef.current?.resize());
    return () => window.cancelAnimationFrame(id);
  }, []);

  return <canvas ref={canvasRef} id="miniShader" className={className} aria-hidden="true" />;
}
