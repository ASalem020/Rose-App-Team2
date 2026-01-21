import { FORGOT_PASSWROD_STEPS } from '../constants/auth-constants';
import {
  emailSchema,
  resetPasswordSchema,
} from '../schemas/auth.schema';

export type EmailStepFields = z.infer<typeof emailSchema>;

export type ResetPasswordFields = z.infer<
  typeof resetPasswordSchema
>;

export type ForgotPasswordStep = (typeof FORGOT_PASSWROD_STEPS) [keyof typeof FORGOT_PASSWROD_STEPS]