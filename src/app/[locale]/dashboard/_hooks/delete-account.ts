import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { deleteAccountAction } from '../_actions/delete-account.action';
import { signOut } from 'next-auth/react';

export const useDeleteAccount = () => {
  // Translation
  const t = useTranslations(
    'pages.dashboard.account.delete',
  );

  // Mutation
  const { mutate: deleteAccountMutate } = useMutation({
    mutationFn: () => deleteAccountAction(),
    onSuccess: () => {
      toast.success(t('success'));
      signOut();
    },
    onError: (error: Error) => {
      toast.error(error.message || t('error'));
    },
  });

  return { deleteAccountMutate };
};
