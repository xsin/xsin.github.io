import { useEffect, useLayoutEffect, useRef, type JSX } from 'react';
import { ALL_STEMS, StemSynth } from '@/lib/visuals/stemSynth';
import { StemViz } from '@/lib/visuals/stemViz';
import { useCanvasEffect } from '@/lib/visuals/runtime';

export interface StemCanvasProps {
  /** Drives the local synth: true → start the 64-step loop, false → fade out and stop scheduling. */
  playing: boolean;
  muted: Record<string, boolean>;
  solo: Record<string, boolean>;
  className?: string;
}

const silentLanes = Object.fromEntries(ALL_STEMS.map((id) => [id, false])) as Record<string, boolean>;

/**
 * O Muse stem waveform (Canvas 2D + Web Audio). Renders the prototype's `#museCanvas`;
 * the transport/M/S buttons stay in ProductCard and are reflected here through props.
 *
 * StrictMode-safe: the synth and the renderer are created inside the mount effect and
 * fully disposed on unmount (AudioContext closed, scheduler interval and rAF cleared).
 * Autoplay policies also mean the loop can only start from a user gesture, so the parent
 * must flip `playing` on click — a `playing=true` first mount is ignored until the next
 * committed change, rather than attempting `AudioContext.resume()` without a gesture.
 */
export function StemCanvas({ playing, muted, solo, className }: StemCanvasProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const synthRef = useRef<StemSynth | null>(null);
  const vizRef = useRef<StemViz | null>(null);
  /** True once the parent has flipped `playing` at least once since mount. */
  const gestureSeen = useRef(false);

  useCanvasEffect(
    canvasRef,
    (canvas) => {
      const synth = new StemSynth();
      const viz = new StemViz(canvas, synth);
      synthRef.current = synth;
      vizRef.current = viz;
      return () => {
        viz.destroy();
        void synth.dispose();
        if (synthRef.current === synth) synthRef.current = null;
        if (vizRef.current === viz) vizRef.current = null;
      };
    },
    []
  );

  // Start/stop the loop when `playing` changes.
  useEffect(() => {
    if (!playing) {
      gestureSeen.current = true;
      synthRef.current?.pause();
      return;
    }
    if (!gestureSeen.current) {
      // First render already asked for playback (no user gesture yet): stay quiet until it toggles.
      return;
    }
    let cancelled = false;
    synthRef.current
      ?.toggle()
      .catch((error: unknown) => console.warn('[xsin] stem audio unavailable', error))
      .finally(() => {
        if (cancelled) synthRef.current?.pause();
      });
    return () => {
      cancelled = true;
    };
  }, [playing]);

  // Mute / solo: mirrors the prototype's updateGains() rule.
  useLayoutEffect(() => {
    const synth = synthRef.current;
    if (!synth) return;
    synth.setLanes(muted ?? silentLanes, solo ?? silentLanes);
    vizRef.current?.setLanes(muted ?? silentLanes, solo ?? silentLanes);
  }, [muted, solo]);

  // The prototype pauses the demo loop when the tab is hidden.
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) synthRef.current?.pause();
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="museCanvas"
      className={className}
      role="img"
      aria-label="Animated four-lane waveform player with mute and solo controls and a locally synthesised demo loop."
    />
  );
}
