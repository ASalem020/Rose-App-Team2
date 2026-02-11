import z from "zod";

export const profileFormSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First Name must be at least 2 characters'),
  lastName: z
    .string()
    .min(2, 'Last Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 characters')
    .regex(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      'Invalid phone number',
    ),
  gender: z.union(
    [z.literal('male'), z.literal('female'), z.literal('')],
    'Gender must be Male or Female only',
  ),
});

export type profileFields = z.infer<typeof profileFormSchema> 


export const changePasswordSchema = z.object({
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      'Password must contain at least one capital letter, a number, and a symbol.',
    ),
  newPassword: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      'Password must contain at least one capital letter, a number, and a symbol.',
    ),
  confirmPassword: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      'Password must contain at least one capital letter, a number, and a symbol.',
    ),
});

export type changePasswordFields = z.infer<typeof changePasswordSchema>