'use client';
import {
  InputOTP,
  InputOTPSlot,
  InputOTPGroup,
} from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';
import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect, useCallback } from 'react';
import { useVerifyOtp } from '../_hooks/use-verify-otp';
import { useSendOtp } from '../_hooks/use-send-otp';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils/tailwind-merge';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { otpSchema } from '@/lib/schemas/auth.schema';
import { OtpStepFields } from '@/lib/types/auth';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';


const COOLDOWN_KEY = 'otp_cooldown';
const COOLDOWN_DURATION = 60; // 60 seconds

interface VerifyOtpProps {
    email: string;
    setStep: (step: number) => void;
}

export default function VerifyOtp({ email, setStep }: VerifyOtpProps) {
    // Translation
    const t = useTranslations();
    const locale = useLocale();

    // State
    const [countdown, setCountdown] = useState(0);

    // Mutation
    const { verifyOtp, isPending: isVerifying, error: verifyError } = useVerifyOtp();
    const { sendOtp, isPending: isSending } = useSendOtp();

    // Hooks
    const getRemainingTime = useCallback(() => {
        const storedTime = localStorage.getItem(COOLDOWN_KEY);
        if (!storedTime) return 0;

        const elapsedSeconds = Math.floor((Date.now() - parseInt(storedTime, 10)) / 1000);
        const remaining = COOLDOWN_DURATION - elapsedSeconds;
        return remaining > 0 ? remaining : 0;
    }, []);

    // Form & Validation
    const form = useForm<OtpStepFields>({
        defaultValues: {
            code: '',
        },
        resolver: zodResolver(otpSchema(t)),
    });

    // Variables
    const isResendDisabled = countdown > 0 || isSending || !email;

    // Functions
    const handleResendOtp = () => {
        if (countdown > 0 || isSending || !email) return;
        sendOtp(
            { email },
            {
                onSuccess: () => {
                    // Store timestamp in localStorage
                    localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
                    setCountdown(COOLDOWN_DURATION);
                },
            }
        );
    };

    const handleSubmit: SubmitHandler<OtpStepFields> = (values) => {
        verifyOtp(values.code, {
            onSuccess: () => {
                setStep(3);
            }
        });
    };

    // Effects
    // Initialize countdown from localStorage on mount
    useEffect(() => {
        const remaining = getRemainingTime();
        setCountdown(remaining);
    }, [getRemainingTime, email]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      const remaining = getRemainingTime();
      setCountdown(remaining);

            if (remaining <= 0) {
                clearInterval(timer);
                localStorage.removeItem(COOLDOWN_KEY);
            }
        }, 1000);

    return () => clearInterval(timer);
  }, [countdown, getRemainingTime]);




    return (
        <section className='flex flex-col justify-center items-center h-screen w-full max-w-xs mx-auto'>
            {/* Header */}
            <div className='w-full'>
                {/* Title */}
                <h1 className='text-2xl font-semibold'>{t('pages.forgot-password.otp.title')}</h1>

                {/* Edit email button & description sends user to step 1 */}
                <div className='flex items-center gap-2'>
                    <p className='text-xs text-zinc-500'>
                        {t('pages.forgot-password.otp.description')} <span className='text-black dark:text-white'>{email}</span>.
                    </p>
                    <button
                        onClick={() => setStep(1)}
                        className={cn(
                            'text-maroon-700 capitalize text-xs underline',
                        )}
                    >
                        {t('pages.forgot-password.otp.edit')}
                    </button>
                </div>
            </div>

            {/* Form & Footer */}
            <div className='w-full'>
                {/* OTP Form */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-4 border-zinc-300 dark:border-zinc-200 border-y py-4 my-4 w-full'>
                        {/* OTP input */}
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormControl>
                                        <InputOTP
                                            maxLength={6}
                                            value={field.value}
                                            onChange={field.onChange}
                                            error={!!fieldState.error}
                                        >
                                            <InputOTPGroup>
                                                {[0, 1, 2, 3, 4, 5].map(i => (
                                                    <InputOTPSlot key={i} index={i} />
                                                ))}
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Resend verify code button */}
                        <div className='flex justify-end gap-2 items-center'>
                            <p>{t('pages.forgot-password.otp.sendNewCode')}</p>
                            <button
                                type="button"
                                onClick={handleResendOtp}
                                disabled={isResendDisabled}
                                className={cn(
                                    isResendDisabled
                                        ? 'text-zinc-400 cursor-not-allowed'
                                        : 'text-maroon-700 dark:text-softPink-400'
                                )}
                            >
                                {isSending
                                    ? '...'
                                    : countdown > 0
                                        ? `${countdown}s`
                                        : t('pages.forgot-password.otp.send')
                                }
                            </button>
                        </div>

                        {/* Error Message */}
                        {verifyError && (
                            <div className='w-full p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'>
                                <p className='text-sm text-red-600 dark:text-red-400'>
                                    {locale === 'ar'
                                        ? 'كود التحقق غير صحيح او انتهت صلاحيته'
                                        : verifyError.message
                                    }
                                </p>
                            </div>
                        )}

                        {/* Submission Button */}
                        <Button
                            type="submit"
                            variant={'default'}
                            className='w-full'
                            disabled={isVerifying}
                        >
                            {isVerifying ? < Loader2 className="h-4 w-4 animate-spin" /> : t('pages.forgot-password.otp.verify')}
                        </Button>
                    </form>
                </Form>
                {/* Footer */}
                <div className='flex justify-center items-center gap-1'>
                    <p>{t('pages.forgot-password.otp.needHelp')}</p>
                    <button className='text-maroon-700 dark:text-softPink-400'>{t('pages.forgot-password.otp.contactUs')}</button>
                </div>
            </div>
        </section>
    );
}

