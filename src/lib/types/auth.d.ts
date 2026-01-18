import {
  emailSchema,
  resetPasswordSchema,
} from '../schemas/auth.schema';

export type EmailStepFields = z.infer<typeof emailSchema>;

export type ResetPasswordFields = z.infer<
  typeof resetPasswordSchema
>;
