import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { gravesApi } from '../api/gravesApi';
import { Grave } from '../types';

export const useGraves = () => {
  return useQuery({
    queryKey: ['graves'],
    queryFn: () => gravesApi.getAll(),
  });
};

export const useGrave = (id: string | undefined) => {
  return useQuery({
    queryKey: ['grave', id],
    queryFn: () => {
      if (!id) throw new Error('Grave id required');
      return gravesApi.getById(id);
    },
    enabled: !!id,
  });
};

export const useUpdateGrave = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Grave> }) =>
      gravesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['graves'] });
      queryClient.invalidateQueries({ queryKey: ['people'] });
      queryClient.invalidateQueries({ queryKey: ['admin'] });
    },
  });
};
