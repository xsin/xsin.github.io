import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia || !window.matchMedia('(pointer: fine)').matches) return;
    const dotEl = dot.current;
    const ringEl = ring.current;
    const labelEl = label.current;
    if (!dotEl || !ringEl || !labelEl) return;

    let x = -999;
    let y = -999;
    let rx = -999;
    let ry = -999;
    let started = false;
    let raf = 0;

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!started) {
        started = true;
        rx = x;
        ry = y;
      }
      dotEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      ringEl.classList.remove('is-hidden');
    };

    const onOver = (event: PointerEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor]');
      if (target) {
        ringEl.classList.add('is-active');
        labelEl.textContent = target.dataset.cursor ?? '';
      } else {
        ringEl.classList.remove('is-active');
      }
    };

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      ringEl.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = window.requestAnimationFrame(loop);
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    const onLeave = () => ringEl.classList.add('is-hidden');
    const onEnter = () => ringEl.classList.remove('is-hidden');
    document.documentElement.addEventListener('pointerleave', onLeave);
    document.documentElement.addEventListener('pointerenter', onEnter);
    raf = window.requestAnimationFrame(loop);

    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      document.documentElement.removeEventListener('pointerenter', onEnter);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  /*
   * Portal to <body>: #root carries `isolation: isolate` for the scoped
   * preflight, which traps the cursor in its own stacking context. Dialogs are
   * portalled to <body> above that context, so a cursor left inside #root is
   * painted underneath the dialog backdrop and appears to vanish.
   */
  return createPortal(
    <>
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
      <div className="cursor-ring" ref={ring} aria-hidden="true">
        <span ref={label} />
      </div>
    </>,
    document.body
  );
}
