import { z } from 'zod';

export const sendMessageSchema = z.object({
  text: z.string().min(1, 'Text is required').trim(),
});

export type SendMessageFormFields = z.infer<typeof sendMessageSchema>;
