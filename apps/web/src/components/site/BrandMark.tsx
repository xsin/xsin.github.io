import { cn } from '@/lib/utils';

export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={cn('grid size-7 place-items-center text-brand-text', className)} aria-hidden="true">
      <svg
        className="h-full w-full"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      >
        <path d="M16 2.5v27M2.5 16h27M6.5 6.5l19 19M25.5 6.5l-19 19" />
        <circle cx="16" cy="16" r="3" fill="currentColor" stroke="none" />
      </svg>
    </span>
  );
}
