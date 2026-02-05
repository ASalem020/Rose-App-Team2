import { useMutation } from '@tanstack/react-query';
import { registerAction } from '../_actions/register.action';
import { RegisterFields } from '../_types/register-fields';

export const useRegister = () => {
  // Mutation
  const { isPending: isLoading, mutateAsync } = useMutation(
    {
      mutationKey: ['register-user'],
      mutationFn: (values: RegisterFields) =>
        registerAction(values),
    },
  );

  return { isLoading, mutateAsync };
};
