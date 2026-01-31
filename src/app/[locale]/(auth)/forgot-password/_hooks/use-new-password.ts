import { resetPasswordAction } from '@/lib/actions/auth.action';
import { ResetPasswordFields } from '@/lib/types/auth';
import { useMutation } from '@tanstack/react-query';

export const useResetPassword = () => {
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: ResetPasswordFields) => {
      const payload = await resetPasswordAction(fields);

      // Handle error
      if ('error' in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
  });

  return { isPending, error, resetPassword: mutate };
};
