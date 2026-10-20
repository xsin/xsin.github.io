import { useRef, type JSX } from 'react';
import { RoutingField as RoutingFieldScene } from '@/lib/visuals/routingField';
import { useCanvasEffect } from '@/lib/visuals/runtime';

export interface RoutingFieldProps {
  className?: string;
}

/**
 * AI Bobby routing diagram (Canvas 2D). Renders the prototype's `#bobbyCanvas` inside
 * `.instrument-stage`; hover a source or client node to spotlight its routes.
 */
export function RoutingField({ className }: RoutingFieldProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useCanvasEffect(
    canvasRef,
    (canvas) => {
      const field = new RoutingFieldScene(canvas);
      return () => field.destroy();
    },
    []
  );

  return (
    <canvas
      ref={canvasRef}
      id="bobbyCanvas"
      className={className}
      role="img"
      aria-label="Animated routing diagram: multiple model pools feed one local endpoint, which serves four clients."
    />
  );
}
