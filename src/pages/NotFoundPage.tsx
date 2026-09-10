import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Memorial Not Found — Eternal Lives"
        description="The requested historical record could not be located."
      />
      <div className="min-h-screen bg-forest-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-charcoal-900 border border-gold-600/40 flex items-center justify-center text-gold-400 mb-6 shadow-gold-glow">
          <span className="text-4xl font-serif">✝</span>
        </div>
        <h1 className="font-serif text-5xl sm:text-7xl text-ivory-100 font-normal mb-3">404</h1>
        <h2 className="font-serif text-2xl sm:text-3xl text-gold-300 font-light mb-4">
          Lost in the Annals of Time
        </h2>
        <p className="text-stone-400 text-sm max-w-md mb-8 font-sans leading-relaxed">
          The memorial page or archive entry you are seeking has either been relocated or has not yet been transcribed into our global registry.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/">
            <Button variant="gold" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Return Home
            </Button>
          </Link>
          <Link to="/explore">
            <Button variant="outline" size="md" leftIcon={<Compass className="w-4 h-4" />}>
              Explore Registry
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};
