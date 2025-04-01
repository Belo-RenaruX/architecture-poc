import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
extendZodWithOpenApi(z);

export const UserDTOSchema = z.object({
  id: z.number().int().positive().openapi({
    description: 'Unique ID of the user',
    example: 1,
  }),
  firstName: z.coerce.string().nullable().openapi({
    description: 'First Name of the user',
    example: 'Renato',
  }),
  lastName: z.coerce.string().nullable().openapi({
    description: 'Last Name of the user',
    example: 'Berrocal',
  }),
  username: z.string().min(8, 'Username must be at least 8 characters').openapi({
    description: 'Username used for login',
    example: 'renarux',
  }),
  password: z.string().min(10, 'Password must be at least 10 characters').openapi({
    description: 'Password used for login',
    example: 'ThisIsASecurePassword123',
  }),
  email: z.string().email('Invalid email format').openapi({
    description: 'email of the user',
    example: 'r.berrocal@globant.com',
  }),
  createdAt: z.string().openapi({
    description: 'Date of creation of the user in DD-MM-YYYY HH:mm:ss',
    example: '01-01-2025 00:00:00',
  }),
  updatedAt: z.string().openapi({
    description: 'Date of creation of the user in DD-MM-YYYY HH:mm:ss',
    example: '01-01-2025 00:00:00',
  }),
});

export const UserTableDTOSchema = UserDTOSchema.omit({
  password: true,
}).extend({
  passwordHash: z.string(),
  passwordSalt: z.string(),
});

export const UserAuthDTOSchema = UserDTOSchema.pick({
  email: true,
  password: true,
});

export const UserInputDTOSchema = UserDTOSchema.pick({
  firstName: true,
  lastName: true,
  username: true,
  email: true,
  password: true,
});

export const UserEntityDTOSchema = UserDTOSchema.pick({
  id: true,
  firstName: true,
  lastName: true,
  username: true,
  email: true,
  createdAt: true,
  updatedAt: true,
});

export const UserResultDTOSchema = UserDTOSchema.pick({
  id: true,
  firstName: true,
  lastName: true,
  username: true,
  email: true,
});

export const UserListDTOSchema = z.array(UserResultDTOSchema);

export const UserSignInDTOSchema = z.object({
  user: UserEntityDTOSchema.openapi({
    description: 'User entity',
  }),
  token: z.string().openapi({
    description: 'JWT Session Token',
    example: 'Bearer ...',
  }),
});

export type UserDTO = z.infer<typeof UserDTOSchema>;
export type UserTableDTO = z.infer<typeof UserTableDTOSchema>;
export type UserAuthDTO = z.infer<typeof UserAuthDTOSchema>;
export type UserInputDTO = z.infer<typeof UserInputDTOSchema>;
export type UserEntityDTO = z.infer<typeof UserEntityDTOSchema>;
export type UserResultDTO = z.infer<typeof UserResultDTOSchema>;
export type UserListDTO = z.infer<typeof UserListDTOSchema>;
export type UserSignInDTO = z.infer<typeof UserSignInDTOSchema>;
