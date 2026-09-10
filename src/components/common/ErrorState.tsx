import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Unable to load archival records',
  message = 'An unexpected error occurred while retrieving historical memorials. Please try again.',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-red-900/40 rounded-xl bg-charcoal-950/80 backdrop-blur my-6 max-w-xl mx-auto">
      <div className="w-14 h-14 rounded-full bg-red-950/60 border border-red-700/60 flex items-center justify-center text-red-400 mb-4">
        <AlertCircle className="w-7 h-7" />
      </div>
      <h3 className="font-serif text-2xl text-ivory-100 mb-2 font-normal">{title}</h3>
      <p className="text-ivory-400 text-sm max-w-md mb-6 leading-relaxed">{message}</p>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          leftIcon={<RefreshCw className="w-4 h-4" />}
        >
          Try Again
        </Button>
      )}
    </div>
  );
};
