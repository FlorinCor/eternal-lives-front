import { Category, Person, Quote, Grave, PhotoItem, PaginatedResponse } from '../types';

export function parseYear(dateStr?: string | null): number {
  if (!dateStr) return 0;
  const match = dateStr.match(/^(-?\d{1,4})/);
  return match ? parseInt(match[1], 10) : 0;
}

export function adaptCategory(raw: any): Category {
  return {
    id: String(raw.id || raw.slug),
    slug: raw.slug || '',
    name: raw.name || '',
    description: raw.description || '',
    graveCount: raw.graveCount ?? raw.count ?? 0,
    imageUrl: raw.imageUrl || raw.image || 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1000&q=80',
  };
}

export function adaptQuote(raw: any, personName?: string, personSlug?: string): Quote {
  return {
    id: String(raw.id || `q-${Math.random()}`),
    personId: String(raw.personId || ''),
    personName: raw.personFullName || raw.personName || personName || '',
    personSlug: raw.personSlug || personSlug,
    quote: raw.text || raw.quote || '',
    source: raw.source,
    context: raw.context,
    year: raw.year,
    isVerified: raw.verified ?? raw.isVerified ?? true,
    verificationNotes: raw.verificationNotes,
  };
}

export function adaptGrave(raw: any, personName?: string): Grave {
  return {
    id: String(raw.id || `g-${Math.random()}`),
    personId: String(raw.personId || ''),
    personName: raw.personFullName || raw.personName || personName || '',
    cemeteryName: raw.cemeteryName || raw.cemetery || 'Resting Place',
    address: raw.cemeteryAddress || raw.address || '',
    city: raw.city || '',
    state: raw.state,
    country: raw.country || '',
    latitude: typeof raw.latitude === 'number' ? raw.latitude : parseFloat(raw.latitude) || 48.8566,
    longitude: typeof raw.longitude === 'number' ? raw.longitude : parseFloat(raw.longitude) || 2.3522,
    imageUrl: raw.graveImageUrl || raw.imageUrl || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    additionalImages: raw.additionalImages,
    plotDescription: raw.description || raw.plotDescription,
    accessInformation: raw.accessInformation,
    monumentType: raw.monumentType,
  };
}

export function adaptPerson(raw: any): Person {
  const birthYear = raw.birthYear ?? parseYear(raw.birthDate);
  const deathYear = raw.deathYear ?? parseYear(raw.deathDate);
  const occupations = Array.isArray(raw.occupations)
    ? raw.occupations
    : raw.occupation
    ? [raw.occupation]
    : ['Historical Figure'];

  const category = Array.isArray(raw.categories) && raw.categories.length > 0
    ? raw.categories[0]
    : null;

  const categorySlug = raw.categorySlug || (category ? category.slug : 'scientists');
  const categoryName = raw.categoryName || (category ? category.name : 'Scientists');

  const fullName = raw.fullName || raw.name || `${raw.firstName || ''} ${raw.lastName || ''}`.trim() || 'Historical Figure';

  // Quotes
  let quotes: Quote[] = [];
  if (Array.isArray(raw.quotes)) {
    quotes = raw.quotes.map((q: any) => adaptQuote(q, fullName, raw.slug));
  }

  let featuredQuote: Quote = raw.featuredQuote
    ? adaptQuote(raw.featuredQuote, fullName, raw.slug)
    : quotes.length > 0
    ? quotes[0]
    : {
        id: `q-feat-${raw.id || raw.slug}`,
        personId: String(raw.id || ''),
        personName: fullName,
        personSlug: raw.slug,
        quote: raw.shortQuote || 'Every life leaves an enduring story.',
        isVerified: true,
      };

  // Graves
  let grave: Grave;
  if (raw.grave) {
    grave = adaptGrave(raw.grave, fullName);
  } else if (Array.isArray(raw.graves) && raw.graves.length > 0) {
    grave = adaptGrave(raw.graves[0], fullName);
  } else if (raw.graveSummary) {
    grave = {
      id: `g-${raw.id || raw.slug}`,
      personId: String(raw.id || ''),
      personName: fullName,
      cemeteryName: raw.graveSummary.cemeteryName || raw.cemetery || 'Resting Place',
      city: raw.graveSummary.city || raw.city || '',
      country: raw.graveSummary.country || raw.country || '',
      address: raw.graveSummary.cemeteryAddress || raw.address || '',
      latitude: raw.graveSummary.latitude || 48.8566,
      longitude: raw.graveSummary.longitude || 2.3522,
      imageUrl: raw.graveImage || raw.graveImageUrl || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    };
  } else {
    grave = {
      id: `g-${raw.id || raw.slug}`,
      personId: String(raw.id || ''),
      personName: fullName,
      cemeteryName: raw.cemetery || 'Historic Memorial',
      city: raw.city || '',
      country: raw.country || raw.nationality || '',
      address: '',
      latitude: 48.8566,
      longitude: 2.3522,
      imageUrl: raw.graveImage || raw.graveImageUrl || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    };
  }

  // Gallery from media
  const gallery: PhotoItem[] = Array.isArray(raw.media)
    ? raw.media.map((m: any) => ({
        id: String(m.id || ''),
        url: m.mediaUrl || m.url || '',
        caption: m.caption || fullName,
        credit: m.credit,
        category: (m.mediaType?.toLowerCase() || 'historical') as any,
      }))
    : Array.isArray(raw.gallery)
    ? raw.gallery
    : [];

  const fullBiography = Array.isArray(raw.fullBiography)
    ? raw.fullBiography
    : raw.biography
    ? raw.biography.split('\n\n').filter((p: string) => p.trim().length > 0)
    : [raw.shortBiography || 'Biographical chronicle recorded in the eternal archive.'];

  return {
    id: String(raw.id || raw.slug),
    slug: raw.slug || '',
    name: fullName,
    nativeName: raw.nativeName,
    birthYear,
    deathYear,
    birthDate: raw.birthDate ? String(raw.birthDate) : undefined,
    deathDate: raw.deathDate ? String(raw.deathDate) : undefined,
    birthPlace: raw.birthPlace,
    deathPlace: raw.deathPlace,
    categorySlug,
    categoryName,
    occupations,
    country: raw.nationality || raw.country || 'International',
    portraitUrl: raw.profileImageUrl || raw.portraitUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    heroImageUrl: raw.heroImageUrl || raw.graveImageUrl || raw.graveImage || 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=2000&q=85',
    graveImageUrl: raw.graveImageUrl || raw.graveImage || grave.imageUrl,
    shortBiography: raw.shortBiography || '',
    fullBiography,
    featuredQuote,
    grave,
    quotes,
    gallery,
    isFeatured: (raw.importanceScore && raw.importanceScore >= 90) || raw.isFeatured || false,
    historicalSignificance: raw.historicalSignificance,
    createdAt: raw.createdAt ? String(raw.createdAt) : undefined,
  };
}

export function adaptSpringPage<R>(
  response: any,
  itemAdapter: (item: any) => R,
  fallbackPage = 1,
  fallbackLimit = 12
): PaginatedResponse<R> {
  if (Array.isArray(response)) {
    const items = response.map(itemAdapter);
    return {
      items,
      total: items.length,
      page: fallbackPage,
      limit: fallbackLimit,
      totalPages: Math.ceil(items.length / fallbackLimit) || 1,
      hasNext: false,
      hasPrev: false,
    };
  }

  if (response && Array.isArray(response.content)) {
    const items = response.content.map(itemAdapter);
    const pageNumber = (response.number ?? 0) + 1;
    const pageSize = response.size ?? fallbackLimit;
    const totalElements = response.totalElements ?? items.length;
    const totalPages = response.totalPages ?? (Math.ceil(totalElements / pageSize) || 1);

    return {
      items,
      total: totalElements,
      page: pageNumber,
      limit: pageSize,
      totalPages,
      hasNext: !response.last && pageNumber < totalPages,
      hasPrev: !response.first && pageNumber > 1,
    };
  }

  if (response && Array.isArray(response.items)) {
    return {
      ...response,
      items: response.items.map(itemAdapter),
    };
  }

  return {
    items: [],
    total: 0,
    page: fallbackPage,
    limit: fallbackLimit,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  };
}
