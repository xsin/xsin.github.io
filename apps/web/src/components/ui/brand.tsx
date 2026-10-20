import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** 1440px max width + the clamp gutter token. */
export function Container({ className, children, ...props }: ComponentProps<'div'>) {
  return (
    <div className={cn('mx-auto w-full max-w-shell px-gutter', className)} {...props}>
      {children}
    </div>
  );
}

export function ThemeGlyph() {
  return <span className="theme-glyph" aria-hidden="true" />;
}

export function IconButton({ className, children, ...props }: ComponentProps<'button'>) {
  return (
    <button
      type="button"
      className={cn(
        'grid size-10 place-items-center rounded-sm border border-line font-mono text-[9px] leading-none text-fg-muted',
        'transition-colors duration-200 hover:border-line-strong hover:bg-panel hover:text-ink',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function LangButton({ className, children, ...props }: ComponentProps<'button'>) {
  return (
    <button
      type="button"
      className={cn(
        'grid h-10 min-w-11 place-items-center rounded-sm border border-line px-2.5 font-mono text-[9px] leading-none tracking-[0.12em] text-fg-muted',
        'transition-colors duration-200 hover:border-line-strong hover:bg-panel hover:text-ink',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function StatusPill({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center gap-1.5 rounded-full border border-line px-2 py-0',
        'font-mono text-[8px] uppercase leading-none tracking-[0.12em] text-fg-muted',
        className
      )}
    >
      <i className="size-1.5 shrink-0 rounded-full bg-brand" />
      {children}
    </span>
  );
}

export function Chip({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center rounded-sm border border-line bg-bg/50 px-2',
        'font-mono text-[7px] uppercase leading-none tracking-[0.12em] text-fg-muted',
        className
      )}
    >
      {children}
    </span>
  );
}

export function SectionLabel({ num, children }: { num: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[8px] uppercase tracking-[0.18em] text-fg-muted">
      <span className="text-brand-text">{num}</span>
      <span>{children}</span>
    </div>
  );
}
