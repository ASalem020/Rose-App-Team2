/**
 * Auth User
 * @interface AuthUser
 * @property {string} _id - The user's ID
 * @property {string} firstName - The user's first name
 * @property {string} lastName - The user's last name
 * @property {string} createdAt - The user's creation date
 */

import { loginSchema } from "../schemas/auth.schema";

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

export type LoginFields = z.infer<typeof loginSchema>