import React, { useState, useEffect } from 'react';
import { Person } from '../../types';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useCategories } from '../../hooks/useCategories';

interface PersonFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Person>) => Promise<void>;
  initialData?: Person | null;
}

export const PersonFormModal: React.FC<PersonFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const { data: categories = [] } = useCategories();
  const [name, setName] = useState('');
  const [nativeName, setNativeName] = useState('');
  const [birthYear, setBirthYear] = useState<number | ''>(1850);
  const [deathYear, setDeathYear] = useState<number | ''>(1920);
  const [categorySlug, setCategorySlug] = useState('scientists');
  const [occupations, setOccupations] = useState('');
  const [country, setCountry] = useState('');
  const [shortBiography, setShortBiography] = useState('');
  const [fullBiography, setFullBiography] = useState('');
  const [graveImageUrl, setGraveImageUrl] = useState('');
  const [portraitUrl, setPortraitUrl] = useState('');
  const [heroImageUrl, setHeroImageUrl] = useState('');
  const [cemeteryName, setCemeteryName] = useState('');
  const [cemeteryCity, setCemeteryCity] = useState('');
  const [cemeteryCountry, setCemeteryCountry] = useState('');
  const [cemeteryAddress, setCemeteryAddress] = useState('');
  const [latitude, setLatitude] = useState<number | ''>(48.8566);
  const [longitude, setLongitude] = useState<number | ''>(2.3522);
  const [featuredQuoteText, setFeaturedQuoteText] = useState('');
  const [quoteSource, setQuoteSource] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setNativeName(initialData.nativeName || '');
      setBirthYear(initialData.birthYear);
      setDeathYear(initialData.deathYear);
      setCategorySlug(initialData.categorySlug || 'scientists');
      setOccupations(initialData.occupations?.join(', ') || '');
      setCountry(initialData.country || '');
      setShortBiography(initialData.shortBiography || '');
      setFullBiography(initialData.fullBiography?.join('\n\n') || '');
      setGraveImageUrl(initialData.graveImageUrl || '');
      setPortraitUrl(initialData.portraitUrl || '');
      setHeroImageUrl(initialData.heroImageUrl || '');
      setCemeteryName(initialData.grave?.cemeteryName || '');
      setCemeteryCity(initialData.grave?.city || '');
      setCemeteryCountry(initialData.grave?.country || '');
      setCemeteryAddress(initialData.grave?.address || '');
      setLatitude(initialData.grave?.latitude || 48.8566);
      setLongitude(initialData.grave?.longitude || 2.3522);
      setFeaturedQuoteText(initialData.featuredQuote?.quote || '');
      setQuoteSource(initialData.featuredQuote?.source || '');
      setIsFeatured(initialData.isFeatured || false);
    } else {
      setName('');
      setNativeName('');
      setBirthYear(1850);
      setDeathYear(1920);
      setCategorySlug('scientists');
      setOccupations('');
      setCountry('');
      setShortBiography('');
      setFullBiography('');
      setGraveImageUrl('');
      setPortraitUrl('');
      setHeroImageUrl('');
      setCemeteryName('');
      setCemeteryCity('');
      setCemeteryCountry('');
      setCemeteryAddress('');
      setLatitude(48.8566);
      setLongitude(2.3522);
      setFeaturedQuoteText('');
      setQuoteSource('');
      setIsFeatured(false);
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    const selectedCategory = categories.find(c => c.slug === categorySlug);

    try {
      const payload: Partial<Person> = {
        name,
        nativeName: nativeName || undefined,
        birthYear: Number(birthYear),
        deathYear: Number(deathYear),
        categorySlug,
        categoryName: selectedCategory ? selectedCategory.name : 'Scientists',
        occupations: occupations
          .split(',')
          .map(o => o.trim())
          .filter(Boolean),
        country,
        shortBiography,
        fullBiography: fullBiography
          .split('\n\n')
          .map(p => p.trim())
          .filter(Boolean),
        graveImageUrl: graveImageUrl || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
        portraitUrl: portraitUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
        heroImageUrl: heroImageUrl || graveImageUrl || 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=2000&q=85',
        grave: {
          id: initialData?.grave?.id || `g-${Date.now()}`,
          personId: initialData?.id,
          personName: name,
          cemeteryName: cemeteryName || 'Historical Cemetery',
          city: cemeteryCity || 'City',
          country: cemeteryCountry || country || 'Country',
          address: cemeteryAddress || 'Memorial grounds',
          latitude: Number(latitude) || 48.8566,
          longitude: Number(longitude) || 2.3522,
          imageUrl: graveImageUrl || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
        },
        featuredQuote: {
          id: initialData?.featuredQuote?.id || `q-${Date.now()}`,
          personId: initialData?.id || '1',
          personName: name,
          quote: featuredQuoteText || 'Every life leaves a story.',
          source: quoteSource || 'Historical records',
          isVerified: true,
        },
        isFeatured,
      };

      await onSubmit(payload);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? `Edit Memorial: ${initialData.name}` : 'Catalog New Historical Luminary'}
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-sans">
              Full Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full bg-forest-950/90 border border-forest-800 rounded-lg px-3 py-2 text-sm text-ivory-100 focus:outline-none focus:border-gold-500/80"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-sans">
              Native / Alternate Name
            </label>
            <input
              type="text"
              value={nativeName}
              onChange={e => setNativeName(e.target.value)}
              className="w-full bg-forest-950/90 border border-forest-800 rounded-lg px-3 py-2 text-sm text-ivory-100 focus:outline-none focus:border-gold-500/80"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-sans">
              Birth Year *
            </label>
            <input
              type="number"
              value={birthYear}
              onChange={e => setBirthYear(e.target.value ? Number(e.target.value) : '')}
              required
              className="w-full bg-forest-950/90 border border-forest-800 rounded-lg px-3 py-2 text-sm text-ivory-100 focus:outline-none focus:border-gold-500/80"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-sans">
              Death Year *
            </label>
            <input
              type="number"
              value={deathYear}
              onChange={e => setDeathYear(e.target.value ? Number(e.target.value) : '')}
              required
              className="w-full bg-forest-950/90 border border-forest-800 rounded-lg px-3 py-2 text-sm text-ivory-100 focus:outline-none focus:border-gold-500/80"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-sans">
              Category
            </label>
            <select
              value={categorySlug}
              onChange={e => setCategorySlug(e.target.value)}
              className="w-full bg-forest-950/90 border border-forest-800 rounded-lg px-3 py-2 text-sm text-ivory-100 focus:outline-none focus:border-gold-500/80"
            >
              {categories.map(c => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-sans">
              Country
            </label>
            <input
              type="text"
              value={country}
              onChange={e => setCountry(e.target.value)}
              placeholder="e.g. United Kingdom"
              className="w-full bg-forest-950/90 border border-forest-800 rounded-lg px-3 py-2 text-sm text-ivory-100 focus:outline-none focus:border-gold-500/80"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-sans">
            Occupations / Titles (comma-separated)
          </label>
          <input
            type="text"
            value={occupations}
            onChange={e => setOccupations(e.target.value)}
            placeholder="e.g. Theoretical Physicist, Nobel Laureate"
            className="w-full bg-forest-950/90 border border-forest-800 rounded-lg px-3 py-2 text-sm text-ivory-100 focus:outline-none focus:border-gold-500/80"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-sans">
            Short Summary / Biography
          </label>
          <textarea
            value={shortBiography}
            onChange={e => setShortBiography(e.target.value)}
            rows={3}
            className="w-full bg-forest-950/90 border border-forest-800 rounded-lg p-3 text-sm text-ivory-100 focus:outline-none focus:border-gold-500/80 font-sans"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-sans">
            Full Biography (separate paragraphs with blank lines)
          </label>
          <textarea
            value={fullBiography}
            onChange={e => setFullBiography(e.target.value)}
            rows={5}
            className="w-full bg-forest-950/90 border border-forest-800 rounded-lg p-3 text-sm text-ivory-100 focus:outline-none focus:border-gold-500/80 font-serif leading-relaxed"
          />
        </div>

        {/* Cemetery details subsection */}
        <div className="p-4 rounded-xl bg-forest-950/60 border border-forest-900 space-y-4">
          <h4 className="font-serif text-base text-gold-300 font-medium">
            Resting Place & Cemetery Coordinates
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">
                Cemetery Name
              </label>
              <input
                type="text"
                value={cemeteryName}
                onChange={e => setCemeteryName(e.target.value)}
                placeholder="e.g. Westminster Abbey"
                className="w-full bg-charcoal-900 border border-forest-800 rounded-lg px-3 py-2 text-sm text-ivory-100 focus:outline-none focus:border-gold-500/80"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">
                City
              </label>
              <input
                type="text"
                value={cemeteryCity}
                onChange={e => setCemeteryCity(e.target.value)}
                placeholder="e.g. London"
                className="w-full bg-charcoal-900 border border-forest-800 rounded-lg px-3 py-2 text-sm text-ivory-100 focus:outline-none focus:border-gold-500/80"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">
                Latitude
              </label>
              <input
                type="number"
                step="any"
                value={latitude}
                onChange={e => setLatitude(e.target.value ? Number(e.target.value) : '')}
                className="w-full bg-charcoal-900 border border-forest-800 rounded-lg px-3 py-2 text-sm text-ivory-100 focus:outline-none focus:border-gold-500/80"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">
                Longitude
              </label>
              <input
                type="number"
                step="any"
                value={longitude}
                onChange={e => setLongitude(e.target.value ? Number(e.target.value) : '')}
                className="w-full bg-charcoal-900 border border-forest-800 rounded-lg px-3 py-2 text-sm text-ivory-100 focus:outline-none focus:border-gold-500/80"
              />
            </div>
          </div>
        </div>

        {/* Featured Quote subsection */}
        <div className="p-4 rounded-xl bg-forest-950/60 border border-forest-900 space-y-3">
          <h4 className="font-serif text-base text-gold-300 font-medium">Signature Quote</h4>
          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">
              Quote Text
            </label>
            <input
              type="text"
              value={featuredQuoteText}
              onChange={e => setFeaturedQuoteText(e.target.value)}
              placeholder="e.g. Imagination is more important than knowledge."
              className="w-full bg-charcoal-900 border border-forest-800 rounded-lg px-3 py-2 text-sm text-ivory-100 focus:outline-none focus:border-gold-500/80"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">
              Source / Citation
            </label>
            <input
              type="text"
              value={quoteSource}
              onChange={e => setQuoteSource(e.target.value)}
              placeholder="e.g. Cosmic Religion (1931)"
              className="w-full bg-charcoal-900 border border-forest-800 rounded-lg px-3 py-2 text-sm text-ivory-100 focus:outline-none focus:border-gold-500/80"
            />
          </div>
        </div>

        {/* Featured Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isFeatured"
            checked={isFeatured}
            onChange={e => setIsFeatured(e.target.checked)}
            className="w-4 h-4 rounded border-forest-700 bg-forest-950 text-gold-500 focus:ring-gold-500"
          />
          <label htmlFor="isFeatured" className="text-sm text-ivory-200 font-sans cursor-pointer">
            Mark as Featured Memorial on Homepage
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-forest-800/80">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="gold" isLoading={isSubmitting}>
            {initialData ? 'Save Changes' : 'Publish Memorial'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
