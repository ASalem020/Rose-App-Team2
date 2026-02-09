'use client';

import React, { useState } from 'react';
import EmailStep from './email-step';
import VerifyOtp from './verify-otp';
import NewPasswordStep from './new-password-step';
import { ForgotPasswordStep } from '@/lib/types/auth';
import { FORGOT_PASSWROD_STEPS } from '@/lib/constants/auth-constants';

export default function ForgotPasswordFlow() {
  const [step, setStep] = useState<ForgotPasswordStep>(
    FORGOT_PASSWROD_STEPS.EMAIL,
  );
  const [email, setEmail] = useState('');

  const steps = {
    // email step
    [FORGOT_PASSWROD_STEPS.EMAIL]: {
      form: (
        <EmailStep
          email={email}
          setEmail={setEmail}
          setStep={setStep}
        />
      ),
    },

    // OTP step
    [FORGOT_PASSWROD_STEPS.OTP]: {
      form: <VerifyOtp email={email} setStep={setStep} />,
    },

    // New Password step
    [FORGOT_PASSWROD_STEPS.NEW_PASSWORD]: {
      form: <NewPasswordStep email={email} />,
    },
  };

  return (
    <div className="">
      <div className="">{steps[step].form}</div>
    </div>
  );
}
