import { productSchema } from '@/lib/schemas/product.schema';
import { updateProductSchema } from '@/lib/schemas/update-product.schema';
import z from 'zod';

type ProductFields = z.infer<
  ReturnType<typeof productSchema>
>;

type UpdateProductFields = z.infer<
  ReturnType<typeof updateProductSchema>
>;
