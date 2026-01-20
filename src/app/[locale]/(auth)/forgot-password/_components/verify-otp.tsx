'use client'
import { InputOTP, InputOTPSlot, InputOTPGroup } from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';
import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect, useCallback } from 'react';
import { useVerifyOtp } from '../_hooks/use-verify-otp';
import { useSendOtp } from '../_hooks/use-send-otp';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils/tailwind-merge';

const COOLDOWN_KEY = 'otp_cooldown';
const COOLDOWN_DURATION = 60; // 60 seconds

interface VerifyOtpProps {
    email: string;
    setStep: (step: number) => void;
}

export default function VerifyOtp({ email, setStep }: VerifyOtpProps) {
    // Translations
    const t = useTranslations('pages.forgot-password.otp');
    const locale = useLocale();
    const [code, setCode] = useState('');
    const [countdown, setCountdown] = useState(0);

    // React Query mutations
    const { verifyOtp, isPending: isVerifying, error: verifyError, resetError } = useVerifyOtp();
    const { sendOtp, isPending: isSending } = useSendOtp();

    // Clear error when user starts typing new code
    const handleCodeChange = (value: string) => {
        setCode(value);
        if (verifyError) {
            resetError();
        }
    };

    // Calculate remaining time from localStorage
    const getRemainingTime = useCallback(() => {
        const storedTime = localStorage.getItem(COOLDOWN_KEY);
        if (!storedTime) return 0;

        const elapsedSeconds = Math.floor((Date.now() - parseInt(storedTime, 10)) / 1000);
        const remaining = COOLDOWN_DURATION - elapsedSeconds;
        return remaining > 0 ? remaining : 0;
    }, []);

    // Initialize countdown from localStorage on mount
    useEffect(() => {
        const remaining = getRemainingTime();
        setCountdown(remaining);
    }, [getRemainingTime]);

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

    // Handle resend OTP
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        verifyOtp(code);
    };

    const isResendDisabled = countdown > 0 || isSending || !email;

    return (
        <section className='flex flex-col justify-center items-center h-screen w-full max-w-xs mx-auto'>
            {/* Header */}
            <div className='w-full'>
                <h1 className='text-2xl font-semibold'>{t('title')}</h1>

                <div className='flex items-center gap-2'>
                    <p className='text-xs text-zinc-500'>
                        {t('description')} <span className='text-black dark:text-white'>{email}</span>.
                    </p>
                    {/* edit email button  sends user to step 1 */}
                    <button
                        onClick={() => setStep(1)}
                        className={cn(
                            'text-maroon-700 capitalize text-xs underline',
                            isResendDisabled && 'text-zinc-400 cursor-not-allowed'
                        )}
                    >
                        {t('edit')}
                    </button>
                </div>
            </div>
            <div className='w-full'>
                {/* OTP Form */}
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 border-zinc-300 dark:border-zinc-200 border-y py-4 my-4 w-full'>
                    <InputOTP
                        maxLength={6}
                        value={code}
                        onChange={handleCodeChange}
                    >
                        <InputOTPGroup>
                            {[0, 1, 2, 3, 4, 5].map(i => (
                                <InputOTPSlot key={i} index={i} />
                            ))}
                        </InputOTPGroup>
                    </InputOTP>
                    {/* resend verify code button */}
                    <div className='flex justify-end gap-2 items-center'>
                        <p>{t('sendNewCode')}</p>
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
                                    : t('send')
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
                        disabled={isVerifying || code.length !== 6}
                    >
                        {isVerifying ? < Loader2 className="h-4 w-4 animate-spin" /> : t('verify')}
                    </Button>
                </form>
                {/* Footer */}
                <div className='flex justify-center items-center gap-1'>
                    <p>{t('needHelp')}</p>
                    <button className='text-maroon-700 dark:text-softPink-400'>{t('contactUs')}</button>
                </div>
            </div>
        </section>
    );
}
