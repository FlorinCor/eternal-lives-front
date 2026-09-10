import React from 'react';
import { Compass, SearchX } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No records found',
  description = 'We could not find any memorials matching your criteria in the historical registry.',
  actionLabel,
  onAction,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-forest-800/40 rounded-xl bg-forest-950/40 backdrop-blur my-6 max-w-xl mx-auto">
      <div className="w-16 h-16 rounded-full bg-charcoal-900 border border-gold-600/30 flex items-center justify-center text-gold-400 mb-5 shadow-gold-glow">
        {icon || <SearchX className="w-8 h-8 opacity-90 stroke-[1.5]" />}
      </div>
      <h3 className="font-serif text-2xl text-ivory-100 mb-2 font-normal">{title}</h3>
      <p className="text-ivory-400 text-sm max-w-md mb-6 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction} leftIcon={<Compass className="w-4 h-4" />}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
