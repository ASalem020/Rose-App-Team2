import z from "zod";

export const registerSchema = z.object({
  name: z.object({
    firstName: z.string('Enter valid data !').nonempty("First Name is required !"),
    lastName: z.string('Enter valid data !').nonempty("Last Name is required !")
  }),
  email: z.email('Please enter valid email !').nonempty('Email is required !'),
  phone: z.string().nonempty('Phone is required !').min(10,'Please enter valid phone !'),
  gender: z.union([z.literal('male'),z.literal('female')],{
    error: "Gender must be Male or Female only"
  }).optional(),
  password: z
  .string().nonempty("Password is required !")
  .regex(/(?=.*?[A-Z])/, "At least one uppercase letter (A-Z)")
  .regex(/(?=.*?[a-z])/, "At least one lowercase letter (a-z)")
  .regex(/(?=.*?[0-9])/, "At least one number (0-9)")
  .regex(
    /(?=.*?[#?!@$%^&*-])/,
    "At least one special character (!@#$%^&*-)"
  )
  .min(8, "Password Must Be At Least 8 Digits"),
  confirmPassword: z
  .string("Enter valid confirm password !")
  .nonempty("Confirm Password is required !")
}).refine((values) => values.password === values.confirmPassword ,{
  error: "Confirm password must match password",
  path: ['confirmPassword']
})