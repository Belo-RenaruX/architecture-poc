import { ErrorModel } from "../../models/errors/error.model";
import { UserModel } from "../../models/users/user.model";
import { UserSignInModel } from "../../models/users/userSignin.model";

export interface IUserInteractor {
  execute(): Promise<
    UserModel | UserModel[] | UserSignInModel | ErrorModel | void
  >
}