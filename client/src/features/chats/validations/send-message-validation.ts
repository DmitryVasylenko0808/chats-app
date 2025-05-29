import { z } from 'zod';

const imagesSchema = z
  .array(z.instanceof(File))
  .refine(
    (files) => Array.from(files).every((file) => ['image/jpeg', 'image/png'].includes(file.type)),
    'Only supported .jpeg and .png formats'
  );

export const sendMessageSchema = z.object({
  text: z.string().min(1, 'Text is required').trim(),
  images: imagesSchema.optional(),
});

export type SendMessageFormFields = z.infer<typeof sendMessageSchema>;
