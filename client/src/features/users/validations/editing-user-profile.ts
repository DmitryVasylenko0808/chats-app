import { z } from 'zod';

export const editingProfileSchema = z.object({
  username: z.string().min(1, 'Username is required').trim(),
  name: z.string().min(1, 'Name is required').trim(),
  email: z.string().min(1, 'Email is required').email('Invalid email').trim(),
  description: z.string().trim().optional(),
});

export type EditingProfileFormFields = z.infer<typeof editingProfileSchema>;
