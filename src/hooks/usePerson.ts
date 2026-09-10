import { useQuery } from '@tanstack/react-query';
import { peopleApi } from '../api/peopleApi';

export const usePerson = (slug: string | undefined) => {
  return useQuery({
    queryKey: ['person', slug],
    queryFn: () => {
      if (!slug) throw new Error('Slug is required');
      return peopleApi.getBySlug(slug);
    },
    enabled: !!slug,
  });
};
