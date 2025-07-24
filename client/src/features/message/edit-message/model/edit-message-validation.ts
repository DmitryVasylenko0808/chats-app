import { z } from 'zod';

export const editMessageSchema = z.object({
  text: z.string().min(1, 'Text is required'),
});

export type EditMessageFormFields = z.infer<typeof editMessageSchema>;
