import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '@/lib/utils';

/**
 * The single Button source for the site. Variants follow spec-ui §5.6
 * (default / outline / ghost); sizes are a scale, not a call-site override.
 */
const buttonVariants = cva(
  [
    'group/button inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap',
    'rounded-sm border border-transparent font-mono text-[10px] font-medium uppercase leading-none tracking-[0.12em]',
    'transition-[background-color,border-color,color,transform] duration-200 outline-none select-none',
    'hover:-translate-y-0.5 active:translate-y-0',
    'focus-visible:ring-2 focus-visible:ring-brand/50',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-3.5'
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'bg-brand text-brand-ink hover:bg-brand-strong',
        outline: 'border-line text-ink hover:border-ink hover:bg-panel',
        ghost: 'text-fg-muted hover:bg-panel-2 hover:text-ink',
        secondary: 'bg-panel-2 text-ink hover:bg-panel',
        destructive: 'bg-destructive/10 text-destructive hover:bg-destructive/20',
        link: 'text-brand-text underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-12 px-6',
        sm: 'h-9 px-4 text-[9px]',
        lg: 'h-12 px-6',
        xs: 'h-8 px-3 text-[9px]',
        icon: 'size-10 p-0',
        'icon-sm': 'size-9 p-0',
        'icon-lg': 'size-11 p-0'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'button';
  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
