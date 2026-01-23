import {
  emailSchema,
  otpSchema,
  resetPasswordSchema,
} from '../schemas/auth.schema';

export type EmailStepFields = z.infer<typeof emailSchema>;

export type OtpStepFields = z.infer<typeof otpSchema>;

export type ResetPasswordFields = z.infer<
  typeof resetPasswordSchema
>;
