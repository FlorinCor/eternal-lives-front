import React from 'react';
import { Quote } from '../../types';
import { Badge } from '../common/Badge';
import { CheckCircle, HelpCircle, BookOpen } from 'lucide-react';

interface QuoteCardProps {
  quote: Quote;
  isFeatured?: boolean;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ quote, isFeatured = false }) => {
  return (
    <div
      className={`relative rounded-2xl transition-all duration-300 p-8 sm:p-10 ${
        isFeatured
          ? 'bg-gradient-to-br from-forest-900/90 to-charcoal-900/95 border-2 border-gold-500/50 shadow-gold-glow'
          : 'bg-charcoal-900/80 border border-forest-800/70 hover:border-forest-600'
      }`}
    >
      {/* Giant Decorative Quotation Mark in Background */}
      <span
        aria-hidden="true"
        className="absolute top-4 left-6 text-7xl sm:text-8xl font-serif text-gold-500/10 pointer-events-none select-none font-bold"
      >
        “
      </span>

      <div className="relative z-10">
        {/* Quote Text */}
        <blockquote className="font-serif text-xl sm:text-2xl text-ivory-100 font-normal leading-relaxed italic mb-6">
          "{quote.quote.replace(/^["']|["']$/g, '')}"
        </blockquote>

        {/* Attribution & Metadata */}
        <div className="pt-4 border-t border-forest-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="font-serif text-base text-gold-300 font-medium">
              {quote.personName}
            </div>
            {quote.source && (
              <div className="flex items-center gap-1.5 text-xs text-stone-400 font-sans mt-0.5">
                <BookOpen className="w-3.5 h-3.5 text-gold-500/70 shrink-0" />
                <span className="italic">{quote.source}</span>
                {quote.year && <span className="not-italic text-stone-500">({quote.year})</span>}
              </div>
            )}
            {quote.context && (
              <p className="text-xs text-stone-500 font-sans mt-1">{quote.context}</p>
            )}
          </div>

          {/* Verification Badge */}
          <div className="shrink-0">
            {quote.isVerified ? (
              <Badge variant="verified" size="sm" className="gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                Verified Citation
              </Badge>
            ) : (
              <Badge variant="stone" size="sm" className="gap-1">
                <HelpCircle className="w-3 h-3 text-amber-400" />
                Attributed
              </Badge>
            )}
          </div>
        </div>

        {quote.verificationNotes && (
          <div className="mt-3 text-[11px] text-stone-500 font-sans italic border-l border-gold-600/30 pl-2">
            Archival note: {quote.verificationNotes}
          </div>
        )}
      </div>
    </div>
  );
};
