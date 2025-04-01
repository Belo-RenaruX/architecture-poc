import { FastifyInstance } from 'fastify';

import {
  UserListDTO,
  UserListDTOSchema,
  UserResultDTO,
  UserResultDTOSchema,
  UserSignInDTO,
  UserSignInDTOSchema,
} from 'src/dtos/users/user.dto.ts';
import { ResponseInteractor } from 'src/interactors/response/response.interactor.ts';
import { EmptyResponseStrategy } from 'src/interactors/response/strategies/empty.strategy.ts';
import { HybridResponseStrategy } from 'src/interactors/response/strategies/hybrid.strategy.ts';
import { SuccessResponseStrategy } from 'src/interactors/response/strategies/success.strategy.ts';
import { UserModel } from 'src/models/users/user.model.ts';
import { UserSignInModel } from 'src/models/users/userSignin.model.ts';

import { DatabaseClient } from '../clients/mysql.client.ts';
import { CreateBulkUserController } from '../controllers/users/createBulkUser.controller.ts';
import { CreateUserController } from '../controllers/users/createUser.controller.ts';
import { DeleteUserController } from '../controllers/users/deleteUser.controller.ts';
import { FindUserController } from '../controllers/users/findUser.controller.ts';
import { GetAllUsersController } from '../controllers/users/getAllUsers.controller.ts';
import { SignInUserController } from '../controllers/users/signInUser.controller.ts';
import { UpdateUserController } from '../controllers/users/updateUser.controller.ts';
import { CreateBulkUserInteractor } from '../interactors/users/createBulkUser.interactor.ts';
import { CreateUserInteractor } from '../interactors/users/createUser.interactor.ts';
import { DeleteUserInteractor } from '../interactors/users/deleteUser.interactor.ts';
import { FindUserInteractor } from '../interactors/users/findUser.interactor.ts';
import { GetAllUsersInteractor } from '../interactors/users/getAllUsers.interactor.ts';
import { SignInUserInteractor } from '../interactors/users/signInUser.interactor.ts';
import { UpdateUserInteractor } from '../interactors/users/updateUser.interactor.ts';
import { EncryptionConfigSha512 } from '../managers/config/encryption.config.ts';
import { EncryptionManager } from '../managers/encryption.manager.ts';
import { JWTManager } from '../managers/jwt.manager.ts';
import { UserRepository } from '../repositories/users/user.repository.db.ts';

export class UserBuilder {
  public static buildFindUsersController = (): FindUserController => {
    const db = DatabaseClient.getInstance();
    const repository = new UserRepository(db);
    const interactor = new FindUserInteractor(repository);
    const responseStrategy = new SuccessResponseStrategy<UserResultDTO>(UserResultDTOSchema);
    const responseInteractor = new ResponseInteractor<UserModel>(responseStrategy);

    return new FindUserController(interactor, responseInteractor);
  };

  public static buildGetAllUsersController = (): GetAllUsersController => {
    const db = DatabaseClient.getInstance();
    const repository = new UserRepository(db);
    const interactor = new GetAllUsersInteractor(repository);
    const responseStrategy = new SuccessResponseStrategy<UserListDTO>(UserListDTOSchema);
    const responseInteractor = new ResponseInteractor<UserModel[]>(responseStrategy);

    return new GetAllUsersController(interactor, responseInteractor);
  };

  public static buildSignInUserController = (instance: FastifyInstance): SignInUserController => {
    const db = DatabaseClient.getInstance();
    const repository = new UserRepository(db);
    const encryptionConfig = new EncryptionConfigSha512();
    const encryptionManager = new EncryptionManager(encryptionConfig);
    const jwtManager = new JWTManager<UserModel>(instance);
    const interactor = new SignInUserInteractor(repository, encryptionManager, jwtManager);
    const responseStrategy = new SuccessResponseStrategy<UserSignInDTO>(UserSignInDTOSchema);
    const responseInteractor = new ResponseInteractor<UserSignInModel>(responseStrategy);

    return new SignInUserController(interactor, responseInteractor);
  };

  public static buildCreateUserController = (): CreateUserController => {
    const db = DatabaseClient.getInstance();
    const repository = new UserRepository(db);
    const encryptionConfig = new EncryptionConfigSha512();
    const encryptionManager = new EncryptionManager(encryptionConfig);
    const interactor = new CreateUserInteractor(repository, encryptionManager);
    const responseStrategy = new HybridResponseStrategy<UserResultDTO>(UserResultDTOSchema);
    const responseInteractor = new ResponseInteractor<UserModel | void>(responseStrategy);

    return new CreateUserController(interactor, responseInteractor);
  };

  public static buildCreateBulkUserController = (): CreateBulkUserController => {
    const db = DatabaseClient.getInstance();
    const repository = new UserRepository(db);
    const encryptionConfig = new EncryptionConfigSha512();
    const encryptionManager = new EncryptionManager(encryptionConfig);
    const interactor = new CreateBulkUserInteractor(repository, encryptionManager);
    const responseStrategy = new EmptyResponseStrategy();
    const responseInteractor = new ResponseInteractor<void>(responseStrategy);

    return new CreateBulkUserController(interactor, responseInteractor);
  };

  public static buildUpdateUserController = (): UpdateUserController => {
    const db = DatabaseClient.getInstance();
    const repository = new UserRepository(db);
    const encryptionConfig = new EncryptionConfigSha512();
    const encryptionManager = new EncryptionManager(encryptionConfig);
    const interactor = new UpdateUserInteractor(repository, encryptionManager);
    const responseStrategy = new HybridResponseStrategy<UserResultDTO>(UserResultDTOSchema);
    const responseInteractor = new ResponseInteractor<UserModel | void>(responseStrategy);

    return new UpdateUserController(interactor, responseInteractor);
  };

  public static buildDeleteUserController = (): DeleteUserController => {
    const db = DatabaseClient.getInstance();
    const repository = new UserRepository(db);
    const interactor = new DeleteUserInteractor(repository);
    const responseStrategy = new EmptyResponseStrategy();
    const responseInteractor = new ResponseInteractor<void>(responseStrategy);

    return new DeleteUserController(interactor, responseInteractor);
  };
}
