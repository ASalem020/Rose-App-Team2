import { sendOtpAction } from '@/lib/actions/auth.action';
import { EmailStepFields } from '@/lib/types/auth';
import { useMutation } from '@tanstack/react-query';

export const useSendOtp = () => {
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: EmailStepFields) => {
      
      const payload = await sendOtpAction(fields);

      if ('error' in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
  });
  return { isPending, error, sendOtp: mutate };
};
