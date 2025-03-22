import { z } from 'zod';

import { UserTableSchema } from '../../schemas/user.schema.ts';

export const UserDTOSchema = UserTableSchema.partial().extend({
  id: z.number().int().positive(),
});
export const UserInsertDTOSchema = UserTableSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  passwordHash: true,
  passwordSalt: true,
}).extend({
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
export const UserUpdateDTOSchema = UserInsertDTOSchema.partial();

export type UserDTO = z.infer<typeof UserDTOSchema>;
export type UserInsertDTO = z.infer<typeof UserInsertDTOSchema>;
export type UserUpdateDTO = z.infer<typeof UserUpdateDTOSchema>;
export type UserSessionDTO = Omit<UserDTO, 'passwordHash' | 'passwordSalt'>;
export type UserTransactionDTO = Omit<UserDTO, 'id' | 'createdAt' | 'updatedAt'>;
