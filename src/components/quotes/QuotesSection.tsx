import React from 'react';
import { Person } from '../../types';
import { QuoteCard } from './QuoteCard';
import { Quote as QuoteIcon } from 'lucide-react';

interface QuotesSectionProps {
  person: Person;
}

export const QuotesSection: React.FC<QuotesSectionProps> = ({ person }) => {
  const allQuotes = [
    ...(person.featuredQuote ? [person.featuredQuote] : []),
    ...(person.quotes || []).filter(q => q.id !== person.featuredQuote?.id),
  ];

  if (!allQuotes.length) return null;

  return (
    <section className="py-16 sm:py-24 border-b border-forest-900/80 bg-forest-950/80 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-gold-400 font-serif text-sm uppercase tracking-widest mb-3">
            <QuoteIcon className="w-4 h-4 text-gold-500" />
            <span>Words for Eternity</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-ivory-100 font-normal">
            Memorable Words & Wisdom
          </h2>
          <p className="text-stone-400 text-sm mt-2 max-w-xl mx-auto font-sans">
            Verified quotations and reflections penned or spoken throughout {person.name}'s lifetime.
          </p>
          <div className="w-16 h-0.5 bg-gold-600/50 mx-auto mt-4" />
        </div>

        {/* Featured Quote / List */}
        <div className="space-y-8">
          {allQuotes.map((quote, idx) => (
            <QuoteCard
              key={quote.id || idx}
              quote={{ ...quote, personName: person.name }}
              isFeatured={idx === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
