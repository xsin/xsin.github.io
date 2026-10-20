/* Canvas-2D colour adaptation.

   The prototype's Canvas 2D scenes (routing diagram, stem waveform, particle field) hard-code
   white-on-black ink, which is fine because the prototype keeps `.instrument-stage` and
   `.experiment-stage` dark in both themes. The production CSS does not: `html[data-theme="light"]`
   reskins those panels. `createCanvasInk` samples the panel's computed background colour and, if it
   is bright, returns colour tokens so the scenes stay legible instead of drawing white-on-white.
   On dark panels every token maps back to the prototype's literal value. */

export interface CanvasInk {
  /** Low-contrast structural lines (grids, dividers). */
  faint: (alpha: number) => string;
  /** Neutral text/lines that are "white" in the prototype. */
  neutral: (alpha: number) => string;
  /** Re-colours a brand hex for the current panel (immaterial on dark panels). */
  accent: (hex: string) => string;
  /** Whether the panel is dark (drives a few tint choices). */
  dark: boolean;
}

const WHITE_ON_BLACK: CanvasInk = {
  faint: (alpha) => `rgba(255,255,255,${alpha})`,
  neutral: (alpha) => `rgba(255,255,255,${alpha})`,
  accent: (hex) => hex,
  dark: true
};

function parseColor(value: string): [number, number, number, number] | null {
  const match = value.match(/rgba?\(([^)]+)\)/);
  if (!match?.[1]) return null;
  const parts = match[1].split(/[\s,/]+/).filter(Boolean).map(Number);
  const [r, g, b, a = 1] = parts;
  if (r === undefined || g === undefined || b === undefined || [r, g, b, a].some((n) => Number.isNaN(n))) return null;
  return [r, g, b, a];
}

function relativeLuminance([r, g, b]: [number, number, number, number]): number {
  const ch = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b);
}

/**
 * Walks the element's ancestor chain back to the first non-transparent background and turns it
 * into an ink palette. Cached per call site; call again on theme changes.
 */
export function createCanvasInk(canvas: HTMLElement): CanvasInk {
  const view = canvas.ownerDocument.defaultView;
  if (!view) return WHITE_ON_BLACK;

  let node: Element | null = canvas.parentElement;
  while (node && node !== canvas.ownerDocument.documentElement) {
    const parsed = parseColor(view.getComputedStyle(node).backgroundColor);
    if (parsed && parsed[3] > 0.2) {
      const luminance = relativeLuminance(parsed);
      if (luminance > 0.45) {
        // Bright panel: ink becomes near-black. Structural lines keep roughly their perceived
        // contrast (×5), text stays readable (×1.9, capped at full opacity).
        return {
          faint: (alpha) => `rgba(10,12,16,${Math.min(1, alpha * 5)})`,
          neutral: (alpha) => `rgba(10,12,16,${Math.min(1, alpha * 1.9)})`,
          // Brand hues stay recognisable but move ~40 % toward white for contrast on paper.
          accent: (hex) => {
            const value = parseInt(hex.slice(1), 16);
            const mix = (channel: number) => Math.round(channel + (255 - channel) * 0.4);
            return `rgb(${mix((value >> 16) & 255)},${mix((value >> 8) & 255)},${mix(value & 255)})`;
          },
          dark: false
        };
      }
      return WHITE_ON_BLACK;
    }
    node = node.parentElement;
  }
  return WHITE_ON_BLACK;
}

/**
 * Re-samples the ink palette whenever the document theme attribute flips, then calls
 * `redraw` (the app's ThemeProvider sets `html[data-theme]`). Returns the unsubscribe.
 */
export function watchInk(canvas: HTMLElement, apply: (ink: CanvasInk) => void, redraw: () => void): () => void {
  apply(createCanvasInk(canvas));
  if (typeof MutationObserver !== 'function') return () => undefined;
  const observer = new MutationObserver(() => {
    apply(createCanvasInk(canvas));
    redraw();
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}
