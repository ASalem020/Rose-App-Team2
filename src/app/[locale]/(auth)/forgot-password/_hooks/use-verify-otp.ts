import { useMutation } from '@tanstack/react-query';
import { verifyOtpAction } from '@/lib/actions/auth.action';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

export function useVerifyOtp() {
  // Translations
  const t = useTranslations();

  // Mutation
  const { isPending, error, mutate, reset } = useMutation({
    mutationFn: async (code: string) => {
      const payload = await verifyOtpAction(code);

      if ('error' in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
    onSuccess: () => {
      toast.success(
        t('pages.forgot-password.otp.toast.success'),
      );
    },
  });
  return {
    isPending,
    error,
    verifyOtp: mutate,
    resetError: reset,
  };
}
