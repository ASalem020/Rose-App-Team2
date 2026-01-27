'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import EmailStep from './email-step';
import VerifyOtp from './verify-otp';
import NewPasswordStep from './new-password-step';
import { ForgotPasswordStep } from '@/lib/types/auth';
import { FORGOT_PASSWROD_STEPS } from '@/lib/constants/auth-constants';
import { Church } from 'lucide-react';

export default function ForgotPasswordFlow() {
  // transaltion hook
  const t = useTranslations('ForgotPassword');

  const [step, setStep] = useState<ForgotPasswordStep>(
    FORGOT_PASSWROD_STEPS.EMAIL,
  );
  const [email, setEmail] = useState('');

  const steps = {
    // email step
    [FORGOT_PASSWROD_STEPS.EMAIL]: {
      title: t('title'),
      description: t('description'),
      form: (
        <EmailStep
          setEmail={(value: string) => {
            setEmail(value);
            setStep(FORGOT_PASSWROD_STEPS.OTP);
          }}
        />
      ),
    },

    // OTP step
    [FORGOT_PASSWROD_STEPS.OTP]: {
      title: t('otpTitle'),
      description: (
        <>
          {t('otpDescription', { email })}
          <button
            onClick={() =>
              setStep(FORGOT_PASSWROD_STEPS.EMAIL)
            }
            className="ml-2 text-sm text-maroon-600"
          >
            <Church size={14} />
          </button>
        </>
      ),
      form: <VerifyOtp email={email} />,
    },

    // New Password step
    [FORGOT_PASSWROD_STEPS.NEW_PASSWORD]: {
      title: t('newPasswordTitle'),
      description: t('newPasswordDescription'),
      form: <NewPasswordStep email={email} />,
    },
  };

  return (
    <div className="mx-auto h-96 w-104">
      <h1 className="h-16">{steps[step].title}</h1>
      <p className="h-4 py-4">{steps[step].description}</p>
      <div className="mt-6">{steps[step].form}</div>
    </div>
  );
}
