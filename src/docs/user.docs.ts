import { NoContentResponseDTOSchema, SuccessResponseDTOSchema } from 'src/dtos/common/response.dto.ts';
import {
  UserListDTOSchema,
  UserResultDTOSchema,
  UserSignInDTOSchema,
  UserTableDTOSchema,
} from 'src/dtos/users/user.dto.ts';
import {
  CreateBulkUserBodyDTOSchema,
  CreateUserBodyDTOSchema,
  DeleteUserParamDTOSchema,
  FindUserParamDTOSchema,
  GetAllUsersQueryDTOSchema,
  SignInUserBodyDTOSchema,
  UpdateUserBodyDTOSchema,
  UpdateUserParamDTOSchema,
} from 'src/dtos/users/user.request.dto.ts';
import { HttpMethod, IOpenApiManager } from 'src/managers/openapi.manager.ts';

export class UserDocs {
  private prefix: string = 'users';

  constructor(private readonly manager: IOpenApiManager) {}

  public registerDocs = (): void => {
    this.manager.registerSchema('UserTable', UserTableDTOSchema);
    this.manager.registerRoute({
      method: HttpMethod.GET,
      path: `/${this.prefix}`,
      description: 'Get all users',
      tags: [this.prefix],
      query: GetAllUsersQueryDTOSchema,
      responses: {
        200: SuccessResponseDTOSchema.extend({
          data: UserListDTOSchema,
        }),
      },
    });

    this.manager.registerRoute({
      method: HttpMethod.GET,
      path: `/${this.prefix}/{id}`,
      description: 'Find user by ID',
      tags: [this.prefix],
      params: FindUserParamDTOSchema,
      responses: {
        200: SuccessResponseDTOSchema.extend({
          data: UserResultDTOSchema,
        }),
      },
    });

    this.manager.registerRoute({
      method: HttpMethod.POST,
      path: `/${this.prefix}`,
      description: 'Create user',
      tags: [this.prefix],
      body: CreateUserBodyDTOSchema,
      responses: {
        200: SuccessResponseDTOSchema.extend({
          data: UserResultDTOSchema,
        }),
        204: NoContentResponseDTOSchema,
      },
    });

    this.manager.registerRoute({
      method: HttpMethod.POST,
      path: `/${this.prefix}/signin`,
      description: 'Sign in user',
      tags: [this.prefix, 'auth'],
      body: SignInUserBodyDTOSchema,
      responses: {
        200: SuccessResponseDTOSchema.extend({
          data: UserSignInDTOSchema,
        }),
      },
    });

    this.manager.registerRoute({
      method: HttpMethod.POST,
      path: `/${this.prefix}/bulk`,
      description: 'Create multiple users',
      tags: [this.prefix],
      body: CreateBulkUserBodyDTOSchema,
      responses: {
        204: NoContentResponseDTOSchema,
      },
    });

    this.manager.registerRoute({
      method: HttpMethod.PATCH,
      path: `/${this.prefix}/{id}`,
      description: 'Update user',
      tags: [this.prefix],
      params: UpdateUserParamDTOSchema,
      body: UpdateUserBodyDTOSchema,
      responses: {
        200: SuccessResponseDTOSchema.extend({
          data: UserResultDTOSchema,
        }),
      },
    });

    this.manager.registerRoute({
      method: HttpMethod.DELETE,
      path: `/${this.prefix}/{id}`,
      description: 'Delete user',
      tags: [this.prefix],
      params: DeleteUserParamDTOSchema,
      responses: {
        204: NoContentResponseDTOSchema,
      },
    });
  };
}
