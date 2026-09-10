import { Category } from '../types';
import { apiRequest } from './apiClient';
import { SEED_CATEGORIES } from '../config/seedData';
import { storage } from '../lib/storage';
import { adaptCategory } from './adapters';

export const categoriesApi = {
  async getAll(): Promise<Category[]> {
    try {
      const list = await apiRequest<any[]>('/categories');
      if (Array.isArray(list) && list.length > 0) {
        return list.map(raw => {
          const cat = adaptCategory(raw);
          const seedMatch = SEED_CATEGORIES.find(s => s.slug === cat.slug);
          return {
            ...cat,
            graveCount: cat.graveCount || seedMatch?.graveCount || 42,
          };
        });
      }
      throw new Error('Empty category response');
    } catch {
      // Recalculate grave counts dynamically from stored people if needed
      const people = storage.getStoredPeople();
      return SEED_CATEGORIES.map(cat => {
        const matchingPeopleCount = people.filter(p => p.categorySlug === cat.slug).length;
        return {
          ...cat,
          graveCount: cat.graveCount + Math.max(0, matchingPeopleCount - 1),
        };
      });
    }
  },

  async getBySlug(slug: string): Promise<Category> {
    try {
      const raw = await apiRequest<any>(`/categories/${slug}`);
      const cat = adaptCategory(raw);
      const seedMatch = SEED_CATEGORIES.find(s => s.slug === cat.slug);
      return {
        ...cat,
        graveCount: cat.graveCount || seedMatch?.graveCount || 42,
      };
    } catch {
      const category = SEED_CATEGORIES.find(
        c => c.slug.toLowerCase() === slug.toLowerCase() || c.id === slug
      );
      if (!category) {
        throw new Error(`Category not found: ${slug}`);
      }
      return category;
    }
  },
};
