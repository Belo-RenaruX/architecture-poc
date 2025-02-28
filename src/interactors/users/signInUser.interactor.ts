import { UserSessionDTO } from "../../dtos/users/user.dto";
import { IEncryptionManager } from "../../managers/encryption.manager";
import { IJWTManager } from "../../managers/jwt.manager";
import { ErrorModel } from "../../models/errors/error.model";
import { UserModel } from "../../models/users/user.model";
import { UserSignInModel } from "../../models/users/userSignin.model";
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
