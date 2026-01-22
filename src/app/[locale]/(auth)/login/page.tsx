'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import RememberMeCheckbox from './remember-me/remember-me-checkbox';
import { saveAuthToken } from '@/lib/utils/auth-remember-me';

type FormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [rememberMe, setRememberMe] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const token = 'FAKE_TOKEN_FOR_TEST';

      saveAuthToken(token, rememberMe);

      console.log(
        'Logged in with',
        data,
        'Remember Me:',
        rememberMe,
      );
    } catch (err: any) {
      setError('email', {
        message: err.message || 'Something went wrong',
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm space-y-6"
    >
      <div className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            {...register('email', {
              required: 'Email is required',
            })}
            type="email"
            id="email"
            placeholder="user@example.com"
            className="h-12 border-2 border-zinc-300"
            autoCapitalize="email"
          />
          {errors.email && (
            <p className="font-sm text-red-400">
              *{errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            {...register('password', {
              required: 'Password is required',
            })}
            type="password"
            id="password"
            placeholder="*****"
            className="h-12 border-2 border-zinc-300"
            autoComplete="current-password"
          />
          {errors.password && (
            <p className="font-sm text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>
        {/* Remember me chekbox */}

        <div className="flex items-center justify-between">
          <RememberMeCheckbox
            checked={rememberMe}
            onChange={setRememberMe}
          />
          <Link
            href="/forget-password"
            className="text-maroon-700"
          >
            Forgot your password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-10 bg-maroon-600 text-white hover:bg-maroon-800"
        >
          Login
        </Button>
      </div>
    </form>
  );
}
