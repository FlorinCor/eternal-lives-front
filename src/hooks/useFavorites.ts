import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { favoritesApi } from '../api/favoritesApi';

export const useFavoritesList = () => {
  return useQuery({
    queryKey: ['favorites', 'list'],
    queryFn: () => favoritesApi.getFavorites(),
  });
};

export const useToggleFavoriteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (personId: string) => favoritesApi.toggleFavorite(personId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
};
