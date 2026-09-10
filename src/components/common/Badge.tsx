import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'gold' | 'verified' | 'outline' | 'stone' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full tracking-wider select-none';

  const variants = {
    default: 'bg-forest-900/80 text-forest-200 border border-forest-700/60',
    gold: 'bg-gold-950/60 text-gold-300 border border-gold-600/40',
    verified: 'bg-emerald-950/60 text-emerald-300 border border-emerald-700/50',
    outline: 'bg-transparent text-ivory-300 border border-forest-700/60',
    stone: 'bg-charcoal-800 text-stone-300 border border-charcoal-700',
    success: 'bg-emerald-950 text-emerald-300 border border-emerald-700',
    warning: 'bg-amber-950 text-amber-300 border border-amber-700',
    danger: 'bg-red-950 text-red-300 border border-red-800',
  };

  const sizes = {
    sm: 'text-[10px] uppercase px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
};
