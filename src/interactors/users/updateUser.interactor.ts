import { ZodSchema } from "zod";
import { UserUpdateDTO } from "../../dtos/users/user.dto";
import { IEncryptionManager } from "../../managers/encryption.manager";
import { ErrorModel } from "../../models/errors/error.model";
import { TransactionUserModel } from "../../models/users/transactionUser.model";
import { UserModel } from "../../models/users/user.model";
import { IUserRepository } from "../../repositories/users/user.repository.interface";
import { IUserInteractor } from "./user.interactor.interface";

export class UpdateUserInteractor implements IUserInteractor{
  constructor (
    private repository: IUserRepository,
    private encryptionManager: IEncryptionManager,
    private schema: ZodSchema,
    private id: number,
    private user: UserUpdateDTO,
    private returning: boolean,
  ) {}

  async execute(): Promise<UserModel | ErrorModel | void> {
    try {
      const model = await TransactionUserModel.create(this.user, this.encryptionManager, this.schema);
      await this.repository.updateUser(this.id, model);

      if(this.returning) {
        const insertedUser = await this.repository.findUserById(this.id);
        if(!insertedUser) throw new ErrorModel(404, `User with id ${this.id} doesn't exists.`, 'Not Found');

        const insertedModel = new UserModel(insertedUser);
        
        return insertedModel;
      }
    } catch (error) {
      return ErrorModel.fromError(error);
    } 
  }
}