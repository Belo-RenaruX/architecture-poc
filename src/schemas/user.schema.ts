import { z } from 'zod';

export const UserTableSchema = z.object({
  id: z.number().int().positive(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  username: z.string().min(8, 'Username must be at least 8 characters'),
  email: z.string().email('Invalid email format'),
  passwordHash: z.string(),
  passwordSalt: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type UserTable = z.infer<typeof UserTableSchema>