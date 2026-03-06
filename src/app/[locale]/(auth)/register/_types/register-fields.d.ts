import { registerSchema } from '@/lib/schema/auth.schema';
import z from 'zod';

type RegisterFields = z.infer<
  ReturnType<typeof registerSchema>
>;
