import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { deleteCategoryAction } from '../_actions/delete-category.action';

export const useDeleteCategory = () => {
  // Translation
  const t = useTranslations(
    'pages.dashboard.categories.delete',
  );

  // Mutation
  const { mutate: deleteCategoryMutate } = useMutation({
    mutationFn: (categoryId: string) =>
      deleteCategoryAction(categoryId),
    onSuccess: () => {
      toast.success(t('success'));
    },
    onError: (error: Error) => {
      toast.error(error.message || t('error'));
    },
  });

  return { deleteCategoryMutate };
};
