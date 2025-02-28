import { ErrorModel } from "../../models/errors/error.model";
import { IUserRepository } from "../../repositories/users/user.repository.interface";
import { IUserInteractor } from "./user.interactor.interface";

export class DeleteUserInteractor implements IUserInteractor{
  constructor (
    private repository: IUserRepository,
    private id: number,
  ) {}

  async execute(): Promise<ErrorModel | void> {
    try {
      await this.repository.deleteUser(this.id);
    } catch (error) {
      return ErrorModel.fromError(error);
    } 
  }
}