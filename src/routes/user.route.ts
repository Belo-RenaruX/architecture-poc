import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { UserBuilder } from '../builders/user.builder.ts';
import { UserInsertDTO, UserUpdateDTO } from '../dtos/users/user.dto.ts';

export class UserRoutes {
  private prefix = '/users';

  constructor(private readonly fastify: FastifyInstance) {}

  private readonly executeFindUserController = async (
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) => {
    const controller = UserBuilder.buildFindUsers(req, reply);
    await controller.handle();
  };

  private readonly executeGetAllUsersController = async (
    req: FastifyRequest<{ Querystring: { nameSearch?: string } }>,
    reply: FastifyReply,
  ) => {
    const controller = UserBuilder.buildGetAllUsers(req, reply);
    await controller.handle();
  };

  private readonly executeSignInUserController = async (
    req: FastifyRequest<{ Body: { email: string; password: string } }>,
    reply: FastifyReply,
  ) => {
    const controller = UserBuilder.buildSignInUser(req, reply, this.fastify);
    await controller.handle();
  };

  private readonly executeCreateUserController = async (
    req: FastifyRequest<{ Body: { user: UserInsertDTO; returning?: boolean } }>,
    reply: FastifyReply,
  ) => {
    const controller = UserBuilder.buildCreateUser(req, reply);
    await controller.handle();
  };

  private readonly executeCreateBulkUserController = async (
    req: FastifyRequest<{ Body: { users: UserInsertDTO[] } }>,
    reply: FastifyReply,
  ) => {
    const controller = UserBuilder.buildCreateBulkUser(req, reply);
    await controller.handle();
  };

  private readonly executeUpdateUserController = async (
    req: FastifyRequest<{
      Params: { id: string };
      Body: { user: UserUpdateDTO; returning?: boolean };
    }>,
    reply: FastifyReply,
  ) => {
    const controller = UserBuilder.buildUpdateUser(req, reply);
    await controller.handle();
  };

  private readonly executeDeleteUserController = async (
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) => {
    const controller = UserBuilder.buildDeleteUser(req, reply);
    await controller.handle();
  };

  public registerRoutes = () => {
    this.fastify.get(`${this.prefix}`, this.executeGetAllUsersController);
    this.fastify.post(`${this.prefix}`, this.executeCreateUserController);

    this.fastify.get(`${this.prefix}/:id`, this.executeFindUserController);
    this.fastify.patch(`${this.prefix}/:id`, this.executeUpdateUserController);
    this.fastify.delete(`${this.prefix}/:id`, this.executeDeleteUserController);

    this.fastify.post(`${this.prefix}/signin`, this.executeSignInUserController);
    this.fastify.post(`${this.prefix}/bulk`, this.executeCreateBulkUserController);
  };
}
