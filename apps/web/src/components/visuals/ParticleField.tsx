import { useRef, type JSX } from 'react';
import { ParticleField as ParticleFieldScene } from '@/lib/visuals/particleField';
import { useCanvasEffect } from '@/lib/visuals/runtime';

export interface ParticleFieldProps {
  className?: string;
}

/** Craft "signal constellation" (Canvas 2D). Renders the prototype's `#miniField`. */
export function ParticleField({ className }: ParticleFieldProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useCanvasEffect(
    canvasRef,
    (canvas) => {
      const field = new ParticleFieldScene(canvas);
      return () => field.destroy();
    },
    []
  );

  return <canvas ref={canvasRef} id="miniField" className={className} aria-hidden="true" />;
}
