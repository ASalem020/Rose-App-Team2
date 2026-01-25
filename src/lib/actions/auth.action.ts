'use server';

import {
  EmailStepFields,
  ResetPasswordFields,
} from '../types/auth';

// Send OTP Action
export async function sendOtpAction(
  fields: EmailStepFields,
) {
  const response = await fetch(
    `${process.env.API_URL}/auth/forgotPassword`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fields),
    },
  );

  const payload = await response.json();

  return payload;
}

// Reset Password Action
export async function resetPasswordAction(
  fields: ResetPasswordFields,
) {
  const response = await fetch(
    `${process.env.API_URL}/auth/resetPassword`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fields),
    },
  );

  const payload = await response.json();

  return payload;
}

// API function for verifying OTP
export async function verifyOtpAction(code: string) {
    const response = await fetch(`${process.env.API_URL}/auth/verifyResetCode`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resetCode: code }),
    });

    const payload = await response.json();

    return payload;
};
