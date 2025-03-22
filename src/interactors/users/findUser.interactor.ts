import { ErrorModel } from '../../models/errors/error.model.ts';
import { UserModel } from '../../models/users/user.model.ts';
import { IUserRepository } from '../../repositories/users/user.repository.interface.ts';

import { IUserInteractor } from './user.interactor.interface.ts';

export class FindUserInteractor implements IUserInteractor {
  constructor(
    private readonly repository: IUserRepository,
    private readonly id: number,
  ) {}

  public execute = async (): Promise<UserModel | ErrorModel> => {
    try {
      const user = await this.repository.findUserById(this.id);
      if (!user) throw new ErrorModel(404, `User with id ${this.id} doesn't exists.`, 'Not Found');
      const model = new UserModel(user);
      return model;
    } catch (error) {
      return ErrorModel.fromError(error);
    }
  };
}
