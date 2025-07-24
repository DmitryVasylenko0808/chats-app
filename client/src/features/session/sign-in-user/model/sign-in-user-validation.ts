import { z } from 'zod';

export const signInSchema = z.object({
  username: z.string().min(1, 'Username is required').trim(),
  password: z.string().min(1, 'Password is required').trim(),
});

export type SignInFormFields = z.infer<typeof signInSchema>;
