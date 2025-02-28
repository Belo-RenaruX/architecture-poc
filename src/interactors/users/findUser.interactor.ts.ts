import { ErrorModel } from "../../models/errors/error.model";
import { UserModel } from "../../models/users/user.model";
import { IUserRepository } from "../../repositories/users/user.repository.interface";
import { IUserInteractor } from "./user.interactor.interface";

export class FindUserInteractor implements IUserInteractor{
  constructor (private repository: IUserRepository, private id: number) {}

  async execute(): Promise<UserModel | ErrorModel> {
    try {
      const user = await this.repository.findUserById(this.id);
      if(!user) throw new ErrorModel(404, `User with id ${this.id} doesn't exists.`, 'Not Found');
      const model = new UserModel(user);
      return model;
    } catch (error) {
      return ErrorModel.fromError(error);
    } 
  }
}