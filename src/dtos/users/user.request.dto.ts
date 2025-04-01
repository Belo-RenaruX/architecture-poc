import { z } from 'zod';

import { BodyReturningDTOSchema } from '../common/body.dto.ts';
import { ParamIdDTOSchema } from '../common/params.dto.ts';

import { UserAuthDTOSchema, UserInputDTOSchema } from './user.dto.ts';

export const FindUserParamDTOSchema = z.object({
  id: ParamIdDTOSchema,
});

export const GetAllUsersQueryDTOSchema = z.object({
  nameSearch: z.string().optional().openapi({
    description: 'Search by user first name or last name',
    example: 'Renato',
  }),
});

export const SignInUserBodyDTOSchema = UserAuthDTOSchema;

export const CreateUserBodyDTOSchema = UserInputDTOSchema.merge(BodyReturningDTOSchema);

export const CreateBulkUserBodyDTOSchema = z.object({
  users: z.array(UserInputDTOSchema).min(1).openapi({
    description: 'Users array to insert',
  }),
});

export const UpdateUserParamDTOSchema = z.object({
  id: ParamIdDTOSchema,
});
export const UpdateUserBodyDTOSchema = UserInputDTOSchema.partial().merge(BodyReturningDTOSchema);

export const DeleteUserParamDTOSchema = z.object({
  id: ParamIdDTOSchema,
});

export interface FindUserInputDTO {
  Params: z.infer<typeof FindUserParamDTOSchema>;
}
export interface GetAllUsersInputDTO {
  Querystring: z.infer<typeof GetAllUsersQueryDTOSchema>;
}
export interface SignInUserInputDTO {
  Body: z.infer<typeof SignInUserBodyDTOSchema>;
}
export interface CreateUserInputDTO {
  Body: z.infer<typeof CreateUserBodyDTOSchema>;
}
export interface CreateBulkUserInputDTO {
  Body: z.infer<typeof CreateBulkUserBodyDTOSchema>;
}
export interface UpdateUserInputDTO {
  Params: z.infer<typeof UpdateUserParamDTOSchema>;
  Body: z.infer<typeof UpdateUserBodyDTOSchema>;
}
export interface DeleteUserInputDTO {
  Params: z.infer<typeof DeleteUserParamDTOSchema>;
}
