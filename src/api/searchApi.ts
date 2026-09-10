import { Person } from '../types';
import { apiRequest } from './apiClient';
import { peopleApi } from './peopleApi';
import { adaptPerson } from './adapters';

export interface SearchResponse {
  query: string;
  count: number;
  results: Person[];
}

export const searchApi = {
  async search(query: string): Promise<SearchResponse> {
    const cleanQuery = query.trim();
    if (!cleanQuery) {
      return { query: '', count: 0, results: [] };
    }

    try {
      const rawList = await apiRequest<any[]>('/search', {
        params: { q: cleanQuery, limit: 30 },
      });
      const results = Array.isArray(rawList) ? rawList.map(adaptPerson) : [];
      return {
        query: cleanQuery,
        count: results.length,
        results,
      };
    } catch {
      // Fallback search over peopleApi
      const res = await peopleApi.getAll({ query: cleanQuery, limit: 50 });
      return {
        query: cleanQuery,
        count: res.total,
        results: res.items,
      };
    }
  },
};
