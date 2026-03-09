'use client';

import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { deleteProductAction } from '../_actions/delete-product.action';

/**
 * Custom hook responsible for handling product deletion.
 * Keeps UI logic separate from server logic.
 */
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending: isLoading } = useMutation(
    {
      mutationKey: ['delete-product'],
      mutationFn: (id: string) => deleteProductAction(id),
      onSuccess: () => {
        // Refresh products query after delete
        queryClient.invalidateQueries({
          queryKey: ['products'],
        });
      },
    },
  );

  return { mutateAsync, isLoading };
};
