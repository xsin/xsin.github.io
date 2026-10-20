import { useEffect, useId, useRef, type JSX } from 'react';
import { craftStageClass } from '@/components/site/craftStage';
import { clamp, motionIsReduced } from '@/lib/visuals/runtime';

export interface KineticTypeProps {
  className?: string;
  /** Accessible name for the experiment. */
  label?: string;
}

const RESET_TURBULENCE = '0.012 0.02';
const RESET_SCALE = '8';

/**
 * Craft "kinetic type" (SVG filters). Renders the prototype's `#typeStage` artwork with
 * pointer-driven `feTurbulence` / `feDisplacementMap` updates from `setupTypeLab`: moving
 * changes the turbulence frequency and displacement scale, entering starts a breathing rAF
 * loop, leaving resets. Under reduced motion it stays at the static prototype defaults.
 *
 * Filter primitives are reached through the effect's own refs (no ids needed); the filter
 * id itself is unique per instance via `useId` so multiple mounts never collide.
 */
export function KineticType({ className, label = 'XSIN kinetic type experiment' }: KineticTypeProps): JSX.Element {
  const stageRef = useRef<HTMLDivElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const uid = useId();
  const filterId = `typeWarp-${uid.replace(/[^a-zA-Z0-9_-]/g, '')}`;

  useEffect(() => {
    const stage = stageRef.current;
    const turb = turbRef.current;
    const disp = dispRef.current;
    if (!stage || !turb || !disp) return;

    let hovering = false;
    let elapsed = 0;
    let raf = 0;

    const reset = () => {
      turb.setAttribute('baseFrequency', RESET_TURBULENCE);
      disp.setAttribute('scale', RESET_SCALE);
    };

    const breathe = () => {
      if (!hovering || motionIsReduced()) return;
      elapsed += 0.016;
      const base = 0.011 + Math.sin(elapsed * 1.1) * 0.004;
      turb.setAttribute('baseFrequency', `${base.toFixed(4)} ${(base * 1.7).toFixed(4)}`);
      disp.setAttribute('scale', (12 + Math.sin(elapsed * 0.9) * 10).toFixed(2));
      raf = window.requestAnimationFrame(breathe);
    };

    const onEnter = () => {
      hovering = true;
      if (!motionIsReduced()) breathe();
    };
    const onMove = (event: PointerEvent) => {
      if (motionIsReduced()) return;
      const rect = stage.getBoundingClientRect();
      const x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
      const y = clamp((event.clientY - rect.top) / rect.height, 0, 1);
      turb.setAttribute('baseFrequency', `${(0.006 + x * 0.02).toFixed(4)} ${(0.012 + y * 0.03).toFixed(4)}`);
      disp.setAttribute('scale', (10 + x * 26).toFixed(2));
    };
    const onLeave = () => {
      hovering = false;
      window.cancelAnimationFrame(raf);
      reset();
    };

    reset();
    stage.addEventListener('pointerenter', onEnter);
    stage.addEventListener('pointermove', onMove);
    stage.addEventListener('pointerleave', onLeave);
    return () => {
      hovering = false;
      window.cancelAnimationFrame(raf);
      stage.removeEventListener('pointerenter', onEnter);
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div ref={stageRef} className={[craftStageClass, className].filter(Boolean).join(' ')} id="typeStage">
      <svg className="type-lab" viewBox="0 0 600 300" role="img" aria-label={label}>
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence ref={turbRef} type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="7" result="noise" />
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="noise"
              scale="8"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
        <text className="type-outline" x="300" y="150">
          XSIN
        </text>
        <text className="type-fill" x="300" y="150" filter={`url(#${filterId})`}>
          XSIN
        </text>
      </svg>
    </div>
  );
}
