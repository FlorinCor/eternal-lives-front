import React, { useState } from 'react';
import { usePeople } from '../hooks/usePeople';
import { useCategories } from '../hooks/useCategories';
import { SearchFilters } from '../types';
import { PersonCard } from '../components/people/PersonCard';
import { Filters } from '../components/common/Filters';
import { Pagination } from '../components/common/Pagination';
import { SearchBar } from '../components/common/SearchBar';
import { PersonCardSkeleton } from '../components/common/LoadingSkeleton';
import { EmptyState } from '../components/common/EmptyState';
import { ErrorState } from '../components/common/ErrorState';
import { SEO } from '../components/common/SEO';
import { Compass } from 'lucide-react';

export const ExplorePage: React.FC = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    page: 1,
    limit: 9,
    sortBy: 'importance',
  });

  const { data: categories = [] } = useCategories();
  const { data, isLoading, isError, error, refetch } = usePeople(filters);

  const handleSearchSubmit = (query: string) => {
    setFilters(prev => ({ ...prev, query, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    setFilters({ page: 1, limit: 9, sortBy: 'importance' });
  };

  return (
    <>
      <SEO
        title="Explore Lives — Eternal Lives Archive"
        description="Search and filter through historical resting places, graves, and biographies of luminaries who shaped human civilization."
      />

      <div className="min-h-screen bg-forest-950 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Top Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 text-gold-400 font-serif text-sm uppercase tracking-widest mb-2">
              <Compass className="w-4 h-4 text-gold-500" />
              <span>Historical Sanctuary Registry</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl text-ivory-100 font-normal mb-3">
              Explore Lives
            </h1>
            <p className="text-stone-400 text-sm sm:text-base font-sans">
              Discover historical resting places, burial locations, and biographies across centuries and continents.
            </p>
          </div>

          {/* Quick Search */}
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar
              initialValue={filters.query || ''}
              onSearch={handleSearchSubmit}
              placeholder="Search by name, occupation, cemetery, or country..."
              showExamples={true}
            />
          </div>

          {/* Comprehensive Filter Panel */}
          <Filters
            filters={filters}
            categories={categories}
            onChange={setFilters}
            onReset={handleResetFilters}
            className="mb-10"
          />

          {/* Results Summary Bar */}
          <div className="flex items-center justify-between text-xs text-stone-400 font-sans pb-4 mb-6 border-b border-forest-900/80">
            <div>
              Showing{' '}
              <span className="text-gold-300 font-semibold">{data?.items.length || 0}</span> of{' '}
              <span className="text-gold-300 font-semibold">{data?.total || 0}</span> historical memorials
              {filters.query && (
                <span className="ml-1 text-ivory-300">
                  matching "<span className="text-gold-200">{filters.query}</span>"
                </span>
              )}
            </div>

            {filters.page && data && data.totalPages > 1 && (
              <div>
                Page {filters.page} of {data.totalPages}
              </div>
            )}
          </div>

          {/* Content / States */}
          {isError ? (
            <ErrorState
              title="Failed to Load Archives"
              message={error instanceof Error ? error.message : 'Unable to connect to registry.'}
              onRetry={() => refetch()}
            />
          ) : isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <PersonCardSkeleton key={i} />
              ))}
            </div>
          ) : !data?.items.length ? (
            <EmptyState
              title="No Memorials Found"
              description="No historical figures matched your selected filters or search query. Try broadening your criteria."
              actionLabel="Reset Filters"
              onAction={handleResetFilters}
            />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.items.map(person => (
                  <PersonCard key={person.id} person={person} />
                ))}
              </div>

              {/* Pagination */}
              {data.totalPages > 1 && (
                <Pagination
                  currentPage={filters.page || 1}
                  totalPages={data.totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
