import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { quotesApi } from '../api/quotesApi';
import { Quote } from '../types';

export const useQuotes = () => {
  return useQuery({
    queryKey: ['quotes'],
    queryFn: () => quotesApi.getAll(),
  });
};

export const usePersonQuotes = (slug: string | undefined) => {
  return useQuery({
    queryKey: ['quotes', slug],
    queryFn: () => {
      if (!slug) throw new Error('Person slug required');
      return quotesApi.getByPersonSlug(slug);
    },
    enabled: !!slug,
  });
};

export const useCreateQuote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newQuote: Partial<Quote>) => quotesApi.create(newQuote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
      queryClient.invalidateQueries({ queryKey: ['people'] });
      queryClient.invalidateQueries({ queryKey: ['admin'] });
    },
  });
};

export const useDeleteQuote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => quotesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
      queryClient.invalidateQueries({ queryKey: ['people'] });
      queryClient.invalidateQueries({ queryKey: ['admin'] });
    },
  });
};
