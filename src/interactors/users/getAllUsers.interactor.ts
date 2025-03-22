import { ErrorModel } from '../../models/errors/error.model.ts';
import { UserModel } from '../../models/users/user.model.ts';
import { IUserRepository } from '../../repositories/users/user.repository.interface.ts';

import { IUserInteractor } from './user.interactor.interface.ts';

export class GetAllUsersInteractor implements IUserInteractor {
  constructor(
    private readonly repository: IUserRepository,
    private readonly nameSearch?: string,
  ) {}

  public execute = async (): Promise<UserModel[] | ErrorModel> => {
    try {
      const users = await this.repository.getAllUsers(this.nameSearch);
      const models = users.map((user) => new UserModel(user));
      return models;
    } catch (error) {
      return ErrorModel.fromError(error);
    }
  };
}
