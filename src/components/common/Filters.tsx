import React from 'react';
import { SearchFilters, Category } from '../../types';
import { Filter, RotateCcw } from 'lucide-react';

interface FiltersProps {
  filters: SearchFilters;
  categories: Category[];
  countries?: string[];
  onChange: (newFilters: SearchFilters) => void;
  onReset: () => void;
  className?: string;
}

export const Filters: React.FC<FiltersProps> = ({
  filters,
  categories,
  countries = [
    'United States',
    'United Kingdom',
    'France',
    'Germany',
    'Austria',
    'Italy',
    'Serbia',
    'Poland',
    'Netherlands',
    'Greece',
  ],
  onChange,
  onReset,
  className = '',
}) => {
  const handleInputChange = (field: keyof SearchFilters, value: any) => {
    onChange({
      ...filters,
      [field]: value === '' ? undefined : value,
      page: 1, // reset to page 1 upon changing filter
    });
  };

  const hasActiveFilters = Boolean(
    filters.category ||
    filters.country ||
    filters.cemetery ||
    filters.birthYearMin !== undefined ||
    filters.birthYearMax !== undefined ||
    filters.deathYearMin !== undefined ||
    filters.deathYearMax !== undefined ||
    (filters.sortBy && filters.sortBy !== 'importance')
  );

  return (
    <div
      className={`bg-charcoal-900/90 border border-forest-800/80 rounded-xl p-5 shadow-elevated ${className}`}
    >
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-forest-900/80">
        <div className="flex items-center gap-2 text-gold-400 font-serif">
          <Filter className="w-4 h-4 text-gold-500" />
          <span className="text-base font-medium tracking-wide">Filter & Sort Archive</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-gold-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset all
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Category */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5 font-sans">
            Category
          </label>
          <select
            value={filters.category || ''}
            onChange={e => handleInputChange('category', e.target.value)}
            className="w-full bg-forest-950/90 border border-forest-800 rounded-lg px-3 py-2 text-sm text-ivory-100 focus:outline-none focus:border-gold-500/80 transition-colors"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.slug}>
                {cat.name} ({cat.graveCount})
              </option>
            ))}
          </select>
        </div>

        {/* Country */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5 font-sans">
            Country
          </label>
          <select
            value={filters.country || ''}
            onChange={e => handleInputChange('country', e.target.value)}
            className="w-full bg-forest-950/90 border border-forest-800 rounded-lg px-3 py-2 text-sm text-ivory-100 focus:outline-none focus:border-gold-500/80 transition-colors"
          >
            <option value="">All Countries</option>
            {countries.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Cemetery Search Filter */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5 font-sans">
            Cemetery
          </label>
          <input
            type="text"
            value={filters.cemetery || ''}
            onChange={e => handleInputChange('cemetery', e.target.value)}
            placeholder="e.g. Westminster, Panthéon"
            className="w-full bg-forest-950/90 border border-forest-800 rounded-lg px-3 py-2 text-sm text-ivory-100 placeholder:text-stone-600 focus:outline-none focus:border-gold-500/80 transition-colors"
          />
        </div>

        {/* Birth Year Range */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5 font-sans">
            Born (From)
          </label>
          <input
            type="number"
            value={filters.birthYearMin ?? ''}
            onChange={e =>
              handleInputChange(
                'birthYearMin',
                e.target.value ? Number(e.target.value) : undefined
              )
            }
            placeholder="e.g. 1500"
            className="w-full bg-forest-950/90 border border-forest-800 rounded-lg px-3 py-2 text-sm text-ivory-100 placeholder:text-stone-600 focus:outline-none focus:border-gold-500/80 transition-colors"
          />
        </div>

        {/* Death Year Range */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5 font-sans">
            Died (Until)
          </label>
          <input
            type="number"
            value={filters.deathYearMax ?? ''}
            onChange={e =>
              handleInputChange(
                'deathYearMax',
                e.target.value ? Number(e.target.value) : undefined
              )
            }
            placeholder="e.g. 2020"
            className="w-full bg-forest-950/90 border border-forest-800 rounded-lg px-3 py-2 text-sm text-ivory-100 placeholder:text-stone-600 focus:outline-none focus:border-gold-500/80 transition-colors"
          />
        </div>

        {/* Sort */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5 font-sans">
            Sort Order
          </label>
          <select
            value={filters.sortBy || 'importance'}
            onChange={e => handleInputChange('sortBy', e.target.value)}
            className="w-full bg-forest-950/90 border border-forest-800 rounded-lg px-3 py-2 text-sm text-ivory-100 focus:outline-none focus:border-gold-500/80 transition-colors font-medium text-gold-300"
          >
            <option value="importance">Most Important</option>
            <option value="alphabetical">Alphabetical (A-Z)</option>
            <option value="recent">Recently Added</option>
            <option value="birth_asc">Birth Year (Earliest)</option>
            <option value="death_desc">Death Year (Latest)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
