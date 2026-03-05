import { useMutation } from '@tanstack/react-query';
import { deleteProductAction } from '../_actions/delete-product.action';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

export const useDeleteProduct = () => {
  // Translation
  const t = useTranslations(
    'pages.dashboard.products.delete',
  );

  // Mutation
  const { mutate: deleteProductMutate } = useMutation({
    mutationFn: (productId: string) =>
      deleteProductAction(productId),
    onSuccess: () => {
      toast.success(t('success'));
    },
    onError: (error: Error) => {
      toast.error(error.message || t('error'));
    },
  });

  return { deleteProductMutate };
};
