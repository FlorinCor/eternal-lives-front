import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PhotoItem } from '../../types';

interface LightboxProps {
  photos: PhotoItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onIndexChange,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && currentIndex < photos.length - 1) onIndexChange(currentIndex + 1);
      if (e.key === 'ArrowLeft' && currentIndex > 0) onIndexChange(currentIndex - 1);
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, photos.length, onClose, onIndexChange]);

  if (!isOpen || !photos.length) return null;

  const currentPhoto = photos[currentIndex] || photos[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-950/95 backdrop-blur-md p-4 select-none"
    >
      {/* Top Controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
        <span className="text-ivory-400 text-sm font-sans">
          {currentIndex + 1} / {photos.length}
        </span>
        <button
          onClick={onClose}
          aria-label="Close lightbox"
          className="p-2 rounded-full bg-forest-950/80 border border-forest-800 text-ivory-300 hover:text-ivory-100 hover:bg-forest-900 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Buttons */}
      {currentIndex > 0 && (
        <button
          onClick={() => onIndexChange(currentIndex - 1)}
          aria-label="Previous photograph"
          className="absolute left-4 z-20 p-3 rounded-full bg-forest-950/80 border border-forest-800 text-ivory-200 hover:text-gold-400 hover:border-gold-500/50 transition-colors"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
      )}

      {currentIndex < photos.length - 1 && (
        <button
          onClick={() => onIndexChange(currentIndex + 1)}
          aria-label="Next photograph"
          className="absolute right-4 z-20 p-3 rounded-full bg-forest-950/80 border border-forest-800 text-ivory-200 hover:text-gold-400 hover:border-gold-500/50 transition-colors"
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      )}

      {/* Main Image Container */}
      <div className="max-w-5xl max-h-[85vh] flex flex-col items-center">
        <img
          src={currentPhoto.url}
          alt={currentPhoto.caption || 'Memorial photograph'}
          className="max-h-[72vh] max-w-full object-contain rounded-lg border border-forest-800 shadow-2xl"
        />
        {(currentPhoto.caption || currentPhoto.credit) && (
          <div className="mt-4 text-center max-w-2xl px-4">
            {currentPhoto.caption && (
              <p className="text-ivory-200 font-serif text-lg leading-snug">{currentPhoto.caption}</p>
            )}
            {currentPhoto.credit && (
              <p className="text-xs text-ivory-400 mt-1 uppercase tracking-widest font-sans">
                Source: {currentPhoto.credit}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
