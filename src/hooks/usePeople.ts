import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { peopleApi } from '../api/peopleApi';
import { SearchFilters, Person } from '../types';

export const usePeople = (filters: SearchFilters = {}) => {
  return useQuery({
    queryKey: ['people', filters],
    queryFn: () => peopleApi.getAll(filters),
  });
};

export const useFeaturedPeople = () => {
  return useQuery({
    queryKey: ['people', 'featured'],
    queryFn: () => peopleApi.getFeatured(),
  });
};

export const useRecentPeople = () => {
  return useQuery({
    queryKey: ['people', 'recent'],
    queryFn: () => peopleApi.getRecentlyAdded(),
  });
};

export const useRelatedPeople = (slug: string, limit = 4) => {
  return useQuery({
    queryKey: ['people', 'related', slug, limit],
    queryFn: () => peopleApi.getRelated(slug, limit),
    enabled: !!slug,
  });
};

export const useCreatePerson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newPerson: Partial<Person>) => peopleApi.create(newPerson),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['people'] });
      queryClient.invalidateQueries({ queryKey: ['admin'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useUpdatePerson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Person> }) =>
      peopleApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['people'] });
      queryClient.invalidateQueries({ queryKey: ['person', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['admin'] });
    },
  });
};

export const useDeletePerson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => peopleApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['people'] });
      queryClient.invalidateQueries({ queryKey: ['admin'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};
