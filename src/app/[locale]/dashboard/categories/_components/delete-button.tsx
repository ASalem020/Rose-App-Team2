'use client';

import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { deleteCategoriesActions } from '../_actions/delete-categories.actions';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

// ^ Type
type Props = {
  id: string;
};

export default function DeleteCategoryButton({
  id,
}: Props) {
  // ^ Transilation
  const t = useTranslations('dashboard.categories');

  //^ Query
  const queryClient = useQueryClient();

  //^ Mutation
  const mutation = useMutation({
    mutationFn: (id: string) => deleteCategoriesActions(id),
    onSuccess: data => {
      toast.success(data.error || 'Deleted!');
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
    },
    onError: () => {
      toast.error('Error deleting category');
    },
  });

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-1.5 border-red-50 bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700"
      onClick={() => mutation.mutate(id)}
      disabled={mutation.isPending}
    >
      <Trash2 className="h-3.5 w-3.5" />
      {mutation.isPending
        ? `${t('loading')}`
        : `${t('delete')}`}
    </Button>
  );
}
