import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-forest-950 disabled:opacity-50 disabled:cursor-not-allowed rounded select-none tracking-wide';

  const variants = {
    primary:
      'bg-forest-800 hover:bg-forest-700 text-ivory-100 border border-forest-600/50 shadow-md focus:ring-forest-500',
    secondary:
      'bg-charcoal-800 hover:bg-charcoal-700 text-ivory-200 border border-charcoal-700 focus:ring-charcoal-500',
    outline:
      'bg-transparent hover:bg-forest-900/60 text-ivory-200 border border-forest-700/80 hover:border-forest-500 focus:ring-forest-500',
    ghost:
      'bg-transparent hover:bg-forest-900/40 text-ivory-300 hover:text-ivory-100 focus:ring-forest-500',
    gold:
      'bg-gold-600 hover:bg-gold-500 text-charcoal-950 font-semibold shadow-gold-glow border border-gold-400 focus:ring-gold-400',
    danger:
      'bg-red-900/80 hover:bg-red-800 text-red-100 border border-red-700 focus:ring-red-500',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
};
