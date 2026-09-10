import { Person } from '../types';
import { apiRequest } from './apiClient';
import { storage } from '../lib/storage';
import { adaptPerson } from './adapters';

export const favoritesApi = {
  async getFavorites(): Promise<Person[]> {
    try {
      const list = await apiRequest<any[]>('/users/me/favorites');
      if (Array.isArray(list)) {
        return list.map(f =>
          adaptPerson({
            id: f.personId || f.id,
            slug: f.personSlug || f.slug,
            fullName: f.personFullName || f.fullName,
            profileImageUrl: f.personProfileImageUrl || f.profileImageUrl,
            cemetery: f.cemetery,
            city: f.city,
            country: f.country,
          })
        );
      }
      throw new Error('Invalid favorites response');
    } catch {
      const favoriteIds = storage.getFavorites();
      const people = storage.getStoredPeople();
      return people.filter(p => favoriteIds.includes(p.id) || favoriteIds.includes(p.slug));
    }
  },

  async addFavorite(personId: string): Promise<string[]> {
    try {
      await apiRequest<void>(`/users/me/favorites/${personId}`, { method: 'POST' });
    } catch {
      // Handled locally below
    }
    const current = storage.getFavorites();
    if (!current.includes(personId)) {
      storage.setFavorites([...current, personId]);
    }
    return storage.getFavorites();
  },

  async removeFavorite(personId: string): Promise<string[]> {
    try {
      await apiRequest<void>(`/users/me/favorites/${personId}`, { method: 'DELETE' });
    } catch {
      // Handled locally below
    }
    const current = storage.getFavorites();
    const updated = current.filter(id => id !== personId);
    storage.setFavorites(updated);
    return updated;
  },

  async toggleFavorite(personId: string): Promise<{ isFavorite: boolean; favorites: string[] }> {
    const current = storage.getFavorites();
    const exists = current.includes(personId);
    if (exists) {
      const updated = await this.removeFavorite(personId);
      return { isFavorite: false, favorites: updated };
    } else {
      const updated = await this.addFavorite(personId);
      return { isFavorite: true, favorites: updated };
    }
  },
};
