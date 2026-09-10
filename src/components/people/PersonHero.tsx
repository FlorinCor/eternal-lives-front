import React from 'react';
import { Person } from '../../types';
import { formatYears } from '../../lib/utils';
import { MapPin, Sparkles } from 'lucide-react';
import { FavoriteButton } from './FavoriteButton';
import { Link } from 'react-router-dom';

interface PersonHeroProps {
  person: Person;
}

export const PersonHero: React.FC<PersonHeroProps> = ({ person }) => {
  return (
    <section className="relative min-h-[65vh] lg:min-h-[75vh] flex items-end justify-center overflow-hidden bg-charcoal-950 pb-16 pt-32">
      {/* Background Grave / Hero Photograph */}
      <div className="absolute inset-0 z-0">
        <img
          src={person.heroImageUrl || person.graveImageUrl}
          alt={`Resting place of ${person.name}`}
          className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-105 scale-100"
        />
        {/* Cinematic Multi-layer Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/70 to-forest-950/30" />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-forest-950/40 to-forest-950/90" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        {/* Category & Verified Badge */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
          <Link
            to={`/category/${person.categorySlug}`}
            className="px-3.5 py-1 text-xs uppercase tracking-widest font-sans font-medium text-gold-300 bg-forest-900/80 border border-gold-600/40 rounded-full hover:bg-forest-800 transition-colors"
          >
            {person.categoryName}
          </Link>
          {person.isFeatured && (
            <span className="inline-flex items-center gap-1 px-3 py-1 text-xs uppercase tracking-widest font-sans text-emerald-300 bg-emerald-950/60 border border-emerald-700/50 rounded-full">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              Featured Memorial
            </span>
          )}
        </div>

        {/* Large Memorial Heading */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-ivory-100 tracking-tight leading-tight mb-3 text-shadow">
          {person.name}
        </h1>

        {/* Native name if present */}
        {person.nativeName && person.nativeName !== person.name && (
          <p className="font-serif italic text-lg text-ivory-400 mb-2">{person.nativeName}</p>
        )}

        {/* Years of Life */}
        <div className="font-serif text-xl sm:text-2xl text-gold-400 tracking-widest font-medium my-3">
          {formatYears(person.birthYear, person.deathYear)}
        </div>

        {/* Occupations */}
        <div className="text-base sm:text-lg text-ivory-300 font-sans font-light max-w-2xl mx-auto mb-4 leading-relaxed">
          {person.occupations.join(' • ')}
        </div>

        {/* Location & Resting place line */}
        <div className="flex items-center justify-center gap-2 text-sm text-stone-300 font-sans mb-8">
          <MapPin className="w-4 h-4 text-gold-400" />
          <span>
            {person.grave.city}
            {person.grave.state ? `, ${person.grave.state}` : ''}, {person.grave.country}
          </span>
          <span className="text-forest-600">•</span>
          <span className="text-ivory-400 italic font-serif">{person.grave.cemeteryName}</span>
        </div>

        {/* Action button: Add to Favorites */}
        <div className="flex items-center justify-center gap-4">
          <FavoriteButton
            personId={person.id}
            personName={person.name}
            showText={true}
            className="shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};
