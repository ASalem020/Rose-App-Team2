import { registerSchema } from "../_schema/register-form.schema";
import z from 'zod'

type RegisterFields = z.infer<typeof registerSchema>;