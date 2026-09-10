import React from 'react';
import { Person } from '../../types';
import { MapPin, Navigation, Info, Compass } from 'lucide-react';
import { Map } from '../common/Map';

interface GraveLocationProps {
  person: Person;
}

export const GraveLocation: React.FC<GraveLocationProps> = ({ person }) => {
  const { grave } = person;
  const sectionTitle =
    person.name === 'Marie Curie'
      ? 'Her Final Resting Place'
      : `${person.name.split(' ')[0]}'s Final Resting Place`;

  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${grave.latitude},${grave.longitude}`;

  return (
    <section className="py-16 sm:py-24 border-b border-forest-900/80 bg-charcoal-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-gold-400 font-serif text-sm uppercase tracking-widest mb-3">
            <MapPin className="w-4 h-4 text-gold-500" />
            <span>Sacred Grounds</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-ivory-100 font-normal">
            {sectionTitle}
          </h2>
          <p className="text-stone-400 text-sm mt-2 font-sans">
            Coordinates and pilgrimage guide to {person.name}'s memorial monument.
          </p>
          <div className="w-16 h-0.5 bg-gold-600/50 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Grave Details Card */}
          <div className="lg:col-span-5 bg-charcoal-900/90 border border-forest-800/80 rounded-2xl p-6 sm:p-8 shadow-elevated space-y-6">
            <div>
              <span className="text-xs font-sans uppercase tracking-widest text-gold-400 font-semibold">
                Sanctuary & Cemetery
              </span>
              <h3 className="font-serif text-2xl text-ivory-100 mt-1 font-medium">
                {grave.cemeteryName}
              </h3>
              <p className="text-sm text-stone-300 font-sans mt-1">
                {grave.city}
                {grave.state ? `, ${grave.state}` : ''}, {grave.country}
              </p>
            </div>

            {grave.address && (
              <div className="p-4 rounded-xl bg-forest-950/80 border border-forest-900 text-xs text-ivory-300 font-sans">
                <span className="text-stone-400 block mb-1 uppercase tracking-wider font-semibold text-[10px]">
                  Physical Address
                </span>
                {grave.address}
              </div>
            )}

            {/* Coordinates Badge & Navigation Button */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-mono text-gold-300/90 bg-charcoal-950 px-3 py-1.5 rounded-lg border border-forest-800/80">
                <Compass className="w-3.5 h-3.5 text-gold-400" />
                <span>
                  {grave.latitude.toFixed(4)}° N, {grave.longitude.toFixed(4)}° E
                </span>
              </div>

              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-gold-300 hover:text-gold-100 bg-forest-900/80 hover:bg-forest-800 border border-gold-600/40 px-3.5 py-1.5 rounded-lg transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                Get Directions
              </a>
            </div>

            {/* Monument Details */}
            {grave.monumentType && (
              <div className="text-xs text-stone-300 font-sans pt-3 border-t border-forest-900/80">
                <span className="text-stone-400 block mb-0.5 uppercase tracking-wider text-[10px]">
                  Monument Style
                </span>
                {grave.monumentType}
              </div>
            )}

            {grave.plotDescription && (
              <div className="text-xs text-stone-300 font-sans">
                <span className="text-stone-400 block mb-0.5 uppercase tracking-wider text-[10px]">
                  Plot Location
                </span>
                {grave.plotDescription}
              </div>
            )}

            {grave.accessInformation && (
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-forest-950/60 border border-forest-900 text-xs text-ivory-300 font-sans">
                <Info className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">{grave.accessInformation}</p>
              </div>
            )}
          </div>

          {/* Interactive Map & Grave Photo Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Interactive Leaflet Map */}
            <Map
              latitude={grave.latitude}
              longitude={grave.longitude}
              name={person.name}
              locationName={grave.cemeteryName}
              address={grave.address}
              className="h-80 sm:h-96 w-full rounded-2xl shadow-elevated border border-forest-800/90"
            />

            {/* Grave Close-up Photograph */}
            {grave.imageUrl && (
              <div className="relative rounded-2xl overflow-hidden border border-forest-800/80 bg-charcoal-900 h-64 shadow-lg group">
                <img
                  src={grave.imageUrl}
                  alt={`Grave and monument of ${person.name}`}
                  className="w-full h-full object-cover object-center brightness-90 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-xs text-ivory-200 font-serif">
                  <p className="text-sm text-ivory-100 font-medium">Memorial Monument Photograph</p>
                  <p className="text-stone-400 text-xs font-sans">
                    {grave.cemeteryName} • {grave.city}, {grave.country}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
