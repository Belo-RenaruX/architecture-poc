import { FastifyInstance } from 'fastify';

import { CreateBulkUserController } from 'src/controllers/users/createBulkUser.controller.ts';
import { CreateUserController } from 'src/controllers/users/createUser.controller.ts';
import { DeleteUserController } from 'src/controllers/users/deleteUser.controller.ts';
import { FindUserController } from 'src/controllers/users/findUser.controller.ts';
import { GetAllUsersController } from 'src/controllers/users/getAllUsers.controller.ts';
import { SignInUserController } from 'src/controllers/users/signInUser.controller.ts';
import { UpdateUserController } from 'src/controllers/users/updateUser.controller.ts';

import { UserBuilder } from '../builders/user.builder.ts';

export class UserRoutes {
  private prefix: string = '/users';
  private readonly findUserController: FindUserController;
  private readonly getAllUsersController: GetAllUsersController;
  private readonly signInUserController: SignInUserController;
  private readonly createUserController: CreateUserController;
  private readonly createBulkUserController: CreateBulkUserController;
  private readonly updateUserController: UpdateUserController;
  private readonly deleteUserController: DeleteUserController;

  constructor(private readonly fastify: FastifyInstance) {
    this.findUserController = UserBuilder.buildFindUsersController();
    this.getAllUsersController = UserBuilder.buildGetAllUsersController();
    this.signInUserController = UserBuilder.buildSignInUserController();
    this.createUserController = UserBuilder.buildCreateUserController();
    this.createBulkUserController = UserBuilder.buildCreateBulkUserController();
    this.updateUserController = UserBuilder.buildUpdateUserController();
    this.deleteUserController = UserBuilder.buildDeleteUserController();
  }

  public registerRoutes = () => {
    this.fastify.get(`${this.prefix}`, this.getAllUsersController.handle);
    this.fastify.post(`${this.prefix}`, this.createUserController.handle);

    this.fastify.get(`${this.prefix}/:id`, this.findUserController.handle);
    this.fastify.patch(`${this.prefix}/:id`, this.updateUserController.handle);
    this.fastify.delete(`${this.prefix}/:id`, this.deleteUserController.handle);

    this.fastify.post(`${this.prefix}/signin`, this.signInUserController.handle);
    this.fastify.post(`${this.prefix}/bulk`, this.createBulkUserController.handle);
  };
}
