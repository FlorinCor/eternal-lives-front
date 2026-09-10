import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';

interface SearchBarProps {
  initialValue?: string;
  placeholder?: string;
  size?: 'md' | 'lg';
  autoFocus?: boolean;
  onSearch?: (query: string) => void;
  showExamples?: boolean;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  initialValue = '',
  placeholder = 'Search for a person, resting place, or thinker...',
  size = 'md',
  autoFocus = false,
  onSearch,
  showExamples = false,
  className = '',
}) => {
  const [query, setQuery] = useState(initialValue);
  const navigate = useNavigate();

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = query.trim();
    if (!clean) return;

    if (onSearch) {
      onSearch(clean);
    } else {
      navigate(`/search?q=${encodeURIComponent(clean)}`);
    }
  };

  const handleExampleClick = (example: string) => {
    setQuery(example);
    if (onSearch) {
      onSearch(example);
    } else {
      navigate(`/search?q=${encodeURIComponent(example)}`);
    }
  };

  const examples = ['Albert Einstein', 'Marie Curie', 'Shakespeare', 'Nikola Tesla', 'Beethoven'];

  return (
    <div className={`w-full ${className}`}>
      <form
        onSubmit={handleSearchSubmit}
        className={`relative flex items-center w-full rounded-xl bg-charcoal-900/90 border border-forest-700/60 shadow-elevated focus-within:border-gold-500/80 focus-within:ring-2 focus-within:ring-gold-500/20 transition-all ${
          size === 'lg' ? 'p-2 sm:p-2.5' : 'p-1.5'
        }`}
      >
        <div className="pl-3 pr-2 text-gold-500/80">
          <Search className={size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'} />
        </div>

        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={`w-full bg-transparent text-ivory-100 placeholder:text-stone-400 focus:outline-none font-sans ${
            size === 'lg' ? 'text-base sm:text-lg py-2' : 'text-sm py-1.5'
          }`}
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear search input"
            className="text-stone-400 hover:text-ivory-100 px-2 text-xs uppercase"
          >
            Clear
          </button>
        )}

        <Button
          type="submit"
          variant="gold"
          size={size === 'lg' ? 'md' : 'sm'}
          className="rounded-lg ml-1 font-serif tracking-wide"
        >
          Search
        </Button>
      </form>

      {showExamples && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-ivory-400">
          <span className="text-stone-400">Examples:</span>
          {examples.map(ex => (
            <button
              key={ex}
              type="button"
              onClick={() => handleExampleClick(ex)}
              className="px-2.5 py-1 rounded-full bg-forest-900/60 hover:bg-forest-800 text-ivory-300 hover:text-gold-300 border border-forest-800/80 transition-colors"
            >
              {ex}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
