import { ZodSchema } from "zod";
import { UserInsertDTO } from "../../dtos/users/user.dto";
import { IEncryptionManager } from "../../managers/encryption.manager";
import { ErrorModel } from "../../models/errors/error.model";
import { TransactionUserModel } from "../../models/users/transactionUser.model";
import { IUserRepository } from "../../repositories/users/user.repository.interface";
import { IUserInteractor } from "./user.interactor.interface";

export class CreateBulkUserInteractor implements IUserInteractor{
  constructor (
    private repository: IUserRepository,
    private encryptionManager: IEncryptionManager,
    private schema: ZodSchema,
    private users: UserInsertDTO[],
  ) {}

  async execute(): Promise<ErrorModel | void> {
    try {
      const modelPromises = this.users.map(user => TransactionUserModel.create(user, this.encryptionManager, this.schema));
      const models = await Promise.all(modelPromises);
      await this.repository.insertUsersBulk(models);
    } catch (error) {
      return ErrorModel.fromError(error);
    } 
  }
}