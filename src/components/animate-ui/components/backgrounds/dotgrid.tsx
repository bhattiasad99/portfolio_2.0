'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type DotGridBackgroundProps = React.ComponentProps<'div'> & {
  backgroundClassName?: string;
  dotColor?: string;
  dotSize?: number;
  dotSpacing?: number;
  fadeDirection?: 'top' | 'bottom' | 'both' | 'radial';
  animate?: boolean;
};

function DotGridBackground({
  backgroundClassName,
  className,
  children,
  dotColor = 'rgba(15,23,42,0.12)',
  dotSize = 1.5,
  dotSpacing = 28,
  fadeDirection = 'radial',
  animate = true,
  ...props
}: DotGridBackgroundProps) {
  const maskMap: Record<string, string> = {
    top: 'linear-gradient(to bottom, transparent 0%, #000 30%, #000 100%)',
    bottom: 'linear-gradient(to top, transparent 0%, #000 30%, #000 100%)',
    both: 'linear-gradient(to bottom, transparent 0%, #000 20%, #000 80%, transparent 100%)',
    radial: 'radial-gradient(ellipse 80% 70% at 50% 40%, #000 30%, transparent 100%)',
  };
  const mask = maskMap[fadeDirection] ?? maskMap.radial;

  return (
    <div
      data-slot="dot-grid-background"
      className={cn('relative size-full overflow-hidden', className)}
      {...props}
    >
      <div
        className={cn('pointer-events-none absolute inset-0', backgroundClassName)}
        style={{
          backgroundImage: `radial-gradient(circle, ${dotColor} ${dotSize}px, transparent ${dotSize}px)`,
          backgroundSize: `${dotSpacing}px ${dotSpacing}px`,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      />
      {/* Subtle warm radial glow at top-right */}
      <div
        className="pointer-events-none absolute -right-32 -top-32 size-[520px] opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
        }}
      />
      {/* Subtle cool glow at bottom-left */}
      <div
        className="pointer-events-none absolute -bottom-32 -left-16 size-[420px] opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)',
        }}
      />
      {children}
    </div>
  );
}

export { DotGridBackground, type DotGridBackgroundProps };
