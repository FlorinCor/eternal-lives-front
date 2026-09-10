import React from 'react';
import { SEO } from '../components/common/SEO';
import { IMAGES } from '../config/media';
import { Shield, BookOpen, HeartHandshake, Eye, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';

export const AboutPage: React.FC = () => {
  return (
    <>
      <SEO
        title="About The Memorial Archive — Eternal Lives"
        description="Learn about the philosophy, archival standards, and solemn mission behind the Eternal Lives digital historical sanctuary."
      />

      <div className="min-h-screen bg-forest-950 pt-28 pb-20">
        {/* About Hero */}
        <section className="relative py-20 bg-charcoal-950 border-b border-forest-900 overflow-hidden mb-16">
          <div className="absolute inset-0 z-0">
            <img
              src={IMAGES.hero.pantheon}
              alt="Neoclassical cemetery colonnade and historical arch"
              className="w-full h-full object-cover object-center brightness-[0.35]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/70 to-transparent" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-3xl text-gold-400 font-serif font-bold">✝</span>
            <h1 className="font-serif text-4xl sm:text-6xl text-ivory-100 font-normal mt-3 mb-4">
              Preserving Immortal Stories
            </h1>
            <p className="text-base sm:text-xl text-ivory-300 font-sans max-w-2xl mx-auto font-light leading-relaxed">
              Eternal Lives is an online sanctuary dedicated to exploring, revering, and preserving the graves, resting places, and words of historical figures.
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Philosophy Section */}
          <section className="space-y-6">
            <div className="inline-flex items-center gap-2 text-gold-400 font-serif text-sm uppercase tracking-widest">
              <Eye className="w-4 h-4 text-gold-500" />
              <span>Sanctuary Philosophy</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-ivory-100 font-normal">
              A Quiet Place of Historical Contemplation
            </h2>
            <div className="prose prose-invert max-w-none font-serif text-lg text-ivory-300/90 leading-relaxed space-y-4">
              <p>
                Human history is not merely an abstract sequence of dates and political treaties; it is an intimate tapestry of real individuals who walked the Earth, wrestled with profound ideas, created timeless art, and confronted mortality.
              </p>
              <p>
                Unlike generic biographical databases or social media platforms, Eternal Lives was designed as a digital memorial—a peaceful, respectful, and visually immersive archive where each resting place stands as an open window into a luminary's life journey.
              </p>
            </div>
          </section>

          {/* Pillars Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-charcoal-900/80 border border-forest-800/80 space-y-3 shadow-lg">
              <div className="w-10 h-10 rounded-full bg-forest-900 border border-gold-500/50 flex items-center justify-center text-gold-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-ivory-100 font-medium">Archival Fidelity</h3>
              <p className="text-xs text-stone-400 font-sans leading-relaxed">
                We verify burial coordinates, cemetery plot details, and quote attributions with rigorous cross-checks across primary sources and scholarly institutions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-charcoal-900/80 border border-forest-800/80 space-y-3 shadow-lg">
              <div className="w-10 h-10 rounded-full bg-forest-900 border border-gold-500/50 flex items-center justify-center text-gold-400">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-ivory-100 font-medium">Reverent Dignity</h3>
              <p className="text-xs text-stone-400 font-sans leading-relaxed">
                The architecture is deliberately devoid of modern algorithmic clutter, gamification, and clickbait, reflecting the timeless sanctity of historical memorial grounds.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-charcoal-900/80 border border-forest-800/80 space-y-3 shadow-lg">
              <div className="w-10 h-10 rounded-full bg-forest-900 border border-gold-500/50 flex items-center justify-center text-gold-400">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-ivory-100 font-medium">Global Custodianship</h3>
              <p className="text-xs text-stone-400 font-sans leading-relaxed">
                Historians, travelers, researchers, and admirers around the world contribute photographs, geolocations, and newly translated epitaphs.
              </p>
            </div>
          </section>

          {/* Invitation Callout */}
          <section className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-forest-900/90 to-charcoal-900/90 border border-gold-600/40 text-center space-y-4 shadow-elevated">
            <Sparkles className="w-6 h-6 text-gold-400 mx-auto" />
            <h3 className="font-serif text-2xl sm:text-3xl text-ivory-100 font-normal">
              Join Our Archival Mission
            </h3>
            <p className="text-stone-300 text-sm max-w-lg mx-auto font-sans leading-relaxed">
              Whether you are discovering where your favorite poet lies in peace or submitting the coordinates of a forgotten thinker's grave, your presence honors their memory.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <Link to="/explore">
                <Button variant="gold" size="md">
                  Explore Memorials
                </Button>
              </Link>
              <Link to="/contribute">
                <Button variant="outline" size="md">
                  Submit Contribution
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
