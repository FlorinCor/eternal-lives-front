import { useQuery } from '@tanstack/react-query';
import { searchApi } from '../api/searchApi';

export const useSearch = (query: string) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => searchApi.search(query),
    enabled: !!query && query.trim().length > 0,
  });
};
