import { useMutation } from '@tanstack/react-query';
import { verifyOtpAction } from '@/lib/actions/auth.action';
import { toast } from 'sonner';

export const useVerifyOtp = () => {
  // Mutation
  const { isPending, error, mutate, reset } = useMutation({
    mutationFn: async (code: string) => {
      console.log('Verifying OTP with code:', code);
      const payload = await verifyOtpAction(code);
      console.log('OTP verification response:', payload);

      if ('error' in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
    onSuccess: () => {
      toast.success('OTP verified successfully!');
    },
    onError: (error: Error) => {
      console.error('OTP verification error:', error);
      // Error will be displayed in the component, not as a toast
    },
  });
  return {
    isPending,
    error,
    verifyOtp: mutate,
    resetError: reset,
  };
};
