import React from 'react';
import { useFavoritesList } from '../hooks/useFavorites';
import { PersonCard } from '../components/people/PersonCard';
import { PersonCardSkeleton } from '../components/common/LoadingSkeleton';
import { EmptyState } from '../components/common/EmptyState';
import { ErrorState } from '../components/common/ErrorState';
import { SEO } from '../components/common/SEO';
import { Heart, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FavoritesPage: React.FC = () => {
  const { data: favorites = [], isLoading, isError, error, refetch } = useFavoritesList();

  return (
    <>
      <SEO
        title="Saved Memorials Registry — Eternal Lives"
        description="Your personal curated collection of saved historical resting places and inspiring figures."
      />

      <div className="min-h-screen bg-forest-950 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-rose-400 font-serif text-sm uppercase tracking-widest mb-2">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span>Personal Memorial Collection</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl text-ivory-100 font-normal mb-3">
              Saved Memorials
            </h1>
            <p className="text-stone-400 text-sm sm:text-base font-sans">
              A private collection of remarkable lives and resting places you have chosen to honor and remember.
            </p>
          </div>

          {/* List States */}
          {isError ? (
            <ErrorState
              title="Failed to Load Saved Memorials"
              message={error instanceof Error ? error.message : 'Unable to retrieve saved favorites.'}
              onRetry={() => refetch()}
            />
          ) : isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <PersonCardSkeleton key={i} />
              ))}
            </div>
          ) : favorites.length === 0 ? (
            <EmptyState
              icon={<Heart className="w-8 h-8 text-rose-400 opacity-80" />}
              title="Your Memorial Registry is Empty"
              description="You have not saved any memorials yet. Explore the historical sanctuary and click the heart icon on any luminary to bookmark them here."
              actionLabel="Explore All Lives"
              onAction={() => {}}
            />
          ) : (
            <>
              <div className="flex items-center justify-between text-xs text-stone-400 font-sans pb-4 mb-8 border-b border-forest-900/80">
                <span>
                  Holding <span className="text-gold-300 font-semibold">{favorites.length}</span> saved memorial{favorites.length === 1 ? '' : 's'}
                </span>
                <Link to="/explore" className="text-gold-400 hover:text-gold-300 inline-flex items-center gap-1 font-serif">
                  <Compass className="w-3.5 h-3.5" />
                  Explore more luminaries
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {favorites.map(person => (
                  <PersonCard key={person.id} person={person} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
