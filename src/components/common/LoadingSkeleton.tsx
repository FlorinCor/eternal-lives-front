import React from 'react';
import { cn } from '../../lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn('animate-pulse bg-charcoal-800/80 rounded', className)}
      {...props}
    />
  );
};

export const PersonCardSkeleton: React.FC = () => {
  return (
    <div className="bg-charcoal-900/90 border border-forest-900/80 rounded-lg overflow-hidden flex flex-col h-[460px]">
      <Skeleton className="h-64 w-full" />
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <Skeleton className="h-7 w-3/4" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-14 w-full" />
        </div>
        <div className="pt-4 border-t border-forest-900/60 flex justify-between items-center">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    </div>
  );
};

export const CategoryCardSkeleton: React.FC = () => {
  return (
    <div className="bg-charcoal-900/90 border border-forest-900/80 rounded-lg overflow-hidden h-48 relative">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
