import React from 'react';
import { Category } from '../../types';
import { Landmark } from 'lucide-react';

interface CategoryHeroProps {
  category: Category;
  totalPeople: number;
}

export const CategoryHero: React.FC<CategoryHeroProps> = ({ category, totalPeople }) => {
  return (
    <section className="relative py-24 sm:py-32 bg-charcoal-950 overflow-hidden border-b border-forest-900/80">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={category.imageUrl}
          alt={category.name}
          className="w-full h-full object-cover object-center brightness-[0.35] contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/80 to-forest-950/40" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest-900/80 border border-gold-600/40 text-gold-300 text-xs font-sans uppercase tracking-widest mb-4">
          <Landmark className="w-3.5 h-3.5 text-gold-400" />
          <span>Historical Archive Category</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl text-ivory-100 font-normal mb-4">
          {category.name}
        </h1>

        <p className="text-base sm:text-lg text-ivory-300 font-sans max-w-2xl mx-auto mb-6 leading-relaxed">
          {category.description}
        </p>

        <div className="inline-flex items-center gap-3 text-xs text-stone-300 font-serif">
          <span className="text-gold-400 font-semibold text-sm">{totalPeople}</span>
          <span>biographical memorials listed</span>
          <span className="text-forest-600">•</span>
          <span className="text-stone-400">{category.graveCount} verified global resting places</span>
        </div>
      </div>
    </section>
  );
};
