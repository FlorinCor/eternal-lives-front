import React from 'react';
import { useRelatedPeople } from '../../hooks/usePeople';
import { PersonCard } from './PersonCard';
import { PersonCardSkeleton } from '../common/LoadingSkeleton';
import { Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RelatedPeopleProps {
  slug: string;
  categoryName: string;
  categorySlug: string;
}

export const RelatedPeople: React.FC<RelatedPeopleProps> = ({
  slug,
  categoryName,
  categorySlug,
}) => {
  const { data: related, isLoading } = useRelatedPeople(slug, 3);

  if (!isLoading && (!related || related.length === 0)) return null;

  return (
    <section className="py-16 sm:py-24 bg-forest-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-gold-400 font-serif text-sm uppercase tracking-widest mb-2">
              <Users className="w-4 h-4 text-gold-500" />
              <span>Related Luminaries</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-ivory-100 font-normal">
              Other Notable {categoryName}
            </h2>
          </div>

          <Link
            to={`/category/${categorySlug}`}
            className="text-sm font-serif tracking-wide text-gold-400 hover:text-gold-200 inline-flex items-center gap-1 group font-medium"
          >
            Explore all {categoryName}
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <>
              <PersonCardSkeleton />
              <PersonCardSkeleton />
              <PersonCardSkeleton />
            </>
          ) : (
            related?.map(person => (
              <PersonCard key={person.id} person={person} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};
