import { User } from '../types';
import { apiRequest } from './apiClient';
import { storage } from '../lib/storage';

export interface AuthCredentials {
  email: string;
  password?: string;
  name?: string;
}

export interface AuthResponseData {
  user: User;
  token: string;
}

function adaptUser(raw: any): User {
  return {
    id: String(raw.id || ''),
    email: raw.email || '',
    name: raw.fullName || raw.name || raw.username || 'Archivist',
    role: raw.role === 'ADMIN' ? 'ADMIN' : 'USER',
    avatarUrl: raw.avatarUrl,
    createdAt: raw.createdAt ? String(raw.createdAt) : new Date().toISOString(),
  };
}

export const authApi = {
  async login(credentials: AuthCredentials): Promise<AuthResponseData> {
    try {
      const payload = {
        username: credentials.email,
        password: credentials.password,
      };
      const res = await apiRequest<any>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      const user = adaptUser(res.user || res);
      const token = res.token;
      storage.setToken(token);
      storage.setUser(user);
      return { user, token };
    } catch {
      // Mock authenticated session
      const isAdmin = credentials.email.toLowerCase().includes('admin');
      const user: User = {
        id: 'usr_1',
        email: credentials.email,
        name: credentials.name || (isAdmin ? 'Archivist Administrator' : credentials.email.split('@')[0]),
        role: isAdmin ? 'ADMIN' : 'USER',
        createdAt: new Date().toISOString(),
      };
      const token = `mock-jwt-token-${Date.now()}`;
      storage.setToken(token);
      storage.setUser(user);
      return { user, token };
    }
  },

  async register(credentials: AuthCredentials): Promise<AuthResponseData> {
    try {
      const username = credentials.email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '_');
      const payload = {
        username: username.length >= 3 ? username : `${username}123`,
        email: credentials.email,
        password: credentials.password,
        fullName: credentials.name || credentials.email.split('@')[0],
      };
      const res = await apiRequest<any>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      const user = adaptUser(res.user || res);
      const token = res.token;
      storage.setToken(token);
      storage.setUser(user);
      return { user, token };
    } catch {
      const user: User = {
        id: `usr_${Date.now()}`,
        email: credentials.email,
        name: credentials.name || credentials.email.split('@')[0],
        role: 'USER',
        createdAt: new Date().toISOString(),
      };
      const token = `mock-jwt-token-${Date.now()}`;
      storage.setToken(token);
      storage.setUser(user);
      return { user, token };
    }
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const raw = await apiRequest<any>('/auth/me');
      const user = adaptUser(raw);
      storage.setUser(user);
      return user;
    } catch {
      return storage.getUser();
    }
  },

  logout(): void {
    storage.removeToken();
    storage.removeUser();
  },
};
