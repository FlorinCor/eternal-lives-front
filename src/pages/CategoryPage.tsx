import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCategory } from '../hooks/useCategories';
import { usePeople } from '../hooks/usePeople';
import { CategoryHero } from '../components/categories/CategoryHero';
import { PersonCard } from '../components/people/PersonCard';
import { PersonCardSkeleton } from '../components/common/LoadingSkeleton';
import { EmptyState } from '../components/common/EmptyState';
import { ErrorState } from '../components/common/ErrorState';
import { Pagination } from '../components/common/Pagination';
import { SearchBar } from '../components/common/SearchBar';
import { SEO } from '../components/common/SEO';
import { ArrowLeft, ArrowUpDown } from 'lucide-react';
import { Button } from '../components/common/Button';

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<'importance' | 'alphabetical' | 'birth_asc' | 'death_desc'>('importance');
  const [query, setQuery] = useState('');

  const { data: category, isLoading: loadingCat, isError: catError, error: catErrObj } = useCategory(slug);
  const {
    data: peopleData,
    isLoading: loadingPeople,
    isError: peopleError,
    error: peopleErrObj,
    refetch,
  } = usePeople({
    category: slug,
    query: query || undefined,
    sortBy,
    page,
    limit: 9,
  });

  if (loadingCat) {
    return (
      <div className="min-h-screen bg-forest-950 pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="h-64 bg-charcoal-900 animate-pulse rounded-2xl" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PersonCardSkeleton />
            <PersonCardSkeleton />
            <PersonCardSkeleton />
          </div>
        </div>
      </div>
    );
  }

  if (catError || !category) {
    return (
      <div className="min-h-screen bg-charcoal-950 flex flex-col items-center justify-center p-6">
        <ErrorState
          title="Category Not Found"
          message={catErrObj instanceof Error ? catErrObj.message : `Category "${slug}" does not exist.`}
        />
        <Link to="/explore" className="mt-4">
          <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Explore Archive
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${category.name} — Eternal Lives Memorial Archive`}
        description={category.description}
        image={category.imageUrl}
      />

      <div className="min-h-screen bg-forest-950 pb-20">
        {/* Category Hero */}
        <CategoryHero category={category} totalPeople={peopleData?.total || 0} />

        {/* Filter and Search Toolbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="bg-charcoal-900/90 border border-forest-800/80 rounded-xl p-4 mb-10 shadow-elevated flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-96">
              <SearchBar
                initialValue={query}
                onSearch={q => {
                  setQuery(q);
                  setPage(1);
                }}
                placeholder={`Search among ${category.name.toLowerCase()}...`}
                size="md"
              />
            </div>

            {/* Sort options */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <span className="text-xs text-stone-400 font-sans flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5 text-gold-400" />
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={e => {
                  setSortBy(e.target.value as any);
                  setPage(1);
                }}
                className="bg-forest-950/90 border border-forest-800 rounded-lg px-3 py-1.5 text-xs text-ivory-100 focus:outline-none focus:border-gold-500/80"
              >
                <option value="importance">Most Important</option>
                <option value="alphabetical">Alphabetical (A-Z)</option>
                <option value="birth_asc">Birth Year (Earliest)</option>
                <option value="death_desc">Death Year (Latest)</option>
              </select>
            </div>
          </div>

          {/* People Grid */}
          {peopleError ? (
            <ErrorState
              title="Unable to load category figures"
              message={peopleErrObj instanceof Error ? peopleErrObj.message : 'Error fetching records.'}
              onRetry={() => refetch()}
            />
          ) : loadingPeople ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <PersonCardSkeleton key={i} />
              ))}
            </div>
          ) : !peopleData?.items.length ? (
            <EmptyState
              title={`No ${category.name.toLowerCase()} match your query`}
              description="Try clearing your search term to see all figures in this collection."
              actionLabel="Show all in this category"
              onAction={() => {
                setQuery('');
                setPage(1);
              }}
            />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {peopleData.items.map(person => (
                  <PersonCard key={person.id} person={person} />
                ))}
              </div>

              {peopleData.totalPages > 1 && (
                <Pagination
                  currentPage={page}
                  totalPages={peopleData.totalPages}
                  onPageChange={p => {
                    setPage(p);
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
