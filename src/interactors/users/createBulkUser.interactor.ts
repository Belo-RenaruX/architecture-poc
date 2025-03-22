import { ZodSchema } from 'zod';

import { UserInsertDTO } from '../../dtos/users/user.dto.ts';
import { IEncryptionManager } from '../../managers/encryption.manager.ts';
import { ErrorModel } from '../../models/errors/error.model.ts';
import { TransactionUserModel } from '../../models/users/transactionUser.model.ts';
import { IUserRepository } from '../../repositories/users/user.repository.interface.ts';

import { IUserInteractor } from './user.interactor.interface.ts';

export class CreateBulkUserInteractor implements IUserInteractor {
  constructor(
    private readonly repository: IUserRepository,
    private readonly encryptionManager: IEncryptionManager,
    private readonly schema: ZodSchema,
    private readonly users: UserInsertDTO[],
  ) {}

  public execute = async (): Promise<ErrorModel | void> => {
    try {
      const modelPromises = this.users.map((user) =>
        TransactionUserModel.create(user, this.encryptionManager, this.schema),
      );
      const models = await Promise.all(modelPromises);
      await this.repository.insertUsersBulk(models);
    } catch (error) {
      return ErrorModel.fromError(error);
    }
  };
}
