import { ProductFields } from '@/app/[locale]/(auth)/register/_types/product-fields';
import { useMutation } from '@tanstack/react-query';
import { addProductAction } from '../_actions/add-product.action';

export const useAddProduct = () => {
  const { isPending: isLoading, mutateAsync } = useMutation(
    {
      mutationKey: ['add-product'],
      mutationFn: (values: ProductFields) => {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          if (
            (key === 'images' || key === 'imgCover') &&
            value instanceof FileList
          ) {
            Array.from(value).forEach(file => {
              formData.append(key, file);
            });
          } else if (value !== undefined) {
            formData.append(key, value as string | Blob);
          }
        });
        return addProductAction(formData);
      },
    },
  );

  return { isLoading, mutateAsync };
};
