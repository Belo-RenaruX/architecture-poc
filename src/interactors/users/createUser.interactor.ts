import { ZodSchema } from 'zod';

import { UserInsertDTO } from '../../dtos/users/user.dto.ts';
import { IEncryptionManager } from '../../managers/encryption.manager.ts';
import { ErrorModel } from '../../models/errors/error.model.ts';
import { TransactionUserModel } from '../../models/users/transactionUser.model.ts';
import { UserModel } from '../../models/users/user.model.ts';
import { IUserRepository } from '../../repositories/users/user.repository.interface.ts';

import { IUserInteractor } from './user.interactor.interface.ts';

export class CreateUserInteractor implements IUserInteractor {
  constructor(
    private readonly repository: IUserRepository,
    private readonly encryptionManager: IEncryptionManager,
    private readonly schema: ZodSchema,
    private readonly user: UserInsertDTO,
    private readonly returning: boolean,
  ) {}

  public execute = async (): Promise<UserModel | ErrorModel | void> => {
    try {
      const model = await TransactionUserModel.create(this.user, this.encryptionManager, this.schema);
      const { insertId } = await this.repository.insertUser(model);

      if (insertId && this.returning) {
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
