'use client';

import React, { useState } from 'react';
import EmailStep from './email-step';
import VerifyOtp from './verify-otp';
import NewPasswordStep from './new-password-step';
import { ForgotPasswordStep } from '@/lib/types/auth';
import { FORGOT_PASSWROD_STEPS } from '@/lib/constants/auth-constants';
import { Church } from 'lucide-react';

export default function ForgotPasswordFlow() {
  const [step, setStep] = useState<ForgotPasswordStep>(
    FORGOT_PASSWROD_STEPS.EMAIL,
  );
  const [email, setEmail] = useState('');
       
        //  E-mail step
  const steps = {
    [FORGOT_PASSWROD_STEPS.EMAIL]: {
      title: 'Forgot Password?',
      description:
        'Worry not, we’ll send you instructions to help you reset it.',
      form: (
        <EmailStep
          setEmail={(value: string) => {
            setEmail(value);
            setStep(FORGOT_PASSWROD_STEPS.OTP);
          }}
        />
      ),
    },
      //  OTP step
    [FORGOT_PASSWROD_STEPS.OTP]: {
      title: 'Enter the OTP Code',
      description: (
        <>
          We have sent a 6-digit code to{' '}
          <span>{email || ''}</span>
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
      //  new password step
    [FORGOT_PASSWROD_STEPS.NEW_PASSWORD]: {
      title: 'Create a new password',
      description:
        'Set a strong password to secure your account.',
      form: <NewPasswordStep email={email} />,
    },
  };

  return (
    <div className='w-104 mx-auto h-96'>
      <h1 className="h-16 ">
        {steps[step].title}
      </h1>
      <p className="h-4 py-4">
        {steps[step].description}
      </p>
      <div className="mt-6">{steps[step].form}</div>
    </div>
  );
}
