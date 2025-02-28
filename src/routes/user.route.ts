import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { UserBuilder } from '../builders/user.builder.ts';
import { UserInsertDTO, UserUpdateDTO } from '../dtos/users/user.dto';

export class UserRoutes {
  private prefix = '/users';

  constructor(private fastify: FastifyInstance) {}

  private async executeFindUserController(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    const controller = UserBuilder.buildFindUsers(req, reply);
    await controller.handle();
  }

  private async executeGetAllUsersController(
    req: FastifyRequest<{ Querystring: { nameSearch?: string } }>,
    reply: FastifyReply
  ) {
    const controller = UserBuilder.buildGetAllUsers(req, reply);
    await controller.handle();
  }

  private async executeSignInUserController(
    req: FastifyRequest<{ Body: { email: string, password: string } }>,
    reply: FastifyReply
  ) {
    const controller = UserBuilder.buildSignInUser(req, reply, this.fastify);
    await controller.handle();
  }

  private async executeCreateUserController(
    req: FastifyRequest<{ Body: { user: UserInsertDTO, returning?: boolean } }>,
    reply: FastifyReply
  ) {
    const controller = UserBuilder.buildCreateUser(req, reply);
    await controller.handle();
  }

  private async executeCreateBulkUserController(
    req: FastifyRequest<{ Body: { users: UserInsertDTO[] } }>,
    reply: FastifyReply
  ) {
    const controller = UserBuilder.buildCreateBulkUser(req, reply);
    await controller.handle();
  }

  private async executeUpdateUserController(
    req: FastifyRequest<{
      Params: { id: string }
      Body: { user: UserUpdateDTO, returning?: boolean }
    }>,
    reply: FastifyReply
  ) {
    const controller = UserBuilder.buildUpdateUser(req, reply);
    await controller.handle();
  }

  private async executeDeleteUserController(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    const controller = UserBuilder.buildDeleteUser(req, reply);
    await controller.handle();
  }

  registerRoutes() {
    this.fastify.get(`${this.prefix}`, this.executeGetAllUsersController);
    this.fastify.post(`${this.prefix}`, this.executeCreateUserController);

    this.fastify.get(`${this.prefix}/:id`, this.executeFindUserController);
    this.fastify.patch(`${this.prefix}/:id`, this.executeUpdateUserController);
    this.fastify.delete(`${this.prefix}/:id`, this.executeDeleteUserController);

    this.fastify.post(`${this.prefix}/signin`, this.executeSignInUserController);
    this.fastify.post(`${this.prefix}/bulk`, this.executeCreateBulkUserController);
  }
}