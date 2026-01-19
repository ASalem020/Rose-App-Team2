'use client';

import React, { useState } from 'react';
import EmailStep from './email-step';
import NewPasswordStep from './new-password-step';
import VerifyOtp from './verify-otp';

export default function ForgotPasswordFlow() {
  const [email, setEmail] = useState<string>('');

  return (
    // NOTE => waiting for Forgot password Flow and layout to be completed...
    <div>
      {/* NOTE
      For testing the components:
      1. You can type your registered email , then go to your email and find the OTP
      2. Enter OTP in postman using verify reset API (until the OTP step finished...)
      3. then return to that page to type the new password */}

      <EmailStep setEmail={setEmail} />
      <NewPasswordStep email={email} />
      <VerifyOtp email={email} />
    </div>
  );
}
