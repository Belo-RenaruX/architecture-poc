import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest
} from "fastify";
import {
  UserInsertDTO,
  UserInsertDTOSchema,
  UserSessionDTO,
  UserUpdateDTO,
  UserUpdateDTOSchema
} from "../dtos/users/user.dto.ts";
import { db } from "../clients/mysql.client.ts";
import { UserRepository } from "../repositories/users/user.repository.db.ts";
import { EncryptionConfigSha512 } from "../config/encryption.config.ts";
import { EncryptionManager } from "../managers/encryption.manager.ts";
import { JWTManager } from "../managers/jwt.manager.ts";
import { FindUserController } from "../controllers/users/findUser.controller.ts";
import { FindUserInteractor } from "../interactors/users/findUser.interactor.ts";
import { GetAllUsersInteractor } from "../interactors/users/getAllUsers.interactor.ts";
import { GetAllUsersController } from "../controllers/users/getAllUsers.controller.ts";
import { SignInUserController } from "../controllers/users/signInUser.controller.ts";
import { SignInUserInteractor } from "../interactors/users/signInUser.interactor.ts";
import { CreateUserInteractor } from "../interactors/users/createUser.interactor.ts";
import { CreateUserController } from "../controllers/users/createUser.controller.ts";
import { CreateBulkUserInteractor } from "../interactors/users/createBulkUser.interactor.ts";
import { CreateBulkUserController } from "../controllers/users/createBulkUser.controller.ts";
import { UpdateUserInteractor } from "../interactors/users/updateUser.interactor.ts";
import { UpdateUserController } from "../controllers/users/updateUser.controller.ts";
import { DeleteUserController } from "../controllers/users/deleteUser.controller.ts";
import { DeleteUserInteractor } from "../interactors/users/deleteUser.interactor.ts";

export class UserBuilder {
  static buildFindUsers = (
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): FindUserController => {
    const id = parseInt(req.params.id, 10);

    const repository = new UserRepository(db);
    const interactor = new FindUserInteractor(repository, id);

    return new FindUserController(interactor, reply);
  }

  static buildGetAllUsers = (
    req: FastifyRequest<{ Querystring: { nameSearch?: string } }>,
    reply: FastifyReply
  ): GetAllUsersController => {
    const { nameSearch } = req.query;

    const repository = new UserRepository(db);
    const interactor = new GetAllUsersInteractor(repository, nameSearch);

    return new GetAllUsersController(interactor, reply);
  }

  static buildSignInUser = (
    req: FastifyRequest<{ Body: { email: string, password: string } }>,
    reply: FastifyReply,
    instance: FastifyInstance
  ): SignInUserController => {
    const { email, password } = req.body;

    const repository = new UserRepository(db);
    const encryptionConfig = new EncryptionConfigSha512();
    const encryptionManager = new EncryptionManager(encryptionConfig);
    const jwtManager = new JWTManager<UserSessionDTO>(instance);
    const interactor = new SignInUserInteractor(
      repository,
      encryptionManager,
      jwtManager,
      email,
      password
    );

    return new SignInUserController(interactor, reply);
  }

  static buildCreateUser = (
    req: FastifyRequest<{ Body: { user: UserInsertDTO, returning?: boolean } }>,
    reply: FastifyReply
  ): CreateUserController => {
    const { user, returning } = req.body;

    const repository = new UserRepository(db);
    const encryptionConfig = new EncryptionConfigSha512();
    const encryptionManager = new EncryptionManager(encryptionConfig);
    const interactor = new CreateUserInteractor(
      repository,
      encryptionManager,
      UserInsertDTOSchema,
      user,
      returning ?? false
    );

    return new CreateUserController(interactor, reply);
  }

  static buildCreateBulkUser = (
    req: FastifyRequest<{ Body: { users: UserInsertDTO[] } }>,
    reply: FastifyReply
  ): CreateBulkUserController => {
    const { users } = req.body;

    const repository = new UserRepository(db);
    const encryptionConfig = new EncryptionConfigSha512();
    const encryptionManager = new EncryptionManager(encryptionConfig);
    const interactor = new CreateBulkUserInteractor(
      repository,
      encryptionManager,
      UserInsertDTOSchema,
      users
    );

    return new CreateBulkUserController(interactor, reply);
  }

  static buildUpdateUser = (
    req: FastifyRequest<{
      Params: { id: string }
      Body: { user: UserUpdateDTO, returning?: boolean }
    }>,
    reply: FastifyReply
  ): UpdateUserController => {
    const id = parseInt(req.params.id, 10);
    const { user, returning } = req.body;

    const repository = new UserRepository(db);
    const encryptionConfig = new EncryptionConfigSha512();
    const encryptionManager = new EncryptionManager(encryptionConfig);
    const interactor = new UpdateUserInteractor(
      repository,
      encryptionManager,
      UserUpdateDTOSchema,
      id,
      user,
      returning ?? false
    );

    return new UpdateUserController(interactor, reply);
  }

  static buildDeleteUser = (
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): DeleteUserController => {
    const id = parseInt(req.params.id, 10);

    const repository = new UserRepository(db);
    const interactor = new DeleteUserInteractor(repository, id);

    return new DeleteUserController(interactor, reply);
  }
}