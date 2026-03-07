// Imports

import { z } from 'zod';


// Schema

/**
 * addOccasionSchema - Validation schema for creating a new occasion
 *
 * Fields:
 * - name: Required string, 2-100 characters
 * - image: Optional File object (image upload)
 */
export const addOccasionSchema = z.object({
  name: z
    .string()
    .min(2, 'Occasion name must be at least 2 characters')
    .max(100, 'Occasion name must be at most 100 characters'),
  image: z
    .instanceof(File)
    .refine((f) => f.size > 0, 'Please select an image')
    .refine(
      (f) => ['image/jpeg', 'image/png', 'image/webp'].includes(f.type),
      'Only JPG, PNG, or WEBP images are allowed',
    )
    .refine((f) => f.size <= 5 * 1024 * 1024, 'Image must be under 5 MB')
    .optional(),
});

/**
 * editOccasionSchema - Validation schema for editing an existing occasion
 *
 * Fields:
 * - name: Required string, 2-100 characters
 * - image: Optional File — only validated when the user picks a new one
 */
export const editOccasionSchema = z.object({
  name: z
    .string()
    .min(2, 'Occasion name must be at least 2 characters')
    .max(100, 'Occasion name must be at most 100 characters'),
  // Use union so undefined (no file picked) passes cleanly.
  // z.instanceof(File).optional() can fail if RHF passes a non-File
  // truthy value through an unregistered field.
  image: z
    .union([
      z
        .instanceof(File)
        .refine((f) => f.size > 0, 'Please select an image')
        .refine(
          (f) => ['image/jpeg', 'image/png', 'image/webp'].includes(f.type),
          'Only JPG, PNG, or WEBP images are allowed',
        )
        .refine((f) => f.size <= 5 * 1024 * 1024, 'Image must be under 5 MB'),
      z.undefined(),
    ])
    .optional(),
});


// Types

export type AddOccasionFormData = z.infer<typeof addOccasionSchema>;
export type EditOccasionFormData = z.infer<typeof editOccasionSchema>;
