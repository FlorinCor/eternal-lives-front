import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePerson } from '../hooks/usePerson';
import { PersonHero } from '../components/people/PersonHero';
import { BiographySection } from '../components/people/BiographySection';
import { QuotesSection } from '../components/quotes/QuotesSection';
import { GraveLocation } from '../components/graves/GraveLocation';
import { PhotoGallery } from '../components/people/PhotoGallery';
import { RelatedPeople } from '../components/people/RelatedPeople';
import { SEO } from '../components/common/SEO';
import { ErrorState } from '../components/common/ErrorState';
import { Skeleton } from '../components/common/LoadingSkeleton';
import { ArrowLeft, Feather } from 'lucide-react';
import { Button } from '../components/common/Button';

export const PersonPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: person, isLoading, isError, error, refetch } = usePerson(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-charcoal-950 pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <Skeleton className="h-96 w-full rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !person) {
    return (
      <div className="min-h-screen bg-charcoal-950 flex flex-col items-center justify-center p-6">
        <ErrorState
          title="Memorial Not Found"
          message={
            error instanceof Error
              ? error.message
              : `The historical record for "${slug}" could not be located in our sanctuary archives.`
          }
          onRetry={() => refetch()}
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
        title={`${person.name} — Eternal Lives`}
        description={`Explore the life, resting place, and famous quotes of ${person.name} (${person.birthYear} — ${person.deathYear}).`}
        image={person.graveImageUrl || person.portraitUrl}
        type="profile"
      />

      <article className="min-h-screen bg-forest-950">
        {/* Top Digital Memorial Hero */}
        <PersonHero person={person} />

        {/* Biography Section */}
        <BiographySection person={person} />

        {/* Famous Quotes Section */}
        <QuotesSection person={person} />

        {/* Final Resting Place & Interactive Map */}
        <GraveLocation person={person} />

        {/* Photo Gallery with Lightbox */}
        <PhotoGallery person={person} />

        {/* Related People in Same Category */}
        <RelatedPeople
          slug={person.slug}
          categoryName={person.categoryName}
          categorySlug={person.categorySlug}
        />

        {/* Contribution & Correction prompt bar */}
        <section className="py-12 bg-charcoal-950 border-t border-forest-900/80 text-center">
          <div className="max-w-xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-stone-400 font-sans">
            <span className="flex items-center gap-1.5">
              <Feather className="w-4 h-4 text-gold-500" />
              Know of an additional quote, photo, or correction for {person.name}?
            </span>
            <Link to="/contribute" className="text-gold-400 hover:text-gold-200 font-medium underline">
              Suggest Correction
            </Link>
          </div>
        </section>
      </article>
    </>
  );
};
