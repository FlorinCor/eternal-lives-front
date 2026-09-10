import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Quote as QuoteIcon } from 'lucide-react';
import { Person } from '../../types';
import { formatYears, truncateText } from '../../lib/utils';
import { FavoriteButton } from './FavoriteButton';

interface PersonCardProps {
  person: Person;
  showQuote?: boolean;
  className?: string;
}

export const PersonCard: React.FC<PersonCardProps> = ({
  person,
  showQuote = true,
  className = '',
}) => {
  const quoteText =
    person.featuredQuote?.quote ||
    (person.quotes && person.quotes[0]?.quote) ||
    person.shortBiography;

  return (
    <article
      className={`group relative flex flex-col bg-charcoal-900/90 rounded-xl overflow-hidden border border-forest-800/80 hover:border-gold-500/50 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 ${className}`}
    >
      {/* Grave Photograph / Image */}
      <div className="relative h-60 w-full overflow-hidden bg-charcoal-950">
        <img
          src={person.graveImageUrl || person.portraitUrl}
          alt={`Memorial of ${person.name}`}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-100"
        />

        {/* Gradient dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent" />

        {/* Favorite Button */}
        <div className="absolute top-3 right-3 z-10">
          <FavoriteButton personId={person.id} personName={person.name} />
        </div>

        {/* Category Pill */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 text-[11px] font-sans font-medium uppercase tracking-wider text-ivory-200 bg-forest-950/80 backdrop-blur-sm border border-forest-700/60 rounded-full">
            {person.categoryName}
          </span>
        </div>

        {/* Location snippet on photo */}
        <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-xs text-ivory-300 font-sans">
          <span className="flex items-center gap-1 truncate text-stone-300">
            <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span className="truncate">
              {person.grave.city}, {person.grave.country}
            </span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Name & Years */}
          <Link to={`/people/${person.slug}`} className="block group-hover:text-gold-300 transition-colors">
            <h3 className="font-serif text-2xl font-normal text-ivory-100 mb-1 leading-snug group-hover:text-gold-300">
              {person.name}
            </h3>
          </Link>
          <div className="text-xs text-gold-400 font-serif tracking-widest font-semibold uppercase mb-3">
            {formatYears(person.birthYear, person.deathYear)}
          </div>

          {/* Occupations */}
          {person.occupations && person.occupations.length > 0 && (
            <p className="text-xs text-stone-400 mb-4 line-clamp-1 font-sans">
              {person.occupations.join(' • ')}
            </p>
          )}

          {/* Emotional Quote */}
          {showQuote && quoteText && (
            <blockquote className="relative my-2 pl-3 border-l-2 border-gold-500/40 italic text-ivory-300 text-xs font-serif leading-relaxed line-clamp-2">
              <QuoteIcon className="w-3 h-3 text-gold-500/50 absolute -left-1.5 -top-1 fill-current opacity-30" />
              "{truncateText(quoteText.replace(/^["']|["']$/g, ''), 110)}"
            </blockquote>
          )}
        </div>

        {/* Bottom cemetery info and link */}
        <div className="pt-4 mt-4 border-t border-forest-900/80 flex items-center justify-between">
          <span className="text-xs text-stone-400 truncate max-w-[200px] font-sans">
            {person.grave.cemeteryName}
          </span>
          <Link
            to={`/people/${person.slug}`}
            className="text-xs font-serif tracking-wider text-gold-400 hover:text-gold-200 inline-flex items-center gap-1 font-medium group/link"
          >
            Visit Memorial
            <span className="group-hover/link:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
};
