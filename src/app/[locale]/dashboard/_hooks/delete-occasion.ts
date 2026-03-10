import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { deleteOccasionAction } from '../_actions/delete-occasion.action';

export const useDeleteOccasion = () => {
  // Translation
  const t = useTranslations(
    'pages.dashboard.occasions.delete',
  );

  // Mutation
  const { mutate: deleteOccasionMutate } = useMutation({
    mutationFn: (occasionId: string) =>
      deleteOccasionAction(occasionId),
    onSuccess: () => {
      toast.success(t('success'));
    },
    onError: (error: Error) => {
      toast.error(error.message || t('error'));
    },
  });

  return { deleteOccasionMutate };
};
