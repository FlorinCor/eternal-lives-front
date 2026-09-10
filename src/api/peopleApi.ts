import { Person, PaginatedResponse, SearchFilters } from '../types';
import { apiRequest } from './apiClient';
import { storage } from '../lib/storage';
import { adaptPerson, adaptSpringPage } from './adapters';

const isUUID = (str: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

export const peopleApi = {
  async getAll(filters: SearchFilters = {}): Promise<PaginatedResponse<Person>> {
    const page = filters.page || 1;
    const limit = filters.limit || 12;

    // Map frontend sort to backend Spring Data sort parameter
    let sortParam: string | undefined;
    if (filters.sortBy === 'alphabetical') {
      sortParam = 'fullName,asc';
    } else if (filters.sortBy === 'birth_asc') {
      sortParam = 'birthDate,asc';
    } else if (filters.sortBy === 'death_desc') {
      sortParam = 'deathDate,desc';
    } else if (filters.sortBy === 'recent') {
      sortParam = 'createdAt,desc';
    } else if (filters.sortBy === 'importance') {
      sortParam = 'importanceScore,desc';
    }

    try {
      const response = await apiRequest<any>('/people', {
        params: {
          search: filters.query,
          category: filters.category && filters.category !== 'all' ? filters.category : undefined,
          country: filters.country,
          sort: sortParam,
          page: page - 1, // Spring Data 0-indexed
          size: limit,
        },
      });

      const adapted = adaptSpringPage<Person>(response, adaptPerson, page, limit);

      // In case client-side year or cemetery filters are applied on top
      let items = adapted.items;
      if (filters.birthYearMin !== undefined) {
        items = items.filter(p => p.birthYear >= filters.birthYearMin!);
      }
      if (filters.birthYearMax !== undefined) {
        items = items.filter(p => p.birthYear <= filters.birthYearMax!);
      }
      if (filters.deathYearMin !== undefined) {
        items = items.filter(p => p.deathYear >= filters.deathYearMin!);
      }
      if (filters.deathYearMax !== undefined) {
        items = items.filter(p => p.deathYear <= filters.deathYearMax!);
      }
      if (filters.cemetery) {
        const cem = filters.cemetery.toLowerCase();
        items = items.filter(p => p.grave.cemeteryName.toLowerCase().includes(cem));
      }

      return {
        ...adapted,
        items,
      };
    } catch {
      // Fallback to local store with filtering
      let items = storage.getStoredPeople();

      if (filters.query) {
        const q = filters.query.toLowerCase().trim();
        items = items.filter(
          p =>
            p.name.toLowerCase().includes(q) ||
            p.occupations.some(occ => occ.toLowerCase().includes(q)) ||
            p.country.toLowerCase().includes(q) ||
            p.shortBiography.toLowerCase().includes(q) ||
            p.grave.cemeteryName.toLowerCase().includes(q) ||
            p.grave.city.toLowerCase().includes(q)
        );
      }

      if (filters.category && filters.category !== 'all') {
        const catSlug = filters.category.toLowerCase();
        items = items.filter(
          p => p.categorySlug.toLowerCase() === catSlug || p.categoryName.toLowerCase() === catSlug
        );
      }

      if (filters.country) {
        items = items.filter(p => p.country.toLowerCase().includes(filters.country!.toLowerCase()));
      }

      if (filters.cemetery) {
        items = items.filter(p =>
          p.grave.cemeteryName.toLowerCase().includes(filters.cemetery!.toLowerCase())
        );
      }

      if (filters.birthYearMin !== undefined) {
        items = items.filter(p => p.birthYear >= filters.birthYearMin!);
      }
      if (filters.birthYearMax !== undefined) {
        items = items.filter(p => p.birthYear <= filters.birthYearMax!);
      }
      if (filters.deathYearMin !== undefined) {
        items = items.filter(p => p.deathYear >= filters.deathYearMin!);
      }
      if (filters.deathYearMax !== undefined) {
        items = items.filter(p => p.deathYear <= filters.deathYearMax!);
      }

      // Sorting
      if (filters.sortBy === 'alphabetical') {
        items.sort((a, b) => a.name.localeCompare(b.name));
      } else if (filters.sortBy === 'birth_asc') {
        items.sort((a, b) => a.birthYear - b.birthYear);
      } else if (filters.sortBy === 'death_desc') {
        items.sort((a, b) => b.deathYear - a.deathYear);
      } else if (filters.sortBy === 'recent') {
        items.sort((a, b) => Number(b.id) - Number(a.id));
      } else {
        items.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
      }

      const total = items.length;
      const totalPages = Math.ceil(total / limit) || 1;
      const startIndex = (page - 1) * limit;
      const paginatedItems = items.slice(startIndex, startIndex + limit);

      return {
        items: paginatedItems,
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      };
    }
  },

  async getBySlug(slug: string): Promise<Person> {
    try {
      const endpoint = isUUID(slug) ? `/people/${slug}` : `/people/slug/${slug}`;
      const raw = await apiRequest<any>(endpoint);
      return adaptPerson(raw);
    } catch {
      const people = storage.getStoredPeople();
      const person = people.find(
        p => p.slug.toLowerCase() === slug.toLowerCase() || String(p.id) === slug
      );
      if (!person) {
        throw new Error(`Person not found with slug or id: ${slug}`);
      }
      return person;
    }
  },

  async getFeatured(): Promise<Person[]> {
    try {
      const list = await apiRequest<any[]>('/featured', { params: { limit: 6 } });
      if (Array.isArray(list) && list.length > 0) {
        return list.map(adaptPerson);
      }
      return (await this.getAll({ limit: 6, sortBy: 'importance' })).items;
    } catch {
      const people = storage.getStoredPeople();
      return people.filter(p => p.isFeatured).slice(0, 6);
    }
  },

  async getRecentlyAdded(): Promise<Person[]> {
    try {
      const page = await apiRequest<any>('/people', {
        params: { page: 0, size: 4, sort: 'createdAt,desc' },
      });
      const adapted = adaptSpringPage<Person>(page, adaptPerson, 1, 4);
      if (adapted.items.length > 0) {
        return adapted.items;
      }
      throw new Error('No recent items');
    } catch {
      const people = storage.getStoredPeople();
      return [...people].reverse().slice(0, 4);
    }
  },

  async getRelated(slug: string, limit = 4): Promise<Person[]> {
    try {
      const current = await this.getBySlug(slug);
      if (current.categorySlug) {
        const page = await apiRequest<any>(`/categories/${current.categorySlug}/people`, {
          params: { page: 0, size: limit + 1 },
        });
        const adapted = adaptSpringPage<Person>(page, adaptPerson, 1, limit + 1);
        const filtered = adapted.items.filter(p => p.slug !== slug && p.id !== current.id);
        if (filtered.length > 0) {
          return filtered.slice(0, limit);
        }
      }
      throw new Error('No related found via category');
    } catch {
      const people = storage.getStoredPeople();
      const current = people.find(p => p.slug === slug || String(p.id) === slug);
      if (!current) return people.slice(0, limit);
      return people
        .filter(p => p.id !== current.id && p.categorySlug === current.categorySlug)
        .slice(0, limit);
    }
  },

  async create(personData: Partial<Person>): Promise<Person> {
    try {
      const raw = await apiRequest<any>('/people', {
        method: 'POST',
        body: JSON.stringify(personData),
      });
      return adaptPerson(raw);
    } catch {
      const people = storage.getStoredPeople();
      const newPerson: Person = {
        id: String(Date.now()),
        slug:
          personData.slug ||
          (personData.name || 'person')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, ''),
        name: personData.name || 'Historical Figure',
        birthYear: personData.birthYear || 1900,
        deathYear: personData.deathYear || 1980,
        categorySlug: personData.categorySlug || 'scientists',
        categoryName: personData.categoryName || 'Scientists',
        occupations: personData.occupations || ['Historical Figure'],
        country: personData.country || 'International',
        portraitUrl: personData.portraitUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
        heroImageUrl: personData.heroImageUrl || 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=2000&q=85',
        graveImageUrl: personData.graveImageUrl || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
        shortBiography: personData.shortBiography || '',
        fullBiography: personData.fullBiography || [personData.shortBiography || ''],
        featuredQuote: personData.featuredQuote || {
          id: `q-${Date.now()}`,
          personId: String(Date.now()),
          personName: personData.name || '',
          quote: 'Every life leaves an enduring story.',
          isVerified: true,
        },
        grave: personData.grave || {
          id: `g-${Date.now()}`,
          personId: String(Date.now()),
          personName: personData.name || '',
          cemeteryName: 'Historic Memorial',
          city: 'City',
          country: personData.country || 'Country',
          address: 'Memorial Ave',
          latitude: 48.8566,
          longitude: 2.3522,
          imageUrl: personData.graveImageUrl || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
        },
        quotes: personData.quotes || [],
        gallery: personData.gallery || [],
        isFeatured: personData.isFeatured || false,
        ...personData,
      };

      const updated = [newPerson, ...people];
      storage.savePeople(updated);
      return newPerson;
    }
  },

  async update(id: string, personData: Partial<Person>): Promise<Person> {
    try {
      return await apiRequest<Person>(`/people/${id}`, {
        method: 'PUT',
        body: JSON.stringify(personData),
      });
    } catch {
      const people = storage.getStoredPeople();
      const index = people.findIndex(p => p.id === id || p.slug === id);
      if (index === -1) throw new Error('Person not found');
      const updatedPerson = { ...people[index], ...personData };
      people[index] = updatedPerson;
      storage.savePeople(people);
      return updatedPerson;
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await apiRequest<void>(`/people/${id}`, {
        method: 'DELETE',
      });
    } catch {
      const people = storage.getStoredPeople();
      const filtered = people.filter(p => p.id !== id && p.slug !== id);
      storage.savePeople(filtered);
    }
  },
};
