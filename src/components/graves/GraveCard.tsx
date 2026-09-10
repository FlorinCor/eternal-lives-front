import React from 'react';
import { Grave } from '../../types';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GraveCardProps {
  grave: Grave;
  className?: string;
}

export const GraveCard: React.FC<GraveCardProps> = ({ grave, className = '' }) => {
  return (
    <div
      className={`bg-charcoal-900/90 border border-forest-800/80 rounded-xl overflow-hidden hover:border-gold-500/50 transition-all duration-300 shadow-md hover:shadow-elevated flex flex-col justify-between ${className}`}
    >
      <div className="relative h-48 w-full bg-charcoal-950 overflow-hidden">
        <img
          src={grave.imageUrl}
          alt={grave.cemeteryName}
          loading="lazy"
          className="w-full h-full object-cover object-center brightness-90 hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 text-[10px] font-sans font-medium uppercase tracking-wider text-ivory-200 bg-forest-950/90 border border-forest-700/60 rounded-full">
            Resting Site
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-serif text-lg font-medium text-ivory-100 mb-1 leading-snug">
            {grave.cemeteryName}
          </h4>
          <div className="flex items-center gap-1.5 text-xs text-stone-300 font-sans mb-3">
            <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span>
              {grave.city}
              {grave.state ? `, ${grave.state}` : ''}, {grave.country}
            </span>
          </div>
          {grave.monumentType && (
            <p className="text-xs text-stone-400 font-sans italic line-clamp-2">
              {grave.monumentType}
            </p>
          )}
        </div>

        {grave.personName && (
          <div className="pt-3 mt-3 border-t border-forest-900/80 flex items-center justify-between text-xs font-serif">
            <span className="text-stone-400">Memorial to</span>
            <Link
              to={`/people/${grave.personId || ''}`}
              className="text-gold-400 hover:text-gold-200 font-medium"
            >
              {grave.personName} →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
