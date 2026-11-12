import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z.email().max(255),
    password: z.string().min(8).max(72),
    name: z.string().min(1).max(100),
  })
  .meta({ id: 'RegisterDto' });

export type RegisterDto = z.infer<typeof registerSchema>;
