import { z } from 'zod';

export const replyMessageSchema = z.object({
  text: z.string().min(1, 'Text is required'),
});

export type ReplyMessageFormFields = z.infer<typeof replyMessageSchema>;
