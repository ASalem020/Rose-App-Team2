import { FORGOT_PASSWROD_STEPS } from '../constants/auth-constants';
import {
  emailSchema,
  otpSchema,
  resetPasswordSchema,
} from '../schemas/auth.schema';
import { loginSchema } from "../schemas/auth.schema";
/**
 * Auth User
 * @interface AuthUser
 * @property {string} _id - The user's ID
 * @property {string} firstName - The user's first name
 * @property {string} lastName - The user's last name
 * @property {string} createdAt - The user's creation date
 */

export type LoginFields = z.infer<typeof loginSchema>

export interface LoginResponse {
    token: string;
    user: {
        _id: string,
        firstName: string,
        lastName: string,
        email: string,
        gender: string,
        phone: string,
        photo: string,
        role: string,
        createdAt: string,
        wishlist: [],
        addresses: [],
    };
}


export type EmailStepFields = z.infer<typeof emailSchema>;

export type OtpStepFields = z.infer<typeof otpSchema>;

export type ResetPasswordFields = z.infer<
  typeof resetPasswordSchema
>;

export type ForgotPasswordStep =
  (typeof FORGOT_PASSWROD_STEPS)[keyof typeof FORGOT_PASSWROD_STEPS];
