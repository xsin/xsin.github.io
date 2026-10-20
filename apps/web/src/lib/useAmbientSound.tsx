import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { AmbientBgm } from '@/lib/audio/ambientBgm';

interface AmbientSoundValue {
  /** True while the bed is playing. */
  on: boolean;
  /** False where the browser has no Web Audio; the toggle explains itself. */
  supported: boolean;
  toggle: () => Promise<boolean>;
}

const AmbientSoundContext = createContext<AmbientSoundValue | null>(null);

const isSoundToggle = (target: EventTarget | null) =>
  target instanceof Element && Boolean(target.closest('[data-sound-toggle]'));

/**
 * Owns the single ambient engine for the page.
 *
 * The page starts silent: no AudioContext is created until the visitor's first
 * real gesture (pointer, touch, or Enter/Space). A manual mute is remembered for
 * this page view only — refreshing resets to silence, and nothing is written to
 * storage. Background tabs suspend the context.
 */
export function AmbientSoundProvider({ children }: { children: ReactNode }) {
  const engine = useRef<AmbientBgm | null>(null);
  const [on, setOn] = useState(false);
  const [supported] = useState(() => AmbientBgm.supported);

  const getEngine = useCallback(() => {
    engine.current ??= new AmbientBgm();
    return engine.current;
  }, []);

  const toggle = useCallback(async () => {
    const bgm = getEngine();
    await bgm.toggle();
    setOn(bgm.isOn);
    return bgm.isOn;
  }, [getEngine]);

  useEffect(() => {
    if (!supported) return;
    const bgm = getEngine();
    let armed = true;

    /* Tabbing through the page should not start music; Enter/Space should. */
    const onFirstGesture = (event: Event) => {
      if (!armed) return;
      if (event instanceof KeyboardEvent && event.key !== 'Enter' && event.key !== ' ') return;
      if (isSoundToggle(event.target)) {
        armed = false;
        return;
      }
      armed = false;
      if (!bgm.hasManualOff && !bgm.isOn) void bgm.enable().then(() => setOn(bgm.isOn));
    };

    /* If the context came up suspended (no gesture available yet), the next
       real gesture is the one that can start it. */
    const wake = () => {
      if (bgm.isOn) bgm.resume();
    };

    const onVisibility = () => {
      if (!bgm.isOn) return;
      if (document.hidden) bgm.suspend();
      else bgm.resume();
    };

    const gestureTypes = ['pointerdown', 'keydown', 'touchstart'] as const;
    gestureTypes.forEach((type) =>
      document.addEventListener(type, onFirstGesture, { capture: true, passive: true })
    );
    document.addEventListener('pointerdown', wake, { capture: true, passive: true });
    document.addEventListener('keydown', wake, { capture: true, passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      gestureTypes.forEach((type) =>
        document.removeEventListener(type, onFirstGesture, { capture: true })
      );
      document.removeEventListener('pointerdown', wake, { capture: true });
      document.removeEventListener('keydown', wake, { capture: true });
      document.removeEventListener('visibilitychange', onVisibility);
      bgm.dispose();
    };
  }, [getEngine, supported]);

  const value = useMemo(() => ({ on, supported, toggle }), [on, supported, toggle]);
  return <AmbientSoundContext.Provider value={value}>{children}</AmbientSoundContext.Provider>;
}

export function useAmbientSound(): AmbientSoundValue {
  const value = useContext(AmbientSoundContext);
  if (!value) throw new Error('useAmbientSound must be used inside AmbientSoundProvider');
  return value;
}
