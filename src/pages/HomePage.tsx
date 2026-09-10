import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCategories } from '../hooks/useCategories';
import { useFeaturedPeople, useRecentPeople } from '../hooks/usePeople';
import { SearchBar } from '../components/common/SearchBar';
import { CategoryCard } from '../components/categories/CategoryCard';
import { PersonCard } from '../components/people/PersonCard';
import { PersonCardSkeleton, CategoryCardSkeleton } from '../components/common/LoadingSkeleton';
import { SEO } from '../components/common/SEO';
import { IMAGES } from '../config/media';
import { Sparkles, Compass, Clock, ArrowRight } from 'lucide-react';
import { Button } from '../components/common/Button';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { data: categories = [], isLoading: loadingCategories } = useCategories();
  const { data: featuredPeople = [], isLoading: loadingFeatured } = useFeaturedPeople();
  const { data: recentPeople = [], isLoading: loadingRecent } = useRecentPeople();

  const handleCategoryPillClick = (slug: string) => {
    navigate(`/category/${slug}`);
  };

  return (
    <>
      <SEO
        title="Eternal Lives — Historical Memorial & Resting Places Sanctuary"
        description="Visit the resting places of remarkable historical figures, discover their biographies, and find inspiration in their timeless words."
      />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-charcoal-950 pt-24 pb-16">
        {/* Full-width Cinematic Cemetery Photograph */}
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.hero.cemeteryMist}
            alt="Atmospheric historical cemetery grounds in morning mist"
            className="w-full h-full object-cover object-center brightness-[0.4] contrast-105 scale-100 transition-transform duration-1000"
          />
          {/* Dark Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/60 to-forest-950/40" />
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-forest-950/50 to-forest-950/95" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          {/* Subtle Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-900/80 border border-gold-600/40 text-gold-300 text-xs font-sans uppercase tracking-widest mb-6 backdrop-blur-sm shadow-gold-glow">
            <span>✝</span>
            <span>The Global Historical Memorial Archive</span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-ivory-100 tracking-tight leading-tight sm:leading-none mb-6">
            Every life leaves a story
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-base sm:text-xl text-ivory-300/90 max-w-2xl font-light mb-10 leading-relaxed">
            Visit the resting places of remarkable people, discover their stories, and be inspired by their words.
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-2xl mb-8">
            <SearchBar
              size="lg"
              placeholder="Search for a person, philosopher, author, or graveyard..."
              showExamples={false}
            />
          </div>

          {/* Clickable Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-2xl">
            {categories.slice(0, 7).map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategoryPillClick(cat.slug)}
                className="px-3.5 py-1.5 rounded-full text-xs font-sans font-medium text-ivory-200 bg-forest-900/60 hover:bg-forest-800 border border-forest-700/80 hover:border-gold-500/60 hover:text-gold-200 transition-all duration-200 shadow-sm"
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Explore by Category Section */}
      <section className="py-20 sm:py-28 bg-forest-950 border-b border-forest-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-gold-400 font-serif text-sm uppercase tracking-widest mb-2">
              <Compass className="w-4 h-4 text-gold-500" />
              <span>Historical Collections</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-ivory-100 font-normal">
              Explore by Category
            </h2>
            <p className="text-stone-400 text-sm sm:text-base font-sans mt-3">
              Discover extraordinary lives from all walks of life.
            </p>
            <div className="w-16 h-0.5 bg-gold-600/50 mx-auto mt-4" />
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadingCategories ? (
              <>
                <CategoryCardSkeleton />
                <CategoryCardSkeleton />
                <CategoryCardSkeleton />
                <CategoryCardSkeleton />
                <CategoryCardSkeleton />
                <CategoryCardSkeleton />
              </>
            ) : (
              categories.map(category => (
                <CategoryCard key={category.id} category={category} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Graves Section */}
      <section className="py-20 sm:py-28 bg-charcoal-950 border-b border-forest-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-gold-400 font-serif text-sm uppercase tracking-widest mb-2">
                <Sparkles className="w-4 h-4 text-gold-500" />
                <span>Sanctuary Highlights</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-ivory-100 font-normal">
                Featured Graves
              </h2>
              <p className="text-stone-400 text-sm sm:text-base font-sans mt-2">
                Visit some of the most inspiring people in history.
              </p>
            </div>

            <Link to="/explore">
              <Button
                variant="outline"
                size="md"
                className="font-serif text-gold-300 border-gold-600/40 hover:border-gold-500"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                View Full Archive
              </Button>
            </Link>
          </div>

          {/* Featured Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loadingFeatured ? (
              <>
                <PersonCardSkeleton />
                <PersonCardSkeleton />
                <PersonCardSkeleton />
                <PersonCardSkeleton />
                <PersonCardSkeleton />
                <PersonCardSkeleton />
              </>
            ) : (
              featuredPeople.map(person => (
                <PersonCard key={person.id} person={person} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Recently Added Section */}
      <section className="py-20 sm:py-28 bg-forest-950/60 border-b border-forest-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-gold-400 font-serif text-sm uppercase tracking-widest mb-2">
                <Clock className="w-4 h-4 text-gold-500" />
                <span>Recent Additions</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-ivory-100 font-normal">
                Recently Added Memorials
              </h2>
              <p className="text-stone-400 text-sm font-sans mt-2">
                Newly catalogued resting places and historical biographies.
              </p>
            </div>

            <Link
              to="/contribute"
              className="text-xs font-serif tracking-widest text-gold-400 hover:text-gold-200 uppercase inline-flex items-center gap-1 font-semibold"
            >
              Suggest a Missing Memorial →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loadingRecent ? (
              <>
                <PersonCardSkeleton />
                <PersonCardSkeleton />
                <PersonCardSkeleton />
                <PersonCardSkeleton />
              </>
            ) : (
              recentPeople.map(person => (
                <PersonCard key={person.id} person={person} showQuote={false} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Solemn Invitation Banner */}
      <section className="py-20 bg-gradient-to-b from-charcoal-950 to-forest-950 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-3xl text-gold-400 font-serif font-bold">✝</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-ivory-100 font-normal mt-3 mb-4">
            Preserve A Historical Legacy
          </h2>
          <p className="text-ivory-300 text-sm sm:text-base font-sans leading-relaxed mb-8">
            Help our global archival community document the resting places of thinkers, creators, and leaders who enriched human civilization.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/contribute">
              <Button variant="gold" size="lg" className="font-serif tracking-wider">
                Contribute to Archive
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="font-serif">
                Learn About Our Mission
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
