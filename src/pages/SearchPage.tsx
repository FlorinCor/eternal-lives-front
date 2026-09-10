import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useSearch } from '../hooks/useSearch';
import { SearchBar } from '../components/common/SearchBar';
import { PersonCard } from '../components/people/PersonCard';
import { EmptyState } from '../components/common/EmptyState';
import { ErrorState } from '../components/common/ErrorState';
import { PersonCardSkeleton } from '../components/common/LoadingSkeleton';
import { SEO } from '../components/common/SEO';
import { Search as SearchIcon, Compass } from 'lucide-react';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { data, isLoading, isError, error, refetch } = useSearch(query);

  const handleSearchSubmit = (newQuery: string) => {
    setSearchParams({ q: newQuery });
  };

  return (
    <>
      <SEO
        title={query ? `Search results for: ${query} — Eternal Lives` : 'Search Archive — Eternal Lives'}
        description={`Search results and historical records for "${query}" in the Eternal Lives sanctuary archive.`}
      />

      <div className="min-h-screen bg-forest-950 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & Query input */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-gold-400 font-serif text-sm uppercase tracking-widest mb-3">
              <SearchIcon className="w-4 h-4 text-gold-500" />
              <span>Archival Search Engine</span>
            </div>

            {query ? (
              <h1 className="font-serif text-3xl sm:text-5xl text-ivory-100 font-normal mb-3">
                Search results for: <span className="text-gold-300 italic font-medium">"{query}"</span>
              </h1>
            ) : (
              <h1 className="font-serif text-3xl sm:text-5xl text-ivory-100 font-normal mb-3">
                Search Historical Archive
              </h1>
            )}

            <p className="text-stone-400 text-sm font-sans mb-8">
              Explore grave records, memorial coordinates, thinkers, authors, and resting sites.
            </p>

            <div className="max-w-2xl mx-auto">
              <SearchBar
                initialValue={query}
                onSearch={handleSearchSubmit}
                placeholder="Search by name, category, country, or cemetery..."
                size="lg"
                showExamples={true}
              />
            </div>
          </div>

          {/* Results Summary */}
          {query && !isLoading && !isError && (
            <div className="flex items-center justify-between text-xs text-stone-400 font-sans pb-4 mb-8 border-b border-forest-900/80">
              <div>
                Found <span className="text-gold-300 font-semibold">{data?.count || 0}</span> matching records in the historical archives
              </div>
              <Link to="/explore" className="text-gold-400 hover:text-gold-300 inline-flex items-center gap-1 font-serif">
                <Compass className="w-3.5 h-3.5" />
                Browse with full filters
              </Link>
            </div>
          )}

          {/* Result States */}
          {!query ? (
            <div className="text-center py-16">
              <EmptyState
                icon={<SearchIcon className="w-8 h-8 text-gold-400 opacity-80" />}
                title="Enter a Name or Cemetery"
                description="Begin typing in the search bar above to discover graves, memorial records, and historical quotes."
              />
            </div>
          ) : isError ? (
            <ErrorState
              title="Search query failed"
              message={error instanceof Error ? error.message : 'Unable to complete search request.'}
              onRetry={() => refetch()}
            />
          ) : isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <PersonCardSkeleton key={i} />
              ))}
            </div>
          ) : data?.results.length === 0 ? (
            <EmptyState
              title={`No records found for "${query}"`}
              description="We could not find any memorials matching your search term. Check the spelling or try searching by category or country."
              actionLabel="Explore All Lives"
              onAction={() => setSearchParams({})}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data?.results.map(person => (
                <PersonCard key={person.id} person={person} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
