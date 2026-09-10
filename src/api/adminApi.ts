import { apiRequest } from './apiClient';
import { storage } from '../lib/storage';

export interface AdminStats {
  totalPeople: number;
  totalGraves: number;
  totalQuotes: number;
  pendingContributions: number;
  approvedContributions: number;
}

export const adminApi = {
  async getStats(): Promise<AdminStats> {
    try {
      const stats = await apiRequest<any>('/statistics');
      const contributions = storage.getContributions();
      return {
        totalPeople: stats.totalPeople || 0,
        totalGraves: stats.totalGraves || 0,
        totalQuotes: stats.totalQuotes || 0,
        pendingContributions: contributions.filter(c => c.status === 'PENDING').length,
        approvedContributions: contributions.filter(c => c.status === 'APPROVED').length,
      };
    } catch {
      const people = storage.getStoredPeople();
      const contributions = storage.getContributions();
      let totalQuotes = 0;
      people.forEach(p => {
        totalQuotes += (p.quotes?.length || 0) + (p.featuredQuote ? 1 : 0);
      });

      return {
        totalPeople: people.length,
        totalGraves: people.length,
        totalQuotes,
        pendingContributions: contributions.filter(c => c.status === 'PENDING').length,
        approvedContributions: contributions.filter(c => c.status === 'APPROVED').length,
      };
    }
  },
};
