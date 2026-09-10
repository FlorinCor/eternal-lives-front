import React, { useState } from 'react';
import { Person, PhotoItem } from '../../types';
import { Camera, ZoomIn } from 'lucide-react';
import { Lightbox } from '../common/Lightbox';

interface PhotoGalleryProps {
  person: Person;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ person }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Collect all available photographs
  const photos: PhotoItem[] = [
    ...(person.gallery || []),
    ...(person.graveImageUrl && !person.gallery?.some(p => p.url === person.graveImageUrl)
      ? [
          {
            url: person.graveImageUrl,
            caption: `${person.name}'s memorial and resting place in ${person.grave.cemeteryName}`,
            category: 'grave' as const,
          },
        ]
      : []),
    ...(person.grave?.additionalImages?.map((url, i) => ({
      url,
      caption: `Memorial sanctuary view ${i + 1}`,
      category: 'monument' as const,
    })) || []),
  ];

  if (!photos.length) return null;

  return (
    <section className="py-16 sm:py-24 border-b border-forest-900/80 bg-charcoal-950/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-gold-400 font-serif text-sm uppercase tracking-widest mb-3">
            <Camera className="w-4 h-4 text-gold-500" />
            <span>Visual Archive</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-ivory-100 font-normal">
            Photographs & Memorial Vault
          </h2>
          <p className="text-stone-400 text-sm mt-2 font-sans max-w-md mx-auto">
            High-resolution archival photographs of the memorial, resting site, and historic tributes.
          </p>
          <div className="w-16 h-0.5 bg-gold-600/50 mx-auto mt-4" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <div
              key={index}
              onClick={() => setLightboxIndex(index)}
              className="group relative h-72 rounded-xl overflow-hidden border border-forest-800/80 bg-charcoal-900 cursor-pointer shadow-md hover:border-gold-500/60 hover:shadow-elevated transition-all duration-300"
            >
              <img
                src={photo.url}
                alt={photo.caption || `Photograph ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover object-center brightness-90 group-hover:scale-105 group-hover:brightness-100 transition-transform duration-700"
              />

              {/* Hover overlay with zoom icon */}
              <div className="absolute inset-0 bg-forest-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                <div className="self-end p-2 rounded-full bg-forest-900/90 text-gold-300 border border-gold-500/40">
                  <ZoomIn className="w-4 h-4" />
                </div>
                {photo.caption && (
                  <p className="text-xs text-ivory-100 font-serif line-clamp-2 leading-relaxed bg-charcoal-950/80 p-2.5 rounded-lg backdrop-blur-sm border border-forest-800/60">
                    {photo.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Component */}
      <Lightbox
        photos={photos}
        currentIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </section>
  );
};
