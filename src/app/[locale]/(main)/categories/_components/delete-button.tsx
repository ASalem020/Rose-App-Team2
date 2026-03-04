'use client';

import {
  useMutation,
} from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { deleteCategoriesActions } from '../_actions/delete-categories.actions';
import { toast } from 'sonner';

type Props = {
  id: string;
};

export default function DeleteCategoryButton({
  id,
}: Props) {

  const mutation = useMutation({
    mutationFn: (id: string) => deleteCategoriesActions(id),
    onSuccess: data => {
      toast.success(data.error || 'Done');
    },
    onError: () => {
      toast.error('error');
    },
  });

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-1.5 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-700 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
      onClick={() => mutation.mutate(id)}
      disabled={mutation.isPending}
    >
      <Trash2 className="h-3.5 w-3.5" />
      {mutation.isPending ? 'load..' : 'Delete'}
    </Button>
  );
}
