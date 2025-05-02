import { z } from 'zod';

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Username must contain at least 3 characters')
      .max(30, 'Username must contain no more 30 characters')
      .trim(),
    name: z.string().min(1, 'Name must contain at least 1 character').trim(),
    email: z.string().email('Invalid email').trim(),
    password: z.string().min(8, 'Password must contain at least 8 characters').trim(),
    passwordConfirmation: z.string().min(8, 'Password must contain at least 8 characters').trim(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'],
  });

export type RegisterFormFields = z.infer<typeof registerSchema>;
