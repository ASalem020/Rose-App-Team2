/**
 * Auth User
 * @interface AuthUser
 * @property {string} _id - The user's ID
 * @property {string} firstName - The user's first name
 * @property {string} lastName - The user's last name
 * @property {string} createdAt - The user's creation date
 */

import { loginSchema } from "../schemas/auth.schema";
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
