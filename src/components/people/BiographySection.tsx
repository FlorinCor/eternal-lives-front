import React from 'react';
import { Person } from '../../types';
import { BookOpen, Calendar, Globe } from 'lucide-react';

interface BiographySectionProps {
  person: Person;
}

export const BiographySection: React.FC<BiographySectionProps> = ({ person }) => {
  return (
    <section className="py-16 sm:py-24 border-b border-forest-900/80 bg-charcoal-950/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-gold-400 font-serif text-sm uppercase tracking-widest mb-3">
            <BookOpen className="w-4 h-4 text-gold-500" />
            <span>Chronicle & Legacy</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-ivory-100 font-normal">
            The Story of {person.name}
          </h2>
          <div className="w-16 h-0.5 bg-gold-600/50 mx-auto mt-4" />
        </div>

        {/* Historical Context Callout Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
          <div className="p-5 rounded-xl bg-charcoal-900/80 border border-forest-800/80">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-stone-400 font-sans mb-1">
              <Calendar className="w-3.5 h-3.5 text-gold-400" />
              <span>Lifespan Chronology</span>
            </div>
            <p className="font-serif text-base text-ivory-100">
              {person.birthDate || person.birthYear} — {person.deathDate || person.deathYear}
            </p>
            {person.birthPlace && (
              <p className="text-xs text-stone-400 mt-1">Born: {person.birthPlace}</p>
            )}
            {person.deathPlace && (
              <p className="text-xs text-stone-400">Died: {person.deathPlace}</p>
            )}
          </div>

          <div className="p-5 rounded-xl bg-charcoal-900/80 border border-forest-800/80">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-stone-400 font-sans mb-1">
              <Globe className="w-3.5 h-3.5 text-gold-400" />
              <span>Historical Impact</span>
            </div>
            <p className="font-sans text-xs text-ivory-300 leading-relaxed">
              {person.historicalSignificance ||
                `Renowned ${person.categoryName.toLowerCase()} who contributed fundamentally to human progress.`}
            </p>
          </div>
        </div>

        {/* Narrative Prose */}
        <div className="prose prose-invert max-w-none space-y-8 font-serif text-lg sm:text-xl text-ivory-200/90 leading-relaxed sm:leading-loose">
          {person.fullBiography && person.fullBiography.length > 0 ? (
            person.fullBiography.map((paragraph, idx) => (
              <p
                key={idx}
                className={idx === 0 ? 'first-letter:text-5xl first-letter:font-cinzel first-letter:float-left first-letter:mr-3 first-letter:text-gold-400 first-letter:leading-none' : ''}
              >
                {paragraph}
              </p>
            ))
          ) : (
            <p className="first-letter:text-5xl first-letter:font-cinzel first-letter:float-left first-letter:mr-3 first-letter:text-gold-400 first-letter:leading-none">
              {person.shortBiography}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
