import { FastifyRequest } from 'fastify';

import { CreateBulkUserInputDTO, CreateBulkUserBodyDTOSchema } from 'src/dtos/users/user.request.dto.ts';

import { IEncryptionManager } from '../../managers/encryption.manager.ts';
import { ErrorModel } from '../../models/errors/error.model.ts';
import { TransactionUserModel } from '../../models/users/transactionUser.model.ts';
import { IUserRepository } from '../../repositories/users/user.repository.interface.ts';

import { IUserInteractor } from './user.interactor.interface.ts';

export class CreateBulkUserInteractor implements IUserInteractor<CreateBulkUserInputDTO, void> {
  constructor(
    private readonly repository: IUserRepository,
    private readonly encryptionManager: IEncryptionManager,
  ) {}

  public execute = async (input: FastifyRequest<CreateBulkUserInputDTO>) => {
    const { body } = input;
    try {
      const { users } = CreateBulkUserBodyDTOSchema.parse(body);
      const modelPromises = users.map((user) => TransactionUserModel.create(user, this.encryptionManager));
      const models = await Promise.all(modelPromises);
      await this.repository.insertUsersBulk(models);
    } catch (error) {
      return ErrorModel.fromError(error);
    }
  };
}
