import { Grave } from '../types';
import { apiRequest } from './apiClient';
import { storage } from '../lib/storage';
import { adaptGrave } from './adapters';

export const gravesApi = {
  async getAll(): Promise<Grave[]> {
    try {
      const response = await apiRequest<any>('/graves');
      const list = Array.isArray(response) ? response : response?.content || [];
      if (list.length > 0) {
        return list.map((g: any) => adaptGrave(g));
      }
      throw new Error('No graves returned');
    } catch {
      const people = storage.getStoredPeople();
      return people.map(p => ({
        ...p.grave,
        personId: p.id,
        personName: p.name,
      }));
    }
  },

  async getById(id: string): Promise<Grave> {
    try {
      const raw = await apiRequest<any>(`/graves/${id}`);
      return adaptGrave(raw);
    } catch {
      const people = storage.getStoredPeople();
      const person = people.find(p => p.grave.id === id || p.id === id || p.slug === id);
      if (!person) throw new Error('Grave not found');
      return {
        ...person.grave,
        personId: person.id,
        personName: person.name,
      };
    }
  },

  async update(id: string, graveData: Partial<Grave>): Promise<Grave> {
    try {
      const raw = await apiRequest<any>(`/graves/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          cemeteryName: graveData.cemeteryName,
          cemeteryAddress: graveData.address,
          city: graveData.city,
          country: graveData.country,
          latitude: graveData.latitude,
          longitude: graveData.longitude,
          description: graveData.plotDescription,
          graveImageUrl: graveData.imageUrl,
          verified: true,
        }),
      });
      return adaptGrave(raw);
    } catch {
      const people = storage.getStoredPeople();
      const personIndex = people.findIndex(
        p => p.grave.id === id || p.id === graveData.personId
      );
      if (personIndex !== -1) {
        people[personIndex].grave = {
          ...people[personIndex].grave,
          ...graveData,
        };
        storage.savePeople(people);
        return people[personIndex].grave;
      }
      throw new Error('Grave not found for update');
    }
  },
};
