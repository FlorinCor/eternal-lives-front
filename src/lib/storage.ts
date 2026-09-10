import { Contribution, Person, User } from '../types';
import { SEED_CONTRIBUTIONS, SEED_PEOPLE } from '../config/seedData';

const TOKEN_KEY = 'eternal_lives_auth_token';
const USER_KEY = 'eternal_lives_user';
const FAVORITES_KEY = 'eternal_lives_favorites';
const CONTRIBUTIONS_KEY = 'eternal_lives_contributions';
const PEOPLE_KEY = 'eternal_lives_people_store';

export const storage = {
  getToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  setToken(token: string): void {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch (e) {
      console.error('Failed to set auth token', e);
    }
  },
  removeToken(): void {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (e) {
      console.error('Failed to remove auth token', e);
    }
  },

  getUser(): User | null {
    try {
      const data = localStorage.getItem(USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
  setUser(user: User): void {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (e) {
      console.error('Failed to save user', e);
    }
  },
  removeUser(): void {
    try {
      localStorage.removeItem(USER_KEY);
    } catch (e) {
      console.error('Failed to remove user', e);
    }
  },

  getFavorites(): string[] {
    try {
      const data = localStorage.getItem(FAVORITES_KEY);
      return data ? JSON.parse(data) : ['1', '2']; // Default initial favorites: Einstein, Marie Curie
    } catch {
      return ['1', '2'];
    }
  },
  setFavorites(ids: string[]): void {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
    } catch (e) {
      console.error('Failed to save favorites', e);
    }
  },
  toggleFavorite(personId: string): string[] {
    const current = this.getFavorites();
    const updated = current.includes(personId)
      ? current.filter(id => id !== personId)
      : [...current, personId];
    this.setFavorites(updated);
    return updated;
  },

  getStoredPeople(): Person[] {
    try {
      const data = localStorage.getItem(PEOPLE_KEY);
      return data ? JSON.parse(data) : SEED_PEOPLE;
    } catch {
      return SEED_PEOPLE;
    }
  },
  savePeople(people: Person[]): void {
    try {
      localStorage.setItem(PEOPLE_KEY, JSON.stringify(people));
    } catch (e) {
      console.error('Failed to save people store', e);
    }
  },

  getContributions(): Contribution[] {
    try {
      const data = localStorage.getItem(CONTRIBUTIONS_KEY);
      return data ? JSON.parse(data) : SEED_CONTRIBUTIONS;
    } catch {
      return SEED_CONTRIBUTIONS;
    }
  },
  saveContributions(contributions: Contribution[]): void {
    try {
      localStorage.setItem(CONTRIBUTIONS_KEY, JSON.stringify(contributions));
    } catch (e) {
      console.error('Failed to save contributions', e);
    }
  }
};
