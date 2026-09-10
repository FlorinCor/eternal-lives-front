import { Quote } from '../types';
import { apiRequest } from './apiClient';
import { storage } from '../lib/storage';
import { adaptQuote } from './adapters';

export const quotesApi = {
  async getAll(): Promise<Quote[]> {
    try {
      const response = await apiRequest<any>('/quotes', { params: { page: 0, size: 50 } });
      const rawList = Array.isArray(response)
        ? response
        : response?.content || response?.items || [];
      if (rawList.length > 0) {
        return rawList.map((q: any) => adaptQuote(q));
      }
      throw new Error('No quotes returned');
    } catch {
      const people = storage.getStoredPeople();
      const allQuotes: Quote[] = [];
      people.forEach(p => {
        if (p.featuredQuote) {
          allQuotes.push({ ...p.featuredQuote, personSlug: p.slug });
        }
        if (p.quotes) {
          p.quotes.forEach(q => {
            if (!allQuotes.some(existing => existing.id === q.id)) {
              allQuotes.push({ ...q, personSlug: p.slug });
            }
          });
        }
      });
      return allQuotes;
    }
  },

  async getByPersonSlug(slug: string): Promise<Quote[]> {
    try {
      const rawList = await apiRequest<any[]>(`/people/${slug}/quotes`);
      if (Array.isArray(rawList)) {
        return rawList.map(q => adaptQuote(q));
      }
      throw new Error('No quotes found');
    } catch {
      const people = storage.getStoredPeople();
      const person = people.find(p => p.slug === slug || String(p.id) === slug);
      if (!person) return [];
      return person.quotes || (person.featuredQuote ? [person.featuredQuote] : []);
    }
  },

  async create(quoteData: Partial<Quote>): Promise<Quote> {
    try {
      const raw = await apiRequest<any>('/quotes', {
        method: 'POST',
        body: JSON.stringify({
          personId: quoteData.personId,
          text: quoteData.quote,
          source: quoteData.source,
          context: quoteData.context,
          year: quoteData.year,
          verified: quoteData.isVerified ?? true,
        }),
      });
      return adaptQuote(raw);
    } catch {
      const newQuote: Quote = {
        id: `q-${Date.now()}`,
        personId: quoteData.personId || '1',
        personName: quoteData.personName || 'Historical Figure',
        quote: quoteData.quote || '',
        source: quoteData.source,
        context: quoteData.context,
        year: quoteData.year,
        isVerified: quoteData.isVerified ?? true,
        verificationNotes: quoteData.verificationNotes,
      };

      const people = storage.getStoredPeople();
      const personIndex = people.findIndex(
        p => p.id === newQuote.personId || p.slug === newQuote.personId
      );
      if (personIndex !== -1) {
        people[personIndex].quotes = [newQuote, ...(people[personIndex].quotes || [])];
        storage.savePeople(people);
      }
      return newQuote;
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await apiRequest<void>(`/quotes/${id}`, { method: 'DELETE' });
    } catch {
      const people = storage.getStoredPeople();
      people.forEach(p => {
        if (p.quotes) {
          p.quotes = p.quotes.filter(q => q.id !== id);
        }
      });
      storage.savePeople(people);
    }
  },
};
