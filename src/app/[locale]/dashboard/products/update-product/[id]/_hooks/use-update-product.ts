import { useMutation } from '@tanstack/react-query';
import { updateProductAction } from '../_actions/update-product.action';
import { UpdateProductFields } from '@/app/[locale]/(auth)/register/_types/product-fields';

export const useUpdateProduct = (id: string) => {
  const { isPending: isLoading, mutateAsync } = useMutation(
    {
      mutationKey: ['update-product'],
      mutationFn: (values: UpdateProductFields) => {
        return updateProductAction(id, values);
      },
    },
  );

  return { isLoading, mutateAsync };
};
