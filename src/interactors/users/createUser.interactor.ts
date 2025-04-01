import { FastifyRequest } from 'fastify';

import { CreateUserBodyDTOSchema, CreateUserInputDTO } from 'src/dtos/users/user.request.dto.ts';

import { IEncryptionManager } from '../../managers/encryption.manager.ts';
import { ErrorModel } from '../../models/errors/error.model.ts';
import { TransactionUserModel } from '../../models/users/transactionUser.model.ts';
import { UserModel } from '../../models/users/user.model.ts';
import { IUserRepository } from '../../repositories/users/user.repository.interface.ts';

import { IUserInteractor } from './user.interactor.interface.ts';

export class CreateUserInteractor implements IUserInteractor<CreateUserInputDTO, UserModel | void> {
  constructor(
    private readonly repository: IUserRepository,
    private readonly encryptionManager: IEncryptionManager,
  ) {}

  public execute = async (input: FastifyRequest<CreateUserInputDTO>) => {
    const { body } = input;
    try {
      const { returning, ...user } = CreateUserBodyDTOSchema.parse(body);
      const model = await TransactionUserModel.create(user, this.encryptionManager);
      const { insertId } = await this.repository.insertUser(model);

      if (insertId && returning) {
        const insertedUser = await this.repository.findUserById(Number(insertId));
        if (!insertedUser) throw new ErrorModel(404, `User with id ${insertId} doesn't exists.`, 'Not Found');

        const insertedModel = new UserModel(insertedUser);

        return insertedModel;
      }
    } catch (error) {
      return ErrorModel.fromError(error);
    }
  };
}
