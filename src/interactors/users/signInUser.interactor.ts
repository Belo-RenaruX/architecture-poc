import { UserSessionDTO } from "../../dtos/users/user.dto.ts";
import { IEncryptionManager } from "../../managers/encryption.manager.ts";
import { IJWTManager } from "../../managers/jwt.manager.ts";
import { ErrorModel } from "../../models/errors/error.model.ts";
import { UserModel } from "../../models/users/user.model.ts";
import { UserSignInModel } from "../../models/users/userSignin.model.ts";
import { IUserRepository } from "../../repositories/users/user.repository.interface";
import { IUserInteractor } from "./user.interactor.interface";

export class SignInUserInteractor implements IUserInteractor{
  constructor (
    private repository: IUserRepository,
    private encryptionManager: IEncryptionManager,
    private jwtManager: IJWTManager<UserSessionDTO>,
    private email: string,
    private password: string,
  ) {}

  async execute(): Promise<UserSignInModel | ErrorModel> {
    try {
      const user = await this.repository.signInUser(this.email);
      if(!user) throw new ErrorModel(400, `Invalid credentials`, 'Bad Request');
      const isValidPassword = await this.encryptionManager.comparePassword(
        this.password,
        user.passwordHash,
        user.passwordSalt
      );
      if(!isValidPassword) throw new ErrorModel(400, `Invalid credentials`, 'Bad Request');
      const model = new UserModel(user);
      const signInModel = new UserSignInModel(model, this.jwtManager)
      return signInModel;
    } catch (error) {
      return ErrorModel.fromError(error);
    } 
  }
}
