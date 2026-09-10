import { Contribution, ContributionStatus } from '../types';
import { apiRequest } from './apiClient';
import { storage } from '../lib/storage';

function adaptContribution(raw: any): Contribution {
  return {
    id: String(raw.id || `c_${Date.now()}`),
    type: raw.type || 'PERSON',
    subject: raw.subject || raw.title || 'Contribution',
    details: raw.details || raw.description || '',
    personName: raw.personName,
    sourceReference: raw.sourceReference || raw.source,
    submittedBy: raw.submittedBy || raw.userName || 'Anonymous',
    userEmail: raw.userEmail || raw.email || '',
    status: raw.status || 'PENDING',
    createdAt: raw.createdAt ? String(raw.createdAt) : new Date().toISOString(),
    reviewedAt: raw.reviewedAt ? String(raw.reviewedAt) : undefined,
    reviewNotes: raw.reviewNotes,
  };
}

export const contributionsApi = {
  async getAll(): Promise<Contribution[]> {
    try {
      const response = await apiRequest<any>('/admin/contributions');
      const list = Array.isArray(response) ? response : response?.content || [];
      if (list.length > 0) {
        return list.map(adaptContribution);
      }
      throw new Error('No admin contributions');
    } catch {
      return storage.getContributions();
    }
  },

  async submit(data: Omit<Contribution, 'id' | 'status' | 'createdAt'>): Promise<Contribution> {
    try {
      const raw = await apiRequest<any>('/contributions', {
        method: 'POST',
        body: JSON.stringify({
          type: data.type,
          subject: data.subject,
          details: data.details,
          personName: data.personName,
          sourceReference: data.sourceReference,
        }),
      });
      return adaptContribution(raw);
    } catch {
      const newContribution: Contribution = {
        ...data,
        id: `c_${Date.now()}`,
        status: 'PENDING',
        createdAt: new Date().toISOString(),
      };
      const current = storage.getContributions();
      storage.saveContributions([newContribution, ...current]);
      return newContribution;
    }
  },

  async updateStatus(
    id: string,
    status: ContributionStatus,
    reviewNotes?: string
  ): Promise<Contribution> {
    try {
      const action = status === 'APPROVED' ? 'approve' : 'reject';
      const raw = await apiRequest<any>(`/admin/contributions/${id}/${action}`, {
        method: 'PUT',
        body: JSON.stringify({ reviewNotes }),
      });
      return adaptContribution(raw);
    } catch {
      const list = storage.getContributions();
      const index = list.findIndex(c => c.id === id);
      if (index === -1) throw new Error('Contribution not found');
      const updated: Contribution = {
        ...list[index],
        status,
        reviewNotes,
        reviewedAt: new Date().toISOString(),
      };
      list[index] = updated;
      storage.saveContributions(list);
      return updated;
    }
  },
};
