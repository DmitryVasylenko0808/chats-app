import { z } from 'zod';

const imagesSchema = z
  .array(z.instanceof(File))
  .refine(
    (files) => Array.from(files).every((file) => ['image/jpeg', 'image/png'].includes(file.type)),
    'Only supported .jpeg and .png formats'
  );

export const sendMessageSchema = z
  .object({
    text: z.string().trim().optional(),
    images: imagesSchema.optional(),
  })
  .refine(({ text, images }) => text || images?.length, {
    message: 'Cannot send message without text or images',
    path: ['text'],
  });

export type SendMessageFormFields = z.infer<typeof sendMessageSchema>;
