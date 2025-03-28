import { ErrorModel } from '../../models/errors/error.model.ts';
import { IUserRepository } from '../../repositories/users/user.repository.interface.ts';

import { IUserInteractor } from './user.interactor.interface.ts';

export class DeleteUserInteractor implements IUserInteractor {
  constructor(
    private readonly repository: IUserRepository,
    private readonly id: number,
  ) {}

  public execute = async (): Promise<ErrorModel | void> => {
    try {
      await this.repository.deleteUser(this.id);
    } catch (error) {
      return ErrorModel.fromError(error);
    }
  };
}
