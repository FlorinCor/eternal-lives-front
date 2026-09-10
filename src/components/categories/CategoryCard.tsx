import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Category } from '../../types';

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, className = '' }) => {
  return (
    <Link
      to={`/category/${category.slug}`}
      className={`group relative h-56 sm:h-64 rounded-2xl overflow-hidden border border-forest-800/80 hover:border-gold-500/60 shadow-lg hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 block ${className}`}
    >
      {/* Background Image */}
      <img
        src={category.imageUrl}
        alt={category.name}
        loading="lazy"
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.6] group-hover:brightness-[0.7]"
      />

      {/* Atmospheric Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-forest-950/60 to-transparent" />
      <div className="absolute inset-0 bg-forest-900/20 group-hover:bg-transparent transition-colors duration-300" />

      {/* Card Details */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
        {/* Top Tag */}
        <div className="flex justify-between items-center">
          <span className="text-[11px] font-sans font-medium uppercase tracking-widest text-gold-300 bg-charcoal-950/80 px-3 py-1 rounded-full border border-forest-800/80 backdrop-blur-sm">
            Memorial Collection
          </span>
          <div className="w-8 h-8 rounded-full bg-forest-900/80 border border-forest-700/60 flex items-center justify-center text-ivory-300 group-hover:text-gold-300 group-hover:border-gold-500/60 group-hover:translate-x-1 transition-all">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Title & Count */}
        <div>
          <h3 className="font-serif text-2xl sm:text-3xl font-medium text-ivory-100 group-hover:text-gold-200 transition-colors">
            {category.name}
          </h3>
          <p className="text-xs text-stone-300 font-sans mt-1">
            <span className="text-gold-400 font-semibold">{category.graveCount}</span> resting places catalogued
          </p>
        </div>
      </div>
    </Link>
  );
};
