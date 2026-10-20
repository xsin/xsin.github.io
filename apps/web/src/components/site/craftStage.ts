/** Shared stage chrome for the Craft experiments (CSS cannot express canvas stacking). */
export const craftStageClass =
  'relative aspect-[1.45] overflow-hidden border-b border-line bg-screen [&_canvas]:absolute [&_canvas]:inset-0 [&_canvas]:size-full max-[980px]:aspect-[2.1] max-[760px]:aspect-[1.6]';

export const craftTagClass =
  'absolute top-3 left-3 z-[2] rounded-[3px] border border-white/14 bg-[rgba(6,7,11,0.5)] px-2 py-1 font-mono text-[7px] tracking-[0.16em] text-white/60 backdrop-blur-[8px]';
