import { ZodSchema } from "zod";
import { UserInsertDTO } from "../../dtos/users/user.dto";
import { IEncryptionManager } from "../../managers/encryption.manager";
import { ErrorModel } from "../../models/errors/error.model";
import { TransactionUserModel } from "../../models/users/transactionUser.model";
import { UserModel } from "../../models/users/user.model";
import { IUserRepository } from "../../repositories/users/user.repository.interface";
import { IUserInteractor } from "./user.interactor.interface";

export class CreateUserInteractor implements IUserInteractor{
  constructor (
    private repository: IUserRepository,
    private encryptionManager: IEncryptionManager,
    private schema: ZodSchema,
    private user: UserInsertDTO,
    private returning: boolean,
  ) {}

  async execute(): Promise<UserModel | ErrorModel | void> {
    try {
      const model = await TransactionUserModel.create(this.user, this.encryptionManager, this.schema);
      const { insertId } = await this.repository.insertUser(model);

      if(insertId && this.returning) {
        const insertedUser = await this.repository.findUserById(Number(insertId));
        if(!insertedUser) throw new ErrorModel(404, `User with id ${insertId} doesn't exists.`, 'Not Found');

        const insertedModel = new UserModel(insertedUser);

        return insertedModel;
      }
    } catch (error) {
      return ErrorModel.fromError(error);
    } 
  }
}
