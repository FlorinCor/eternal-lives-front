import { useQuery } from '@tanstack/react-query';
import { categoriesApi } from '../api/categoriesApi';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesApi.getAll(),
  });
};

export const useCategory = (slug: string | undefined) => {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: () => {
      if (!slug) throw new Error('Category slug is required');
      return categoriesApi.getBySlug(slug);
    },
    enabled: !!slug,
  });
};
