import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contributionsApi } from '../api/contributionsApi';
import { Contribution, ContributionStatus } from '../types';

export const useContributions = () => {
  return useQuery({
    queryKey: ['contributions'],
    queryFn: () => contributionsApi.getAll(),
  });
};

export const useSubmitContribution = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Contribution, 'id' | 'status' | 'createdAt'>) =>
      contributionsApi.submit(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contributions'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] });
    },
  });
};

export const useReviewContribution = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      status,
      reviewNotes,
    }: {
      id: string;
      status: ContributionStatus;
      reviewNotes?: string;
    }) => contributionsApi.updateStatus(id, status, reviewNotes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contributions'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] });
    },
  });
};
