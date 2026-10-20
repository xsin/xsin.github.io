import { useEffect } from 'react';

/**
 * Reveal-on-scroll without depending on IntersectionObserver timing.
 * IO is great in production, but some embedded/headless renderers never deliver
 * its first callback; the layout check below makes the first paint and every
 * scroll deterministic while keeping the same `.in-view` contract.
 */
export function useReveals(deps: unknown[] = []) {
  useEffect(() => {
    let nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.in-view)'));
    if (!nodes.length) return;

    let raf = 0;

    const reveal = () => {
      raf = 0;
      const limit = window.innerHeight * 0.92;
      for (const node of nodes) {
        if (node.classList.contains('in-view')) continue;
        const rect = node.getBoundingClientRect();
        if (rect.top < limit && rect.bottom > 0) node.classList.add('in-view');
      }
      nodes = nodes.filter((node) => !node.classList.contains('in-view'));
      if (!nodes.length) {
        window.removeEventListener('scroll', queue);
        window.removeEventListener('resize', queue);
      }
    };

    const queue = () => {
      if (!raf) raf = window.requestAnimationFrame(reveal);
    };

    // First frame: reveal whatever is already above the fold.
    raf = window.requestAnimationFrame(reveal);
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);

    return () => {
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, deps);
}

export function useIsReady() {
  useEffect(() => {
    document.documentElement.classList.add('js');
    const timer = window.setTimeout(() => document.documentElement.classList.add('is-ready'), 180);
    document.fonts?.ready.then(() => document.documentElement.classList.add('is-ready')).catch(() => undefined);
    return () => window.clearTimeout(timer);
  }, []);
}
