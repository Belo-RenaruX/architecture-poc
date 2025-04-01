import { FastifyRequest } from 'fastify';

import {
  UpdateUserInputDTO,
  UpdateUserBodyDTOSchema,
  UpdateUserParamDTOSchema,
} from 'src/dtos/users/user.request.dto.ts';

import { IEncryptionManager } from '../../managers/encryption.manager.ts';
import { ErrorModel } from '../../models/errors/error.model.ts';
import { TransactionUserModel } from '../../models/users/transactionUser.model.ts';
import { UserModel } from '../../models/users/user.model.ts';
import { IUserRepository } from '../../repositories/users/user.repository.interface.ts';

import { IUserInteractor } from './user.interactor.interface.ts';

export class UpdateUserInteractor implements IUserInteractor<UpdateUserInputDTO, UserModel | void> {
  constructor(
    private readonly repository: IUserRepository,
    private readonly encryptionManager: IEncryptionManager,
  ) {}

  public execute = async (input: FastifyRequest<UpdateUserInputDTO>) => {
    try {
      const { body, params } = input;
      const { returning, ...user } = UpdateUserBodyDTOSchema.parse(body);
      const { id } = UpdateUserParamDTOSchema.parse(params);
      const model = await TransactionUserModel.create(user, this.encryptionManager);
      await this.repository.updateUser(id, model);

      if (returning) {
        const insertedUser = await this.repository.findUserById(id);
        if (!insertedUser) throw new ErrorModel(404, `User with id: ${id} doesn't exists.`, 'Not Found');

        const insertedModel = new UserModel(insertedUser);

        return insertedModel;
      }
    } catch (error) {
      return ErrorModel.fromError(error);
    }
  };
}
